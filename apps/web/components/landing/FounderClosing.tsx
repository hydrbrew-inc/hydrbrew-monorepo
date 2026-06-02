import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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

export function FounderClosing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 md:py-32 overflow-hidden">
      {/* Dark background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40 md:from-black/70 md:via-black/50 md:to-black/70" />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center md:bg-fixed"
          style={{
            backgroundImage: "url(/images/opC81Wx.webp)",
            opacity: 0.5,
          }}
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Subtle red glow on left */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 blur-[120px] rounded-full" />

      {/* Subtle cyan glow on right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Terminal-style header */}
          <div className="mb-8 md:mb-12">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "auto" } : {}}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="inline-block overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center gap-2 bg-black/80 px-4 py-2 rounded font-mono text-xs md:text-sm"
                  style={{ border: "1px solid #00FFFF" }}
                >
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <span style={{ color: "#00FFFF" }}>
                    BRIEFING_CONCLUDED.TXT
                  </span>
                </div>
                <IntelButton
                  variant="red"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.dispatchEvent(
                      new CustomEvent("openNeuralBriefing", {
                        detail: { briefingId: "founderClosing" },
                      }),
                    );
                  }}
                  onMouseEnter={() => {
                    window.dispatchEvent(
                      new CustomEvent("neuralBriefingTrigger", {
                        detail: { active: true, briefingId: "founderClosing" },
                      }),
                    );
                  }}
                  onMouseLeave={() => {
                    window.dispatchEvent(
                      new CustomEvent("neuralBriefingTrigger", {
                        detail: { active: false, briefingId: "founderClosing" },
                      }),
                    );
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Main content box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    scale: 1,
                  }
                : {}
            }
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            {/* Main container */}
            <div
              className="relative bg-black/50 backdrop-blur-md rounded-lg overflow-hidden"
              style={{ border: "2px solid #00FFFF" }}
            >
              {/* Top accent line */}
              <div className="h-px" style={{ backgroundColor: "#00FFFF" }} />

              <div className="p-6 md:p-8">
                {/* Statement text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="mb-6"
                >
                  <p className="text-base md:text-lg leading-relaxed text-neutral-300 mb-3">
                    <span className="font-mono" style={{ color: "#00FFFF" }}>
                      Briefing concluded.
                    </span>{" "}
                    Thanks for visiting{" "}
                    <span style={{ color: "#00FFFF" }}>hydr</span>
                    <span className="text-white">brew°</span>. You've breached
                    the perimeter of the{" "}
                    <span style={{ color: "#00FFFF" }}>
                      +1 Human experience
                    </span>
                    . It's time to move into the high-fidelity reality of{" "}
                    <span className="text-white font-medium">
                      total optimization
                    </span>
                    . The{" "}
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-xs"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(0, 255, 255, 0.2), rgba(0, 255, 255, 0.2))",
                        border: "1px solid rgba(0, 255, 255, 0.3)",
                        color: "#00FFFF",
                      }}
                    >
                      +1 You
                    </span>
                    .
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-neutral-300 mb-3">
                    Don't just watch the future—
                    <span className="text-red-400 font-medium">
                      arbitrage it
                    </span>
                    .
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-neutral-300">
                    <span style={{ color: "#00FFFF" }}>
                      Stay sharp. Stay optimized.
                    </span>
                  </p>
                </motion.div>

                {/* Founders Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-6 justify-items-center"
                >
                  {/* Founder 1 - Louis Caverly */}
                  <div className="flex flex-col items-center gap-4">
                    {/* Founder Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 1.4 }}
                      className="relative"
                    >
                      {/* Badge glow */}
                      <motion.div
                        className="absolute -inset-3 rounded-full blur-xl"
                        style={{ backgroundColor: "rgba(0, 255, 255, 0.2)" }}
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      {/* Badge container */}
                      <div
                        className="relative w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden bg-neutral-900/50 backdrop-blur-sm"
                        style={{ border: "2px solid rgba(0, 255, 255, 0.5)" }}
                      >
                        <ImageWithFallback
                          src="/images/KIVrOVW.webp"
                          alt="Louis Caverly"
                          className="w-full h-full object-cover object-[center_30%]"
                        />
                      </div>

                      {/* +1 badge in 4 pm position */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: 1.6 }}
                        className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4"
                      >
                        <div className="relative">
                          {/* +1 badge glow */}
                          <motion.div
                            className="absolute -inset-1 rounded-full blur-md"
                            style={{
                              backgroundColor: "rgba(0, 255, 255, 0.3)",
                            }}
                            animate={{
                              opacity: [0.4, 0.8, 0.4],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                          {/* +1 badge */}
                          <div
                            className="relative flex items-center gap-1 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg"
                            style={{
                              background:
                                "linear-gradient(to right, #00FFFF, #00CCCC)",
                              border: "2px solid rgba(0, 255, 255, 0.6)",
                              boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
                            }}
                          >
                            <span className="font-mono text-sm font-bold text-black">
                              +1
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Signature */}
                    <div className="flex flex-col items-center gap-3 mt-2">
                      <div className="relative">
                        {/* Signature glow effect */}
                        <motion.div
                          animate={{
                            opacity: [0.2, 0.4, 0.2],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute inset-0 blur-lg"
                          style={{ backgroundColor: "rgba(0, 255, 255, 0.3)" }}
                        />
                        <ImageWithFallback
                          src="/images/a339hLi.webp"
                          alt="Louis Caverly Signature"
                          className="relative h-24 md:h-32 w-auto brightness-0 invert opacity-100"
                        />
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <div
                          className="h-px w-16 mb-2"
                          style={{
                            background:
                              "linear-gradient(to right, transparent, #00FFFF, transparent)",
                          }}
                        />
                        <p className="text-white font-medium text-base">
                          Louis Caverly
                        </p>
                        <p
                          className="font-mono text-xs tracking-wider"
                          style={{ color: "#00FFFF" }}
                        >
                          CO-FOUNDER
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Founder 2 - Fawne Caverly */}
                  <div className="flex flex-col items-center gap-4">
                    {/* Founder Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 1.5 }}
                      className="relative"
                    >
                      {/* Badge glow */}
                      <motion.div
                        className="absolute -inset-3 rounded-full blur-xl"
                        style={{ backgroundColor: "rgba(0, 255, 255, 0.2)" }}
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      {/* Badge container */}
                      <div
                        className="relative w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden bg-neutral-900/50 backdrop-blur-sm"
                        style={{ border: "2px solid rgba(0, 255, 255, 0.5)" }}
                      >
                        <ImageWithFallback
                          src="/images/foWY70O.webp"
                          alt="Fawne Caverly"
                          className="w-full h-full object-cover object-[center_30%]"
                        />
                      </div>

                      {/* +1 badge in 4 pm position */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: 1.7 }}
                        className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4"
                      >
                        <div className="relative">
                          {/* +1 badge glow */}
                          <motion.div
                            className="absolute -inset-1 rounded-full blur-md"
                            style={{
                              backgroundColor: "rgba(0, 255, 255, 0.3)",
                            }}
                            animate={{
                              opacity: [0.4, 0.8, 0.4],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                          {/* +1 badge */}
                          <div
                            className="relative flex items-center gap-1 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg"
                            style={{
                              background:
                                "linear-gradient(to right, #00FFFF, #00CCCC)",
                              border: "2px solid rgba(0, 255, 255, 0.6)",
                              boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
                            }}
                          >
                            <span className="font-mono text-sm font-bold text-black">
                              +1
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Signature */}
                    <div className="flex flex-col items-center gap-3 mt-2">
                      <div className="relative">
                        {/* Signature glow effect */}
                        <motion.div
                          animate={{
                            opacity: [0.2, 0.4, 0.2],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute inset-0 blur-lg"
                          style={{ backgroundColor: "rgba(0, 255, 255, 0.3)" }}
                        />
                        <ImageWithFallback
                          src="/images/5Y6M3fG.webp"
                          alt="Fawne Caverly Signature"
                          className="relative h-24 md:h-32 w-auto brightness-0 invert opacity-100"
                        />
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <div
                          className="h-px w-16 mb-2"
                          style={{
                            background:
                              "linear-gradient(to right, transparent, #00FFFF, transparent)",
                          }}
                        />
                        <p className="text-white font-medium text-base">
                          Fawne Caverly
                        </p>
                        <p
                          className="font-mono text-xs tracking-wider"
                          style={{ color: "#00FFFF" }}
                        >
                          CO-FOUNDER
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Origin Story Tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.3 }}
                  className="mb-6"
                >
                  <div
                    className="relative bg-black/80 backdrop-blur-sm rounded px-6 py-4"
                    style={{ border: "1px solid rgba(0, 255, 255, 0.4)" }}
                  >
                    {/* Title */}
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div
                        className="h-px w-8"
                        style={{
                          background:
                            "linear-gradient(to right, transparent, rgba(0, 255, 255, 0.5))",
                        }}
                      />
                      <span
                        className="font-mono text-xs tracking-wider"
                        style={{ color: "#00FFFF" }}
                      >
                        [ ORIGIN STORY ]
                      </span>
                      <div
                        className="h-px w-8"
                        style={{
                          background:
                            "linear-gradient(to left, transparent, rgba(0, 255, 255, 0.5))",
                        }}
                      />
                    </div>
                    {/* Copy */}
                    <p className="text-neutral-300 text-sm md:text-base leading-relaxed text-center max-w-3xl mx-auto">
                      <span style={{ color: "#00FFFF" }}>hydr</span>
                      <span className="text-white font-medium">brew°</span> was
                      architected in Leucadia, California, by Louis and Fawne
                      Caverly to solve a single system failure: the{" "}
                      <span style={{ color: "#00FFFF" }}>
                        afternoon volatility of the high-output human
                      </span>
                      . What began as a private protocol for founders and
                      biohackers is now being initialized for the collective.
                      <br />
                      We don't build drinks;{" "}
                      <span
                        className="font-medium"
                        style={{ color: "#00FFFF" }}
                      >
                        we build the substrate for your evolution
                      </span>
                      .
                    </p>
                  </div>
                </motion.div>

                {/* Leucadia Map */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="relative"
                >
                  <div
                    className="relative bg-black/80 rounded-lg p-4 overflow-hidden"
                    style={{ border: "2px solid #00FFFF" }}
                  >
                    {/* Grid background */}
                    <div className="absolute inset-0 opacity-10">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)",
                          backgroundSize: "20px 20px",
                        }}
                      />
                    </div>

                    <div className="relative flex flex-col md:flex-row items-center gap-6">
                      {/* Map visualization */}
                      <div className="relative w-full md:w-1/2 aspect-square max-w-[280px]">
                        {/* Stylized map container */}
                        <div
                          className="absolute inset-0 rounded-lg overflow-hidden"
                          style={{
                            border: "2px solid rgba(0, 255, 255, 0.3)",
                            background:
                              "linear-gradient(to bottom right, rgba(0, 255, 255, 0.05), rgba(0, 0, 0, 0.4))",
                          }}
                        >
                          {/* Actual map background */}
                          <div className="absolute inset-0">
                            <iframe
                              src="https://www.openstreetmap.org/export/embed.html?bbox=-117.3217%2C33.0544%2C-117.2817%2C33.0744&layer=mapnik&marker=33.0644%2C-117.3017"
                              className="w-full h-full opacity-30 grayscale contrast-125 brightness-75"
                              style={{ border: "none", pointerEvents: "none" }}
                              title="Leucadia Map"
                              loading="lazy"
                            />
                          </div>

                          {/* Dark overlay to blend with cyberpunk theme */}
                          <div className="absolute inset-0 bg-black/60" />

                          {/* Coordinate grid lines */}
                          <svg
                            className="absolute inset-0 w-full h-full z-10"
                            viewBox="0 0 200 200"
                          >
                            {/* Horizontal lines */}
                            {[0, 1, 2, 3, 4].map((i) => (
                              <line
                                key={`h-${i}`}
                                x1="0"
                                y1={40 + i * 30}
                                x2="200"
                                y2={40 + i * 30}
                                stroke="rgba(6, 182, 212, 0.15)"
                                strokeWidth="0.5"
                              />
                            ))}
                            {/* Vertical lines */}
                            {[0, 1, 2, 3, 4].map((i) => (
                              <line
                                key={`v-${i}`}
                                x1={40 + i * 30}
                                y1="0"
                                x2={40 + i * 30}
                                y2="200"
                                stroke="rgba(6, 182, 212, 0.15)"
                                strokeWidth="0.5"
                              />
                            ))}

                            {/* Center crosshair */}
                            <circle
                              cx="100"
                              cy="100"
                              r="3"
                              fill="rgb(239, 68, 68)"
                              className="animate-pulse"
                            />
                            <circle
                              cx="100"
                              cy="100"
                              r="12"
                              fill="none"
                              stroke="rgb(239, 68, 68)"
                              strokeWidth="1.5"
                              opacity="0.6"
                            />
                            <circle
                              cx="100"
                              cy="100"
                              r="20"
                              fill="none"
                              stroke="rgb(239, 68, 68)"
                              strokeWidth="1"
                              opacity="0.3"
                            />

                            {/* Animated scanning line */}
                            <motion.line
                              x1="100"
                              y1="0"
                              x2="100"
                              y2="200"
                              stroke="rgba(6, 182, 212, 0.4)"
                              strokeWidth="1"
                              initial={{ x1: 0, x2: 0 }}
                              animate={{ x1: 200, x2: 200 }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                          </svg>

                          {/* Pulsing glow effect at center */}
                          <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-500/30 rounded-full blur-md"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        </div>
                      </div>

                      {/* Location info with arrow */}
                      <div className="relative flex-1 flex flex-col items-center md:items-start gap-3">
                        {/* Arrow pointing to map */}
                        <svg
                          className="hidden md:block absolute -left-12 top-1/2 -translate-y-1/2 w-8 h-8 text-red-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>

                        {/* Mobile arrow (pointing up) */}
                        <svg
                          className="md:hidden w-8 h-8 text-red-400 -mb-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M12 19V5M5 12l7-7 7 7" />
                        </svg>

                        <div className="text-center md:text-left">
                          <motion.p
                            className="text-red-400 font-mono text-lg md:text-xl font-medium mb-2"
                            animate={{
                              opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            FOUNDED HERE
                          </motion.p>
                          <p className="text-white font-medium text-base md:text-lg mb-1">
                            Leucadia, California
                          </p>
                          <div
                            className="font-mono text-xs md:text-sm space-y-0.5"
                            style={{ color: "#00FFFF" }}
                          >
                            <p>33.0644° N</p>
                            <p>117.3017° W</p>
                          </div>
                          <div className="mt-3 flex items-center gap-2 text-neutral-400 font-mono text-xs">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                            <span>Origin Point: Verified</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Terminal Uplink Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="flex justify-center mt-16"
          >
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-8 py-4 relative text-black rounded-xl transition-colors group"
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
                className="absolute inset-0 rounded-xl"
                style={{
                  border: "2px solid rgba(0, 255, 255, 0.6)",
                }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(0, 255, 255, 0.6), 0 0 20px rgba(0, 255, 255, 0.3) inset",
                    "0 0 30px rgba(0, 255, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.4) inset",
                    "0 0 20px rgba(0, 255, 255, 0.6), 0 0 20px rgba(0, 255, 255, 0.3) inset",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative z-10 flex items-center justify-center gap-2">
                <span className="font-mono tracking-wide text-base font-bold">
                  Return to Top
                </span>
                <svg
                  className="w-4 h-4 group-hover:-translate-y-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </div>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
