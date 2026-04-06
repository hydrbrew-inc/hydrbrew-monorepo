import { siteConfig } from "@repo/lib/site-config";

export function HeroSection() {
  return (
    <section className="lp-hero" aria-labelledby="lp-hero-title">
      <div className="lp-hero-bg" aria-hidden />
      <div className="lp-hero-grid" aria-hidden />
      <div className="lp-hero-portrait" aria-hidden>
        {/* TODO: replace with final hero portrait / Mux poster */}
      </div>

      <div className="lp-hero-stack">
        <div className="lp-hero-content">
          <p className="lp-hero-badge">
            • {siteConfig.name.toLowerCase()}
            <span>°</span>
          </p>
          <h1 id="lp-hero-title" className="lp-h1">
            Reprogramming the Ritual
            <span className="lp-hero-sub">{"// Arrive Optimized"}</span>
          </h1>
          <p className="lp-hero-tagline">
            <strong>Coffee, rebalanced:</strong> A midday reset engineered to upgrade your baseline.
          </p>
          <p className="lp-hero-value">Sustained clarity. Zero systemic debt.</p>
          <p className="lp-hero-launch" role="status">
            LAUNCHING 2026
          </p>
          <div className="lp-hero-ctas">
            <button type="button" className="lp-btn-primary">
              NEURAL BRIEFING
            </button>
          </div>
        </div>

        <div className="lp-hero-dock" role="group" aria-label="Launch status">
          <div className="lp-hero-dock-left">
            <span className="lp-hero-live">
              <span className="lp-hero-live-dot" aria-hidden />
              LIVE
            </span>
            <span className="lp-hero-queue">
              <span className="lp-hero-queue-avatar" aria-hidden />
              1,385 Operatives in Queue
            </span>
          </div>
          <p className="lp-hero-dock-warn">
            <span aria-hidden>⚠</span> Limited <span className="lp-hero-dock-nft">Serialized NFT</span>{" "}
            spots remaining
          </p>
          <button type="button" className="lp-btn-hero-claim">
            CLAIM POSITION →
          </button>
        </div>
      </div>
    </section>
  );
}
