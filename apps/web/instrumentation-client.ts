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
  ],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
