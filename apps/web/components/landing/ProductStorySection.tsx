import { IntelButton } from "./IntelButton";

export function ProductStorySection() {
  return (
    <section className="lp-section" aria-labelledby="lp-product-title">
      <div className="lp-inner">
        <div className="lp-row-actions" style={{ justifyContent: "space-between" }}>
          <h2 id="lp-product-title" className="lp-h2 lp-mb-0">
            Subtle Cold-Brew. Zero Compromise. <span className="lp-cyan">+1 You</span>
          </h2>
          <IntelButton />
        </div>
        <p className="lp-lede">
          A whisper of coffee — the ritual without the heaviness. Engineered as a performance
          substrate to own the afternoon window. Alkaline base, electrolyte-infused, calibrated to
          elevate your baseline. Arrive optimized.
        </p>
        <p className="lp-text">
          Subtle cold-brew notes meet mineral crispness. Hydration first and low caffeine. The coffee
          you remember, rebuilt to optimize you.
        </p>
        <p className="lp-text" style={{ fontSize: "0.85rem" }}>
          All formulation claims calibrated against peer-reviewed research. hydrbrew° is designed for
          baseline optimization, not medical intervention.
        </p>
        <p className="lp-cyan" style={{ fontWeight: 600 }}>
          No NFT required. Just the brew.
        </p>
      </div>
    </section>
  );
}
