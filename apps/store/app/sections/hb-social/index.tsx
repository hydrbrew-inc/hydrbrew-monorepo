import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { useState } from "react";

const mediaItems = [
  { type: "image", caption: '"My afternoon ritual has never felt this good"' },
  { type: "video", caption: "The perfect pour" },
  { type: "image", caption: '"Finally, energy that lasts"' },
  { type: "video", caption: "Flow state activated" },
];

function HbSocial(props: HydrogenComponentProps) {
  const { ...rest } = props;
  const [email, setEmail] = useState("");

  return (
    <section {...rest} className="relative py-24 bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full blur-[120px]" style={{ backgroundColor: "rgba(20,184,166,0.05)" }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-[120px]" style={{ backgroundColor: "rgba(0,255,255,0.05)" }} />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-sm mb-4 uppercase tracking-wider" style={{ color: "#00FFFF", fontFamily: "'Roboto Mono',monospace" }}>
            COMMUNITY FEED // SOCIAL PROOF
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-6 leading-tight" style={{ fontFamily: "'Urbanist',sans-serif" }}>
            The Baseline<br /><span style={{ color: "#00FFFF" }}>Standard</span>
          </h2>
          <p className="text-lg text-white/60">Seen on the desks of high-resolution minds</p>
        </div>

        {/* Desktop Grid */}
        <div className="relative max-w-7xl mx-auto">
          <div className="hidden md:grid md:grid-cols-4 gap-6">
            {mediaItems.map((item, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden border border-[#00FFFF]/20 cursor-pointer hover:border-[#00FFFF]/60 transition-all"
                style={{ aspectRatio: "9/16", background: "linear-gradient(135deg,rgba(0,255,255,0.1),rgba(128,0,255,0.1))" }}
              >
                <img
                  src="/social-card.webp"
                  alt={`hydrbrew community — ${item.caption}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center border border-[#00FFFF]/40" style={{ backgroundColor: "rgba(0,255,255,0.2)", backdropFilter: "blur(8px)" }}>
                      <span style={{ color: "#00FFFF", fontSize: 20 }}>▶</span>
                    </div>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.9),transparent)" }}>
                  <p className="text-sm text-white/90" style={{ fontFamily: "'Urbanist',sans-serif" }}>{item.caption}</p>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ background: "linear-gradient(135deg,rgba(0,255,255,0.2),rgba(128,0,255,0.2))" }} />
              </div>
            ))}
          </div>

          {/* Mobile swipe */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4" style={{ scrollbarWidth: "none" }}>
              {mediaItems.map((item, index) => (
                <div key={index} className="flex-none w-64 snap-center">
                  <div className="relative rounded-2xl overflow-hidden border border-[#00FFFF]/20" style={{ aspectRatio: "9/16", background: "linear-gradient(135deg,rgba(0,255,255,0.1),rgba(128,0,255,0.1))" }}>
                    <img src="/social-card.webp" alt={item.caption} className="w-full h-full object-cover" loading="lazy" />
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center border border-[#00FFFF]/40" style={{ backgroundColor: "rgba(0,255,255,0.2)", backdropFilter: "blur(8px)" }}>
                          <span style={{ color: "#00FFFF", fontSize: 18 }}>▶</span>
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.9),transparent)" }}>
                      <p className="text-sm text-white/90">{item.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stay Connected */}
        <div className="max-w-4xl mx-auto mt-24">
          <div className="bg-black border-2 border-[#00FFFF]/30 rounded-2xl p-8 md:p-12">
            <div className="text-[#00FFFF]/60 text-xs uppercase tracking-widest mb-4 text-center" style={{ fontFamily: "'Roboto Mono',monospace" }}>
              COHORT ACCESS // SIGNAL DROPS
            </div>
            <h3 className="text-4xl md:text-6xl text-white text-center mb-6" style={{ fontFamily: "'Urbanist',sans-serif", fontWeight: 700 }}>
              Stay <span style={{ color: "#00FFFF" }}>Connected</span>
            </h3>
            <p className="text-white/70 text-lg text-center mb-8" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
              Join the cohort for exclusive drops, early access, and daily optimization intel
            </p>
            <div className="text-center mb-8">
              <span className="text-2xl md:text-3xl text-white font-bold" style={{ fontFamily: "'Urbanist',sans-serif" }}>Refer 2+ Members </span>
              <span className="text-2xl md:text-3xl font-bold" style={{ color: "#00FFFF", fontFamily: "'Urbanist',sans-serif" }}>→ Unlock Rewards</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-8">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full text-white placeholder-white/40 outline-none transition-colors"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,255,255,0.3)", fontFamily: "'Space Grotesk',sans-serif" }}
                onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#00FFFF"; }}
                onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,255,0.3)"; }}
              />
              <button
                className="px-8 py-4 text-black rounded-full transition-all hover:opacity-90 flex items-center justify-center gap-2 whitespace-nowrap font-bold"
                style={{ backgroundColor: "#00FFFF", fontFamily: "'Urbanist',sans-serif", fontWeight: 700 }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(0,255,255,0.5)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                Join Now →
              </button>
            </div>
            <div className="pt-8 border-t border-[#00FFFF]/20">
              <a
                href="https://www.instagram.com/tryhydrbrew/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 text-white/70 hover:text-[#00FFFF] transition-all"
              >
                <span className="text-2xl">📸</span>
                <span className="text-lg" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500 }}>
                  Follow @hydrbrew on Instagram
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HbSocial;

export const schema = createSchema({
  type: "hb-social",
  title: "HB Social + Referral",
  settings: [],
  presets: {},
});
