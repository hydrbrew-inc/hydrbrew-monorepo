import { motion } from "motion/react";
import { useInView } from "motion/react";
import React, { useRef, useState, useEffect } from "react";
import { getStorePreOrderUrl } from "@repo/lib/store-url";

// Intel Briefing Button Component
function IntelButton({
  variant = "red",
  onClick,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
}: {
  variant?: "red" | "cyan";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onTouchStart?: (e: React.TouchEvent<HTMLButtonElement>) => void;
}) {
  const colorClass = variant === "red" ? "bg-red-400" : "bg-cyan-400";
  const borderClass =
    variant === "red"
      ? "border-red-400/50 hover:border-red-400"
      : "border-cyan-400/50 hover:border-cyan-400";
  const shadowClass =
    variant === "red"
      ? "hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]"
      : "hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]";
  const textClass = variant === "red" ? "text-red-400" : "text-cyan-400";

  return (
    <button
      className={`group/briefing flex items-center gap-2 px-3 py-2 bg-black/90 border ${borderClass} rounded-lg backdrop-blur-sm transition-all ${shadowClass}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
    >
      <div className="flex items-center gap-1">
        <div
          className={`w-0.5 ${colorClass} rounded-full`}
          style={{
            height: "10px",
            animation: "wave-pulse 0.8s ease-in-out 0.15s infinite",
          }}
        />
        <div
          className={`w-0.5 ${colorClass} rounded-full`}
          style={{
            height: "12px",
            animation: "wave-pulse 0.8s ease-in-out 0.3s infinite",
          }}
        />
        <div
          className={`w-0.5 ${colorClass} rounded-full`}
          style={{
            height: "14px",
            animation: "wave-pulse 0.8s ease-in-out 0.45s infinite",
          }}
        />
      </div>
      <span className={`text-[10px] font-mono ${textClass} tracking-wider`}>
        INTEL
      </span>
    </button>
  );
}

// Custom schematic icons
const SineWaveIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    {/* Jagged left side */}
    <motion.path
      d="M2 12 L4 8 L6 16 L8 10 L10 14 L12 12"
      stroke="#9ca3af"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Smooth cyan right side */}
    <motion.path
      d="M12 12 Q14 10 16 12 T20 12 L22 12"
      stroke="#22d3ee"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  </svg>
);

const RadarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <motion.circle
      cx="12"
      cy="12"
      r="8"
      stroke="#22d3ee"
      strokeWidth="2"
      fill="none"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.circle
      cx="12"
      cy="12"
      r="4"
      stroke="#22d3ee"
      strokeWidth="2"
      fill="none"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.3,
      }}
    />
    <circle cx="12" cy="12" r="2" fill="#22d3ee" />
  </svg>
);

const HexGridIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    {[
      { x: 12, y: 4, delay: 0 },
      { x: 6, y: 8, delay: 0.2 },
      { x: 18, y: 8, delay: 0.2 },
      { x: 6, y: 16, delay: 0.4 },
      { x: 18, y: 16, delay: 0.4 },
      { x: 12, y: 20, delay: 0.6 },
    ].map((hex, i) => (
      <motion.polygon
        key={i}
        points={`${hex.x},${hex.y - 2} ${hex.x + 2},${hex.y - 1} ${hex.x + 2},${hex.y + 1} ${hex.x},${hex.y + 2} ${hex.x - 2},${hex.y + 1} ${hex.x - 2},${hex.y - 1}`}
        stroke="#22d3ee"
        strokeWidth="1"
        initial={{ fill: "rgba(34, 211, 238, 0)" }}
        animate={{
          fill: [
            "rgba(34, 211, 238, 0)",
            "rgba(34, 211, 238, 0.3)",
            "rgba(34, 211, 238, 0)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: hex.delay,
          ease: "easeInOut",
        }}
      />
    ))}
  </svg>
);

export function BenefitsGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    {
      icon: SineWaveIcon,
      title: "Sustainable Focus",
      originalTitle: "Smoothed Focus Curve",
      description:
        "4–6 hours of deep work without the cortisol spike. Our L-Theanine ratio eliminates the jitter, sustaining clarity through your longest sprints.",
      metric: "4-6hr",
      metricLabel: "sustained",
      reference: {
        code: "PUBMED_18296328",
        title:
          "L-theanine, a natural constituent in tea, and its effect on mental state",
        url: "https://pubmed.ncbi.nlm.nih.gov/18296328/",
      },
    },
    {
      icon: RadarIcon,
      title: "Smart Energy",
      originalTitle: "Zero Heart Rate Elevation",
      description:
        "Stay in flow. Our optimized dose keeps your heart rate stable, preventing the anxiety-cascade triggered by traditional caffeine.",
      metric: "<5 BPM",
      metricLabel: "increase",
      reference: {
        code: "SPRINGER_31-28",
        title:
          "Effects of L-theanine on changes in blood pressure under physical and psychological stresses",
        url: "https://link.springer.com/article/10.1186/1880-6805-31-28",
      },
    },
    {
      icon: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <motion.path
            d="M2 12 L8 4 L12 8 L16 2 L22 10"
            stroke="#22d3ee"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <motion.line
            x1="2"
            y1="16"
            x2="22"
            y2="16"
            stroke="#22d3ee"
            strokeWidth="2"
            strokeDasharray="2 2"
            strokeLinecap="round"
          />
        </svg>
      ),
      title: "Clean Metabolic Exit",
      originalTitle: "No Crash, Zero Sugar",
      description:
        "No sugar crash, no prefrontal fog. Engineered for a gentle return to baseline, protecting your output for the rest of the evening.",
      metric: "Low",
      metricLabel: "sugar",
      reference: {
        code: "PMC_5532289",
        title:
          "Sugar intake from sweet food and beverages and common mental disorders",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5532289/",
      },
    },
    {
      icon: HexGridIcon,
      title: "Premium Hydration Layer",
      originalTitle: "Premium Hydration Layer",
      description:
        "Electrolytes + magnesium + alkaline base. Cellular recovery while you focus. Lightness, not heaviness.",
      metric: "255mg",
      metricLabel: "electrolytes",
      reference: {
        code: "PMC_5452159",
        title: "Magnesium in Prevention and Therapy",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5452159/",
      },
    },
    {
      icon: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <motion.circle
            cx="12"
            cy="12"
            r="8"
            stroke="#22d3ee"
            strokeWidth="2"
            fill="none"
            strokeDasharray="50 10"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <circle cx="12" cy="12" r="3" fill="#22d3ee" />
        </svg>
      ),
      title: "Ritualized Yet Light",
      originalTitle: "Ritualized Yet Light",
      description:
        "Subtle cold-brew taste memory. The ritual you crave without the baggage. Shelf-stable 1 year (Mission Ready).",
      metric: "1yr",
      metricLabel: "shelf life",
      reference: {
        code: "LUNAR-MARS_STABILITY",
        title:
          "In-development architecture designed to satisfy NASA's 5-year pre-positioning requirements for deep-space hydration and cognitive support",
        url: null,
        isSpec: true,
      },
    },
    {
      icon: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <motion.path
            d="M12 2 L15 9 L22 10 L17 15 L18 22 L12 18 L6 22 L7 15 L2 10 L9 9 Z"
            stroke="#22d3ee"
            strokeWidth="2"
            fill="rgba(34, 211, 238, 0.2)"
            strokeLinejoin="round"
            animate={{
              scale: [1, 1.1, 1],
              fill: [
                "rgba(34, 211, 238, 0.2)",
                "rgba(34, 211, 238, 0.4)",
                "rgba(34, 211, 238, 0.2)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      ),
      title: "The High-Performance Edge",
      originalTitle: "Future-Proof Performance",
      description:
        "Engineered for those who can't afford a 'down' afternoon. Arbitrage the slump while the rest of the world crashes. Become a +1 you (badge)",
      metric: "+1",
      metricLabel: "optimized",
      reference: {
        code: "RESEARCHGATE_399181646",
        title:
          "The Neurobiology of Caffeine and L-Theanine Synergy: The Ultimate Productivity Stack (Keyora Research Series, 2025)",
        url: "https://www.researchgate.net/publication/399181646_Keyora_Research_Notes_Series_L-Theanine_Episode_8_The_Ultimate_Productivity_Stack_-_The_Neurobiology_of_Caffeine_and_L-Theanine_Synergy",
      },
    },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-black relative mt-16">
      {/* Shadow texture background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(0,0,0,0.9) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0,0,0,0.9) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(0,0,0,0.8) 0%, transparent 50%)",
          filter: "blur(60px)",
        }}
      />

      {/* Swirling smoke effect */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          {/* Floating Optimized Human Visual - positioned above on mobile, to the right on desktop */}
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
                  src="https://i.imgur.com/5MkTH2X.png"
                  alt="Optimized Human"
                  className="w-full h-full object-cover object-center"
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

          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div
                className="px-4 py-1.5 border border-cyan-500/30 rounded-full text-xs font-mono tracking-wider"
                style={{ color: "#00FFFF" }}
              >
                THE UPGRADE
              </div>
              <IntelButton
                variant="red"
                onClick={(e) => {
                  e.stopPropagation();
                  window.dispatchEvent(
                    new CustomEvent("openNeuralBriefing", {
                      detail: { briefingId: "theAntidote" },
                    }),
                  );
                }}
                onMouseEnter={() => {
                  window.dispatchEvent(
                    new CustomEvent("neuralBriefingTrigger", {
                      detail: { active: true, briefingId: "theAntidote" },
                    }),
                  );
                }}
                onMouseLeave={() => {
                  window.dispatchEvent(
                    new CustomEvent("neuralBriefingTrigger", {
                      detail: { active: false, briefingId: "theAntidote" },
                    }),
                  );
                }}
                onTouchStart={() => {
                  window.dispatchEvent(
                    new CustomEvent("neuralBriefingTrigger", {
                      detail: { active: true, briefingId: "theAntidote" },
                    }),
                  );
                }}
              />
            </div>
            <div>The Bypass</div>
          </h2>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-2">
            <span>Bypass the crash. Own your afternoon.</span>
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
              className="relative inline-flex items-center gap-2 px-3 md:px-4 py-1.5 bg-gradient-to-r from-cyan-500/20 via-cyan-500/10 to-cyan-500/20 border border-cyan-400/50 rounded-full cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Pulsing glow */}
              <motion.span
                className="absolute inset-0 rounded-full bg-cyan-400/20 blur-lg"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.span
                className="relative text-2xl md:text-3xl font-bold"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(34, 211, 238, 0.4)",
                    "0 0 40px rgba(34, 211, 238, 0.8)",
                    "0 0 20px rgba(34, 211, 238, 0.4)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                +1
              </motion.span>
              <span
                className="relative text-xl md:text-2xl"
                style={{ color: "#00FFFF" }}
              >
                You
              </span>
            </motion.button>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const backgroundImages = [
              "https://i.imgur.com/FMFbsOt.jpeg",
              "https://i.imgur.com/leiwjJb.jpeg",
              "https://i.imgur.com/VgrLert.jpeg",
            ];

            let randomBg;
            if (benefit.title === "The High-Performance Edge") {
              randomBg = "https://i.imgur.com/AEIUJHB.png";
            } else if (benefit.title === "Sustainable Focus") {
              randomBg = "https://i.imgur.com/kYPx0Iq.png";
            } else if (benefit.title === "Smart Energy") {
              randomBg = "https://i.imgur.com/8c5LETH.jpeg";
            } else if (benefit.title === "Clean Metabolic Exit") {
              randomBg = "https://i.imgur.com/gEIplVu.png";
            } else if (benefit.title === "Premium Hydration Layer") {
              randomBg = "https://i.imgur.com/rpVPAkh.png";
            } else if (benefit.title === "Ritualized Yet Light") {
              randomBg = "https://i.imgur.com/nvAT7oB.png";
            } else {
              randomBg = backgroundImages[index % 3] ?? backgroundImages[0]!;
            }

            return (
              <BenefitCard
                key={benefit.title}
                benefit={benefit}
                index={index}
                isInView={isInView}
                backgroundImage={randomBg}
                className={index >= 3 ? "hidden md:block" : ""}
              />
            );
          })}
        </div>

        {/* Escape Hatch - Direct to Store */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 flex flex-col items-center gap-3"
        >
          <button
            onClick={() => {
              void import("../analytics/klaviyo-track").then(
                ({ trackKlaviyoEvent }) => {
                  trackKlaviyoEvent("Clicked High-Value Link", {
                    link: "Pre-order Waitlist",
                    section: "benefits",
                  });
                },
              );
              void import("../analytics/posthog-track").then(
                ({ capturePostHogEvent }) => {
                  capturePostHogEvent("clicked_high_value_link", {
                    link: "Pre-order Waitlist",
                    section: "benefits",
                  });
                },
              );
              window.open(
                getStorePreOrderUrl(),
                "_blank",
                "noopener,noreferrer",
              );
            }}
            className="px-12 py-4 text-black font-bold text-lg rounded-md transition-colors duration-200"
            style={{ backgroundColor: "#00FFFF" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#00CCCC")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#00FFFF")
            }
          >
            UNLOCK PRE-SALE SAVINGS
          </button>
          <p className="text-sm text-neutral-400 font-mono">
            Unlock Early Purchase Discounts.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// BenefitCard Component - Cinematic HUD Design
function BenefitCard({
  benefit,
  index,
  isInView,
  backgroundImage,
  className = "",
}: {
  benefit: {
    icon: () => React.ReactNode;
    title: string;
    description: string;
    metric: string;
    metricLabel: string;
    reference: {
      code: string;
      title: string;
      url: string | null;
      isSpec?: boolean;
    };
  };
  index: number;
  isInView: boolean;
  backgroundImage: string;
  className?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      key={benefit.title}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`group relative ${className}`}
    >
      <motion.div
        className="relative rounded-lg overflow-hidden cursor-pointer border border-cyan-400/20 hover:border-cyan-400/60 transition-all duration-500"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.02 }}
        animate={
          isExpanded
            ? {}
            : {
                boxShadow: [
                  "0 0 0 rgba(34, 211, 238, 0)",
                  "0 0 20px rgba(34, 211, 238, 0.3)",
                  "0 0 0 rgba(34, 211, 238, 0)",
                ],
              }
        }
        transition={{
          boxShadow: {
            duration: 3,
            repeat: Infinity,
            delay: index * 0.5,
            ease: "easeInOut",
          },
        }}
      >
        {/* Full-bleed background image with zoom on hover */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition:
              benefit.title === "Sustainable Focus" ||
              benefit.title === "Clean Metabolic Exit"
                ? "center 30%"
                : "center",
            backgroundRepeat: "no-repeat",
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Dark gradient overlay - bottom to top */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 40%, rgba(0, 0, 0, 0.2) 70%, rgba(0, 0, 0, 0.05) 100%)",
          }}
        />

        {/* Glassmorphism layer */}
        <div
          className="absolute inset-0 backdrop-blur-[0.1px] md:backdrop-blur-[0.2px]"
          style={{
            backgroundColor: "rgba(5, 5, 5, 0.2)",
          }}
        />

        {/* Content container */}
        <div className="relative z-10 p-6 flex flex-col min-h-[280px]">
          {/* HUD Metric - top-right corner */}
          <div className="absolute top-4 right-4">
            <motion.div
              className="px-3 py-1.5 rounded bg-black/60 border border-cyan-400/50"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(34, 211, 238, 0.3)",
                  "0 0 20px rgba(34, 211, 238, 0.6)",
                  "0 0 10px rgba(34, 211, 238, 0.3)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="text-cyan-400 font-mono text-sm font-bold leading-none">
                {benefit.metric}
              </div>
              <div className="text-cyan-400/70 font-mono text-[9px] mt-0.5 tracking-wide">
                {benefit.metricLabel}
              </div>
            </motion.div>
          </div>

          {/* Pulsing [ + ] icon - bottom-right corner */}
          <motion.div
            className="absolute bottom-4 right-4 text-cyan-400 font-mono text-xs"
            animate={{
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            [ + ]
          </motion.div>

          {/* Title - bottom-left, Space Grotesk */}
          <div className="mt-auto">
            <h3
              className="text-2xl font-bold text-white uppercase mb-2"
              style={{
                fontFamily: "Space Grotesk, system-ui, sans-serif",
                letterSpacing: "2px",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
              }}
            >
              {benefit.title}
            </h3>

            {/* Expanded content - vertical slide */}
            <motion.div
              initial={false}
              animate={{
                height: isExpanded ? "auto" : 0,
                opacity: isExpanded ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {/* Body text */}
              <p
                className="text-sm text-neutral-300 leading-relaxed mb-4 mt-3"
                style={{ fontFamily: "Inter, Helvetica, sans-serif" }}
              >
                {benefit.title === "The High-Performance Edge" ? (
                  <>
                    4–6 hours of cognitive glide. Eliminate the cortisol spike.
                    Sustain clarity through your longest sprints with zero
                    jitter.
                  </>
                ) : benefit.title === "Ritualized Yet Light" ? (
                  <>
                    The coffee soul, stripped of systemic friction.
                    High-fidelity flavor without the metabolic tax. 12-month
                    shelf stability for infinite readiness.
                  </>
                ) : (
                  benefit.description
                )}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
