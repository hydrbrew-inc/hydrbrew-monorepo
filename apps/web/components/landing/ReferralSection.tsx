import { IntelButton } from "./IntelButton";

export function ReferralSection() {
  return (
    <section className="lp-section" style={{ background: "var(--lp-bg-elevated)" }} aria-labelledby="lp-referral-title">
      <div className="lp-inner">
        <div className="lp-row-actions" style={{ justifyContent: "space-between" }}>
          <h3 id="lp-referral-title" className="lp-h3 lp-mb-0">
            Unlock Multiplier Rewards
          </h3>
          <IntelButton />
        </div>
        <p className="lp-text">
          Ready to transmit the signal? Share your referral link. Each new optimized human you recruit
          unlocks multiplier perks.
        </p>
        <p className="lp-text" style={{ fontSize: "0.8rem", color: "#71717a" }}>
          Powered by Viral Loops • Track your referrals in real-time
        </p>
        <div className="lp-row-actions lp-mt">
          <button type="button" className="lp-btn-primary lp-btn-solid">
            GET YOUR REFERRAL LINK
          </button>
          <button type="button" className="lp-btn-primary">
            UPLINK
          </button>
        </div>
      </div>
    </section>
  );
}
