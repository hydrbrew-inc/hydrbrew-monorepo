"use client";

import { useId, useState } from "react";
import { IntelButton } from "./IntelButton";

const faqs = [
  {
    q: "How is this different from coffee?",
    a: "hydrbrew° is engineered as a low-caffeine, hydration-forward ritual with L-theanine and electrolytes—designed for afternoon clarity without the heaviness many associate with traditional coffee.",
  },
  {
    q: 'What does "precursor model" mean?',
    a: "It’s the pre-launch protocol framing: early adopters enter the system, unlock intel, and shape the trajectory before public storefront launch.",
  },
  {
    q: "How much caffeine is in it, and who is it for?",
    a: "The site positions a precision-dosed extract around ~75mg caffeine per serving—aimed at people optimizing focus without overstimulation. (Final label facts will ship with retail.)",
  },
  {
    q: "Is hydrbrew° an alternative energy drink?",
    a: "It’s positioned closer to performance hydration + ritual than a high-sugar energy drink—emphasis on baseline optimization, not spikes.",
  },
  {
    q: "What's the taste like?",
    a: "Copy emphasizes subtle cold-brew memory with mineral crispness—light, not syrupy.",
  },
  {
    q: "Why is hydrbrew° sugar free?",
    a: "The narrative focuses on avoiding glycemic debt and afternoon collapse—clean exit vs. sweetened beverages.",
  },
  {
    q: "When does it ship?",
    a: "Pre-launch: join waitlists for timing. No ship date is asserted in this static recreation.",
  },
  {
    q: "What's the NFT / HydrCore Base thing?",
    a: "An optional gamified lane: serialized NFT access, VR intel, and scavenger-style missions—distinct from simply buying the brew.",
  },
] as const;

export function FaqArchiveSection() {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="lp-section" id="faq" aria-labelledby="lp-archive-title">
      <div className="lp-inner">
        <div className="lp-row-actions" style={{ justifyContent: "space-between" }}>
          <h2 id="lp-archive-title" className="lp-h2 lp-mb-0">
            ARCHIVE
          </h2>
          <IntelButton />
        </div>
        <p className="lp-lede">Everything you need to know about the antidote.</p>

        <div className="lp-mt">
          {faqs.map((item, i) => {
            const id = `${baseId}-faq-${i}`;
            const expanded = open === i;
            return (
              <div key={item.q} className="lp-faq-item">
                <button
                  type="button"
                  className="lp-faq-q"
                  aria-expanded={expanded}
                  aria-controls={id}
                  id={`${id}-btn`}
                  onClick={() => setOpen(expanded ? null : i)}
                >
                  <span>{item.q}</span>
                  <span>+1</span>
                </button>
                {expanded ? (
                  <div className="lp-faq-a" id={id} role="region" aria-labelledby={`${id}-btn`}>
                    {item.a}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="lp-row-actions lp-mt" style={{ justifyContent: "flex-end" }}>
          <button type="button" className="lp-btn-primary">
            UPLINK
          </button>
          <IntelButton />
        </div>
      </div>
    </section>
  );
}
