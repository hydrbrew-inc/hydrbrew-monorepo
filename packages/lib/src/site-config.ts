/** Shared marketing defaults. Commerce lives on Hydrogen (`apps/store`); link via {@link getStoreUrl}. */
export const siteConfig = {
  name: "hydrbrew°",
  /** Display wordmark (hydrbrew°) — use in footer / chrome */
  wordmarkPlain: "hydrbrew°",
  wordmarkLead: "hydr",
  wordmarkAccent: "brew°",
  tagline: "Optimized Human Protocol",
  /** Reserved for future homepage storefront embeds (commerce is on Oxygen, not Next). */
  launchMode: false,
} as const;

/**
 * Default SEO strings for the marketing homepage (apps/web).
 *
 * `title` + `description` are the keyword-focused versions shown in Google
 * SERPs and the browser tab. `ogTitle` + `ogDescription` are the CTA-forward
 * versions used by Open Graph + Twitter Cards — i.e. when the URL is shared
 * on Facebook / Instagram / LinkedIn / iMessage / Slack / X.
 */
export const siteMetadata = {
  title: "Functional Iced Coffee for Afternoon Focus | hydrbrew°",
  description:
    "hydrbrew° is a functional iced coffee with 85mg buffered caffeine, 200mg L-Theanine, and Lion's Mane — engineered for clean, sustained afternoon focus. Zero systemic debt. Pre-order now, launching July 2026.",
  ogTitle:
    "hydrbrew° — Functional Iced Coffee | Zero Systemic Debt | Pre-Order Now",
  ogDescription:
    "hydrbrew° is a functional iced coffee with 85mg buffered caffeine, 200mg L-Theanine, and Lion's Mane — engineered for clean, sustained afternoon focus. Zero systemic debt. Pre-order now, launching July 2026.",
  siteUrl: "https://hydrbrew.com",
  ogImage: "/og-image.jpg",
} as const;

/** Local dev origins for sibling Next apps (adjust for deployment). */
export const devAppOrigins = {
  web: "http://localhost:3000",
  store: "http://127.0.0.1:3456",
  arc: "http://localhost:3002",
  scan: "http://localhost:3005",
} as const;
