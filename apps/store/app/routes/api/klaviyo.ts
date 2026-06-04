import {
  type ActionFunction,
  type ActionFunctionArgs,
  data,
} from "react-router";

const KLAVIYO_PROFILES_API = "https://a.klaviyo.com/api/profiles";
const KLAVIYO_EVENTS_API = "https://a.klaviyo.com/api/events";

const HEADERS = (apiToken: string) => ({
  accept: "application/vnd.api+json",
  revision: "2024-10-15",
  "content-type": "application/vnd.api+json",
  Authorization: `Klaviyo-API-Key ${apiToken}`,
});

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

  try {
    if (isQuizSubmission) {
      // ── Quiz Completion ──────────────────────────────────────────────────────
      // 1. Upsert the Klaviyo profile with quiz answers as custom properties
      // 2. Fire a "Quiz Completed" event so Klaviyo flows can trigger on it
      //    (e.g. send a 20% discount code via the Shopify discount action)

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

      // Step 1 — upsert profile (creates if new, updates if existing)
      await fetch(KLAVIYO_PROFILES_API, {
        method: "POST",
        headers: HEADERS(apiToken),
        body: JSON.stringify({
          data: {
            type: "profile",
            attributes: {
              email,
              properties: quizProperties,
            },
          },
        }),
      });

      // Step 2 — fire "Quiz Completed" event
      const eventRes = await fetch(KLAVIYO_EVENTS_API, {
        method: "POST",
        headers: HEADERS(apiToken),
        body: JSON.stringify({
          data: {
            type: "event",
            attributes: {
              profile: {
                data: {
                  type: "profile",
                  attributes: { email },
                },
              },
              metric: {
                data: {
                  type: "metric",
                  attributes: { name: "Quiz Completed" },
                },
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

    // ── Plain email signup (newsletter / social form) ─────────────────────────
    const res = await fetch(KLAVIYO_PROFILES_API, {
      method: "POST",
      headers: HEADERS(apiToken),
      body: JSON.stringify({
        data: {
          type: "profile",
          attributes: { email },
        },
      }),
    });

    if (res.ok) {
      return data({ ok: true }, res.status);
    }
    const klaviyoData = await res.json().catch(() => ({}));
    return data({ ok: false, error: "Unable to subscribe", klaviyoData }, res.status);
  } catch {
    return data({ ok: false, error: "Something went wrong! Please try again." }, 500);
  }
};
