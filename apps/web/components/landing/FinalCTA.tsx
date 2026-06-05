import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  Zap,
  Eye,
  Users,
  TrendingUp,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PathSeparator } from "./PathSeparator";
import {
  getEmailDomain,
  scrollToSection,
  showSignupToast,
  submitSignup,
  trackSignupEvent,
} from "./signupFlow";
import { useLiveCounters } from "./useLiveCounters";

// Intel Briefing Button Component
function IntelButton({
  variant = "red",
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  variant?: "red" | "cyan";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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

// Floating Avatar Component with Orbital Dots
function FloatingAvatar({
  imageSrc,
  position = "top",
}: {
  imageSrc: string;
  position?: "top" | "side";
}) {
  const positionClass =
    position === "top"
      ? "absolute -top-20 left-1/2 -translate-x-1/2 md:top-8 md:left-8 md:translate-x-0 lg:left-[calc(50%+200px)] lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 pointer-events-none"
      : "absolute -top-28 left-1/2 -translate-x-1/2 md:-top-32 md:left-1/2 md:-translate-x-1/2 lg:left-[calc(50%+320px)] lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 pointer-events-none";

  return (
    <motion.div
      className={positionClass}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="relative"
        animate={{
          y: [-5, 5, -5],
          rotate: [-0.5, 0.5, -0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute -inset-4 rounded-full border-2 border-cyan-400/30 blur-sm"
          style={{ boxShadow: "0 0 40px rgba(34, 211, 238, 0.4)" }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Avatar container */}
        <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-cyan-500/50 shadow-[0_0_40px_rgba(34,211,238,0.6)]">
          <img
            src={imageSrc}
            alt="Optimized Human"
            className="w-full h-full object-cover"
          />
          {/* Scanning overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
            animate={{
              y: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* +1 Badge */}
        <div
          className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 rounded-full p-2 border-2 border-black"
          style={{
            background: "linear-gradient(to bottom right, #00FFFF, #00CCCC)",
            boxShadow: "0 0 20px rgba(0, 255, 255, 0.8)",
          }}
        >
          <span className="text-black font-bold text-sm">+1</span>
        </div>

        {/* Orbital dots */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{ top: "50%", left: "50%" }}
            animate={{
              x: [
                Math.cos((i / 8) * Math.PI * 2) * 30,
                Math.cos((i / 8) * Math.PI * 2 + Math.PI) * 30,
                Math.cos((i / 8) * Math.PI * 2) * 30,
              ],
              y: [
                Math.sin((i / 8) * Math.PI * 2) * 30,
                Math.sin((i / 8) * Math.PI * 2 + Math.PI) * 30,
                Math.sin((i / 8) * Math.PI * 2) * 30,
              ],
              scale: [0.8 + i * 0.1, 1.2 - i * 0.08, 0.8 + i * 0.1],
            }}
            transition={{
              duration: 4 + i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

export function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentSlide, setCurrentSlide] = useState(0);
  const {
    total: targetCount,
    last24h,
    remaining,
    viewingNow,
    ready: countersReady,
  } = useLiveCounters();
  const [count, setCount] = useState(0);
  const hasCountedUpRef = useRef(false);
  const [nftCount, setNftCount] = useState(0);
  const nftTargetCount = 1629;
  const [isIntelOpen, setIsIntelOpen] = useState(false);
  const [transmitEmail, setTransmitEmail] = useState("");
  const [transmitName, setTransmitName] = useState("");
  const [isTransmitSubmitting, setIsTransmitSubmitting] = useState(false);

  const [primaryEmail, setPrimaryEmail] = useState("");
  const [primaryName, setPrimaryName] = useState("");
  const [isPrimarySubmitting, setIsPrimarySubmitting] = useState(false);

  const handlePrimarySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!primaryEmail) return;
    setIsPrimarySubmitting(true);
    const result = await submitSignup({
      email: primaryEmail,
      ...(primaryName && { firstName: primaryName }),
      signupSource: "final_cta_primary",
    });
    if (result.ok && result.profile) {
      trackSignupEvent("waitlist_join_success", {
        source: "final_cta_primary",
        status: result.status,
        emailDomain: getEmailDomain(primaryEmail),
      });
      showSignupToast({
        variant: "success",
        message: `You're in, member ${result.profile.operativeNumber}. Check your inbox.`,
      });
      setPrimaryEmail("");
      setPrimaryName("");
      setTimeout(() => scrollToSection("manifesto"), 300);
    } else {
      trackSignupEvent("waitlist_join_failed", {
        source: "final_cta_primary",
        status: result.status,
        reason: result.error ?? "upstream_rejected",
        emailDomain: getEmailDomain(primaryEmail),
      });
      showSignupToast({
        variant: "error",
        message:
          result.status === 0
            ? "Network issue. Please try again in a moment."
            : "Join failed. Please try again.",
      });
    }
    setIsPrimarySubmitting(false);
  };

  const handleTransmitSubmit = async () => {
    if (!transmitEmail) return;
    setIsTransmitSubmitting(true);
    const result = await submitSignup({
      email: transmitEmail,
      ...(transmitName && { firstName: transmitName }),
      signupSource: "amplify_viral_loops",
    });
    if (result.ok && result.profile) {
      trackSignupEvent("waitlist_join_success", {
        source: "amplify_viral_loops",
        status: result.status,
        emailDomain: getEmailDomain(transmitEmail),
      });
      showSignupToast({
        variant: "success",
        message: `Access code transmitted, member ${result.profile.operativeNumber}. Check your inbox.`,
      });
      setTransmitName("");
      setTransmitEmail("");
    } else {
      trackSignupEvent("waitlist_join_failed", {
        source: "amplify_viral_loops",
        status: result.status,
        reason: result.error ?? "upstream_rejected",
        emailDomain: getEmailDomain(transmitEmail),
      });
      showSignupToast({
        variant: "error",
        message:
          result.status === 0
            ? "Network issue. Please try again in a moment."
            : "Join failed. Please try again.",
      });
    }
    setIsTransmitSubmitting(false);
  };

  // Countdown to July 14th, 2026 - Planetary Sync Event
  const [daysRemaining, setDaysRemaining] = useState(0);

  useEffect(() => {
    const calculateDaysRemaining = () => {
      const launchDate = new Date("2026-07-14T00:00:00");
      const now = new Date();
      const diffTime = launchDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysRemaining(diffDays > 0 ? diffDays : 0);
    };

    calculateDaysRemaining();
    const interval = setInterval(calculateDaysRemaining, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(interval);
  }, []);

  // Counter: count up from 0 to the real total on first reveal, then track
  // live signups directly (each realtime bump just ticks the number, no replay).
  useEffect(() => {
    if (!isInView || !countersReady) return;
    if (hasCountedUpRef.current) {
      setCount(targetCount);
      return;
    }
    hasCountedUpRef.current = true;
    if (targetCount <= 0) {
      setCount(0);
      return;
    }
    let start = 0;
    const duration = 2000;
    const increment = targetCount / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= targetCount) {
        setCount(targetCount);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, countersReady, targetCount]);

  // NFT Counter animation
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = nftTargetCount / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= nftTargetCount) {
        setNftCount(nftTargetCount);
        clearInterval(timer);
      } else {
        setNftCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView]);

  const nftImages = [
    {
      url: "/images/iNlpKmp.webp",
      name: "Luno",
      rarity: "ARCHETYPE",
    },
    {
      url: "/images/wwWEBds.webp",
      name: "Vespara",
      rarity: "ARCHETYPE",
    },
    { url: "/images/rNpkyRW.webp", name: "Cipher", rarity: "RARE" },
    { url: "/images/lNQFzkJ.webp", name: "Nova", rarity: null },
    { url: "/images/jVBBgud.webp", name: "Zenith", rarity: "RARE" },
    { url: "/images/6ww6nzp.webp", name: "Rift", rarity: null },
    { url: "/images/c8nCGNy.webp", name: "Pulsar", rarity: "RARE" },
    { url: "/images/YmYGdcf.webp", name: "Catalyst", rarity: null },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % nftImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [nftImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % nftImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + nftImages.length) % nftImages.length);
  };

  return (
    <section
      ref={ref}
      className="py-32 md:py-40 bg-black relative overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34, 211, 238, 0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.7) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* SECTION 1: SECURE YOUR POSITION */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 relative"
        >
          {/* Archetype Silhouette Background */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: "url(/images/07axSRl.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center 30%",
              backgroundRepeat: "no-repeat",
              opacity: 0.45,
              filter: "blur(0.5px)",
            }}
          />

          <div className="flex flex-wrap items-center justify-center gap-3 mb-6 relative z-10">
            <div
              className="px-4 py-1.5 border border-cyan-500/30 rounded-full text-xs font-mono tracking-wider"
              style={{ color: "#00FFFF" }}
            >
              RESERVE FOUNDER ACCESS
            </div>

            <IntelButton
              variant="red"
              onClick={(e) => {
                e.stopPropagation();
                // Dispatch event to open neural briefing with optimized human briefing
                window.dispatchEvent(
                  new CustomEvent("openNeuralBriefing", {
                    detail: { briefingId: "optimizedHuman" },
                  }),
                );
              }}
              onMouseEnter={() => {
                // Dispatch custom event to trigger Neural Briefing attention with specific briefing
                window.dispatchEvent(
                  new CustomEvent("neuralBriefingTrigger", {
                    detail: { active: true, briefingId: "optimizedHuman" },
                  }),
                );
              }}
              onMouseLeave={() => {
                // Dispatch custom event to stop Neural Briefing attention
                window.dispatchEvent(
                  new CustomEvent("neuralBriefingTrigger", {
                    detail: { active: false, briefingId: "optimizedHuman" },
                  }),
                );
              }}
            />
          </div>

          <motion.h2
            className="text-5xl md:text-7xl mb-6 text-white leading-tight relative z-20 text-center"
            animate={{
              filter: [
                "drop-shadow(0 0 30px rgba(34, 211, 238, 0.8))",
                "drop-shadow(0 0 20px rgba(34, 211, 238, 0.4))",
                "drop-shadow(0 0 30px rgba(34, 211, 238, 0.8))",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="mb-2">Join the</div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.span
                className="relative inline-flex items-center gap-2 px-4 md:px-6 py-2 bg-gradient-to-r from-cyan-500/20 via-cyan-500/10 to-cyan-500/20 border border-cyan-400/50 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  className="absolute inset-0 rounded-full bg-cyan-400/20 blur-lg"
                  animate={{
                    scale: [0.95, 1.05, 0.95],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.span
                  className="relative text-5xl md:text-7xl font-bold"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(34, 211, 238, 0.4)",
                      "0 0 40px rgba(34, 211, 238, 0.8)",
                      "0 0 20px rgba(34, 211, 238, 0.4)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  +1
                </motion.span>
                <span
                  className="relative text-4xl md:text-6xl"
                  style={{ color: "#00FFFF" }}
                >
                  You
                </span>
              </motion.span>
              <motion.span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #22d3ee 0%, #3b82f6 25%, #22d3ee 50%, #3b82f6 75%, #22d3ee 100%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "200% 0%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                Movement
              </motion.span>
            </div>
          </motion.h2>

          {/* Pre-Launch Status Progress Bar */}
          <div className="max-w-md mx-auto mb-8 relative z-10">
            <div className="h-16"></div>
          </div>

          <div className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-8 leading-relaxed relative z-10">
            <motion.p
              className="text-white font-bold font-mono text-xl md:text-2xl tracking-wide text-center"
              animate={{
                textShadow: [
                  "0 0 20px rgba(34, 211, 238, 0.6)",
                  "0 0 30px rgba(34, 211, 238, 0.8)",
                  "0 0 20px rgba(34, 211, 238, 0.6)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              The afternoon crash is a system failure.{" "}
              <span className="text-cyan-400">Secure your antidote.</span>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    scale: 1,
                    boxShadow: [
                      "0 0 30px rgba(251, 146, 60, 0.4)",
                      "0 0 60px rgba(251, 146, 60, 0.8)",
                      "0 0 30px rgba(251, 146, 60, 0.4)",
                    ],
                  }
                : {}
            }
            transition={{
              duration: 0.6,
              delay: 0.3,
              boxShadow: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="relative inline-flex items-center gap-3 bg-gradient-to-r from-neutral-900/80 via-orange-950/40 to-neutral-900/80 backdrop-blur-md border-2 border-orange-500/60 rounded-full px-5 py-3 md:px-8 md:py-4 mb-12 overflow-hidden"
          >
            {/* Animated cosmic background sweep */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"
              animate={{
                x: ["-200%", "200%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Enhanced pulsing indicator with dual rings */}
            <div className="relative flex h-4 w-4 md:h-5 md:w-5 z-10 flex-shrink-0">
              <motion.span
                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"
                animate={{
                  scale: [1, 2.5],
                  opacity: [0.75, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-orange-500/50 blur-md"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.span
                className="relative inline-flex rounded-full h-full w-full bg-gradient-to-br from-orange-400 to-orange-600"
                animate={{
                  boxShadow: [
                    "0 0 10px rgba(251, 146, 60, 0.6)",
                    "0 0 25px rgba(251, 146, 60, 1)",
                    "0 0 10px rgba(251, 146, 60, 0.6)",
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            <div className="relative flex flex-col md:flex-row md:items-center gap-1 md:gap-2 z-10">
              <span className="text-xs md:text-sm text-white font-mono">
                hydrbrew° launches in {daysRemaining} days
              </span>
              <span className="hidden md:inline text-white/50">•</span>
              <span className="text-xs md:text-sm text-white font-mono">
                07.14.2026 // Supermoon New Moon
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Email Capture Form Container */}
        <motion.div
          id="protocol-claim-position"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="relative">
            <div
              className="absolute -inset-1 rounded-3xl blur-xl opacity-50"
              style={{
                background:
                  "linear-gradient(to right, #00FFFF, #00FFFF, #00FFFF)",
              }}
            ></div>
            <div className="relative bg-gradient-to-br from-neutral-900 via-neutral-900 to-cyan-950/20 rounded-3xl p-8 md:p-12 border border-cyan-500/40 overflow-hidden">
              {/* Grid background */}
              <div className="absolute inset-0 opacity-5">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
              </div>

              {/* Glow orbs */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>

              {/* Live viewers badge */}
              <div className="absolute top-4 right-4 bg-emerald-500/10 border border-emerald-500/50 rounded-lg px-3 py-2 backdrop-blur-sm hidden md:flex z-10">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Eye className="w-4 h-4 text-emerald-400" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-xs font-mono">
                    <span className="text-emerald-400 font-bold tabular-nums">
                      {viewingNow}
                    </span>
                    <span className="text-emerald-400/60 ml-1">
                      viewing now
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-black/60 border border-cyan-500/50 rounded-full mb-4 backdrop-blur-sm"
                  >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span
                      className="text-xs md:text-sm font-mono tracking-wider"
                      style={{ color: "#00FFFF" }}
                    >
                      LIVE STATUS
                    </span>
                  </motion.div>

                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                    Initialize Your Protocol
                  </h3>

                  <p className="text-neutral-400 text-base md:text-base max-w-2xl mx-auto">
                    Be the first to activate the{" "}
                    <span className="font-bold text-white">+1</span>{" "}
                    <span className="font-bold" style={{ color: "#00FFFF" }}>
                      You
                    </span>{" "}
                    when we launch.
                  </p>
                </div>

                {/* Counter */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-cyan-400" />
                    <span className="text-xs md:text-sm text-cyan-400 font-mono tracking-wider">
                      PROTOCOL POSITIONS SECURED
                    </span>
                  </div>

                  <motion.div
                    className="text-6xl md:text-7xl lg:text-8xl font-mono text-white mb-3 tabular-nums font-bold"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(34, 211, 238, 0.3)",
                        "0 0 30px rgba(34, 211, 238, 0.5)",
                        "0 0 20px rgba(34, 211, 238, 0.3)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {count.toLocaleString()}
                  </motion.div>

                  <div className="flex items-center justify-center gap-3 flex-wrap mb-2">
                    <div className="flex items-center gap-2 text-emerald-400 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/30">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs md:text-sm font-mono">
                        +{last24h.toLocaleString()} in last 24h
                      </span>
                    </div>
                    <div className="text-sm md:text-sm text-neutral-500 font-mono">
                      {remaining.toLocaleString()} positions remaining
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mb-8"></div>

                {/* Benefits */}
                <div className="bg-black/40 rounded-2xl p-6 md:p-8 border border-cyan-500/30 mb-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          background: "rgba(0, 255, 255, 0.2)",
                          border: "2px solid #00FFFF",
                          boxShadow:
                            "0 0 20px rgba(0, 255, 255, 0.6), inset 0 0 15px rgba(0, 255, 255, 0.2)",
                        }}
                      >
                        <Zap
                          className="w-6 h-6"
                          style={{
                            color: "#00FFFF",
                            filter:
                              "drop-shadow(0 0 4px rgba(0, 255, 255, 0.8))",
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-white mb-2">
                        Sign Up To Claim Your Spot
                      </h4>
                      <p className="text-base md:text-sm text-neutral-400">
                        Lock in your founding member status and calibrate your
                        baseline before the public launch.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Early Product Discounts",
                        desc: "Unlock Pre-Purchase Discounts",
                      },
                      {
                        title: "Multiplier Awards",
                        desc: "Refer 2 Members → Unlock Rewards",
                        isClickable: true,
                      },
                    ].map((benefit, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-3 ${benefit.isClickable ? "cursor-pointer group" : ""}`}
                        onClick={
                          benefit.isClickable
                            ? () => {
                                const awardsSection = document.querySelector(
                                  '[data-section="multiplier-awards"]',
                                );
                                const isMobile = window.innerWidth < 768;
                                awardsSection?.scrollIntoView({
                                  behavior: "smooth",
                                  block: isMobile ? "start" : "center",
                                });
                              }
                            : undefined
                        }
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${benefit.isClickable ? "bg-purple-400 group-hover:bg-purple-300" : ""}`}
                          style={
                            !benefit.isClickable
                              ? {
                                  backgroundColor: "#00FFFF",
                                  boxShadow:
                                    "0 0 8px rgba(0, 255, 255, 0.8), 0 0 12px rgba(0, 255, 255, 0.4)",
                                }
                              : {}
                          }
                        ></div>
                        <div>
                          {benefit.title === "Multiplier Awards" ? (
                            <div className="relative mb-1 inline-block">
                              <p className="text-sm font-bold text-purple-300 group-hover:text-purple-200 underline decoration-dotted relative z-10">
                                {benefit.title}
                              </p>
                              <motion.div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                  background:
                                    "linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.4) 50%, transparent 100%)",
                                  filter: "blur(8px)",
                                }}
                                animate={{
                                  x: ["-200%", "200%"],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: "linear",
                                  repeatDelay: 1,
                                }}
                              />
                            </div>
                          ) : (
                            <p
                              className={`text-sm font-medium mb-1 ${benefit.isClickable ? "text-purple-300 group-hover:text-purple-200 underline decoration-dotted" : "text-white"}`}
                            >
                              {benefit.title}
                            </p>
                          )}
                          <p className="text-neutral-500 text-sm md:text-xs">
                            {benefit.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form */}
                <div className="mb-6">
                  <form className="w-full" onSubmit={handlePrimarySubmit}>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="text"
                          placeholder="Name"
                          value={primaryName}
                          onChange={(e) => setPrimaryName(e.target.value)}
                          disabled={isPrimarySubmitting}
                          className="flex-1 px-4 py-3 bg-neutral-800/80 border-2 border-cyan-500/40 rounded-lg text-white placeholder:text-neutral-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all shadow-[0_0_20px_rgba(6,182,212,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <input
                          type="email"
                          placeholder="your.email@protocol.com"
                          value={primaryEmail}
                          onChange={(e) => setPrimaryEmail(e.target.value)}
                          disabled={isPrimarySubmitting}
                          required
                          className="flex-1 px-4 py-3 bg-neutral-800/80 border-2 border-cyan-500/40 rounded-lg text-white placeholder:text-neutral-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all shadow-[0_0_20px_rgba(6,182,212,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isPrimarySubmitting}
                        className="w-full px-8 py-4 md:py-5 relative text-black rounded-lg transition-colors group whitespace-nowrap overflow-hidden flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                        style={{ backgroundColor: "#00FFFF" }}
                        onMouseEnter={(e) =>
                          !isPrimarySubmitting &&
                          (e.currentTarget.style.backgroundColor = "#00CCCC")
                        }
                        onMouseLeave={(e) =>
                          !isPrimarySubmitting &&
                          (e.currentTarget.style.backgroundColor = "#00FFFF")
                        }
                      >
                        {/* Border glow */}
                        <motion.div
                          className="absolute inset-0 rounded-lg"
                          style={{
                            border: "2px solid rgba(34, 211, 238, 0.6)",
                          }}
                          animate={{
                            boxShadow: [
                              "0 0 20px rgba(34, 211, 238, 0.6), 0 0 20px rgba(34, 211, 238, 0.3) inset",
                              "0 0 30px rgba(34, 211, 238, 0.8), 0 0 30px rgba(34, 211, 238, 0.4) inset",
                              "0 0 20px rgba(34, 211, 238, 0.6), 0 0 20px rgba(34, 211, 238, 0.3) inset",
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />

                        {/* Corner brackets */}
                        <div
                          className="absolute w-6 h-6"
                          style={{
                            inset: "0 auto auto 0",
                            borderTop: "2px solid rgba(34, 211, 238, 0.9)",
                            borderLeft: "2px solid rgba(34, 211, 238, 0.9)",
                          }}
                        />
                        <div
                          className="absolute w-6 h-6"
                          style={{
                            inset: "0 0 auto auto",
                            borderTop: "2px solid rgba(34, 211, 238, 0.9)",
                            borderRight: "2px solid rgba(34, 211, 238, 0.9)",
                          }}
                        />
                        <div
                          className="absolute w-6 h-6"
                          style={{
                            inset: "auto auto 0 0",
                            borderBottom: "2px solid rgba(34, 211, 238, 0.9)",
                            borderLeft: "2px solid rgba(34, 211, 238, 0.9)",
                          }}
                        />
                        <div
                          className="absolute w-6 h-6"
                          style={{
                            inset: "auto 0 0 auto",
                            borderBottom: "2px solid rgba(34, 211, 238, 0.9)",
                            borderRight: "2px solid rgba(34, 211, 238, 0.9)",
                          }}
                        />

                        <div className="relative z-10 flex items-center justify-center gap-2 w-full">
                          <span className="font-mono tracking-wide text-base md:text-lg font-bold">
                            {isPrimarySubmitting ? "Submitting..." : "Initialize your Position"}
                          </span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Path Separator Divider */}
      <PathSeparator />

      {/* SECTION 2: PROTOCOL AMPLIFICATION - TRANSMIT THE SIGNAL */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          id="referral"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mb-16 relative mt-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6 relative">
            <div
              className="px-4 py-1.5 border border-cyan-500/30 rounded-full text-xs font-mono tracking-wider"
              style={{ color: "#00FFFF" }}
            >
              PROTOCOL AMPLIFICATION
            </div>

            <IntelButton
              variant="red"
              onClick={(e) => {
                e.stopPropagation();
                window.dispatchEvent(
                  new CustomEvent("openNeuralBriefing", {
                    detail: { briefingId: "transmitTheSignal" },
                  }),
                );
              }}
              onMouseEnter={() => {
                window.dispatchEvent(
                  new CustomEvent("neuralBriefingTrigger", {
                    detail: { active: true, briefingId: "transmitTheSignal" },
                  }),
                );
              }}
              onMouseLeave={() => {
                window.dispatchEvent(
                  new CustomEvent("neuralBriefingTrigger", {
                    detail: { active: false, briefingId: "transmitTheSignal" },
                  }),
                );
              }}
            />
          </div>

          <FloatingAvatar
            imageSrc="/images/vRKtmNC.webp"
            position="side"
          />

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white relative"
            animate={{
              textShadow: [
                "0 0 20px rgba(34, 211, 238, 0.5)",
                "0 0 40px rgba(34, 211, 238, 0.8), 0 0 80px rgba(34, 211, 238, 0.4)",
                "0 0 20px rgba(34, 211, 238, 0.5)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Transmit the Signal
          </motion.h2>

          <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto">
            A collective of high-output architects, already in flow.
          </p>

          {/* Falling signal beams */}
          <div
            className="absolute left-0 right-0 top-full pointer-events-none z-20"
            style={{ height: "600px" }}
          >
            {[20, 35, 50, 65, 80].map((left, i) => (
              <motion.div
                key={`beam-${i}`}
                className="absolute w-1 bg-gradient-to-b from-cyan-400 via-cyan-500 to-transparent rounded-full"
                style={{
                  left: `${left}%`,
                  height: "80px",
                  boxShadow:
                    "0 0 12px rgba(34, 211, 238, 1), 0 0 24px rgba(34, 211, 238, 0.6)",
                }}
                animate={{
                  y: [-100, 600],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.3,
                }}
              />
            ))}
            {[12, 28, 42, 58, 72, 88].map((left, i) => (
              <motion.div
                key={`beam-small-${i}`}
                className="absolute w-0.5 bg-gradient-to-b from-cyan-400/70 via-cyan-500/70 to-transparent rounded-full"
                style={{
                  left: `${left}%`,
                  height: "50px",
                  boxShadow: "0 0 8px rgba(34, 211, 238, 0.7)",
                }}
                animate={{
                  y: [-80, 600],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.4 + 0.5,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="hidden md:grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16"
        >
          {[
            {
              text: "I like how it's smoother and it's not spiking cortisol and making jitters and I'm confident in the fact that it won't affect my sleep!",
              name: "Kate D.",
              role: "Survey Respondent",
            },
            {
              text: "I so desperately want to drink cold brew, but I get caffeine shakes and can't sleep, yet I love the flavor.",
              name: "Terri H.",
              role: "Survey Respondent",
            },
            {
              text: "Ditching coffee for this in the afternoon.  This is what I wanted caffeine to be all along.",
              name: "Jordan L.",
              role: "Survey Respondent",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-6"
            >
              <Zap className="w-6 h-6 mb-4" style={{ color: "#00FFFF" }} />
              <p className="text-neutral-300 mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="text-sm">
                <p className="text-white">{testimonial.name}</p>
                <p className="text-neutral-500 text-base md:text-sm">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Network Multiplier Dashboard - Sovereign Technical */}
        <motion.div
          data-section="multiplier-awards"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-12 md:mt-16"
        >
          <div className="relative max-w-6xl mx-auto">
            {/* Outer glow effect */}
            <motion.div
              className="absolute -inset-0.5 bg-gradient-to-b from-cyan-500/20 via-cyan-500/5 to-transparent rounded-sm blur-md"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Main Container - Obsidian with Glassmorphism */}
            <div
              className="relative bg-[#0B0B0B]/95 backdrop-blur-md border border-[#00FFFF] rounded-sm p-6 md:p-12 lg:p-16 overflow-hidden"
              style={{
                boxShadow:
                  "0 0 1px rgba(0, 255, 255, 0.5), inset 0 0 60px rgba(0, 255, 255, 0.02)",
              }}
            >
              {/* Background image */}
              <div className="absolute inset-0 opacity-20">
                <img
                  src="/images/kGmaCL7.webp"
                  alt="Background"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Animated grid background */}
              <div className="absolute inset-0 opacity-[0.03]">
                <div
                  className="absolute inset-0 opacity-40 md:opacity-100"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
              </div>

              {/* Floating data particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
                  style={{
                    left: `${10 + i * 12}%`,
                    top: "20%",
                  }}
                  animate={{
                    y: [0, -100, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "linear",
                  }}
                />
              ))}

              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-cyan-400/40" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-cyan-400/40" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-cyan-400/40" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-cyan-400/40" />

              {/* Header Section with timestamp */}
              <div className="relative z-10 text-center mb-10 md:mb-16">
                <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-cyan-400/50" />
                  <div className="text-[9px] md:text-[10px] text-cyan-400/60 font-mono tracking-widest">
                    System Uplink // 2026
                  </div>
                  <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-cyan-400/50" />
                </div>

                <motion.h3
                  className="text-2xl md:text-4xl lg:text-5xl text-white mb-4 md:mb-6 tracking-[0.1em] md:tracking-[0.2em] uppercase px-4"
                  style={{ fontFamily: "Urbanist, system-ui, sans-serif" }}
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(0, 255, 255, 0)",
                      "0 0 20px rgba(0, 255, 255, 0.3)",
                      "0 0 20px rgba(0, 255, 255, 0)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  NETWORK MULTIPLIER
                </motion.h3>

                <p
                  className="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed px-4 font-mono font-bold tracking-wide"
                  style={{
                    color: "#00FFFF",
                    textShadow:
                      "0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.3)",
                  }}
                >
                  Refer 2 Members → Unlock Rewards
                </p>
              </div>

              {/* Divider */}
              <div className="relative mb-10 md:mb-16">
                <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
                <motion.div
                  className="absolute top-0 left-0 h-px w-32 bg-gradient-to-r from-cyan-400 to-transparent"
                  animate={{
                    x: ["-100%", "600%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>

              {/* Progress System - Redesigned */}
              <div className="relative mb-10 md:mb-16">
                {/* Tier Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8">
                  {[
                    {
                      level: "INITIALIZED",
                      count: 0,
                      reward: null,
                      icon: "circle",
                      active: false,
                    },
                    {
                      level: "PRINCIPAL",
                      count: 2,
                      reward: "25% Discount Applied",
                      icon: "circle",
                      active: false,
                    },
                    {
                      level: "SOVEREIGN",
                      count: 5,
                      reward: "30% Discount Applied",
                      icon: "delta",
                      active: false,
                    },
                    {
                      level: "ELITE",
                      count: 10,
                      reward: "30% Lifetime Access",
                      icon: "delta",
                      active: true,
                    },
                  ].map((tier, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 1.5 + i * 0.1 }}
                      whileHover={{
                        y: -4,
                        scale: 1.02,
                      }}
                      className="group relative bg-gradient-to-br from-cyan-600/10 via-black/50 to-black/60 backdrop-blur-md rounded-lg p-5 md:p-6 transition-all cursor-pointer overflow-hidden"
                      style={{ border: "2px solid #00FFFF" }}
                    >
                      {/* Active indicator */}
                      {tier.active && (
                        <div className="absolute -top-2 -right-2">
                          <motion.div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: "#00FFFF" }}
                            animate={{
                              boxShadow: [
                                "0 0 10px rgba(0, 255, 255, 0.8)",
                                "0 0 20px rgba(0, 255, 255, 1)",
                                "0 0 10px rgba(0, 255, 255, 0.8)",
                              ],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        </div>
                      )}

                      {/* Content - Vertical Centered Layout */}
                      <div className="relative z-10 text-center">
                        {/* Minimalist Glyph */}
                        <div className="flex justify-center mb-3 md:mb-4">
                          <motion.div
                            animate={
                              tier.active
                                ? {
                                    scale: [1, 1.1, 1],
                                  }
                                : {}
                            }
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            {tier.icon === "circle" ? (
                              <svg
                                width="32"
                                height="32"
                                viewBox="0 0 40 40"
                                fill="none"
                                className="md:w-10 md:h-10"
                              >
                                <circle
                                  cx="20"
                                  cy="20"
                                  r="15"
                                  stroke="#00FFFF"
                                  strokeWidth="1.5"
                                  fill="none"
                                  opacity="0.7"
                                />
                                <circle
                                  cx="20"
                                  cy="20"
                                  r="9"
                                  stroke="#00FFFF"
                                  strokeWidth="1.5"
                                  fill="none"
                                  className="group-hover:opacity-100 opacity-50 transition-opacity"
                                />
                              </svg>
                            ) : (
                              <svg
                                width="32"
                                height="32"
                                viewBox="0 0 40 40"
                                fill="none"
                                className="md:w-10 md:h-10"
                              >
                                <path
                                  d="M20 5L33 35H7L20 5Z"
                                  stroke="#00FFFF"
                                  strokeWidth="1.5"
                                  fill="none"
                                  opacity="0.7"
                                />
                                <path
                                  d="M20 15L26 27H14L20 15Z"
                                  stroke="#00FFFF"
                                  strokeWidth="1.5"
                                  fill="none"
                                  className="group-hover:opacity-100 opacity-50 transition-opacity"
                                />
                              </svg>
                            )}
                          </motion.div>
                        </div>

                        {/* Level Info */}
                        <div className="space-y-1.5 md:space-y-2">
                          <div className="text-sm md:text-base text-white font-mono tracking-wider font-bold">
                            {tier.level}
                          </div>
                          <div
                            className="text-base md:text-lg font-mono tracking-wide font-bold"
                            style={{ color: "#00FFFF" }}
                          >
                            {tier.count}
                            {tier.count === 10 ? "+" : ""} Referrals
                          </div>
                          {tier.reward && (
                            <div
                              className="text-[11px] md:text-xs font-mono leading-tight font-medium pt-1 md:pt-2"
                              style={{ color: "#00FFFF" }}
                            >
                              {tier.reward}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Horizontal Linear Progress Bar */}
                <div className="relative h-px bg-neutral-800/50">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-cyan-400"
                    initial={{ width: "0%" }}
                    animate={isInView ? { width: "0%" } : { width: "0%" }}
                    transition={{ duration: 1.5, delay: 1.8 }}
                    style={{
                      boxShadow: "0 0 10px rgba(0, 255, 255, 0.8)",
                    }}
                  />

                  {/* Animated scan line */}
                  <motion.div
                    className="absolute top-0 h-px w-16 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    animate={{
                      x: ["-64px", "100%"],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 2,
                    }}
                  />

                  {/* Position Markers */}
                  {[0, 33.33, 66.66, 100].map((pos, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 border border-cyan-400/60 rounded-full"
                      style={{
                        left: `${pos}%`,
                        backgroundColor:
                          i === 0
                            ? "rgba(0, 255, 255, 0.3)"
                            : "rgba(11, 11, 11, 0.9)",
                      }}
                      animate={
                        i === 0
                          ? {
                              boxShadow: [
                                "0 0 5px rgba(0, 255, 255, 0.5)",
                                "0 0 15px rgba(0, 255, 255, 1)",
                                "0 0 5px rgba(0, 255, 255, 0.5)",
                              ],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Referral Card - Glassmorphism */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 2 }}
                className="relative bg-[#0B0B0B]/60 backdrop-blur-xl border border-[#00FFFF] rounded-sm p-6 md:p-8 lg:p-10 mb-4 md:mb-6"
                style={{
                  boxShadow:
                    "0 0 1px rgba(0, 255, 255, 0.3), inset 0 0 40px rgba(0, 255, 255, 0.03)",
                }}
              >
                {/* Scan line effect */}
                <motion.div
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
                  animate={{
                    scaleX: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2.5,
                  }}
                />

                <p className="text-neutral-300 text-xs md:text-sm lg:text-base leading-relaxed mb-6 md:mb-8 text-center max-w-xl mx-auto px-2">
                  Amplify the{" "}
                  <span className="font-mono" style={{ color: "#00FFFF" }}>
                    signal
                  </span>{" "}
                  to unlock permanent performance tiers for your stack.
                </p>

                {/* Name and Email Inputs */}
                <div className="max-w-2xl mx-auto mb-6 flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    value={transmitName}
                    onChange={(e) => setTransmitName(e.target.value)}
                    disabled={isTransmitSubmitting}
                    placeholder="Your Name"
                    className="flex-1 px-4 md:px-5 py-3 md:py-4 bg-black/80 rounded-lg text-white placeholder:text-neutral-500 font-mono transition-all text-sm md:text-base"
                    style={{
                      border: "2px solid #00FFFF",
                      boxShadow:
                        "0 0 20px rgba(0, 255, 255, 0.3), inset 0 0 10px rgba(0, 255, 255, 0.05)",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 0 30px rgba(0, 255, 255, 0.6), inset 0 0 20px rgba(0, 255, 255, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 0 20px rgba(0, 255, 255, 0.3), inset 0 0 10px rgba(0, 255, 255, 0.05)";
                    }}
                  />
                  <input
                    type="email"
                    value={transmitEmail}
                    onChange={(e) => setTransmitEmail(e.target.value)}
                    disabled={isTransmitSubmitting}
                    placeholder="your_email@protocol.com"
                    className="flex-1 px-4 md:px-5 py-3 md:py-4 bg-black/80 rounded-lg text-white placeholder:text-neutral-500 font-mono transition-all text-sm md:text-base"
                    style={{
                      border: "2px solid #00FFFF",
                      boxShadow:
                        "0 0 20px rgba(0, 255, 255, 0.3), inset 0 0 10px rgba(0, 255, 255, 0.05)",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 0 30px rgba(0, 255, 255, 0.6), inset 0 0 20px rgba(0, 255, 255, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 0 20px rgba(0, 255, 255, 0.3), inset 0 0 10px rgba(0, 255, 255, 0.05)";
                    }}
                  />
                </div>

                {/* CTA Button */}
                <button
                  type="button"
                  onClick={handleTransmitSubmit}
                  disabled={isTransmitSubmitting}
                  className="w-full px-6 md:px-8 py-3 md:py-4 lg:py-5 relative text-black rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(34,211,238,0.8)] group whitespace-nowrap overflow-hidden flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#00FFFF" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#00CCCC")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#00FFFF")
                  }
                >
                  {/* Border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-lg group-hover:opacity-100"
                    style={{
                      border: "2px solid rgba(34, 211, 238, 0.6)",
                    }}
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(34, 211, 238, 0.6), 0 0 20px rgba(34, 211, 238, 0.3) inset",
                        "0 0 30px rgba(34, 211, 238, 0.8), 0 0 30px rgba(34, 211, 238, 0.4) inset",
                        "0 0 20px rgba(34, 211, 238, 0.6), 0 0 20px rgba(34, 211, 238, 0.3) inset",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Corner brackets */}
                  <div
                    className="absolute w-6 h-6 transition-all duration-300 group-hover:w-8 group-hover:h-8"
                    style={{
                      inset: "0 auto auto 0",
                      borderTop: "2px solid rgba(34, 211, 238, 0.9)",
                      borderLeft: "2px solid rgba(34, 211, 238, 0.9)",
                    }}
                  />
                  <div
                    className="absolute w-6 h-6 transition-all duration-300 group-hover:w-8 group-hover:h-8"
                    style={{
                      inset: "0 0 auto auto",
                      borderTop: "2px solid rgba(34, 211, 238, 0.9)",
                      borderRight: "2px solid rgba(34, 211, 238, 0.9)",
                    }}
                  />
                  <div
                    className="absolute w-6 h-6 transition-all duration-300 group-hover:w-8 group-hover:h-8"
                    style={{
                      inset: "auto auto 0 0",
                      borderBottom: "2px solid rgba(34, 211, 238, 0.9)",
                      borderLeft: "2px solid rgba(34, 211, 238, 0.9)",
                    }}
                  />
                  <div
                    className="absolute w-6 h-6 transition-all duration-300 group-hover:w-8 group-hover:h-8"
                    style={{
                      inset: "auto 0 0 auto",
                      borderBottom: "2px solid rgba(34, 211, 238, 0.9)",
                      borderRight: "2px solid rgba(34, 211, 238, 0.9)",
                    }}
                  />

                  <div className="relative z-10 flex items-center justify-center gap-2 w-full">
                    <span className="font-mono tracking-wide text-sm md:text-base lg:text-lg font-bold">
                      {isTransmitSubmitting ? "Transmitting..." : "Transmit Access Code"}
                    </span>
                    {!isTransmitSubmitting && (
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    )}
                  </div>
                </button>
              </motion.div>

              {/* HUD Status Line with animated elements */}
              <div className="relative flex flex-col sm:flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: "#00FFFF",
                      boxShadow:
                        "0 0 8px rgba(0, 255, 255, 0.8), 0 0 12px rgba(0, 255, 255, 0.4)",
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <p
                    className="text-[9px] md:text-[10px] text-neutral-600 font-mono"
                    style={{ fontFamily: "Roboto Mono, monospace" }}
                  >
                    SYSTEM ACTIVE
                  </p>
                </div>

                <motion.p
                  className="text-[9px] md:text-[10px] text-neutral-600 font-mono text-center sm:text-right"
                  style={{ fontFamily: "Roboto Mono, monospace" }}
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  // STATUS: GENERATING UNIQUE UPLINK... [98% CALIBRATED]
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
