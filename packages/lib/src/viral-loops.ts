// Viral Loops Public API helper. Used server-side from /api/signup.
//
// Endpoint: POST https://app.viral-loops.com/api/v3/campaign/participant
// Auth:     `publicToken` body field accepts either the publicToken or the
//           secret apiToken — we pass the apiToken from server context.
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
  const apiToken = process.env.VIRAL_LOOPS_API_TOKEN;
  if (!apiToken) {
    throw new Error("Missing VIRAL_LOOPS_API_TOKEN");
  }

  const body = {
    publicToken: apiToken,
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
