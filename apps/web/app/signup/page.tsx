"use client";

import { useState } from "react";

const FONT = "var(--font-mono, 'JetBrains Mono', ui-monospace, monospace)";
const FONT_SERIF = "var(--font-playfair, 'Playfair Display', Georgia, serif)";
const FONT_JAKARTA = "var(--font-jakarta, 'Plus Jakarta Sans', system-ui, sans-serif)";
const FONT_GROTESK = "var(--font-space-grotesk, 'Space Grotesk', system-ui, sans-serif)";
const CYAN = "#00FFFF";
const BG = "#000000";

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
  boxSizing: "border-box" as const,
  transition: "border-color 0.2s, box-shadow 0.2s",
};

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const btnShadowBase = "0 0 22px rgba(0,255,255,0.6), inset 0 0 16px rgba(255,255,255,0.28)";
  const btnShadowHover = "0 0 38px rgba(0,255,255,0.95), inset 0 0 28px rgba(255,255,255,0.5)";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");
    try {
      const res = await fetch("/api/klaviyo/subscribe?listId=R2CKPU", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profiles: [{ email: trimmed, signup_source: "signup_page" }] }),
      });
      if (res.ok || res.status === 202) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMsg("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <style>{`
        @keyframes btnPulse {
          0%, 100% { box-shadow: 0 0 22px rgba(0,255,255,0.6), inset 0 0 16px rgba(255,255,255,0.28); }
          50%       { box-shadow: 0 0 34px rgba(0,255,255,0.85), inset 0 0 16px rgba(255,255,255,0.28); }
        }
        @keyframes shimmer { 0% { transform: translateX(-200%); } 66%, 100% { transform: translateX(200%); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes arrowNudge { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(5px); } }
        .hb-pulse { animation: btnPulse 2.4s ease-in-out infinite; }
        .hb-root {
          position: relative; width: 100%; height: 100vh; min-height: 560px;
          overflow: hidden; background: ${BG};
          font-family: var(--font-inter, system-ui, sans-serif);
        }
        .hb-bg {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          filter: brightness(1.1) saturate(1.03);
        }
        .hb-scrim {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.18) 42%, transparent 66%);
        }
        @media (min-width: 760px) {
          .hb-scrim {
            background: linear-gradient(to right, rgba(0,0,0,0.74) 0%, rgba(0,0,0,0.34) 36%, transparent 60%);
          }
        }
        .hb-topbar {
          position: absolute; top: 0; left: 0; right: 0;
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; padding: 22px 30px; z-index: 4;
        }
        .hb-logo {
          display: inline-flex; align-items: center; gap: 9px;
          font-family: ${FONT_GROTESK};
          font-weight: 600; font-size: 23px; letter-spacing: -0.01em;
          color: #FFFFFF; text-transform: lowercase;
          text-shadow: 0 2px 14px rgba(0,0,0,0.85);
          padding: 8px 18px; border-radius: 999px;
          background: rgba(0,0,0,0.4); border: 1px solid rgba(0,255,255,0.45);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
        }
        .hb-logo-accent { color: ${CYAN}; text-shadow: 0 0 14px rgba(0,255,255,0.7); }
        .hb-logo-mark {
          width: 20px; height: 20px; border-radius: 6px;
          background: linear-gradient(135deg, ${CYAN} 0%, #0088aa 100%);
          box-shadow: 0 0 14px rgba(0,255,255,0.6), inset 0 0 6px rgba(255,255,255,0.5);
          flex-shrink: 0;
        }
        .hb-badge {
          display: inline-flex; align-items: center;
          background: rgba(0,0,0,0.4); border: 1px solid rgba(0,255,255,0.45);
          border-radius: 6px; padding: 7px 14px;
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
        }
        @media (max-width: 759px) {
          .hb-badge { display: none; }
          .hb-bg { object-position: 60% center; }
          .hb-card .hb-cta-btn { white-space: normal; letter-spacing: 0.1em; font-size: 13px; line-height: 1.25; }
        }
        .hb-badge-text {
          font-family: ${FONT}; font-weight: 900; letter-spacing: 0.16em;
          color: ${CYAN}; text-transform: uppercase; font-size: 11.5px;
          text-shadow: 0 0 10px rgba(0,255,255,0.55);
        }
        .hb-card {
          position: absolute; z-index: 4;
          left: 16px; right: 16px; bottom: 18px;
          display: flex; flex-direction: column; gap: 13px;
          padding: 20px 20px 22px; border-radius: 16px;
          background: rgba(0,0,0,0.55); border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 18px 50px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.05);
          backdrop-filter: blur(18px) saturate(1.1); -webkit-backdrop-filter: blur(18px) saturate(1.1);
          animation: fadeUp 0.5s ease both;
        }
        .hb-h1 {
          font-family: ${FONT_SERIF};
          font-weight: 500; font-size: 34px; line-height: 1.2;
          color: #FFFFFF; -webkit-font-smoothing: antialiased; text-wrap: balance;
        }
        .hb-h1 .hb-cyan { color: ${CYAN}; font-style: italic; white-space: nowrap; }
        .hb-sub {
          font-family: ${FONT_JAKARTA};
          font-weight: 400; font-size: 13px; line-height: 1.55;
          color: rgba(255,255,255,0.9); -webkit-font-smoothing: antialiased;
        }
        .hb-form { display: flex; flex-direction: column; gap: 9px; }
        .hb-field::placeholder { color: rgba(255,255,255,0.62); font-weight: 600; }
        .hb-cta-btn {
          position: relative; display: inline-flex; align-items: center; justify-content: center;
          gap: 8px; width: 100%; padding: 14px 22px; border-radius: 9px;
          border: 1.5px solid rgba(255,255,255,0.45);
          font-family: var(--font-inter, system-ui, sans-serif); font-weight: 900; font-size: 14px;
          letter-spacing: 0.16em; text-transform: uppercase; white-space: nowrap;
          color: ${BG}; cursor: pointer; overflow: hidden;
        }
        .hb-arrow { display: inline-block; animation: arrowNudge 1.1s ease-in-out infinite; }
        .hb-shoplink {
          display: inline-flex; align-items: center; gap: 6px; align-self: flex-start;
          font-family: ${FONT_JAKARTA};
          font-weight: 600; font-size: 12.5px; letter-spacing: 0.03em;
          color: ${CYAN}; text-decoration: none;
          border-bottom: 1px solid rgba(0,255,255,0.4); padding-bottom: 1px;
          transition: opacity 0.2s, border-color 0.2s;
        }
        .hb-shoplink:hover { opacity: 0.85; border-color: ${CYAN}; }
        .hb-success {
          padding: 16px; border-radius: 9px;
          background: rgba(0,80,0,0.5); border: 1px solid rgba(0,255,100,0.4);
          color: #00FF88; font-size: 14px; line-height: 1.5; text-align: center;
          font-family: var(--font-inter, system-ui, sans-serif);
        }
        .hb-error-msg {
          color: #ff5c5c; font-size: 12px; letter-spacing: 0.5px; text-align: center;
          font-family: ${FONT};
        }
        @media (min-width: 760px) {
          .hb-topbar { padding: 26px 40px; }
          .hb-bg { object-position: 24% center; }
          .hb-card {
            left: 48px; right: auto; bottom: auto;
            top: 50%; transform: translateY(-50%);
            width: 384px; padding: 24px 26px 26px; gap: 12px; border-radius: 18px;
          }
          .hb-h1 { font-size: 40px; }
        }
        @media (min-width: 1200px) { .hb-card { left: 64px; width: 410px; } }
        @media (prefers-reduced-motion: reduce) {
          .hb-card, .hb-arrow, .hb-pulse { animation: none !important; }
        }
      `}</style>

      <div className="hb-root">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hb-bg"
          src="/images/signup-hero.png"
          alt="hydrbrew functional iced coffee"
        />
        <div className="hb-scrim" aria-hidden="true" />

        <header className="hb-topbar">
          <a href="/" className="hb-logo">
            <span className="hb-logo-mark" aria-hidden="true" />
            <span><span className="hb-logo-accent">hydr</span>brew°</span>
          </a>
          <div className="hb-badge">
            <span className="hb-badge-text">◆ Founding Members</span>
          </div>
        </header>

        <div className="hb-card">
          <h1 className="hb-h1">
            Own your afternoon<br /><span className="hb-cyan">focus</span>
          </h1>

          <p className="hb-sub">
            The precision-dosed functional iced coffee built with Lion&apos;s Mane and L-Theanine to sustain executive function without the afternoon fade.
          </p>

          {status === "success" ? (
            <div className="hb-success">
              ✓ You&apos;re in — check your email for your 25% off code.<br />
              <span style={{ fontSize: 12, opacity: 0.8 }}>Welcome to the protocol.</span>
            </div>
          ) : (
            <form className="hb-form" onSubmit={handleSubmit}>
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
              {errorMsg && <p className="hb-error-msg">{errorMsg}</p>}
              <button
                type="submit"
                disabled={status === "loading"}
                className={`hb-cta-btn${btnHovered || btnPressed || status === "loading" ? "" : " hb-pulse"}`}
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => { setBtnHovered(false); setBtnPressed(false); }}
                onMouseDown={() => setBtnPressed(true)}
                onMouseUp={() => setBtnPressed(false)}
                style={{
                  backgroundColor: status === "loading" ? "#007777" : btnHovered ? "#00CCCC" : CYAN,
                  boxShadow: btnHovered ? btnShadowHover : btnShadowBase,
                  transform: btnPressed ? "scale(0.98)" : btnHovered ? "scale(1.03)" : undefined,
                  transition: "background-color 0.2s, box-shadow 0.2s, transform 0.15s",
                  animation: btnHovered || btnPressed || status === "loading" ? "none" : undefined,
                  opacity: status === "loading" ? 0.7 : 1,
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
                  {status === "loading" ? "Subscribing…" : <>Claim 25% Off First Order<span className="hb-arrow" aria-hidden="true"> →</span></>}
                </span>
              </button>
            </form>
          )}

          <a
            className="hb-shoplink"
            href="https://hydrbrew.myshopify.com/collections/all"
          >
            Bypass signup and shop the collection
            <span style={{ display: "inline-block", transition: "transform 0.2s" }} aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </>
  );
}
