import { IntelButton } from "./IntelButton";

export function PathForkSection() {
  return (
    <section className="lp-section" id="paths" aria-labelledby="lp-path-title">
      <div className="lp-inner">
        <div className="lp-path-intro">
          <h2 id="lp-path-title" className="lp-h2 lp-center lp-mb-0">
            Choose Your Path to <span className="lp-cyan">+1 You</span>
          </h2>
          <p className="lp-text lp-center" style={{ margin: "0.75rem auto 0", maxWidth: "32rem" }}>
            Every serving upgrades your cognitive baseline.
          </p>
          <p className="lp-text lp-center" style={{ margin: "0.25rem auto 0", fontSize: "0.9rem" }}>
            Choose how you experience it:
          </p>
          <p className="lp-protocol-micro lp-center" style={{ margin: "1rem auto 0", maxWidth: "40rem" }}>
            PRECURSOR_PROTOCOL_INITIALIZING • FOUNDER_ACCESS_TIER_1 • MEDALLION_EXTRACTION_READY •
            NETWORK_STATUS: GLOBAL • SYNC_RATE: STABLE
          </p>
          <div
            className="lp-path-hint lp-center"
            style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", justifyContent: "center", alignItems: "center" }}
          >
            <span>Not sure? Click the</span>
            <IntelButton />
            <span>buttons in each section to hear Zevon&apos;s</span>
            <span className="lp-cyan" style={{ fontWeight: 600 }}>
              Neural Briefing
            </span>
            <span>.</span>
          </div>
        </div>

        <div className="lp-path-grid">
          <article className="lp-path-card lp-path-card--shop">
            <div className="lp-path-card-top">
              <IntelButton />
            </div>
            <div className="lp-path-icon lp-path-icon--cyan" aria-hidden>
              ⚡
            </div>
            <h3>Shop hydrbrew°</h3>
            <p>Explore the science, see the proof, and secure your first case.</p>
            <button type="button" className="lp-path-cta lp-path-cta--cyan">
              EXPLORE THE SCIENCE
            </button>
          </article>

          <div className="lp-path-vs" aria-hidden>
            <span>vs</span>
          </div>

          <article className="lp-path-card lp-path-card--lore">
            <div className="lp-path-card-top">
              <IntelButton />
            </div>
            <div className="lp-path-icon lp-path-icon--magenta" aria-hidden>
              📡
            </div>
            <h3>Enter HydrCore Base</h3>
            <p>
              Discover the archetypes, claim your NFT identity, and join the gamified protocol.
            </p>
            <button type="button" className="lp-path-cta lp-path-cta--magenta">
              Claim your Position
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
