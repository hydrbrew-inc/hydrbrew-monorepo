// Client-side wrappers around the PostHog SDK. The SDK initializes async in
// components/analytics/PostHog.tsx; these helpers tolerate a not-yet-loaded
// state by no-oping.

import posthog from "posthog-js";

type PostHogProperties = Record<string, unknown>;

function isReady(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean((posthog as unknown as { __loaded?: boolean }).__loaded);
}

export function identifyPostHogVisitor(
  distinctId: string,
  properties?: PostHogProperties,
): void {
  if (!isReady()) return;
  posthog.identify(distinctId, properties);
}

export function capturePostHogEvent(
  eventName: string,
  properties?: PostHogProperties,
): void {
  if (!isReady()) return;
  posthog.capture(eventName, properties);
}
