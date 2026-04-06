import Link from "next/link";
import { FinalWaitlistForm } from "./LandingForms";

export function HydrCoreTerminalSection() {
  return (
    <section className="lp-section" style={{ background: "var(--lp-bg-elevated)" }} aria-labelledby="lp-terminal-title">
      <div className="lp-inner">
        <h2 id="lp-terminal-title" className="lp-h2">
          Find The Hidden Terminal Numbers
        </h2>
        <p className="lp-text">
          4 secret digits scattered across HydrCore Base. Characters hide clues. Terminals contain
          codes.
        </p>
        <p className="lp-cyan" style={{ fontWeight: 600 }}>
          Supply depleting in real-time
        </p>
        <p className="lp-eyebrow lp-mt">🔒 ACCESS REQUIREMENT</p>
        <p className="lp-text" style={{ fontWeight: 600 }}>
          PRE-LAUNCH EMAIL SIGNUP REQUIRED TO PLAY
        </p>
        <p className="lp-text">Join the waitlist to unlock scan eligibility + exclusive launch access</p>
        <p className="lp-text" style={{ fontSize: "0.9rem" }}>
          Early access + NFT identity + free drop. Zero spam protocol.
        </p>

        <FinalWaitlistForm />

        <div className="lp-terminal lp-mt">
          <button type="button">
            ⚠️ RESTRICTED TERMINAL ACCESS DIMENSIONAL BREACH CLICK TO INVESTIGATE →
          </button>
        </div>
        <Link href="#" className="lp-cyan" style={{ fontWeight: 700, display: "inline-block", marginTop: "1rem" }}>
          🚀 ENTER HYDRCORE BASE → FIND THE NUMBERS
        </Link>
      </div>
    </section>
  );
}
