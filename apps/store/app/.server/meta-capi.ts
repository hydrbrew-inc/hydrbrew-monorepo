const META_GRAPH_VERSION = "v21.0";

type UserData = {
  ipAddress?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
  // Hashed before sending. Email is the strongest match signal Meta accepts.
  email?: string;
  firstName?: string;
  externalId?: string;
};

type CapiEvent = {
  eventName: string;
  eventId?: string;
  eventSourceUrl: string;
  userData: UserData;
  customData?: Record<string, string | number | undefined>;
};

async function sha256(value: string): Promise<string> {
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest("SHA-256", enc.encode(value.trim().toLowerCase()));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function getCookie(request: Request, name: string) {
  const header = request.headers.get("Cookie") ?? "";
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match?.[1];
}

export function extractUserData(request: Request): UserData {
  return {
    ipAddress:
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      undefined,
    userAgent: request.headers.get("user-agent") ?? undefined,
    fbp: getCookie(request, "_fbp"),
    fbc:
      getCookie(request, "_fbc") ??
      new URL(request.url).searchParams.get("fbclid") ??
      undefined,
  };
}

export async function sendCapiEvent(
  event: CapiEvent,
  pixelId: string,
  accessToken: string,
): Promise<void> {
  const ud: Record<string, string> = {};
  if (event.userData.ipAddress) ud.client_ip_address = event.userData.ipAddress;
  if (event.userData.userAgent) ud.client_user_agent = event.userData.userAgent;
  if (event.userData.fbp) ud.fbp = event.userData.fbp;
  if (event.userData.fbc) ud.fbc = event.userData.fbc;
  if (event.userData.email) ud.em = await sha256(event.userData.email);
  if (event.userData.firstName) ud.fn = await sha256(event.userData.firstName);
  if (event.userData.externalId) {
    ud.external_id = await sha256(event.userData.externalId);
  }

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: event.eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_source_url: event.eventSourceUrl,
        ...(event.eventId ? { event_id: event.eventId } : {}),
        user_data: ud,
        ...(event.customData
          ? {
              custom_data: Object.fromEntries(
                Object.entries(event.customData).filter(([, v]) => v != null),
              ),
            }
          : {}),
      },
    ],
  };

  const url = `https://graph.facebook.com/${META_GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`;
  // Returned, not awaited, so page loads stay fire-and-forget while the signup
  // action can await delivery — the worker may be torn down once it responds.
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then(() => undefined)
    .catch((err) => console.error("[Meta CAPI]", err));
}
