import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How is this different from coffee?",
      answer: (
        <>
          <span style={{ color: "#00FFFF" }}>hydr</span>
          <span className="text-white">brew°</span> is a light and crisp,
          refreshing evolution of the ritual. It delivers the familiar cold-brew
          soul you love but with a precision Whisper-Profile that eliminates the
          heavy, acidic "tax" of traditional roasts. No crash, no cortisol
          spike, no heart rate elevation. It's 100% coffee ritual, engineered
          for 100% afternoon performance.
        </>
      ),
    },
    {
      question: 'What does "precursor model" mean?',
      answer:
        "Most energy products operate on 'biological debt'—a quick spike followed by a total crash. The Precursor Model is different. It's an architectural approach to focus that uses Lion's Mane and L-Theanine to provide the neural stability required for complex problem-solving. No forced spikes, no systemic tax—just a clear, optimized baseline for the +1 You.",
    },
    {
      question: "How much caffeine is in it, and who is it for?",
      answer:
        "85mg per serving (most people reported 150-300mg daily from coffee). It's ideal if you love coffee but experience occasional overload (jitters, anxiety, poor sleep — reported by nearly half of respondents), afternoon crashes, or want calmer focus and better recovery without quitting the ritual entirely.",
    },
    {
      question: (
        <>
          Is <span style={{ color: "#00FFFF" }}>hydr</span>
          <span className="text-white">brew°</span> an alternative energy drink?
        </>
      ),
      answer: (
        <>
          We don't compete with energy drinks because we aren't in the business
          of exhaustion; we are in the business of Biological Arbitrage. While
          the legacy market redlines on sugar and synthetic debt,{" "}
          <span style={{ color: "#00FFFF" }}>hydr</span>
          <span className="text-white">brew°</span> provides the clean substrate
          for your evolution. The ritual you crave, re-engineered for zero
          friction and maximum clarity. As the world accelerates toward the
          singularity, your baseline is your only competitive advantage. We
          build for the +1 You—the optimized version of yourself that doesn't
          just survive the future, but dominates it. Live forever. Arrive
          optimized.
        </>
      ),
    },
    {
      question: "What's the taste like?",
      answer:
        'Experience the familiar essence of cold brew paired with sharp, mineral crispness. Engineered for performance, this formula features an alkaline finish for superior hydration—all with a clean label, low sugar, and only 20 calories. It is the coffee ritual you love, stripped of the heaviness. Some call it "what coffee should have been all along."',
    },
    {
      question: "When does it ship?",
      answer:
        "We're in pre-launch waitlist phase. First shipments go out to early adopters in late Q2 2026. Waitlist members get priority access and free samples.",
    },
    {
      question: "What is HydrCore Base, and who is Zevon?",
      answer: "special", // Special marker for custom rendering
      isSpecial: true,
    },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-neutral-950 relative">
      {/* Wave Divider - Top */}
      <div
        className="absolute top-0 left-0 right-0 w-full overflow-hidden pointer-events-none z-10"
        style={{ height: "120px" }}
      >
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute top-0 left-0 w-full h-full"
        >
          {/* Glowing wave layer 1 */}
          <motion.path
            d="M0,80 Q250,60 500,80 T1000,80 T1200,80 L1200,120 L0,120 Z"
            fill="rgba(6, 182, 212, 0.2)"
            animate={{
              d: [
                "M0,80 Q250,60 500,80 T1000,80 T1200,80 L1200,120 L0,120 Z",
                "M0,80 Q250,100 500,80 T1000,80 T1200,80 L1200,120 L0,120 Z",
                "M0,80 Q250,60 500,80 T1000,80 T1200,80 L1200,120 L0,120 Z",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Glowing wave layer 2 - subtle cyan */}
          <motion.path
            d="M0,90 Q300,70 600,90 T1200,90 L1200,120 L0,120 Z"
            fill="rgba(6, 182, 212, 0.1)"
            animate={{
              d: [
                "M0,90 Q300,70 600,90 T1200,90 L1200,120 L0,120 Z",
                "M0,90 Q300,110 600,90 T1200,90 L1200,120 L0,120 Z",
                "M0,90 Q300,70 600,90 T1200,90 L1200,120 L0,120 Z",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Wave outline/stroke */}
          <motion.path
            d="M0,80 Q250,60 500,80 T1000,80 T1200,80"
            fill="none"
            stroke="rgba(6, 182, 212, 0.4)"
            strokeWidth="2"
            animate={{
              d: [
                "M0,80 Q250,60 500,80 T1000,80 T1200,80",
                "M0,80 Q250,100 500,80 T1000,80 T1200,80",
                "M0,80 Q250,60 500,80 T1000,80 T1200,80",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          {/* Background Image Layer with Cyberpunk Effects */}
          <div className="absolute inset-0 -top-20 -bottom-20 flex items-center justify-center pointer-events-none overflow-hidden">
            <div className="relative w-full max-w-3xl h-full">
              <img
                src="https://i.imgur.com/KuporTg.jpeg"
                alt=""
                className="w-full h-full object-cover opacity-40"
                style={{
                  filter:
                    "brightness(0.6) contrast(1.6) saturate(0.6) hue-rotate(180deg)",
                  mixBlendMode: "screen",
                  objectPosition: "center 18%",
                }}
              />
              {/* Cyan overlay glow */}
              <div
                className="absolute inset-0 bg-gradient-radial from-cyan-500/25 via-cyan-500/10 to-transparent animate-pulse"
                style={{ animationDuration: "4s" }}
              />
              {/* Animated scan lines */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.15) 2px, rgba(6,182,212,0.15) 4px)",
                  animation: "scan-lines 8s linear infinite",
                }}
              />
            </div>
          </div>

          <div className="relative z-10">
            <div
              className="inline-block mb-6 px-4 py-1.5 border border-cyan-500/30 rounded-full text-xs font-mono tracking-wider"
              style={{ color: "#00FFFF" }}
            >
              PROTOCOL QUESTIONS
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white">
              ARCHIVE
            </h2>
            <p className="text-xl text-neutral-400">
              Everything you need to know about the antidote.
            </p>
          </div>
        </motion.div>

        {/* Holographic grid background container */}
        <div className="relative">
          {/* Grid pattern background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none rounded-2xl overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)`,
                backgroundSize: "30px 30px",
              }}
            />
          </div>

          <div className="space-y-4 relative z-10">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Enhanced hover glow effect */}
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={
                    openIndex === index
                      ? {
                          opacity: [0.5, 0.8, 0.5],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <div className="relative bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 group-hover:border-cyan-500/30 rounded-xl overflow-hidden transition-all duration-300">
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-neutral-900/50 transition-colors"
                  >
                    <span
                      className={`pr-4 text-white ${faq.isSpecial ? "text-lg" : "text-lg"}`}
                      style={
                        faq.isSpecial
                          ? { fontWeight: 600, fontSize: "18px" }
                          : {}
                      }
                    >
                      {faq.question}
                    </span>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {/* "+1 Knowledge" badge - appears when opened */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={
                          openIndex === index
                            ? { scale: 1, opacity: 1 }
                            : { scale: 0, opacity: 0 }
                        }
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className="rounded-full px-2 py-1"
                        style={{
                          background:
                            "linear-gradient(to bottom right, #00FFFF, #00CCCC)",
                          border: "1px solid rgba(0, 255, 255, 0.5)",
                          boxShadow: "0 0 15px rgba(0, 255, 255, 0.6)",
                        }}
                      >
                        <span className="text-black font-bold text-xs">+1</span>
                      </motion.div>

                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                        style={{ color: "#00FFFF" }}
                      />
                    </div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: openIndex === index ? "auto" : 0,
                      opacity: openIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {faq.isSpecial ? (
                      <div className="relative">
                        {/* Scan-line texture overlay */}
                        <div
                          className="absolute inset-0 pointer-events-none z-20"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.02) 2px, rgba(6,182,212,0.02) 4px)",
                            opacity: 0.02,
                          }}
                        />

                        {/* Content with left cyan border */}
                        <div className="relative border-l border-cyan-500 pl-6 pr-6 pb-6 pt-4">
                          {/* Body text */}
                          <div
                            className="mb-6 text-neutral-300 leading-relaxed"
                            style={{ fontSize: "15px" }}
                          >
                            <p className="mb-4">
                              <span className="font-semibold text-white">
                                HydrCore Base
                              </span>{" "}
                              is the experimental lore layer—a gamified
                              narrative world where your identity evolves
                              through ritual, choice, and alignment. It's where
                              you don't just consume the product; you become
                              part of its story.
                            </p>
                            <p>
                              <span className="font-semibold text-white">
                                Zevon
                              </span>{" "}
                              is the architect. The voice behind the protocol.
                              The one who saw the system's cracks before anyone
                              else did—and built the antidote.
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="px-6 pb-5 text-neutral-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
