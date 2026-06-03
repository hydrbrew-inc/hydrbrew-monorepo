import { useState, useEffect } from "react";
import { Link } from "react-router";

function HbSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems = [
    { label: "SHOP", href: "/products/hydrbrew-pre-order-bundle" },
    { label: "OPTIMIZE", href: "/#quiz" },
    { label: "KNOWLEDGE BASE", href: "/#knowledge-base" },
    { label: "FAQ", href: "/#faq" },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hb-pulse-glow {
          0%,100%{box-shadow:0 0 20px rgba(0,255,255,0.3),inset 0 0 20px rgba(0,255,255,0.1)}
          50%{box-shadow:0 0 40px rgba(0,255,255,0.5),inset 0 0 30px rgba(0,255,255,0.2)}
        }
        .hb-sidebar-glow { animation: hb-pulse-glow 3s ease-in-out infinite; }
      ` }} />
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      )}
      <div className={`fixed top-0 right-0 bottom-0 z-50 w-[400px] max-w-[90vw] transition-transform duration-500 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="h-full relative">
          <div className="absolute inset-0 border-l-2 border-t-2 border-b-2 border-[#00FFFF] hb-sidebar-glow bg-black/30 backdrop-blur-md">
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#00FFFF]" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#00FFFF]" />
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,255,0.1) 2px,rgba(0,255,255,0.1) 4px)" }} />

            <div className="relative h-full flex flex-col p-8">
              <div className="flex items-start justify-between mb-12">
                <div className="font-mono text-[10px] text-[#00FFFF]/60 uppercase tracking-widest">NAVIGATION SYSTEM</div>
                <button onClick={onClose} className="text-[#00FFFF] hover:text-white transition-colors p-2 border border-[#00FFFF]/30 hover:border-[#00FFFF]" aria-label="Close menu">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>

              <div className="mb-16 text-center">
                <h2 className="text-4xl tracking-wider" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                  <span style={{ color: "#00FFFF" }}>hydr</span>
                  <span className="text-white">brew°</span>
                </h2>
                <div className="mt-2 font-mono text-[8px] text-[#00FFFF]/50 uppercase tracking-widest">Defeating Afternoon Systemic Debt</div>
              </div>

              <div className="flex-1 flex flex-col justify-center items-start gap-6 px-8">
                {menuItems.map((item) => (
                  <div key={item.label} className="relative w-full" onMouseEnter={() => setHoveredItem(item.label)} onMouseLeave={() => setHoveredItem(null)}>
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className="block text-2xl text-white/70 hover:text-[#00FFFF] transition-all duration-300 tracking-wider py-6 px-4 border-l-2 border-[#00FFFF]/20 hover:border-[#00FFFF] hover:translate-x-2"
                      style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600 }}
                    >
                      {item.label}
                    </Link>
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

export function HbHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-[#00FFFF]/20" style={{ background: "linear-gradient(to right,rgba(0,255,255,0.1),rgba(0,255,255,0.1))" }}>
        <div className="container mx-auto px-4 py-2 text-center cursor-pointer group transition-all hover:bg-[#00FFFF]/20">
          <p className="text-sm text-[#00FFFF] group-hover:text-white transition-colors px-4 py-1 bg-black/80 backdrop-blur-sm rounded-full inline-block" style={{ textShadow: "0 0 10px rgba(0,255,255,0.5)" }}>
            SAVE 15% on first order – Use code{" "}
            <span className="font-bold px-2 py-1 rounded-full group-hover:bg-[#00FFFF] group-hover:text-black group-hover:scale-110 inline-block transition-all duration-300 border border-[#00FFFF]/50" style={{ backgroundColor: "rgba(0,255,255,0.3)" }}>
              HYDR15
            </span>
          </p>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`fixed top-10 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? "bg-black/90 backdrop-blur-xl border-b border-[#00FFFF]/20" : "bg-transparent"}`}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            {/* Left Nav */}
            <div className="flex-1 flex items-center gap-8">
              <Link to="/products/hydrbrew-pre-order-bundle" className="hidden md:block text-white hover:text-[#00FFFF] transition-colors" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                Shop
              </Link>
            </div>

            {/* Logo */}
            <div className="shrink-0 text-center">
              <Link to="/">
                <div className="text-xl md:text-2xl tracking-wider px-4 py-1.5 bg-black/85 backdrop-blur-md rounded-full inline-block" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                  <span style={{ color: "#00FFFF", textShadow: "0 0 30px rgba(0,255,255,1),0 0 15px rgba(0,255,255,0.8)" }}>hydr</span>
                  <span className="text-white" style={{ textShadow: "0 0 15px rgba(255,255,255,0.6)" }}>brew°</span>
                </div>
              </Link>
            </div>

            {/* Menu Button */}
            <div className="flex-1 flex justify-end">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="text-white p-2.5 hover:text-[#00FFFF] transition-all border-2 border-[#00FFFF]/60 hover:border-[#00FFFF] bg-black/40 backdrop-blur-sm rounded-lg"
                style={{ boxShadow: "none" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(0,255,255,0.4)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                aria-label="Open menu"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <HbSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
