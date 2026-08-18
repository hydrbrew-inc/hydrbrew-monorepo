// Mirrors apps/web/app/api/signup/route.ts. Duplicated rather than imported —
// the store is outside the pnpm workspace and can't resolve @repo/lib. Keep in
// sync with packages/lib/src/{viral-loops,klaviyo-profile}.ts.

const VIRAL_LOOPS_PARTICIPANT_URL =
  "https://app.viral-loops.com/api/v3/campaign/participant";
const KLAVIYO_PROFILE_BULK_IMPORT_URL =
  "https://a.klaviyo.com/api/profile-bulk-import-jobs";
const KLAVIYO_IMPORT_REVISION = "2026-04-15";

export type MemberProfile = {
  id: string;
  email: string;
  operativeNumber: string;
  milestoneLevel: number;
};

// Auth is the campaign's public token in the body — the secret apiToken 406s here.
export async function registerViralLoopsParticipant(
  input: { email: string; firstName?: string; referrerCode?: string },
  campaignId: string,
): Promise<string> {
  const response = await fetch(VIRAL_LOOPS_PARTICIPANT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      publicToken: campaignId,
      user: {
        email: input.email,
        ...(input.firstName ? { firstname: input.firstName } : {}),
      },
      ...(input.referrerCode
        ? { referrer: { referralCode: input.referrerCode } }
        : {}),
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Viral Loops ${response.status}: ${text || response.statusText}`,
    );
  }

  const json = (await response.json()) as { referralCode?: string };
  if (!json.referralCode) {
    throw new Error("Viral Loops response missing referralCode");
  }
  return json.referralCode;
}

export type UpsertMemberInput = {
  email: string;
  firstName?: string;
  signupSource?: string;
  referralCode?: string;
  referrerCode?: string;
};

// The column default assigns HB-XXXX on insert. Only send defined columns:
// ON CONFLICT DO UPDATE overwrites whatever we pass, so a second signup would
// otherwise blank a first_name captured the first time.
export async function upsertMemberProfile(
  input: UpsertMemberInput,
  env: { supabaseUrl: string; supabaseKey: string },
): Promise<MemberProfile> {
  const row: Record<string, string> = { email: input.email };
  if (input.firstName) {
    row.first_name = input.firstName;
  }
  if (input.signupSource) {
    row.signup_source = input.signupSource;
  }
  if (input.referrerCode) {
    row.referrer_code = input.referrerCode;
  }
  if (input.referralCode) {
    row.referral_code = input.referralCode;
    row.operative_id = input.referralCode;
  }

  const url = `${env.supabaseUrl.replace(/\/$/, "")}/rest/v1/profiles?on_conflict=email`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      apikey: env.supabaseKey,
      Authorization: `Bearer ${env.supabaseKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify([row]),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Supabase upsert ${response.status}: ${text || response.statusText}`,
    );
  }

  const rows = (await response.json()) as Array<{
    id: string;
    email: string;
    operative_number: string;
    milestone_level: number;
  }>;
  const profile = rows[0];
  if (!profile) {
    throw new Error("Supabase upsert returned no row");
  }

  return {
    id: profile.id,
    email: profile.email,
    operativeNumber: profile.operative_number,
    milestoneLevel: profile.milestone_level,
  };
}

// Merges by email, so it works whether or not VL's native Klaviyo sync has
// created the profile yet. The Initialization Email waits on operative_number.
export async function enrichKlaviyoProfile(
  input: {
    email: string;
    firstName?: string;
    properties: Record<string, string | number | boolean | undefined>;
  },
  apiToken: string,
): Promise<void> {
  const properties = Object.fromEntries(
    Object.entries(input.properties).filter(([, v]) => v !== undefined),
  );

  const response = await fetch(KLAVIYO_PROFILE_BULK_IMPORT_URL, {
    method: "POST",
    headers: {
      Authorization: `Klaviyo-API-Key ${apiToken}`,
      revision: KLAVIYO_IMPORT_REVISION,
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
    },
    body: JSON.stringify({
      data: {
        type: "profile-bulk-import-job",
        attributes: {
          profiles: {
            data: [
              {
                type: "profile",
                attributes: {
                  email: input.email,
                  ...(input.firstName ? { first_name: input.firstName } : {}),
                  properties,
                },
              },
            ],
          },
        },
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Klaviyo profile-bulk-import ${response.status}: ${text || response.statusText}`,
    );
  }
}
