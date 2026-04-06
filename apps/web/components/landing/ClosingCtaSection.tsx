import Link from "next/link";
import { IntelButton } from "./IntelButton";

export function ClosingCtaSection() {
  return (
    <section className="lp-section" aria-labelledby="lp-closing-title">
      <div className="lp-inner lp-center">
        <div className="lp-row-actions" style={{ justifyContent: "center", marginBottom: "1rem" }}>
          <IntelButton />
          <button type="button" className="lp-btn-primary">
            UPLINK
          </button>
        </div>
        <h2 id="lp-closing-title" className="visually-hidden">
          Closing briefing
        </h2>
        <p className="lp-text" style={{ margin: "0 auto", maxWidth: "42rem" }}>
          Briefing concluded. Thanks for visiting hydrbrew°. You&apos;ve breached the perimeter of the
          +1 Human experience. It&apos;s time to move into the high-fidelity reality of total
          optimization. The +1 You.
        </p>
        <p className="lp-accent-line lp-mt">Don&apos;t just watch the future— arbitrage it.</p>
        <p className="lp-text lp-mt">Stay sharp. Stay optimized.</p>
        <p className="lp-text">The Base is always watching.</p>
        <Link href="#" className="lp-btn-primary lp-btn-solid" style={{ marginTop: "1.5rem", display: "inline-flex" }}>
          RESERVE NOW
        </Link>
      </div>
    </section>
  );
}
