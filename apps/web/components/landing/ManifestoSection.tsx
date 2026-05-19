import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { TrendingUp, Activity } from "lucide-react";
import { subscribeToOuraKlaviyoList } from "@repo/lib/klaviyo";
import {
  getEmailDomain,
  showSignupToast,
  trackSignupEvent,
} from "./signupFlow";

// Animated Number Counter Component
function AnimatedCounter({
  from,
  to,
  duration,
  delay,
  isInView,
}: {
  from: number;
  to: number;
  duration: number;
  delay: number;
  isInView: boolean;
}) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, { duration, delay, ease: "easeOut" });

      const unsubscribe = rounded.on("change", (latest) => {
        setDisplayValue(latest);
      });

      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [isInView, count, rounded, to, duration, delay]);

  return <>{displayValue}</>;
}

export function ManifestoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isOuraExpanded, setIsOuraExpanded] = useState(false);

  const manifestoLines = [
    "Heaviness → lightness.",
    "Jitter → smooth.",
    "Crash → sustained.",
    "Anxiety → flow.",
    "Depletion → recovery.",
    "Compromise → optimization.",
  ];

  const typewriterText = {
    line1:
      "Every sip is a choice. Between the old paradigm — jittery, depleting, heavy — and the new.",
    line2:
      "hydrbrew° isn't coffee. It's Functional Iced Coffee, rebuilt from first principles for modern cognition.",
    line3: "+1 You. The future of performance hydration starts here.",
  };

  const fullText = `${typewriterText.line1} ${typewriterText.line2} ${typewriterText.line3}`;

  // Typewriter effect
  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      if (typewriterIndex < fullText.length) {
        setTypewriterIndex(typewriterIndex + 1);
      }
    }, 20); // Speed: 20ms per character

    return () => clearTimeout(timer);
  }, [isInView, typewriterIndex, fullText.length]);

  // Helper to get visible text and check if we're in a specific section
  const getVisibleText = (targetText: string, startIndex: number) => {
    const endIndex = startIndex + targetText.length;
    const currentVisible = typewriterIndex - startIndex;

    if (currentVisible <= 0) return "";
    if (currentVisible >= targetText.length) return targetText;
    return targetText.substring(0, currentVisible);
  };

  // Helper to render text with highlighted spans for special phrases
  const renderLine2 = () => {
    const visibleText = getVisibleText(typewriterText.line2, line2Start);
    const phrase = "Functional Iced Coffee";
    const phraseIndex = typewriterText.line2.indexOf(phrase);

    if (visibleText.length <= phraseIndex) {
      return visibleText;
    }

    const beforePhrase = typewriterText.line2.substring(0, phraseIndex);
    const afterPhrase = typewriterText.line2.substring(
      phraseIndex + phrase.length,
    );

    const visibleBeforePhrase = visibleText.substring(0, phraseIndex);
    const visiblePhrase = visibleText.substring(
      phraseIndex,
      Math.min(visibleText.length, phraseIndex + phrase.length),
    );
    const visibleAfterPhrase =
      visibleText.length > phraseIndex + phrase.length
        ? visibleText.substring(phraseIndex + phrase.length)
        : "";

    return (
      <>
        {visibleBeforePhrase}
        {visiblePhrase && (
          <span className="text-cyan-400">{visiblePhrase}</span>
        )}
        {visibleAfterPhrase}
      </>
    );
  };

  const renderLine3 = () => {
    const visibleText = getVisibleText(typewriterText.line3, line3Start);
    const phrase = "+1 You.";
    const phraseIndex = typewriterText.line3.indexOf(phrase);

    if (visibleText.length <= phraseIndex) {
      return visibleText;
    }

    const visibleBeforePhrase = visibleText.substring(0, phraseIndex);
    const visiblePhrase = visibleText.substring(
      phraseIndex,
      Math.min(visibleText.length, phraseIndex + phrase.length),
    );
    const visibleAfterPhrase =
      visibleText.length > phraseIndex + phrase.length
        ? visibleText.substring(phraseIndex + phrase.length)
        : "";

    return (
      <>
        {visibleBeforePhrase}
        {visiblePhrase && (
          <span className="text-cyan-400">{visiblePhrase}</span>
        )}
        {visibleAfterPhrase}
      </>
    );
  };

  const line1Start = 0;
  const line2Start = typewriterText.line1.length + 1;
  const line3Start = line2Start + typewriterText.line2.length + 1;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !name) {
      showSignupToast({
        variant: "error",
        message: "Please enter both name and email.",
      });
      return;
    }

    setIsSubmitting(true);

    const result = await subscribeToOuraKlaviyoList({
      email,
      first_name: name,
      signup_source: "manifesto_oura",
    });

    if (result.ok) {
      trackSignupEvent("waitlist_join_success", {
        source: "manifesto_oura",
        status: result.status,
        emailDomain: getEmailDomain(email),
      });
      showSignupToast({
        variant: "success",
        message: "You're in. Check your inbox.",
      });
      setShowSuccess(true);
      setName("");
      setEmail("");
      setTimeout(() => setShowSuccess(false), 5000);
    } else {
      trackSignupEvent("waitlist_join_failed", {
        source: "manifesto_oura",
        status: result.status,
        reason: "upstream_rejected",
        emailDomain: getEmailDomain(email),
      });
      showSignupToast({
        variant: "error",
        message: "Join failed. Please try again.",
      });
    }

    setIsSubmitting(false);
  };

  const metricsData = [
    {
      negative: "Heaviness",
      positive: "Lightness",
      negativeLevel: 78,
      positiveLevel: 92,
      description: "Physical sensation & mental clarity",
    },
    {
      negative: "Jitter",
      positive: "Smooth",
      negativeLevel: 82,
      positiveLevel: 89,
      description: "Nervous system stability",
    },
    {
      negative: "Crash",
      positive: "Sustained",
      negativeLevel: 85,
      positiveLevel: 94,
      description: "Energy curve maintenance",
    },
    {
      negative: "Anxiety",
      positive: "Flow",
      negativeLevel: 74,
      positiveLevel: 88,
      description: "Cognitive state optimization",
    },
    {
      negative: "Depletion",
      positive: "Recovery",
      negativeLevel: 80,
      positiveLevel: 91,
      description: "Cellular restoration rate",
    },
    {
      negative: "Compromise",
      positive: "Optimization",
      negativeLevel: 88,
      positiveLevel: 96,
      description: "Overall system performance",
    },
  ];

  const scrollToMetric = (index: number) => {
    const metricsSection = document.getElementById("metrics-section");
    if (metricsSection) {
      metricsSection.scrollIntoView({ behavior: "smooth", block: "center" });
      setHoveredMetric(index);
      setTimeout(() => setHoveredMetric(null), 2000);
    }
  };

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 lg:py-40 bg-neutral-950 relative overflow-hidden mt-12 md:mt-0"
    >
      {/* Background image */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1699560026178-22bcffa54a6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBob3Jpem9uJTIwZGVzZXJ0JTIwbWluaW1hbHxlbnwxfHx8fDE3NzEzNTg4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/80 to-neutral-950">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(34, 211, 238, 0.15) 0%, rgba(34, 211, 238, 0.05) 40%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center max-w-7xl mx-auto">
            {/* Left: Text Content (centered on mobile, left-aligned on desktop) */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
                <div
                  className="px-4 py-1.5 rounded-full text-xs font-mono tracking-wider"
                  style={{
                    border: "1px solid rgba(0, 255, 255, 0.3)",
                    color: "#00FFFF",
                  }}
                >
                  MANIFESTO
                </div>

                {/* Manifesto Intel Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.9 }
                  }
                  transition={{ duration: 0.3, delay: 0.2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Dispatch event to open neural briefing with manifesto briefing
                    window.dispatchEvent(
                      new CustomEvent("openNeuralBriefing", {
                        detail: { briefingId: "manifesto" },
                      }),
                    );
                  }}
                  onMouseEnter={() => {
                    // Dispatch custom event to trigger Neural Briefing attention with manifesto briefing
                    window.dispatchEvent(
                      new CustomEvent("neuralBriefingTrigger", {
                        detail: { active: true, briefingId: "manifesto" },
                      }),
                    );
                  }}
                  onMouseLeave={() => {
                    // Dispatch custom event to stop Neural Briefing attention
                    window.dispatchEvent(
                      new CustomEvent("neuralBriefingTrigger", {
                        detail: { active: false, briefingId: "manifesto" },
                      }),
                    );
                  }}
                  className="group/briefing flex items-center gap-2 px-3 py-2 bg-black/90 border border-red-500/50 hover:border-red-400 rounded-lg backdrop-blur-sm transition-all hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]"
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

              <h2 className="text-5xl md:text-7xl mb-8 text-white leading-tight">
                MEASURED. VERIFIED. OPTIMIZED.
              </h2>
            </div>

            {/* Right: +1 Optimized Human Character Visual (above on mobile) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="order-1 lg:order-2 flex justify-center lg:justify-end"
            >
              <div className="relative w-[200px] h-[200px] lg:w-[280px] lg:h-[280px] group/character">
                {/* Holographic glow effect */}
                <div
                  className="absolute -inset-2 rounded-full blur-xl opacity-60 group-hover/character:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(0, 255, 255, 0.3), rgba(168, 85, 247, 0.3), rgba(0, 255, 255, 0.3))",
                  }}
                />

                {/* Pulsing rings */}
                <div
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{
                    border: "2px solid rgba(0, 255, 255, 0.3)",
                    animationDuration: "3s",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ border: "1px solid rgba(0, 255, 255, 0.2)" }}
                />

                {/* Character image */}
                <div
                  className="relative w-full h-full rounded-full overflow-hidden"
                  style={{
                    border: "4px solid rgba(0, 255, 255, 0.5)",
                    boxShadow: "0 0 40px rgba(0, 255, 255, 0.4)",
                  }}
                >
                  <img
                    src="https://i.imgur.com/GiL99mI.png"
                    alt="+1 Optimized Human"
                    className="w-full h-full object-cover"
                  />

                  {/* Scanline overlay */}
                  <div
                    className="absolute inset-0 animate-pulse"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent, rgba(0, 255, 255, 0.1), transparent)",
                    }}
                  />
                </div>

                {/* +1 Badge */}
                <div
                  className="absolute bottom-0 right-0 -translate-x-1/4 -translate-y-1/4 text-black px-4 py-2 rounded-full font-bold text-sm border-4 border-black"
                  style={{
                    background:
                      "linear-gradient(to bottom right, #00FFFF, #00CCCC)",
                    boxShadow: "0 0 20px rgba(0, 255, 255, 0.8)",
                  }}
                >
                  +1
                </div>

                {/* Corner accents */}
                <div
                  className="absolute -top-1 -left-1 w-4 h-4"
                  style={{
                    borderLeft: "2px solid #00FFFF",
                    borderTop: "2px solid #00FFFF",
                  }}
                />
                <div
                  className="absolute -top-1 -right-1 w-4 h-4"
                  style={{
                    borderRight: "2px solid #00FFFF",
                    borderTop: "2px solid #00FFFF",
                  }}
                />
                <div
                  className="absolute -bottom-1 -left-1 w-4 h-4"
                  style={{
                    borderLeft: "2px solid #00FFFF",
                    borderBottom: "2px solid #00FFFF",
                  }}
                />
                <div
                  className="absolute -bottom-1 -right-1 w-4 h-4"
                  style={{
                    borderRight: "2px solid #00FFFF",
                    borderBottom: "2px solid #00FFFF",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-6 mb-16 relative bg-neutral-900/30 backdrop-blur-sm rounded-2xl p-8 md:p-10 overflow-hidden"
          style={{ border: "1px solid rgba(0, 255, 255, 0.2)" }}
        >
          {/* Corner scan brackets */}
          <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-cyan-400/40" />
          <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-cyan-400/40" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-cyan-400/40" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-cyan-400/40" />

          {/* Protocol header badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-emerald-500/40 rounded-full bg-emerald-500/5">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </div>
              <span className="text-xs text-emerald-400 font-mono tracking-widest">
                BIOMETRIC SANDBOX
              </span>
            </div>
          </motion.div>

          {/* Claims list */}
          <div className="relative z-10 space-y-6">
            {manifestoLines.map((line, index) => {
              const playClickSound = () => {
                try {
                  // Check if Web Audio API is available
                  if (
                    !window.AudioContext &&
                    !(window as any).webkitAudioContext
                  ) {
                    return;
                  }

                  // Create Web Audio API context
                  const audioContext = new (
                    window.AudioContext || (window as any).webkitAudioContext
                  )();

                  // Resume audio context if suspended (required by many browsers)
                  if (audioContext.state === "suspended") {
                    audioContext.resume().catch(() => {
                      // Silent fail if resume doesn't work
                    });
                  }

                  // Create oscillator for click sound
                  const oscillator = audioContext.createOscillator();
                  const gainNode = audioContext.createGain();

                  // Configure click sound (high-pitched, short burst)
                  oscillator.type = "sine";
                  oscillator.frequency.setValueAtTime(
                    1200,
                    audioContext.currentTime,
                  ); // High pitch

                  // Sharp attack and quick decay for "click" effect
                  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                  gainNode.gain.exponentialRampToValueAtTime(
                    0.01,
                    audioContext.currentTime + 0.05,
                  );

                  // Connect nodes
                  oscillator.connect(gainNode);
                  gainNode.connect(audioContext.destination);

                  // Play and stop
                  oscillator.start(audioContext.currentTime);
                  oscillator.stop(audioContext.currentTime + 0.05);
                } catch (error) {
                  // Silent fail - don't break the hover interaction if audio fails
                  console.debug("Audio playback not available");
                }
              };

              return (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  onClick={() => scrollToMetric(index)}
                  onMouseEnter={() => {
                    playClickSound();
                    setHoveredMetric(index);
                  }}
                  onMouseLeave={() => setHoveredMetric(null)}
                  className="group flex items-center gap-4 cursor-pointer relative"
                >
                  {/* Connection line indicator */}
                  <div
                    className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-0 rounded-full group-hover:h-full transition-all duration-300"
                    style={{
                      background:
                        "linear-gradient(to bottom, #00FFFF, rgb(16, 185, 129))",
                    }}
                  />

                  {/* Verification checkmark */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex-shrink-0"
                  >
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          stroke="rgb(16, 185, 129)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </motion.div>

                  <div className="hidden" />

                  <div className="flex-1 flex items-center justify-between group">
                    <p
                      className={`text-2xl md:text-3xl font-light tracking-wide font-mono transition-all duration-300 ${
                        hoveredMetric === index
                          ? "text-cyan-400 translate-x-2"
                          : "text-white"
                      }`}
                    >
                      {line}
                    </p>

                    {/* Mini waveform preview on hover */}
                    {hoveredMetric === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="hidden md:flex items-center gap-3 bg-neutral-900/90 backdrop-blur-sm rounded-lg px-4 py-2"
                        style={{ border: "1px solid rgba(0, 255, 255, 0.3)" }}
                      >
                        {/* Red chaotic waveform (COFFEE) */}
                        <div className="flex flex-col items-center gap-0.5">
                          <div className="w-16 h-6 bg-neutral-950/50 border border-red-500/20 rounded overflow-hidden">
                            <svg
                              width="100%"
                              height="100%"
                              viewBox="0 0 60 20"
                              preserveAspectRatio="none"
                            >
                              <motion.path
                                d="M0,10 L5,4 L10,14 L15,6 L20,16 L25,8 L30,12 L35,5 L40,11 L45,9 L50,14 L55,7 L60,10"
                                fill="none"
                                stroke="rgb(239, 68, 68)"
                                strokeWidth="1.5"
                                animate={{
                                  opacity: [0.5, 0.8, 0.5],
                                }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                              />
                            </svg>
                          </div>
                          <span className="text-[8px] text-red-400/60 font-mono">
                            COFFEE
                          </span>
                        </div>

                        {/* Arrow separator */}
                        <div className="text-neutral-600">→</div>

                        {/* Cyan smooth waveform (HYDRBREW) */}
                        <div className="flex flex-col items-center gap-0.5">
                          <div
                            className="w-16 h-6 bg-neutral-950/50 rounded overflow-hidden"
                            style={{
                              border: "1px solid rgba(0, 255, 255, 0.2)",
                            }}
                          >
                            <svg
                              width="100%"
                              height="100%"
                              viewBox="0 0 60 20"
                              preserveAspectRatio="none"
                            >
                              <path
                                d="M0,10 Q15,5 30,10 T60,10"
                                fill="none"
                                stroke="rgb(34, 211, 238)"
                                strokeWidth="2"
                                opacity="0.9"
                              />
                            </svg>
                          </div>
                          <span
                            className="text-[8px] font-mono"
                            style={{ color: "rgba(0, 255, 255, 0.6)" }}
                          >
                            hydrbrew°
                          </span>
                        </div>

                        {/* Sync indicator */}
                        <div className="flex flex-col items-center">
                          <TrendingUp className="w-3 h-3 text-cyan-400" />
                          <span className="text-[7px] text-cyan-400/60 font-mono">
                            SYNC
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Methodology footer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-8 pt-6 relative z-10"
            style={{ borderTop: "1px solid rgba(0, 255, 255, 0.1)" }}
          >
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-cyan-400/60">
              <div className="flex items-center gap-2">
                <div
                  className="w-1 h-1 rounded-full"
                  style={{ background: "#00FFFF" }}
                />
                <span>Oura Ring Gen 3</span>
              </div>
              <div
                className="hidden md:block w-px h-3"
                style={{ background: "rgba(0, 255, 255, 0.2)" }}
              />
              <div className="flex items-center gap-2">
                <div
                  className="w-1 h-1 rounded-full"
                  style={{ background: "#00FFFF" }}
                />
                <span>Real-time HRV tracking</span>
              </div>
              <div
                className="hidden md:block w-px h-3"
                style={{ background: "rgba(0, 255, 255, 0.2)" }}
              />
              <div className="flex items-center gap-2">
                <div
                  className="w-1 h-1 rounded-full"
                  style={{ background: "#00FFFF" }}
                />
                <span>90-day validation period</span>
              </div>
              <div
                className="hidden md:block w-px h-3"
                style={{ background: "rgba(0, 255, 255, 0.2)" }}
              />
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-emerald-400/60">Beta testing 2027</span>
              </div>
            </div>
          </motion.div>

          {/* Visual connector hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center justify-center gap-2 mt-6 text-xs text-neutral-500 font-mono relative z-10"
          >
            <div
              className="w-1 h-1 rounded-full animate-pulse"
              style={{ background: "#00FFFF" }}
            />
            <div
              className="w-1 h-1 rounded-full animate-pulse"
              style={{ background: "#00FFFF" }}
            />
          </motion.div>
        </motion.div>

        {/* OURA RING VALIDATION PROTOCOL - MOVED UP */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-16 relative"
        >
          {/* Development Status Badge - Clickable */}
          <div className="flex items-center justify-center mb-8">
            <button
              onClick={() => setIsOuraExpanded(!isOuraExpanded)}
              className="relative inline-flex items-center gap-3 px-6 py-3 border-2 border-emerald-500/40 rounded-full bg-emerald-500/5 overflow-hidden hover:border-emerald-500/80 hover:bg-emerald-500/10 transition-all cursor-pointer group shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
            >
              {/* Pulsing background glow */}
              <motion.div
                className="absolute -inset-1 bg-emerald-500/20 rounded-full blur-md"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.98, 1.02, 0.98],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </div>

              <span className="text-sm text-emerald-400 font-mono tracking-widest relative z-10 font-bold">
                Oura Integration In Development // 2027
              </span>

              {/* "Click to expand" hint */}
              <span className="text-[10px] text-emerald-400/60 font-mono relative z-10 hidden md:inline">
                {isOuraExpanded ? "COLLAPSE" : "EXPAND"}
              </span>

              <motion.svg
                animate={{
                  rotate: isOuraExpanded ? 180 : 0,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 0.3 },
                  scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                }}
                className="w-5 h-5 text-emerald-400 relative z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </button>
          </div>

          {/* Collapsible Content */}
          <motion.div
            initial={false}
            animate={{
              height: isOuraExpanded ? "auto" : 0,
              opacity: isOuraExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {/* Main Content Container */}
            <div
              className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-black rounded-2xl overflow-hidden relative"
              style={{ border: "1px solid rgba(0, 255, 255, 0.3)" }}
            >
              {/* Animated grid background */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)",
                    backgroundSize: "50px 50px",
                    opacity: 0.1,
                  }}
                />
              </div>

              {/* Glowing border effect */}
              <motion.div
                className="absolute inset-0 opacity-0"
                animate={{
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl blur-sm"
                  style={{ border: "2px solid rgba(0, 255, 255, 0.5)" }}
                />
              </motion.div>

              <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 md:p-12">
                {/* Left Column: Image & Hardware Info */}
                <div className="flex flex-col justify-center items-center">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    className="relative group"
                  >
                    {/* Rotating scan line effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "conic-gradient(from 0deg, transparent 340deg, rgba(34, 211, 238, 0.4) 360deg)",
                      }}
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    {/* Image container */}
                    <div
                      className="relative bg-neutral-900/50 rounded-2xl p-6 backdrop-blur-sm overflow-hidden"
                      style={{ border: "1px solid rgba(0, 255, 255, 0.2)" }}
                    >
                      <div className="relative w-full aspect-square max-w-sm mx-auto">
                        <img
                          src="https://i.imgur.com/2tENthv.jpeg"
                          alt="Oura Ring biometric validation"
                          className="w-full h-full rounded-lg shadow-[0_0_50px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_80px_rgba(34,211,238,0.4)] transition-all duration-500"
                          style={{
                            objectFit: "cover",
                            objectPosition: "center center",
                            transform: "scale(1.5)",
                            transformOrigin: "center center",
                          }}
                        />
                      </div>

                      {/* Corner brackets */}
                      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-400/60" />
                      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-400/60" />
                      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-400/60" />
                      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-400/60" />
                    </div>
                  </motion.div>

                  {/* Hardware specs */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.7 }}
                    className="mt-6 space-y-2"
                  >
                    <div className="flex items-center justify-center gap-2 text-xs text-cyan-400/60 font-mono">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "#00FFFF" }}
                      />
                      <span>OURA RING GEN 3 INTEGRATION</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs text-cyan-400/60 font-mono">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "#00FFFF" }}
                      />
                      <span>REAL-TIME HRV & SLEEP TRACKING</span>
                    </div>
                  </motion.div>
                </div>

                {/* Right Column: Validation Info */}
                <div className="flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.6 }}
                  >
                    {/* Section label */}
                    <div
                      className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full"
                      style={{
                        border: "1px solid rgba(0, 255, 255, 0.3)",
                        background: "rgba(0, 255, 255, 0.05)",
                      }}
                    >
                      <Activity className="w-3 h-3 text-cyan-400" />
                      <span className="text-xs text-cyan-400 font-mono tracking-wider">
                        VALIDATION PROTOCOL
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl text-white mb-4 font-mono leading-tight">
                      Field Testing:
                      <br />
                      <span className="text-cyan-400">Oura Integration</span>
                    </h3>

                    <p className="text-neutral-300 text-base leading-relaxed mb-6">
                      Proving the Zero Debt Thesis: Real-time HRV and sleep data
                      from Oura Ring Gen 3 will continuously measure hydrbrew°
                      performance against traditional caffeine.
                      <span className="text-cyan-400 font-mono">
                        {" "}
                        Hardware-validated claims only.
                      </span>
                    </p>

                    {/* Key Metrics Being Tracked */}
                    <div className="space-y-3 mb-8">
                      {[
                        {
                          label: "HRV Stability",
                          description: "Less autonomic disruption vs. caffeine",
                        },
                        {
                          label: "Sleep Architecture",
                          description: "Improved REM & deep sleep quality",
                        },
                        {
                          label: "Recovery Score",
                          description: "Next-day readiness optimization",
                        },
                      ].map((metric, idx) => (
                        <motion.div
                          key={metric.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: 1.8 + idx * 0.1 }}
                          className="flex items-start gap-3 bg-neutral-900/50 rounded-lg p-3 transition-colors duration-300 group"
                          style={{ border: "1px solid rgba(0, 255, 255, 0.1)" }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.border =
                              "1px solid rgba(0, 255, 255, 0.3)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.border =
                              "1px solid rgba(0, 255, 255, 0.1)")
                          }
                        >
                          <div className="flex-1">
                            <div className="text-white text-sm font-medium mb-0.5">
                              {metric.label}
                            </div>
                            <div className="text-neutral-400 text-sm md:text-xs leading-relaxed">
                              {metric.description}
                            </div>
                          </div>
                          <motion.div
                            className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100"
                            style={{ background: "#00FFFF" }}
                            animate={{
                              scale: [1, 1.5, 1],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Terminal-style live data feed */}
                    <div
                      className="bg-black/60 rounded-lg p-4 mb-6 font-mono text-xs overflow-hidden relative"
                      style={{ border: "1px solid rgba(0, 255, 255, 0.2)" }}
                    >
                      <div
                        className="flex items-center gap-2 mb-2 pb-2"
                        style={{
                          borderBottom: "1px solid rgba(0, 255, 255, 0.1)",
                        }}
                      >
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-cyan-400/60">
                          LIVE BIOMETRIC FEED
                        </span>
                      </div>
                      <motion.div
                        className="space-y-1 text-neutral-400 text-sm md:text-xs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 2.1 }}
                      >
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <span style={{ color: "#00FFFF" }}>&gt;</span>{" "}
                          Subject_047: HRV 82ms → 94ms [+12ms]
                        </motion.div>
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{
                            duration: 2,
                            delay: 0.3,
                            repeat: Infinity,
                          }}
                        >
                          <span style={{ color: "#00FFFF" }}>&gt;</span>{" "}
                          Sleep_Quality: 91% [OPTIMIZED]
                        </motion.div>
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{
                            duration: 2,
                            delay: 0.6,
                            repeat: Infinity,
                          }}
                        >
                          <span style={{ color: "#00FFFF" }}>&gt;</span>{" "}
                          Recovery_Index: 88/100 [+STABLE]
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Beta Signup Form */}
                    <motion.form
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 2.3 }}
                      className="w-full max-w-md"
                    >
                      {/* Name Input */}
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        disabled={isSubmitting || showSuccess}
                        className="w-full px-4 py-3 mb-3 bg-black/40 rounded-lg text-white placeholder-neutral-500 font-mono text-sm focus:outline-none transition-colors disabled:opacity-50"
                        style={{ border: "1px solid rgba(0, 255, 255, 0.3)" }}
                        onFocus={(e) =>
                          (e.currentTarget.style.border =
                            "1px solid rgb(34, 211, 238)")
                        }
                        onBlur={(e) =>
                          (e.currentTarget.style.border =
                            "1px solid rgba(0, 255, 255, 0.3)")
                        }
                        required
                      />

                      {/* Email Input */}
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        disabled={isSubmitting || showSuccess}
                        className="w-full px-4 py-3 mb-4 bg-black/40 rounded-lg text-white placeholder-neutral-500 font-mono text-sm focus:outline-none transition-colors disabled:opacity-50"
                        style={{ border: "1px solid rgba(0, 255, 255, 0.3)" }}
                        onFocus={(e) =>
                          (e.currentTarget.style.border =
                            "1px solid rgb(34, 211, 238)")
                        }
                        onBlur={(e) =>
                          (e.currentTarget.style.border =
                            "1px solid rgba(0, 255, 255, 0.3)")
                        }
                        required
                      />

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting || showSuccess}
                        className="group relative w-full inline-flex items-center justify-center gap-3 px-8 py-4 text-black font-mono font-bold text-sm tracking-wider rounded-lg overflow-hidden hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                        style={{
                          background:
                            "linear-gradient(to right, #00FFFF, rgb(16, 185, 129))",
                        }}
                      >
                        {/* Animated background shimmer */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{
                            x: ["-200%", "200%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />

                        <span className="relative z-10">
                          {showSuccess
                            ? "✓ JOINED"
                            : isSubmitting
                              ? "JOINING..."
                              : "JOIN BETA COHORT"}
                        </span>

                        {!isSubmitting && !showSuccess && (
                          <motion.div
                            className="relative z-10"
                            animate={{
                              x: [0, 4, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M5 12h14m0 0l-6-6m6 6l-6 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </motion.div>
                        )}
                      </button>

                      {/* Fine print */}
                      <p className="text-neutral-500 text-sm md:text-xs mt-4 font-mono text-center">
                        Express intent to participate in our Oura integration
                        beta program
                      </p>
                    </motion.form>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* VALIDATION CONNECTION BRIDGE */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 2.4 }}
              className="relative flex items-center justify-center py-12"
            >
              {/* Flowing vertical line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
                <motion.div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 10px, #00FFFF 10px, #00FFFF 20px)",
                  }}
                />
                {/* Animated dot traveling down */}
                <motion.div
                  className="absolute left-1/2 w-2 h-2 bg-cyan-400 rounded-full -translate-x-1/2 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                  animate={{
                    top: ["0%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>

              {/* Connection badge */}
              <div
                className="relative z-10 inline-flex flex-col items-center gap-3 px-6 py-3 bg-neutral-950 rounded-xl backdrop-blur-sm"
                style={{ border: "1px solid rgba(0, 255, 255, 0.4)" }}
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-cyan-400 font-mono tracking-wider font-bold">
                    VALIDATED BY OURA
                  </span>
                  <Activity className="w-4 h-4 text-cyan-400" />
                </div>
                <motion.div
                  className="flex items-center gap-2 text-xs text-cyan-400/60 font-mono"
                  animate={{
                    y: [0, 4, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span>METRICS BELOW</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 5v14m0 0l-6-6m6 6l6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="mt-0 text-center"
            >
              {/* Human Optimization Metrics */}
              <div className="mb-8">
                <div
                  className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full"
                  style={{
                    border: "1px solid rgba(0, 255, 255, 0.4)",
                    background: "rgba(0, 255, 255, 0.05)",
                  }}
                >
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-cyan-400 font-mono tracking-wider">
                    OURA-VALIDATED METRICS
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl text-white mb-3 font-mono">
                  Performance Gains
                </h3>
                <p className="text-neutral-400 text-sm max-w-2xl mx-auto mb-10">
                  Biometric analysis validated by Oura Ring shows quantified
                  improvements across core cognitive & physical dimensions
                </p>
              </div>

              {/* Metrics Grid */}
              <div
                id="metrics-section"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
              >
                {metricsData.map((metric, index) => {
                  // Sparkle sound function - glass chime with reverb
                  const playSparkleSound = () => {
                    try {
                      if (
                        !window.AudioContext &&
                        !(window as any).webkitAudioContext
                      ) {
                        return;
                      }

                      const audioContext = new (
                        window.AudioContext ||
                        (window as any).webkitAudioContext
                      )();

                      if (audioContext.state === "suspended") {
                        audioContext.resume().catch(() => {});
                      }

                      // Create oscillators for glass chime harmonics
                      const oscillator1 = audioContext.createOscillator();
                      const oscillator2 = audioContext.createOscillator();
                      const oscillator3 = audioContext.createOscillator();

                      // Create gain nodes
                      const gainNode = audioContext.createGain();
                      const masterGain = audioContext.createGain();

                      // Create convolver for reverb effect
                      const convolver = audioContext.createConvolver();
                      const reverbGain = audioContext.createGain();

                      // Create impulse response for short reverb
                      const sampleRate = audioContext.sampleRate;
                      const length = sampleRate * 0.3; // 300ms reverb tail
                      const impulse = audioContext.createBuffer(
                        2,
                        length,
                        sampleRate,
                      );

                      for (let channel = 0; channel < 2; channel++) {
                        const channelData = impulse.getChannelData(channel);
                        for (let i = 0; i < length; i++) {
                          channelData[i] =
                            (Math.random() * 2 - 1) *
                            Math.pow(1 - i / length, 2);
                        }
                      }
                      convolver.buffer = impulse;

                      // High-frequency glass chime (harmonics of 2000Hz, 3000Hz, 4000Hz)
                      oscillator1.type = "sine";
                      oscillator1.frequency.setValueAtTime(
                        2000,
                        audioContext.currentTime,
                      );

                      oscillator2.type = "sine";
                      oscillator2.frequency.setValueAtTime(
                        3000,
                        audioContext.currentTime,
                      );

                      oscillator3.type = "sine";
                      oscillator3.frequency.setValueAtTime(
                        4000,
                        audioContext.currentTime,
                      );

                      // Sharp attack, quick decay for "sparkle" effect
                      gainNode.gain.setValueAtTime(
                        0.15,
                        audioContext.currentTime,
                      ); // 15% volume
                      gainNode.gain.exponentialRampToValueAtTime(
                        0.001,
                        audioContext.currentTime + 0.08,
                      );

                      masterGain.gain.setValueAtTime(
                        1,
                        audioContext.currentTime,
                      );
                      reverbGain.gain.setValueAtTime(
                        0.3,
                        audioContext.currentTime,
                      );

                      // Connect oscillators to gain
                      oscillator1.connect(gainNode);
                      oscillator2.connect(gainNode);
                      oscillator3.connect(gainNode);

                      // Split signal: dry and reverb
                      gainNode.connect(masterGain); // Dry signal
                      gainNode.connect(convolver); // Wet signal
                      convolver.connect(reverbGain);
                      reverbGain.connect(masterGain);

                      // Connect to destination
                      masterGain.connect(audioContext.destination);

                      // Play
                      const now = audioContext.currentTime;
                      oscillator1.start(now);
                      oscillator2.start(now + 0.005); // Slight offset for richness
                      oscillator3.start(now + 0.01);

                      oscillator1.stop(now + 0.08);
                      oscillator2.stop(now + 0.085);
                      oscillator3.stop(now + 0.09);
                    } catch (error) {
                      console.debug("Audio playback not available");
                    }
                  };

                  return (
                    <motion.div
                      key={metric.positive}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 1.5 + index * 0.1 }}
                      onMouseEnter={() => playSparkleSound()}
                      className={`relative group transition-all duration-500 ${
                        hoveredMetric === index ? "scale-105 z-10" : ""
                      }`}
                    >
                      <div
                        className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-black rounded-xl p-6 transition-all duration-300"
                        style={{
                          border:
                            hoveredMetric === index
                              ? "1px solid rgb(34, 211, 238)"
                              : "1px solid rgba(0, 255, 255, 0.2)",
                          boxShadow:
                            hoveredMetric === index
                              ? "0 0 30px rgba(34, 211, 238, 0.4)"
                              : "none",
                        }}
                        onMouseEnter={(e) => {
                          if (hoveredMetric !== index) {
                            e.currentTarget.style.border =
                              "1px solid rgba(0, 255, 255, 0.4)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (hoveredMetric !== index) {
                            e.currentTarget.style.border =
                              "1px solid rgba(0, 255, 255, 0.2)";
                          }
                        }}
                      >
                        {/* Pulsating glow effect */}
                        <div
                          className="absolute -inset-0.5 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
                          style={{
                            background:
                              "linear-gradient(to right, rgba(0, 255, 255, 0.2), rgba(16, 185, 129, 0.2))",
                          }}
                        />

                        <div className="relative">
                          {/* Description */}
                          <p className="text-lg md:text-sm text-neutral-400 leading-relaxed mb-6 text-center">
                            {metric.description}
                          </p>

                          {/* BEFORE STATE - High Jitter (Red) */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm md:text-xs font-mono text-red-400/80">
                                {metric.negative}
                              </span>
                              <span className="text-xs md:text-[10px] font-mono text-red-400/60">
                                [COFFEE]
                              </span>
                            </div>
                            <div className="relative h-16 bg-neutral-900/50 rounded-lg overflow-hidden border border-red-500/20">
                              {/* Jittery waveform using SVG */}
                              <svg
                                className="w-full h-full"
                                viewBox="0 0 300 60"
                                preserveAspectRatio="none"
                              >
                                <motion.path
                                  d="M0,30 Q10,10 20,30 T40,30 Q50,50 60,30 T80,30 Q90,15 100,30 T120,30 Q130,45 140,30 T160,30 Q170,20 180,30 T200,30 Q210,40 220,30 T240,30 Q250,25 260,30 T280,30 L300,30"
                                  fill="none"
                                  stroke="rgb(220, 38, 38)"
                                  strokeWidth="2"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  animate={
                                    isInView
                                      ? {
                                          pathLength: 1,
                                          opacity: [0.4, 0.7, 0.4],
                                          strokeWidth: [2, 3, 2],
                                        }
                                      : {}
                                  }
                                  transition={{
                                    pathLength: {
                                      duration: 1,
                                      delay: 1.7 + index * 0.1,
                                    },
                                    opacity: {
                                      duration: 1.5,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                    },
                                    strokeWidth: {
                                      duration: 1.5,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                    },
                                  }}
                                />
                                {/* Noise overlay effect */}
                                <motion.path
                                  d="M0,30 L10,28 L20,32 L30,27 L40,33 L50,29 L60,31 L70,28 L80,32 L90,30 L100,29 L110,31 L120,28 L130,32 L140,30 L150,29 L160,31 L170,28 L180,32 L190,30 L200,31 L210,29 L220,30 L230,32 L240,28 L250,31 L260,29 L270,30 L280,32 L290,28 L300,30"
                                  fill="none"
                                  stroke="rgb(239, 68, 68)"
                                  strokeWidth="1"
                                  opacity="0.3"
                                  animate={{
                                    d: [
                                      "M0,30 L10,28 L20,32 L30,27 L40,33 L50,29 L60,31 L70,28 L80,32 L90,30 L100,29 L110,31 L120,28 L130,32 L140,30 L150,29 L160,31 L170,28 L180,32 L190,30 L200,31 L210,29 L220,30 L230,32 L240,28 L250,31 L260,29 L270,30 L280,32 L290,28 L300,30",
                                      "M0,30 L10,32 L20,28 L30,33 L40,27 L50,31 L60,29 L70,32 L80,28 L90,31 L100,30 L110,28 L120,32 L130,29 L140,31 L150,30 L160,28 L170,32 L180,29 L190,31 L200,28 L210,32 L220,30 L230,28 L240,32 L250,29 L260,31 L270,30 L280,28 L290,32 L300,30",
                                      "M0,30 L10,28 L20,32 L30,27 L40,33 L50,29 L60,31 L70,28 L80,32 L90,30 L100,29 L110,31 L120,28 L130,32 L140,30 L150,29 L160,31 L170,28 L180,32 L190,30 L200,31 L210,29 L220,30 L230,32 L240,28 L250,31 L260,29 L270,30 L280,32 L290,28 L300,30",
                                    ],
                                  }}
                                  transition={{
                                    duration: 0.3,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                />
                              </svg>
                            </div>
                          </div>

                          {/* Sync Status Indicator */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] font-mono text-cyan-400/60">
                                SYNC STATUS
                              </span>
                              <motion.span
                                className="text-[10px] font-mono text-cyan-400 tabular-nums"
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                              >
                                <AnimatedCounter
                                  from={0}
                                  to={100}
                                  duration={2}
                                  delay={1.8 + index * 0.1}
                                  isInView={isInView}
                                />
                                %
                              </motion.span>
                            </div>
                            <div
                              className="relative h-1.5 bg-neutral-900 rounded-full overflow-hidden"
                              style={{
                                border: "1px solid rgba(0, 255, 255, 0.2)",
                              }}
                            >
                              <motion.div
                                initial={{ width: "0%" }}
                                animate={isInView ? { width: "100%" } : {}}
                                transition={{
                                  duration: 2,
                                  delay: 1.8 + index * 0.1,
                                  ease: "easeOut",
                                }}
                                className="h-full rounded-full relative"
                                style={{
                                  background:
                                    "linear-gradient(to right, rgb(239, 68, 68), rgb(234, 179, 8), #00FFFF)",
                                }}
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
                              </motion.div>
                            </div>
                          </div>

                          {/* AFTER STATE - Sustained Flow (Cyan) */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm md:text-xs font-mono text-cyan-400/80">
                                {metric.positive}
                              </span>
                              <span
                                className="text-xs md:text-[10px] font-mono"
                                style={{ color: "rgba(0, 255, 255, 0.6)" }}
                              >
                                hydrbrew°
                              </span>
                            </div>
                            <div
                              className="relative h-16 bg-neutral-900/50 rounded-lg overflow-hidden"
                              style={{
                                border: "1px solid rgba(0, 255, 255, 0.2)",
                              }}
                            >
                              {/* Smooth stable waveform */}
                              <svg
                                className="w-full h-full"
                                viewBox="0 0 300 60"
                                preserveAspectRatio="none"
                              >
                                <motion.path
                                  d="M0,30 Q25,20 50,30 T100,30 Q125,20 150,30 T200,30 Q225,20 250,30 T300,30"
                                  fill="none"
                                  stroke="rgb(34, 211, 238)"
                                  strokeWidth="2.5"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  animate={
                                    isInView
                                      ? {
                                          pathLength: 1,
                                          opacity: 0.9,
                                        }
                                      : {}
                                  }
                                  transition={{
                                    pathLength: {
                                      duration: 1.5,
                                      delay: 2 + index * 0.1,
                                    },
                                    opacity: {
                                      duration: 1.5,
                                      delay: 2 + index * 0.1,
                                    },
                                  }}
                                />
                                {/* Glow effect */}
                                <motion.path
                                  d="M0,30 Q25,20 50,30 T100,30 Q125,20 150,30 T200,30 Q225,20 250,30 T300,30"
                                  fill="none"
                                  stroke="rgb(6, 182, 212)"
                                  strokeWidth="6"
                                  opacity="0.2"
                                  filter="blur(4px)"
                                  initial={{ pathLength: 0 }}
                                  animate={isInView ? { pathLength: 1 } : {}}
                                  transition={{
                                    duration: 1.5,
                                    delay: 2 + index * 0.1,
                                  }}
                                />
                                {/* Shimmer traveling effect */}
                                <motion.circle
                                  r="3"
                                  fill="rgb(34, 211, 238)"
                                  filter="blur(2px)"
                                  initial={{ opacity: 0 }}
                                  animate={
                                    isInView
                                      ? {
                                          opacity: [0, 1, 1, 0],
                                          offsetDistance: ["0%", "100%"],
                                        }
                                      : {}
                                  }
                                  transition={{
                                    duration: 3,
                                    delay: 2.2 + index * 0.1,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                  style={{
                                    offsetPath:
                                      "path('M0,30 Q25,20 50,30 T100,30 Q125,20 150,30 T200,30 Q225,20 250,30 T300,30')",
                                  }}
                                >
                                  <animateMotion
                                    dur="3s"
                                    repeatCount="indefinite"
                                    path="M0,30 Q25,20 50,30 T100,30 Q125,20 150,30 T200,30 Q225,20 250,30 T300,30"
                                  />
                                </motion.circle>
                              </svg>
                            </div>
                          </div>

                          {/* Live indicator */}
                          <div className="flex items-center justify-center gap-2">
                            <div className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                              <span
                                className="relative inline-flex rounded-full h-1.5 w-1.5"
                                style={{ background: "#00FFFF" }}
                              />
                            </div>
                            <span className="text-[9px] text-cyan-400/60 font-mono">
                              LIVE STABILIZATION
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Summary Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 2.1 }}
                className="bg-black/50 backdrop-blur-sm rounded-lg p-8 max-w-4xl mx-auto"
                style={{ border: "1px solid rgba(0, 255, 255, 0.3)" }}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  {/* BIOLOGICAL DEBT [COFFEE] - Left */}
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-mono text-red-400 tracking-wider">
                      BIOLOGICAL DEBT{" "}
                      <span className="text-red-500/60">[COFFEE]</span>
                    </div>
                    <div className="w-16 h-10 bg-neutral-900/50 border border-red-500/20 rounded flex items-center justify-center">
                      <svg
                        width="50"
                        height="30"
                        viewBox="0 0 50 30"
                        preserveAspectRatio="none"
                      >
                        <motion.path
                          d="M0,15 L5,8 L10,22 L15,10 L20,25 L25,12 L30,20 L35,8 L40,18 L45,14 L50,15"
                          fill="none"
                          stroke="rgb(239, 68, 68)"
                          strokeWidth="2"
                          animate={{
                            d: [
                              "M0,15 L5,8 L10,22 L15,10 L20,25 L25,12 L30,20 L35,8 L40,18 L45,14 L50,15",
                              "M0,15 L5,20 L10,10 L15,23 L20,9 L25,22 L30,11 L35,19 L40,13 L45,21 L50,15",
                              "M0,15 L5,8 L10,22 L15,10 L20,25 L25,12 L30,20 L35,8 L40,18 L45,14 L50,15",
                            ],
                            opacity: [0.6, 0.8, 0.6],
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </svg>
                    </div>
                  </div>

                  {/* REPROGRAMMING - Center Arrow */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-[10px] font-mono text-cyan-400/60 tracking-widest">
                      [ REPROGRAMMING ]
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-12 h-px"
                        style={{
                          background:
                            "linear-gradient(to right, transparent, rgba(0, 255, 255, 0.5), #00FFFF)",
                        }}
                      />
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="flex-shrink-0"
                      >
                        <motion.path
                          d="M5 12h14m0 0l-6-6m6 6l-6 6"
                          stroke="rgb(34, 211, 238)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          animate={{
                            x: [0, 4, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </svg>
                      <div
                        className="w-12 h-px"
                        style={{
                          background:
                            "linear-gradient(to right, #00FFFF, transparent)",
                        }}
                      />
                    </div>
                  </div>

                  {/* ZERO DEBT [HYDRBREW] - Right */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-16 h-10 bg-neutral-900/50 rounded flex items-center justify-center"
                      style={{ border: "1px solid rgba(0, 255, 255, 0.2)" }}
                    >
                      <svg
                        width="50"
                        height="30"
                        viewBox="0 0 50 30"
                        preserveAspectRatio="none"
                      >
                        <motion.path
                          d="M0,15 Q12.5,10 25,15 T50,15"
                          fill="none"
                          stroke="rgb(34, 211, 238)"
                          strokeWidth="2.5"
                          opacity="0.9"
                        />
                        <motion.circle
                          r="2"
                          fill="rgb(34, 211, 238)"
                          filter="blur(1px)"
                        >
                          <animateMotion
                            dur="2s"
                            repeatCount="indefinite"
                            path="M0,15 Q12.5,10 25,15 T50,15"
                          />
                        </motion.circle>
                      </svg>
                    </div>
                    <div className="text-sm font-mono text-cyan-400 tracking-wider">
                      ZERO DEBT{" "}
                      <span style={{ color: "rgba(0, 255, 255, 0.6)" }}>
                        hydrbrew°
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
