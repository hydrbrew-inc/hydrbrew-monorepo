import { useState, useEffect } from "react";
import { useFetcher } from "react-router";
import { shopProductUrl } from "~/utils/shop";

const HERO_BG = "https://cdn.shopify.com/s/files/1/0714/4449/6537/files/hero-bg.webp?v=1784164453";
const SHOP_URL = shopProductUrl("lp_signup_cta");
const CYAN = "#00FFFF";

export default function SignupPage() {
  const fetcher = useFetcher<{
    ok: boolean;
    operativeNumber?: string;
    eventId?: string;
  }>();
  const [email, setEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);

  const isLoading = fetcher.state !== "idle";
  const isSuccess = fetcher.data?.ok === true;
  const isError = fetcher.data && !fetcher.data.ok;

  useEffect(() => {
    if (isSuccess) {
      // eventID dedupes this against the CAPI Lead.
      const eventId = fetcher.data?.eventId;
      window.fbq?.(
        "track",
        "Lead",
        { value: 5.00, currency: "USD" },
        eventId ? { eventID: eventId } : undefined,
      );
    }
  }, [isSuccess, fetcher.data?.eventId]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return;
    const fd = new FormData();
    fd.set("email", trimmed);
    fetcher.submit(fd, { action: "/api/klaviyo", method: "POST", encType: "multipart/form-data" });
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes btnPulse {
          0%, 100% { box-shadow: 0 0 22px rgba(0,255,255,0.6), inset 0 0 16px rgba(255,255,255,0.28); }
          50%       { box-shadow: 0 0 34px rgba(0,255,255,0.85), inset 0 0 16px rgba(255,255,255,0.28); }
        }
        @keyframes shimmer { 0% { transform: translateX(-200%); } 66%, 100% { transform: translateX(200%); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes arrowNudge { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(5px); } }
        .hb-signup-pulse { animation: btnPulse 2.4s ease-in-out infinite; }
        .hb-signup-root {
          position: relative; width: 100%; height: 100vh; min-height: 560px;
          overflow: hidden; background: ${CYAN};
          font-family: system-ui, sans-serif;
        }
        .hb-signup-bg {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          filter: brightness(1.1) saturate(1.03);
        }
        .hb-signup-ig {
          display: none; align-items: center; justify-content: center;
          width: 44px; height: 44px; border-radius: 999px;
          background: rgba(0,0,0,0.55); border: 1px solid rgba(0,255,255,0.65);
          backdrop-filter: blur(8px); color: rgba(255,255,255,0.95);
          box-shadow: 0 0 12px rgba(0,255,255,0.25);
          transition: color 160ms ease, border-color 160ms ease;
        }
        @media (min-width: 760px) { .hb-signup-ig { display: inline-flex; } }
        .hb-signup-scrim {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.18) 42%, transparent 66%);
        }
        @media (min-width: 760px) {
          .hb-signup-scrim {
            background: linear-gradient(to right, rgba(0,0,0,0.74) 0%, rgba(0,0,0,0.34) 36%, transparent 60%);
          }
        }
        .hb-signup-topbar {
          position: absolute; top: 0; left: 0; right: 0;
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; padding: 22px 30px; z-index: 4;
        }
        .hb-signup-logo {
          display: inline-flex; align-items: center; gap: 9px;
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-weight: 600; font-size: 23px; letter-spacing: -0.01em;
          color: #FFFFFF; text-transform: lowercase;
          text-shadow: 0 2px 14px rgba(0,0,0,0.85);
          padding: 8px 18px; border-radius: 999px;
          background: rgba(0,0,0,0.4); border: 1px solid rgba(0,255,255,0.45);
          backdrop-filter: blur(8px); text-decoration: none;
        }
        .hb-signup-logo-accent { color: ${CYAN}; text-shadow: 0 0 14px rgba(0,255,255,0.7); }
        .hb-signup-logo-mark {
          width: 20px; height: 20px; border-radius: 6px;
          background: linear-gradient(135deg, ${CYAN} 0%, #0088aa 100%);
          box-shadow: 0 0 14px rgba(0,255,255,0.6), inset 0 0 6px rgba(255,255,255,0.5);
          flex-shrink: 0;
        }
        .hb-signup-card {
          position: absolute; z-index: 4;
          left: 16px; right: 16px; bottom: 18px;
          display: flex; flex-direction: column; gap: 13px;
          padding: 20px 20px 22px; border-radius: 16px;
          background: rgba(0,0,0,0.55); border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 18px 50px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.05);
          backdrop-filter: blur(18px) saturate(1.1);
          animation: fadeUp 0.5s ease both;
        }
        .hb-signup-h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 500; font-size: 34px; line-height: 1.2;
          color: #FFFFFF; -webkit-font-smoothing: antialiased;
        }
        .hb-signup-h1 .hb-cyan { color: ${CYAN}; font-style: italic; white-space: nowrap; }
        .hb-signup-sub {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-weight: 400; font-size: 13px; line-height: 1.55;
          color: rgba(255,255,255,0.9);
        }
        .hb-signup-form { display: flex; flex-direction: column; gap: 9px; }
        .hb-signup-input {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-weight: 600; letter-spacing: 0.04em; font-size: 15px;
          color: #FFFFFF; background: rgba(0,0,0,0.55);
          border: 1.5px solid rgba(0,255,255,0.65); border-radius: 9px;
          padding: 15px 18px; outline: none; width: 100%; box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .hb-signup-input::placeholder { color: rgba(255,255,255,0.62); font-weight: 600; }
        .hb-signup-input:focus {
          border-color: ${CYAN};
          box-shadow: 0 0 0 3px rgba(0,255,255,0.18);
        }
        .hb-signup-btn {
          position: relative; display: inline-flex; align-items: center; justify-content: center;
          gap: 8px; width: 100%; padding: 14px 22px; border-radius: 9px;
          border: 1.5px solid rgba(255,255,255,0.45);
          font-family: system-ui, sans-serif; font-weight: 900; font-size: 14px;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: #000000; cursor: pointer; overflow: hidden; background: ${CYAN};
          box-shadow: 0 0 22px rgba(0,255,255,0.6), inset 0 0 16px rgba(255,255,255,0.28);
          transition: background-color 0.2s, box-shadow 0.2s, transform 0.15s;
        }
        .hb-signup-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .hb-signup-arrow { display: inline-block; animation: arrowNudge 1.1s ease-in-out infinite; }
        .hb-signup-shimmer {
          position: absolute; inset: 0;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
          pointer-events: none; animation: shimmer 3s linear infinite;
        }
        .hb-signup-shoplink {
          display: inline-flex; align-items: center; gap: 6px; align-self: flex-start;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-weight: 600; font-size: 12.5px; letter-spacing: 0.03em;
          color: ${CYAN}; text-decoration: none;
          border-bottom: 1px solid rgba(0,255,255,0.4); padding-bottom: 1px;
          transition: opacity 0.2s;
        }
        .hb-signup-shoplink:hover { opacity: 0.85; }
        .hb-signup-success {
          padding: 16px; border-radius: 9px;
          background: rgba(0,80,0,0.5); border: 1px solid rgba(0,255,100,0.4);
          color: #00FF88; font-size: 14px; line-height: 1.5; text-align: center;
        }
        .hb-signup-error { color: #ff5c5c; font-size: 12px; letter-spacing: 0.5px; text-align: center; }
        @media (max-width: 759px) {
          .hb-signup-bg { object-position: 60% center; }
          .hb-signup-card { bottom: max(18px, calc(env(safe-area-inset-bottom, 0px) + 10px)); }
        }
        @media (min-width: 760px) {
          .hb-signup-topbar { padding: 26px 40px; }
          .hb-signup-bg { object-position: 24% center; }
          .hb-signup-card {
            left: 48px; right: auto; bottom: 40px;
            width: 384px; padding: 24px 26px 26px; gap: 12px; border-radius: 18px;
          }
          .hb-signup-h1 { font-size: 40px; }
        }
        @media (min-width: 1200px) { .hb-signup-card { left: 64px; width: 410px; } }
        @media (prefers-reduced-motion: reduce) {
          .hb-signup-card, .hb-signup-arrow, .hb-signup-pulse { animation: none !important; }
        }
      ` }} />

      <div className="hb-signup-root">
        <img
          className="hb-signup-bg"
          src={HERO_BG}
          alt="hydrbrew functional iced coffee"
          fetchPriority="high"
          loading="eager"
        />
        <div className="hb-signup-scrim" aria-hidden="true" />

        <header className="hb-signup-topbar">
          <a href="/" className="hb-signup-logo">
            <span className="hb-signup-logo-mark" aria-hidden="true" />
            <span><span className="hb-signup-logo-accent">hydr</span>brew°</span>
          </a>
          <a
            className="hb-signup-ig"
            href="https://www.instagram.com/tryhydrbrew"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="hydrbrew on Instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </header>

        <div className="hb-signup-card">
          <h1 className="hb-signup-h1">
            Own your afternoon<br /><span className="hb-cyan">focus</span>
          </h1>
          <p className="hb-signup-sub">
            The precision-dosed functional iced coffee built with Lion's Mane and L-Theanine to sustain executive function without the afternoon fade.
          </p>

          {isSuccess ? (
            <div className="hb-signup-success">
              ✓ You're in — check your email for your 25% off code.<br />
              <span style={{ fontSize: 12, opacity: 0.8 }}>Welcome to the protocol.</span>
            </div>
          ) : (
            <form className="hb-signup-form" onSubmit={handleSubmit}>
              <input
                className="hb-signup-input"
                type="email"
                aria-label="Email address"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {isError && (
                <p className="hb-signup-error">Something went wrong. Please try again.</p>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className={`hb-signup-btn${btnHovered || btnPressed || isLoading ? "" : " hb-signup-pulse"}`}
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => { setBtnHovered(false); setBtnPressed(false); }}
                onMouseDown={() => setBtnPressed(true)}
                onMouseUp={() => setBtnPressed(false)}
                style={{
                  backgroundColor: isLoading ? "#007777" : btnHovered ? "#00CCCC" : CYAN,
                  boxShadow: btnHovered
                    ? "0 0 38px rgba(0,255,255,0.95), inset 0 0 28px rgba(255,255,255,0.5)"
                    : "0 0 22px rgba(0,255,255,0.6), inset 0 0 16px rgba(255,255,255,0.28)",
                  transform: btnPressed ? "scale(0.98)" : btnHovered ? "scale(1.03)" : undefined,
                }}
              >
                <span className="hb-signup-shimmer" />
                <span style={{ position: "relative", zIndex: 2 }}>
                  {isLoading
                    ? "Subscribing…"
                    : <>Claim 25% Off First Order<span className="hb-signup-arrow" aria-hidden="true"> →</span></>
                  }
                </span>
              </button>
            </form>
          )}

          <a className="hb-signup-shoplink" href={SHOP_URL} target="_blank" rel="noopener noreferrer">
            Bypass signup and shop now →
          </a>
        </div>
      </div>
    </>
  );
}
