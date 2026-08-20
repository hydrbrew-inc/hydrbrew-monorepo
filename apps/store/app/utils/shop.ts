// Commerce lives on the Liquid theme at shop.hydrbrew.com, so this app links
// out rather than selling directly. Kept in one place because the host has
// moved once already (hydrbrew.myshopify.com) and will likely move again.

export const SHOP_ORIGIN = "https://shop.hydrbrew.com";

const PREORDER_HANDLE = "hydrbrew-12-pack";
const PREORDER_VARIANT = "47538404982937";

/** Product page on the storefront. `ref` attributes the click to a surface. */
export function shopProductUrl(ref?: string): string {
  const url = new URL(`/products/${PREORDER_HANDLE}`, SHOP_ORIGIN);
  url.searchParams.set("variant", PREORDER_VARIANT);
  if (ref) {
    url.searchParams.set("ref", ref);
  }
  return url.href;
}
