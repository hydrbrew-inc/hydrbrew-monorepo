import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { useFetcher } from "react-router";

interface HbProductProps extends HydrogenComponentProps {
  canImage?: string;
  lifestyleImage?: string;
  preOrderLink?: string;
}

function HbProduct(props: HbProductProps) {
  const {
    canImage = "/images/XrNhE2G.webp",
    lifestyleImage = "/images/krNGOh7.webp",
    preOrderLink = "/products",
    ...rest
  } = props;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTagIndex, setActiveTagIndex] = useState(0);
  const [isResearchExpanded, setIsResearchExpanded] = useState(false);
  const [evolutionEmail, setEvolutionEmail] = useState("");
  const fetcher = useFetcher<{ ok: boolean; error: string }>();
  const isEvolutionSubmitting = fetcher.state === "submitting";
  const submitSuccess = fetcher.data?.ok === true;

  const tasteProfiles = ["Light", "Crisp", "Smooth", "Refreshing"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTagIndex((prev) => (prev + 1) % tasteProfiles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const tasteData = [
    { label: "LIGHT", sub: "[LOW-VISCOSITY]" },
    { label: "CRISP", sub: "[ALKALINE BUFFER]" },
    { label: "SMOOTH", sub: "[LOW-ACIDITY]" },
    { label: "REFRESHING", sub: "[CLEAN SUBSTRATE]" },
  ];

  const hudNodes = [
    { side: "left", top: "20%", label: "LION'S MANE", sub: "NEURAL CLARITY", delay: 0.8 },
    { side: "left", top: "50%", label: "GLYCEMIC LOAD", sub: "LOW", delay: 0.9, centered: true },
    { side: "right", top: "20%", label: "L-THEANINE", sub: "FLOW STATE", delay: 0.8, flip: true },
    { side: "right", top: "50%", label: "ELECTROLYTES", sub: "HYDRATION SUPPORT", delay: 0.9, flip: true, centered: true },
    { side: "left", bottom: "20%", label: "RITUAL", sub: "COFFEE CUE", delay: 1.0 },
    { side: "right", bottom: "20%", label: "CALORIE COUNT", sub: "Only 20 Calories", delay: 1.0, flip: true },
  ];

  return (
    <section
      ref={ref}
      {...rest}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: "#05070A" }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="px-4 py-1.5 border border-cyan-500/30 rounded-full text-xs font-mono tracking-wider" style={{ color: "#00FFFF" }}>
              THE PRODUCT
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white">
            Functional<br className="md:hidden" /> Iced Coffee.
            <br />
            <span className="inline-flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-2">
              <span>Zero Compromise.</span>
              <motion.span
                className="relative inline-flex items-center gap-2 px-3 md:px-4 py-1.5 bg-gradient-to-r from-cyan-500/20 via-cyan-500/10 to-cyan-500/20 border border-cyan-400/50 rounded-full ml-1 md:ml-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="relative text-3xl md:text-4xl lg:text-5xl font-bold"
                  animate={{ textShadow: ["0 0 20px rgba(34, 211, 238, 0.4)", "0 0 40px rgba(34, 211, 238, 0.8)", "0 0 20px rgba(34, 211, 238, 0.4)"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  +1
                </motion.span>
                <span className="relative text-2xl md:text-3xl lg:text-4xl" style={{ color: "#00FFFF" }}>You</span>
              </motion.span>
            </span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 mb-16 leading-relaxed max-w-3xl mx-auto">
            Engineered as a performance beverage to own the afternoon window.
          </p>
        </motion.div>

        {/* Blueprint Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-7xl mx-auto mb-16 rounded-2xl overflow-hidden border border-cyan-500/20"
          style={{ backgroundColor: "#050505" }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 opacity-[0.12]">
            <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="topo-grid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#00FFFF" strokeWidth="0.8" />
                </pattern>
                <radialGradient id="grid-fade" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.2" />
                </radialGradient>
              </defs>
              {[550, 450, 350, 250].map((rx, i) => (
                <ellipse key={i} cx="600" cy="400" rx={rx} ry={rx * 0.636} fill="none" stroke="url(#grid-fade)" strokeWidth="1.5" opacity={0.4 + i * 0.1} />
              ))}
              <rect width="1200" height="800" fill="url(#topo-grid)" opacity="0.7" />
            </svg>
          </div>

          {/* Scanning laser */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent 0%, rgba(0, 255, 255, 0.15) 50%, transparent 100%)", width: "100%" }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          <div className="relative pt-2 pb-8 md:pb-16 px-4 md:px-8 lg:px-16">
            <div className="relative flex items-start justify-center">
              {/* Can */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex flex-col items-center gap-4 md:gap-8"
              >
                <img src={canImage} alt="hydrbrew can" className="w-[350px] sm:w-[500px] md:w-[650px] lg:w-[800px] h-auto object-contain" />

                {/* Flow State Meter */}
                <div className="w-full max-w-[350px] sm:max-w-[500px] md:max-w-[700px] flex flex-col items-center gap-2 md:gap-4 px-2">
                  <div className="text-xs sm:text-sm md:text-base font-mono tracking-wider font-bold" style={{ color: "#00FFFF", textShadow: "0 0 10px rgba(0, 255, 255, 0.6)" }}>
                    FLOW STATE METER
                  </div>
                  <div className="w-full h-6 md:h-8 bg-black/60 rounded-lg overflow-hidden relative" style={{ border: "2px solid rgba(0, 255, 255, 0.5)", boxShadow: "0 0 30px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.8)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: ["0%", "75%"] } : {}}
                      transition={{ duration: 8, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" }}
                      className="h-full relative"
                      style={{ background: "linear-gradient(to right, #00FFFF, #06b6d4, #00FFFF)", boxShadow: "0 0 30px rgba(0, 255, 255, 0.8)" }}
                    >
                      <motion.div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)", width: "40%" }}
                        animate={{ x: ["-40%", "140%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                    <div className="absolute right-[25%] top-1/2 -translate-y-1/2 w-0.5 md:w-1 h-8 md:h-10" style={{ backgroundColor: "#00FFFF", boxShadow: "0 0 10px rgba(0, 255, 255, 0.8)" }} />
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-bold" style={{ color: "rgba(0, 255, 255, 0.8)" }}>75% OPTIMAL PERFORMANCE</div>
                </div>
              </motion.div>

              {/* HUD Nodes */}
              {hudNodes.map((node, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: node.delay }}
                  className={`absolute ${node.side === "left" ? "left-[2%] md:left-[10%]" : "right-[5%] md:right-[10%]"}`}
                  style={node.bottom ? { bottom: node.bottom } : { top: node.top, ...(node.centered ? { transform: "translateY(-50%)" } : {}) }}
                >
                  <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                    {!node.flip && (
                      <div className="text-right">
                        <div className="text-[10px] sm:text-xs md:text-base font-mono font-bold" style={{ color: "#00FFFF" }}>{node.label}</div>
                        <div className="text-[9px] sm:text-[10px] md:text-xs font-mono" style={{ color: "rgba(0, 255, 255, 0.6)" }}>{node.sub}</div>
                      </div>
                    )}
                    <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full" style={{ backgroundColor: "#00FFFF", boxShadow: "0 0 20px rgba(0, 255, 255, 1), 0 0 40px rgba(0, 255, 255, 0.6)" }} />
                    {node.flip && (
                      <div className="text-left">
                        <div className="text-[10px] sm:text-xs md:text-base font-mono font-bold" style={{ color: "#00FFFF" }}>{node.label}</div>
                        <div className="text-[9px] sm:text-[10px] md:text-xs font-mono" style={{ color: "rgba(0, 255, 255, 0.6)" }}>{node.sub}</div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pre-order CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col items-center gap-3 mb-16"
        >
          <a
            href={preOrderLink}
            className="px-12 py-4 text-black font-bold text-lg rounded-md transition-colors duration-200 inline-block"
            style={{ backgroundColor: "#00FFFF" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#00CCCC")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#00FFFF")}
          >
            CLAIM PRE-SALE DISCOUNT
          </a>
          <p className="text-sm text-neutral-400 font-mono">Limited first-run production.</p>
        </motion.div>

        {/* Taste profile */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="relative p-6"
            style={{
              background: "linear-gradient(to bottom right, rgba(0, 255, 255, 0.05), rgba(0, 0, 0, 0.4), rgba(0, 255, 255, 0.05))",
              border: "1px solid rgba(0, 255, 255, 0.3)",
              boxShadow: "0 0 20px rgba(0, 255, 255, 0.1), inset 0 0 30px rgba(0, 255, 255, 0.05)",
            }}
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-500/70" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-500/70" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan-500/70" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-500/70" />

            <div className="text-sm font-bold mb-4" style={{ color: "#00FFFF" }}>Taste Profile</div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
              {tasteData.map((t, i) => (
                <motion.div
                  key={t.label}
                  animate={{ backgroundColor: activeTagIndex === i ? "rgba(0, 255, 255, 0.2)" : "rgba(0, 0, 0, 0)" }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center py-3"
                  style={{ borderRight: i < 3 ? "1px solid rgba(0, 255, 255, 0.4)" : undefined }}
                >
                  <motion.div
                    animate={{ color: activeTagIndex === i ? "rgba(0, 255, 255, 1)" : "rgba(0, 255, 255, 0.8)" }}
                    transition={{ duration: 0.4 }}
                    className="font-mono font-bold mb-1"
                    style={{ fontFamily: "Roboto Mono, monospace", fontSize: "14px" }}
                  >
                    {t.label}
                  </motion.div>
                  <div style={{ fontFamily: "Source Sans Pro, sans-serif", fontSize: "11px", fontWeight: 600, color: activeTagIndex === i ? "rgba(200, 200, 200, 1)" : "rgba(150, 150, 150, 1)" }}>
                    {t.sub}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Lifestyle image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-12 mb-12 relative rounded-2xl overflow-hidden group cursor-pointer w-full"
            style={{ height: "400px" }}
          >
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${lifestyleImage})`, filter: "brightness(0.95) contrast(1.05) saturate(1.1)" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 120px 20px rgba(0, 0, 0, 0.4)" }} />
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="absolute top-6 left-6 flex items-center gap-3"
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                animate={{ backgroundColor: ["#FFFFFF", "#000000", "#FFFFFF"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="font-mono text-black text-sm tracking-wider font-semibold">2:15 PM</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="absolute bottom-6 left-6 right-6"
            >
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-2" style={{ textShadow: "0 2px 20px rgba(0, 0, 0, 0.9)" }}>The Afternoon in Action</div>
                  <div className="text-sm md:text-base font-mono tracking-wide" style={{ color: "#00FFFF" }}>Total stability. Zero latency. All clarity.</div>
                </div>
                <motion.div
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md border border-cyan-500/30 rounded-full"
                  animate={{ boxShadow: ["0 0 10px rgba(34, 211, 238, 0.2)", "0 0 20px rgba(34, 211, 238, 0.4)", "0 0 10px rgba(34, 211, 238, 0.2)"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="font-mono text-xs tracking-wider" style={{ color: "#00FFFF" }}>hydrbrew°</span>
                </motion.div>
              </div>
            </motion.div>
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-cyan-500/40 opacity-60" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-cyan-500/40 opacity-60" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-cyan-500/40 opacity-60" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-cyan-500/40 opacity-60" />
          </motion.div>

          {/* Research accordion */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-6 bg-black/20 rounded-lg overflow-hidden backdrop-blur-sm"
            style={{ border: "1px solid rgba(0, 255, 255, 0.1)" }}
          >
            <button
              type="button"
              onClick={() => setIsResearchExpanded(!isResearchExpanded)}
              className="w-full flex items-center gap-2 px-4 py-3 transition-colors"
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "rgba(0, 255, 255, 0.05)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "rgba(0, 255, 255, 0.6)" }} />
              <span className="text-xs md:text-sm font-mono tracking-wider" style={{ color: "rgba(0, 255, 255, 0.7)" }}>RESEARCH.md</span>
              <span className="text-[10px] md:text-xs font-mono text-neutral-700 ml-auto mr-2">[3]</span>
              <motion.svg
                animate={{ rotate: isResearchExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-4 h-4 md:w-5 md:h-5"
                style={{ color: "rgba(0, 255, 255, 0.5)" }}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>
            <motion.div
              initial={false}
              animate={{ height: isResearchExpanded ? "auto" : 0, opacity: isResearchExpanded ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-3 pb-3" style={{ borderTop: "1px solid rgba(0, 255, 255, 0.1)" }}>
                <div className="space-y-2.5 mt-3">
                  {[
                    { num: "01", label: "Low Sugar —", text: "Sugar-sweetened beverage reduction studies", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9964017/", code: "PMC9964017" },
                    { num: "02", label: "L-Theanine + Caffeine —", text: "Cognitive performance and alertness synergy", url: "https://www.researchgate.net/publication/47643925_The_combination_of_L-theanine_and_caffeine_improves_cognitive_performance_and_increases_subjective_alertness", code: "ResearchGate" },
                    { num: "03", label: "Lion's Mane —", text: "Neuroprotective and cognitive enhancement effects", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10675414/", code: "PMC10675414" },
                  ].map((r) => (
                    <div key={r.num} className="flex items-start gap-2 text-xs md:text-sm font-mono">
                      <span className="text-neutral-600 select-none flex-shrink-0">[{r.num}]</span>
                      <div className="flex-1">
                        <span className="text-neutral-500">{r.label}</span>{" "}
                        <a href={r.url} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted" style={{ color: "rgba(0, 255, 255, 0.6)" }}>
                          {r.text}
                        </a>
                        <span className="text-neutral-700 ml-1 text-[10px] md:text-xs">{r.code}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-2" style={{ borderTop: "1px solid rgba(0, 255, 255, 0.1)" }}>
                  <p className="text-xs md:text-sm font-mono text-neutral-500 leading-relaxed">
                    All formulation claims calibrated against peer-reviewed research. hydrbrew° is designed for baseline optimization, not medical intervention.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Email capture */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-8 md:mt-16 mb-4 max-w-3xl mx-auto px-4 md:px-6 py-4 md:py-6 bg-black/40 rounded-lg"
            id="email-capture"
            style={{ border: "1px solid rgba(0, 255, 255, 0.2)", boxShadow: "0 0 30px rgba(0, 255, 255, 0.1)" }}
          >
            <div className="font-mono mb-3 md:mb-4 text-xs md:text-sm" style={{ fontFamily: "Roboto Mono, monospace", color: "#00FFFF", textShadow: "0 0 10px rgba(0, 255, 255, 0.6)" }}>
              // INITIALIZE YOUR EVOLUTION
            </div>
            {submitSuccess ? (
              <div className="text-cyan-400 font-mono text-center py-4">ACCESS INITIALIZED ✓ Check your inbox.</div>
            ) : (
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3">
                <input
                  type="email"
                  value={evolutionEmail}
                  onChange={(e) => setEvolutionEmail(e.target.value)}
                  disabled={isEvolutionSubmitting}
                  placeholder="your_email@protocol.com"
                  className="flex-1 px-3 md:px-4 py-2.5 md:py-3 bg-neutral-800/80 rounded-lg text-white placeholder:text-neutral-400 transition-all text-sm"
                  style={{ fontFamily: "Roboto Mono, monospace", border: "2px solid rgba(0, 255, 255, 0.4)", outline: "none" }}
                />
                <button
                  type="button"
                  disabled={isEvolutionSubmitting}
                  onClick={() => {
                    if (!evolutionEmail) return;
                    const formData = new FormData();
                    formData.set("email", evolutionEmail);
                    fetcher.submit(formData, { action: "/api/klaviyo", method: "POST", encType: "multipart/form-data" });
                  }}
                  className="flex-1 md:flex-none px-4 md:px-6 py-2.5 md:py-3 text-black rounded-lg font-mono transition-colors text-xs md:text-sm"
                  style={{ fontWeight: 600, backgroundColor: "#00FFFF", boxShadow: "0 0 20px rgba(0, 255, 255, 0.6)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#00CCCC")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#00FFFF")}
                >
                  {isEvolutionSubmitting ? "SUBMITTING..." : "INITIALIZE"}
                </button>
                <div className="hidden md:flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#00FFFF" }}
                    animate={{ opacity: [0.4, 1, 0.4], boxShadow: ["0 0 8px rgba(0, 255, 255, 0.6)", "0 0 16px rgba(0, 255, 255, 1)", "0 0 8px rgba(0, 255, 255, 0.6)"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="font-mono whitespace-nowrap" style={{ fontFamily: "Roboto Mono, monospace", fontSize: "11px", opacity: 0.8, color: "#00FFFF" }}>LIVE_UPLINK</span>
                </div>
              </div>
            )}
          </motion.div>
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
    {
      group: "Images",
      inputs: [
        { type: "image", name: "canImage", label: "Can image" },
        { type: "image", name: "lifestyleImage", label: "Lifestyle image" },
      ],
    },
    {
      group: "Links",
      inputs: [
        { type: "text", name: "preOrderLink", label: "Pre-order link", defaultValue: "/products" },
      ],
    },
  ],
  presets: { preOrderLink: "/products" },
});
