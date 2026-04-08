/**
 * Shared product defaults. Commerce (headless Shopify) is not integrated yet;
 * flip {@link launchMode} when the public homepage should show storefront sections.
 */
export const siteConfig = {
  name: "HydrBrew",
  /** Display wordmark (hydrbrew°) — use in footer / chrome */
  wordmarkPlain: "hydrbrew°",
  wordmarkLead: "hydr",
  wordmarkAccent: "brew°",
  tagline: "Optimized Human Protocol",
  launchMode: false,
} as const;

/** Default SEO strings for the marketing homepage (apps/web). */
export const siteMetadata = {
  title: "HydrBrew — Launch",
  description:
    "Pre-launch landing for hydrbrew° — shop the product or enter HydrCore Base.",
} as const;

/** Local dev origins for sibling Next apps (adjust for deployment). */
export const devAppOrigins = {
  web: "http://localhost:3000",
  arc: "http://localhost:3002",
  scan: "http://localhost:3005",
} as const;
