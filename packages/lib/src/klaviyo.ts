const DEFAULT_PUBLIC_KEY = "VkyzV4";
const DEFAULT_LIST_ID = "R2CKPU";
const DEFAULT_OURA_LIST_ID = "V9Sj87";

function readPublicEnv(key: string, fallback: string): string {
  if (
    typeof process !== "undefined" &&
    process.env &&
    typeof process.env[key] === "string" &&
    process.env[key] !== ""
  ) {
    return process.env[key] as string;
  }
  return fallback;
}

/**
 * Klaviyo list subscribe URL (v2). Public key is safe for the browser.
 * Set `NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY`, `NEXT_PUBLIC_KLAVIYO_LIST_ID` in the app.
 */
export function getKlaviyoSubscribeUrl(listId?: string): string {
  const apiKey = readPublicEnv("NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY", DEFAULT_PUBLIC_KEY);
  const list = listId ?? readPublicEnv("NEXT_PUBLIC_KLAVIYO_LIST_ID", DEFAULT_LIST_ID);
  return `https://a.klaviyo.com/api/v2/list/${list}/subscribe?api_key=${apiKey}`;
}

/** Oura / secondary signup list (e.g. ManifestoSection). */
export function getKlaviyoOuraSubscribeUrl(): string {
  const ouraList = readPublicEnv("NEXT_PUBLIC_KLAVIYO_OURA_LIST_ID", DEFAULT_OURA_LIST_ID);
  return getKlaviyoSubscribeUrl(ouraList);
}
