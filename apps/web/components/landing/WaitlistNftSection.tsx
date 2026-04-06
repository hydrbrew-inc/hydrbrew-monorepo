"use client";

import { useState } from "react";
import { IntelButton } from "./IntelButton";
import { MintAssetForm } from "./LandingForms";

const perks = [
  { title: "Early Access Pricing", body: "Founder-tier discount locked in" },
  { title: "NFT Eligibility", body: "Quadrant Series collectible access" },
  { title: "Beta Testing Group", body: "Shape the final product" },
  { title: "HydrCore Base Access", body: "VR portal codes & intel briefings" },
] as const;

const NFT_SLIDES = 8;

export function WaitlistNftSection() {
  const [slide, setSlide] = useState(0);

  return (
    <section className="lp-section" style={{ background: "var(--lp-bg-elevated)" }} aria-labelledby="lp-waitlist-title">
      <div className="lp-inner">
        <div className="lp-row-actions" style={{ justifyContent: "space-between" }}>
          <h2 id="lp-waitlist-title" className="lp-h2 lp-mb-0">
            Become a +1 Optimized Human™
          </h2>
          <IntelButton />
        </div>
        <p className="lp-lede">Final sequence before public launch. Secure your position.</p>

        <h3 className="lp-h3">Claim Your Position in the Protocol</h3>
        <p className="lp-text">
          Join the waitlist now • First 2,000 receive NFT + early access
        </p>

        <h4 className="lp-h4">Priority Access Benefits</h4>
        <p className="lp-text" style={{ fontSize: "0.85rem" }}>
          Secure your position to unlock exclusive perks
        </p>
        <div className="lp-perk-grid">
          {perks.map((p) => (
            <div key={p.title} className="lp-perk">
              <h4>{p.title}</h4>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
        <p className="lp-cyan lp-mt" style={{ fontWeight: 700 }}>
          🔒 Join 3,847+ optimized humans in the protocol
        </p>

        <button type="button" className="lp-btn-primary lp-mt">
          First 2,000 receive NFT + early access
        </button>

        <MintAssetForm instance="primary" />

        <h3 className="lp-h3 lp-mt">Quadrant Series 1 NFT Collection</h3>
        <p className="lp-text">
          SECURE YOUR SERIALIZED ASSET. Be one of the first 2,000 to sign up and claim your Serialized
          NFT (1/2000). Each minted asset features a unique 4-digit credential that grants priority
          VR access to HydrCore Base.
        </p>

        <div className="lp-nft-stats">
          <div className="lp-nft-stat">
            <strong>847</strong>
            <span>NFTs CLAIMED</span>
          </div>
          <div className="lp-nft-stat">
            <strong>1,153</strong>
            <span>MINTED NFTs REMAINING</span>
          </div>
        </div>
        <p className="lp-text" style={{ fontSize: "0.8rem" }}>
          Once 2,000 signups reached, NFT claiming period closes
        </p>
        <p className="lp-protocol-micro">🔐 VR ACCESS CODES EMBEDDED • QUADRANT SERIES • COLLECTIBLE EDITION</p>

        <div className="lp-carousel">
          <div className="lp-carousel-viewport">
            <div className="lp-carousel-slide" aria-live="polite">
              NFT #{slide + 1}
            </div>
            {/* TODO: final NFT artwork carousel */}
          </div>
          <div className="lp-carousel-nav">
            <button
              type="button"
              className="lp-btn-primary"
              style={{ fontSize: "0.6rem", padding: "0.4rem 0.65rem" }}
              onClick={() => setSlide((s) => (s - 1 + NFT_SLIDES) % NFT_SLIDES)}
            >
              Previous NFT
            </button>
            <div className="lp-carousel-dots" role="tablist" aria-label="NFT slides">
              {Array.from({ length: NFT_SLIDES }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to NFT ${i + 1}`}
                  aria-current={i === slide ? "true" : undefined}
                  onClick={() => setSlide(i)}
                />
              ))}
            </div>
            <button
              type="button"
              className="lp-btn-primary"
              style={{ fontSize: "0.6rem", padding: "0.4rem 0.65rem" }}
              onClick={() => setSlide((s) => (s + 1) % NFT_SLIDES)}
            >
              Next NFT
            </button>
          </div>
        </div>

        <div className="lp-row-actions lp-mt" style={{ justifyContent: "flex-end" }}>
          <IntelButton />
        </div>
        <MintAssetForm instance="secondary" />
      </div>
    </section>
  );
}
