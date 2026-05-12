export type SignupRequest = {
  email: string;
  firstName?: string;
  signupSource: string;
  referrerCode?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
    term?: string;
  };
};

export type SignupProfile = {
  id: string;
  email: string;
  operativeNumber: string;
  referralCode: string | null;
  milestoneLevel: number;
};

export type SignupResult = {
  ok: boolean;
  status: number;
  profile?: SignupProfile;
  error?: string;
};

export async function submitSignup(
  request: SignupRequest,
): Promise<SignupResult> {
  let response: Response;
  try {
    response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
  } catch {
    return { ok: false, status: 0, error: "network_error" };
  }

  let data:
    | { ok?: boolean; profile?: SignupProfile; error?: string }
    | undefined;
  try {
    data = (await response.json()) as typeof data;
  } catch {
    data = undefined;
  }

  // Fire Meta Pixel Lead event on success. event_id matches the server-side
  // CAPI call so Meta dedupes the two signals.
  if (data?.ok && data.profile && typeof window !== "undefined") {
    const fbq = (window as Window & { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq === "function") {
      fbq(
        "track",
        "Lead",
        {
          content_name: "Operative Signup",
          content_category: request.signupSource,
        },
        { eventID: `signup-${data.profile.id}` },
      );
    }

    // Identify the visitor in Klaviyo Onsite so subsequent page views are
    // attributed to this profile — feeds the "Active on Site" criterion in
    // the [Engine] High-Intent Leads segment.
    void import("../analytics/klaviyo-track").then(
      ({ identifyKlaviyoVisitor }) => {
        if (data?.profile) {
          identifyKlaviyoVisitor({
            $email: data.profile.email,
            ...(request.firstName ? { $first_name: request.firstName } : {}),
          });
        }
      },
    );
  }

  return {
    ok: !!data?.ok,
    status: response.status,
    profile: data?.profile,
    error: data?.error,
  };
}

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
