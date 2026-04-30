export type KlaviyoProfileInput = {
  email: string;
  first_name?: string;
  signup_source?: string;
} & Record<string, string | number | boolean | null | undefined>;

export type KlaviyoSubscribeResult = {
  ok: boolean;
  status: number;
  data?: unknown;
  error?: unknown;
};

type KlaviyoEnvelope = {
  ok?: boolean;
  data?: unknown;
  error?: unknown;
};

const LOCAL_SUBSCRIBE_PATH = "/api/klaviyo/subscribe";

function readPublicEnv(key: string): string | undefined {
  if (
    typeof process !== "undefined" &&
    process.env &&
    typeof process.env[key] === "string" &&
    process.env[key] !== ""
  ) {
    return process.env[key] as string;
  }
  return undefined;
}

function readRequiredPublicEnv(key: string): string {
  const value = readPublicEnv(key);
  if (value) return value;
  throw new Error(`Missing required env var: ${key}`);
}

/**
 * Klaviyo list subscribe URL (v2). Public key is safe for the browser.
 * Set `NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY`, `NEXT_PUBLIC_KLAVIYO_LIST_ID` in the app.
 */
export function getKlaviyoSubscribeUrl(listId?: string): string {
  const apiKey = readRequiredPublicEnv("NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY");
  const list = listId ?? readRequiredPublicEnv("NEXT_PUBLIC_KLAVIYO_LIST_ID");
  return `https://a.klaviyo.com/api/v2/list/${list}/subscribe?api_key=${apiKey}`;
}

/** Oura / secondary signup list (e.g. ManifestoSection). */
export function getKlaviyoOuraSubscribeUrl(): string {
  const ouraList = readRequiredPublicEnv("NEXT_PUBLIC_KLAVIYO_OURA_LIST_ID");
  return getKlaviyoSubscribeUrl(ouraList);
}

function toKlaviyoPayload(profile: KlaviyoProfileInput): { profiles: KlaviyoProfileInput[] } {
  return {
    profiles: [profile],
  };
}

async function parseJsonSafely(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return undefined;
  }
}

function isEnvelope(value: unknown): value is KlaviyoEnvelope {
  return typeof value === "object" && value !== null && "ok" in value;
}

function isBrowserRuntime(): boolean {
  return typeof window !== "undefined";
}

function getLocalSubscribeUrl(listId?: string): string {
  if (!listId) {
    return LOCAL_SUBSCRIBE_PATH;
  }

  const params = new URLSearchParams({ listId });
  return `${LOCAL_SUBSCRIBE_PATH}?${params.toString()}`;
}

export async function subscribeToKlaviyoList(
  profile: KlaviyoProfileInput,
  listId?: string,
): Promise<KlaviyoSubscribeResult> {
  const requestUrl = isBrowserRuntime()
    ? getLocalSubscribeUrl(listId)
    : getKlaviyoSubscribeUrl(listId);

  const response = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toKlaviyoPayload(profile)),
  });

  const parsed = await parseJsonSafely(response);
  if (isEnvelope(parsed) && typeof parsed.ok === "boolean") {
    return {
      ok: parsed.ok,
      status: response.status,
      data: parsed.data,
      error: parsed.error,
    };
  }

  if (response.ok) {
    return { ok: true, status: response.status, data: parsed };
  }

  return { ok: false, status: response.status, error: parsed };
}

export async function subscribeToMainKlaviyoList(
  profile: KlaviyoProfileInput,
): Promise<KlaviyoSubscribeResult> {
  return subscribeToKlaviyoList(profile);
}

export async function subscribeToOuraKlaviyoList(
  profile: KlaviyoProfileInput,
): Promise<KlaviyoSubscribeResult> {
  const ouraList = readRequiredPublicEnv("NEXT_PUBLIC_KLAVIYO_OURA_LIST_ID");
  return subscribeToKlaviyoList(profile, ouraList);
}
