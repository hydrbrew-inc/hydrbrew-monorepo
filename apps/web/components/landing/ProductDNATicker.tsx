import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function ProductDNATicker() {
  const [isShopHovered, setIsShopHovered] = useState(false);

  // Listen for hover events from the Shop card
  useEffect(() => {
    const handleShopHover = (e: CustomEvent) => {
      setIsShopHovered(e.detail.isHovered);
    };

    window.addEventListener("shopCardHover", handleShopHover as EventListener);
    return () =>
      window.removeEventListener(
        "shopCardHover",
        handleShopHover as EventListener,
      );
  }, []);

  const tickerContent =
    "ALKALINE BASE // LOW CAFFEINE SUBSTRATE // L-THEANINE ACTIVATION // LION'S MANE CATALYST // SUB-THRESHOLD GLYCEMIC LOAD // SYSTEM SYNC: 100% // ";

  return (
    <div className="relative w-screen left-[50%] right-[50%] -mx-[50vw] h-[100px] bg-black/80 border-y border-cyan-500/20 overflow-hidden">
      {/* Subtle background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                           linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Glow effect when Shop card is hovered */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
        animate={{
          opacity: isShopHovered ? [0.3, 0.6, 0.3] : 0,
          x: isShopHovered ? ["0%", "100%"] : "0%",
        }}
        transition={{
          opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 3, repeat: Infinity, ease: "linear" },
        }}
      />

      {/* Scrolling ticker text */}
      <div className="relative h-full flex items-center py-5">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: [0, "-50%"],
          }}
          transition={{
            duration: isShopHovered ? 25.2 : 42, // Slowed by 20%
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Repeat the content twice for seamless loop */}
          <span className="px-12 flex items-center gap-6">
            <motion.span
              className="font-bold uppercase text-[#00FFFF]"
              style={{
                fontFamily: "Space Grotesk, system-ui, sans-serif",
                fontSize: "36px",
                letterSpacing: "3px",
                textShadow: "0 0 2px #00FFFF, 0 0 8px #00FFFF50",
              }}
              animate={{
                opacity: [0.85, 1, 0.85],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              THE AFTERNOON TAX: REPROGRAMMED
            </motion.span>
            <motion.span
              className="text-[#00FFFF]"
              style={{ fontSize: "clamp(16px, 2vw, 32px)" }}
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              •
            </motion.span>
            <span
              className="font-light text-neutral-300"
              style={{
                fontFamily: "Inter, Helvetica, sans-serif",
                fontSize: "20px",
              }}
            >
              Sustainable focus starts here
            </span>
            <span
              className="text-[#00FFFF]/40"
              style={{ fontSize: "clamp(16px, 2vw, 32px)" }}
            >
              |
            </span>

            <motion.span
              className="font-bold uppercase text-[#00FFFF]"
              style={{
                fontFamily: "Space Grotesk, system-ui, sans-serif",
                fontSize: "36px",
                letterSpacing: "3px",
                textShadow: "0 0 2px #00FFFF, 0 0 8px #00FFFF50",
              }}
              animate={{
                opacity: [0.85, 1, 0.85],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            >
              NEURAL SYNC
            </motion.span>
            <motion.span
              className="text-[#00FFFF]"
              style={{ fontSize: "clamp(16px, 2vw, 32px)" }}
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            >
              •
            </motion.span>
            <span
              className="font-light text-neutral-300"
              style={{
                fontFamily: "Inter, Helvetica, sans-serif",
                fontSize: "20px",
              }}
            >
              Zero jitter. Zero systemic debt.
            </span>
            <span
              className="text-[#00FFFF]/40"
              style={{ fontSize: "clamp(16px, 2vw, 32px)" }}
            >
              |
            </span>

            <motion.span
              className="font-bold uppercase text-[#00FFFF]"
              style={{
                fontFamily: "Space Grotesk, system-ui, sans-serif",
                fontSize: "36px",
                letterSpacing: "3px",
                textShadow: "0 0 2px #00FFFF, 0 0 8px #00FFFF50",
              }}
              animate={{
                opacity: [0.85, 1, 0.85],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
            >
              BYPASS THE CRASH
            </motion.span>
            <motion.span
              className="text-[#00FFFF]"
              style={{ fontSize: "clamp(16px, 2vw, 32px)" }}
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
            >
              •
            </motion.span>
            <span
              className="font-light text-neutral-300"
              style={{
                fontFamily: "Inter, Helvetica, sans-serif",
                fontSize: "20px",
              }}
            >
              Engineer the Exit.
            </span>
            <span
              className="text-[#00FFFF]/40"
              style={{ fontSize: "clamp(16px, 2vw, 32px)" }}
            >
              |
            </span>

            <motion.span
              className="font-bold uppercase text-[#00FFFF]"
              style={{
                fontFamily: "Space Grotesk, system-ui, sans-serif",
                fontSize: "36px",
                letterSpacing: "3px",
                textShadow: "0 0 2px #00FFFF, 0 0 8px #00FFFF50",
              }}
              animate={{
                opacity: [0.85, 1, 0.85],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.9,
              }}
            >
              THE +1 YOU
            </motion.span>
            <motion.span
              className="text-[#00FFFF]"
              style={{ fontSize: "clamp(16px, 2vw, 32px)" }}
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.9,
              }}
            >
              •
            </motion.span>
            <span
              className="font-light text-neutral-300"
              style={{
                fontFamily: "Inter, Helvetica, sans-serif",
                fontSize: "20px",
              }}
            >
              The ritual you crave, rebuilt for the future.
            </span>
          </span>

          {/* Duplicate for seamless loop */}
          <span className="px-12 flex items-center gap-6">
            <motion.span
              className="font-bold uppercase text-[#00FFFF]"
              style={{
                fontFamily: "Space Grotesk, system-ui, sans-serif",
                fontSize: "36px",
                letterSpacing: "3px",
                textShadow: "0 0 2px #00FFFF, 0 0 8px #00FFFF50",
              }}
              animate={{
                opacity: [0.85, 1, 0.85],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              THE AFTERNOON TAX: REPROGRAMMED
            </motion.span>
            <motion.span
              className="text-[#00FFFF]"
              style={{ fontSize: "clamp(16px, 2vw, 32px)" }}
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              •
            </motion.span>
            <span
              className="font-light text-neutral-300"
              style={{
                fontFamily: "Inter, Helvetica, sans-serif",
                fontSize: "20px",
              }}
            >
              Sustainable focus starts here
            </span>
            <span
              className="text-[#00FFFF]/40"
              style={{ fontSize: "clamp(16px, 2vw, 32px)" }}
            >
              |
            </span>

            <motion.span
              className="font-bold uppercase text-[#00FFFF]"
              style={{
                fontFamily: "Space Grotesk, system-ui, sans-serif",
                fontSize: "36px",
                letterSpacing: "3px",
                textShadow: "0 0 2px #00FFFF, 0 0 8px #00FFFF50",
              }}
              animate={{
                opacity: [0.85, 1, 0.85],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            >
              NEURAL SYNC
            </motion.span>
            <motion.span
              className="text-[#00FFFF]"
              style={{ fontSize: "clamp(16px, 2vw, 32px)" }}
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            >
              •
            </motion.span>
            <span
              className="font-light text-neutral-300"
              style={{
                fontFamily: "Inter, Helvetica, sans-serif",
                fontSize: "20px",
              }}
            >
              Zero jitter. Zero systemic debt.
            </span>
            <span
              className="text-[#00FFFF]/40"
              style={{ fontSize: "clamp(16px, 2vw, 32px)" }}
            >
              |
            </span>

            <motion.span
              className="font-bold uppercase text-[#00FFFF]"
              style={{
                fontFamily: "Space Grotesk, system-ui, sans-serif",
                fontSize: "36px",
                letterSpacing: "3px",
                textShadow: "0 0 2px #00FFFF, 0 0 8px #00FFFF50",
              }}
              animate={{
                opacity: [0.85, 1, 0.85],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
            >
              BYPASS THE CRASH
            </motion.span>
            <motion.span
              className="text-[#00FFFF]"
              style={{ fontSize: "clamp(16px, 2vw, 32px)" }}
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
            >
              •
            </motion.span>
            <span
              className="font-light text-neutral-300"
              style={{
                fontFamily: "Inter, Helvetica, sans-serif",
                fontSize: "20px",
              }}
            >
              Engineer the Exit.
            </span>
            <span
              className="text-[#00FFFF]/40"
              style={{ fontSize: "clamp(16px, 2vw, 32px)" }}
            >
              |
            </span>

            <motion.span
              className="font-bold uppercase text-[#00FFFF]"
              style={{
                fontFamily: "Space Grotesk, system-ui, sans-serif",
                fontSize: "36px",
                letterSpacing: "3px",
                textShadow: "0 0 2px #00FFFF, 0 0 8px #00FFFF50",
              }}
              animate={{
                opacity: [0.85, 1, 0.85],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.9,
              }}
            >
              THE +1 YOU
            </motion.span>
            <motion.span
              className="text-[#00FFFF]"
              style={{ fontSize: "clamp(16px, 2vw, 32px)" }}
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.9,
              }}
            >
              •
            </motion.span>
            <span
              className="font-light text-neutral-300"
              style={{
                fontFamily: "Inter, Helvetica, sans-serif",
                fontSize: "20px",
              }}
            >
              The ritual you crave, rebuilt for the future.
            </span>
          </span>
        </motion.div>
      </div>

      {/* Progress bar indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1px]"
        style={{
          transformOrigin: "left",
          background:
            "linear-gradient(to right, transparent, #00FFFF, transparent)",
        }}
        animate={{
          scaleX: isShopHovered ? [0, 1] : 0,
          opacity: isShopHovered ? [0.5, 1, 0.5] : 0,
        }}
        transition={{
          scaleX: { duration: 3, repeat: Infinity, ease: "linear" },
          opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      />
    </div>
  );
}
