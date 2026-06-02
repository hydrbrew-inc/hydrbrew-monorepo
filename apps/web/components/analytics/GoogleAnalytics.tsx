"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

// Google Analytics 4 tag (gtag.js). The initial gtag('config', ...) call
// fires the first page_view on load; SPA route changes fire follow-up
// page_view events via the effect below since App Router doesn't trigger
// gtag.js's default page_view tracking on client-side navigation.

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: Array<Record<string, unknown> | IArguments>;
};

function GoogleAnalyticsTracker({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const gtag = (window as GtagWindow).gtag;
    if (typeof gtag !== "function") return;
    const search = searchParams?.toString();
    const path = search ? `${pathname}?${search}` : pathname;
    gtag("event", "page_view", {
      page_path: path,
      page_location: window.location.href,
      send_to: measurementId,
    });
  }, [pathname, searchParams, measurementId]);

  return null;
}

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="lazyOnload"
      />
      <Script id="ga-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
      <Suspense fallback={null}>
        <GoogleAnalyticsTracker measurementId={measurementId} />
      </Suspense>
    </>
  );
}
