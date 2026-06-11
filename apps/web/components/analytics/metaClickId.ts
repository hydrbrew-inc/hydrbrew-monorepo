// Capture Meta's click identifier (fbclid) into the `_fbc` cookie so the
// server-side Conversions API can attach it to user_data - the biggest lever
// on Event Match Quality for Lead events. The Pixel normally writes `_fbp` and
// `_fbc` itself, but ours loads `lazyOnload`, so we capture fbclid early here
// to guarantee coverage even if the param is stripped before the SDK runs.
//
// Cookie value follows Meta's documented spec: fb.<subdomainIndex>.<ms>.<fbclid>
// https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/fbp-and-fbc

const FBC_MAX_AGE_SECONDS = 90 * 24 * 60 * 60; // Meta attributes fbclid for 90 days

function hasFbcCookie(): boolean {
  return document.cookie.split("; ").some((c) => c.startsWith("_fbc="));
}

export function captureMetaClickId(): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  if (!fbclid) return;
  // First touch wins - don't clobber an _fbc the Pixel may already have set.
  if (hasFbcCookie()) return;
  const value = `fb.1.${Date.now()}.${fbclid}`;
  document.cookie = `_fbc=${value}; Max-Age=${FBC_MAX_AGE_SECONDS}; Path=/; SameSite=Lax`;
}
