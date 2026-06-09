import { motion, AnimatePresence } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
  getEmailDomain,
  scrollToSection,
  showSignupToast,
  submitSignup,
  trackSignupEvent,
} from "./signupFlow";
import {
  Check,
  Leaf,
  Beaker,
  Shield,
  Flame,
  Droplet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getStorePreOrderUrl } from "@repo/lib/store-url";

export function ProductShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTagIndex, setActiveTagIndex] = useState(0);
  const [evolutionEmail, setEvolutionEmail] = useState("");
  const [isEvolutionSubmitting, setIsEvolutionSubmitting] = useState(false);

  const handleEvolutionSubmit = async () => {
    if (!evolutionEmail) return;
    setIsEvolutionSubmitting(true);
    const result = await submitSignup({
      email: evolutionEmail,
      signupSource: "product_initialize",
    });
    if (result.ok && result.profile) {
      trackSignupEvent("waitlist_join_success", {
        source: "product_initialize",
        status: result.status,
        emailDomain: getEmailDomain(evolutionEmail),
      });
      showSignupToast({
        variant: "success",
        message: `You're in, ${result.profile.operativeNumber}. Check your inbox.`,
      });
      setEvolutionEmail("");
      setTimeout(() => scrollToSection("email-capture"), 300);
    } else {
      trackSignupEvent("waitlist_join_failed", {
        source: "product_initialize",
        status: result.status,
        reason: result.error ?? "upstream_rejected",
        emailDomain: getEmailDomain(evolutionEmail),
      });
      showSignupToast({
        variant: "error",
        message:
          result.status === 0
            ? "Network issue. Please try again in a moment."
            : "Join failed. Please try again.",
      });
    }
    setIsEvolutionSubmitting(false);
  };
  const [isResearchExpanded, setIsResearchExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const tasteProfiles = ["Light", "Crisp", "Smooth", "Refreshing"];

  const productImages = [
    "/images/AnRHOue.webp",
    "/images/AnRHOue.webp", // Replace with actual product images
    "/images/AnRHOue.webp", // Replace with actual product images
    "/images/AnRHOue.webp", // Replace with actual product images
  ];

  // Rotate through taste profiles
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTagIndex((prev) => (prev + 1) % tasteProfiles.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + productImages.length) % productImages.length,
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const specs = [
    { icon: Check, label: "Low Sugar", value: "0g added sugar" },
    { icon: Leaf, label: "Low Caffeine", value: "Optimized Signal Strength" },
    {
      icon: Beaker,
      label: "Iconic Hydration Layer",
      value: "Electrolyte Matrix",
    },
    {
      icon: Shield,
      label: "Full Cognitive Stack",
      value: "L-Theanine and Lion's Mane",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: "#05070A" }}
    >
      {/* Frost/Mineral Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='frostFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.4, 0 0 0 0 0.5, 0 0 0 0 0.6, 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23frostFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "300px 300px",
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div
              className="px-4 py-1.5 border border-cyan-500/30 rounded-full text-xs font-mono tracking-wider"
              style={{ color: "#00FFFF" }}
            >
              THE PRODUCT
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white">
            Functional
            <br className="md:hidden" /> Iced Coffee.
            <br />
            <span className="inline-flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-2">
              <span>Zero Compromise.</span>
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
                className="relative inline-flex items-center gap-2 px-3 md:px-4 py-1.5 bg-gradient-to-r from-cyan-500/20 via-cyan-500/10 to-cyan-500/20 border border-cyan-400/50 rounded-full cursor-pointer ml-1 md:ml-2"
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
                  className="relative text-3xl md:text-4xl lg:text-5xl font-bold"
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
                  className="relative text-2xl md:text-3xl lg:text-4xl"
                  style={{ color: "#00FFFF" }}
                >
                  You
                </span>
              </motion.button>
            </span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-400 mb-16 leading-relaxed max-w-3xl mx-auto">
            Engineered as a performance beverage to own the afternoon window.
          </p>
        </motion.div>

        {/* Hardware-Validated Blueprint Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-7xl mx-auto mb-16 rounded-2xl overflow-hidden border border-cyan-500/20"
          style={{ backgroundColor: "#050505" }}
        >
          {/* Enhanced Curved Topographic Grid Background */}
          <div className="absolute inset-0 opacity-[0.12]">
            <svg
              className="w-full h-full"
              viewBox="0 0 1200 800"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <pattern
                  id="topo-grid"
                  x="0"
                  y="0"
                  width="30"
                  height="30"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 30 0 L 0 0 0 30"
                    fill="none"
                    stroke="#00FFFF"
                    strokeWidth="0.8"
                  />
                </pattern>
                <radialGradient id="grid-fade" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.2" />
                </radialGradient>
              </defs>
              {/* Multiple curved grid layers for dramatic depth */}
              <ellipse
                cx="600"
                cy="400"
                rx="550"
                ry="350"
                fill="none"
                stroke="url(#grid-fade)"
                strokeWidth="1.5"
                opacity="0.4"
              />
              <ellipse
                cx="600"
                cy="400"
                rx="450"
                ry="280"
                fill="none"
                stroke="url(#grid-fade)"
                strokeWidth="1.5"
                opacity="0.5"
              />
              <ellipse
                cx="600"
                cy="400"
                rx="350"
                ry="210"
                fill="none"
                stroke="url(#grid-fade)"
                strokeWidth="1.5"
                opacity="0.6"
              />
              <ellipse
                cx="600"
                cy="400"
                rx="250"
                ry="140"
                fill="none"
                stroke="url(#grid-fade)"
                strokeWidth="1.5"
                opacity="0.7"
              />
              <rect
                width="1200"
                height="800"
                fill="url(#topo-grid)"
                opacity="0.7"
              />
              {/* Crosshair center marker */}
              <line
                x1="580"
                y1="400"
                x2="620"
                y2="400"
                stroke="#00FFFF"
                strokeWidth="1"
                opacity="0.5"
              />
              <line
                x1="600"
                y1="380"
                x2="600"
                y2="420"
                stroke="#00FFFF"
                strokeWidth="1"
                opacity="0.5"
              />
            </svg>
          </div>

          {/* Scanning laser sweep effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(0, 255, 255, 0.15) 50%, transparent 100%)",
              width: "100%",
            }}
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Main Blueprint Container */}
          <div className="relative pt-2 pb-8 md:pb-16 px-4 md:px-8 lg:px-16">
            {/* Central Can with HUD Nodes */}
            <div className="relative flex items-start justify-center">
              {/* The Can - MASSIVE HERO ELEMENT - DEAD CENTER */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex flex-col items-center gap-4 md:gap-8"
              >
                <img
                  src="/images/XrNhE2G.webp"
                  alt="hydrbrew can"
                  className="w-[350px] sm:w-[500px] md:w-[650px] lg:w-[800px] h-auto object-contain"
                />

                {/* Horizontal Flow State Meter */}
                <div className="w-full max-w-[350px] sm:max-w-[500px] md:max-w-[700px] flex flex-col items-center gap-2 md:gap-4 px-2">
                  <div
                    className="text-xs sm:text-sm md:text-base font-mono tracking-wider font-bold"
                    style={{
                      color: "#00FFFF",
                      textShadow: "0 0 10px rgba(0, 255, 255, 0.6)",
                    }}
                  >
                    FLOW STATE METER
                  </div>
                  <div
                    className="w-full h-6 md:h-8 bg-black/60 rounded-lg overflow-hidden relative"
                    style={{
                      border: "2px solid rgba(0, 255, 255, 0.5)",
                      boxShadow:
                        "0 0 30px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    {/* 75% filled bar with continuous loading animation */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: ["0%", "75%"] } : {}}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                        ease: "easeInOut",
                      }}
                      className="h-full relative"
                      style={{
                        background:
                          "linear-gradient(to right, #00FFFF, #06b6d4, #00FFFF)",
                        boxShadow:
                          "0 0 30px rgba(0, 255, 255, 0.8), inset 0 0 10px rgba(0, 255, 255, 0.4)",
                      }}
                    >
                      {/* Animated scanning line */}
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)",
                          width: "40%",
                        }}
                        animate={{
                          x: ["-40%", "140%"],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </motion.div>
                    {/* 75% marker label */}
                    <div
                      className="absolute right-[25%] top-1/2 -translate-y-1/2 w-0.5 md:w-1 h-8 md:h-10"
                      style={{
                        backgroundColor: "#00FFFF",
                        boxShadow: "0 0 10px rgba(0, 255, 255, 0.8)",
                      }}
                    />
                  </div>
                  <div
                    className="text-xs sm:text-sm font-mono font-bold"
                    style={{ color: "rgba(0, 255, 255, 0.8)" }}
                  >
                    75% OPTIMAL PERFORMANCE
                  </div>
                </div>
              </motion.div>

              {/* HUD Node 1 - Top Left (10 o'clock): LION'S MANE */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute left-[5%] md:left-[10%]"
                style={{ top: "20%" }}
              >
                <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                  <div className="text-right">
                    <div
                      className="text-[10px] sm:text-xs md:text-base font-mono font-bold"
                      style={{ color: "#00FFFF" }}
                    >
                      LION'S MANE
                    </div>
                    <div
                      className="text-[9px] sm:text-[10px] md:text-xs font-mono"
                      style={{ color: "rgba(0, 255, 255, 0.6)" }}
                    >
                      NEURAL CLARITY
                    </div>
                  </div>
                  <div
                    className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full"
                    style={{
                      backgroundColor: "#00FFFF",
                      boxShadow:
                        "0 0 20px rgba(0, 255, 255, 1), 0 0 40px rgba(0, 255, 255, 0.6)",
                    }}
                  />
                </div>
              </motion.div>

              {/* HUD Node 2 - Mid Left (9 o'clock): GLYCEMIC LOAD */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute left-[2%] md:left-[10%]"
                style={{ top: "50%", transform: "translateY(-50%)" }}
              >
                <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                  <div className="text-right">
                    <div
                      className="text-[10px] sm:text-xs md:text-base font-mono font-bold"
                      style={{ color: "#00FFFF" }}
                    >
                      GLYCEMIC LOAD
                    </div>
                    <div
                      className="text-[9px] sm:text-[10px] md:text-xs font-mono"
                      style={{ color: "rgba(0, 255, 255, 0.6)" }}
                    >
                      LOW
                    </div>
                  </div>
                  <div
                    className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full"
                    style={{
                      backgroundColor: "#00FFFF",
                      boxShadow:
                        "0 0 20px rgba(0, 255, 255, 1), 0 0 40px rgba(0, 255, 255, 0.6)",
                    }}
                  />
                </div>
              </motion.div>

              {/* HUD Node 3 - Bottom Left (7 o'clock): RITUAL */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="absolute bottom-[28%] md:bottom-[20%] left-[10%]"
              >
                <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                  <div className="text-right">
                    <div
                      className="text-[10px] sm:text-xs md:text-base font-mono font-bold"
                      style={{ color: "#00FFFF" }}
                    >
                      RITUAL
                    </div>
                    <div
                      className="text-[9px] sm:text-[10px] md:text-xs font-mono"
                      style={{ color: "rgba(0, 255, 255, 0.6)" }}
                    >
                      COFFEE CUE
                    </div>
                  </div>
                  <div
                    className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full"
                    style={{
                      backgroundColor: "#00FFFF",
                      boxShadow:
                        "0 0 20px rgba(0, 255, 255, 1), 0 0 40px rgba(0, 255, 255, 0.6)",
                    }}
                  />
                </div>
              </motion.div>

              {/* HUD Node 4 - Top Right (2 o'clock): L-THEANINE */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute right-[5%] md:right-[10%]"
                style={{ top: "20%" }}
              >
                <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                  <div
                    className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full"
                    style={{
                      backgroundColor: "#00FFFF",
                      boxShadow:
                        "0 0 20px rgba(0, 255, 255, 1), 0 0 40px rgba(0, 255, 255, 0.6)",
                    }}
                  />
                  <div className="text-left">
                    <div
                      className="text-[10px] sm:text-xs md:text-base font-mono font-bold"
                      style={{ color: "#00FFFF" }}
                    >
                      L-THEANINE
                    </div>
                    <div
                      className="text-[9px] sm:text-[10px] md:text-xs font-mono"
                      style={{ color: "rgba(0, 255, 255, 0.6)" }}
                    >
                      FLOW STATE
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* HUD Node 5 - Mid Right (3 o'clock): ELECTROLYTES */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute right-[2%] md:right-[10%]"
                style={{ top: "50%", transform: "translateY(-50%)" }}
              >
                <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                  <div
                    className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full"
                    style={{
                      backgroundColor: "#00FFFF",
                      boxShadow:
                        "0 0 20px rgba(0, 255, 255, 1), 0 0 40px rgba(0, 255, 255, 0.6)",
                    }}
                  />
                  <div className="text-left">
                    <div
                      className="text-[10px] sm:text-xs md:text-base font-mono font-bold"
                      style={{ color: "#00FFFF" }}
                    >
                      ELECTROLYTES
                    </div>
                    <div
                      className="text-[9px] sm:text-[10px] md:text-xs font-mono"
                      style={{ color: "rgba(0, 255, 255, 0.6)" }}
                    >
                      HYDRATION SUPPORT
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* HUD Node 6 - Bottom Right (5 o'clock): CALORIE COUNT */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="absolute bottom-[28%] md:bottom-[20%] right-[5%] md:right-[10%]"
              >
                <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                  <div
                    className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full"
                    style={{
                      backgroundColor: "#00FFFF",
                      boxShadow:
                        "0 0 20px rgba(0, 255, 255, 1), 0 0 40px rgba(0, 255, 255, 0.6)",
                    }}
                  />
                  <div className="text-left">
                    <div
                      className="text-[10px] sm:text-xs md:text-base font-mono font-bold"
                      style={{ color: "#00FFFF" }}
                    >
                      CALORIE COUNT
                    </div>
                    <div
                      className="text-[9px] sm:text-[10px] md:text-xs font-mono"
                      style={{ color: "rgba(0, 255, 255, 0.6)" }}
                    >
                      Only 20 Calories
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Secure 12-Pack Button - Below Blueprint */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col items-center gap-3 mb-16"
        >
          <button
            onClick={() => {
              void import("../analytics/klaviyo-track").then(
                ({ trackKlaviyoEvent }) => {
                  trackKlaviyoEvent("Clicked High-Value Link", {
                    link: "Pre-order Waitlist",
                    section: "product",
                  });
                },
              );
              void import("../analytics/posthog-track").then(
                ({ capturePostHogEvent }) => {
                  capturePostHogEvent("clicked_high_value_link", {
                    link: "Pre-order Waitlist",
                    section: "product",
                  });
                },
              );
              window.open(
                getStorePreOrderUrl({ ref: "lp_hero_cta" }),
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
            CLAIM PRE-SALE DISCOUNT
          </button>
          <p className="text-sm text-neutral-400 font-mono">
            Limited first-run production.
          </p>
        </motion.div>

        {/* Specs grid - centered */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Taste profile */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="relative via-black/40 p-6"
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(0, 255, 255, 0.05), rgba(0, 0, 0, 0.4), rgba(0, 255, 255, 0.05))",
                border: "1px solid rgba(0, 255, 255, 0.3)",
                boxShadow:
                  "0 0 20px rgba(0, 255, 255, 0.1), inset 0 0 30px rgba(0, 255, 255, 0.05)",
              }}
            >
              {/* Corner Accents */}
              <div
                className="absolute top-0 left-0 w-4 h-4"
                style={{
                  borderTop: "1px solid rgba(0, 255, 255, 0.7)",
                  borderLeft: "1px solid rgba(0, 255, 255, 0.7)",
                  boxShadow: "0 0 8px rgba(0, 255, 255, 0.4)",
                }}
              />
              <div
                className="absolute top-0 right-0 w-4 h-4"
                style={{
                  borderTop: "1px solid rgba(0, 255, 255, 0.7)",
                  borderRight: "1px solid rgba(0, 255, 255, 0.7)",
                  boxShadow: "0 0 8px rgba(0, 255, 255, 0.4)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-4 h-4"
                style={{
                  borderBottom: "1px solid rgba(0, 255, 255, 0.7)",
                  borderLeft: "1px solid rgba(0, 255, 255, 0.7)",
                  boxShadow: "0 0 8px rgba(0, 255, 255, 0.4)",
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-4 h-4"
                style={{
                  borderBottom: "1px solid rgba(0, 255, 255, 0.7)",
                  borderRight: "1px solid rgba(0, 255, 255, 0.7)",
                  boxShadow: "0 0 8px rgba(0, 255, 255, 0.4)",
                }}
              />

              <div
                className="text-sm font-bold mb-4"
                style={{
                  color: "#00FFFF",
                  textShadow: "0 0 10px rgba(0, 255, 255, 0.4)",
                }}
              >
                Taste Profile
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
                {/* Column 1: LIGHT */}
                <motion.div
                  initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                  animate={{
                    backgroundColor:
                      activeTagIndex === 0
                        ? "rgba(0, 255, 255, 0.2)"
                        : "rgba(0, 0, 0, 0)",
                  }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center py-3"
                  style={{ borderRight: "1px solid rgba(0, 255, 255, 0.4)" }}
                >
                  <motion.div
                    animate={{
                      color:
                        activeTagIndex === 0
                          ? "rgba(0, 255, 255, 1)"
                          : "rgba(0, 255, 255, 0.8)",
                      textShadow:
                        activeTagIndex === 0
                          ? "0 0 15px rgba(0, 255, 255, 0.8)"
                          : "0 0 5px rgba(0, 255, 255, 0.3)",
                    }}
                    transition={{ duration: 0.4 }}
                    className="font-mono font-bold mb-1"
                    style={{
                      fontFamily: "Roboto Mono, monospace",
                      fontSize: "14px",
                    }}
                  >
                    LIGHT
                  </motion.div>
                  <motion.div
                    animate={{
                      color:
                        activeTagIndex === 0
                          ? "rgba(200, 200, 200, 1)"
                          : "rgba(150, 150, 150, 1)",
                    }}
                    transition={{ duration: 0.4 }}
                    style={{
                      fontFamily: "Source Sans Pro, sans-serif",
                      fontSize: "11px",
                      fontWeight: 600,
                    }}
                  >
                    [LOW-VISCOSITY]
                  </motion.div>
                </motion.div>

                {/* Column 2: CRISP */}
                <motion.div
                  initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                  animate={{
                    backgroundColor:
                      activeTagIndex === 1
                        ? "rgba(0, 255, 255, 0.2)"
                        : "rgba(0, 0, 0, 0)",
                  }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center py-3"
                  style={{ borderRight: "1px solid rgba(0, 255, 255, 0.4)" }}
                >
                  <motion.div
                    animate={{
                      color:
                        activeTagIndex === 1
                          ? "rgba(0, 255, 255, 1)"
                          : "rgba(0, 255, 255, 0.8)",
                      textShadow:
                        activeTagIndex === 1
                          ? "0 0 15px rgba(0, 255, 255, 0.8)"
                          : "0 0 5px rgba(0, 255, 255, 0.3)",
                    }}
                    transition={{ duration: 0.4 }}
                    className="font-mono font-bold mb-1"
                    style={{
                      fontFamily: "Roboto Mono, monospace",
                      fontSize: "14px",
                    }}
                  >
                    CRISP
                  </motion.div>
                  <motion.div
                    animate={{
                      color:
                        activeTagIndex === 1
                          ? "rgba(200, 200, 200, 1)"
                          : "rgba(150, 150, 150, 1)",
                    }}
                    transition={{ duration: 0.4 }}
                    style={{
                      fontFamily: "Source Sans Pro, sans-serif",
                      fontSize: "11px",
                      fontWeight: 600,
                    }}
                  >
                    [ALKALINE BUFFER]
                  </motion.div>
                </motion.div>

                {/* Column 3: SMOOTH */}
                <motion.div
                  initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                  animate={{
                    backgroundColor:
                      activeTagIndex === 2
                        ? "rgba(0, 255, 255, 0.2)"
                        : "rgba(0, 0, 0, 0)",
                  }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center py-3"
                  style={{ borderRight: "1px solid rgba(0, 255, 255, 0.4)" }}
                >
                  <motion.div
                    animate={{
                      color:
                        activeTagIndex === 2
                          ? "rgba(0, 255, 255, 1)"
                          : "rgba(0, 255, 255, 0.8)",
                      textShadow:
                        activeTagIndex === 2
                          ? "0 0 15px rgba(0, 255, 255, 0.8)"
                          : "0 0 5px rgba(0, 255, 255, 0.3)",
                    }}
                    transition={{ duration: 0.4 }}
                    className="font-mono font-bold mb-1"
                    style={{
                      fontFamily: "Roboto Mono, monospace",
                      fontSize: "14px",
                    }}
                  >
                    SMOOTH
                  </motion.div>
                  <motion.div
                    animate={{
                      color:
                        activeTagIndex === 2
                          ? "rgba(200, 200, 200, 1)"
                          : "rgba(150, 150, 150, 1)",
                    }}
                    transition={{ duration: 0.4 }}
                    style={{
                      fontFamily: "Source Sans Pro, sans-serif",
                      fontSize: "11px",
                      fontWeight: 600,
                    }}
                  >
                    [LOW-ACIDITY]
                  </motion.div>
                </motion.div>

                {/* Column 4: REFRESHING */}
                <motion.div
                  initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                  animate={{
                    backgroundColor:
                      activeTagIndex === 3
                        ? "rgba(0, 255, 255, 0.2)"
                        : "rgba(0, 0, 0, 0)",
                  }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center py-3"
                >
                  <motion.div
                    animate={{
                      color:
                        activeTagIndex === 3
                          ? "rgba(0, 255, 255, 1)"
                          : "rgba(0, 255, 255, 0.8)",
                      textShadow:
                        activeTagIndex === 3
                          ? "0 0 15px rgba(0, 255, 255, 0.8)"
                          : "0 0 5px rgba(0, 255, 255, 0.3)",
                    }}
                    transition={{ duration: 0.4 }}
                    className="font-mono font-bold mb-1"
                    style={{
                      fontFamily: "Roboto Mono, monospace",
                      fontSize: "14px",
                    }}
                  >
                    REFRESHING
                  </motion.div>
                  <motion.div
                    animate={{
                      color:
                        activeTagIndex === 3
                          ? "rgba(163, 163, 163, 1)"
                          : "rgba(115, 115, 115, 1)",
                    }}
                    transition={{ duration: 0.4 }}
                    style={{
                      fontFamily: "Source Sans Pro, sans-serif",
                      fontSize: "11px",
                      fontWeight: 600,
                    }}
                  >
                    [CLEAN SUBSTRATE]
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Lifestyle Moment - The Afternoon in Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-12 mb-12 relative rounded-2xl overflow-hidden group cursor-pointer w-full"
              style={{
                height: "400px",
                minHeight: "300px",
              }}
            >
              {/* Main lifestyle image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: "url(/images/krNGOh7.webp)",
                  filter: "brightness(0.95) contrast(1.05) saturate(1.1)",
                }}
              />

              {/* Subtle gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Cinematic vignette */}
              <div
                className="absolute inset-0"
                style={{
                  boxShadow: "inset 0 0 120px 20px rgba(0, 0, 0, 0.4)",
                }}
              />

              {/* Time stamp - top left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="absolute top-6 left-6 flex items-center gap-3"
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  animate={{
                    backgroundColor: ["#FFFFFF", "#000000", "#FFFFFF"],
                    boxShadow: [
                      "0 0 10px rgba(255, 255, 255, 0.8)",
                      "0 0 10px rgba(0, 0, 0, 0.8)",
                      "0 0 10px rgba(255, 255, 255, 0.8)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="font-mono text-black text-sm tracking-wider font-semibold">
                  2:15 PM
                </span>
              </motion.div>

              {/* Bottom caption */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="absolute bottom-6 left-6 right-6"
              >
                <div className="flex items-end justify-between">
                  <div>
                    <div
                      className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-2"
                      style={{ textShadow: "0 2px 20px rgba(0, 0, 0, 0.9)" }}
                    >
                      The Afternoon in Action
                    </div>
                    <div
                      className="text-sm md:text-base font-mono tracking-wide"
                      style={{
                        color: "#00FFFF",
                        textShadow:
                          "0 0 8px rgba(0, 0, 0, 1), 0 0 12px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.8)",
                      }}
                    >
                      Total stability. Zero latency. All clarity.
                    </div>
                  </div>

                  {/* Subtle branding mark */}
                  <motion.div
                    className="hidden md:flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md border border-cyan-500/30 rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 10px rgba(34, 211, 238, 0.2)",
                        "0 0 20px rgba(34, 211, 238, 0.4)",
                        "0 0 10px rgba(34, 211, 238, 0.2)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <span
                      className="font-mono text-xs tracking-wider"
                      style={{ color: "#00FFFF" }}
                    >
                      hydrbrew°
                    </span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-cyan-500/40 opacity-60" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-cyan-500/40 opacity-60" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-cyan-500/40 opacity-60" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-cyan-500/40 opacity-60" />
            </motion.div>

            {/* Research Protocol - Data File */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-6 bg-black/20 rounded-lg overflow-hidden backdrop-blur-sm"
              style={{ border: "1px solid rgba(0, 255, 255, 0.1)" }}
            >
              {/* Collapsed Header - Always visible */}
              <button
                onClick={() => setIsResearchExpanded(!isResearchExpanded)}
                className="w-full flex items-center gap-2 px-4 py-3 transition-colors group"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(0, 255, 255, 0.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: "rgba(0, 255, 255, 0.6)",
                    boxShadow: "0 0 6px rgba(0, 255, 255, 0.4)",
                  }}
                />
                <span
                  className="text-xs md:text-sm font-mono tracking-wider transition-colors"
                  style={{ color: "rgba(0, 255, 255, 0.7)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#00FFFF")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(0, 255, 255, 0.7)")
                  }
                >
                  RESEARCH.md
                </span>
                <span className="text-[10px] md:text-xs font-mono text-neutral-700 ml-auto mr-2">
                  [3]
                </span>
                <motion.svg
                  animate={{ rotate: isResearchExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-4 h-4 md:w-5 md:h-5 transition-colors"
                  style={{ color: "rgba(0, 255, 255, 0.5)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#00FFFF")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(0, 255, 255, 0.5)")
                  }
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </button>

              {/* Expanded Content */}
              <motion.div
                initial={false}
                animate={{
                  height: isResearchExpanded ? "auto" : 0,
                  opacity: isResearchExpanded ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div
                  className="px-3 pb-3"
                  style={{ borderTop: "1px solid rgba(0, 255, 255, 0.1)" }}
                >
                  <div
                    className="space-y-2.5 mt-3 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent"
                    style={{
                      scrollbarColor: "rgba(0, 255, 255, 0.2) transparent",
                    }}
                  >
                    <div className="flex items-start gap-2 text-xs md:text-sm font-mono">
                      <span className="text-neutral-600 select-none flex-shrink-0">
                        [01]
                      </span>
                      <div className="flex-1">
                        <span className="text-neutral-500">Low Sugar —</span>{" "}
                        <a
                          href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9964017/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-dotted transition-colors"
                          style={{
                            color: "rgba(0, 255, 255, 0.6)",
                            textDecorationColor: "rgba(0, 255, 255, 0.3)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#00FFFF";
                            e.currentTarget.style.textDecorationColor =
                              "rgba(0, 255, 255, 0.6)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color =
                              "rgba(0, 255, 255, 0.6)";
                            e.currentTarget.style.textDecorationColor =
                              "rgba(0, 255, 255, 0.3)";
                          }}
                        >
                          Sugar-sweetened beverage reduction studies
                        </a>
                        <span className="text-neutral-700 ml-1 text-[10px] md:text-xs">
                          PMC9964017
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-xs md:text-sm font-mono">
                      <span className="text-neutral-600 select-none flex-shrink-0">
                        [02]
                      </span>
                      <div className="flex-1">
                        <span className="text-neutral-500">
                          L-Theanine + Caffeine —
                        </span>{" "}
                        <a
                          href="https://www.researchgate.net/publication/47643925_The_combination_of_L-theanine_and_caffeine_improves_cognitive_performance_and_increases_subjective_alertness"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-dotted transition-colors"
                          style={{
                            color: "rgba(0, 255, 255, 0.6)",
                            textDecorationColor: "rgba(0, 255, 255, 0.3)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#00FFFF";
                            e.currentTarget.style.textDecorationColor =
                              "rgba(0, 255, 255, 0.6)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color =
                              "rgba(0, 255, 255, 0.6)";
                            e.currentTarget.style.textDecorationColor =
                              "rgba(0, 255, 255, 0.3)";
                          }}
                        >
                          Cognitive performance and alertness synergy
                        </a>
                        <span className="text-neutral-700 ml-1 text-[10px] md:text-xs">
                          ResearchGate
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-xs md:text-sm font-mono">
                      <span className="text-neutral-600 select-none flex-shrink-0">
                        [03]
                      </span>
                      <div className="flex-1">
                        <span className="text-neutral-500">Lion's Mane —</span>{" "}
                        <a
                          href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10675414/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-dotted transition-colors"
                          style={{
                            color: "rgba(0, 255, 255, 0.6)",
                            textDecorationColor: "rgba(0, 255, 255, 0.3)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#00FFFF";
                            e.currentTarget.style.textDecorationColor =
                              "rgba(0, 255, 255, 0.6)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color =
                              "rgba(0, 255, 255, 0.6)";
                            e.currentTarget.style.textDecorationColor =
                              "rgba(0, 255, 255, 0.3)";
                          }}
                        >
                          Neuroprotective and cognitive enhancement effects
                        </a>
                        <span className="text-neutral-700 ml-1 text-[10px] md:text-xs">
                          PMC10675414
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="mt-3 pt-2"
                    style={{ borderTop: "1px solid rgba(0, 255, 255, 0.1)" }}
                  >
                    <p className="text-xs md:text-sm font-mono text-neutral-500 leading-relaxed">
                      All formulation claims calibrated against peer-reviewed
                      research. hydrbrew° is designed for baseline optimization,
                      not medical intervention.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Minimalist Email Capture - Initialize Your Evolution */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-8 md:mt-16 mb-4 max-w-3xl mx-auto px-4 md:px-6 py-4 md:py-6 bg-black/40 rounded-lg"
              id="email-capture"
              style={{
                border: "1px solid rgba(0, 255, 255, 0.2)",
                boxShadow: "0 0 30px rgba(0, 255, 255, 0.1)",
              }}
            >
              {/* Label */}
              <div
                className="font-mono mb-3 md:mb-4 text-xs md:text-sm"
                style={{
                  fontFamily: "Roboto Mono, monospace",
                  color: "#00FFFF",
                  textShadow: "0 0 10px rgba(0, 255, 255, 0.6)",
                }}
              >
                // INITIALIZE YOUR EVOLUTION
              </div>

              {/* Input Line */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3">
                <input
                  type="email"
                  value={evolutionEmail}
                  onChange={(e) => setEvolutionEmail(e.target.value)}
                  disabled={isEvolutionSubmitting}
                  placeholder="your_email@protocol.com"
                  className="flex-1 px-3 md:px-4 py-2.5 md:py-3 bg-neutral-800/80 rounded-lg text-white placeholder:text-neutral-400 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    fontFamily: "Roboto Mono, monospace",
                    border: "2px solid rgba(0, 255, 255, 0.4)",
                    boxShadow: "0 0 20px rgba(0, 255, 255, 0.15)",
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#00FFFF";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 2px rgba(0, 255, 255, 0.3)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(0, 255, 255, 0.4)";
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(0, 255, 255, 0.15)";
                  }}
                />

                <div className="flex items-center gap-2 md:gap-3">
                  <motion.button
                    onClick={handleEvolutionSubmit}
                    disabled={isEvolutionSubmitting}
                    whileHover={{ scale: isEvolutionSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isEvolutionSubmitting ? 1 : 0.98 }}
                    className="flex-1 md:flex-none px-4 md:px-6 py-2.5 md:py-3 text-black rounded-lg font-mono transition-colors text-xs md:text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{
                      fontWeight: 600,
                      backgroundColor: "#00FFFF",
                      boxShadow:
                        "0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.4), 0 0 60px rgba(0, 255, 255, 0.2)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#00CCCC";
                      e.currentTarget.style.boxShadow =
                        "0 0 30px rgba(0, 255, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.6), 0 0 90px rgba(0, 255, 255, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#00FFFF";
                      e.currentTarget.style.boxShadow =
                        "0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.4), 0 0 60px rgba(0, 255, 255, 0.2)";
                    }}
                  >
                    {isEvolutionSubmitting ? "SUBMITTING..." : "INITIALIZE"}
                  </motion.button>

                  {/* Live Uplink Indicator */}
                  <div className="hidden md:flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#00FFFF" }}
                      animate={{
                        opacity: [0.4, 1, 0.4],
                        boxShadow: [
                          "0 0 8px rgba(0, 255, 255, 0.6)",
                          "0 0 16px rgba(0, 255, 255, 1)",
                          "0 0 8px rgba(0, 255, 255, 0.6)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <span
                      className="font-mono whitespace-nowrap"
                      style={{
                        fontFamily: "Roboto Mono, monospace",
                        fontSize: "11px",
                        opacity: 0.8,
                        color: "#00FFFF",
                      }}
                    >
                      LIVE_UPLINK
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
