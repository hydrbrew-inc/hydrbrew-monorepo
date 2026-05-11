// Meta Conversions API helper. Used server-side from /api/signup to fire a
// `Lead` event for ad-spend attribution. Pairs with the client-side fbq event
// (same event_id) so Meta dedupes — both signals improve attribution accuracy
// for iOS/ATT-restricted browsers and ad-blocked clients.
//
// Endpoint: POST https://graph.facebook.com/v21.0/{pixel_id}/events
// Auth: ?access_token={META_CAPI_ACCESS_TOKEN}
// Returns: { events_received, fbtrace_id, ... }

import crypto from "node:crypto";

const META_GRAPH_VERSION = "v21.0";

export type MetaCapiUserData = {
  email?: string;
  firstName?: string;
  lastName?: string;
  ipAddress?: string;
  userAgent?: string;
  externalId?: string;
  fbp?: string; // _fbp cookie
  fbc?: string; // _fbc cookie / fbclid query param
};

export type MetaCapiCustomData = Record<
  string,
  string | number | boolean | null | undefined
>;

export type MetaCapiEvent = {
  eventName: string;
  eventTime?: number; // unix seconds; defaults to now
  eventId?: string; // for dedup with client-side fbq
  eventSourceUrl?: string;
  actionSource?: "website" | "email" | "app" | "phone_call" | "chat";
  userData: MetaCapiUserData;
  customData?: MetaCapiCustomData;
};

function sha256(value: string): string {
  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

export async function sendMetaCapiEvent(event: MetaCapiEvent): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) {
    throw new Error(
      "Missing META_CAPI_ACCESS_TOKEN or NEXT_PUBLIC_META_PIXEL_ID",
    );
  }

  const userData: Record<string, string | string[]> = {};
  if (event.userData.email) userData.em = sha256(event.userData.email);
  if (event.userData.firstName) userData.fn = sha256(event.userData.firstName);
  if (event.userData.lastName) userData.ln = sha256(event.userData.lastName);
  if (event.userData.ipAddress) userData.client_ip_address = event.userData.ipAddress;
  if (event.userData.userAgent) userData.client_user_agent = event.userData.userAgent;
  if (event.userData.externalId)
    userData.external_id = sha256(event.userData.externalId);
  if (event.userData.fbp) userData.fbp = event.userData.fbp;
  if (event.userData.fbc) userData.fbc = event.userData.fbc;

  const cleanedCustomData = event.customData
    ? Object.fromEntries(
        Object.entries(event.customData).filter(
          ([, v]) => v !== undefined && v !== null && v !== "",
        ),
      )
    : undefined;

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: event.eventName,
        event_time: event.eventTime ?? Math.floor(Date.now() / 1000),
        action_source: event.actionSource ?? "website",
        ...(event.eventId ? { event_id: event.eventId } : {}),
        ...(event.eventSourceUrl ? { event_source_url: event.eventSourceUrl } : {}),
        user_data: userData,
        ...(cleanedCustomData ? { custom_data: cleanedCustomData } : {}),
      },
    ],
  };

  const testEventCode = process.env.META_CAPI_TEST_EVENT_CODE;
  if (testEventCode) {
    body.test_event_code = testEventCode;
  }

  const url = `https://graph.facebook.com/${META_GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Meta CAPI ${response.status}: ${text || response.statusText}`,
    );
  }
}
