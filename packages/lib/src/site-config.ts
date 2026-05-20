/** Shared marketing defaults. Commerce lives on Hydrogen (`apps/store`); link via {@link getStoreUrl}. */
export const siteConfig = {
  name: "HydrBrew",
  /** Display wordmark (hydrbrew°) — use in footer / chrome */
  wordmarkPlain: "hydrbrew°",
  wordmarkLead: "hydr",
  wordmarkAccent: "brew°",
  tagline: "Optimized Human Protocol",
  /** Reserved for future homepage storefront embeds (commerce is on Oxygen, not Next). */
  launchMode: false,
} as const;

/** Default SEO strings for the marketing homepage (apps/web). */
export const siteMetadata = {
  title: "HydrBrew — Launch",
  description: "Pre-launch landing for hydrbrew° — shop the product.",
} as const;

/** Local dev origins for sibling Next apps (adjust for deployment). */
export const devAppOrigins = {
  web: "http://localhost:3000",
  store: "http://127.0.0.1:3456",
  arc: "http://localhost:3002",
  scan: "http://localhost:3005",
} as const;
