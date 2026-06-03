import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useFetcher } from "react-router";

type ParticleSpec = {
  width: number;
  height: number;
  left: number;
  top: number;
  xDelta: number;
  yDelta: number;
  duration: number;
  delay: number;
};

function generateParticles(
  count: number,
  widthMin: number,
  widthRange: number,
  xRange: number,
  yRange: number,
  durationMin: number,
  durationRange: number,
  delayRange: number,
): ParticleSpec[] {
  return Array.from({ length: count }, () => ({
    width: widthMin + Math.random() * widthRange,
    height: widthMin + Math.random() * widthRange,
    left: Math.random() * 100,
    top: Math.random() * 100,
    xDelta: Math.random() * xRange - xRange / 2,
    yDelta: Math.random() * yRange - yRange / 2,
    duration: durationMin + Math.random() * durationRange,
    delay: Math.random() * delayRange,
  }));
}

interface HbHeroProps extends HydrogenComponentProps {
  heroImage?: string;
  operativeImage?: string;
  productBgImage?: string;
  ctaLink?: string;
}

function HbHero(props: HbHeroProps) {
  const {
    heroImage = "/images/E8Ar62i.webp",
    operativeImage = "/images/1QM0Ftl.webp",
    productBgImage = "/images/neezm7W.webp",
    ctaLink = "/products",
    ...rest
  } = props;

  const [hoveredSide, setHoveredSide] = useState<"product" | "lore" | null>(null);
  const [touchedSide, setTouchedSide] = useState<"product" | "lore" | null>(null);
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);
  const fetcher = useFetcher<{ ok: boolean; error: string }>();
  const isSubmitting = fetcher.state === "submitting";
  const submitSuccess = fetcher.data?.ok === true;

  useEffect(() => setMounted(true), []);

  const largeParticles = useMemo(
    () => (mounted ? generateParticles(8, 60, 80, 100, 100, 15, 10, 5) : []),
    [mounted],
  );
  const mediumParticles = useMemo(
    () => (mounted ? generateParticles(12, 20, 40, 60, 60, 10, 8, 3) : []),
    [mounted],
  );

  const isProductActive = hoveredSide === "product" || touchedSide === "product";

  return (
    <section
      {...rest}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Falling Signal Rivulets */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <motion.div
          className="absolute w-1 rounded-full"
          style={{
            left: "8%",
            height: "60px",
            background: "linear-gradient(to bottom, rgb(232, 121, 249), rgb(0, 255, 255), transparent)",
            boxShadow: "0 0 10px rgba(232, 121, 249, 0.8), 0 0 20px rgba(0, 255, 255, 0.4)",
          }}
          animate={{
            y: ["-100px", "100vh"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ y: { duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 3 }, opacity: { duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 3 } }}
        />
        <motion.div
          className="absolute w-1 rounded-full"
          style={{
            right: "10%",
            height: "70px",
            background: "linear-gradient(to bottom, rgb(0, 255, 255), rgb(232, 121, 249), transparent)",
            boxShadow: "0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(232, 121, 249, 0.4)",
          }}
          animate={{ y: ["-100px", "100vh"], opacity: [0, 1, 1, 0] }}
          transition={{ y: { duration: 7, repeat: Infinity, ease: "linear", delay: 3.5, repeatDelay: 3.5 }, opacity: { duration: 7, repeat: Infinity, ease: "linear", delay: 3.5, repeatDelay: 3.5 } }}
        />
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 z-10">
        <div className={`absolute inset-0 bg-gradient-to-r from-cyan-950/20 to-transparent transition-opacity duration-700 ${isProductActive ? "opacity-100" : "opacity-30"}`} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20">
        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          {/* Noise/Grain Texture Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
            }}
          />

          {/* Ambient Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {largeParticles.map((p, i) => (
              <motion.div
                key={`large-${i}`}
                className="absolute rounded-full bg-cyan-400/20 blur-xl"
                style={{ width: `${p.width}px`, height: `${p.height}px`, left: `${p.left}%`, top: `${p.top}%` }}
                animate={{ x: [0, p.xDelta, 0], y: [0, p.yDelta, 0], opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }}
                transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
              />
            ))}
            {mediumParticles.map((p, i) => (
              <motion.div
                key={`medium-${i}`}
                className="absolute rounded-full blur-md"
                style={{
                  width: `${p.width}px`,
                  height: `${p.height}px`,
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  background: i % 2 === 0
                    ? "radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%)"
                    : "radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)",
                }}
                animate={{ x: [0, p.xDelta, 0], y: [0, p.yDelta, 0], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Hero Background - Right Side */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: "60%",
                  WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 100%)",
                  maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 100%)",
                }}
              >
                <img
                  src={heroImage}
                  alt="The +1 YOU Operative"
                  className="opacity-75 md:opacity-100"
                  loading="eager"
                  decoding="async"
                  width={800}
                  height={1067}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "65% center", filter: "contrast(1.1) brightness(1.05) saturate(1.2)" }}
                />
              </div>
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.9) 100%)" }} />
              <div className="absolute inset-0 bg-black/15" />
              <motion.div
                className="absolute inset-0 mix-blend-screen"
                animate={{ opacity: [0.08, 0.15, 0.08] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)" }}
              />
              <motion.div
                className="absolute inset-0 mix-blend-screen"
                animate={{ opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                style={{ background: "radial-gradient(ellipse at 80% 40%, rgba(0, 255, 255, 0.35) 0%, rgba(6, 182, 212, 0.25) 30%, transparent 60%)" }}
              />
            </div>

            {/* Brand badge */}
            <motion.div
              className="inline-flex items-center gap-3 mb-16 px-8 py-4 border border-cyan-500/40 rounded-full font-mono tracking-wider text-2xl md:text-3xl lg:text-4xl backdrop-blur-sm bg-black/40"
              style={{ color: "#00FFFF", boxShadow: "0 0 30px rgba(34, 211, 238, 0.2), inset 0 0 20px rgba(34, 211, 238, 0.1)" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-2.5 h-2.5 rounded-full bg-[#00ffff]"
                style={{ boxShadow: "0 0 10px rgba(34, 211, 238, 0.8)" }}
              />
              <span className="drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" style={{ fontFamily: "Space Grotesk, system-ui, sans-serif", fontWeight: 600 }}>
                <span style={{ color: "#00FFFF" }}>hydr</span>
                <span className="text-white">brew</span>
                <span className="text-white align-super text-[0.6em]">°</span>
              </span>
            </motion.div>

            {/* Main headline */}
            <div className="relative inline-block mb-12">
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl tracking-tight font-bold md:px-[10vw] text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.span
                  className="block mb-2 pb-2"
                  animate={{
                    backgroundImage: [
                      "linear-gradient(90deg, #FFFFFF 0%, #67E8F9 25%, #FFFFFF 50%, #67E8F9 75%, #FFFFFF 100%)",
                      "linear-gradient(90deg, #67E8F9 0%, #FFFFFF 25%, #67E8F9 50%, #FFFFFF 75%, #67E8F9 100%)",
                      "linear-gradient(90deg, #FFFFFF 0%, #67E8F9 25%, #FFFFFF 50%, #67E8F9 75%, #FFFFFF 100%)",
                    ],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  style={{ backgroundSize: "200% 100%", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent" }}
                >
                  The Afternoon Bypass
                </motion.span>
              </motion.h1>
              {/* Horizontal Scanline */}
              <motion.div
                className="absolute top-0 left-0 w-full h-1 pointer-events-none"
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: [0, "100%"], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.2, times: [0, 0.1, 0.9, 1], ease: "linear", delay: 0.3 }}
              >
                <div className="w-full h-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)]" />
                <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-cyan-400/50 to-transparent blur-sm" />
              </motion.div>
            </div>

            {/* Tagline */}
            <motion.div
              className="relative max-w-3xl mx-auto mb-16 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="text-base md:text-lg text-neutral-200 leading-relaxed mb-3" style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)", letterSpacing: "0.02em" }}>
                <motion.span
                  className="relative font-bold pb-0.5 text-xl md:text-2xl inline-block"
                  animate={{
                    backgroundImage: [
                      "linear-gradient(135deg, #FFFFFF 0%, #D4A574 20%, #FFFFFF 40%, #C8956E 60%, #FFFFFF 80%, #D4A574 100%)",
                      "linear-gradient(135deg, #D4A574 0%, #FFFFFF 20%, #C8956E 40%, #FFFFFF 60%, #D4A574 80%, #FFFFFF 100%)",
                      "linear-gradient(135deg, #FFFFFF 0%, #D4A574 20%, #FFFFFF 40%, #C8956E 60%, #FFFFFF 80%, #D4A574 100%)",
                    ],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ backgroundSize: "200% 200%", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", textShadow: "none" }}
                >
                  Functional Iced Coffee
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    animate={{ x: ["-100%", "200%"], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    style={{ width: "50%", boxShadow: "0 0 10px rgba(34, 211, 238, 0.8), 0 0 20px rgba(34, 211, 238, 0.5)" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-cyan-400/60" />
                </motion.span>{" "}
                engineered to upgrade your baseline.
              </div>
              <p className="text-2xl md:text-3xl lg:text-4xl font-mono text-center" style={{ color: "#00FFFF", textShadow: "0 0 20px rgba(6, 182, 212, 0.6), 0 2px 8px rgba(0, 0, 0, 0.8)", letterSpacing: "0.02em" }}>
                The Night Stays Yours<sup className="text-[0.7em] ml-1">™</sup>
              </p>
            </motion.div>

            {/* Email capture + social proof */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-10 relative"
            >
              <div
                className="flex flex-col md:flex-row md:inline-flex items-center gap-3 md:gap-4 px-4 md:px-7 py-3 md:py-3.5 bg-black/60 rounded-3xl md:rounded-full backdrop-blur-md max-w-full"
                style={{ border: "1px solid rgba(0, 255, 255, 0.3)" }}
              >
                {/* Live indicator + counter */}
                <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-center">
                  <motion.div
                    className="flex items-center gap-1.5 md:gap-2.5 opacity-80"
                    animate={{ opacity: [0.6, 0.8, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full" style={{ backgroundColor: "#00FFFF", boxShadow: "0 0 12px rgba(0, 255, 255, 1), 0 0 20px rgba(0, 255, 255, 0.8)" }} />
                    <span className="text-[9px] md:text-xs font-mono text-neutral-400 tracking-widest">LIVE</span>
                  </motion.div>
                  <div className="w-px h-4 md:h-5 bg-cyan-500/20" />
                  <div className="flex items-center gap-1.5 md:gap-3">
                    <motion.div
                      className="relative"
                      animate={{ boxShadow: ["0 0 6px rgba(34, 211, 238, 0.3)", "0 0 12px rgba(34, 211, 238, 0.5)", "0 0 6px rgba(34, 211, 238, 0.3)"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="relative w-8 h-8 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-900/20 p-[2px]" style={{ border: "1px solid #00FFFF" }}>
                        <div className="w-full h-full rounded-lg overflow-hidden bg-black/80">
                          <img
                            src={operativeImage}
                            alt="Operative"
                            className="w-full h-full object-cover opacity-100"
                            style={{ filter: "grayscale(0%) brightness(1.5) contrast(1.5) saturate(1.1)", transform: "scale(1.6)", objectPosition: "center 30%" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                    <div className="flex items-center gap-1.5 md:gap-2.5">
                      <motion.span
                        className="text-base md:text-xl font-mono text-white font-bold"
                        animate={{ textShadow: ["0 0 10px rgba(34, 211, 238, 0.5)", "0 0 20px rgba(34, 211, 238, 0.8)", "0 0 10px rgba(34, 211, 238, 0.5)"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        1,385
                      </motion.span>
                      <span className="text-[10px] md:text-sm text-neutral-500 hidden sm:inline">Founding Members</span>
                    </div>
                  </div>
                </div>

                <div className="w-px h-5 bg-cyan-500/20 hidden sm:block" />

                {/* Email capture */}
                {submitSuccess ? (
                  <span className="font-mono text-cyan-400 text-sm px-4">ACCESS INITIALIZED ✓</span>
                ) : (
                  <>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@protocol.com"
                      className="w-full md:w-48 lg:w-56 px-3 md:px-4 py-2.5 md:py-2 bg-black/80 rounded-lg text-white placeholder:text-white/60 text-xs transition-all"
                      style={{ border: "2px solid #00FFFF", boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)", outline: "none", fontFamily: "Roboto Mono, monospace" }}
                    />
                    <motion.button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => {
                        if (!email) return;
                        const formData = new FormData();
                        formData.set("email", email);
                        fetcher.submit(formData, { action: "/api/klaviyo", method: "POST", encType: "multipart/form-data" });
                      }}
                      className="relative flex items-center justify-center gap-2 md:gap-3 px-5 md:px-8 py-2.5 md:py-4 rounded-full font-mono transition-all duration-300 overflow-hidden w-full md:w-auto"
                      style={{ backgroundColor: "#00FFFF", color: "#000000", boxShadow: "0 0 30px rgba(0, 255, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.3)", border: "2px solid rgba(255, 255, 255, 0.5)" }}
                      animate={{ scale: [1, 1.03, 1], boxShadow: ["0 0 30px rgba(0, 255, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.4)", "0 0 40px rgba(0, 255, 255, 1), 0 0 80px rgba(0, 255, 255, 0.6)", "0 0 30px rgba(0, 255, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.4)"] }}
                      transition={{ scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }, boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
                      whileHover={{ scale: 1.08, backgroundColor: "#00CCCC" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        animate={{ x: ["-200%", "200%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                      />
                      <span className="relative z-10 text-xs md:text-base tracking-wider font-black uppercase">
                        {isSubmitting ? "..." : "INITIALIZE ACCESS"}
                      </span>
                      <motion.span
                        animate={{ x: [0, 6, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10 text-base md:text-xl font-bold"
                      >
                        →
                      </motion.span>
                    </motion.button>
                  </>
                )}
              </div>

              <motion.div
                className="absolute inset-0 -m-1 rounded-full bg-cyan-500/20 blur-xl -z-10"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>

          {/* Path Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12 max-w-5xl mx-auto relative pt-16 md:pt-20"
          >
            <p className="text-xl md:text-2xl text-neutral-300 font-semibold mb-4">
              Reroute your cognitive energy. Avoid the metabolic tax.
            </p>
            <div className="relative inline-block mb-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-white mb-2 tracking-tight flex flex-wrap items-center justify-center gap-2 md:gap-3">
                <span>Initialize the</span>
                <motion.span
                  className="relative inline-flex items-center gap-2 px-3 md:px-5 py-1.5 rounded-full"
                  style={{ border: "1px solid", borderColor: "rgba(34, 211, 238, 0.5)" }}
                  animate={{ boxShadow: ["0 0 15px rgba(34, 211, 238, 0.2)", "0 0 25px rgba(34, 211, 238, 0.4)", "0 0 15px rgba(34, 211, 238, 0.2)"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.span
                    className="relative text-3xl md:text-4xl lg:text-5xl font-bold"
                    animate={{ textShadow: ["0 0 20px rgba(34, 211, 238, 0.4)", "0 0 40px rgba(34, 211, 238, 0.8)", "0 0 20px rgba(34, 211, 238, 0.4)"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    +1
                  </motion.span>
                  <motion.span className="relative text-2xl md:text-3xl lg:text-4xl" style={{ color: "rgba(0, 255, 255, 1)" }}>
                    You
                  </motion.span>
                </motion.span>
              </h2>
            </div>
          </motion.div>

          {/* Bifurcation CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center max-w-5xl mx-auto"
          >
            <motion.div
              onMouseEnter={() => setHoveredSide("product")}
              onMouseLeave={() => setHoveredSide(null)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="relative group w-full max-w-6xl"
            >
              <div
                className="absolute -inset-0.5 rounded-2xl transition-opacity duration-500"
                style={{ border: "2px solid rgba(0, 255, 255, 0.6)", opacity: isProductActive ? 1 : 0.8, boxShadow: isProductActive ? "0 0 20px rgba(0, 255, 255, 0.6)" : "0 0 15px rgba(0, 255, 255, 0.4)" }}
              />
              <div
                className="relative rounded-2xl p-6 md:p-16 lg:p-20 transition-all duration-500 min-h-[500px] md:min-h-[700px] lg:min-h-[800px] flex flex-col overflow-hidden"
                style={{ border: isProductActive ? "1px solid rgba(0, 255, 255, 0.6)" : "1px solid rgba(0, 255, 255, 0.4)", boxShadow: isProductActive ? "0 0 50px rgba(0, 255, 255, 0.4)" : "0 0 30px rgba(0, 255, 255, 0.2)" }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-90 md:opacity-60"
                  style={{ backgroundImage: `url(${productBgImage})`, backgroundSize: "cover", backgroundPosition: "center center", zIndex: 0 }}
                />
                <div className="flex flex-col items-center justify-start text-center flex-1 pt-8 md:pt-20 pb-6 md:pb-12 relative z-10">
                  <h2 className="text-white font-bold leading-tight max-w-4xl mb-4 md:mb-6 text-3xl md:text-5xl lg:text-6xl" style={{ textShadow: "0 2px 20px rgba(0, 0, 0, 0.9)" }}>
                    Architected for high-frequency output.
                  </h2>
                  <p className="text-white font-light leading-relaxed max-w-3xl opacity-90 md:opacity-70 text-lg md:text-2xl lg:text-3xl" style={{ textShadow: "0 2px 30px rgba(0, 0, 0, 1), 0 0 8px rgba(0, 0, 0, 0.8)" }}>
                    Eliminate the volatility. Own the afternoon.
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isProductActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.4 }}
                  className="mt-auto relative z-10"
                >
                  <a
                    href={ctaLink}
                    className="w-full bg-[#00FFFF] text-black font-bold py-4 md:py-6 rounded-xl transition-all duration-300 shadow-[0_0_40px_rgba(34,211,238,0.6)] hover:shadow-[0_0_60px_rgba(34,211,238,0.9)] flex items-center justify-center gap-2 md:gap-3"
                  >
                    <span className="text-base md:text-lg lg:text-xl tracking-wide">Explore the Bypass</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                    </motion.div>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default HbHero;

export const schema = createSchema({
  type: "hb-hero",
  title: "HB Hero",
  settings: [
    {
      group: "Images",
      inputs: [
        { type: "image", name: "heroImage", label: "Hero background image" },
        { type: "image", name: "operativeImage", label: "Operative portrait image" },
        { type: "image", name: "productBgImage", label: "Product path background image" },
      ],
    },
    {
      group: "Links",
      inputs: [
        { type: "text", name: "ctaLink", label: "CTA link", defaultValue: "/products" },
      ],
    },
  ],
  presets: { ctaLink: "/products" },
});
