import { createSchema } from "@weaverse/hydrogen";
import type { SectionProps } from "~/components/section";
import { sectionSettings } from "~/components/section";

function HbFooterCta(_props: SectionProps) {
  return (
    <section className="py-20 md:py-32 bg-black" style={{ borderTop: "1px solid rgba(0,255,255,0.15)" }}>
      <div className="max-w-2xl mx-auto px-4 text-center mb-20">
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(0,255,255,0.6)", fontFamily: "'Roboto Mono', monospace" }}>
          JOIN THE COHORT // DAILY OPTIMIZATION
        </p>
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-4" style={{ fontFamily: "'Urbanist', sans-serif" }}>
          Establish{" "}
          <span style={{ color: "#00FFFF" }}>Uptime Baseline</span>
        </h2>
        <p className="text-lg text-white/70 mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Subscribe to receive tactical intelligence and human throughput updates. Zero noise. Absolute data.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="email@protocol.com"
            className="flex-1 px-6 py-4 rounded-full text-white outline-none"
            style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,255,255,0.3)", fontFamily: "'Space Grotesk', sans-serif" }}
            onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#00FFFF"; }}
            onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,255,0.3)"; }}
          />
          <button
            className="px-8 py-4 rounded-full font-bold text-black uppercase tracking-wider transition-all hover:opacity-90"
            style={{ backgroundColor: "#00FFFF", fontFamily: "'Urbanist', sans-serif" }}
          >
            INITIALIZE
          </button>
        </div>
      </div>

      {/* Footer nav grid */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {[
            { heading: "Shop", links: ["Pre-Order Bundle", "Ingredients", "How It Works"] },
            { heading: "Support", links: ["FAQ", "Shipping & Returns", "Contact"] },
            { heading: "Company", links: ["Our Story", "Journal", "Press"] },
            { heading: "Legal", links: ["Privacy Policy", "Terms of Service", "Refund Policy"] },
          ].map((col) => (
            <div key={col.heading}>
              <h4 className="text-white font-bold mb-4" style={{ fontFamily: "'Urbanist', sans-serif" }}>{col.heading}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <span className="text-sm text-white/60 hover:text-[#00FFFF] cursor-pointer transition-colors" style={{ fontFamily: "'Urbanist', sans-serif" }}>
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(0,255,255,0.1)" }}
        >
          <div>
            <span style={{ color: "#00FFFF", fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, letterSpacing: "0.05em" }}>hydr</span>
            <span className="text-white font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, letterSpacing: "0.05em" }}>brew°</span>
          </div>
          <p className="text-xs text-white/40" style={{ fontFamily: "'Urbanist', sans-serif" }}>
            © 2026 hydrbrew°. All rights reserved.
          </p>
          <div className="flex gap-3">
            {["Instagram", "X", "TikTok"].map((social) => (
              <a
                key={social}
                href={social === "Instagram" ? "https://www.instagram.com/tryhydrbrew/" : social === "X" ? "https://x.com/hydrbrew" : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs text-white/60 hover:text-[#00FFFF] transition-colors"
                style={{ border: "1px solid rgba(0,255,255,0.2)" }}
              >
                {social[0]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HbFooterCta;

export const schema = createSchema({
  type: "hb-footer-cta",
  title: "HB Footer CTA",
  settings: [...sectionSettings],
  presets: {},
});
