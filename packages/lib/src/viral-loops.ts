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

// ── Read endpoints (Referral Hub) ────────────────────────────────────────────
// Authenticated with the private apiToken (VIRAL_LOOPS_API_TOKEN), server-side
// only. The Growing plan has Full API Access. The exact participant-data /
// leaderboard request shape can vary by VL account; both helpers fail soft
// (return null / []) so the Hub still renders from Supabase if VL is down.

const VIRAL_LOOPS_API_BASE = "https://app.viral-loops.com/api/v3";

export type ViralLoopsParticipant = {
  referralCount: number;
  rank: number | null;
  firstName: string | null;
  sharingUrl: string | null;
};

export type ViralLoopsLeaderboardEntry = {
  rank: number;
  referralCount: number;
  firstName: string | null;
  referralCode: string | null;
};

function vlApiToken(): string {
  const token = process.env.VIRAL_LOOPS_API_TOKEN;
  if (!token) throw new Error("Missing VIRAL_LOOPS_API_TOKEN");
  return token;
}

/** Fetch one participant's live referral stats by their referral code. */
export async function fetchViralLoopsParticipant(
  referralCode: string,
): Promise<ViralLoopsParticipant | null> {
  try {
    const res = await fetch(`${VIRAL_LOOPS_API_BASE}/participant/data`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apiToken: vlApiToken() },
      body: JSON.stringify({ referralCode }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[viral-loops] participant data", res.status);
      return null;
    }
    const json = (await res.json()) as Record<string, unknown>;
    return normalizeParticipant(json);
  } catch (err) {
    console.error("[viral-loops] participant data failed", err);
    return null;
  }
}

/** Fetch the top `limit` participants by referral count. */
export async function fetchViralLoopsLeaderboard(
  limit = 20,
): Promise<ViralLoopsLeaderboardEntry[]> {
  try {
    const url = new URL(`${VIRAL_LOOPS_API_BASE}/leaderboard`);
    url.searchParams.set("limit", String(limit));
    const res = await fetch(url, {
      headers: { apiToken: vlApiToken() },
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[viral-loops] leaderboard", res.status);
      return [];
    }
    const json = (await res.json()) as unknown;
    const rows = Array.isArray(json)
      ? json
      : ((json as Record<string, unknown>)?.leaderboard as unknown[]) ?? [];
    return rows.map((row, i) => normalizeLeaderboardEntry(row, i));
  } catch (err) {
    console.error("[viral-loops] leaderboard failed", err);
    return [];
  }
}

// VL responses vary in field naming — accept the common variants.
function num(v: unknown): number {
  return typeof v === "number" ? v : Number(v) || 0;
}
function str(v: unknown): string | null {
  return typeof v === "string" && v.trim() !== "" ? v : null;
}

function normalizeParticipant(j: Record<string, unknown>): ViralLoopsParticipant {
  const p = (j.participant as Record<string, unknown>) ?? j;
  return {
    referralCount: num(p.referralCount ?? p.referrals ?? p.referralsCount),
    rank: p.rank != null ? num(p.rank) : null,
    firstName: str(p.firstname ?? p.firstName ?? p.first_name),
    sharingUrl: str(p.sharingUrl ?? p.referralUrl),
  };
}

function normalizeLeaderboardEntry(
  row: unknown,
  index: number,
): ViralLoopsLeaderboardEntry {
  const r = (row as Record<string, unknown>) ?? {};
  return {
    rank: r.rank != null ? num(r.rank) : index + 1,
    referralCount: num(r.referralCount ?? r.referrals ?? r.referralsCount),
    firstName: str(r.firstname ?? r.firstName ?? r.first_name ?? r.name),
    referralCode: str(r.referralCode ?? r.referral_code),
  };
}
