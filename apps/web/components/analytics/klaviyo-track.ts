// Client-side wrappers around the Klaviyo Onsite SDK. The SDK loads async via
// next/script; these helpers tolerate the SDK not being ready yet by falling
// back to the queued `klaviyo.push(['command', ...])` form.

type KlaviyoSdk = {
  identify?: (properties: Record<string, unknown>) => void;
  track?: (eventName: string, properties?: Record<string, unknown>) => void;
  push?: (args: unknown[]) => void;
};

type KlaviyoWindow = Window & { klaviyo?: KlaviyoSdk };

function getKlaviyo(): KlaviyoSdk | null {
  if (typeof window === "undefined") return null;
  return (window as KlaviyoWindow).klaviyo ?? null;
}

export function identifyKlaviyoVisitor(properties: Record<string, unknown>): void {
  const klaviyo = getKlaviyo();
  if (!klaviyo) return;
  if (typeof klaviyo.identify === "function") {
    klaviyo.identify(properties);
    return;
  }
  if (typeof klaviyo.push === "function") {
    klaviyo.push(["identify", properties]);
  }
}

export function trackKlaviyoEvent(
  eventName: string,
  properties?: Record<string, unknown>,
): void {
  const klaviyo = getKlaviyo();
  if (!klaviyo) return;
  if (typeof klaviyo.track === "function") {
    klaviyo.track(eventName, properties);
    return;
  }
  if (typeof klaviyo.push === "function") {
    klaviyo.push(["track", eventName, properties]);
  }
}
