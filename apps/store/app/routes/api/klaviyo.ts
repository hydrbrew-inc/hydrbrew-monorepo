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

async function subscribeToList(email: string, listId: string, apiToken: string) {
  if (!listId) return;
  await fetch(KLAVIYO_SUBSCRIPTIONS_API, {
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
  }).catch((err) => console.error("[Klaviyo list subscribe]", err));
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

  // List IDs from env — set in Oxygen dashboard and .env
  // KLAVIYO_LIST_ID_OPTIMIZED_HUMAN  → "Optimized Human" list (Stay Connected + footer forms)
  // KLAVIYO_LIST_ID_CAFFEINE_AUDIT   → "Caffeine Audit/Afternoon Ritual Quiz" list (quiz + audit)
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

      // Step 1 — upsert profile with quiz answers (409 = already exists, also fine)
      await fetch(KLAVIYO_PROFILES_API, {
        method: "POST",
        headers: HEADERS(apiToken),
        body: JSON.stringify({
          data: {
            type: "profile",
            attributes: { email, properties: quizProperties },
          },
        }),
      }).catch((err) => console.error("[Klaviyo profile upsert]", err));

      // Step 2 — subscribe to "Caffeine Audit/Afternoon Ritual Quiz" list
      await subscribeToList(email, caffeineAuditListId, apiToken);

      // Step 3 — fire "Quiz Completed" event to trigger Klaviyo flow (QUIZCAFFEINEAUDIT20)
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
    await subscribeToList(email, optimizedHumanListId, apiToken);

    const res = await fetch(KLAVIYO_PROFILES_API, {
      method: "POST",
      headers: HEADERS(apiToken),
      body: JSON.stringify({
        data: { type: "profile", attributes: { email } },
      }),
    });

    // 201 = created, 200 = ok, 409 = profile already exists (still a success)
    if (res.ok || res.status === 409) {
      return data({ ok: true });
    }
    const klaviyoData = await res.json().catch(() => ({}));
    return data({ ok: false, error: "Unable to subscribe", klaviyoData }, res.status);
  } catch {
    return data({ ok: false, error: "Something went wrong! Please try again." }, 500);
  }
};
