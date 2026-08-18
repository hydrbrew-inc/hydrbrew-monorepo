export const REFERRER_COOKIE = "hb_ref";

const MAX_AGE_DAYS = 90;

// Not `?ref=` — the storefront already uses that for internal CTA tags
// (?ref=lp_signup_cta), which would register campaign names as referrers.
const REFERRER_PARAMS = ["userCode", "referralCode", "referrerCode"];

// Stored as a cookie so the signup action reads it off the request rather than
// each of the five signup surfaces having to pass it. The storefront is
// multi-page, so by the time someone signs up the query string is long gone.
export function captureReferrerCode(search?: string): void {
  if (typeof window === "undefined") {
    return;
  }

  const params = new URLSearchParams(search ?? window.location.search);
  let code: string | undefined;
  for (const key of REFERRER_PARAMS) {
    const value = params.get(key)?.trim();
    if (value) {
      code = value;
      break;
    }
  }
  if (!code) {
    return;
  }

  const maxAge = MAX_AGE_DAYS * 24 * 60 * 60;
  // biome-ignore lint/suspicious/noDocumentCookie: CookieStore has no Safari support.
  document.cookie = `${REFERRER_COOKIE}=${encodeURIComponent(code)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function readReferrerCookie(request: Request): string | undefined {
  const header = request.headers.get("Cookie") ?? "";
  const match = header.match(
    new RegExp(`(?:^|;\\s*)${REFERRER_COOKIE}=([^;]*)`),
  );
  if (!match?.[1]) {
    return undefined;
  }
  return decodeURIComponent(match[1]).trim() || undefined;
}
