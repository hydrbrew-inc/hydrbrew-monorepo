import { motion } from "motion/react";

export function BenefitsTicker() {
  const tickerContent =
    "NEURAL STABILIZATION // HRV FLOW // AFTERNOON CLARITY // CELLULAR RECOVERY // RITUALIZED // + 1 YOU // ";

  return (
    <div className="relative h-[70px] md:h-[40px] bg-black/80 border-y border-cyan-500/20 overflow-hidden mt-32">
      {/* Subtle background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                           linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Known System BUGS Bridge */}
      <div className="relative h-full flex items-center px-2 md:px-8">
        {/* Left glowing red square */}
        <div
          className="w-1 h-1 bg-red-500 absolute left-2 md:left-4"
          style={{ backgroundColor: "#FF4B4B", boxShadow: "0 0 6px #FF4B4B" }}
        />

        {/* Horizontal line */}
        <div className="absolute left-2 right-2 md:left-4 md:right-4 h-[1px] bg-red-500/30" />

        {/* Three evenly spaced status nodes */}
        <div className="relative w-full flex flex-col md:flex-row justify-center md:justify-evenly items-center gap-1 md:gap-0 py-1">
          <div
            className="md:hidden text-[11px] font-mono text-center mb-1 relative z-10"
            style={{
              fontFamily: "Roboto Mono, monospace",
              color: "#FF4B4B",
              fontWeight: 600,
            }}
          >
            STATUS:
          </div>
          <div className="flex flex-row flex-wrap justify-center md:justify-evenly items-center gap-1 md:gap-0 w-full relative z-10">
            {/* Warning 1: Moderate glow */}
            <motion.span
              className="font-mono text-center whitespace-nowrap px-2 py-1 rounded"
              style={{
                fontFamily: "Roboto Mono, monospace",
                color: "#FF4B4B",
                lineHeight: "1.2",
              }}
              animate={{
                textShadow: [
                  "0 0 8px rgba(255, 75, 75, 0.8), 0 0 12px rgba(255, 75, 75, 0.4)",
                  "0 0 16px rgba(255, 75, 75, 1), 0 0 24px rgba(255, 75, 75, 0.8)",
                  "0 0 8px rgba(255, 75, 75, 0.8), 0 0 12px rgba(255, 75, 75, 0.4)",
                ],
                filter: [
                  "drop-shadow(0 0 4px rgba(255, 75, 75, 0.6))",
                  "drop-shadow(0 0 8px rgba(255, 75, 75, 1))",
                  "drop-shadow(0 0 4px rgba(255, 75, 75, 0.6))",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0,
              }}
            >
              <span className="text-[11px] md:hidden">[ 2PM FOG ]</span>
              <span className="hidden md:inline text-[13px]">
                [ STATUS: 2PM BRAIN FOG ]
              </span>
            </motion.span>

            {/* Warning 2: Stronger glow */}
            <motion.span
              className="font-mono text-center whitespace-nowrap px-2 py-1 rounded"
              style={{
                fontFamily: "Roboto Mono, monospace",
                color: "#FF4B4B",
                lineHeight: "1.2",
              }}
              animate={{
                textShadow: [
                  "0 0 12px rgba(255, 75, 75, 0.9), 0 0 18px rgba(255, 75, 75, 0.6)",
                  "0 0 20px rgba(255, 75, 75, 1), 0 0 32px rgba(255, 75, 75, 0.9)",
                  "0 0 12px rgba(255, 75, 75, 0.9), 0 0 18px rgba(255, 75, 75, 0.6)",
                ],
                filter: [
                  "drop-shadow(0 0 6px rgba(255, 75, 75, 0.8))",
                  "drop-shadow(0 0 12px rgba(255, 75, 75, 1))",
                  "drop-shadow(0 0 6px rgba(255, 75, 75, 0.8))",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            >
              <span className="text-[11px] md:hidden">[ JITTER LOOP ]</span>
              <span className="hidden md:inline text-[13px]">
                [ STATUS: COFFEE JITTER LOOP ]
              </span>
            </motion.span>

            {/* Warning 3: Maximum critical glow */}
            <motion.span
              className="font-mono text-center whitespace-nowrap px-2 py-1 rounded"
              style={{
                fontFamily: "Roboto Mono, monospace",
                color: "#FF4B4B",
                lineHeight: "1.2",
              }}
              animate={{
                textShadow: [
                  "0 0 16px rgba(255, 75, 75, 1), 0 0 24px rgba(255, 75, 75, 0.8)",
                  "0 0 28px rgba(255, 75, 75, 1), 0 0 40px rgba(255, 75, 75, 1), 0 0 50px rgba(255, 75, 75, 0.8)",
                  "0 0 16px rgba(255, 75, 75, 1), 0 0 24px rgba(255, 75, 75, 0.8)",
                ],
                filter: [
                  "drop-shadow(0 0 8px rgba(255, 75, 75, 0.9))",
                  "drop-shadow(0 0 16px rgba(255, 75, 75, 1)) drop-shadow(0 0 20px rgba(255, 75, 75, 1))",
                  "drop-shadow(0 0 8px rgba(255, 75, 75, 0.9))",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
            >
              <span className="text-[11px] md:hidden">[ SYSTEM CRASH ]</span>
              <span className="hidden md:inline text-[13px]">
                [ STATUS: AFTERNOON SYSTEM CRASH ]
              </span>
            </motion.span>
          </div>
        </div>

        {/* Right glowing red square */}
        <div
          className="w-1 h-1 bg-red-500 absolute right-2 md:right-4"
          style={{ backgroundColor: "#FF4B4B", boxShadow: "0 0 6px #FF4B4B" }}
        />
      </div>
    </div>
  );
}
