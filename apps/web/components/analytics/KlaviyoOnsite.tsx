"use client";

import Script from "next/script";

// Klaviyo Onsite tracking script. Required for the "Active on Site" criterion
// in the [Engine] High-Intent Leads segment to match — without this script in
// <head>, Klaviyo never observes site activity and the segment stays empty.
//
// Also enables klaviyo.identify() + klaviyo.track() calls anywhere in the
// app (see ./klaviyo-track.ts).

export function KlaviyoOnsite() {
  const publicKey = process.env.NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY ?? "VkyzV4";

  return (
    <Script
      id="klaviyo-onsite"
      src={`https://static.klaviyo.com/onsite/js/${publicKey}/klaviyo.js`}
      strategy="lazyOnload"
    />
  );
}
