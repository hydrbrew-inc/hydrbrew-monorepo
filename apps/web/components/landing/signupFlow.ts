type SignupEventName = "waitlist_join_success" | "waitlist_join_failed";
type ToastVariant = "success" | "error" | "info";

type SignupEventPayload = {
  source: string;
  status?: number;
  emailDomain?: string;
  reason?: string;
};

type ToastPayload = {
  message: string;
  variant?: ToastVariant;
};

type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (...args: unknown[]) => void;
};

function getAnalyticsWindow(): AnalyticsWindow | null {
  if (typeof window === "undefined") {
    return null;
  }
  return window as AnalyticsWindow;
}

export function getEmailDomain(email: string): string | undefined {
  const trimmed = email.trim();
  const atIndex = trimmed.lastIndexOf("@");
  if (atIndex < 0 || atIndex === trimmed.length - 1) {
    return undefined;
  }
  return trimmed.slice(atIndex + 1).toLowerCase();
}

export function trackSignupEvent(
  eventName: SignupEventName,
  payload: SignupEventPayload,
): void {
  const analyticsWindow = getAnalyticsWindow();
  if (!analyticsWindow) {
    return;
  }

  const detail = { event: eventName, ...payload };

  analyticsWindow.dispatchEvent(
    new CustomEvent("hydrbrew:waitlist", { detail }),
  );

  if (Array.isArray(analyticsWindow.dataLayer)) {
    analyticsWindow.dataLayer.push(detail);
  }

  if (typeof analyticsWindow.gtag === "function") {
    analyticsWindow.gtag("event", eventName, payload);
  }
}

export function scrollToSection(sectionId: string): void {
  if (typeof window === "undefined") {
    return;
  }
  const target = document.getElementById(sectionId);
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function showSignupToast(payload: ToastPayload): void {
  const analyticsWindow = getAnalyticsWindow();
  if (!analyticsWindow) {
    return;
  }

  analyticsWindow.dispatchEvent(
    new CustomEvent("hydrbrew:toast", {
      detail: {
        variant: payload.variant ?? "info",
        message: payload.message,
      },
    }),
  );
}
