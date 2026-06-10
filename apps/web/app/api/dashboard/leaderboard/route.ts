import { NextResponse } from "next/server";
import { fetchViralLoopsLeaderboard } from "@repo/lib/viral-loops";

// Referral Hub leaderboard — top 20 by referral count. The current member
// (identified by `?code=`) is flagged so the UI can highlight them, and is
// appended if they rank outside the top 20.

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code")?.trim() ?? "";

  const top = await fetchViralLoopsLeaderboard(20);

  const entries = top.map((e) => ({
    rank: e.rank,
    referrals: e.referralCount,
    firstName: e.firstName,
    isCurrent: !!code && e.referralCode === code,
  }));

  return NextResponse.json({ ok: true, leaderboard: entries });
}
