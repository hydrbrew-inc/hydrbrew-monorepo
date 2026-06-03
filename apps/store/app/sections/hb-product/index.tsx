import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { useState } from "react";
import { Link } from "react-router";

const PRODUCT_IMAGES = [
  { src: "/product-main.webp", name: "Real Coffee Whisper" },
  { src: "/can-front.webp", name: "Original Blend" },
  { src: "/can-front.webp", name: "Arctic Focus" },
  { src: "/can-front.webp", name: "Deep Flow" },
];

const CHAPTERS = [
  { time: "2:15pm", label: "Activation window opens. Precision caffeine + L-Theanine engage." },
  { time: "4:47pm", label: "Deep focus maintained. No cortisol spike. Lion's Mane sustaining neural clarity." },
  { time: "6:15pm", label: "Clean metabolic exit. The night is yours. Zero systemic debt." },
];

interface HbProductProps extends HydrogenComponentProps {
  ctaLink?: string;
}

function HbProduct(props: HbProductProps) {
  const { ctaLink = "/products/hydrbrew-pre-order-bundle", ...rest } = props;
  const [currentImage, setCurrentImage] = useState(0);
  const [activeChapter] = useState(0);

  return (
    <section {...rest} className="relative bg-black overflow-hidden" style={{ background: "linear-gradient(to bottom,#000,#0A0A0A,#000)" }}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32">

        {/* ── Product Showcase ── */}
        <div id="shop" className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start mb-24">

          {/* Left: image carousel */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2">
              {PRODUCT_IMAGES.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className="w-16 h-20 rounded-md overflow-hidden border-2 transition-all"
                  style={{ borderColor: currentImage === i ? "#00FFFF" : "rgba(0,255,255,0.2)", boxShadow: currentImage === i ? "0 0 10px rgba(0,255,255,0.4)" : "none" }}
                >
                  <img src={img.src} alt={img.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            {/* Main image */}
            <div className="flex-1 rounded-lg overflow-hidden" style={{ border: "2px solid rgba(0,255,255,0.3)", aspectRatio: "3/4", background: "linear-gradient(135deg,rgba(0,255,255,0.1),transparent)" }}>
              <img src={PRODUCT_IMAGES[currentImage].src} alt="hydrbrew° product" className="w-full h-full object-contain p-4" style={{ filter: "drop-shadow(0 20px 60px rgba(0,255,255,0.15))" }} />
            </div>
          </div>

          {/* Right: product details */}
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-widest" style={{ color: "#00FFFF", fontFamily: "'Roboto Mono',monospace" }}>12-PACK // 12 OZ SLEEK CANS</p>
            <h2 className="text-5xl md:text-6xl font-bold text-white uppercase leading-tight" style={{ fontFamily: "'Urbanist',sans-serif" }}>
              FUNCTIONAL<br />ICED COFFEE
            </h2>
            <p className="text-2xl text-white font-medium" style={{ fontFamily: "'Urbanist',sans-serif" }}>Nootropics + Adaptogens</p>

            <ul className="space-y-3">
              {[
                "Sustained Uptime",
                "Accelerated Neural Clarity (Lion's Mane)",
                "Zero Jitters / Clean Metabolic Exit",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="font-bold" style={{ color: "#00FFFF", fontFamily: "'Roboto Mono',monospace" }}>✓</span>
                  <span className="text-white/90" style={{ fontFamily: "'Urbanist',sans-serif", fontWeight: 500 }}>{item}</span>
                </li>
              ))}
            </ul>

            <p className="font-bold text-base md:text-lg" style={{ color: "#00FFFF", fontFamily: "'Roboto Mono',monospace" }}>12-PACK // 12 OZ SLEEK CANS</p>
            <p className="text-sm" style={{ color: "#00FFFF", fontFamily: "'Roboto Mono',monospace" }}>200mg L-Theanine // 200mg Lion's Mane // 85mg Caffeine</p>

            <p className="text-base text-white/80 leading-relaxed" style={{ fontFamily: "'Urbanist',sans-serif", fontWeight: 300 }}>
              Clean, alkaline cold brew engineered for the afternoon window. Zero systemic debt. Only 20 calories.
            </p>

            {/* Badges */}
            <div className="flex gap-3">
              {[
                { src: "/badge-electrolytes.webp", alt: "Ionic Electrolytes" },
                { src: "/badge-sugar.webp", alt: "Low Sugar" },
                { src: "/badge-caffeine.webp", alt: "Precision Caffeine" },
              ].map((b) => (
                <div key={b.alt} className="w-10 h-10 rounded-lg overflow-hidden" style={{ border: "1px solid rgba(0,255,255,0.3)" }}>
                  <img src={b.src} alt={b.alt} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>

            {/* Quantity + CTA */}
            <div className="flex items-center gap-4">
              <Link
                to={ctaLink}
                className="flex-1 text-center py-4 rounded-xl font-bold text-black text-lg uppercase tracking-wider transition-all hover:opacity-90"
                style={{ backgroundColor: "#00FFFF", fontFamily: "'Urbanist',sans-serif" }}
              >
                SECURE ALLOCATION
              </Link>
            </div>
            <button className="w-full py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white transition-colors" style={{ border: "1px solid rgba(255,255,255,0.2)", fontFamily: "'Urbanist',sans-serif" }}>
              Full Ingredients
            </button>
          </div>
        </div>

        {/* ── The Afternoon Ritual ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="font-bold text-white mb-6" style={{ fontFamily: "'Urbanist',sans-serif", fontSize: "clamp(48px,6vw,80px)", lineHeight: 1.1 }}>
              The<br />Afternoon<br />Ritual
            </h2>
            <p className="text-lg text-white/70 leading-relaxed" style={{ fontFamily: "'Urbanist',sans-serif", fontWeight: 300 }}>
              The afternoon performance drop is a design instability. hydrbrew° delivers 85mg of precision-modulated caffeine paired with 200mg L-Theanine and 200mg Lion's Mane — engineered for the window that matters most. No crash, no cortisol spike. Clean substrate for clean output.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative max-w-sm w-full rounded-lg overflow-hidden" style={{ border: "2px solid rgba(0,255,255,0.3)", aspectRatio: "3/4", background: "linear-gradient(135deg,rgba(0,255,255,0.1),transparent)" }}>
              <img
                src="/afternoon-model.webp"
                alt="Person holding hydrbrew° can"
                className="w-full h-full object-cover"
                style={{ transform: "rotate(15deg) scale(1.85) translateY(3%)", filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.5))" }}
              />
            </div>
          </div>
        </div>

        {/* ── Comparison Table + Chapter Timeline ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: table */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#00FFFF", fontFamily: "'Roboto Mono',monospace" }}>CATEGORY ANALYSIS // COMPETITIVE MATRIX</p>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8" style={{ fontFamily: "'Urbanist',sans-serif" }}>How We Stack Up</h2>
            <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid rgba(0,255,255,0.2)" }}>
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: "#0B0B0B", borderBottom: "2px solid #00FFFF" }}>
                    {["PRODUCT", "WINDOW", "STACK"].map((h) => (
                      <th key={h} className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: "#00FFFF", fontFamily: "'Roboto Mono',monospace" }}>{h}</th>
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
                      <td className="px-4 py-3 text-white/60 text-sm" style={{ fontFamily: "'Urbanist',sans-serif" }}>{row.name}</td>
                      <td className="px-4 py-3 text-white/60 text-sm">{row.window}</td>
                      <td className="px-4 py-3 text-white/60 text-sm">{row.stack}</td>
                    </tr>
                  ))}
                  <tr style={{ backgroundColor: "rgba(0,255,255,0.05)", borderLeft: "4px solid #00FFFF", boxShadow: "0 0 30px rgba(0,255,255,0.2)" }}>
                    <td className="px-4 py-4">
                      <span style={{ color: "#00FFFF", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700 }}>hydr</span>
                      <span className="text-white font-bold" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>brew°</span>
                    </td>
                    <td className="px-4 py-4 font-bold text-sm" style={{ color: "#00FFFF", fontFamily: "'Urbanist',sans-serif" }}>AFTERNOON</td>
                    <td className="px-4 py-4 font-bold text-sm" style={{ color: "#00FFFF", fontFamily: "'Urbanist',sans-serif" }}>FULL STACK ✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-white/60 text-base" style={{ fontFamily: "'Urbanist',sans-serif" }}>
              Molecularly calibrated for sustained uptime.{" "}
              <span className="font-bold" style={{ color: "#00FFFF" }}>The Night Stays Yours.</span>
            </p>
          </div>

          {/* Right: chapter timeline */}
          <div className="flex flex-col">
            {CHAPTERS.map((chapter, i) => (
              <div
                key={i}
                className="flex gap-6 items-start py-6"
                style={{ borderBottom: i < 2 ? "1px solid rgba(0,255,255,0.1)" : "none" }}
              >
                <div className="shrink-0 pt-1">
                  <span
                    className="font-bold"
                    style={{
                      fontFamily: "'Roboto Mono',monospace",
                      fontSize: activeChapter === i ? 28 : 18,
                      color: activeChapter === i ? "#00FFFF" : "rgba(255,255,255,0.3)",
                      textShadow: activeChapter === i ? "0 0 20px rgba(0,255,255,0.6)" : "none",
                      transition: "all 0.3s",
                    }}
                  >
                    {chapter.time}
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed pt-1"
                  style={{
                    color: activeChapter === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
                    fontFamily: "'Urbanist',sans-serif",
                  }}
                >
                  {chapter.label}
                </p>
              </div>
            ))}
          </div>
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
