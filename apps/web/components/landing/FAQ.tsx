import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How is this different from coffee?",
      answer: "hydrbrew° occupies the white space between functional water and the coffee ritual. By de-emphasizing 'coffee-forwardness' in favor of a Whisper-Profile, we eliminate the acidity tax. No crash, no cortisol spike, no heart rate elevation. The perfect post-lunch focus drink."
    },
    {
      question: "What does \"precursor model\" mean?",
      answer: "Most energy drinks focus on forcing a chemical spike. We focus on neural architecture. By combining Lion's Mane for neurotrophic support with L-Theanine for alpha-wave modulation, we don't just provide building blocks—we provide the stability required for deep, high-fidelity focus. We align with your biology to optimize your natural baseline, rather than overriding it."
    },
    {
      question: "How much caffeine is in it, and who is it for?",
      answer: "75 mg per serving (most people reported 150–300 mg daily from coffee). It's ideal if you love coffee but experience occasional overload (jitters, anxiety, poor sleep — reported by nearly half of respondents), afternoon crashes, or want calmer focus and better recovery without quitting the ritual entirely."
    },
    {
      question: "Is hydrbrew° an alternative energy drink?",
      answer: "We don't compete with energy drinks because we aren't in the business of exhaustion; we are in the business of Biological Arbitrage. While the legacy market redlines on sugar and synthetic debt, Hydrbrew provides the clean substrate for your evolution. The ritual you crave, re-engineered for zero friction and maximum clarity. As the world accelerates toward the singularity, your baseline is your only competitive advantage. We build for the +1 You—the optimized version of yourself that doesn't just survive the future, but dominates it. Live forever. Arrive optimized."
    },
    {
      question: "What's the taste like?",
      answer: "Experience the familiar essence of cold brew paired with sharp, mineral crispness. Engineered for performance, this lightly sparkling formula features an alkaline finish for superior hydration—all with a clean label, zero sugar, and natural monk fruit sweetness. It is the coffee ritual you love, stripped of the heaviness. Some call it \"what coffee should have been all along.\""
    },
    {
      question: "Why is hydrbrew° sugar free?",
      answer: "Glucose spikes are friction. To achieve \"Modern Cognition,\" the brain requires a stable energy supply. By removing sugar and focusing on hydration-first caffeine delivery, we ensure your neural pathways aren't compromised by insulin fluctuations."
    },
    {
      question: "When does it ship?",
      answer: "We're in pre-launch waitlist phase. First shipments go out to early adopters in late Q2 2026. Waitlist members get priority access, free samples, and NFT archetype identity."
    },
    {
      question: "What's the NFT / HydrCore Base thing?",
      answer: "This is an optional gamified layer for our community. You can choose an Archetype (such as Zevon, Head of Human Optimization) to align with your specific goals. By following the HydrCore Protocol, you earn rewards and unlock exclusive utility within our ecosystem. If you prefer to skip the community features, the Pure Product Path is always available—allowing you to focus strictly on the physical benefits of hydrbrew° without the digital integration."
    }
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-neutral-950 relative">
      {/* Wave Divider - Top */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden pointer-events-none z-10" style={{ height: '120px' }}>
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
                "M0,80 Q250,60 500,80 T1000,80 T1200,80 L1200,120 L0,120 Z"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
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
                "M0,90 Q300,70 600,90 T1200,90 L1200,120 L0,120 Z"
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
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
                "M0,80 Q250,60 500,80 T1000,80 T1200,80"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
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
                  filter: 'brightness(0.6) contrast(1.6) saturate(0.6) hue-rotate(180deg)',
                  mixBlendMode: 'screen',
                  objectPosition: 'center 18%'
                }}
              />
              {/* Cyan overlay glow */}
              <div className="absolute inset-0 bg-gradient-radial from-cyan-500/25 via-cyan-500/10 to-transparent animate-pulse" 
                style={{ animationDuration: '4s' }}
              />
              {/* Animated scan lines */}
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.15) 2px, rgba(6,182,212,0.15) 4px)',
                  animation: 'scan-lines 8s linear infinite'
                }}
              />
            </div>
          </div>

          <div className="relative z-10">
            <div className="inline-block mb-6 px-4 py-1.5 border border-cyan-500/30 rounded-full text-xs text-cyan-400 font-mono tracking-wider">
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
                backgroundSize: '30px 30px',
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
                    ease: "easeInOut"
                  }}
                />

                <div className="relative bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 group-hover:border-cyan-500/30 rounded-xl overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-neutral-900/50 transition-colors"
                  >
                    <span className="text-lg text-white pr-4">{faq.question}</span>
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
                          damping: 20 
                        }}
                        className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full px-2 py-1 border border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                      >
                        <span className="text-black font-bold text-xs">+1</span>
                      </motion.div>
                      
                      <ChevronDown
                        className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${
                          openIndex === index ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      height: openIndex === index ? 'auto' : 0,
                      opacity: openIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-neutral-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Terminal Uplink Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center mt-16"
        >
          <motion.button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute -inset-8 rounded-full bg-cyan-400/10 blur-2xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [0.9, 1.1, 0.9]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Hexagonal container */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              {/* Background hexagon with border */}
              <motion.div
                className="absolute inset-0 bg-neutral-900/90 backdrop-blur-sm border-2 border-cyan-400/50 group-hover:border-cyan-400"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(34, 211, 238, 0.3)',
                    '0 0 40px rgba(34, 211, 238, 0.6)',
                    '0 0 20px rgba(34, 211, 238, 0.3)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Animated chevrons stacking upward */}
              <div className="relative z-10 flex flex-col items-center gap-0.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-5 h-1.5 border-t-2 border-r-2 border-cyan-400 rotate-[-45deg] skew-x-[20deg]"
                    animate={{
                      y: [0, -3, 0],
                      opacity: [0.4, 1, 0.4]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2
                    }}
                    style={{
                      filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.8))'
                    }}
                  />
                ))}
              </div>

              {/* Corner accents */}
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <motion.div
                  key={angle}
                  className="absolute w-1 h-1 bg-cyan-400"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-38px)`
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: angle / 180
                  }}
                />
              ))}
            </div>

            {/* UPLINK label below hexagon */}
            <motion.div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
              animate={{
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-[10px] font-mono text-cyan-400 tracking-widest">UPLINK</span>
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}