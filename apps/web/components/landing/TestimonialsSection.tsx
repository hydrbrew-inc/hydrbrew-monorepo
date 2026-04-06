import { IntelButton } from "./IntelButton";

const quotes = [
  {
    quote:
      "First nootropic that doesn't feel like I'm hacking my nervous system. Just... smooth.",
    name: "Maya K.",
    role: "Founder, AI startup",
  },
  {
    quote:
      "I so desperately want to drink cold brew, but I get caffeine shakes and can't sleep, yet I love the flavor.",
    name: "Terri H.",
    role: "Survey Respondent",
  },
  {
    quote: "Ditched coffee after 15 years. This is what I wanted caffeine to be all along.",
    name: "Jordan L.",
    role: "Flow state researcher",
  },
] as const;

export function TestimonialsSection() {
  return (
    <section className="lp-section" aria-labelledby="lp-signal-title">
      <div className="lp-inner">
        <div className="lp-row-actions" style={{ justifyContent: "space-between" }}>
          <h2 id="lp-signal-title" className="lp-h2 lp-mb-0">
            Transmit the Signal
          </h2>
          <IntelButton />
        </div>
        <p className="lp-lede">Thousands of optimized humans are already in position.</p>
        <div className="lp-quote-grid lp-mt">
          {quotes.map((q) => (
            <figure key={q.name} className="lp-quote">
              <blockquote>&ldquo;{q.quote}&rdquo;</blockquote>
              <figcaption>
                {q.name}
                <cite>{q.role}</cite>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
