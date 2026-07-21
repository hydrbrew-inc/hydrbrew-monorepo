const KLAVIYO_PROFILES_API = "https://a.klaviyo.com/api/profiles";
export const KLAVIYO_EVENTS_API = "https://a.klaviyo.com/api/events";
const KLAVIYO_SUBSCRIPTIONS_API = "https://a.klaviyo.com/api/profile-subscriptions-bulk-create-jobs";

export const HEADERS = (apiToken: string) => ({
  accept: "application/vnd.api+json",
  revision: "2024-10-15",
  "content-type": "application/vnd.api+json",
  Authorization: `Klaviyo-API-Key ${apiToken}`,
});

// Create or update a Klaviyo profile and return its ID.
// The ID is needed as a fallback for the list-membership endpoint.
export async function upsertProfile(
  email: string,
  properties: Record<string, unknown>,
  apiToken: string,
): Promise<{ ok: boolean; profileId?: string; error?: string }> {
  try {
    const body: Record<string, unknown> = { email };
    if (Object.keys(properties).length > 0) body.properties = properties;

    const res = await fetch(KLAVIYO_PROFILES_API, {
      method: "POST",
      headers: HEADERS(apiToken),
      body: JSON.stringify({ data: { type: "profile", attributes: body } }),
    });

    if (res.status === 201) {
      const json = (await res.json().catch(() => ({}))) as any;
      return { ok: true, profileId: json?.data?.id as string | undefined };
    }

    if (res.status === 409) {
      // Profile already exists — Klaviyo returns the existing ID in the error meta
      const json = (await res.json().catch(() => ({}))) as any;
      const profileId = json?.errors?.[0]?.meta?.duplicate_profile_id as string | undefined;
      return { ok: true, profileId };
    }

    const json = await res.json().catch(() => ({}));
    console.error("[Klaviyo upsertProfile] HTTP", res.status, JSON.stringify(json));
    return { ok: false, error: `Profile upsert HTTP ${res.status}: ${JSON.stringify(json)}` };
  } catch (err) {
    console.error("[Klaviyo upsertProfile] network error", err);
    return { ok: false, error: String(err) };
  }
}

// Fallback: add a profile to a list by profile ID.
// Requires lists:write scope (not subscriptions:write).
async function addProfileToList(
  profileId: string,
  listId: string,
  apiToken: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(
      `https://a.klaviyo.com/api/lists/${listId}/relationships/profiles/`,
      {
        method: "POST",
        headers: HEADERS(apiToken),
        body: JSON.stringify({ data: [{ type: "profile", id: profileId }] }),
      },
    );
    if (res.status === 204 || res.ok) return { ok: true };
    const json = await res.json().catch(() => ({}));
    console.error("[Klaviyo addProfileToList] HTTP", res.status, JSON.stringify(json));
    return { ok: false, error: `List-add HTTP ${res.status}: ${JSON.stringify(json)}` };
  } catch (err) {
    console.error("[Klaviyo addProfileToList] network error", err);
    return { ok: false, error: String(err) };
  }
}

// Subscribe an email to a Klaviyo list.
// Primary: subscriptions bulk-create endpoint (subscriptions:write scope, sets marketing consent).
// Fallback: list-relationships endpoint (lists:write scope) when primary returns 403.
export async function subscribeToList(
  email: string,
  listId: string,
  apiToken: string,
  profileId?: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!listId) return { ok: false, error: "Missing list ID" };

  try {
    const res = await fetch(KLAVIYO_SUBSCRIPTIONS_API, {
      method: "POST",
      headers: HEADERS(apiToken),
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            profiles: {
              data: [
                {
                  type: "profile",
                  attributes: {
                    email,
                    subscriptions: {
                      email: { marketing: { consent: "SUBSCRIBED" } },
                    },
                  },
                },
              ],
            },
          },
          relationships: {
            list: { data: { type: "list", id: listId } },
          },
        },
      }),
    });

    if (res.status === 202 || res.ok) return { ok: true };

    const json = await res.json().catch(() => ({}));
    console.error("[Klaviyo subscribeToList] HTTP", res.status, JSON.stringify(json));

    // Subscriptions endpoint failed — fall back to list-membership endpoint (lists:write scope)
    // This handles 403 (missing subscriptions:write), 400, or any other error
    if (profileId) {
      console.warn("[Klaviyo subscribeToList] falling back to list-membership endpoint, was HTTP", res.status);
      return addProfileToList(profileId, listId, apiToken);
    }

    return { ok: false, error: `Klaviyo sub HTTP ${res.status}: ${JSON.stringify(json)}` };
  } catch (err) {
    console.error("[Klaviyo subscribeToList] network error", err);
    return { ok: false, error: String(err) };
  }
}
