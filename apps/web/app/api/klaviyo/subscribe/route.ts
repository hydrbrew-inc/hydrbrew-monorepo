import { upsertKlaviyoProfileProperties } from "@repo/lib/klaviyo-profile";
import { NextResponse } from "next/server";

type SubscribeRequestBody = {
  profiles?: unknown;
};

type KlaviyoProfile = {
  email?: string;
  [key: string]: unknown;
};

function getListIdFromRequest(request: Request): string | undefined {
  const { searchParams } = new URL(request.url);
  const listId = searchParams.get("listId");
  return listId && listId.trim() !== "" ? listId : undefined;
}

function getConfiguredListId(request: Request): string | undefined {
  return (
    getListIdFromRequest(request) ??
    process.env.KLAVIYO_LIST_ID ??
    process.env.NEXT_PUBLIC_KLAVIYO_LIST_ID
  );
}

function getPrivateApiKey(): string | undefined {
  const key = process.env.KLAVIYO_PRIVATE_KEY;
  if (!key || key.trim() === "") {
    return undefined;
  }
  return key;
}

function getKlaviyoApiRevision(): string {
  const fallback = "2026-04-15";
  let raw = process.env.KLAVIYO_API_REVISION?.trim();
  if (!raw) return fallback;
  if (
    (raw.startsWith('"') && raw.endsWith('"')) ||
    (raw.startsWith("'") && raw.endsWith("'"))
  ) {
    raw = raw.slice(1, -1).trim();
  }
  return raw || fallback;
}

function normalizeProfiles(input: unknown): KlaviyoProfile[] {
  if (!Array.isArray(input)) {
    return [];
  }
  return input.filter(
    (item): item is KlaviyoProfile =>
      typeof item === "object" && item !== null && typeof (item as { email?: unknown }).email === "string",
  );
}

/**
 * Nested profiles on profile-subscription-bulk-create-jobs only allow a small
 * attribute set (e.g. email + subscriptions). first_name / properties belong
 * on create-or-update flows; we enrich after subscribe via profile-bulk-import.
 */
function toProfileSubscriptionAttributes(profile: KlaviyoProfile): Record<string, unknown> {
  const email = typeof profile.email === "string" ? profile.email : undefined;
  return {
    email,
    subscriptions: {
      email: {
        marketing: {
          consent: "SUBSCRIBED",
        },
      },
    },
  };
}

async function enrichProfilesAfterSubscribe(profiles: KlaviyoProfile[]): Promise<void> {
  for (const profile of profiles) {
    const email = typeof profile.email === "string" ? profile.email.trim() : "";
    if (!email) continue;

    const firstName =
      typeof profile.first_name === "string" && profile.first_name.trim() !== ""
        ? profile.first_name.trim()
        : undefined;
    const signupSource =
      typeof profile.signup_source === "string" && profile.signup_source.trim() !== ""
        ? profile.signup_source.trim()
        : undefined;

    if (!firstName && !signupSource) continue;

    try {
      await upsertKlaviyoProfileProperties({
        email,
        ...(firstName ? { firstName } : {}),
        properties: signupSource ? { signup_source: signupSource } : {},
      });
    } catch (err) {
      console.error("[klaviyo/subscribe] profile enrich after list subscribe failed:", err);
    }
  }
}

function toBulkSubscribePayload(listId: string, profiles: KlaviyoProfile[]) {
  return {
    data: {
      type: "profile-subscription-bulk-create-job",
      attributes: {
        profiles: {
          data: profiles.map((profile) => ({
            type: "profile",
            attributes: toProfileSubscriptionAttributes(profile),
          })),
        },
      },
      relationships: {
        list: {
          data: {
            type: "list",
            id: listId,
          },
        },
      },
    },
  };
}

export async function POST(request: Request) {
  let body: SubscribeRequestBody;

  try {
    body = (await request.json()) as SubscribeRequestBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  if (!body || !Array.isArray(body.profiles) || body.profiles.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Request must include a non-empty profiles array" },
      { status: 400 },
    );
  }

  const profiles = normalizeProfiles(body.profiles);
  if (profiles.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Request profiles must include valid email values" },
      { status: 400 },
    );
  }

  const listId = getConfiguredListId(request);
  if (!listId) {
    return NextResponse.json(
      { ok: false, error: "Missing list ID configuration (KLAVIYO_LIST_ID or NEXT_PUBLIC_KLAVIYO_LIST_ID)" },
      { status: 500 },
    );
  }

  const privateApiKey = getPrivateApiKey();
  if (!privateApiKey) {
    return NextResponse.json(
      { ok: false, error: "Missing KLAVIYO_PRIVATE_KEY in server environment" },
      { status: 500 },
    );
  }

  try {
    const klaviyoResponse = await fetch(
      "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
      {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${privateApiKey}`,
        revision: getKlaviyoApiRevision(),
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
      body: JSON.stringify(toBulkSubscribePayload(listId, profiles)),
      cache: "no-store",
      },
    );

    let parsed: unknown;
    let rawText: string | undefined;
    try {
      parsed = await klaviyoResponse.json();
    } catch {
      try {
        rawText = await klaviyoResponse.text();
      } catch {
        rawText = undefined;
      }
    }

    const upstreamError =
      klaviyoResponse.ok
        ? undefined
        : parsed ??
          {
            message: "Klaviyo returned a non-JSON error response",
            statusText: klaviyoResponse.statusText,
            body: rawText && rawText.length > 0 ? rawText : undefined,
          };

    if (klaviyoResponse.ok) {
      await enrichProfilesAfterSubscribe(profiles);
    }

    return NextResponse.json(
      {
        ok: klaviyoResponse.ok,
        data:
          klaviyoResponse.ok
            ? parsed ?? { message: "Accepted by Klaviyo" }
            : undefined,
        error: upstreamError,
      },
      { status: klaviyoResponse.status },
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Unable to reach Klaviyo upstream",
      },
      { status: 502 },
    );
  }
}
