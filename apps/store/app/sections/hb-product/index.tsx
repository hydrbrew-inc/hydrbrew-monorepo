import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface HbProductProps extends HydrogenComponentProps {
  shopLink?: string;
  muxPlaybackId?: string;
}

function HbProduct(props: HbProductProps) {
  const { shopLink = "/products", muxPlaybackId = "WkfZM6lERIxrrn7PGX01WTmyhwJCGnK9VbzKPwMdBDq00", ...rest } = props;

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showIngredients, setShowIngredients] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const carouselImages = [
    "/carousel-image.png",
    "https://i.imgur.com/4kKmc7z.jpeg",
    "https://i.imgur.com/iXr5kKh.png",
    "https://i.imgur.com/sqTrdv5.png",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.scrollDelay || "0";
            setTimeout(() => el.classList.add("scroll-visible"), parseInt(delay));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleVideoTimeUpdate = () => {
    if (!videoRef.current) return;
    const t = videoRef.current.currentTime;
    setActiveChapter(t < 6 ? 0 : t < 11 ? 1 : 2);
  };

  const chapters = ["2:15pm", "4:47pm", "6:15pm"];

  const scrollRevealCss = `
    .scroll-reveal { opacity:0; transform:translateY(20px); transition:opacity 0.6s ease,transform 0.6s ease; }
    .scroll-reveal.scroll-visible { opacity:1; transform:translateY(0); }
    .hydrbrew-row { box-shadow:0 0 30px rgba(0,255,255,0.2); }
    .hydrbrew-row:hover { background-color:rgba(0,255,255,0.08)!important; box-shadow:0 0 50px rgba(0,255,255,0.3); }
    @keyframes hb-fadein { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
    .hb-animate-fadein { animation:hb-fadein 0.3s ease-out; }
  `;

  return (
    <section id="shop" {...rest} className="relative pt-8 pb-24 md:py-24 bg-gradient-to-b from-black via-[#0A0A0A] to-black overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: scrollRevealCss }} />

      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#00FFFF]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-4 pb-16 md:py-24">

        {/* Two-column: carousel + info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto mb-32">

          {/* Left: carousel */}
          <div className="relative scroll-reveal" data-scroll-delay="0">
            <div className="relative w-full aspect-[3/4] max-w-[360px] mx-auto border-2 border-[#00FFFF]/30 overflow-hidden">
              <img src={carouselImages[carouselIndex]} alt={`hydrbrew product view ${carouselIndex + 1}`} className="w-full h-full object-cover transition-opacity duration-300" loading="lazy" />
            </div>
            <div className="flex gap-3 mt-6 justify-center">
              {carouselImages.map((img, i) => (
                <button type="button" key={i} onClick={() => setCarouselIndex(i)} className="w-20 h-24 border-2 transition-all overflow-hidden" style={{ borderColor: carouselIndex === i ? "#00FFFF" : "rgba(255,255,255,0.2)", boxShadow: carouselIndex === i ? "0 0 10px rgba(0,255,255,0.5)" : "none" }}>
                  <img src={img} alt={`thumbnail ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {carouselImages.map((_, i) => (
                <button type="button" key={i} onClick={() => setCarouselIndex(i)} className={`w-2 h-2 rounded-full transition-all ${carouselIndex === i ? "bg-[#00FFFF]" : "bg-white/20 hover:bg-white/40"}`} />
              ))}
            </div>
          </div>

          {/* Right: info */}
          <div className="flex flex-col justify-start scroll-reveal" data-scroll-delay="120">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Urbanist',sans-serif" }}>FUNCTIONAL<br />ICED COFFEE</h2>
            <p className="text-2xl md:text-3xl text-white mb-4" style={{ fontFamily: "'Urbanist',sans-serif", fontWeight: 500 }}>Nootropics + Adaptogens</p>

            <div className="flex flex-col gap-2 mb-6">
              {["Sustained Uptime", "Accelerated Neural Clarity (Lion's Mane)", "Zero Jitters / Clean Metabolic Exit"].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <span className="text-[#00FFFF] text-base font-bold" style={{ fontFamily: "'Roboto Mono',monospace" }}>✓</span>
                  <span className="text-white/90 text-base" style={{ fontFamily: "'Urbanist',sans-serif", fontWeight: 500 }}>{point}</span>
                </div>
              ))}
            </div>

            <p className="text-base md:text-lg text-[#00FFFF] mb-2 font-bold" style={{ fontFamily: "'Roboto Mono',monospace" }}>12-PACK // 12 OZ SLEEK CANS</p>
            <p className="text-sm text-[#00FFFF] mb-6" style={{ fontFamily: "'Roboto Mono',monospace" }}>200mg L-Theanine // 200mg Lion's Mane // 85mg Caffeine</p>

            <p className="text-base text-white/80 mb-8 leading-relaxed" style={{ fontFamily: "'Urbanist',sans-serif", fontWeight: 300 }}>
              hydrbrew° is a light and crisp, refreshing evolution of the coffee ritual. Molecularly calibrated for sustained uptime, it eliminates the metabolic drag of traditional caffeine - delivering a clear, precise cognitive glide without the noise. No sharp spikes, no afternoon jitters. Just a clean return to baseline. Command your day. The night stays yours.
            </p>

            {/* Badges */}
            <div className="flex gap-6 mb-8">
              {["https://i.imgur.com/vs3fowk.png", "https://i.imgur.com/guTl0lK.png", "https://i.imgur.com/DCLjzhJ.png"].map((src, i) => (
                <div key={i} className="w-32 h-32 border-2 border-[#00FFFF]/40 flex items-center justify-center overflow-hidden">
                  <img src={src} alt="product badge" className="w-full h-full object-cover" loading="lazy" style={{ filter: "brightness(1.3)" }} />
                </div>
              ))}
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="text-xs text-[#00FFFF]/60 uppercase tracking-wider mb-3 block" style={{ fontFamily: "'Roboto Mono',monospace" }}>Quantity // 12-Packs</label>
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1} className="w-10 h-10 border border-[#00FFFF] text-[#00FFFF] flex items-center justify-center hover:bg-[#00FFFF]/10 transition-all disabled:opacity-30">−</button>
                <span className="text-white text-lg font-medium min-w-8 text-center">{quantity}</span>
                <button type="button" onClick={() => setQuantity(q => Math.min(10, q + 1))} disabled={quantity >= 10} className="w-10 h-10 border border-[#00FFFF] text-[#00FFFF] flex items-center justify-center hover:bg-[#00FFFF]/10 transition-all disabled:opacity-30">+</button>
              </div>
            </div>

            <p className="text-sm text-white/70 mb-2" style={{ fontFamily: "'Roboto Mono',monospace" }}>$59.95 // per 12-pack</p>

            <a href={shopLink} className="w-full py-4 mb-4 text-black font-bold uppercase tracking-wider transition-all hover:opacity-90 rounded-xl text-center block" style={{ backgroundColor: "#00FFFF", fontFamily: "'Urbanist',sans-serif", fontSize: "18px", fontWeight: 700 }}>
              SECURE ALLOCATION
            </a>

            <button type="button" onClick={() => setShowIngredients(!showIngredients)} className="w-full py-4 border border-white text-white font-medium uppercase tracking-wider hover:bg-white/10 transition-all rounded-xl" style={{ fontFamily: "'Urbanist',sans-serif", fontSize: "14px" }}>
              Full Ingredients {showIngredients ? "↑" : "↓"}
            </button>

            {showIngredients && (
              <div className="mt-6 border border-[#00FFFF]/30 rounded-lg overflow-hidden hb-animate-fadein">
                <img src="https://i.imgur.com/opEN1j8.jpeg" alt="hydrbrew ingredient label" className="w-full h-auto" loading="lazy" />
              </div>
            )}
          </div>
        </div>

        {/* The Afternoon Ritual */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto mb-32">
          <div className="flex flex-col justify-start scroll-reveal" data-scroll-delay="0">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-8" style={{ fontFamily: "'Urbanist',sans-serif" }}>The<br />Afternoon<br />Ritual</h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed" style={{ fontFamily: "'Urbanist',sans-serif", fontWeight: 300 }}>
              Functional Iced Coffee for high-frequency output. Precision coffee soul, vital electrolytes, and a calibrated nootropic stack work in total sync to sustain your peak baseline—eliminating systemic friction and protecting the ritual you love.
            </p>
          </div>
          <div className="relative flex items-center justify-center scroll-reveal" data-scroll-delay="160">
            <div className="w-full max-w-md aspect-square bg-gradient-to-br from-[#00FFFF]/20 to-transparent rounded-lg overflow-hidden border-2 border-[#00FFFF]/30" style={{ transform: "rotate(15deg)", boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }}>
              <div className="w-full h-full flex items-center justify-center">
                <img src="https://i.imgur.com/jaYNqNB.png" alt="Person holding hydrbrew can" className="w-full h-full object-cover" style={{ transform: "rotate(-15deg) scale(1.85) translateY(3%)" }} loading="lazy" />
              </div>
            </div>
          </div>
        </div>

        {/* Category comparison + video */}
        <div className="mt-12 md:mt-32 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16">

            {/* Left: table */}
            <div className="flex flex-col scroll-reveal" data-scroll-delay="0">
              <div className="mb-16 md:mb-20">
                <p className="text-[#00FFFF] text-sm mb-4 uppercase tracking-wider" style={{ fontFamily: "'Roboto Mono',monospace" }}>CATEGORY ANALYSIS // COMPETITIVE MATRIX</p>
                <h3 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight" style={{ fontFamily: "'Urbanist',sans-serif" }}>How We<br />Stack Up</h3>
              </div>

              <div className="overflow-x-auto border border-[#00FFFF]/20 p-1 flex-1 flex items-stretch">
                <table className="w-full" style={{ borderCollapse: "collapse", fontFamily: "'Urbanist',sans-serif" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#0B0B0B", borderBottom: "2px solid #00FFFF" }}>
                      {["CATEGORY", "RITUAL", "STACK"].map(h => (
                        <th key={h} className="text-left py-3 px-3 md:py-6 md:px-8"><span className="text-[#00FFFF] uppercase tracking-wider font-bold text-[10px] md:text-xs">{h}</span></th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "RTD Coffee", sub: "La Colombe", ritual: "Morning", stack: "Absent" },
                      { name: "Functional Water", sub: "Liquid I.V.", ritual: "Anytime", stack: "Absent" },
                      { name: "Nootropic Drinks", sub: "Kin", ritual: "Evening", stack: "Partial" },
                    ].map((row) => (
                      <tr key={row.name} className="transition-all duration-300 hover:bg-white/[0.02]" style={{ borderBottom: "1px solid #1A1A1A" }}>
                        <td className="py-4 px-3 md:py-6 md:px-8"><div className="text-white/80 text-sm md:text-lg font-medium">{row.name}</div><div className="text-white/50 text-xs md:text-sm mt-1 hidden md:block">{row.sub}</div></td>
                        <td className="py-4 px-3 md:py-6 md:px-8"><div className="text-white/70 text-sm md:text-base">{row.ritual}</div></td>
                        <td className="py-4 px-3 md:py-6 md:px-8"><div className="text-white/70 text-sm md:text-base">{row.stack}</div></td>
                      </tr>
                    ))}
                    <tr className="hydrbrew-row transition-all duration-300" style={{ backgroundColor: "rgba(0,255,255,0.05)", borderLeft: "4px solid #00FFFF" }}>
                      <td className="py-5 px-3 md:py-8 md:px-8">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-2 h-2 md:w-3 md:h-3 bg-[#00FFFF] rounded-full" style={{ boxShadow: "0 0 10px rgba(0,255,255,0.8)" }} />
                          <span className="text-base md:text-2xl font-bold" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                            <span className="text-[#00FFFF]">hydr</span><span className="text-white">brew°</span>
                          </span>
                        </div>
                      </td>
                      <td className="py-5 px-3 md:py-8 md:px-8"><div className="text-[#00FFFF] text-sm md:text-lg font-bold">AFTERNOON</div><div className="text-[#00FFFF]/60 text-xs md:text-sm font-mono mt-1 hidden md:block">Noon-6PM</div></td>
                      <td className="py-5 px-3 md:py-8 md:px-8"><div className="flex items-center gap-1 md:gap-2"><div className="text-[#00FFFF] text-lg md:text-2xl">✓</div><span className="text-[#00FFFF] text-xs md:text-base font-bold">FULL STACK BENEFITS</span></div></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 md:mt-16 flex items-center justify-center text-center">
                <p className="text-white text-lg md:text-2xl max-w-2xl" style={{ fontFamily: "'Urbanist',sans-serif", fontWeight: 400 }}>
                  Molecularly calibrated for sustained uptime.<br /><span className="text-[#00FFFF] font-bold">The Night Stays Yours.</span>
                </p>
              </div>
            </div>

            {/* Right: video with chapter timeline */}
            <div className="flex flex-col scroll-reveal" data-scroll-delay="160">
              <div className="mb-0 md:mb-20 opacity-0 pointer-events-none" aria-hidden="true"><p>.</p><h3 className="text-5xl md:text-7xl lg:text-8xl">.<br />.</h3></div>

              {/* Chapter timeline */}
              <div className="mb-2 md:mb-6 px-2">
                <div className="flex items-center justify-between gap-2">
                  {chapters.map((c, i) => (
                    <>
                      {i > 0 && <div key={`div-${i}`} className="flex-1 h-[1px] bg-gradient-to-r from-[#00FFFF]/30 to-[#00FFFF]/10" />}
                      <div key={c} className="flex flex-col items-center transition-all duration-500">
                        <span className={`font-bold transition-all duration-500 ${activeChapter === i ? "text-2xl md:text-3xl text-[#00FFFF]" : "text-base md:text-lg text-white/30"}`} style={{ fontFamily: "'Urbanist',sans-serif", textShadow: activeChapter === i ? "0 0 20px rgba(0,255,255,0.6)" : "none" }}>{c}</span>
                      </div>
                    </>
                  ))}
                </div>
              </div>

              {/* Video */}
              <div className="relative w-full flex-1 h-[400px] lg:h-auto lg:min-h-0 border-0 lg:border-2 lg:border-[#00FFFF]/30 rounded-none lg:rounded-2xl p-0 lg:p-1 transition-all overflow-hidden">
                <div className="relative w-full h-full rounded-none lg:rounded-xl overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onTimeUpdate={handleVideoTimeUpdate}
                    className="w-full h-full object-cover"
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                  >
                    <source src={`https://stream.mux.com/${muxPlaybackId}/high.mp4`} type="video/mp4" />
                  </video>
                </div>
                <div className="absolute inset-0 bg-[#00FFFF]/5 blur-xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HbProduct;

export const schema = createSchema({
  type: "hb-product",
  title: "HB Product",
  settings: [
    { group: "Content", inputs: [
      { type: "text", name: "shopLink", label: "Shop / buy link", defaultValue: "/products" },
      { type: "text", name: "muxPlaybackId", label: "Mux video playback ID", defaultValue: "WkfZM6lERIxrrn7PGX01WTmyhwJCGnK9VbzKPwMdBDq00" },
    ]},
  ],
  presets: { shopLink: "/products" },
});
