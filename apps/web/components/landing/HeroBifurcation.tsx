import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Zap, Satellite } from 'lucide-react';

/** Deterministic 0–1; avoids hydration mismatch from Math.random() in styles */
function stable01(row: number, col: number): number {
  const x =
    Math.sin(row * 12.9898 + col * 78.233 + row * col * 0.04123) *
    43758.5453123;
  return x - Math.floor(x);
}

function fmtPx(value: number): string {
  return `${value.toFixed(4)}px`;
}

function fmtPct(value: number): string {
  return `${value.toFixed(4)}%`;
}

export function HeroBifurcation() {
  const [hoveredSide, setHoveredSide] = useState<'product' | 'lore' | null>(null);
  const [touchedSide, setTouchedSide] = useState<'product' | 'lore' | null>(null);

  // Force rebuild - cache buster v3

  const handleProductInteraction = () => {
    setTouchedSide(touchedSide === 'product' ? null : 'product');
  };

  const handleLoreInteraction = () => {
    setTouchedSide(touchedSide === 'lore' ? null : 'lore');
  };

  const isProductActive = hoveredSide === 'product' || touchedSide === 'product';
  const isLoreActive = hoveredSide === 'lore' || touchedSide === 'lore';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Subtle Falling Signal Rivulets - Full Viewport Edges */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Left edge signal rivulet - matches Transmit the Signal style */}
        <motion.div
          className="absolute w-1 rounded-full"
          style={{
            left: '8%',
            height: '60px',
            background: 'linear-gradient(to bottom, rgb(232, 121, 249), rgb(34, 211, 238), transparent)',
            boxShadow: '0 0 10px rgba(232, 121, 249, 0.8), 0 0 20px rgba(34, 211, 238, 0.4)'
          }}
          animate={{
            y: ['-100px', '100vh'],
            opacity: [0, 1, 1, 0],
            boxShadow: [
              '0 0 10px rgba(232, 121, 249, 0.8), 0 0 20px rgba(34, 211, 238, 0.4)',
              '0 0 20px rgba(232, 121, 249, 1), 0 0 40px rgba(34, 211, 238, 0.6)',
              '0 0 10px rgba(232, 121, 249, 0.8), 0 0 20px rgba(34, 211, 238, 0.4)'
            ]
          }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 3 },
            opacity: { duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 3 },
            boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        {/* Right edge signal rivulet */}
        <motion.div
          className="absolute w-1 rounded-full"
          style={{
            right: '10%',
            height: '70px',
            background: 'linear-gradient(to bottom, rgb(34, 211, 238), rgb(232, 121, 249), transparent)',
            boxShadow: '0 0 10px rgba(34, 211, 238, 0.8), 0 0 20px rgba(232, 121, 249, 0.4)'
          }}
          animate={{
            y: ['-100px', '100vh'],
            opacity: [0, 1, 1, 0],
            boxShadow: [
              '0 0 10px rgba(34, 211, 238, 0.8), 0 0 20px rgba(232, 121, 249, 0.4)',
              '0 0 20px rgba(34, 211, 238, 1), 0 0 40px rgba(232, 121, 249, 0.6)',
              '0 0 10px rgba(34, 211, 238, 0.8), 0 0 20px rgba(232, 121, 249, 0.4)'
            ]
          }}
          transition={{
            y: { duration: 7, repeat: Infinity, ease: "linear", delay: 3.5, repeatDelay: 3.5 },
            opacity: { duration: 7, repeat: Infinity, ease: "linear", delay: 3.5, repeatDelay: 3.5 },
            boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        {/* Additional subtle signal - center left */}
        <motion.div
          className="absolute w-0.5 rounded-full"
          style={{
            left: '15%',
            height: '40px',
            background: 'linear-gradient(to bottom, rgba(232, 121, 249, 0.6), rgba(34, 211, 238, 0.6), transparent)',
            boxShadow: '0 0 6px rgba(232, 121, 249, 0.6)'
          }}
          animate={{
            y: ['-100px', '100vh'],
            opacity: [0, 0.8, 0.8, 0],
            boxShadow: [
              '0 0 6px rgba(232, 121, 249, 0.6)',
              '0 0 12px rgba(34, 211, 238, 0.9)',
              '0 0 6px rgba(232, 121, 249, 0.6)'
            ]
          }}
          transition={{
            y: { duration: 8, repeat: Infinity, ease: "linear", delay: 6, repeatDelay: 4 },
            opacity: { duration: 8, repeat: Infinity, ease: "linear", delay: 6, repeatDelay: 4 },
            boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>

      {/* Background effects */}
      <div className="absolute inset-0">
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-cyan-950/20 to-transparent transition-opacity duration-700 ${
            isProductActive ? 'opacity-100' : 'opacity-30'
          }`}
        />
        <div 
          className={`absolute inset-0 bg-gradient-to-l from-red-950/20 to-transparent transition-opacity duration-700 ${
            isLoreActive ? 'opacity-100' : 'opacity-30'
          }`}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20">
        {/* Live Data Feed - Scrolling Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
          <motion.div
            className="absolute whitespace-nowrap text-cyan-400 font-mono text-xs"
            style={{ top: '20%' }}
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            NEURAL_SYNC_ACTIVE • OPERATIVES_QUEUED: 1385 • PROTOCOL_STATUS: LIVE • NFT_MINT_CAPACITY: 47% • BETA_ACCESS_OPEN • HYDRACORE_ONLINE • SIGNAL_STRENGTH: 98.2% • 
          </motion.div>
          <motion.div
            className="absolute whitespace-nowrap text-cyan-400 font-mono text-xs"
            style={{ top: '40%' }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear", delay: 2 }}
          >
            BASELINE_OPTIMIZATION_ACTIVE • COGNITIVE_STACK_LOADED • ELECTROLYTE_MATRIX: STABLE • SERIALIZED_ACCESS: LIMITED • QUEUE_POSITION_TRACKING • 
          </motion.div>
          <motion.div
            className="absolute whitespace-nowrap text-cyan-400 font-mono text-xs"
            style={{ top: '60%' }}
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear", delay: 4 }}
          >
            PRECURSOR_PROTOCOL_INITIALIZING • FOUNDER_ACCESS_TIER_1 • MEDALLION_EXTRACTION_READY • NETWORK_STATUS: GLOBAL • SYNC_RATE: 144Hz • 
          </motion.div>
          <motion.div
            className="absolute whitespace-nowrap text-cyan-400 font-mono text-xs"
            style={{ top: '80%' }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 38, repeat: Infinity, ease: "linear", delay: 1 }}
          >
            BIOHACKER_COLLECTIVE_ONLINE • EARLY_ACCESS_DISCOUNT_ACTIVE • FIELD_TESTING_GROUP_OPEN • LAUNCH_SEQUENCE_2026 • OPTIMIZED_HUMANS: +1,385 • 
          </motion.div>
        </div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          {/* Noise/Grain Texture Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
            }}
          />

          {/* Ambient Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Large slow-moving particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`large-${i}`}
                className="absolute rounded-full bg-cyan-400/20 blur-xl"
                style={{
                  width: fmtPx(60 + stable01(i, 1) * 80),
                  height: fmtPx(60 + stable01(i, 2) * 80),
                  left: fmtPct(stable01(i, 3) * 100),
                  top: fmtPct(stable01(i, 4) * 100),
                }}
                animate={{
                  x: [0, stable01(i, 5) * 100 - 50, 0],
                  y: [0, stable01(i, 6) * 100 - 50, 0],
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 15 + stable01(i, 7) * 10,
                  repeat: Infinity,
                  delay: stable01(i, 8) * 5,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Medium particles */}
            {[...Array(12)].map((_, i) => {
              const r = i + 64;
              return (
              <motion.div
                key={`medium-${i}`}
                className="absolute rounded-full blur-md"
                style={{
                  width: fmtPx(20 + stable01(r, 1) * 40),
                  height: fmtPx(20 + stable01(r, 2) * 40),
                  left: fmtPct(stable01(r, 3) * 100),
                  top: fmtPct(stable01(r, 4) * 100),
                  backgroundImage:
                    i % 2 === 0
                      ? 'radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%)'
                      : 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
                }}
                animate={{
                  x: [0, stable01(r, 5) * 60 - 30, 0],
                  y: [0, stable01(r, 6) * 60 - 30, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 10 + stable01(r, 7) * 8,
                  repeat: Infinity,
                  delay: stable01(r, 8) * 3,
                  ease: "easeInOut"
                }}
              />
            );
            })}

            {/* Depth layer - blurred background orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                delay: 5,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Content - now with relative z-index to sit above particles */}
          <div className="relative z-10">
            {/* Hero Background - Right Side Placement */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: '60%',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 100%)',
                  maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 100%)'
                }}
              >
                <img
                  src="https://i.imgur.com/FAjDfkP.jpeg"
                  alt="The +1 YOU Operative"
                  className="opacity-70 md:opacity-100"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 25%',
                    filter: 'grayscale(0.5) contrast(1.15) brightness(0.75) saturate(0.55)'
                  }}
                />
              </div>

              {/* Soft edge vignette - gentle fade to black at all edges */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.9) 100%)'
                }}
              />

              {/* Base overlay - very subtle darkness */}
              <div className="absolute inset-0 bg-black/15" />

              {/* Subtle atmospheric glow - bottom */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(236, 72, 153, 0.08) 0%, rgba(139, 92, 246, 0.04) 25%, transparent 50%)'
                }}
              />

              {/* Very subtle cyan glow (left side) */}
              <motion.div
                className="absolute inset-0 mix-blend-screen"
                animate={{
                  opacity: [0.08, 0.15, 0.08],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  background: 'radial-gradient(ellipse at 20% 50%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)'
                }}
              />

              {/* Very subtle magenta glow (right side) */}
              <motion.div
                className="absolute inset-0 mix-blend-screen"
                animate={{
                  opacity: [0.15, 0.3, 0.15],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
                style={{
                  background: 'radial-gradient(ellipse at 80% 40%, rgba(34, 211, 238, 0.35) 0%, rgba(6, 182, 212, 0.25) 30%, transparent 60%)'
                }}
              />
              

            </div>

            {/* Removed floating Optimized Human portrait - integrating +1 You into Choose Your Path instead */}

            <motion.div 
              className="inline-flex items-center gap-3 mb-16 px-8 py-4 border border-cyan-500/40 rounded-full text-cyan-400 font-mono tracking-wider text-2xl md:text-3xl lg:text-4xl backdrop-blur-sm bg-black/40"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
              }}
              transition={{ duration: 0.6 }}
              style={{
                boxShadow: "0 0 30px rgba(34, 211, 238, 0.2), inset 0 0 20px rgba(34, 211, 238, 0.1)"
              }}
            >
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-2.5 h-2.5 rounded-full bg-cyan-400"
                style={{
                  boxShadow: "0 0 10px rgba(34, 211, 238, 0.8)"
                }}
              />
              <span className="drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">hydrbrew°</span>
            </motion.div>
            
            <div className="relative inline-block mb-12">
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl tracking-tight font-bold md:px-[10vw] text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent block mb-2">
                  Reprogramming the Ritual
                </span>
                <motion.span 
                  className="block text-2xl md:text-3xl lg:text-4xl font-mono text-cyan-400 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  // Arrive Optimized
                </motion.span>
              </motion.h1>
              
              {/* Horizontal Scanline */}
              <motion.div
                className="absolute top-0 left-0 w-full h-1 pointer-events-none"
                initial={{ y: 0, opacity: 0 }}
                animate={{ 
                  y: [0, "100%"],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{ 
                  duration: 1.2,
                  times: [0, 0.1, 0.9, 1],
                  ease: "linear",
                  delay: 0.3
                }}
              >
                {/* Main scanline */}
                <div className="w-full h-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)]" />
                {/* Glow trail */}
                <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-cyan-400/50 to-transparent blur-sm" />
              </motion.div>
            </div>
            
            {/* Enhanced tagline container with backdrop */}
            <motion.div
              className="relative max-w-3xl mx-auto mb-16 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p className="text-base md:text-lg text-neutral-200 leading-relaxed mb-3"
                 style={{
                   textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
                   letterSpacing: "0.02em"
                 }}>
                <span className="font-bold text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">A midday reset</span> engineered to upgrade your baseline.
              </p>
              
              <p className="text-base md:text-lg text-cyan-300 font-mono text-center"
                 style={{
                   textShadow: "0 0 20px rgba(34, 211, 238, 0.6), 0 2px 8px rgba(0, 0, 0, 0.8)",
                   letterSpacing: "0.02em"
                 }}>
                Sustained clarity. Zero systemic debt.
              </p>
            </motion.div>

            {/* 2026 LAUNCH BADGE */}
            <div className="launching-2026-badge inline-flex items-center gap-3 mb-4 px-10 py-4 border border-cyan-500/40 rounded-full text-cyan-400 font-mono tracking-wider text-2xl md:text-3xl backdrop-blur-sm bg-black/40 relative overflow-hidden">
              {/* Light sweep effect */}
              <div className="light-sweep absolute inset-0 rounded-full" />
              <span className="drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] relative z-10">LAUNCHING 2026</span>
            </div>

            <style>{`
              .launching-2026-badge {
                box-shadow: 0 0 30px rgba(34, 211, 238, 0.2), inset 0 0 20px rgba(34, 211, 238, 0.1);
                animation: badge-pulse 3s ease-in-out infinite;
              }

              .light-sweep {
                background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.3), transparent);
                animation: light-sweep 4s ease-in-out infinite;
              }
              
              @keyframes badge-pulse {
                0%, 100% {
                  box-shadow: 0 0 30px rgba(34, 211, 238, 0.2), inset 0 0 20px rgba(34, 211, 238, 0.1);
                }
                50% {
                  box-shadow: 0 0 50px rgba(34, 211, 238, 0.4), inset 0 0 30px rgba(34, 211, 238, 0.2);
                }
              }
              
              @keyframes light-sweep {
                0% {
                  transform: translateX(-100%) skewX(-15deg);
                }
                50%, 100% {
                  transform: translateX(200%) skewX(-15deg);
                }
              }
            `}</style>

            {/* Social Proof / Scarcity Ticker */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-10 relative"
            >
              <div className="inline-flex items-center gap-4 px-7 py-3.5 bg-black/60 border border-cyan-500/30 rounded-full backdrop-blur-md">
                {/* Live indicator */}
                <motion.div
                  className="flex items-center gap-2.5"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-400" 
                       style={{ boxShadow: "0 0 8px rgba(34, 211, 238, 0.8)" }} 
                  />
                  <span className="text-[10px] md:text-xs font-mono text-cyan-400 tracking-widest">LIVE</span>
                </motion.div>

                {/* Divider */}
                <div className="w-px h-5 bg-cyan-500/30" />

                {/* Counter with animated number + Human Portrait */}
                <div className="flex items-center gap-3">
                  {/* Tiny framed human portrait with cyberpunk frame */}
                  <motion.div
                    className="relative"
                    animate={{
                      boxShadow: [
                        "0 0 10px rgba(34, 211, 238, 0.4)",
                        "0 0 20px rgba(34, 211, 238, 0.8)",
                        "0 0 10px rgba(34, 211, 238, 0.4)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* Outer cyberpunk frame */}
                    <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-900/20 p-[2px] border border-cyan-400/60">
                      {/* Inner frame */}
                      <div className="w-full h-full rounded-lg overflow-hidden bg-black/80 border border-cyan-400/30">
                        <img 
                          src="https://i.imgur.com/PalbaX6.png"
                          alt="Operative"
                          className="w-full h-full object-cover opacity-100"
                          style={{
                            filter: "grayscale(0%) brightness(1.5) contrast(1.5) saturate(1.1)",
                            transform: "scale(1.3)",
                            objectPosition: "center 40%"
                          }}
                        />
                      </div>
                      {/* Corner accents */}
                      <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-cyan-400 rounded-tl" />
                      <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t-2 border-r-2 border-cyan-400 rounded-tr" />
                      <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b-2 border-l-2 border-cyan-400 rounded-bl" />
                      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 border-cyan-400 rounded-br" />
                    </div>
                    
                    {/* Gentle pulsing glow ring */}
                    <motion.div
                      className="absolute -inset-1 rounded-lg bg-cyan-400/20 blur-md -z-10"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [0.95, 1.05, 0.95]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>

                  <div className="flex items-center gap-2.5">
                    <motion.span 
                      className="text-sm md:text-base font-mono text-white font-semibold"
                      key={1385}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      1,385
                    </motion.span>
                    <span className="text-xs md:text-sm text-neutral-400">Operatives in Queue</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px h-5 bg-cyan-500/30 hidden sm:block" />

                {/* Scarcity message */}
                <div className="hidden sm:flex items-center gap-2.5">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      filter: [
                        "drop-shadow(0 0 0px rgba(239, 68, 68, 0))",
                        "drop-shadow(0 0 6px rgba(239, 68, 68, 0.8))",
                        "drop-shadow(0 0 0px rgba(239, 68, 68, 0))"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-red-400 text-xs md:text-sm font-mono"
                  >
                    ⚠
                  </motion.div>
                  <span className="text-xs md:text-sm text-neutral-400">
                    Limited <span className="text-red-400">Serialized NFT</span> spots remaining
                  </span>
                </div>

                {/* Divider */}
                <div className="w-px h-5 bg-cyan-500/30 hidden md:block" />

                {/* Claim Position Button */}
                <motion.button
                  onClick={() => {
                    const emailSection = document.getElementById('email-capture');
                    emailSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/50 rounded-full text-xs font-mono text-red-400 hover:text-red-300 hover:border-red-400 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(239, 68, 68, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="tracking-wider">CLAIM POSITION</span>
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </div>

              {/* Subtle pulsing glow */}
              <motion.div
                className="absolute inset-0 -m-1 rounded-full bg-cyan-500/20 blur-xl -z-10"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>

        </motion.div>

        {/* Path Selection Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12 max-w-5xl mx-auto relative"
        >
          {/* Main "Choose Your Path" headline with +1 You integration */}
          <div className="relative inline-block mb-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-white mb-2 tracking-tight flex flex-wrap items-center justify-center gap-2 md:gap-3">
              <span>Choose Your Path to</span>
              <motion.span 
                className="relative inline-flex items-center gap-2 px-4 md:px-6 py-2 rounded-full"
                animate={{
                  background: hoveredSide === 'product' 
                    ? 'linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(6, 182, 212, 0.1), rgba(6, 182, 212, 0.2))'
                    : hoveredSide === 'lore'
                    ? 'linear-gradient(to right, rgba(236, 72, 153, 0.2), rgba(236, 72, 153, 0.1), rgba(236, 72, 153, 0.2))'
                    : 'linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(6, 182, 212, 0.1), rgba(6, 182, 212, 0.2))',
                  borderColor: hoveredSide === 'product'
                    ? 'rgba(34, 211, 238, 0.5)'
                    : hoveredSide === 'lore'
                    ? 'rgba(236, 72, 153, 0.5)'
                    : 'rgba(34, 211, 238, 0.5)',
                  boxShadow: hoveredSide === 'product'
                    ? '0 0 30px rgba(34, 211, 238, 0.4)'
                    : hoveredSide === 'lore'
                    ? '0 0 30px rgba(236, 72, 153, 0.4)'
                    : '0 0 15px rgba(34, 211, 238, 0.2)'
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  border: '1px solid'
                }}
              >
                {/* Pulsing glow */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-lg"
                  animate={{
                    background: hoveredSide === 'product'
                      ? 'rgba(34, 211, 238, 0.3)'
                      : hoveredSide === 'lore'
                      ? 'rgba(236, 72, 153, 0.3)'
                      : 'rgba(34, 211, 238, 0.2)',
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.95, 1.05, 0.95]
                  }}
                  transition={{ 
                    background: { duration: 0.5, ease: "easeOut" },
                    opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
                <motion.span 
                  className="relative text-4xl md:text-5xl lg:text-6xl font-bold"
                  animate={{
                    textShadow: hoveredSide === 'product'
                      ? [
                          '0 0 20px rgba(34, 211, 238, 0.6)',
                          '0 0 40px rgba(34, 211, 238, 1)',
                          '0 0 20px rgba(34, 211, 238, 0.6)'
                        ]
                      : hoveredSide === 'lore'
                      ? [
                          '0 0 20px rgba(236, 72, 153, 0.6)',
                          '0 0 40px rgba(236, 72, 153, 1)',
                          '0 0 20px rgba(236, 72, 153, 0.6)'
                        ]
                      : [
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
                <motion.span 
                  className="relative text-3xl md:text-4xl lg:text-5xl"
                  animate={{
                    color: hoveredSide === 'product'
                      ? 'rgba(34, 211, 238, 1)'
                      : hoveredSide === 'lore'
                      ? 'rgba(236, 72, 153, 1)'
                      : 'rgba(34, 211, 238, 1)'
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  You
                </motion.span>
              </motion.span>
            </h2>
            
            {/* Explainer - Two ways to experience */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-4"
            >
              <p className="text-base md:text-lg text-neutral-300 mb-2">
                Every serving upgrades your cognitive baseline.
              </p>
              <p className="text-base md:text-lg text-neutral-400">
                Choose how you experience it:
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            className="text-neutral-400 text-base md:text-lg font-mono flex flex-wrap items-center justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span className="text-cyan-400 font-semibold">Not sure?</span> 
            <span>Click the</span>
            <motion.span 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/90 border rounded-md relative cursor-pointer"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(239, 68, 68, 0.3)',
                  '0 0 20px rgba(239, 68, 68, 0.6)',
                  '0 0 10px rgba(239, 68, 68, 0.3)',
                  '0 0 10px rgba(34, 211, 238, 0.3)',
                  '0 0 20px rgba(34, 211, 238, 0.6)',
                  '0 0 10px rgba(34, 211, 238, 0.3)',
                  '0 0 10px rgba(239, 68, 68, 0.3)'
                ],
                borderColor: [
                  'rgba(239, 68, 68, 1)',
                  'rgba(239, 68, 68, 0.6)',
                  'rgba(239, 68, 68, 1)',
                  'rgba(34, 211, 238, 1)',
                  'rgba(34, 211, 238, 0.6)',
                  'rgba(34, 211, 238, 1)',
                  'rgba(239, 68, 68, 1)'
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              onClick={(e) => {
                e.stopPropagation();
                window.dispatchEvent(new CustomEvent('openNeuralBriefing', { 
                  detail: { briefingId: 'notSure' } 
                }));
              }}
              onMouseEnter={() => {
                window.dispatchEvent(new CustomEvent('neuralBriefingTrigger', { 
                  detail: { active: true, briefingId: 'notSure' } 
                }));
              }}
              onMouseLeave={() => {
                window.dispatchEvent(new CustomEvent('neuralBriefingTrigger', { 
                  detail: { active: false, briefingId: 'notSure' } 
                }));
              }}
            >
              {/* Pulsing glow ring */}
              <motion.div
                className="absolute -inset-1 rounded-md blur-sm -z-10"
                animate={{
                  opacity: [0.3, 0.6, 0.3, 0.3, 0.6, 0.3, 0.3],
                  scale: [0.95, 1.05, 0.95, 0.95, 1.05, 0.95, 0.95],
                  backgroundColor: [
                    'rgba(239, 68, 68, 0.2)',
                    'rgba(239, 68, 68, 0.2)',
                    'rgba(239, 68, 68, 0.2)',
                    'rgba(34, 211, 238, 0.2)',
                    'rgba(34, 211, 238, 0.2)',
                    'rgba(34, 211, 238, 0.2)',
                    'rgba(239, 68, 68, 0.2)'
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
                        'rgba(239, 68, 68, 1)',
                        'rgba(239, 68, 68, 1)',
                        'rgba(239, 68, 68, 1)',
                        'rgba(34, 211, 238, 1)',
                        'rgba(34, 211, 238, 1)',
                        'rgba(34, 211, 238, 1)',
                        'rgba(239, 68, 68, 1)'
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
                    'rgba(239, 68, 68, 1)',
                    'rgba(239, 68, 68, 1)',
                    'rgba(239, 68, 68, 1)',
                    'rgba(34, 211, 238, 1)',
                    'rgba(34, 211, 238, 1)',
                    'rgba(34, 211, 238, 1)',
                    'rgba(239, 68, 68, 1)'
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

        {/* Bifurcation CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
        >
          {/* Animated divider between cards */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px pointer-events-none">
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scaleY: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* VS indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black border border-cyan-500/30 rounded-full w-10 h-10 flex items-center justify-center"
            >
              <span className="text-cyan-400 text-xs font-mono font-bold">VS</span>
            </motion.div>
          </div>

          {/* Product Path - Left/Primary */}
          <motion.div
            onMouseEnter={() => {
              setHoveredSide('product');
              // Dispatch custom event to trigger Neural Briefing attention
              window.dispatchEvent(new CustomEvent('neuralBriefingTrigger', { detail: { active: true } }));
              // Dispatch custom event for Product DNA Ticker
              window.dispatchEvent(new CustomEvent('shopCardHover', { detail: { isHovered: true } }));
            }}
            onMouseLeave={() => {
              setHoveredSide(null);
              // Dispatch custom event to stop Neural Briefing attention
              window.dispatchEvent(new CustomEvent('neuralBriefingTrigger', { detail: { active: false } }));
              // Dispatch custom event for Product DNA Ticker
              window.dispatchEvent(new CustomEvent('shopCardHover', { detail: { isHovered: false } }));
            }}
            onClick={handleProductInteraction}
            onTouchStart={handleProductInteraction}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative group cursor-pointer h-full"
          >
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur transition-opacity duration-500 ${
              isProductActive ? 'opacity-100' : 'opacity-0'
            }`} />
            <div className={`relative bg-neutral-900 rounded-2xl p-8 md:p-10 border transition-all duration-500 h-full flex flex-col ${
              isProductActive ? 'border-cyan-500/50 shadow-[0_0_40px_rgba(34,211,238,0.3)]' : 'border-cyan-500/20'
            }`} style={{
              backgroundImage: `
                linear-gradient(to right, rgba(34, 211, 238, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(34, 211, 238, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}>
              {/* Contextual Neural Briefing Button - Smaller, top-right */}
              <div className="absolute top-4 right-4 z-30">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Dispatch event to open neural briefing with default briefing
                    window.dispatchEvent(new CustomEvent('openNeuralBriefing', {
                      detail: { briefingId: 'default' }
                    }));
                  }}
                  className="group/briefing flex items-center gap-2 px-3 py-2 bg-black/80 border border-cyan-400/40 hover:border-cyan-400 rounded-lg backdrop-blur-sm transition-all hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                  aria-label="Open Intel Briefing"
                >
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-0.5 bg-cyan-400 rounded-full"
                        style={{
                          height: `${6 + i * 1.5}px`,
                          animation: `wave-pulse 0.8s ease-in-out infinite`,
                          animationDelay: `${i * 0.15}s`
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 tracking-wider">INTEL</span>
                </button>
              </div>

              {/* Main Content - Always visible, centered */}
              <div className="flex flex-col items-center justify-center text-center flex-1 py-8">
                {/* Icon */}
                <motion.div 
                  className="mb-6 w-16 h-16 md:w-20 md:h-20 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30"
                  animate={isProductActive ? {
                    boxShadow: [
                      '0 0 20px rgba(34, 211, 238, 0.3)',
                      '0 0 40px rgba(34, 211, 238, 0.6)',
                      '0 0 20px rgba(34, 211, 238, 0.3)'
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Zap className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />
                </motion.div>

                {/* Title */}
                <h3 className="text-3xl md:text-4xl mb-4 text-white font-bold">
                  Shop hydrbrew°
                </h3>

                {/* Description */}
                <p className="text-white text-base md:text-lg leading-relaxed max-w-md mb-8" style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.5)" }}>
                  Explore the science, see the proof, and secure your first case.
                </p>

                {/* Path Label Badge */}
                <div className="mb-6">
                  <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                    <span className="text-xs font-mono text-cyan-400 tracking-wider">PRODUCT JOURNEY</span>
                  </div>
                </div>
              </div>

              {/* Scroll CTA - Shows on hover/active */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isProductActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
                className="mt-auto"
              >
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const productSection = document.getElementById('product');
                    if (productSection) {
                      productSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold py-4 rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:shadow-[0_0_50px_rgba(34,211,238,0.8)] flex items-center justify-center gap-3 group/cta"
                >
                  <span className="text-sm md:text-base tracking-wide">EXPLORE THE SCIENCE</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Lore Path - Right/Secondary */}
          <motion.div
            onMouseEnter={() => {
              setHoveredSide('lore');
              // Dispatch custom event to trigger Neural Briefing attention
              window.dispatchEvent(new CustomEvent('neuralBriefingTrigger', { detail: { active: true } }));
            }}
            onMouseLeave={() => {
              setHoveredSide(null);
              // Dispatch custom event to stop Neural Briefing attention
              window.dispatchEvent(new CustomEvent('neuralBriefingTrigger', { detail: { active: false } }));
            }}
            onClick={handleLoreInteraction}
            onTouchStart={handleLoreInteraction}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative group cursor-pointer h-full"
          >
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur transition-opacity duration-500 ${
              isLoreActive ? 'opacity-100' : 'opacity-0'
            }`} />
            <div className={`relative bg-neutral-900 rounded-2xl p-8 md:p-10 border transition-all duration-500 overflow-hidden h-full min-h-[420px] flex flex-col ${
              isLoreActive ? 'border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.3)]' : 'border-red-500/20'
            }`} style={{
              backgroundImage: `
                linear-gradient(to right, rgba(239, 68, 68, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(239, 68, 68, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}>
              {/* Digital Static/Glitch Background Effect */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.08] z-0">
                {/* Animated scan lines */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)',
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Digital noise/static texture */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px 200px',
                  }}
                  animate={{
                    opacity: [0.4, 0.7, 0.4],
                    backgroundPosition: ['0px 0px', '20px 20px', '0px 0px'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Glitch bars that occasionally flash */}
                <motion.div
                  className="absolute top-1/4 left-0 right-0 h-px bg-red-400/30"
                  animate={{
                    opacity: [0, 1, 0, 0, 0],
                    scaleX: [1, 0.8, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div
                  className="absolute top-2/3 left-0 right-0 h-px bg-red-400/30"
                  animate={{
                    opacity: [0, 0, 1, 0, 0],
                    scaleX: [1, 1.2, 0.9, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: 2,
                    repeatDelay: 2,
                    ease: "easeInOut"
                  }}
                />
              </div>

              {/* Contextual Neural Briefing Button - Smaller, top-right */}
              <div className="absolute top-4 right-4 z-30">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Dispatch event to open neural briefing with default briefing
                    window.dispatchEvent(new CustomEvent('openNeuralBriefing', {
                      detail: { briefingId: 'default' }
                    }));
                  }}
                  className="group/briefing flex items-center gap-2 px-3 py-2 bg-black/80 border border-cyan-400/40 hover:border-cyan-400 rounded-lg backdrop-blur-sm transition-all hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                  aria-label="Open Intel Briefing"
                >
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-0.5 bg-cyan-400 rounded-full"
                        style={{
                          height: `${6 + i * 1.5}px`,
                          animation: `wave-pulse 0.8s ease-in-out infinite`,
                          animationDelay: `${i * 0.15}s`
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 tracking-wider">INTEL</span>
                </button>
              </div>

              {/* Main Content - Always visible, centered */}
              <div className="flex flex-col items-center justify-center text-center flex-1 py-8 relative z-10">
                {/* Icon */}
                <motion.div 
                  className="mb-6 w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-500/40 backdrop-blur-md flex items-center justify-center border-2 border-red-500/80 shadow-lg shadow-red-500/50"
                  animate={isLoreActive ? {
                    boxShadow: [
                      '0 0 20px rgba(239, 68, 68, 0.5)',
                      '0 0 40px rgba(239, 68, 68, 0.8)',
                      '0 0 20px rgba(239, 68, 68, 0.5)'
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Satellite className="w-8 h-8 md:w-10 md:h-10 text-red-200 drop-shadow-[0_0_12px_rgba(239,68,68,1)]" />
                </motion.div>

                {/* Title */}
                <h3 className="text-3xl md:text-4xl mb-4 text-white font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  Enter HydrCore Base
                </h3>

                {/* Description */}
                <p className="text-neutral-200 text-base md:text-lg leading-relaxed max-w-md mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  Discover the archetypes, claim your NFT identity, and join the gamified protocol.
                </p>

                {/* Path Label Badge */}
                <div className="mb-6">
                  <div className="px-4 py-2 bg-red-500/40 backdrop-blur-md border-2 border-red-500/80 rounded-full shadow-lg shadow-red-500/50">
                    <span className="text-xs font-mono text-red-200 tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,1)] font-semibold">LORE JOURNEY</span>
                  </div>
                </div>
              </div>

              {/* Scroll CTA - Shows on hover/active */}
              <div 
                className="mt-auto"
                style={{ 
                  opacity: isLoreActive ? 1 : 0,
                  transform: isLoreActive ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease'
                }}
              >
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Button clicked!');
                    
                    // Try scrolling to email-capture section first (parent of NFT section)
                    const emailSection = document.getElementById('email-capture');
                    console.log('Email section found:', emailSection);
                    
                    if (emailSection) {
                      emailSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      
                      // Then scroll to NFT section after a delay
                      setTimeout(() => {
                        const nftSection = document.getElementById('nft-series-section');
                        console.log('NFT section found:', nftSection);
                        if (nftSection) {
                          nftSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }, 800);
                    }
                  }}
                  style={{ opacity: 1 }}
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-xl transition-colors duration-300 shadow-[0_0_30px_rgba(239,68,68,0.5)] hover:shadow-[0_0_50px_rgba(239,68,68,0.8)] flex items-center justify-center gap-3 group/cta"
                >
                  <span className="text-sm md:text-base tracking-wide">Claim your Position</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator removed - individual path buttons now handle scrolling */}
      </div>
    </section>
  );
}