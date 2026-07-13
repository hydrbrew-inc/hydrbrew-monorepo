import {
  type ActionFunction,
  type ActionFunctionArgs,
  data,
} from "react-router";

const KLAVIYO_PROFILES_API = "https://a.klaviyo.com/api/profiles";
const KLAVIYO_EVENTS_API = "https://a.klaviyo.com/api/events";
const KLAVIYO_SUBSCRIPTIONS_API = "https://a.klaviyo.com/api/profile-subscriptions-bulk-create-jobs";

const HEADERS = (apiToken: string) => ({
  accept: "application/vnd.api+json",
  revision: "2024-10-15",
  "content-type": "application/vnd.api+json",
  Authorization: `Klaviyo-API-Key ${apiToken}`,
});

// Create or update a Klaviyo profile and return its ID.
// The ID is needed as a fallback for the list-membership endpoint.
async function upsertProfile(
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
      const json = await res.json().catch(() => ({}));
      return { ok: true, profileId: json?.data?.id as string | undefined };
    }

    if (res.status === 409) {
      // Profile already exists — Klaviyo returns the existing ID in the error meta
      const json = await res.json().catch(() => ({}));
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
async function subscribeToList(
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

    // 403 = API key missing subscriptions:write — fall back to list membership endpoint
    if (res.status === 403 && profileId) {
      console.warn("[Klaviyo subscribeToList] falling back to list-membership endpoint");
      return addProfileToList(profileId, listId, apiToken);
    }

    return { ok: false, error: `Klaviyo sub HTTP ${res.status}: ${JSON.stringify(json)}` };
  } catch (err) {
    console.error("[Klaviyo subscribeToList] network error", err);
    return { ok: false, error: String(err) };
  }
}

export const action: ActionFunction = async ({
  request,
  context,
}: ActionFunctionArgs) => {
  const apiToken = context.env.KLAVIYO_PRIVATE_API_TOKEN;
  if (!apiToken) {
    return data({ ok: false, error: "Missing KLAVIYO_PRIVATE_API_TOKEN" });
  }

  const formData = await request.formData();
  const email = formData.get("email") as string | null;
  if (!email) {
    return data({ ok: false, error: "Email is required" });
  }

  const quizScore = formData.get("quiz_score") as string | null;
  const isQuizSubmission = quizScore !== null;

  const optimizedHumanListId = context.env.KLAVIYO_LIST_ID_OPTIMIZED_HUMAN ?? "";
  const caffeineAuditListId = context.env.KLAVIYO_LIST_ID_CAFFEINE_AUDIT ?? "";

  try {
    if (isQuizSubmission) {
      // ── Quiz Completion ──────────────────────────────────────────────────────
      const tier = formData.get("quiz_tier") as string;
      const resultTitle = formData.get("quiz_result_title") as string;
      const quizProperties = {
        quiz_score: Number(quizScore),
        quiz_tier: tier,
        quiz_result_title: resultTitle,
        quiz_frequency: formData.get("quiz_frequency") ?? "",
        quiz_love_scale: formData.get("quiz_love_scale") ?? "",
        quiz_overload: formData.get("quiz_overload") ?? "",
        quiz_crashes: formData.get("quiz_crashes") ?? "",
        quiz_craving: formData.get("quiz_craving") ?? "",
        quiz_completed_at: new Date().toISOString(),
      };

      // Step 1 — upsert profile; capture ID for list-membership fallback
      const { profileId } = await upsertProfile(email, quizProperties, apiToken);

      // Step 2 — subscribe to Caffeine Audit list (now surfaces errors instead of swallowing them)
      const subResult = await subscribeToList(email, caffeineAuditListId, apiToken, profileId);
      if (!subResult.ok) {
        console.error("[Klaviyo quiz] list subscribe failed:", subResult.error);
        return data({ ok: false, error: "List subscription failed", details: subResult.error });
      }

      // Step 3 — fire "Quiz Completed" event to trigger QUIZCAFFEINEAUDIT20 flow
      const eventRes = await fetch(KLAVIYO_EVENTS_API, {
        method: "POST",
        headers: HEADERS(apiToken),
        body: JSON.stringify({
          data: {
            type: "event",
            attributes: {
              profile: {
                data: { type: "profile", attributes: { email } },
              },
              metric: {
                data: { type: "metric", attributes: { name: "Quiz Completed" } },
              },
              properties: quizProperties,
            },
          },
        }),
      });

      if (eventRes.ok || eventRes.status === 202) {
        return data({ ok: true });
      }
      const errBody = await eventRes.json().catch(() => ({}));
      return data({ ok: false, error: "Klaviyo event failed", details: errBody }, eventRes.status);
    }

    // ── Plain email signup → "Optimized Human" list ───────────────────────────
    const { profileId } = await upsertProfile(email, {}, apiToken);
    const subResult = await subscribeToList(email, optimizedHumanListId, apiToken, profileId);
    if (!subResult.ok) {
      return data({ ok: false, error: "List subscription failed", details: subResult.error });
    }
    return data({ ok: true });
  } catch {
    return data({ ok: false, error: "Something went wrong! Please try again." }, 500);
  }
};
