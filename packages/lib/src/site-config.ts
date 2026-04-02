/**
 * Shared product defaults. Commerce (headless Shopify) is not integrated yet;
 * flip {@link launchMode} when the public homepage should show storefront sections.
 */
export const siteConfig = {
  name: "HydrBrew",
  launchMode: false,
} as const;

/** Local dev origins for sibling Next apps (adjust for deployment). */
export const devAppOrigins = {
  web: "http://localhost:3000",
  arc: "http://localhost:3002",
  scan: "http://localhost:3005",
} as const;
