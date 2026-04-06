import Link from "next/link";
import { IntelButton } from "./IntelButton";

export function TwoWaysToPlaySection() {
  return (
    <section className="lp-section" aria-labelledby="lp-play-title">
      <div className="lp-inner lp-inner--play">
        <div className="lp-play-intel">
          <IntelButton />
        </div>
        <h2 id="lp-play-title" className="lp-h2 lp-center">
          TWO WAYS TO PLAY
        </h2>
        <p className="lp-text lp-center" style={{ margin: "0 auto 2rem", maxWidth: "36rem" }}>
          Engage with hydrbrew° through our dual-phase gamification system
        </p>

        <div className="lp-split">
          <div>
            <h3 className="lp-h3">Mission Intel</h3>
            <p className="lp-text">
              Decrypt codes hidden in HydrCore Base to claim exclusive medallions before launch
            </p>
            <ul className="lp-substeps">
              <li>
                <h4>Sign Up for Protocol Drops</h4>
                <p>Subscribe to receive mission briefings</p>
              </li>
              <li>
                <h4>Hunt for Secret Codes</h4>
                <p>Codes drop in HydrCore Base via email alerts</p>
              </li>
              <li>
                <h4>Claim Your Medallion</h4>
                <p>Enter code in Mission Intel to unlock rewards</p>
              </li>
            </ul>
            <Link href="#" className="lp-btn-primary" style={{ display: "inline-flex", marginTop: "1rem" }}>
              ENTER MISSION INTEL
            </Link>
          </div>
          <div>
            <h3 className="lp-h3">QR Scan Event</h3>
            <p className="lp-text">
              Scan to win cash prizes and exclusive NFTs from 5,446 limited cans
            </p>
            <p className="lp-text" style={{ fontSize: "0.85rem" }}>
              FREE DAILY SCAN: No purchase necessary. One scan per 24-hour period.
            </p>
            <p className="lp-text" style={{ fontSize: "0.85rem" }}>
              Both games reward early adopters who engage with the hydrbrew° ecosystem
            </p>
            <button type="button" className="lp-btn-primary lp-mt">
              VIEW QR SCAN DETAILS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
