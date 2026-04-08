import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import type { ReactElement } from 'react';
import { useRef, useState, useEffect } from 'react';

// Intel Briefing Button Component
function IntelButton({ 
  variant = 'red',
  onClick,
  onMouseEnter,
  onMouseLeave
}: { 
  variant?: 'red' | 'cyan';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const colorClass = variant === 'red' ? 'bg-red-400' : 'bg-cyan-400';
  const borderClass = variant === 'red' ? 'border-red-400/50 hover:border-red-400' : 'border-cyan-400/50 hover:border-cyan-400';
  const shadowClass = variant === 'red' ? 'hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]' : 'hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]';
  const textClass = variant === 'red' ? 'text-red-400' : 'text-cyan-400';

  return (
    <button 
      className={`group/briefing flex items-center gap-2 px-3 py-2 bg-black/90 border ${borderClass} rounded-lg backdrop-blur-sm transition-all ${shadowClass}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-center gap-1">
        <div className={`w-0.5 ${colorClass} rounded-full`} style={{ height: '10px', animation: 'wave-pulse 0.8s ease-in-out 0.15s infinite' }} />
        <div className={`w-0.5 ${colorClass} rounded-full`} style={{ height: '12px', animation: 'wave-pulse 0.8s ease-in-out 0.3s infinite' }} />
        <div className={`w-0.5 ${colorClass} rounded-full`} style={{ height: '14px', animation: 'wave-pulse 0.8s ease-in-out 0.45s infinite' }} />
      </div>
      <span className={`text-[10px] font-mono ${textClass} tracking-wider`}>INTEL</span>
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
        opacity: [0.3, 0.8, 0.3]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
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
        opacity: [0.6, 1, 0.6]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.3
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
      { x: 12, y: 20, delay: 0.6 }
    ].map((hex, i) => (
      <motion.polygon
        key={i}
        points={`${hex.x},${hex.y-2} ${hex.x+2},${hex.y-1} ${hex.x+2},${hex.y+1} ${hex.x},${hex.y+2} ${hex.x-2},${hex.y+1} ${hex.x-2},${hex.y-1}`}
        stroke="#22d3ee"
        strokeWidth="1"
        initial={{ fill: "rgba(34, 211, 238, 0)" }}
        animate={{ fill: ["rgba(34, 211, 238, 0)", "rgba(34, 211, 238, 0.3)", "rgba(34, 211, 238, 0)"] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: hex.delay,
          ease: "easeInOut"
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
      title: 'Neural Baseline Stabilization',
      originalTitle: 'Smoothed Focus Curve',
      description: 'Deep work without cortisol spikes. L-Theanine ratio eliminates the jitter, sustains clarity for 4–6 hours.',
      metric: '4-6hr',
      metricLabel: 'sustained',
      reference: {
        code: 'PUBMED_18296328',
        title: 'L-theanine, a natural constituent in tea, and its effect on mental state',
        url: 'https://pubmed.ncbi.nlm.nih.gov/18296328/'
      }
    },
    {
      icon: RadarIcon,
      title: 'Zero Heart Rate Elevation',
      originalTitle: 'Zero Heart Rate Elevation',
      description: 'Optimized caffeine dose keeps you in parasympathetic flow. No racing pulse, no anxiety cascade.',
      metric: '<5 BPM',
      metricLabel: 'increase',
      reference: {
        code: 'SPRINGER_31-28',
        title: 'Effects of L-theanine on changes in blood pressure under physical and psychological stresses',
        url: 'https://link.springer.com/article/10.1186/1880-6805-31-28'
      }
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
            x1="2" y1="16" x2="22" y2="16"
            stroke="#22d3ee"
            strokeWidth="2"
            strokeDasharray="2 2"
            strokeLinecap="round"
          />
        </svg>
      ),
      title: 'Purge Glycemic Debt',
      originalTitle: 'No Crash, Zero Sugar',
      description: 'Clean exit pathway. No afternoon collapse, no insulin spike, no prefrontal fog. Just gentle return to baseline.',
      metric: 'Low',
      metricLabel: 'sugar',
      reference: {
        code: 'PMC_5532289',
        title: 'Sugar intake from sweet food and beverages and common mental disorders',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5532289/'
      }
    },
    {
      icon: HexGridIcon,
      title: 'Premium Hydration Layer',
      originalTitle: 'Premium Hydration Layer',
      description: 'Electrolytes + magnesium + alkaline base. Cellular recovery while you focus. Lightness, not heaviness.',
      metric: '240mg',
      metricLabel: 'electrolytes',
      reference: {
        code: 'PMC_5452159',
        title: 'Magnesium in Prevention and Therapy',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5452159/'
      }
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
      title: 'Ritualized Yet Light',
      originalTitle: 'Ritualized Yet Light',
      description: 'Subtle cold-brew taste memory. The ritual you crave without the baggage. Shelf-stable 2+ years (Mars-ready).',
      metric: '2+yr',
      metricLabel: 'shelf life',
      reference: {
        code: 'LUNAR-MARS_STABILITY',
        title: 'In-development architecture designed to satisfy NASA\'s 5-year pre-positioning requirements for deep-space hydration and cognitive support',
        url: null,
        isSpec: true
      }
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
              fill: ["rgba(34, 211, 238, 0.2)", "rgba(34, 211, 238, 0.4)", "rgba(34, 211, 238, 0.2)"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      ),
      title: 'Biological Arbitrage',
      originalTitle: 'Future-Proof Performance',
      description: 'Engineered for high performers, biohackers, founders. Become a +1 Optimized Human™. Arbitrage the now.',
      metric: '+1',
      metricLabel: 'optimized',
      reference: {
        code: 'RESEARCHGATE_399181646',
        title: 'The Neurobiology of Caffeine and L-Theanine Synergy: The Ultimate Productivity Stack (Keyora Research Series, 2025)',
        url: 'https://www.researchgate.net/publication/399181646_Keyora_Research_Notes_Series_L-Theanine_Episode_8_The_Ultimate_Productivity_Stack_-_The_Neurobiology_of_Caffeine_and_L-Theanine_Synergy'
      }
    }
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-black relative mt-16">
      {/* Shadow texture background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(0,0,0,0.9) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0,0,0,0.9) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(0,0,0,0.8) 0%, transparent 50%)',
          filter: 'blur(60px)'
        }}
      />
      
      {/* Swirling smoke effect */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
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
                rotateZ: [0, 1, 0, -1, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative inline-block"
            >
              {/* Glowing rings around image */}
              <motion.div
                className="absolute -inset-4 rounded-full border-2 border-cyan-400/30 blur-sm"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  boxShadow: "0 0 40px rgba(34, 211, 238, 0.4)"
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
                    y: ['-100%', '200%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
              
              {/* +1 Badge overlay */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8, type: "spring", bounce: 0.5 }}
                className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full p-2 border-2 border-black shadow-[0_0_20px_rgba(34,211,238,0.8)]"
              >
                <span className="text-black font-bold text-sm">+1</span>
              </motion.div>
              
              {/* Particle effects */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                  }}
                  animate={{
                    x: [0, Math.cos((i / 8) * Math.PI * 2) * 60],
                    y: [0, Math.sin((i / 8) * Math.PI * 2) * 60],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="px-4 py-1.5 border border-cyan-500/30 rounded-full text-xs text-cyan-400 font-mono tracking-wider">
                THE UPGRADE
              </div>
              <IntelButton 
                variant="red"
                onClick={(e) => {
                  e.stopPropagation();
                  window.dispatchEvent(new CustomEvent('openNeuralBriefing', { 
                    detail: { briefingId: 'theAntidote' } 
                  }));
                }}
                onMouseEnter={() => {
                  window.dispatchEvent(new CustomEvent('neuralBriefingTrigger', { 
                    detail: { active: true, briefingId: 'theAntidote' } 
                  }));
                }}
                onMouseLeave={() => {
                  window.dispatchEvent(new CustomEvent('neuralBriefingTrigger', { 
                    detail: { active: false, briefingId: 'theAntidote' } 
                  }));
                }}
              />
            </div>
            <div>The Antidote</div>
          </h2>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-2">
            <span>Escape the crash. Daily optimization, not daily debt.</span>
            <motion.button
              onClick={() => {
                const emailSection = document.getElementById('protocol-claim-position');
                emailSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
                  scale: [0.95, 1.05, 0.95]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span 
                className="relative text-2xl md:text-3xl font-bold"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(34, 211, 238, 0.4)',
                    '0 0 40px rgba(34, 211, 238, 0.8)',
                    '0 0 20px rgba(34, 211, 238, 0.4)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                +1
              </motion.span>
              <span className="relative text-cyan-400 text-xl md:text-2xl">You</span>
            </motion.button>
          </p>

          {/* Reminder text block */}
          <motion.div 
            className="text-neutral-400 text-base md:text-lg font-mono flex flex-wrap items-center justify-center gap-2 mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <span className="text-cyan-400 font-semibold">Reminder:</span> 
            <span>Click the</span>
            <motion.span 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/90 border rounded-md relative"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(34, 211, 238, 0.3)',
                  '0 0 20px rgba(34, 211, 238, 0.6)',
                  '0 0 10px rgba(34, 211, 238, 0.3)',
                  '0 0 10px rgba(239, 68, 68, 0.3)',
                  '0 0 20px rgba(239, 68, 68, 0.6)',
                  '0 0 10px rgba(239, 68, 68, 0.3)',
                  '0 0 10px rgba(34, 211, 238, 0.3)'
                ],
                borderColor: [
                  'rgba(34, 211, 238, 1)',
                  'rgba(34, 211, 238, 0.6)',
                  'rgba(34, 211, 238, 1)',
                  'rgba(239, 68, 68, 1)',
                  'rgba(239, 68, 68, 0.6)',
                  'rgba(239, 68, 68, 1)',
                  'rgba(34, 211, 238, 1)'
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Pulsing glow ring */}
              <motion.div
                className="absolute -inset-1 rounded-md blur-sm -z-10"
                animate={{
                  opacity: [0.3, 0.6, 0.3, 0.3, 0.6, 0.3, 0.3],
                  scale: [0.95, 1.05, 0.95, 0.95, 1.05, 0.95, 0.95],
                  backgroundColor: [
                    'rgba(34, 211, 238, 0.2)',
                    'rgba(34, 211, 238, 0.2)',
                    'rgba(34, 211, 238, 0.2)',
                    'rgba(239, 68, 68, 0.2)',
                    'rgba(239, 68, 68, 0.2)',
                    'rgba(239, 68, 68, 0.2)',
                    'rgba(34, 211, 238, 0.2)'
                  ]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="flex items-center gap-0.5">
                {[1, 2, 3].map((i) => (
                  <motion.span
                    key={i}
                    className="w-0.5 rounded-full"
                    animate={{
                      backgroundColor: [
                        'rgba(34, 211, 238, 1)',
                        'rgba(34, 211, 238, 1)',
                        'rgba(34, 211, 238, 1)',
                        'rgba(239, 68, 68, 1)',
                        'rgba(239, 68, 68, 1)',
                        'rgba(239, 68, 68, 1)',
                        'rgba(34, 211, 238, 1)'
                      ]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      height: `${6 + i * 1.5}px`,
                      animation: `wave-pulse 0.8s ease-in-out infinite`,
                      animationDelay: `${i * 0.15}s`
                    }}
                  />
                ))}
              </span>
              <motion.span 
                className="text-[10px] tracking-wider font-bold"
                animate={{
                  color: [
                    'rgba(34, 211, 238, 1)',
                    'rgba(34, 211, 238, 1)',
                    'rgba(34, 211, 238, 1)',
                    'rgba(239, 68, 68, 1)',
                    'rgba(239, 68, 68, 1)',
                    'rgba(239, 68, 68, 1)',
                    'rgba(34, 211, 238, 1)'
                  ]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                INTEL
              </motion.span>
            </motion.span>
            <span>buttons in each section to hear Zevon's <strong className="text-cyan-400">Neural Briefing</strong></span>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard 
              key={benefit.title}
              benefit={benefit}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Escape Hatch - Direct to Store */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <motion.button
            onClick={() => {
              window.open('https://hydrbrew.com/store', '_blank');
            }}
            className="relative group px-6 py-3 border-2 border-cyan-400 hover:border-cyan-300 rounded-lg bg-cyan-500/5 hover:bg-cyan-500/10 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.6),0_0_40px_rgba(6,182,212,0.3),0_0_60px_rgba(6,182,212,0.1)]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Constant pulsing glow */}
            <motion.div
              className="absolute -inset-1 rounded-lg bg-cyan-500/30 blur-md"
              animate={{
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="relative text-sm md:text-base font-mono text-white group-hover:text-cyan-50 transition-colors tracking-wide" style={{ textShadow: '0 0 10px rgba(6,182,212,0.8), 0 0 20px rgba(6,182,212,0.4)' }}>
              [SECURE YOUR 12-PACK]
            </span>
          </motion.button>
          <p className="text-xs text-neutral-200 font-mono">
            No NFT required. Just the brew.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// BenefitCard Component
function BenefitCard({ benefit, index, isInView }: { 
  benefit: {
    icon: () => ReactElement;
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
}) {
  const [showCitation, setShowCitation] = useState(false);
  const citationShownRef = useRef(false);
  const IconComponent = benefit.icon;

  // Reset ref when tooltip is hidden
  useEffect(() => {
    if (!showCitation) {
      citationShownRef.current = false;
    }
  }, [showCitation]);

  return (
    <motion.div
      key={benefit.title}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Enhanced pulsing glow */}
      <motion.div 
        className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/40 via-blue-500/40 to-transparent rounded-2xl blur-xl"
        animate={{
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: index * 0.5,
          ease: "easeInOut"
        }}
      />
      
      <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
      <motion.div 
        className="relative bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 group-hover:border-cyan-500/30 rounded-2xl p-6 h-full flex flex-col transition-all duration-500"
        animate={{
          boxShadow: [
            '0 0 0 rgba(34, 211, 238, 0)',
            '0 0 30px rgba(34, 211, 238, 0.4)',
            '0 0 0 rgba(34, 211, 238, 0)'
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: index * 0.5,
          ease: "easeInOut"
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2
              }}
            >
              <IconComponent />
            </motion.div>
          </div>
          <div className="text-right">
            <div className="text-2xl text-cyan-400 font-mono leading-none">
              {benefit.metric}
            </div>
            <div className="text-xs text-neutral-500 font-mono mt-1">
              {benefit.metricLabel}
            </div>
          </div>
        </div>

        <h3 className="text-xl text-white mb-3">
          {benefit.title}
        </h3>

        <p className="text-lg md:text-base text-neutral-400 leading-relaxed flex-grow mb-4">
          {benefit.title === 'Biological Arbitrage' ? (
            <>
              Engineered for high performers, biohackers, founders. Become a{' '}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 rounded-full text-cyan-400 font-semibold text-sm">
                <span className="text-base">+1</span>
                <span>You</span>
              </span>
              . Arbitrage the now.
            </>
          ) : (
            benefit.description
          )}
        </p>

        {/* Terminal Citation */}
        <div className="relative mt-auto z-50">
          <motion.div
            className="relative group/citation"
            onMouseEnter={() => setShowCitation(true)}
            onMouseLeave={() => setShowCitation(false)}
          >
            {benefit.reference.isSpec === true ? (
              <div className="relative inline-block group/spec">
                <div className="inline-block px-3 py-1.5 bg-black/60 border border-orange-500/40 rounded font-mono text-[10px] text-orange-400 tracking-wider cursor-default">
                  [SPEC_REF: {benefit.reference.code}]
                </div>
                
                {/* Hover tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 bg-neutral-900/95 backdrop-blur-md border border-orange-500/50 rounded-lg shadow-[0_0_30px_rgba(249,115,22,0.4)] pointer-events-none opacity-0 group-hover/spec:opacity-100 transition-opacity duration-300 w-64 z-50"
                >
                  <p className="text-xs text-neutral-300 leading-relaxed text-center">
                    Architecture designed to meet NASA's 5-Year Pre-Positioning requirements for deep-space transit.
                  </p>
                  {/* Arrow pointer */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2 h-2 bg-neutral-900 border-r border-b border-orange-500/50 rotate-45" />
                </motion.div>
              </div>
            ) : (
              <a
                href={benefit.reference.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-3 py-1.5 bg-black/60 border border-cyan-500/40 rounded font-mono text-[10px] text-cyan-400 tracking-wider hover:border-cyan-400 hover:bg-black/80 transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  // On mobile, first tap shows tooltip, second tap follows link
                  if (citationShownRef.current === false) {
                    e.preventDefault();
                    setShowCitation(true);
                    citationShownRef.current = true;
                  }
                  // If citationShownRef is true, allow default link behavior
                }}
                onMouseEnter={() => setShowCitation(true)}
                onMouseLeave={() => setShowCitation(false)}
              >
                [SRC: {benefit.reference.code}]
              </a>
            )}

            {/* Tooltip on hover */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showCitation ? 1 : 0, y: showCitation ? 0 : 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-0 mb-2 w-full min-w-[280px] pointer-events-none z-50"
              style={{ display: showCitation ? 'block' : 'none' }}
            >
              <div className="bg-neutral-900 border border-cyan-500/50 rounded-lg p-3 shadow-[0_0_20px_rgba(34,211,238,0.3)] backdrop-blur-sm">
                <div className="text-[10px] font-mono text-cyan-400 mb-1 tracking-wider">
                  {benefit.reference.isSpec ? 'SPECIFICATION' : 'RESEARCH CITATION'}
                </div>
                <div className="text-xs text-neutral-300 leading-snug">
                  {benefit.reference.title}
                </div>
                {!benefit.reference.isSpec && (
                  <div className="mt-2 text-xs text-cyan-400 font-mono">
                    Click to view study →
                  </div>
                )}
              </div>
              {/* Arrow pointer */}
              <div className="absolute -bottom-1 left-4 w-2 h-2 bg-neutral-900 border-r border-b border-cyan-500/50 transform rotate-45" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}