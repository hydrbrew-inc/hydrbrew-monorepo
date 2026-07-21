import {
  type ActionFunction,
  type ActionFunctionArgs,
  data,
} from "react-router";
import { subscribeToList, upsertProfile } from "~/.server/klaviyo";

/**
 * Legacy-compatible endpoint: POST /api/klaviyo/subscribe?listId=<id>
 * Body: { profiles: [{ email, ...customProperties }] }
 *
 * The static /protocol page (Afternoon Protocol Finder, ported from the old
 * Vercel landing site) posts this exact shape with listId=<Caffeine Audit>.
 * The listId query param is only honored when it matches one of the
 * env-configured lists — anything else falls back to the Caffeine Audit list.
 */
export const action: ActionFunction = async ({
  request,
  context,
}: ActionFunctionArgs) => {
  const apiToken = context.env.KLAVIYO_PRIVATE_API_TOKEN;
  if (!apiToken) {
    return data({ ok: false, error: "Missing KLAVIYO_PRIVATE_API_TOKEN" }, 500);
  }

  const caffeineAuditListId = context.env.KLAVIYO_LIST_ID_CAFFEINE_AUDIT ?? "";
  const optimizedHumanListId = context.env.KLAVIYO_LIST_ID_OPTIMIZED_HUMAN ?? "";

  const requestedListId = new URL(request.url).searchParams.get("listId");
  const allowedListIds = [caffeineAuditListId, optimizedHumanListId].filter(Boolean);
  const listId =
    requestedListId && allowedListIds.includes(requestedListId)
      ? requestedListId
      : caffeineAuditListId;

  let body: { profiles?: Array<Record<string, unknown>> };
  try {
    body = await request.json();
  } catch {
    return data({ ok: false, error: "Invalid JSON body" }, 400);
  }

  const profiles = Array.isArray(body.profiles) ? body.profiles : [];
  const validProfiles = profiles.filter(
    (p): p is Record<string, unknown> & { email: string } =>
      typeof p === "object" && p !== null && typeof p.email === "string" && p.email.trim() !== "",
  );
  if (validProfiles.length === 0) {
    return data({ ok: false, error: "No valid profiles provided" }, 400);
  }

  const results = await Promise.all(
    validProfiles.map(async ({ email, ...properties }) => {
      const { profileId } = await upsertProfile(email, properties, apiToken);
      return subscribeToList(email, listId, apiToken, profileId);
    }),
  );

  const failed = results.filter((r) => !r.ok);
  if (failed.length > 0) {
    console.error("[Klaviyo subscribe] failures:", failed.map((f) => f.error));
    return data({ ok: false, error: "Subscription failed", details: failed[0]?.error }, 502);
  }

  return data({ ok: true });
};
