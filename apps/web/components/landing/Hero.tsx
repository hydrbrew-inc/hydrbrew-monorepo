import { useState } from "react";
import {
  getEmailDomain,
  scrollToSection,
  showSignupToast,
  submitSignup,
  trackSignupEvent,
} from "./signupFlow";

const FONT = "var(--font-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-playfair), Georgia, serif";
const SANS = "var(--font-jakarta), var(--font-inter), system-ui, sans-serif";
const BODY = "var(--font-inter), system-ui, sans-serif";
const LOGO = "var(--font-space-grotesk), system-ui, sans-serif";
const CYAN = "#00FFFF";
const BG = "#000000";
const IMG = "/images/hero-bg.webp";

const INPUT_STYLE: React.CSSProperties = {
  fontFamily: FONT,
  fontWeight: 600,
  letterSpacing: "0.04em",
  fontSize: 15,
  color: "#FFFFFF",
  background: "rgba(0,0,0,0.55)",
  border: "1.5px solid rgba(0,255,255,0.65)",
  borderRadius: 9,
  padding: "15px 18px",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

export function Hero() {
  const [email, setEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const btnShadowBase = "0 0 22px rgba(0,255,255,0.6), inset 0 0 16px rgba(255,255,255,0.28)";
  const btnShadowHover = "0 0 38px rgba(0,255,255,0.95), inset 0 0 28px rgba(255,255,255,0.5)";

  const handleSubmit = async () => {
    if (!email || isSubmitting) return;
    setIsSubmitting(true);
    const result = await submitSignup({ email, signupSource: "hero_initialize_access" });
    if (result.ok && result.profile) {
      trackSignupEvent("waitlist_join_success", {
        source: "hero_initialize_access",
        status: result.status,
        emailDomain: getEmailDomain(email),
      });
      showSignupToast({
        variant: "success",
        message: `You're in, ${result.profile.operativeNumber}. Check your inbox.`,
      });
      setEmail("");
      setTimeout(() => scrollToSection("email-capture"), 300);
    } else {
      trackSignupEvent("waitlist_join_failed", {
        source: "hero_initialize_access",
        status: result.status,
        reason: result.error ?? "upstream_rejected",
        emailDomain: getEmailDomain(email),
      });
      showSignupToast({
        variant: "error",
        message:
          result.status === 0
            ? "Network issue. Please try again in a moment."
            : "Join failed. Please try again.",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <style>{`
        .hb-root, .hb-root *, .hb-root *::before, .hb-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes btnPulse {
          0%, 100% { box-shadow: 0 0 22px rgba(0,255,255,0.6), inset 0 0 16px rgba(255,255,255,0.28); }
          50%       { box-shadow: 0 0 34px rgba(0,255,255,0.85), inset 0 0 16px rgba(255,255,255,0.28); }
        }
        @keyframes shimmer { 0% { transform: translateX(-200%); } 66%, 100% { transform: translateX(200%); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes arrowNudge { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(5px); } }
        .hb-pulse { animation: btnPulse 2.4s ease-in-out infinite; }

        .hb-root {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 560px;
          overflow: hidden;
          background: ${BG};
          font-family: ${BODY};
        }
        .hb-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: brightness(1.1) saturate(1.03);
        }

        /* Scrim: guarantees card legibility regardless of image, adds depth */
        .hb-scrim {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: linear-gradient(to top,
            rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.18) 42%, transparent 66%);
        }
        @media (min-width: 760px) {
          .hb-scrim {
            background: linear-gradient(to right,
              rgba(0,0,0,0.74) 0%, rgba(0,0,0,0.34) 36%, transparent 60%);
          }
        }

        /* Brand bar */
        .hb-topbar {
          position: absolute;
          top: 0; left: 0; right: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 22px 30px;
          z-index: 4;
        }
        .hb-logo {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-weight: 600;
          font-size: 23px;
          letter-spacing: -0.01em;
          color: #FFFFFF;
          text-transform: lowercase;
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.85);
          padding: 8px 18px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(0, 255, 255, 0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .hb-logo-accent { color: ${CYAN}; text-shadow: 0 0 14px rgba(0,255,255,0.7); }
        .hb-logo-mark {
          width: 20px; height: 20px; border-radius: 6px;
          background: linear-gradient(135deg, ${CYAN} 0%, #0088aa 100%);
          box-shadow: 0 0 14px rgba(0,255,255,0.6), inset 0 0 6px rgba(255,255,255,0.5);
          flex-shrink: 0;
        }
        @media (max-width: 759px) {
          /* Mobile: zoom out to cover and pan to keep her face while showing more can */
          .hb-bg { transform: none; object-position: 60% center; }
        }

        /* Signup card — precision-placed in open negative space */
        .hb-card {
          position: absolute;
          z-index: 4;
          left: 16px; right: 16px; bottom: 18px;
          display: flex; flex-direction: column; gap: 13px;
          padding: 20px 20px 22px;
          border-radius: 16px;
          background: rgba(0,0,0,0.55);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 18px 50px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.05);
          backdrop-filter: blur(18px) saturate(1.1);
          -webkit-backdrop-filter: blur(18px) saturate(1.1);
          animation: fadeUp 0.5s ease both;
        }
        .hb-h1 {
          font-family: ${DISPLAY};
          font-weight: 500; text-transform: none;
          font-size: 34px; line-height: 1.2; letter-spacing: normal;
          color: #FFFFFF;
          -webkit-font-smoothing: antialiased;
          text-wrap: balance;
        }
        .hb-h1 .hb-cyan { color: ${CYAN}; font-style: italic; white-space: nowrap; }
        .hb-sub {
          font-family: ${SANS};
          font-weight: 400; font-size: 13px;
          letter-spacing: 0; line-height: 1.55;
          color: rgba(255,255,255,0.9);
          -webkit-font-smoothing: antialiased;
        }
        .hb-form { display: flex; flex-direction: column; gap: 9px; }
        .hb-field::placeholder { color: rgba(255,255,255,0.62); font-weight: 600; }
        .hb-cta-btn {
          position: relative; display: inline-flex; align-items: center; justify-content: center;
          gap: 8px; width: 100%; padding: 14px 22px; border-radius: 9px;
          border: 1.5px solid rgba(255,255,255,0.45);
          font-family: ${BODY}; font-weight: 900; font-size: 14px;
          letter-spacing: 0.16em; text-transform: uppercase; white-space: nowrap;
          color: ${BG}; cursor: pointer; overflow: hidden;
        }
        .hb-arrow { display: inline-block; animation: arrowNudge 1.1s ease-in-out infinite; }
        .hb-trust {
          font-family: ${SANS};
          font-weight: 300; font-size: 11.5px;
          line-height: 1.7; color: rgba(255,255,255,0.8); letter-spacing: 0;
          margin-top: 4px;
          -webkit-font-smoothing: antialiased;
        }

        /* Desktop: tuck the card into open wood on the left, can stays fully visible */
        @media (min-width: 760px) {
          .hb-topbar { padding: 26px 40px; }
          /* Desktop: pan the frame so the can/glass clear the left card */
          .hb-bg { object-position: 24% center; }
          .hb-card {
            left: 48px; right: auto; bottom: auto;
            top: 50%; transform: translateY(-50%);
            width: 384px; padding: 26px 26px 28px; gap: 15px; border-radius: 18px;
          }
          .hb-h1 { font-size: 44px; }
        }
        @media (min-width: 1200px) {
          .hb-card { left: 64px; width: 410px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hb-card, .hb-arrow, .hb-pulse { animation: none !important; }
        }
      `}</style>

      <div className="hb-root">
        <img
          className="hb-bg"
          src={IMG}
          alt="hydrbrew functional iced coffee being poured over ice into a short rocks glass on a marble kitchen counter"
          fetchPriority="high"
          decoding="async"
        />
        <div className="hb-scrim" aria-hidden="true" />

        <header className="hb-topbar">
          <span className="hb-logo">
            <span className="hb-logo-mark" aria-hidden="true" />
            <span><span className="hb-logo-accent">hydr</span>brew°</span>
          </span>
        </header>

        <div className="hb-card">
          <h1 className="hb-h1">
            Your afternoon is<br /><span className="hb-cyan">non-negotiable</span>
          </h1>

          <p className="hb-sub">
            The clean, low-caffeine iced coffee stack built to keep you sharp through your last meeting.
          </p>

          <form
            className="hb-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input
              className="hb-field"
              type="email"
              aria-label="Email address"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              style={{
                ...INPUT_STYLE,
                borderColor: emailFocused ? CYAN : "rgba(0,255,255,0.65)",
                boxShadow: emailFocused ? "0 0 0 3px rgba(0,255,255,0.18)" : "none",
              }}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`hb-cta-btn${btnHovered || btnPressed ? "" : " hb-pulse"}`}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => { setBtnHovered(false); setBtnPressed(false); }}
              onMouseDown={() => setBtnPressed(true)}
              onMouseUp={() => setBtnPressed(false)}
              style={{
                backgroundColor: btnHovered ? "#00CCCC" : CYAN,
                boxShadow: btnHovered ? btnShadowHover : btnShadowBase,
                transform: btnPressed ? "scale(0.98)" : btnHovered ? "scale(1.03)" : undefined,
                opacity: isSubmitting ? 0.85 : 1,
                cursor: isSubmitting ? "wait" : "pointer",
                transition: "background-color 0.2s, box-shadow 0.2s, transform 0.15s",
                animation: btnHovered || btnPressed ? "none" : undefined,
              }}
            >
              <span
                style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)",
                  pointerEvents: "none",
                  animation: "shimmer 3s linear infinite",
                }}
              />
              <span style={{ position: "relative", zIndex: 2 }}>
                {isSubmitting ? (
                  "Securing…"
                ) : (
                  <>
                    Reserve Founder Access
                    <span className="hb-arrow" aria-hidden="true"> →</span>
                  </>
                )}
              </span>
            </button>
          </form>

          <p className="hb-trust">
            <span style={{ color: CYAN, fontWeight: 700 }}>Unlock 25% off</span> your first order • Ships mid-July • No subscription required.
          </p>
        </div>
      </div>
    </>
  );
}
