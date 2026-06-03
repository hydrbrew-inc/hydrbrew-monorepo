import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface HbHeroProps extends HydrogenComponentProps {
  heroBgImage?: string;
  shopLink?: string;
  discountCode?: string;
}

interface MenuItem {
  label: string;
  href: string;
  wireframe: string;
}

function FuturisticSidebar({
  isOpen,
  onClose,
  shopLink,
}: {
  isOpen: boolean;
  onClose: () => void;
  shopLink: string;
}) {
  const [bootSequence, setBootSequence] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    { label: "SHOP", href: shopLink, wireframe: "╔═══╗\n║ ▓ ║\n╚═══╝" },
    { label: "OPTIMIZE", href: "#quiz", wireframe: "╔═══╗\n║ ◉ ║\n╚═══╝" },
    { label: "KNOWLEDGE BASE", href: "#knowledge-base", wireframe: "╔═══╗\n║ ≡ ║\n╚═══╝" },
    { label: "FAQ", href: "#faq", wireframe: "╔═══╗\n║ ? ║\n╚═══╝" },
  ];

  useEffect(() => {
    if (isOpen) {
      setBootSequence(true);
      const t = setTimeout(() => setBootSequence(false), 400);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const playChime = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      [523.25, 659.25].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        const vol = i === 0 ? 0.055 : 0.035;
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.32);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.34);
      });
    } catch {}
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hb-pulse-glow {
          0%,100% { box-shadow:0 0 20px rgba(0,255,255,0.3),inset 0 0 20px rgba(0,255,255,0.1); }
          50% { box-shadow:0 0 40px rgba(0,255,255,0.5),inset 0 0 30px rgba(0,255,255,0.2); }
        }
        .hb-glow-border { animation:hb-pulse-glow 3s ease-in-out infinite; }
        @keyframes hb-flicker {
          0%,100%{opacity:1} 10%{opacity:0.8} 20%{opacity:1} 30%{opacity:0.7} 40%{opacity:1} 50%{opacity:0.9} 60%{opacity:1}
        }
        .hb-boot-flicker { animation:hb-flicker 0.4s ease-in-out; }
        @keyframes hb-sidebar-fadein { from{opacity:0;transform:translateX(8px)} to{opacity:1;transform:translateX(0)} }
        .hb-wireframe-preview { animation:hb-sidebar-fadein 0.15s ease-out; }
      `}} />

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      )}

      {/* Sidebar panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-[400px] max-w-[90vw] transition-transform duration-500 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className={`h-full relative ${bootSequence ? "hb-boot-flicker" : ""}`}>
          <div className="absolute inset-0 border-l-2 border-t-2 border-b-2 border-[#00FFFF] hb-glow-border bg-black/30 backdrop-blur-md">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#00FFFF]" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#00FFFF]" />

            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,255,0.1) 2px,rgba(0,255,255,0.1) 4px)" }} />

            <div className="relative h-full flex flex-col p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-12">
                <div className="font-mono text-[10px] text-[#00FFFF]/60 uppercase tracking-widest">NAVIGATION SYSTEM</div>
                <button type="button" onClick={onClose} className="text-[#00FFFF] hover:text-white transition-colors p-2 border border-[#00FFFF]/30 hover:border-[#00FFFF]" aria-label="Close menu">
                  <X size={20} />
                </button>
              </div>

              {/* Logo */}
              <div className="mb-16 text-center">
                <h2 className="text-4xl tracking-wider" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                  <span className="text-[#00FFFF]">hydr</span><span className="text-white">brew°</span>
                </h2>
                <div className="mt-2 font-mono text-[8px] text-[#00FFFF]/50 uppercase tracking-widest">
                  Defeating Afternoon Systemic Debt
                </div>
              </div>

              {/* Menu items */}
              <div className="flex-1 flex flex-col justify-center items-start gap-6 px-8">
                {menuItems.map((item) => (
                  <div
                    key={item.label}
                    className="relative w-full"
                    onMouseEnter={() => { setHoveredItem(item.label); playChime(); }}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <a
                      href={item.href}
                      onClick={onClose}
                      className="block text-2xl text-white/70 hover:text-[#00FFFF] transition-all duration-300 tracking-wider py-6 px-4 border-l-2 border-[#00FFFF]/20 hover:border-[#00FFFF] hover:translate-x-2"
                      style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600 }}
                    >
                      {item.label}
                    </a>

                    {/* Wireframe sector map */}
                    {hoveredItem === item.label && (
                      <div className="hb-wireframe-preview absolute -right-24 top-1/2 -translate-y-1/2 bg-black/90 border border-[#00FFFF] p-3 font-mono text-[10px] text-[#00FFFF] whitespace-pre">
                        {item.wireframe}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function HbHero(props: HbHeroProps) {
  const {
    heroBgImage = "https://i.imgur.com/VzCUpeT.png",
    shopLink = "/products",
    discountCode = "HYDR15",
    ...rest
  } = props;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Apply 3-D perspective transform to page content when sidebar is open
  useEffect(() => {
    const mainEl = document.getElementById("mainContent");
    if (!mainEl) return;
    if (isSidebarOpen) {
      mainEl.style.transform = "perspective(1200px) rotateY(-5deg) translateX(-50px) scale(0.95)";
      mainEl.style.filter = "blur(3px)";
      mainEl.style.transition = "all 0.6s cubic-bezier(0.4,0,0.2,1)";
      mainEl.style.transformOrigin = "center center";
    } else {
      mainEl.style.transform = "";
      mainEl.style.filter = "";
      mainEl.style.transition = "all 0.6s cubic-bezier(0.4,0,0.2,1)";
    }
  }, [isSidebarOpen]);

  return (
    <div {...rest}>
      {/* Top Banner */}
      <div
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-[#00FFFF]/20"
        style={{ background: "linear-gradient(to right,rgba(0,255,255,0.1),rgba(0,255,255,0.1))" }}
      >
        <div className="container mx-auto px-4 py-2 text-center cursor-pointer group transition-all hover:bg-[#00FFFF]/20">
          <p
            className="text-sm text-[#00FFFF] group-hover:text-white transition-colors px-4 py-1 bg-black/80 backdrop-blur-sm rounded-full inline-block"
            style={{ textShadow: "0 0 10px rgba(0,255,255,0.5)" }}
          >
            SAVE 15% on first order – Use code{" "}
            <span className="font-bold px-2 py-1 bg-[#00FFFF]/30 rounded-full group-hover:bg-[#00FFFF] group-hover:text-black group-hover:scale-110 inline-block transition-all duration-300 border border-[#00FFFF]/50">
              {discountCode}
            </span>
          </p>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`fixed top-10 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "bg-black/90 backdrop-blur-xl border-b border-[#00FFFF]/20" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex-1 flex items-center gap-8">
              <a href={shopLink} className="hidden md:block text-white hover:text-[#00FFFF] transition-colors">
                Shop
              </a>
            </div>
            <div className="shrink-0 text-center">
              <div
                className="text-xl md:text-2xl tracking-wider px-4 py-1.5 bg-black/85 backdrop-blur-md rounded-full inline-block"
                style={{ fontFamily: "'Space Grotesk',sans-serif" }}
              >
                <span className="text-[#00FFFF]" style={{ textShadow: "0 0 30px rgba(0,255,255,1),0 0 15px rgba(0,255,255,0.8)" }}>hydr</span>
                <span className="text-white" style={{ textShadow: "0 0 15px rgba(255,255,255,0.6)" }}>brew°</span>
              </div>
            </div>
            <div className="flex-1 flex justify-end">
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="text-white p-2.5 hover:text-[#00FFFF] transition-all border-2 border-[#00FFFF]/60 hover:border-[#00FFFF] bg-black/40 backdrop-blur-sm rounded-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:bg-black/60"
                aria-label="Open menu"
              >
                <Menu size={26} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <FuturisticSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        shopLink={shopLink}
      />

      {/* Hero Section */}
      <section
        className="relative w-full overflow-hidden flex items-center justify-center"
        style={{ height: "850px", backgroundColor: "#000000" }}
      >
        {/* Ambient glows */}
        <div className="absolute right-0 top-0 bottom-0 w-[55%] overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/2 right-[18%] -translate-y-1/2 w-[900px] h-[900px]"
            style={{ background: "radial-gradient(ellipse at center,rgba(0,255,255,0.08) 0%,rgba(0,200,220,0.04) 35%,transparent 60%)", filter: "blur(80px)", opacity: 0.6 }}
          />
          <div
            className="absolute top-[45%] right-[22%] w-[700px] h-[700px]"
            style={{ background: "radial-gradient(circle,rgba(120,220,255,0.06) 0%,rgba(80,180,240,0.03) 40%,transparent 65%)", filter: "blur(90px)", opacity: 0.5 }}
          />
        </div>

        <div className="relative z-10 w-full h-full flex items-center">
          {/* Left: text */}
          <div className="absolute left-[5%] md:left-[8%] top-[40%] md:top-1/2 -translate-y-1/2 space-y-4 md:space-y-6 z-20">
            <h1
              className="text-6xl md:text-9xl text-white uppercase"
              style={{ fontFamily: "'Urbanist',sans-serif", fontWeight: 700, lineHeight: 1.0 }}
            >
              COMMAND<br />YOUR<br />DAY.
            </h1>
            <p className="text-xl md:text-3xl text-[#00FFFF]" style={{ fontFamily: "'Roboto Mono',monospace" }}>
              The night stays yours.
            </p>
            <div className="pt-2 md:pt-4">
              <a
                href={shopLink}
                className="inline-flex items-center gap-2 px-8 py-3 md:px-10 md:py-4 bg-[#00FFFF] text-black text-sm md:text-base tracking-wider rounded-full hover:bg-[#00FFFF]/90 transition-all hover:shadow-[0_0_40px_rgba(0,255,255,0.6)] hover:scale-105 font-bold"
                style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700 }}
              >
                INITIALIZE UPTIME
                <span className="hb-hero-arrow" style={{ display: "inline-block" }}>→</span>
              </a>
            </div>
          </div>

          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroBgImage}
              alt="hydrbrew functional iced coffee can on desk"
              className="w-full h-full object-cover object-[60%_40%] md:object-center"
              style={{ filter: "brightness(1.12) contrast(1.18) saturate(1.35) sepia(0.15) hue-rotate(-8deg)" }}
              fetchPriority="high"
              loading="eager"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right,#000000 0%,rgba(0,0,0,0.85) 15%,rgba(0,0,0,0.4) 35%,transparent 50%)", pointerEvents: "none" }}
            />
            <div
              className="absolute inset-0"
              style={{ mixBlendMode: "screen", background: "radial-gradient(ellipse 25% 45% at 72% 50%,rgba(0,255,255,0.12) 0%,transparent 50%)", pointerEvents: "none" }}
            />
            <div
              className="absolute bottom-[8%] right-[18%] w-[280px] h-[180px]"
              style={{ background: "radial-gradient(ellipse 50% 35% at 50% 50%,rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.1) 60%,transparent 80%)", filter: "blur(35px)", opacity: 0.9 }}
            />
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hb-hero-arrow-slide { 0%,100%{transform:translateX(0)} 50%{transform:translateX(6px)} }
        .hb-hero-arrow { animation:hb-hero-arrow-slide 1.5s ease-in-out infinite; }
      `}} />
    </div>
  );
}

export default HbHero;

export const schema = createSchema({
  type: "hb-hero",
  title: "HB Hero",
  settings: [
    {
      group: "Content",
      inputs: [
        { type: "image", name: "heroBgImage", label: "Hero background image" },
        { type: "text", name: "shopLink", label: "Shop link", defaultValue: "/products" },
        { type: "text", name: "discountCode", label: "Discount code", defaultValue: "HYDR15" },
      ],
    },
  ],
  presets: { shopLink: "/products", discountCode: "HYDR15" },
});
