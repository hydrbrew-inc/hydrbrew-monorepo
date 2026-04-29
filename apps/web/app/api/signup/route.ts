import { NextResponse } from "next/server";
import { supabaseServer } from "@repo/lib/supabase-server";
import { registerViralLoopsParticipant } from "@repo/lib/viral-loops";
import { upsertKlaviyoProfileProperties } from "@repo/lib/klaviyo-profile";

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

  // 1. Register with Viral Loops first. VL's native Klaviyo integration pushes
  //    Name/Email/Referral Link into Klaviyo automatically. Failure here doesn't
  //    block — the profile still saves and the webhook can reconcile later.
  let referralCode: string | null = null;
  try {
    const participant = await registerViralLoopsParticipant({
      email,
      firstName: body.firstName,
      referrerCode: body.referrerCode,
    });
    referralCode = participant.referralCode;
  } catch (err) {
    console.error("[signup] viral loops register failed", err);
  }

  // 2. Upsert into Supabase. The default on `operative_number` assigns the
  //    next HB-XXXX value via sequence on insert; on conflict the existing
  //    operative_number is preserved.
  const supabase = supabaseServer();
  const { data: profile, error: upsertError } = await supabase
    .from("profiles")
    .upsert(
      {
        email,
        first_name: body.firstName ?? null,
        signup_source: body.signupSource ?? null,
        referrer_code: body.referrerCode ?? null,
        ...(referralCode
          ? { referral_code: referralCode, operative_id: referralCode }
          : {}),
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

  // 3. Push operative_number into Klaviyo. profile-import is idempotent — if
  //    VL native sync hasn't created the profile yet, this creates it; otherwise
  //    merges. The Initialization Email waits on this property to exist.
  try {
    await upsertKlaviyoProfileProperties({
      email,
      firstName: body.firstName,
      properties: {
        operative_number: profile.operative_number,
        signup_source: body.signupSource ?? "unknown",
        referrer_code: body.referrerCode,
      },
    });
  } catch (err) {
    console.error("[signup] klaviyo enrichment failed", err);
  }

  // TODO: queue Crossmint mint for the first 2,000 signups once the collection exists.

  return NextResponse.json({
    ok: true,
    profile: {
      id: profile.id,
      email: profile.email,
      operativeNumber: profile.operative_number,
      referralCode,
      milestoneLevel: profile.milestone_level,
    },
  });
}
