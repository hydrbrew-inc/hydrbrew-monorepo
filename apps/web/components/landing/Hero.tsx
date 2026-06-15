import { useState } from "react";
import {
  getEmailDomain,
  scrollToSection,
  showSignupToast,
  submitSignup,
  trackSignupEvent,
} from "./signupFlow";

const FONT = "var(--font-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";
const BODY = "var(--font-inter), system-ui, sans-serif";
const CYAN = "#00FFFF";
const BG = "#000000";

const INPUT_STYLE: React.CSSProperties = {
  fontFamily: FONT,
  fontWeight: 600,
  letterSpacing: "0.08em",
  color: "#FFFFFF",
  background: "rgba(0,0,0,0.72)",
  border: "1.5px solid rgba(0,255,255,0.7)",
  borderRadius: 8,
  padding: "17px 18px",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  transition: "border-color 0.2s, box-shadow 0.2s",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
};

export function Hero() {
  const [email, setEmail] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [btnHovered, setBtnHovered] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const btnShadowBase = "0 0 30px rgba(0,255,255,0.8), 0 0 60px rgba(0,255,255,0.4), inset 0 0 20px rgba(255,255,255,0.3)";
  const btnShadowHover = "0 0 50px rgba(0,255,255,1), 0 0 100px rgba(0,255,255,0.8), inset 0 0 40px rgba(255,255,255,0.6)";

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
      @keyframes btnPulse {
        0%, 100% { transform: scale(1); box-shadow: 0 0 30px rgba(0,255,255,0.8), 0 0 60px rgba(0,255,255,0.4), inset 0 0 20px rgba(255,255,255,0.3); }
        50%       { transform: scale(1.03); box-shadow: 0 0 40px rgba(0,255,255,0.9), 0 0 80px rgba(0,255,255,0.5), inset 0 0 20px rgba(255,255,255,0.3); }
      }
      @keyframes shimmer {
        0%   { transform: translateX(-200%); }
        66%  { transform: translateX(200%); }
        100% { transform: translateX(200%); }
      }
      @keyframes gradShift {
        0%   { background-position: 0% 0%; }
        50%  { background-position: 100% 0%; }
        100% { background-position: 0% 0%; }
      }
      @keyframes coffeeGrad {
        0%   { background-position: 0% 0%; }
        50%  { background-position: 100% 100%; }
        100% { background-position: 0% 0%; }
      }
      @keyframes underlineSweep {
        0%   { background-position: -150% 0; }
        100% { background-position: 250% 0; }
      }
      @keyframes arrowNudge {
        0%, 100% { transform: translateX(0); }
        50%      { transform: translateX(6px); }
      }
      .hb-btn-arrow {
        display: inline-block;
        margin-left: 10px;
        animation: arrowNudge 1.1s ease-in-out infinite;
      }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(26px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes bounce {
        0%, 100% { transform: translateX(-50%) translateY(0); }
        50%      { transform: translateX(-50%) translateY(8px); }
      }
      .hydrbrew-btn-pulse {
        animation: btnPulse 2s ease-in-out infinite;
        transition: background-color 0.2s, transform 0.15s;
      }
      .hydrbrew-shimmer {
        animation: shimmer 3s linear infinite;
      }
      .hb-root, .hb-root *, .hb-root *::before, .hb-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

      .hb-root {
        position: relative;
        height: 100vh;
        width: 100%;
        overflow: hidden;
        background: ${BG};
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .hb-img { object-position: center top; }
      .hb-content {
        position: relative;
        z-index: 10;
        width: 100%;
        max-width: 700px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 26px 48px;
      }
      .hb-h1 {
        font-family: ${DISPLAY};
        font-weight: 700;
        font-size: 92px;
        line-height: 0.92;
        letter-spacing: -0.02em;
        word-spacing: -0.04em;
        text-transform: uppercase;
        margin: 0 0 14px 0;
        animation: fadeUp 0.55s ease both;
        animation-delay: 0.18s;
      }
      .hb-grad-text {
        display: block;
        color: #FFFFFF;
        text-shadow: 0 1px 2px rgba(0,0,0,0.72), 0 2px 8px rgba(0,0,0,0.4);
      }
      .hb-grad-text.hb-cyan {
        color: #00FFFF;
        text-shadow: 0 0 10px rgba(0,255,255,0.45), 0 1px 2px rgba(0,0,0,0.72);
      }
      .hb-topbar {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        flex-wrap: wrap;
        margin-bottom: 28px;
        animation: fadeUp 0.55s ease both;
        animation-delay: 0.05s;
      }
      .hb-logo {
        display: inline-flex;
        align-items: center;
        gap: 9px;
        font-family: ${DISPLAY};
        font-weight: 600;
        font-size: 24px;
        letter-spacing: -0.01em;
        color: #FFFFFF;
        text-transform: lowercase;
        text-shadow: 0 1px 10px rgba(0,0,0,0.5);
      }
      .hb-logo-accent { color: ${CYAN}; text-shadow: 0 0 12px rgba(0,255,255,0.7); }
      .hb-logo-mark {
        width: 20px;
        height: 20px;
        border-radius: 6px;
        background: linear-gradient(135deg, ${CYAN} 0%, #0088aa 100%);
        box-shadow: 0 0 14px rgba(0,255,255,0.6), inset 0 0 6px rgba(255,255,255,0.5);
        flex-shrink: 0;
      }
      .hb-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(0,255,255,0.10);
        border: 1px solid rgba(0,255,255,0.4);
        border-radius: 5px;
        padding: 7px 16px;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
      }
      .hb-badge-text {
        font-family: ${FONT};
        font-weight: 900;
        letter-spacing: 0.2em;
        color: ${CYAN};
        text-transform: uppercase;
        text-shadow: 0 0 10px rgba(0,255,255,0.6);
        font-size: 13px;
      }
      .hb-subcopy {
        font-family: ${BODY};
        font-weight: 700;
        font-size: 19px;
        letter-spacing: 0.01em;
        color: #FFFFFF;
        line-height: 1.8;
        margin: 0 0 10px 0;
        text-shadow: 0 1px 3px rgba(0,0,0,0.72);
        width: max-content;
        max-width: 92vw;
        animation: fadeUp 0.55s ease both;
        animation-delay: 0.24s;
      }
      .hb-time { letter-spacing: -0.06em; }
      .hb-coffee {
        position: relative;
        display: inline-block;
        font-size: 34px;
        font-weight: 700;
        letter-spacing: 0.02em;
        padding-bottom: 4px;
        background-image: linear-gradient(135deg, #FFFFFF 0%, #D4A574 20%, #FFFFFF 40%, #C8956E 60%, #FFFFFF 80%, #D4A574 100%);
        background-size: 200% 200%;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        -webkit-text-fill-color: transparent;
        text-shadow: none;
        filter: drop-shadow(0 2px 8px rgba(0,0,0,0.8));
        animation: coffeeGrad 6s ease-in-out infinite;
      }
      .hb-tagline {
        font-family: ${FONT};
        font-weight: 700;
        font-size: 20px;
        letter-spacing: 0.02em;
        color: ${CYAN};
        text-align: center;
        margin: 0 0 20px 0;
        text-shadow: 0 0 10px rgba(0,255,255,0.4), 0 1px 2px rgba(0,0,0,0.72);
        animation: fadeUp 0.55s ease both;
        animation-delay: 0.30s;
      }
      .hb-coffee::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background-image: linear-gradient(to right, transparent, ${CYAN}, transparent);
        background-size: 200% 100%;
        animation: underlineSweep 3s linear infinite;
      }
      .hb-social {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        margin: 0 0 22px 0;
        flex-wrap: wrap;
        justify-content: center;
        animation: fadeUp 0.55s ease both;
        animation-delay: 0.42s;
      }
      .hb-social-text { display: flex; flex-direction: column; align-items: center; gap: 3px; }
      .hb-ingredients { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
      .hb-chip { font-family: ${FONT}; font-weight: 700; font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(0,255,255,0.9); padding: 5px 11px; border: 1px solid rgba(0,255,255,0.35); border-radius: 9999px; background: rgba(0,255,255,0.06); white-space: nowrap; text-shadow: 0 0 8px rgba(0,255,255,0.3); }
      .hb-stars { color: ${CYAN}; font-size: 14px; letter-spacing: 3px; line-height: 1; text-shadow: 0 0 10px rgba(0,255,255,0.6); }
      .hb-social-count { font-family: ${BODY}; font-weight: 700; font-size: 13px; color: #FFFFFF; letter-spacing: 0.01em; text-shadow: 0 1px 8px rgba(0,0,0,0.6); display: inline-flex; align-items: center; }
      .hb-social-sub { font-family: ${BODY}; font-weight: 500; font-size: 11.5px; color: rgba(0,255,255,0.85); letter-spacing: 0.02em; text-shadow: 0 1px 8px rgba(0,0,0,0.6); }
      .hb-live-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${CYAN}; box-shadow: 0 0 8px rgba(0,255,255,0.85); margin-right: 7px; flex-shrink: 0; animation: livePulse 1.8s ease-in-out infinite; }
      @keyframes livePulse { 0%, 100% { opacity: 0.5; transform: scale(0.85); } 50% { opacity: 1; transform: scale(1.15); } }
      .hb-benefits { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 9px 20px; margin: 0 0 16px 0; animation: fadeUp 0.55s ease both; animation-delay: 0.34s; }
      .hb-benefit { display: inline-flex; align-items: center; gap: 7px; font-family: ${FONT}; font-weight: 700; font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; color: #FFFFFF; text-shadow: 0 1px 2px rgba(0,0,0,0.78); }
      .hb-benefit::before { content: "✓"; color: ${CYAN}; font-size: 13px; text-shadow: 0 0 10px rgba(0,255,255,0.7); }
      .hb-offer {
        width: 100%;
        max-width: 440px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 18px 24px 16px;
        border-radius: 20px;
        background: rgba(6,10,12,0.52);
        border: 1px solid rgba(0,255,255,0.28);
        box-shadow: 0 14px 40px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.04);
        backdrop-filter: blur(10px) saturate(1.05);
        -webkit-backdrop-filter: blur(10px) saturate(1.05);
        animation: fadeUp 0.55s ease both;
        animation-delay: 0.42s;
      }
      .hb-offer .hb-social { margin: 0 0 14px 0; }
      .hb-price {
        display: flex;
        align-items: baseline;
        justify-content: center;
        flex-wrap: wrap;
        gap: 4px 10px;
        margin: 0 0 18px 0;
      }
      .hb-price-old { font-family: ${BODY}; font-weight: 600; font-size: 16px; color: rgba(255,255,255,0.45); text-decoration: line-through; text-decoration-color: rgba(255,255,255,0.5); }
      .hb-price-new { font-family: ${FONT}; font-weight: 700; font-size: 24px; color: ${CYAN}; text-shadow: 0 0 14px rgba(0,255,255,0.5); }
      .hb-price-discount { align-self: center; font-family: ${BODY}; font-weight: 700; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: ${BG}; background: ${CYAN}; padding: 3px 8px; border-radius: 999px; box-shadow: 0 0 12px rgba(0,255,255,0.35); }
      .hb-price-note { width: 100%; font-family: ${BODY}; font-weight: 500; font-size: 11px; color: rgba(255,255,255,0.6); letter-spacing: 0.02em; }
      .hb-form { animation: fadeUp 0.55s ease both; animation-delay: 0.40s; }
      .hb-cta { width: 100%; animation: fadeUp 0.55s ease both; animation-delay: 0.48s; }
      .hb-trust {
        font-family: ${BODY};
        font-weight: 500;
        font-size: 12px;
        color: rgba(255,255,255,0.62);
        letter-spacing: 0.02em;
        margin-top: 12px;
        text-shadow: 0 1px 8px rgba(0,0,0,0.6);
        animation: fadeUp 0.55s ease both;
        animation-delay: 0.56s;
      }
      .hb-scroll {
        position: absolute;
        bottom: 22px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        z-index: 10;
        animation: bounce 2.2s ease-in-out infinite;
        pointer-events: none;
      }
      .hb-scroll-text { font-family: ${FONT}; font-weight: 700; font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: rgba(0,255,255,0.85); text-shadow: 0 0 10px rgba(0,255,255,0.5); }
      .hb-scroll-arrow { color: ${CYAN}; font-size: 18px; line-height: 1; text-shadow: 0 0 12px rgba(0,255,255,0.7); }
      .hb-can-glow {
        position: absolute;
        left: 52%;
        top: 71%;
        width: 150px;
        height: 215px;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        mix-blend-mode: screen;
        background: radial-gradient(ellipse 46% 50% at 50% 50%, rgba(0,255,255,0.6) 0%, rgba(0,255,255,0.28) 42%, rgba(0,255,255,0) 72%);
        filter: blur(7px);
        animation: canGlow 2.4s ease-in-out infinite;
      }
      @keyframes canGlow {
        0%, 100% { opacity: 0.16; transform: translate(-50%, -50%) scale(0.9); }
        50% { opacity: 0.4; transform: translate(-50%, -50%) scale(1.1); }
      }
      .hb-spark {
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 0 8px 2px rgba(0,255,255,0.95), 0 0 16px 5px rgba(0,255,255,0.5);
        animation: twinkle 1.6s ease-in-out infinite;
      }
      .hb-spark-1 { left: 32%; top: 20%; animation-delay: 0s; }
      .hb-spark-2 { left: 66%; top: 34%; animation-delay: 0.5s; }
      .hb-spark-3 { left: 38%; top: 58%; animation-delay: 0.9s; }
      .hb-spark-4 { left: 64%; top: 76%; animation-delay: 1.3s; }
      .hb-spark-5 { left: 50%; top: 44%; width: 4px; height: 4px; animation-delay: 0.3s; }
      @keyframes twinkle {
        0%, 100% { opacity: 0.05; transform: scale(0.5); }
        50% { opacity: 0.4; transform: scale(1.25); }
      }
      @media (min-width: 641px) {
        .hb-img { object-position: 20% top; }
        .hb-can-glow { left: 52%; top: 75.5%; width: 155px; height: 165px; }
      }
      @media (prefers-reduced-motion: reduce) {
        .hb-topbar, .hb-h1, .hb-subcopy, .hb-tagline, .hb-benefits, .hb-social, .hb-form, .hb-cta, .hb-trust, .hb-scroll, .hb-coffee, .hb-coffee::after, .hb-btn-arrow, .hb-can-glow, .hb-spark, .hb-live-dot { animation: none !important; }
        .hb-can-glow { opacity: 0.32; }
      }
      .hb-label {
        display: block;
        font-family: ${FONT};
        font-weight: 700;
        font-size: 11px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: rgba(0,255,255,0.85);
        margin-bottom: 7px;
        text-align: left;
      }
      .hb-input-font { font-size: 14px; }
      .hb-input-font::placeholder {
        color: rgba(255,255,255,0.82);
        font-weight: 600;
        letter-spacing: 0.06em;
        opacity: 1;
      }
      .hb-btn-label {
        font-size: 15px;
        font-family: ${BODY};
        font-weight: 900;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        position: relative;
        z-index: 10;
        white-space: nowrap;
      }

      @media (max-width: 640px) {
        .hb-root {
          height: auto;
          min-height: 100vh;
          overflow-y: auto;
        }
        .hb-img { object-position: 56% center; }
        .hb-can-glow { left: 15%; top: 74%; width: 118px; height: 150px; }
        .hb-content {
          padding: 34px 16px 44px;
          max-width: 100%;
        }
        .hb-h1 { font-size: 52px; line-height: 0.96; margin-bottom: 22px; }
        .hb-grad-text { text-shadow: 0 1px 2px rgba(0,0,0,0.72); }
        .hb-grad-text.hb-cyan { text-shadow: 0 0 9px rgba(0,255,255,0.45), 0 1px 2px rgba(0,0,0,0.72); }
        .hb-badge-text { font-size: 12px; letter-spacing: 0.1em; }
        .hb-subcopy { font-size: 16px; line-height: 1.5; margin-bottom: 8px; width: auto; max-width: 100%; }
        .hb-coffee { font-size: 24px; }
        .hb-tagline { font-size: 15px; margin-bottom: 14px; }
        .hb-benefits { gap: 6px 12px; margin-bottom: 16px; }
        .hb-benefit { font-size: 11px; letter-spacing: 0.06em; gap: 5px; }
        .hb-benefit::before { font-size: 11px; }
        .hb-social-sub { font-size: 10.5px; }
        .hb-label { font-size: 13px; margin-bottom: 8px; }
        .hb-input-font { font-size: 17px; }
        .hb-btn-label { font-size: 16px; letter-spacing: 0.12em; white-space: normal; }
        .hb-scroll { display: none; }
        .hb-social { gap: 10px; margin-bottom: 24px; }
        .hb-social-count { font-size: 12px; }
        .hb-trust { font-size: 11px; }
        .hb-offer { padding: 18px 16px 16px; max-width: 100%; }
        .hb-offer .hb-social { margin-bottom: 12px; }
        .hb-price { margin-bottom: 14px; }
        .hb-price-new { font-size: 22px; }
      }
    `}</style>

    <div className="hb-root">

      {/* Background image - LCP element; preloaded in app/layout.tsx head */}
      <img
        className="hb-img"
        src="/images/hFqMecA.webp"
        alt="hydrbrew° — functional iced coffee, afternoon focus"
        fetchPriority="high"
        decoding="async"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "contrast(1.16) brightness(1.05) saturate(1.08)",
        }}
      />

      {/* Scrim — centered dark core so text reads over image from all directions */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 32%, rgba(0,0,0,0.5) 100%), radial-gradient(ellipse 85% 105% at 50% 55%, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.25) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Can glow — lights up the in-frame can with a pulsing cyan aura + sparkles */}
      <div className="hb-can-glow" aria-hidden="true">
        <span className="hb-spark hb-spark-1" />
        <span className="hb-spark hb-spark-2" />
        <span className="hb-spark hb-spark-3" />
        <span className="hb-spark hb-spark-4" />
        <span className="hb-spark hb-spark-5" />
      </div>

      {/* ── Content overlay ── */}
      <div className="hb-content">

        {/* Logo + offer badge lockup */}
        <div className="hb-topbar">
          <span className="hb-logo">
            <span className="hb-logo-mark" aria-hidden="true" />
            <span className="hb-logo-word"><span className="hb-logo-accent">hydr</span>brew°</span>
          </span>
          <div className="hb-badge">
            <span className="hb-badge-text">◆ FOUNDING PRE-SALE · 25% OFF</span>
          </div>
        </div>

        {/* H1 with animated gradient */}
        <h1 className="hb-h1">
          <span className="hb-grad-text">BEAT THE</span>
          <span className="hb-grad-text hb-cyan"><span className="hb-time">2:15</span> PM</span>
          <span className="hb-grad-text">CRASH</span>
        </h1>

        {/* Sub copy */}
        <p className="hb-subcopy">
          <span className="hb-coffee">Functional Iced Coffee</span>
        </p>

        {/* Tagline */}
        <p className="hb-tagline">The Afternoon Stays Yours</p>

        {/* Benefit row — concrete mechanism for cold traffic */}
        <div className="hb-benefits">
          <span className="hb-benefit">No Afternoon Fade</span>
          <span className="hb-benefit">Precision Focus</span>
          <span className="hb-benefit">Sustained Uptime</span>
        </div>

        {/* Offer panel — groups proof + price + form + CTA into one legible "card" over the photo */}
        <div className="hb-offer">
        {/* Social proof — pre-launch honest signal (live waitlist, no review stars) */}
        <div className="hb-social">
          <div className="hb-social-text">
            <span className="hb-social-count"><span className="hb-live-dot" aria-hidden="true" />Founding memberships now open</span>
            <span className="hb-social-sub">Limited inventory</span>
          </div>
          <div className="hb-ingredients">
            <span className="hb-chip">Low Caffeine</span>
            <span className="hb-chip">L-Theanine</span>
            <span className="hb-chip">Lion's Mane</span>
          </div>
        </div>

        {/* Price anchor — gives the 25% something to weigh against */}
        <div className="hb-price">
          <span className="hb-price-old">$59.95</span>
          <span className="hb-price-new">$44.96</span>
          <span className="hb-price-discount">Save 25%</span>
          <span className="hb-price-note">12-pack · Free Shipping</span>
        </div>

        {/* Sign-up form (email-only for fastest conversion) */}
        <div className="hb-form" style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16, marginBottom: 10 }}>
          <div>
            <label className="hb-label" htmlFor="hb-email">Email Address</label>
            <input
              id="hb-email"
              className="hb-input-font"
              type="email"
              value={email}
              placeholder="Type your email here"
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              style={{
                ...INPUT_STYLE,
                borderColor: focusedField === "email" ? CYAN : "rgba(0,255,255,0.7)",
                boxShadow: focusedField === "email" ? "0 0 0 3px rgba(0,255,255,0.18), 0 0 24px rgba(0,255,255,0.15)" : "none",
              }}
            />
          </div>
        </div>

        {/* CTA */}
        <div className="hb-cta">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={btnHovered || btnPressed ? undefined : "hydrbrew-btn-pulse"}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => { setBtnHovered(false); setBtnPressed(false); }}
            onMouseDown={() => setBtnPressed(true)}
            onMouseUp={() => setBtnPressed(false)}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              padding: "18px 32px",
              borderRadius: 9999,
              border: "2px solid rgba(255,255,255,0.5)",
              cursor: isSubmitting ? "wait" : "pointer",
              overflow: "hidden",
              backgroundColor: btnHovered ? "#00CCCC" : CYAN,
              color: BG,
              opacity: isSubmitting ? 0.85 : 1,
              boxShadow: btnHovered ? btnShadowHover : btnShadowBase,
              transform: btnPressed ? "scale(0.98)" : btnHovered ? "scale(1.08)" : undefined,
              transition: "background-color 0.2s, box-shadow 0.2s, transform 0.15s",
            }}
          >
            <span
              className="hydrbrew-shimmer"
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)",
                pointerEvents: "none",
              }}
            />
            <span className="hb-btn-label">
              {isSubmitting ? "SECURING YOUR SPOT…" : "BECOME A FOUNDING MEMBER"}
              {!isSubmitting && <span className="hb-btn-arrow" aria-hidden="true">→</span>}
            </span>
          </button>
        </div>

        {/* Trust microcopy */}
        <p className="hb-trust">No charge today — lock in your 25% founding-member rate. Ships Mid-July.</p>
        </div>

      </div>
    </div>
    </>
  );
}
