import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Zap, Eye, Users, TrendingUp, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { PathSeparator } from './PathSeparator';
import { EmailCaptureForm } from './EmailCaptureForm';

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

// Floating Avatar Component with Orbital Dots
function FloatingAvatar({ imageSrc, position = 'top' }: { imageSrc: string; position?: 'top' | 'side' }) {
  const positionClass = position === 'top' 
    ? 'absolute -top-20 left-1/2 -translate-x-1/2 md:top-8 md:left-8 md:translate-x-0 lg:left-[calc(50%+200px)] lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 pointer-events-none'
    : 'absolute -top-28 left-1/2 -translate-x-1/2 md:-top-32 md:left-1/2 md:-translate-x-1/2 lg:left-[calc(50%+320px)] lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 pointer-events-none';

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
          ease: "easeInOut"
        }}
      >
        {/* Outer glow ring */}
        <motion.div 
          className="absolute -inset-4 rounded-full border-2 border-cyan-400/30 blur-sm"
          style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.4)' }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
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
              y: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        
        {/* +1 Badge */}
        <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full p-2 border-2 border-black shadow-[0_0_20px_rgba(34,211,238,0.8)]">
          <span className="text-black font-bold text-sm">+1</span>
        </div>
        
        {/* Orbital dots */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{ top: '50%', left: '50%' }}
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
              ease: "easeInOut"
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
  const [count, setCount] = useState(0);
  const targetCount = 3847;
  const [nftCount, setNftCount] = useState(0);
  const nftTargetCount = 1629;

  // Countdown to June 9th, 2026 - Venus-Jupiter Conjunction
  const [daysRemaining, setDaysRemaining] = useState(0);
  
  useEffect(() => {
    const calculateDaysRemaining = () => {
      const launchDate = new Date('2026-06-09T00:00:00');
      const now = new Date();
      const diffTime = launchDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysRemaining(diffDays > 0 ? diffDays : 0);
    };
    
    calculateDaysRemaining();
    const interval = setInterval(calculateDaysRemaining, 1000 * 60 * 60); // Update every hour
    
    return () => clearInterval(interval);
  }, []);

  // Counter animation
  useEffect(() => {
    if (!isInView) return;
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
  }, [isInView]);

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
    { url: 'https://i.imgur.com/iNlpKmp.jpeg', name: 'Luno', rarity: 'ARCHETYPE' },
    { url: 'https://i.imgur.com/wwWEBds.jpeg', name: 'Vespara', rarity: 'ARCHETYPE' },
    { url: 'https://i.imgur.com/rNpkyRW.jpeg', name: 'Cipher', rarity: 'RARE' },
    { url: 'https://i.imgur.com/lNQFzkJ.jpeg', name: 'Nova', rarity: null },
    { url: 'https://i.imgur.com/jVBBgud.jpeg', name: 'Zenith', rarity: 'RARE' },
    { url: 'https://i.imgur.com/6ww6nzp.jpeg', name: 'Rift', rarity: null },
    { url: 'https://i.imgur.com/c8nCGNy.jpeg', name: 'Pulsar', rarity: 'RARE' },
    { url: 'https://i.imgur.com/YmYGdcf.jpeg', name: 'Catalyst', rarity: null }
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
    <section ref={ref} className="py-32 md:py-40 bg-black relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.7) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
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
              backgroundImage: 'url(https://i.imgur.com/7rF3Rd5.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.18,
              filter: 'blur(0.5px)'
            }}
          />

          <div className="flex flex-wrap items-center justify-center gap-3 mb-6 relative z-10">
            <FloatingAvatar imageSrc="https://i.imgur.com/n7OVdaJ.jpeg" position="top" />
            
            <div className="px-4 py-1.5 border border-cyan-500/30 rounded-full text-xs text-cyan-400 font-mono tracking-wider">
              SECURE YOUR POSITION
            </div>
            
            <IntelButton 
              variant="red"
              onClick={(e) => {
                e.stopPropagation();
                // Dispatch event to open neural briefing with optimized human briefing
                window.dispatchEvent(new CustomEvent('openNeuralBriefing', { 
                  detail: { briefingId: 'optimizedHuman' } 
                }));
              }}
              onMouseEnter={() => {
                // Dispatch custom event to trigger Neural Briefing attention with specific briefing
                window.dispatchEvent(new CustomEvent('neuralBriefingTrigger', { 
                  detail: { active: true, briefingId: 'optimizedHuman' } 
                }));
              }}
              onMouseLeave={() => {
                // Dispatch custom event to stop Neural Briefing attention
                window.dispatchEvent(new CustomEvent('neuralBriefingTrigger', { 
                  detail: { active: false, briefingId: 'optimizedHuman' } 
                }));
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
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
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
                    ease: "easeInOut"
                  }}
                />
                <motion.span
                  className="relative text-5xl md:text-7xl font-bold"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(34, 211, 238, 0.4)",
                      "0 0 40px rgba(34, 211, 238, 0.8)",
                      "0 0 20px rgba(34, 211, 238, 0.4)",
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  +1
                </motion.span>
                <span className="relative text-cyan-400 text-4xl md:text-6xl">You</span>
              </motion.span>
              <motion.span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #22d3ee 0%, #3b82f6 25%, #22d3ee 50%, #3b82f6 75%, #22d3ee 100%)',
                  backgroundSize: '200% 100%',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '200% 0%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                Movement
              </motion.span>
            </div>
          </motion.h2>

          {/* Pre-Launch Status Progress Bar */}
          <div className="max-w-md mx-auto mb-8 relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-cyan-400 tracking-wider">PROTOCOL_INITIALIZATION:</span>
              <span className="text-[10px] font-mono text-cyan-400 tracking-wider font-bold">84% COMPLETE</span>
            </div>
            <div className="relative h-1 bg-neutral-800 rounded-full overflow-hidden">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"
                initial={{ width: '0%' }}
                animate={isInView ? { width: '84%' } : { width: '0%' }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              />
              <motion.div 
                className="absolute inset-y-0 left-0 bg-cyan-400/50 rounded-full blur-sm"
                initial={{ width: '0%' }}
                animate={isInView ? { width: '84%' } : { width: '0%' }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-8 leading-relaxed relative z-10">
            <motion.p
              className="text-white font-bold font-mono text-xl md:text-2xl tracking-wide text-center"
              animate={{
                textShadow: [
                  "0 0 20px rgba(34, 211, 238, 0.6)",
                  "0 0 30px rgba(34, 211, 238, 0.8)",
                  "0 0 20px rgba(34, 211, 238, 0.6)",
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Final sequence before public launch. <span className="text-cyan-400">Secure your position.</span>
            </motion.p>
          </div>

          {/* Status Tags - Three Benefits */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 relative z-10">
            <div className="px-3 py-1.5 border border-cyan-500/40 rounded bg-cyan-500/5 backdrop-blur-sm">
              <span className="text-[10px] font-mono text-cyan-400 tracking-wider">ACCESS: FOUNDER-TIER</span>
            </div>
            <div className="px-3 py-1.5 border border-cyan-500/40 rounded bg-cyan-500/5 backdrop-blur-sm">
              <span className="text-[10px] font-mono text-cyan-400 tracking-wider">REWARD: SERIALIZED_NFT</span>
            </div>
            <div className="px-3 py-1.5 border border-cyan-500/40 rounded bg-cyan-500/5 backdrop-blur-sm">
              <span className="text-[10px] font-mono text-cyan-400 tracking-wider">UTILITY: BETA_COHORT_ELIGIBLE</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { 
              opacity: 1, 
              scale: 1,
              boxShadow: [
                '0 0 30px rgba(251, 146, 60, 0.4)',
                '0 0 60px rgba(251, 146, 60, 0.8)',
                '0 0 30px rgba(251, 146, 60, 0.4)'
              ]
            } : {}}
            transition={{ 
              duration: 0.6, 
              delay: 0.3,
              boxShadow: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="relative inline-flex items-center gap-3 bg-gradient-to-r from-neutral-900/80 via-orange-950/40 to-neutral-900/80 backdrop-blur-md border-2 border-orange-500/60 rounded-full px-5 py-3 md:px-8 md:py-4 mb-12 overflow-hidden"
          >
            {/* Animated cosmic background sweep */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"
              animate={{
                x: ['-200%', '200%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Enhanced pulsing indicator with dual rings */}
            <div className="relative flex h-4 w-4 md:h-5 md:w-5 z-10 flex-shrink-0">
              <motion.span 
                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"
                animate={{
                  scale: [1, 2.5],
                  opacity: [0.75, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
              <motion.span 
                className="absolute inline-flex h-full w-full rounded-full bg-orange-500/50 blur-md"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.span 
                className="relative inline-flex rounded-full h-full w-full bg-gradient-to-br from-orange-400 to-orange-600"
                animate={{
                  boxShadow: [
                    '0 0 10px rgba(251, 146, 60, 0.6)',
                    '0 0 25px rgba(251, 146, 60, 1)',
                    '0 0 10px rgba(251, 146, 60, 0.6)'
                  ]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            <div className="relative flex flex-col md:flex-row md:items-center gap-1 md:gap-2 z-10">
              <span className="text-xs md:text-sm text-white font-mono">
                hydrbrew° launches in {daysRemaining} days
              </span>
              <span className="hidden md:inline text-white/50">•</span>
              <span className="text-xs md:text-sm text-white font-mono">
                06.09.2026 // Planetary Sync Event
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
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-50"></div>
            <div className="relative bg-gradient-to-br from-neutral-900 via-neutral-900 to-cyan-950/20 rounded-3xl p-8 md:p-12 border border-cyan-500/40 overflow-hidden">
              {/* Grid background */}
              <div className="absolute inset-0 opacity-5">
                <div 
                  className="absolute inset-0" 
                  style={{
                    backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
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
                    <span className="text-emerald-400 font-bold tabular-nums">280</span>
                    <span className="text-emerald-400/60 ml-1">viewing now</span>
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
                    <span className="text-xs md:text-sm text-cyan-400 font-mono tracking-wider">LIVE PROTOCOL STATUS</span>
                  </motion.div>

                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                    Claim Your Position in the Protocol
                  </h3>

                  <p className="text-neutral-400 text-base md:text-base max-w-2xl mx-auto">
                    Join the waitlist now • <button className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/50 hover:decoration-cyan-300 underline-offset-2 transition-colors">First 2,000 receive NFT + early access</button>
                  </p>
                </div>

                {/* Counter */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-cyan-400" />
                    <span className="text-xs md:text-sm text-cyan-400 font-mono tracking-wider">PROTOCOL POSITIONS SECURED</span>
                  </div>

                  <motion.div 
                    className="text-6xl md:text-7xl lg:text-8xl font-mono text-white mb-3 tabular-nums font-bold"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(34, 211, 238, 0.3)",
                        "0 0 30px rgba(34, 211, 238, 0.5)",
                        "0 0 20px rgba(34, 211, 238, 0.3)",
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {count.toLocaleString()}
                  </motion.div>

                  <div className="flex items-center justify-center gap-3 flex-wrap mb-2">
                    <div className="flex items-center gap-2 text-emerald-400 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/30">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs md:text-sm font-mono">+127 in last 24h</span>
                    </div>
                    <div className="text-sm md:text-sm text-neutral-500 font-mono">6,153 positions remaining</div>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mb-8"></div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 md:gap-6 text-center mb-8">
                  <div className="bg-black/40 rounded-xl p-3 md:p-4 border border-cyan-500/20">
                    <div className="text-xl md:text-2xl lg:text-3xl text-cyan-400 font-mono mb-1 font-bold">2.4x</div>
                    <div className="text-[10px] md:text-xs text-neutral-400 font-mono md:tracking-wide break-words text-center">Viral Coefficient</div>
                  </div>
                  <div className="bg-black/40 rounded-xl p-3 md:p-4 border border-cyan-500/20">
                    <div className="text-xl md:text-2xl lg:text-3xl text-cyan-400 font-mono mb-1 font-bold">38%</div>
                    <div className="text-xs md:text-xs text-neutral-400 font-mono tracking-wide">Conversion Rate</div>
                  </div>
                  <div className="bg-black/40 rounded-xl p-3 md:p-4 border border-cyan-500/20">
                    <div className="text-xl md:text-2xl lg:text-3xl text-cyan-400 font-mono mb-1 font-bold">4.2min</div>
                    <div className="text-xs md:text-xs text-neutral-400 font-mono tracking-wide">Avg. Session</div>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-neutral-700/50 to-transparent mb-8"></div>

                {/* Benefits */}
                <div className="bg-black/40 rounded-2xl p-6 md:p-8 border border-cyan-500/30 mb-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center border border-cyan-500/40">
                        <Zap className="w-6 h-6 text-cyan-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-white mb-2">Priority Access Benefits</h4>
                      <p className="text-base md:text-sm text-neutral-400">Secure your position to unlock exclusive perks</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { title: 'Early Access Pricing', desc: 'Founder-tier discount locked in' },
                      { title: 'NFT Eligibility', desc: 'Quadrant Series collectible access' },
                      { title: 'Beta Testing Group', desc: 'Shape the final product' },
                      { title: 'HydrCore Base Access', desc: 'VR portal codes & intel briefings' }
                    ].map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="text-white text-sm font-medium mb-1">{benefit.title}</p>
                          <p className="text-neutral-500 text-sm md:text-xs">{benefit.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form */}
                <div className="mb-6">
                  <EmailCaptureForm
                    variant="final"
                    source="final_cta_primary"
                    remainingCount={Math.max(1, 10000 - count)}
                  />
                </div>

                <p className="text-center text-sm md:text-sm text-neutral-500 font-mono">
                  🔒 Join 3,847+ optimized humans in the protocol
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* NFT Series Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <div id="nft-series-section" className="relative bg-neutral-950/80 backdrop-blur-sm border-2 border-red-500/40 rounded-2xl p-8 md:p-12 overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-b from-red-500/20 via-red-600/10 to-transparent blur-xl"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>

            <div className="relative z-10">
              <div className="text-center mb-6 md:mb-8">
                <div className="flex flex-col items-center gap-3 mb-4">
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <div className="px-3 py-1 border border-red-500/40 rounded-full text-base md:text-sm text-red-300 font-mono tracking-wider font-bold">
                      CLASSIFIED INTEL • FIRST 2000 ONLY
                    </div>
                    <IntelButton 
                      variant="cyan"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Dispatch event to open neural briefing with NFT series briefing
                        window.dispatchEvent(new CustomEvent('openNeuralBriefing', { 
                          detail: { briefingId: 'nftSeries' } 
                        }));
                      }}
                      onMouseEnter={() => {
                        // Dispatch custom event to trigger Neural Briefing attention with specific briefing
                        window.dispatchEvent(new CustomEvent('neuralBriefingTrigger', { 
                          detail: { active: true, briefingId: 'nftSeries' } 
                        }));
                      }}
                      onMouseLeave={() => {
                        // Dispatch custom event to stop Neural Briefing attention
                        window.dispatchEvent(new CustomEvent('neuralBriefingTrigger', { 
                          detail: { active: false, briefingId: 'nftSeries' } 
                        }));
                      }}
                    />
                  </div>
                  <h3 className="text-2xl md:text-3xl text-white">Quadrant Series 1 NFT Collection</h3>
                </div>

                <p className="text-neutral-400 text-lg md:text-base max-w-2xl mx-auto leading-relaxed">
                  <span className="text-red-300 font-mono font-bold drop-shadow-[0_0_20px_rgba(252,165,165,1)]">SECURE YOUR SERIALIZED ASSET.</span> Be one of the <span className="text-red-300 font-mono font-semibold drop-shadow-[0_0_15px_rgba(252,165,165,0.9)]">first 2,000</span> to sign up and claim your <span className="text-red-300 font-mono font-semibold drop-shadow-[0_0_15px_rgba(252,165,165,0.9)]">Serialized NFT (1/2000)</span>. Each minted asset features a unique <span className="text-red-300 font-mono font-semibold drop-shadow-[0_0_15px_rgba(252,165,165,0.9)]">4-digit credential</span> that grants priority VR access to HydrCore Base and exclusive orbital prizes. <span className="text-red-300 font-mono font-bold drop-shadow-[0_0_20px_rgba(252,165,165,1)]">First come, first minted.</span>
                </p>
              </div>

              {/* NFT Carousel */}
              <div className="nft-carousel py-6 md:py-8 relative">
                {/* Carousel Container */}
                <div className="relative max-w-2xl mx-auto">
                  {/* Images */}
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    {nftImages.map((image, index) => (
                      <motion.div
                        key={index}
                        className="absolute inset-0"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{
                          opacity: index === currentSlide ? 1 : 0,
                          x: index === currentSlide ? 0 : index < currentSlide ? -100 : 100,
                        }}
                        transition={{ 
                          duration: 0.3,
                          ease: [0.32, 0.72, 0, 1]
                        }}
                      >
                        <div className="relative group w-full h-full">
                          <div 
                            className="absolute -inset-0.5 bg-gradient-to-b from-cyan-500/40 to-cyan-600/20 rounded-lg blur-lg" 
                            style={{ opacity: index === currentSlide ? 1 : 0 }}
                          />
                          
                          <div className="relative bg-black/30 backdrop-blur-md border border-cyan-500/40 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.3)] w-full h-full">
                            {/* Glitch effect overlay for transitions */}
                            <motion.div
                              className="absolute inset-0 pointer-events-none z-20"
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: index === currentSlide ? [0, 0.6, 0.3, 0.8, 0] : 0,
                              }}
                              transition={{
                                duration: 0.4,
                                times: [0, 0.1, 0.2, 0.3, 1],
                              }}
                              style={{
                                background: 'repeating-linear-gradient(0deg, rgba(0, 255, 255, 0.1) 0px, transparent 2px, rgba(255, 0, 0, 0.1) 4px)',
                                mixBlendMode: 'screen'
                              }}
                            />
                            
                            <img 
                              src={image.url} 
                              alt={`${image.name} - NFT ${index + 1}/2000`}
                              className="w-full h-full object-cover"
                              style={{
                                filter: index === currentSlide ? "brightness(1.2) saturate(1.3)" : "brightness(1) saturate(1)"
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Data stream effect */}
                            <div
                              className="absolute inset-0 pointer-events-none"
                              style={{
                                background: index === currentSlide 
                                  ? 'linear-gradient(rgba(34, 211, 238, 0.1) 0%, transparent 5%, transparent 95%, rgba(34, 211, 238, 0.1) 100%)'
                                  : 'linear-gradient(transparent 0%, rgba(34, 211, 238, 0.1) 5%, rgba(34, 211, 238, 0.1) 95%, transparent 100%)'
                              }}
                            />

                            {/* Rarity Badge */}
                            {image.rarity && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ 
                                  opacity: index === currentSlide ? 1 : 0.7,
                                  scale: 1
                                }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                                className="absolute top-3 right-3 md:top-4 md:right-4 z-10"
                              >
                                <div className="relative">
                                  {/* Enhanced glow effect */}
                                  <div className={`absolute -inset-2 ${
                                    image.rarity === 'ARCHETYPE' 
                                      ? 'bg-gradient-to-r from-red-500 to-orange-500' 
                                      : 'bg-gradient-to-r from-red-600 to-red-500'
                                  } rounded-lg blur-md opacity-90`} 
                                  style={{
                                    animation: 'pulse 2s ease-in-out infinite'
                                  }}
                                  />
                                  {/* Main badge */}
                                  <div className={`relative px-4 py-2 md:px-5 md:py-2.5 ${
                                    image.rarity === 'ARCHETYPE'
                                      ? 'bg-gradient-to-r from-red-500 to-orange-500'
                                      : 'bg-gradient-to-r from-red-600 to-red-500'
                                  } rounded-lg backdrop-blur-sm border-2 border-white/30 shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>
                                    <span className="text-xs md:text-sm font-mono font-black text-white tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                      {image.rarity}
                                    </span>
                                  </div>
                                </div>
                              </motion.div>
                            )}

                            {/* Serial Number Badge */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ 
                                opacity: index === currentSlide ? 1 : 0.7,
                                y: 0
                              }}
                              transition={{ delay: 0.3, duration: 0.3 }}
                              className="absolute bottom-4 left-4 z-10"
                            >
                              <div className="relative">
                                <div className="absolute -inset-1 bg-cyan-500/50 rounded blur-sm" />
                                <div className="relative px-3 py-1.5 bg-black/80 border border-cyan-500/60 rounded backdrop-blur-sm">
                                  <span className="text-xs font-mono font-bold text-cyan-300 tracking-wider">
                                    #{(index + 1).toString().padStart(4, '0')}/2000
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Navigation Buttons */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-black/60 hover:bg-black/80 border border-cyan-500/40 hover:border-cyan-500 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-cyan-500/50"
                    aria-label="Previous NFT"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                  </button>
                  
                  <button
                    onClick={nextSlide}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-black/60 hover:bg-black/80 border border-cyan-500/40 hover:border-cyan-500 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-cyan-500/50"
                    aria-label="Next NFT"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                  </button>

                  {/* Dots Indicator */}
                  <div className="flex justify-center gap-2 mt-6">
                    {nftImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentSlide 
                            ? 'bg-cyan-400 w-8' 
                            : 'bg-neutral-600 hover:bg-neutral-500'
                        }`}
                        aria-label={`Go to NFT ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Counter Section */}
              <div className="mb-8 mt-12 md:mt-16">
                {/* Main Counter */}
                <motion.div 
                  className="flex items-baseline justify-center gap-3 mb-4"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.span 
                    className="text-6xl font-mono text-red-300 tabular-nums transition-all duration-300 font-bold"
                    animate={{
                      textShadow: [
                        "0 0 30px rgba(252, 165, 165, 0.9)",
                        "0 0 50px rgba(252, 165, 165, 1), 0 0 70px rgba(252, 165, 165, 0.6)",
                        "0 0 30px rgba(252, 165, 165, 0.9)",
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {nftCount.toLocaleString()}
                  </motion.span>
                  <span className="text-2xl md:text-3xl text-neutral-600 font-mono">/</span>
                  <span className="text-3xl md:text-5xl font-mono text-neutral-500 tabular-nums">
                    2,000
                  </span>
                </motion.div>

                <p className="text-lg md:text-base text-neutral-400 font-mono mb-6 text-center font-semibold">
                  NFTs CLAIMED
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm md:text-xs text-neutral-500 font-mono mb-2">
                    <span>CLAIMING PROGRESS</span>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
                      <span className="text-orange-400">LIVE</span>
                    </div>
                  </div>
                  <div className="relative w-full h-3 bg-neutral-900 rounded-full overflow-hidden border border-red-500/20">
                    <div 
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${(nftCount / nftTargetCount) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                      <motion.div 
                        className="absolute inset-0 overflow-hidden"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Last Claim Ticker */}
                <div className="mb-6 bg-orange-500/5 border border-orange-500/20 rounded-lg px-3 py-2">
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
                    <span className="text-orange-400 font-mono">Last claim: 14 seconds ago</span>
                  </div>
                </div>

                {/* Remaining NFTs Box */}
                <div className="bg-red-950/30 border border-red-500/20 rounded-xl p-6 mb-6">
                  <div className="text-5xl md:text-5xl font-mono text-white mb-2 tabular-nums transition-all duration-300 text-center font-bold">
                    {2000 - nftCount}
                  </div>
                  <p className="text-red-300 font-mono text-lg md:text-base tracking-wider text-center font-bold">
                    MINTED NFTs REMAINING
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <TrendingUp className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs text-yellow-400 font-mono">81.5% claimed • Accelerating</span>
                  </div>
                </div>

                {/* Email Form */}
                <div className="mb-4">
                  <EmailCaptureForm
                    variant="final"
                    source="final_cta_nft"
                    remainingCount={Math.max(1, 2000 - nftCount)}
                  />
                </div>

                <p className="text-sm text-neutral-600 text-center font-mono">
                  Once 2,000 signups reached, NFT claiming period closes
                </p>
              </div>

              {/* Footer Text */}
              <div className="mt-10 md:mt-12 text-center">
                <p className="text-sm md:text-xs text-red-400/70 font-mono">
                  🔐 VR ACCESS CODES EMBEDDED • QUADRANT SERIES • COLLECTIBLE EDITION
                </p>
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
            <div className="px-4 py-1.5 border border-cyan-500/30 rounded-full text-xs text-cyan-400 font-mono tracking-wider">
              PROTOCOL AMPLIFICATION
            </div>
            
            <IntelButton 
              variant="red"
              onClick={(e) => {
                e.stopPropagation();
                window.dispatchEvent(new CustomEvent('openNeuralBriefing', { 
                  detail: { briefingId: 'transmitTheSignal' } 
                }));
              }}
              onMouseEnter={() => {
                window.dispatchEvent(new CustomEvent('neuralBriefingTrigger', { 
                  detail: { active: true, briefingId: 'transmitTheSignal' } 
                }));
              }}
              onMouseLeave={() => {
                window.dispatchEvent(new CustomEvent('neuralBriefingTrigger', { 
                  detail: { active: false, briefingId: 'transmitTheSignal' } 
                }));
              }}
            />
            
            <FloatingAvatar imageSrc="https://i.imgur.com/vRKtmNC.png" position="side" />
          </div>

          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white relative"
            animate={{
              textShadow: [
                "0 0 20px rgba(34, 211, 238, 0.5)",
                "0 0 40px rgba(34, 211, 238, 0.8), 0 0 80px rgba(34, 211, 238, 0.4)",
                "0 0 20px rgba(34, 211, 238, 0.5)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Transmit the Signal
          </motion.h2>

          <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto">
            Thousands of optimized humans are already in position.
          </p>

          {/* Falling signal beams */}
          <div className="absolute left-0 right-0 top-full pointer-events-none z-20" style={{ height: '600px' }}>
            {[20, 35, 50, 65, 80].map((left, i) => (
              <motion.div
                key={`beam-${i}`}
                className="absolute w-1 bg-gradient-to-b from-cyan-400 via-cyan-500 to-transparent rounded-full"
                style={{
                  left: `${left}%`,
                  height: '80px',
                  boxShadow: '0 0 12px rgba(34, 211, 238, 1), 0 0 24px rgba(34, 211, 238, 0.6)'
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
                  height: '50px',
                  boxShadow: '0 0 8px rgba(34, 211, 238, 0.7)'
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
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16"
        >
          {[
            { text: "I like how it's smoother and it's not spiking cortisol and making jitters and I'm confident in the fact that it won't affect my sleep!", name: "Kate D.", role: "Survey Respondent" },
            { text: "I so desperately want to drink cold brew, but I get caffeine shakes and can't sleep, yet I love the flavor.", name: "Terri H.", role: "Survey Respondent" },
            { text: "Ditching coffee for this in the afternoon.  This is what I wanted caffeine to be all along.", name: "Jordan L.", role: "Survey Respondent" }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-6"
            >
              <Zap className="w-6 h-6 text-cyan-400 mb-4" />
              <p className="text-neutral-300 mb-4 leading-relaxed">"{testimonial.text}"</p>
              <div className="text-sm">
                <p className="text-white">{testimonial.name}</p>
                <p className="text-neutral-500 text-base md:text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Multiplier Rewards Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-16"
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-1 rounded-2xl blur-sm overflow-hidden"
              style={{
                backgroundImage: 'linear-gradient(135deg, rgba(34, 211, 238, 0.3), rgba(168, 85, 247, 0.3), rgba(34, 211, 238, 0.3))',
              }}
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className="relative bg-neutral-950/60 backdrop-blur-none md:backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/30">
              {/* Background image with blur */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <img 
                  src="https://i.imgur.com/GiL99mI.png" 
                  alt="Background" 
                  className="w-full h-full object-cover blur-sm opacity-20"
                />
              </div>
              
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/70 to-transparent"></div>

              <div className="text-center relative z-10">
                <motion.div
                  className="inline-flex items-center gap-2 mb-4 px-4 py-2 border border-cyan-500/40 rounded-full bg-cyan-500/5"
                  animate={{
                    y: [-2, 2, -2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Zap className="w-4 h-4 text-cyan-400" />
                  </motion.div>
                  <span className="text-xs text-cyan-400 font-mono tracking-wider">AMPLIFY YOUR POSITION</span>
                </motion.div>

                <h3 className="text-2xl md:text-3xl text-white mb-3">Unlock Multiplier Rewards</h3>

                <p className="text-neutral-400 text-base md:text-base mb-6 max-w-xl mx-auto">
                  Ready to transmit the signal? Share your referral link. Each new optimized human you recruit unlocks multiplier perks.
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6 max-w-lg mx-auto">
                  {[
                    { value: '+5', label: 'Queue Spots' },
                    { value: '2x', label: 'NFT Chance' },
                    { value: '$10', label: 'Launch Credit' }
                  ].map((reward, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 1.4 + i * 0.1 }}
                      className="bg-neutral-900/50 border border-cyan-500/20 rounded-lg p-3"
                    >
                      <div className="text-xl font-mono text-cyan-400 mb-1">{reward.value}</div>
                      <div className="text-sm md:text-xs text-neutral-500">{reward.label}</div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-full transition-all duration-300"
                >
                  <motion.div
                    animate={{
                      x: [-0.5, 0.5, -0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Users className="w-5 h-5" />
                  </motion.div>
                  <span className="font-mono tracking-wider">GET YOUR REFERRAL LINK</span>
                  <motion.div
                    animate={{
                      x: [-0.5, 0.5, -0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </motion.button>

                <p className="text-sm text-neutral-600 mt-4 font-mono">
                  Powered by Viral Loops • Track your referrals in real-time
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hexagon Uplink Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="flex justify-center mt-16"
        >
          <button 
            className="group relative"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <motion.div
              className="absolute -inset-8 rounded-full bg-cyan-400/10 blur-2xl"
              animate={{
                scale: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="relative w-20 h-20 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 bg-neutral-900/90 backdrop-blur-sm border-2 border-cyan-400/50 group-hover:border-cyan-400"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(34, 211, 238, 0.4)',
                    '0 0 40px rgba(34, 211, 238, 0.7)',
                    '0 0 20px rgba(34, 211, 238, 0.4)',
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <div className="relative z-10 flex flex-col items-center gap-0.5">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-5 h-1.5 border-t-2 border-r-2 border-cyan-400 rotate-[-45deg] skew-x-[20deg]"
                    style={{
                      filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.8))'
                    }}
                    animate={{
                      y: [-1 - i * 0.5, 1 + i * 0.5, -1 - i * 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>

              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400"
                  style={{ left: '50%', top: '50%' }}
                  animate={{
                    scale: [0.8 + i * 0.05, 1.2 - i * 0.05, 0.8 + i * 0.05],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-[10px] font-mono text-cyan-400 tracking-widest">UPLINK</span>
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}