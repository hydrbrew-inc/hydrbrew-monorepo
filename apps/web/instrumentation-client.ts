import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: process.env.NODE_ENV === "production",
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,
  sendDefaultPii: false,
  ignoreErrors: [
    // Sentry's own Replay/browser-API instrumentation tripping on a detached
    // DOM node — almost always a browser extension, not our code.
    "Failed to execute 'selectNode' on 'Range'",
    "InvalidNodeTypeError",
    // Instagram in-app browser native-bridge scripts poking their webview host:
    //   - iOS: window.webkit.messageHandlers is undefined in their WKWebView
    //   - Android: the injected Java bridge object is GC'd on page unload
    // Injected by the IG app, not our code; zero user impact.
    "window.webkit.messageHandlers",
    "Java object is gone",
  ],
  // Drop errors that originate in third-party scripts, not our code:
  //   - Klaviyo's Onsite forms SDK (`onsite/js/...`) failing inside the
  //     Instagram in-app browser
  //   - scripts injected by in-app browsers / extensions (`inject_content.js`)
  //   - the Instagram in-app browser's native bridge (`sendDataToNative`,
  //     `navigation_performance_logger_android`) talking to its webview host
  // These are unhandled errors with zero user impact that flood Sentry once IG
  // ad traffic starts.
  beforeSend(event) {
    const frames = event.exception?.values?.[0]?.stacktrace?.frames ?? [];
    const isThirdPartyNoise = frames.some(
      (frame) =>
        frame.filename?.includes("onsite/js/") ||
        frame.filename?.includes("inject_content.js") ||
        frame.filename?.includes("navigation_performance_logger") ||
        frame.function?.includes("sendDataToNative"),
    );
    if (isThirdPartyNoise) return null;

    // Unhandled rejection whose "error" is a DOM `ProgressEvent` from a failed
    // XMLHttpRequest. These come from third-party SDKs (Klaviyo, Meta Pixel,
    // PostHog, the Viral Loops widget loader) whose XHR fails on a network blip
    // or an ad-blocker and leaks the error event as a promise rejection - no
    // stack, no message, zero user impact. Our own data calls use fetch (which
    // throws TypeError, never ProgressEvent), so this can't mask a real bug.
    const value = event.exception?.values?.[0]?.value ?? "";
    const serialized = event.extra?.__serialized__ as
      | { target?: unknown }
      | undefined;
    if (value.includes("ProgressEvent") || serialized?.target === "[object XMLHttpRequest]") {
      return null;
    }

    return event;
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
