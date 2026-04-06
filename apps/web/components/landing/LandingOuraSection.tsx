import { IntelButton } from "./IntelButton";
import { OuraBetaJoinForm } from "./LandingForms";

const metrics = [
  "Physical sensation & mental clarity",
  "Nervous system stability",
  "Energy curve maintenance",
  "Cognitive state optimization",
  "Cellular restoration rate",
  "Overall system performance",
] as const;

export function LandingOuraSection() {
  return (
    <section className="lp-section" id="oura" aria-labelledby="lp-oura-title">
      <div className="lp-inner">
        <div className="lp-row-actions" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
          <h2 id="lp-oura-title" className="lp-h2 lp-mb-0">
            Field Testing: Oura Integration
          </h2>
          <IntelButton />
        </div>
        <p className="lp-lede">
          Proving the Zero Debt Thesis: Real-time HRV and sleep data from Oura Ring Gen 3 will
          continuously measure hydrbrew° performance against traditional caffeine. Hardware-validated
          claims only.
        </p>
        <p className="lp-text">Express intent to participate in our Oura integration beta program</p>
        <OuraBetaJoinForm />

        <h3 className="lp-h3 lp-mt">Performance Gains</h3>
        <p className="lp-text">
          Biometric analysis validated by Oura Ring shows quantified improvements across core cognitive
          &amp; physical dimensions
        </p>
        <ul className="lp-metric-list">
          {metrics.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
