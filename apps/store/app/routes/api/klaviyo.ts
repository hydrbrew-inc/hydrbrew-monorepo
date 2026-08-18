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
import { extractUserData, sendCapiEvent } from "~/.server/meta-capi";
import {
  enrichKlaviyoProfile,
  registerViralLoopsParticipant,
  upsertMemberProfile,
} from "~/.server/member-pipeline";
import { readReferrerCookie } from "~/utils/referrer";

const LEAD_VALUE = 5;
const LEAD_CURRENCY = "USD";

type MemberResult = { operativeNumber: string; eventId: string } | null;

// Runs after Klaviyo already has the email, so every step is best-effort — a VL
// or Supabase outage must not surface as a failed signup and push the visitor
// into re-submitting. Failures are logged and picked up by the backfill.
async function runMemberPipeline(
  request: Request,
  env: Env,
  input: {
    email: string;
    firstName?: string;
    signupSource: string;
    referrerCode?: string;
  },
): Promise<MemberResult> {
  const { SUPABASE_URL, SUPABASE_SECRET_KEY } = env;
  if (!(SUPABASE_URL && SUPABASE_SECRET_KEY)) {
    console.error("[member] missing Supabase credentials — skipping");
    return null;
  }

  let referralCode: string | undefined;
  const campaignId = env.PUBLIC_VIRAL_LOOPS_CAMPAIGN_ID;
  if (campaignId) {
    try {
      referralCode = await registerViralLoopsParticipant(input, campaignId);
    } catch (err) {
      console.error("[member] viral loops register failed", err);
    }
  }

  let member: Awaited<ReturnType<typeof upsertMemberProfile>>;
  try {
    member = await upsertMemberProfile(
      { ...input, referralCode },
      { supabaseUrl: SUPABASE_URL, supabaseKey: SUPABASE_SECRET_KEY },
    );
  } catch (err) {
    console.error("[member] supabase upsert failed", err);
    return null;
  }

  // Matches the eventID the browser passes to fbq.
  const eventId = `signup-${member.id}`;
  const capiEnabled = Boolean(
    env.PUBLIC_META_PIXEL_ID && env.META_CAPI_ACCESS_TOKEN,
  );

  // Independent, and this action is already five round trips deep by here.
  await Promise.all([
    enrichKlaviyoProfile(
      {
        email: input.email,
        firstName: input.firstName,
        properties: {
          operative_number: member.operativeNumber,
          signup_source: input.signupSource,
          referrer_code: input.referrerCode,
        },
      },
      env.KLAVIYO_PRIVATE_API_TOKEN,
    ).catch((err) => console.error("[member] klaviyo enrichment failed", err)),

    capiEnabled &&
      sendCapiEvent(
        {
          eventName: "Lead",
          eventId,
          eventSourceUrl: new URL(request.url).origin,
          userData: {
            ...extractUserData(request),
            email: input.email,
            firstName: input.firstName,
            externalId: member.operativeNumber,
          },
          customData: {
            value: LEAD_VALUE,
            currency: LEAD_CURRENCY,
            operative_number: member.operativeNumber,
            signup_source: input.signupSource,
          },
        },
        env.PUBLIC_META_PIXEL_ID,
        env.META_CAPI_ACCESS_TOKEN,
      ).catch((err) => console.error("[member] meta capi failed", err)),
  ]);

  return { operativeNumber: member.operativeNumber, eventId };
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

  const readField = (key: string) =>
    (formData.get(key) as string | null)?.trim() || undefined;
  const memberInput = {
    email,
    firstName: readField("first_name"),
    signupSource:
      readField("signup_source") ?? (isQuizSubmission ? "store_quiz" : "store"),
    referrerCode: readField("referrer_code") ?? readReferrerCookie(request),
  };

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

      if (!(eventRes.ok || eventRes.status === 202)) {
        const errBody = await eventRes.json().catch(() => ({}));
        return data({ ok: false, error: "Klaviyo event failed", details: errBody }, eventRes.status);
      }
    } else {
      // ── Plain email signup → "Optimized Human" list ─────────────────────────
      const { profileId } = await upsertProfile(email, {}, apiToken);
      const subResult = await subscribeToList(email, optimizedHumanListId, apiToken, profileId);
      if (!subResult.ok) {
        return data({ ok: false, error: "List subscription failed", details: subResult.error });
      }
    }

    const member = await runMemberPipeline(request, context.env, memberInput);
    return data({ ok: true, ...member });
  } catch {
    return data({ ok: false, error: "Something went wrong! Please try again." }, 500);
  }
};
