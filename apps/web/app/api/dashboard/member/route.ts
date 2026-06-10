import { NextResponse } from "next/server";
import { supabaseServer } from "@repo/lib/supabase-server";
import { fetchViralLoopsParticipant } from "@repo/lib/viral-loops";

// Referral Hub member data. Keyed by the member's referral code (the
// `?userCode=` magic-link param). Member identity comes from our profiles
// table; the live referral count comes from Viral Loops. Fails soft on VL so
// the hub still renders identity + share link.

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code")?.trim();
  if (!code) {
    return NextResponse.json({ ok: false, error: "missing_code" }, { status: 400 });
  }

  const supabase = supabaseServer();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("operative_number, first_name, signup_source")
    .eq("referral_code", code)
    .maybeSingle();

  if (error) {
    console.error("[dashboard/member] supabase error", error);
    return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
  }
  if (!profile) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }

  const vl = await fetchViralLoopsParticipant(code);

  return NextResponse.json({
    ok: true,
    member: {
      operativeNumber: profile.operative_number,
      firstName: profile.first_name ?? vl?.firstName ?? null,
      referralCode: code,
      referrals: vl?.referralCount ?? 0,
      globalRank: vl?.rank ?? null,
      sharingUrl: vl?.sharingUrl ?? `https://vrlps.co/${code}/cp`,
      signupSource: profile.signup_source ?? null,
    },
  });
}
