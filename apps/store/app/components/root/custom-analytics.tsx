import {
  AnalyticsEvent,
  type CartUpdatePayload,
  type PageViewPayload,
  type ProductViewPayload,
  useAnalytics,
  useNonce,
} from "@shopify/hydrogen";
import { useEffect } from "react";
import { useRouteLoaderData } from "react-router";
import type { RootLoader } from "~/root";

export function CustomAnalytics() {
  const { subscribe } = useAnalytics();
  const nonce = useNonce();
  const rootData = useRouteLoaderData<RootLoader>("root");
  const gtmId = rootData?.googleGtmID;
  const postHogKey = rootData?.postHogKey;
  const postHogHost = rootData?.postHogHost;

  // Shopify Analytics event subscriptions — feeds GTM dataLayer, Meta Pixel, GA4, and PostHog.
  // Meta Pixel and GA4 are initialised in root.tsx <head> so window.fbq / window.gtag
  // are guaranteed to exist before these callbacks ever fire.
  useEffect(() => {
    subscribe(AnalyticsEvent.PAGE_VIEWED, (data: PageViewPayload) => {
      window.dataLayer?.push({ event: "page_viewed", page_url: data.url });
      // fbq PageView for SPA navigations (initial PageView fired by <head> inline script)
      window.fbq?.("track", "PageView");
      window.gtag?.("event", "page_view", { page_location: data.url });
      window.posthog?.capture("$pageview", { $current_url: data.url });
    });

    subscribe(AnalyticsEvent.PRODUCT_VIEWED, (data: ProductViewPayload) => {
      const product = data.products?.[0];
      window.dataLayer?.push({
        event: "product_viewed",
        product_id: product?.id,
        product_name: product?.title,
        product_price: product?.price,
        product_url: product?.url,
      });
      if (product) {
        const value = parseFloat(product.price || "0");
        window.fbq?.("track", "ViewContent", {
          content_ids: [product.variantId || product.id],
          content_type: "product",
          content_name: product.title,
          value,
          currency: "USD",
        });
        window.gtag?.("event", "view_item", {
          currency: "USD",
          value,
          items: [
            {
              item_id: product.variantId || product.id,
              item_name: product.title,
              price: value,
              quantity: product.quantity ?? 1,
            },
          ],
        });
      }
    });

    subscribe(AnalyticsEvent.COLLECTION_VIEWED, (data) => {
      window.dataLayer?.push({
        event: "collection_viewed",
        collection_handle: (data as any).collection?.handle,
      });
    });

    subscribe(AnalyticsEvent.CART_UPDATED, (data: CartUpdatePayload) => {
      window.dataLayer?.push({
        event: "cart_updated",
        cart_id: data.cart?.id,
        cart_total: data.cart?.cost?.totalAmount?.amount,
        cart_total_quantity: data.cart?.totalQuantity,
      });
    });

    subscribe(AnalyticsEvent.PRODUCT_ADD_TO_CART, (data: any) => {
      window.dataLayer?.push({ event: "add_to_cart" });
      const line = data.currentLine;
      if (line) {
        const value = parseFloat(line.cost?.totalAmount?.amount || "0");
        const currency = line.cost?.totalAmount?.currencyCode || "USD";
        window.fbq?.("track", "AddToCart", {
          content_ids: [line.merchandise?.id],
          content_type: "product",
          value,
          currency,
        });
        window.gtag?.("event", "add_to_cart", {
          currency,
          value,
          items: [
            {
              item_id: line.merchandise?.id,
              item_name: line.merchandise?.product?.title,
              price: value / (line.quantity || 1),
              quantity: line.quantity ?? 1,
            },
          ],
        });
      }
    });

    subscribe(AnalyticsEvent.PRODUCT_REMOVED_FROM_CART, (_data) => {
      window.dataLayer?.push({ event: "remove_from_cart" });
    });

    subscribe(AnalyticsEvent.SEARCH_VIEWED, (_data) => {
      window.dataLayer?.push({ event: "search_viewed" });
    });
  }, [subscribe]);

  // GTM (only if PUBLIC_GOOGLE_GTM_ID is set — separate from direct GA4)
  useEffect(() => {
    if (!gtmId) return;
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag("js", new Date());
    gtag({ "gtm.start": Date.now(), event: "gtm.js" });
    gtag("config", gtmId);
    const init = () => {
      const script = document.createElement("script");
      script.async = true;
      script.nonce = nonce;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
      document.head.appendChild(script);
    };
    if ("requestIdleCallback" in window) {
      requestIdleCallback(init);
    } else {
      setTimeout(init, 1000);
    }
  }, [gtmId, nonce]);

  // PostHog — dynamic import keeps posthog-js out of the SSR bundle
  useEffect(() => {
    if (!postHogKey || window.posthog) return;
    import("posthog-js").then(({ default: posthog }) => {
      posthog.init(postHogKey, {
        api_host: postHogHost || "https://us.i.posthog.com",
        capture_pageview: false, // handled via PAGE_VIEWED subscription
        capture_pageleave: true,
        person_profiles: "identified_only",
      });
      window.posthog = posthog;
    });
  }, [postHogKey, postHogHost]);

  return null;
}
