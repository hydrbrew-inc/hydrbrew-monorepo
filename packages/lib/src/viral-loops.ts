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
