import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { useState } from "react";

const FAQS = [
  { q: "What makes hydrbrew° different from regular cold brew?", a: "hydrbrew° is built differently. 85mg of precision-dosed buffered caffeine stays below the cortisol spike threshold. 200mg L-Theanine converts that activation into clean, sustained focus — no jagged edges, no anxiety, no hard exit. Add 200mg Lion's Mane for executive function depth and an ionic electrolyte layer for the hydration baseline that standard cold brew actively depletes." },
  { q: "How much caffeine is in hydrbrew°?", a: "hydrbrew° contains 85mg of buffered caffeine per 12oz can. This is intentionally dosed below the cortisol spike threshold — the point at which caffeine starts triggering anxiety, jitters, and the crash most people associate with coffee. The 85mg dose is precisely calibrated to deliver clean cognitive activation and sustained focus without the rough edges or metabolic debt of higher-dose caffeine." },
  { q: "How does the no-crash science work?", a: "The crash isn't caused by caffeine wearing off — it's caused by how most caffeine is delivered. High-dose caffeine triggers a cortisol spike that artificially elevates your baseline. hydrbrew° engineers around this with 85mg of buffered caffeine, dosed below the cortisol spike threshold, paired with 200mg L-Theanine which modulates the adenosine rebound and smooths the exit curve. When it clears your system you return to baseline — not below it." },
  { q: "What is zero systemic debt?", a: "Zero systemic debt means you don't borrow energy from tomorrow to get through today. Most stimulants — high-dose coffee, energy drinks, pre-workout formulas — produce an artificial peak by triggering a cortisol surge. When it clears, you don't return to where you started. You drop below baseline. hydrbrew° operates differently. The 85mg buffered caffeine dose activates without triggering the cortisol response. When hydrbrew° clears your system, you return to baseline — not below it. No debt. No invoice." },
  { q: "What are the key ingredients?", a: "hydrbrew° is built on four functional layers: 85mg buffered caffeine delivers clean cognitive activation. 200mg L-Theanine modulates caffeine's rough edges and promotes alpha-wave brain activity. 200mg Lion's Mane mushroom extract supports nerve growth factor synthesis and executive function. Ionic electrolytes maintain the hydration baseline — because even mild dehydration produces measurable declines in attention that no nootropic stack can compensate for." },
  { q: "What is L-Theanine?", a: "L-Theanine is an amino acid found naturally in green tea that promotes relaxed focus without sedation. It works by increasing alpha-wave brain activity — the same neural state associated with calm attention, creative flow, and reduced anxiety. When combined with caffeine, L-Theanine doesn't blunt the activation; it refines it. In hydrbrew°, 200mg of L-Theanine converts stimulation into sustained, high-resolution focus." },
  { q: "What is Lion's Mane?", a: "Lion's Mane (Hericium erinaceus) is a medicinal mushroom backed by modern research for cognitive function. The active compounds — hericenones and erinacines — stimulate nerve growth factor (NGF) synthesis, supporting neuroplasticity, synaptic density, and executive function under cognitive load. In hydrbrew°, it's the layer that keeps your thinking sharp when the stakes are high and the cognitive load is continuous." },
  { q: "Where do your ingredients come from?", a: "Every ingredient in hydrbrew° is sourced from verified US-based suppliers. Our espresso coffee concentrate comes from Pragmatic Beverage Company in Fullerton, CA. L-Theanine from Nutri Avenue in City of Industry, CA. Organic Lion's Mane from Select Ingredients in Irvine, CA. Natural flavors from Sovereign Flavors in Santa Ana, CA. We maintain full transparency on sourcing because the quality of the substrate determines the quality of the output." },
  { q: "When is the best time to drink hydrbrew°?", a: "hydrbrew° was engineered for the afternoon window — the 2:15 PM moment when morning caffeine has worn off and cognitive demand remains high. As your second coffee of the day it delivers everything the next few hours need without the cortisol spike, jitter, or sleep disruption of a full-dose espresso. The 85mg buffered dose and L-Theanine modulation mean it works across the day without timing anxiety." },
  { q: "What about shipping and returns?", a: "We use a third-party shipper for last-mile delivery. Standard delivery takes 2–5 business days. Due to the consumable nature of our products, all sales are final unless the product arrives damaged. Not satisfied? Contact support@hydrbrew.com within 7 days of delivery for resolution." },
];

function HbFaq(props: HydrogenComponentProps) {
  const { ...rest } = props;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section {...rest} className="relative py-24 bg-black" id="faq">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px]" style={{ backgroundColor: "rgba(0,255,255,0.05)" }} />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-sm mb-4 uppercase tracking-wider" style={{ color: "#00FFFF", fontFamily: "'Roboto Mono',monospace" }}>
            SUPPORT PROTOCOL // FAQ MATRIX
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-6 leading-tight" style={{ fontFamily: "'Urbanist',sans-serif" }}>
            The<br /><span style={{ color: "#00FFFF" }}>Knowledge Base</span>
          </h2>
          <p className="text-lg text-white/60">A transparent look at the science, ingredients, and logistics powering your uptime</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl px-6 overflow-hidden"
              style={{ background: "linear-gradient(135deg,rgba(0,255,255,0.05),rgba(128,0,255,0.05))", border: "1px solid rgba(0,255,255,0.2)" }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left transition-colors duration-200 hover:text-[#00FFFF]"
                style={{ color: open === i ? "#00FFFF" : "#FFFFFF" }}
              >
                <span className="font-medium text-base md:text-lg pr-4" style={{ fontFamily: "'Urbanist',sans-serif" }}>{faq.q}</span>
                <span className="text-xl shrink-0 transition-transform duration-300" style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
              </button>
              {open === i && (
                <div className="pb-5">
                  <p className="text-white/70 leading-relaxed" style={{ fontFamily: "'Urbanist',sans-serif", fontWeight: 300 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-white/60 mb-4">Still have questions?</p>
          <a href="mailto:support@hydrbrew.com" className="underline transition-colors" style={{ color: "#00FFFF" }}>
            Contact our support team
          </a>
        </div>
      </div>
    </section>
  );
}

export default HbFaq;

export const schema = createSchema({
  type: "hb-faq",
  title: "HB FAQ",
  settings: [],
  presets: {},
});
