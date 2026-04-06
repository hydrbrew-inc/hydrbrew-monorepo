const pairs = [
  ["Heaviness", "lightness."],
  ["Jitter", "smooth."],
  ["Crash", "sustained."],
  ["Anxiety", "flow."],
  ["Depletion", "recovery."],
  ["Compromise", "optimization."],
] as const;

export function MeasuredManifestoSection() {
  return (
    <section className="lp-section" aria-labelledby="lp-measured-title">
      <div className="lp-inner">
        <h2 id="lp-measured-title" className="lp-h2 lp-center">
          MEASURED. VERIFIED. OPTIMIZED.
        </h2>
        <div className="lp-pairs lp-center">
          {pairs.map(([a, b]) => (
            <p key={a} className="lp-center" style={{ margin: 0 }}>
              {a} → <span>{b}</span>
            </p>
          ))}
        </div>
        <p className="lp-text lp-center" style={{ margin: "1.5rem auto 0", maxWidth: "40rem" }}>
          Every sip is a choice. Between the old paradigm — jittery, depleting, heavy — and the new.
        </p>
        <p className="lp-text lp-center" style={{ margin: "1rem auto 0", maxWidth: "40rem" }}>
          hydrbrew° isn&apos;t coffee. It&apos;s the memory of coffee, rebuilt from first principles
          for modern cognition.
        </p>
        <p className="lp-accent-line lp-center lp-mt">
          +1 You. The future of performance hydration starts here.
        </p>
      </div>
    </section>
  );
}
