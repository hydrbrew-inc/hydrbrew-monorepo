import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { Link } from "react-router";

interface HbProductProps extends HydrogenComponentProps {
  ctaLink?: string;
}

function HbProduct(props: HbProductProps) {
  const { ctaLink = "/products/hydrbrew-pre-order-bundle", ...rest } = props;

  return (
    <section {...rest} className="relative bg-black py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0A0A0A] to-black pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">

        {/* Product showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-24">
          <div className="flex justify-center">
            <div className="relative max-w-sm w-full aspect-[3/4] rounded-lg overflow-hidden" style={{ border: "2px solid rgba(0,255,255,0.3)", background: "linear-gradient(135deg,rgba(0,255,255,0.1),transparent)" }}>
              <img src="/can-front.webp" alt="hydrbrew° can" className="w-full h-full object-contain p-8" style={{ filter: "drop-shadow(0 20px 60px rgba(0,255,255,0.15))" }} />
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-widest mb-3" style={{ color: "#00FFFF", fontFamily: "'Roboto Mono',monospace" }}>12-PACK // 12 OZ SLEEK CANS</p>
            <h2 className="text-5xl md:text-6xl font-bold text-white uppercase mb-2" style={{ fontFamily: "'Urbanist',sans-serif" }}>FUNCTIONAL</h2>
            <h2 className="text-5xl md:text-6xl font-bold text-white uppercase mb-4" style={{ fontFamily: "'Urbanist',sans-serif" }}>ICED COFFEE</h2>
            <p className="text-2xl font-medium text-white mb-6" style={{ fontFamily: "'Urbanist',sans-serif" }}>Nootropics + Adaptogens</p>
            <ul className="space-y-3 mb-6">
              {["Sustained Uptime", "Accelerated Neural Clarity (Lion's Mane)", "Zero Jitters / Clean Metabolic Exit"].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="font-bold mt-0.5" style={{ color: "#00FFFF", fontFamily: "'Roboto Mono',monospace" }}>✓</span>
                  <span className="text-white/90 font-medium" style={{ fontFamily: "'Urbanist',sans-serif" }}>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm mb-8" style={{ color: "#00FFFF", fontFamily: "'Roboto Mono',monospace" }}>200mg L-Theanine // 200mg Lion's Mane // 85mg Caffeine</p>
            <Link to={ctaLink} className="block w-full text-center py-4 rounded-xl font-bold text-black text-lg uppercase tracking-wider transition-all duration-300 hover:opacity-90" style={{ backgroundColor: "#00FFFF", fontFamily: "'Urbanist',sans-serif" }}>
              SECURE ALLOCATION
            </Link>
          </div>
        </div>

        {/* Afternoon Ritual */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-6" style={{ fontFamily: "'Urbanist',sans-serif", lineHeight: 1.1 }}>The<br />Afternoon<br />Ritual</h2>
            <p className="text-lg text-white/70 leading-relaxed" style={{ fontFamily: "'Urbanist',sans-serif", fontWeight: 300 }}>
              The afternoon performance drop is a design instability. hydrbrew° delivers 85mg of precision-modulated caffeine paired with 200mg L-Theanine and 200mg Lion's Mane — engineered for the window that matters most.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative max-w-xs w-full aspect-square rounded-lg overflow-hidden" style={{ border: "2px solid rgba(0,255,255,0.3)", background: "linear-gradient(135deg,rgba(0,255,255,0.1),transparent)" }}>
              <img src="/can-front.webp" alt="hydrbrew° can" className="w-full h-full object-contain p-6" style={{ transform: "rotate(15deg) scale(1.2)", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }} />
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div>
          <p className="text-xs uppercase tracking-widest mb-4 text-center" style={{ color: "#00FFFF", fontFamily: "'Roboto Mono',monospace" }}>CATEGORY ANALYSIS // COMPETITIVE MATRIX</p>
          <h2 className="text-5xl md:text-7xl font-bold text-white text-center mb-12" style={{ fontFamily: "'Urbanist',sans-serif" }}>How We Stack Up</h2>
          <div className="overflow-x-auto" style={{ border: "1px solid rgba(0,255,255,0.2)", borderRadius: 12 }}>
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: "#0B0B0B", borderBottom: "2px solid #00FFFF" }}>
                  {["PRODUCT", "BEST WINDOW", "NOOTROPIC STACK"].map((h) => (
                    <th key={h} className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: "#00FFFF", fontFamily: "'Roboto Mono',monospace" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "RTD Coffee (La Colombe)", window: "Morning", stack: "Absent" },
                  { name: "Functional Water (Liquid I.V.)", window: "Anytime", stack: "Absent" },
                  { name: "Nootropic Drinks (Kin)", window: "Evening", stack: "Partial" },
                ].map((row) => (
                  <tr key={row.name} style={{ borderBottom: "1px solid #1A1A1A" }}>
                    <td className="px-6 py-4 text-white/60 text-sm" style={{ fontFamily: "'Urbanist',sans-serif" }}>{row.name}</td>
                    <td className="px-6 py-4 text-white/60 text-sm">{row.window}</td>
                    <td className="px-6 py-4 text-white/60 text-sm">{row.stack}</td>
                  </tr>
                ))}
                <tr style={{ backgroundColor: "rgba(0,255,255,0.05)", borderLeft: "4px solid #00FFFF" }}>
                  <td className="px-6 py-5">
                    <span style={{ color: "#00FFFF", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18 }}>hydr</span>
                    <span className="text-white font-bold" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18 }}>brew°</span>
                  </td>
                  <td className="px-6 py-5 font-bold" style={{ color: "#00FFFF", fontFamily: "'Urbanist',sans-serif" }}>AFTERNOON (Noon–6PM)</td>
                  <td className="px-6 py-5 font-bold" style={{ color: "#00FFFF", fontFamily: "'Urbanist',sans-serif" }}>FULL STACK ✓</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center mt-8 text-white/60 text-lg" style={{ fontFamily: "'Urbanist',sans-serif" }}>
            Molecularly calibrated for sustained uptime.{" "}
            <span className="font-bold" style={{ color: "#00FFFF" }}>The Night Stays Yours.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default HbProduct;

export const schema = createSchema({
  type: "hb-product",
  title: "HB Product Showcase",
  settings: [
    { group: "Content", inputs: [{ type: "text", name: "ctaLink", label: "CTA Link", defaultValue: "/products/hydrbrew-pre-order-bundle" }] },
  ],
  presets: { ctaLink: "/products/hydrbrew-pre-order-bundle" },
});
