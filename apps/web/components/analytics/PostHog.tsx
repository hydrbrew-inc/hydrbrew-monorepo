"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

// PostHog browser SDK. Powers product analytics + autocapture (clicks, form
// submits) + pageviews on App Router navigations. Identify happens
// post-signup in components/landing/signupFlow.ts.

export function PostHog() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;
    if (typeof window === "undefined") return;

    const flagged = window as Window & { __posthog_initialized?: boolean };
    if (flagged.__posthog_initialized) return;
    flagged.__posthog_initialized = true;

    posthog.init(key, {
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
      capture_pageview: "history_change",
      capture_pageleave: true,
      autocapture: true,
      persistence: "localStorage+cookie",
      // Session replay's recorder runs ~4s of main-thread work on every visit
      // (a major TBT/PageSpeed drag on a paid-social landing page). We keep
      // analytics + autocapture; drop the recorder. Re-enable per-flag later if
      // we want sampled replays.
      disable_session_recording: true,
    });
  }, []);

  return null;
}
