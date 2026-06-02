import { createSchema } from "@weaverse/hydrogen";
import type { SectionProps } from "~/components/section";
import { sectionSettings } from "~/components/section";

const SOCIAL_ITEMS = [
  { caption: "The morning I switched to hydrbrew° I stopped dreading 3pm." },
  { caption: "Finally — caffeine that doesn't hijack my evening." },
  { caption: "Same ritual. Zero systemic debt. The night is actually mine now." },
  { caption: "This is what afternoon focus is supposed to feel like." },
];

function HbSocial(_props: SectionProps) {
  return (
    <section className="py-20 md:py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#00FFFF", fontFamily: "'Roboto Mono', monospace" }}>
            COMMUNITY FEED // SOCIAL PROOF
          </p>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4" style={{ fontFamily: "'Urbanist', sans-serif" }}>
            The Baseline{" "}
            <span style={{ color: "#00FFFF" }}>Standard</span>
          </h2>
          <p className="text-lg text-white/60" style={{ fontFamily: "'Urbanist', sans-serif" }}>
            Seen on the desks of high-resolution minds
          </p>
        </div>

        {/* Instagram feed (Behold widget) */}
        <div className="mb-16">
          <behold-widget feed-id="4Y25XqYpmc6hjLt4QtZU" />
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {SOCIAL_ITEMS.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 transition-all duration-300"
              style={{
                border: "1px solid rgba(0,255,255,0.2)",
                background: "linear-gradient(135deg, rgba(0,255,255,0.05), rgba(128,0,255,0.05))",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,255,0.5)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,255,0.2)"; }}
            >
              <div className="flex mb-3">
                {[1,2,3,4,5].map((s) => (
                  <span key={s} style={{ color: "#00FFFF", fontSize: 14 }}>★</span>
                ))}
              </div>
              <p className="text-white/90 text-sm leading-relaxed" style={{ fontFamily: "'Urbanist', sans-serif" }}>
                "{item.caption}"
              </p>
            </div>
          ))}
        </div>

        {/* Stay Connected / Referral */}
        <div
          className="rounded-2xl p-8 md:p-12 text-center"
          style={{ border: "2px solid rgba(0,255,255,0.3)", backgroundColor: "#000" }}
        >
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(0,255,255,0.6)", fontFamily: "'Roboto Mono', monospace" }}>
            COHORT ACCESS // SIGNAL DROPS
          </p>
          <h3 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Urbanist', sans-serif" }}>
            Stay <span style={{ color: "#00FFFF" }}>Connected</span>
          </h3>
          <p className="text-lg text-white/70 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Join the cohort for exclusive drops, early access, and daily optimization intel
          </p>
          <p className="text-2xl md:text-3xl font-bold mb-8" style={{ fontFamily: "'Urbanist', sans-serif" }}>
            <span className="text-white">Refer 2+ Members </span>
            <span style={{ color: "#00FFFF" }}>→ Unlock Rewards</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-8">
            <input
              type="email"
              placeholder="email@protocol.com"
              className="flex-1 px-6 py-4 rounded-full text-white outline-none"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,255,255,0.3)", fontFamily: "'Space Grotesk', sans-serif" }}
              onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#00FFFF"; }}
              onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,255,0.3)"; }}
            />
            <button
              className="px-8 py-4 rounded-full font-bold text-black uppercase tracking-wider transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: "#00FFFF", fontFamily: "'Urbanist', sans-serif" }}
            >
              JOIN
            </button>
          </div>
          <a
            href="https://www.instagram.com/tryhydrbrew/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#00FFFF] transition-colors text-sm"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            📸 Follow @tryhydrbrew on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

export default HbSocial;

export const schema = createSchema({
  type: "hb-social",
  title: "HB Social + Referral",
  settings: [...sectionSettings],
  presets: {},
});
