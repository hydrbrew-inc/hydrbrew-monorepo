import { leadEventValue } from "@repo/lib/site-config";

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

// Auto-attribute referrals from share links: pulls the referrer code from the
// URL query string if the caller didn't pass one explicitly. Viral Loops's
// `checkReferrals` URL uses `?userCode=`, its `sharingUrl` redirects land on
// `?referralCode=`, and other share links commonly use `?ref=`.
function readReferrerCodeFromUrl(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const params = new URLSearchParams(window.location.search);
  return (
    params.get("userCode") ??
    params.get("ref") ??
    params.get("referralCode") ??
    params.get("referrerCode") ??
    undefined
  );
}

export async function submitSignup(
  request: SignupRequest,
): Promise<SignupResult> {
  const referrerCode = request.referrerCode ?? readReferrerCodeFromUrl();
  const payload: SignupRequest = { ...request, referrerCode };

  let response: Response;
  try {
    response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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
          value: leadEventValue.value,
          currency: leadEventValue.currency,
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

    void import("../analytics/posthog-track").then(
      ({ identifyPostHogVisitor, capturePostHogEvent }) => {
        if (!data?.profile) return;
        identifyPostHogVisitor(data.profile.operativeNumber, {
          email: data.profile.email,
          operative_number: data.profile.operativeNumber,
          signup_source: request.signupSource,
          ...(referrerCode
            ? { referrer_code: referrerCode }
            : {}),
          ...(data.profile.referralCode
            ? { referral_code: data.profile.referralCode }
            : {}),
          milestone_level: data.profile.milestoneLevel,
        });
        capturePostHogEvent("waitlist_signup", {
          signup_source: request.signupSource,
          operative_number: data.profile.operativeNumber,
          ...(referrerCode
            ? { referrer_code: referrerCode }
            : {}),
        });
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
