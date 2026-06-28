const DEFAULT_DEV_STORE_URL = "http://127.0.0.1:3456";
const DEFAULT_PREORDER_HANDLE = "hydrbrew-pre-order-bundle";

function normalizeBaseUrl(url: string): string {
  const trimmed = url.trim();
  return trimmed.endsWith("/") ? trimmed : `${trimmed}/`;
}

/** Hydrogen storefront on Oxygen (prod) or MiniOxygen (local dev). */
export function getStoreUrl(): string {
  const configured = process.env.NEXT_PUBLIC_STORE_URL?.trim();
  if (configured) {
    return normalizeBaseUrl(configured);
  }
  if (process.env.NODE_ENV === "development") {
    return normalizeBaseUrl(DEFAULT_DEV_STORE_URL);
  }
  return normalizeBaseUrl("https://hydrbrew.com/");
}

export function getStorePreOrderHandle(): string {
  return (
    process.env.NEXT_PUBLIC_STORE_PREORDER_HANDLE?.trim() ||
    DEFAULT_PREORDER_HANDLE
  );
}

export function getStorePreOrderVariant(): string | undefined {
  return process.env.NEXT_PUBLIC_STORE_PREORDER_VARIANT?.trim() || undefined;
}

/** Pre-order PDP on the Hydrogen shop. Pass `ref` to attribute the click. */
export function getStorePreOrderUrl(opts?: { ref?: string }): string {
  const handle = getStorePreOrderHandle();
  const url = new URL(`products/${handle}`, getStoreUrl());
  const variant = getStorePreOrderVariant();
  if (variant) {
    url.searchParams.set("variant", variant);
  }
  if (opts?.ref) {
    url.searchParams.set("ref", opts.ref);
  }
  return url.href;
}
