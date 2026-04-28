import { NextResponse } from "next/server";
import { supabaseServer } from "@repo/lib/supabase-server";
import { subscribeToMainKlaviyoList } from "@repo/lib/klaviyo";
import { registerViralLoopsParticipant } from "@repo/lib/viral-loops";

type SignupBody = {
  email?: string;
  firstName?: string;
  signupSource?: string;
  referrerCode?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
    term?: string;
  };
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: SignupBody;
  try {
    body = (await request.json()) as SignupBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "invalid_email" },
      { status: 400 },
    );
  }

  const supabase = supabaseServer();

  const { data: profile, error: upsertError } = await supabase
    .from("profiles")
    .upsert(
      {
        email,
        first_name: body.firstName ?? null,
        signup_source: body.signupSource ?? null,
        referrer_code: body.referrerCode ?? null,
        utm_source: body.utm?.source ?? null,
        utm_medium: body.utm?.medium ?? null,
        utm_campaign: body.utm?.campaign ?? null,
        utm_content: body.utm?.content ?? null,
        utm_term: body.utm?.term ?? null,
      },
      { onConflict: "email" },
    )
    .select()
    .single();

  if (upsertError || !profile) {
    console.error("[signup] supabase upsert failed", upsertError);
    return NextResponse.json(
      { ok: false, error: "db_error" },
      { status: 500 },
    );
  }

  // Viral Loops registration. Failures don't block the signup — the profile
  // exists and the webhook (or a retry) can reconcile referral state later.
  let referralCode: string | null = null;
  try {
    const participant = await registerViralLoopsParticipant({
      email,
      firstName: body.firstName,
      referrerCode: body.referrerCode,
    });
    referralCode = participant.referralCode;

    await supabase
      .from("profiles")
      .update({
        referral_code: referralCode,
        operative_id: referralCode,
      })
      .eq("id", profile.id);
  } catch (err) {
    console.error("[signup] viral loops register failed", err);
  }

  // Klaviyo identify + list subscribe. Reuses the existing helper, which the
  // browser-side flow already pointed at /api/klaviyo/subscribe.
  try {
    await subscribeToMainKlaviyoList({
      email,
      ...(body.firstName ? { first_name: body.firstName } : {}),
      signup_source: body.signupSource ?? "unknown",
      ...(body.referrerCode ? { referrer_code: body.referrerCode } : {}),
      ...(referralCode ? { operative_referral_code: referralCode } : {}),
    });
  } catch (err) {
    console.error("[signup] klaviyo identify failed", err);
  }

  // TODO: queue Crossmint mint for the first 2,000 signups.
  // Blocked on collection ID — populate `nft_action_id` + transition
  // `nft_status` to 'queued' once Louis creates the collection.

  return NextResponse.json({
    ok: true,
    profile: {
      id: profile.id,
      email: profile.email,
      referralCode,
      milestoneLevel: profile.milestone_level,
    },
  });
}
