import {
  type ActionFunction,
  type ActionFunctionArgs,
  data,
} from "react-router";
import {
  HEADERS,
  KLAVIYO_EVENTS_API,
  subscribeToList,
  upsertProfile,
} from "~/.server/klaviyo";

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
