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

function normalizeProfiles(input: unknown): KlaviyoProfile[] {
  if (!Array.isArray(input)) {
    return [];
  }
  return input.filter(
    (item): item is KlaviyoProfile =>
      typeof item === "object" && item !== null && typeof (item as { email?: unknown }).email === "string",
  );
}

function toBulkSubscribePayload(listId: string, profiles: KlaviyoProfile[]) {
  return {
    data: {
      type: "profile-subscription-bulk-create-job",
      attributes: {
        profiles: {
          data: profiles.map((profile) => {
            const email = typeof profile.email === "string" ? profile.email : undefined;
            return {
              type: "profile",
              attributes: {
                email,
              },
            };
          }),
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
        revision: process.env.KLAVIYO_API_REVISION ?? "2024-06-15",
        Accept: "application/json",
        "Content-Type": "application/json",
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
