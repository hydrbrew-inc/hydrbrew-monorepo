import { IntelButton } from "./IntelButton";

const benefits = [
  {
    title: "Neural Baseline Stabilization",
    body: "Deep work without cortisol spikes. L-Theanine ratio eliminates the jitter, sustains clarity for 4–6 hours.",
  },
  {
    title: "Zero Heart Rate Elevation",
    body: "Optimized caffeine dose keeps you in parasympathetic flow. No racing pulse, no anxiety cascade.",
  },
  {
    title: "Purge Glycemic Debt",
    body: "Clean exit pathway. No afternoon collapse, no insulin spike, no prefrontal fog. Just gentle return to baseline.",
  },
  {
    title: "Premium Hydration Layer",
    body: "Electrolytes + magnesium + alkaline base. Cellular recovery while you focus. Lightness, not heaviness.",
  },
  {
    title: "Ritualized Yet Light",
    body: "Subtle cold-brew taste memory. The ritual you crave without the baggage. Shelf-stable 2+ years (Mars-ready). Architecture designed to meet NASA's 5-Year Pre-Positioning requirements for deep-space transit.",
  },
  {
    title: "Biological Arbitrage",
    body: "Engineered for high performers, biohackers, founders. Become a +1 You. Arbitrage the now.",
  },
] as const;

export function UpgradeIntelSection() {
  return (
    <section className="lp-section" style={{ background: "var(--lp-bg-elevated)" }} aria-labelledby="lp-upgrade-title">
      <div className="lp-inner">
        <div className="lp-row-actions" style={{ justifyContent: "space-between" }}>
          <h2 id="lp-upgrade-title" className="lp-h2 lp-mb-0">
            THE UPGRADE INTEL <span className="lp-cyan">The Antidote</span>
          </h2>
          <IntelButton />
        </div>
        <p className="lp-lede">Escape the crash. Daily optimization, not daily debt. +1 You</p>

        <div className="lp-card-grid lp-card-grid--3">
          {benefits.map((b) => (
            <article key={b.title} className="lp-card">
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </article>
          ))}
        </div>
        <p className="lp-cyan lp-mt" style={{ fontWeight: 600 }}>
          No NFT required. Just the brew.
        </p>
      </div>
    </section>
  );
}
