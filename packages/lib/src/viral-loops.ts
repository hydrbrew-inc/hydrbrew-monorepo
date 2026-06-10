// Viral Loops Public API helper. Used server-side from /api/signup.
//
// Endpoint: POST https://app.viral-loops.com/api/v3/campaign/participant
// Auth:     `publicToken` body field carries the per-campaign public token
//           (= NEXT_PUBLIC_VIRAL_LOOPS_CAMPAIGN_ID). The secret apiToken is
//           kept in env for other endpoints (Participant Data, etc.) but is
//           not needed for participant registration — VL returns 406 if you
//           pass the apiToken value here.
// Returns:  { referralCode, isNew }. Level + referralCount need a separate
//           Participant Data GET (not used at signup time — fresh signups
//           default to milestone_level=1 in the DB).

const VIRAL_LOOPS_PARTICIPANT_URL =
  "https://app.viral-loops.com/api/v3/campaign/participant";

export type ViralLoopsRegistration = {
  referralCode: string;
  isNew: boolean;
};

export type RegisterParticipantInput = {
  email: string;
  firstName?: string;
  referrerCode?: string;
};

export async function registerViralLoopsParticipant(
  input: RegisterParticipantInput,
): Promise<ViralLoopsRegistration> {
  const campaignId = process.env.NEXT_PUBLIC_VIRAL_LOOPS_CAMPAIGN_ID;
  if (!campaignId) {
    throw new Error("Missing NEXT_PUBLIC_VIRAL_LOOPS_CAMPAIGN_ID");
  }

  const body = {
    publicToken: campaignId,
    user: {
      email: input.email,
      ...(input.firstName ? { firstname: input.firstName } : {}),
    },
    ...(input.referrerCode
      ? { referrer: { referralCode: input.referrerCode } }
      : {}),
  };

  const response = await fetch(VIRAL_LOOPS_PARTICIPANT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Viral Loops ${response.status}: ${text || response.statusText}`,
    );
  }

  const json = (await response.json()) as Partial<ViralLoopsRegistration>;
  if (!json.referralCode) {
    throw new Error("Viral Loops response missing referralCode");
  }
  return { referralCode: json.referralCode, isNew: !!json.isNew };
}

// ── Read endpoint (Referral Hub) ─────────────────────────────────────────────
// Participant Data, authenticated with the private apiToken header
// (VIRAL_LOOPS_API_TOKEN), server-side only. Per VL's API reference:
//   GET /api/v3/campaign/participant/data?referralCode=...
//   → { referredLeads: number, rank: number, ... }
// The leaderboard is handled client-side by VL's native <leaderboard-widget>,
// not a REST call. Fails soft (returns null) so the Hub still renders from
// Supabase if VL is unreachable.

const VIRAL_LOOPS_API_BASE = "https://app.viral-loops.com/api/v3";

export type ViralLoopsParticipant = {
  referralCount: number;
  rank: number | null;
  firstName: string | null;
  sharingUrl: string | null;
};

/** Fetch one participant's live referral stats by their referral code. */
export async function fetchViralLoopsParticipant(
  referralCode: string,
): Promise<ViralLoopsParticipant | null> {
  const token = process.env.VIRAL_LOOPS_API_TOKEN;
  if (!token) throw new Error("Missing VIRAL_LOOPS_API_TOKEN");
  try {
    const url = new URL(`${VIRAL_LOOPS_API_BASE}/campaign/participant/data`);
    url.searchParams.set("referralCode", referralCode);
    const res = await fetch(url, {
      headers: { apiToken: token },
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[viral-loops] participant data", res.status);
      return null;
    }
    const json = (await res.json()) as Record<string, unknown>;
    const p = (json.participant as Record<string, unknown>) ?? json;
    const num = (v: unknown) => (typeof v === "number" ? v : Number(v) || 0);
    const str = (v: unknown) =>
      typeof v === "string" && v.trim() !== "" ? v : null;
    return {
      referralCount: num(p.referredLeads ?? p.referralCount ?? p.referrals),
      rank: p.rank != null ? num(p.rank) : null,
      firstName: str(p.firstname ?? p.firstName),
      sharingUrl: str(p.sharingUrl ?? p.referralUrl),
    };
  } catch (err) {
    console.error("[viral-loops] participant data failed", err);
    return null;
  }
}
