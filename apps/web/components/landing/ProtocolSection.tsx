import { motion, AnimatePresence } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import {
  Activity,
  Brain,
  Droplet,
  Zap,
  Heart,
  Sparkles,
  Plus,
  Minus,
} from "lucide-react";

export function ProtocolSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleCard = (name: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(name)) {
        newSet.delete(name);
      } else {
        newSet.add(name);
      }
      return newSet;
    });
  };

  const precursors = [
    {
      icon: Brain,
      name: "L-Theanine",
      dose: "200mg",
      role: "Smooth activation",
      description:
        "Delivers 200mg of high-purity (+95%) L-Theanine, an amino acid that human studies indicate can promote increased alpha brain wave activity linked to relaxed alertness and help modulate responses to daily stressors.",
    },
    {
      icon: Droplet,
      name: "Lion's Mane",
      dose: "200mg",
      role: "Neurogenesis catalyst",
      description:
        "8:1 Lion's Mane extract—used in studies exploring potential cognitive and mood support in adults.",
    },
    {
      icon: Activity,
      name: "Caffeine",
      dose: "85mg",
      role: "Clean energy substrate",
      description:
        "85mg Precision-Dosed Coffee Extract: A stabilized caffeine signal engineered to bypass the anxiety-cascade of traditional brews. Optimized for the 2-4PM performance window.",
    },
    {
      icon: Sparkles,
      name: "Hydration Layer",
      dose: "255mg",
      role: "Cellular hydration",
      description:
        "A balanced matrix of Sodium, Potassium, and Magnesium. Replenishes cellular hydration while you focus. Lightness, not heaviness.",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 bg-neutral-950 relative overflow-visible"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6 relative">
            {/* Floating Optimized Human Visual #3 - positioned above on mobile, to the right on desktop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
              className="absolute -top-20 left-1/2 -translate-x-1/2 md:top-8 md:right-8 md:left-auto md:translate-x-0 lg:left-[calc(50%+200px)] lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 pointer-events-none"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotateZ: [0, 1, 0, -1, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative inline-block"
              >
                {/* Glowing rings around image */}
                <motion.div
                  className="absolute -inset-4 rounded-full border-2 border-cyan-400/30 blur-sm"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    boxShadow: "0 0 40px rgba(34, 211, 238, 0.4)",
                  }}
                />

                {/* Image container with cyberpunk frame */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-cyan-500/50 shadow-[0_0_40px_rgba(34,211,238,0.6)]">
                  <img
                    src="/images/MIapoa8.webp"
                    alt="Optimized Human"
                    className="w-full h-full object-cover object-[60%_center]"
                  />
                  {/* Scanline effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
                    animate={{
                      y: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>

                {/* +1 Badge overlay */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.8,
                    type: "spring",
                    bounce: 0.5,
                  }}
                  className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 rounded-full p-2 border-2 border-black"
                  style={{
                    background:
                      "linear-gradient(to bottom right, #00FFFF, #00CCCC)",
                    boxShadow: "0 0 20px rgba(0, 255, 255, 0.8)",
                  }}
                >
                  <span className="text-black font-bold text-sm">+1</span>
                </motion.div>

                {/* Particle effects */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                    style={{
                      top: "50%",
                      left: "50%",
                    }}
                    animate={{
                      x: [0, Math.cos((i / 8) * Math.PI * 2) * 60],
                      y: [0, Math.sin((i / 8) * Math.PI * 2) * 60],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            <div
              className="px-4 py-1.5 border border-cyan-500/30 rounded-full text-xs font-mono tracking-wider"
              style={{ color: "#00FFFF" }}
            >
              THE PRECURSOR MODEL
            </div>

            {/* Contextual Neural Briefing Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.3, delay: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
                // Dispatch event to open neural briefing with precursor model briefing
                window.dispatchEvent(
                  new CustomEvent("openNeuralBriefing", {
                    detail: { briefingId: "precursorModel" },
                  }),
                );
              }}
              onMouseEnter={() => {
                // Dispatch custom event to trigger Neural Briefing attention with specific briefing
                window.dispatchEvent(
                  new CustomEvent("neuralBriefingTrigger", {
                    detail: { active: true, briefingId: "precursorModel" },
                  }),
                );
              }}
              onMouseLeave={() => {
                // Dispatch custom event to stop Neural Briefing attention
                window.dispatchEvent(
                  new CustomEvent("neuralBriefingTrigger", {
                    detail: { active: false, briefingId: "precursorModel" },
                  }),
                );
              }}
              onTouchStart={() => {
                // Trigger neural briefing attention on mobile touch
                window.dispatchEvent(
                  new CustomEvent("neuralBriefingTrigger", {
                    detail: { active: true, briefingId: "precursorModel" },
                  }),
                );
              }}
              className="group/briefing flex items-center gap-2 px-3 py-2 bg-black/90 border border-red-400/50 hover:border-red-400 rounded-lg backdrop-blur-sm transition-all hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]"
            >
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-0.5 bg-red-400 rounded-full"
                    style={{
                      height: `${8 + i * 2}px`,
                      animation: `wave-pulse 0.8s ease-in-out infinite`,
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                ))}
              </div>
              <span className="text-[10px] font-mono text-red-400 tracking-wider">
                INTEL
              </span>
            </motion.button>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white relative z-20">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Six clinical-grade compounds. One precise protocol.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {precursors.map((precursor, index) => {
            const isExpanded = expandedCards.has(precursor.name);

            return (
              <motion.div
                key={precursor.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative group"
              >
                {/* Hover glow - soft diffused cyan from behind */}
                <div className="absolute -inset-1 bg-cyan-400/0 group-hover:bg-cyan-400/20 rounded-xl blur-xl transition-all duration-500" />

                <motion.div
                  className="relative rounded-xl p-5 flex flex-col cursor-pointer overflow-hidden"
                  onClick={() => toggleCard(precursor.name)}
                  style={{
                    backgroundColor: "rgba(15, 15, 15, 0.85)",
                    backdropFilter: "blur(10px)",
                  }}
                  animate={isExpanded ? { height: "auto" } : {}}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {/* Static Background Image - Low opacity */}
                  <div className="absolute inset-0 pointer-events-none opacity-20 md:opacity-30">
                    {precursor.name === "Caffeine" && (
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            "url(/images/p4iy3vq.webp)",
                          filter: "brightness(1.3) contrast(0.9)",
                        }}
                      />
                    )}
                    {precursor.name === "L-Theanine" && (
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            "url(/images/5oFWKa4.webp)",
                          filter: "brightness(2.5) contrast(0.9)",
                          opacity: 1,
                        }}
                      />
                    )}
                    {precursor.name === "Lion's Mane" && (
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            "url(/images/1QM0Ftl.webp)",
                          filter: "brightness(1.3) contrast(0.9)",
                        }}
                      />
                    )}
                    {precursor.name === "Hydration Layer" && (
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            "url(/images/uARXRtG.webp)",
                          filter: "brightness(1.3) contrast(0.9)",
                        }}
                      />
                    )}
                  </div>

                  {/* Background Image - Only when expanded */}
                  <AnimatePresence>
                    {isExpanded && (
                      <>
                        {precursor.name === "Caffeine" && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 pointer-events-none"
                          >
                            <div
                              className="absolute inset-0 bg-cover bg-center opacity-40 md:opacity-50"
                              style={{
                                backgroundImage:
                                  "url(/images/p4iy3vq.webp)",
                                filter: "brightness(1.3) contrast(0.9)",
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-[#0a0a0a]/70 to-[#0a0a0a]/90" />
                          </motion.div>
                        )}

                        {precursor.name === "L-Theanine" && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 pointer-events-none"
                          >
                            <div
                              className="absolute inset-0 bg-cover bg-center opacity-40 md:opacity-50"
                              style={{
                                backgroundImage:
                                  "url(/images/5oFWKa4.webp)",
                                filter: "brightness(2.5) contrast(0.9)",
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-[#0a0a0a]/70 to-[#0a0a0a]/90" />
                          </motion.div>
                        )}

                        {precursor.name === "Lion's Mane" && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 pointer-events-none"
                          >
                            <div
                              className="absolute inset-0 bg-cover bg-center opacity-40 md:opacity-50"
                              style={{
                                backgroundImage:
                                  "url(/images/1QM0Ftl.webp)",
                                filter: "brightness(1.3) contrast(0.9)",
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-[#0a0a0a]/70 to-[#0a0a0a]/90" />
                          </motion.div>
                        )}

                        {precursor.name === "Hydration Layer" && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 pointer-events-none"
                          >
                            <div
                              className="absolute inset-0 bg-cover bg-center opacity-40 md:opacity-50"
                              style={{
                                backgroundImage:
                                  "url(/images/uARXRtG.webp)",
                                filter: "brightness(1.3) contrast(0.9)",
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-[#0a0a0a]/70 to-[#0a0a0a]/90" />
                          </motion.div>
                        )}
                      </>
                    )}
                  </AnimatePresence>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Top-aligned stroke icon */}
                    <div className="mb-4">
                      <precursor.icon
                        className="w-8 h-8 text-cyan-400"
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Category badge */}
                    <div className="mb-3">
                      {(precursor.name === "Caffeine" ||
                        precursor.name === "L-Theanine") && (
                        <div className="inline-block px-2 py-0.5 border border-orange-400/60 rounded bg-orange-400/5">
                          <span
                            className="text-[14px] md:text-[9px] font-mono text-orange-200 tracking-widest font-bold"
                            style={{
                              textShadow: "0 0 8px rgba(251, 146, 60, 0.4)",
                            }}
                          >
                            [ ENERGY ]
                          </span>
                        </div>
                      )}
                      {precursor.name === "Lion's Mane" && (
                        <div className="inline-block px-2 py-0.5 border border-purple-400/60 rounded bg-purple-400/5">
                          <span
                            className="text-[14px] md:text-[9px] font-mono text-purple-200 tracking-widest font-bold"
                            style={{
                              textShadow: "0 0 8px rgba(192, 132, 252, 0.4)",
                            }}
                          >
                            [ COGNITION ]
                          </span>
                        </div>
                      )}
                      {precursor.name === "Hydration Layer" && (
                        <div className="inline-block px-2 py-0.5 border border-emerald-400/60 rounded bg-emerald-400/5">
                          <span
                            className="text-[14px] md:text-[9px] font-mono text-emerald-200 tracking-widest font-bold"
                            style={{
                              textShadow: "0 0 8px rgba(52, 211, 153, 0.4)",
                            }}
                          >
                            [ RECOVERY ]
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Iconic title - large, bold, all-caps, Space Grotesk */}
                    <h3
                      className="text-2xl font-bold text-white uppercase mb-3"
                      style={{
                        fontFamily: "Space Grotesk, system-ui, sans-serif",
                        letterSpacing: "2px",
                        lineHeight: "1.2",
                      }}
                    >
                      {precursor.name}
                    </h3>

                    {/* Dosage - muted gray */}
                    <div className="text-[18px] md:text-sm text-white font-mono mb-4">
                      {precursor.dose}
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Role label - small monospaced */}
                          <div className="mb-3">
                            <p className="text-[10px] text-cyan-400 font-mono tracking-wide">
                              // {precursor.role.toUpperCase()}
                            </p>
                          </div>

                          {/* Bio-availability progress bar */}
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[9px] font-mono text-neutral-500 tracking-wide">
                                BIO-AVAILABILITY
                              </span>
                              <span className="text-[9px] font-mono text-cyan-400">
                                {precursor.name === "Caffeine"
                                  ? "95%"
                                  : precursor.name === "L-Theanine"
                                    ? "98%"
                                    : precursor.name === "Lion's Mane"
                                      ? "87%"
                                      : "92%"}
                              </span>
                            </div>
                            <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-cyan-400 to-cyan-300"
                                initial={{ width: 0 }}
                                animate={{
                                  width:
                                    precursor.name === "Caffeine"
                                      ? "95%"
                                      : precursor.name === "L-Theanine"
                                        ? "98%"
                                        : precursor.name === "Lion's Mane"
                                          ? "87%"
                                          : "92%",
                                }}
                                transition={{
                                  duration: 1,
                                  delay: 0.2,
                                  ease: "easeOut",
                                }}
                              />
                            </div>
                          </div>

                          {/* Description - clean sans-serif */}
                          <p
                            className="text-sm text-neutral-400 leading-relaxed"
                            style={{
                              fontFamily: "Inter, Helvetica, sans-serif",
                            }}
                          >
                            {precursor.name === "Caffeine" ? (
                              <>
                                85mg Precision-Dosed Coffee Extract. A
                                stabilized signal designed to bypass the
                                anxiety-cascade. Optimized for the{" "}
                                <span className="text-cyan-400">
                                  2–4 PM performance window.
                                </span>
                              </>
                            ) : precursor.name === "L-Theanine" ? (
                              <>
                                200mg of high-purity L-Theanine. Engineered to
                                eliminate the jitter and promote relaxed
                                alertness. The 'safety switch' for your energy.
                              </>
                            ) : precursor.name === "Lion's Mane" ? (
                              <>
                                8:1 Dual-Extract. Supports the neural pathways
                                required for deep work and complex
                                problem-solving. No fog, just flow.
                              </>
                            ) : (
                              precursor.description
                            )}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Expand glyph - minimalist [+] in corner */}
                    <div className="absolute top-4 right-4 text-cyan-400/40 text-lg font-mono">
                      {isExpanded ? "[^]" : "[+]"}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Formula visualization with background image */}
        <div className="relative mt-16 h-[600px] md:h-[80vh] lg:h-[100vh]">
          {/* Background image layer - spans formula + badges with extended height */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="relative w-full h-full"
            >
              {/* The actual image */}
              <img
                src="/images/r4yd2z5.webp"
                alt="Formula background"
                className="w-full h-full object-cover object-[50%_50%] md:object-[50%_65%]"
                style={{
                  filter: "brightness(1.15) contrast(1.1) saturate(1.2)",
                }}
              />

              {/* Left-side black gradient for text readability */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, transparent 50%)",
                }}
              />

              {/* Bright cyan/white overlay for optimism and clarity */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(34, 211, 238, 0.25), rgba(56, 189, 248, 0.2))",
                  mixBlendMode: "overlay",
                }}
              />

              {/* Enhanced cyan glow for vibrancy */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, rgba(34, 211, 238, 0.4), rgba(56, 189, 248, 0.15) 50%, transparent 80%)",
                  mixBlendMode: "screen",
                }}
              />

              {/* Subtle white lift for clarity */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 50%, rgba(0, 0, 0, 0.1) 100%)",
                }}
              />

              {/* Animated scan lines */}
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 211, 238, 0.1) 2px, rgba(34, 211, 238, 0.1) 4px)",
                }}
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Timestamp - Top Right */}
              <div className="hidden md:block absolute top-6 right-6 z-30">
                <span className="text-white font-mono text-sm tracking-wider font-semibold">
                  6:15 PM
                </span>
              </div>

              {/* Glowing border effect */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  boxShadow:
                    "inset 0 0 60px rgba(34, 211, 238, 0.2), inset 0 0 100px rgba(34, 211, 238, 0.1)",
                }}
              />

              {/* TOP-LEFT: Main Headline */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute top-8 md:top-40 left-4 md:left-12 max-w-xs md:max-w-xl"
              >
                <div className="relative px-2 py-2 md:px-4 md:py-3">
                  <h3
                    className="text-white leading-tight text-2xl md:text-5xl"
                    style={{
                      fontWeight: 600,
                      textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    Molecularly calibrated for sustained uptime.
                  </h3>
                </div>
              </motion.div>

              {/* BOTTOM-RIGHT: Secondary Headline */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute bottom-4 md:bottom-12 right-4 md:right-12 max-w-xs md:max-w-lg"
              >
                <div className="relative px-2 py-2 md:px-4 md:py-3">
                  <h3
                    className="text-white leading-tight text-xl md:text-4xl"
                    style={{
                      fontWeight: 600,
                      textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    The Night Stays Hers
                  </h3>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Formula code */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative text-center px-4 py-12"
          >
            <div
              className="hidden md:inline-flex relative items-center gap-2 md:gap-4 px-4 md:px-8 py-3 md:py-4 bg-neutral-900/80 border border-cyan-500/20 rounded-full max-w-full overflow-x-auto scrollbar-hide"
              style={{ backdropFilter: "blur(20px)" }}
            >
              <code className="text-cyan-400 font-mono text-[10px] sm:text-xs md:text-sm lg:text-base whitespace-normal sm:whitespace-nowrap text-center sm:text-left">
                caffeine
                <span className="text-neutral-600 mx-0.5 sm:mx-1 md:mx-2">
                  +
                </span>
                l-theanine
                <span className="text-neutral-600 mx-0.5 sm:mx-1 md:mx-2">
                  +
                </span>
                lionsmane
                <span className="text-neutral-600 mx-0.5 sm:mx-1 md:mx-2">
                  +
                </span>
                electrolytes
                <span className="text-white mx-1 sm:mx-2 md:mx-3">→</span>
                <motion.span
                  className="relative inline-block font-bold text-sm sm:text-base md:text-lg lg:text-xl"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(34,211,238,1) 0%, rgba(255,255,255,1) 50%, rgba(34,211,238,1) 100%)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter:
                      "drop-shadow(0 0 20px rgba(34,211,238,1)) drop-shadow(0 0 40px rgba(34,211,238,0.6)) drop-shadow(0 0 60px rgba(34,211,238,0.3))",
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "200% 0%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  flow
                </motion.span>
              </code>
            </div>
          </motion.div>
        </div>

        {/* Jump to Initialization Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex justify-center mt-16"
        >
          <motion.button
            onClick={() => {
              const emailSection = document.getElementById(
                "protocol-claim-position",
              );
              emailSection?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }}
            className="flex items-center gap-1.5 md:gap-3 px-3 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-mono transition-all duration-300"
            style={{
              background:
                "linear-gradient(to right, rgba(0, 255, 255, 0.2), rgba(0, 255, 255, 0.2))",
              border: "2px solid rgba(0, 255, 255, 0.5)",
              color: "#00FFFF",
              boxShadow: "0 0 15px rgba(0, 255, 255, 0.3)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              boxShadow: [
                "0 0 15px rgba(0, 255, 255, 0.3)",
                "0 0 25px rgba(0, 255, 255, 0.5)",
                "0 0 15px rgba(0, 255, 255, 0.3)",
              ],
            }}
            transition={{
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 },
              boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={{
              scale: 1.08,
              boxShadow: "0 0 40px rgba(0, 255, 255, 0.8)",
              borderColor: "rgba(0, 255, 255, 0.8)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="tracking-wider font-bold">
              JUMP TO INITIALIZATION
            </span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-sm md:text-base"
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
