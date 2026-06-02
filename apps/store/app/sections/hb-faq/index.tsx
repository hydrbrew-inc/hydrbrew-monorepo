import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { useState } from "react";

const FAQS = [
  { q: "What makes hydrbrew° different from regular cold brew?", a: "hydrbrew° delivers the familiar cold-brew experience with a precision Whisper-Profile that eliminates the heavy, acidic tax of traditional roasts. No crash, no cortisol spike, no heart rate elevation. It's 100% coffee ritual, engineered for 100% afternoon performance." },
  { q: "How much caffeine is in hydrbrew°?", a: "85mg per serving — precisely below the threshold that triggers cortisol elevation in most adults, while remaining sufficient for meaningful cognitive activation." },
  { q: "How does the no-crash science work?", a: "200mg of L-Theanine modulates caffeine's neurological profile by promoting alpha-wave brain activity. The result: the activation without the edge, and a clean metabolic exit with no rebound fatigue." },
  { q: "What is zero systemic debt?", a: "Systemic debt is what you borrow against tomorrow to perform today — the jitters, the crash, the disrupted sleep. Zero systemic debt means the cognitive substrate is restored, not depleted." },
  { q: "What are the key ingredients?", a: "85mg precision caffeine · 200mg L-Theanine · 200mg Lion's Mane · alkaline electrolytes · only 20 calories · low sugar · clean label." },
  { q: "What is L-Theanine?", a: "An amino acid found naturally in green tea that promotes alpha-wave brain activity — the frequency associated with calm, focused attention rather than anxious or scattered mental states." },
  { q: "What is Lion's Mane?", a: "A functional mushroom studied for its relationship to nerve growth factor (NGF) synthesis. At 200mg per can, it supports neuronal health and cognitive plasticity." },
  { q: "When is the best time to drink hydrbrew°?", a: "The 2:15 PM window — when morning caffeine has worn off and the demand for sustained cognitive output remains high. Noon to 6 PM is the designed window." },
  { q: "Where do your ingredients come from?", a: "Sourced from certified suppliers and manufactured in an FDA-registered facility. Full transparency on ingredient sourcing is a core brand commitment." },
  { q: "When does hydrbrew° ship?", a: "First shipments go to early adopters in late Q2/Q3 2026. Pre-order members get priority allocation and free samples." },
];

function HbFaq(props: HydrogenComponentProps) {
  const { ...rest } = props;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section {...rest} className="py-20 md:py-32 bg-black">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#00FFFF", fontFamily: "'Roboto Mono',monospace" }}>
            SUPPORT PROTOCOL // FAQ MATRIX
          </p>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4" style={{ fontFamily: "'Urbanist',sans-serif" }}>
            The <span style={{ color: "#00FFFF" }}>Knowledge Base</span>
          </h2>
          <p className="text-lg text-white/60" style={{ fontFamily: "'Urbanist',sans-serif" }}>
            A transparent look at the science, the formulation, and the mission.
          </p>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(0,255,255,0.2)", background: "linear-gradient(135deg,rgba(0,255,255,0.03),rgba(128,0,255,0.03))" }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors duration-200"
                style={{ color: open === i ? "#00FFFF" : "#FFFFFF" }}
              >
                <span className="font-medium text-base md:text-lg pr-4" style={{ fontFamily: "'Urbanist',sans-serif" }}>{faq.q}</span>
                <span className="text-xl shrink-0 transition-transform duration-300" style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
              </button>
              {open === i && (
                <div className="px-6 pb-6">
                  <p className="text-white/70 leading-relaxed" style={{ fontFamily: "'Urbanist',sans-serif", fontWeight: 300 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
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
