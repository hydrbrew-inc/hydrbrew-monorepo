// Klaviyo profile-bulk-import job: async, idempotent upsert by email.
// Used to enrich a profile with operative_number after VL native sync has
// (or hasn't yet) created it — won't error on existing profiles.

const KLAVIYO_PROFILE_BULK_IMPORT_URL =
  "https://a.klaviyo.com/api/profile-bulk-import-jobs";

export type KlaviyoProfileProperties = Record<
  string,
  string | number | boolean | null | undefined
>;

export type UpsertKlaviyoProfileInput = {
  email: string;
  firstName?: string;
  properties: KlaviyoProfileProperties;
};

export async function upsertKlaviyoProfileProperties(
  input: UpsertKlaviyoProfileInput,
): Promise<void> {
  const apiKey = process.env.KLAVIYO_PRIVATE_KEY;
  if (!apiKey) {
    throw new Error("Missing KLAVIYO_PRIVATE_KEY");
  }
  const revision = process.env.KLAVIYO_API_REVISION ?? "2026-04-15";

  const cleanedProperties = Object.fromEntries(
    Object.entries(input.properties).filter(
      ([, v]) => v !== undefined && v !== null,
    ),
  );

  const response = await fetch(KLAVIYO_PROFILE_BULK_IMPORT_URL, {
    method: "POST",
    headers: {
      Authorization: `Klaviyo-API-Key ${apiKey}`,
      revision,
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
                  properties: cleanedProperties,
                },
              },
            ],
          },
        },
      },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Klaviyo profile-bulk-import ${response.status}: ${text || response.statusText}`,
    );
  }
}
