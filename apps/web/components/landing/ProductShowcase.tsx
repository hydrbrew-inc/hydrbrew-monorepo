import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Check, Leaf, Beaker, Shield } from 'lucide-react';

export function ProductShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTagIndex, setActiveTagIndex] = useState(0);
  const [isResearchExpanded, setIsResearchExpanded] = useState(false);
  const tasteProfiles = ['Smooth', 'Crisp', 'Mineral', 'Light'];

  // Rotate through taste profiles
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTagIndex((prev) => (prev + 1) % tasteProfiles.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const specs = [
    { icon: Check, label: 'Low Sugar', value: '0g added sugar' },
    { icon: Leaf, label: 'Low Caffeine', value: '75mg caffeine' },
    { icon: Beaker, label: 'Shelf Stable', value: '2+ years (Mars-ready)' },
    { icon: Shield, label: 'Full Cognitive Stack', value: 'L-Theanine and Lion\'s Mane' }
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: '#05070A' }}>
      {/* Frost/Mineral Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='frostFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.4, 0 0 0 0 0.5, 0 0 0 0 0.6, 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23frostFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '300px 300px',
        }}
      />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Product visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl" />
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-cyan-500/20">
              {/* Background image with cyan tone */}
              <div className="absolute inset-0">
                <img
                  src="https://i.imgur.com/hYCNbbC.jpeg"
                  alt="HydrBrew"
                  className="w-full h-full object-cover"
                />
                {/* Cyan color overlay */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.4), rgba(6, 182, 212, 0.25))',
                    mixBlendMode: 'screen'
                  }}
                />
              </div>
              
              {/* Animated synth wave borders */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 400"
                preserveAspectRatio="none"
              >
                {/* SUBTLE TRAVELING BORDER GLOW - Single line that traces the edges */}
                <motion.rect
                  x="0"
                  y="0"
                  width="400"
                  height="400"
                  fill="none"
                  stroke="rgba(34, 211, 238, 0.6)"
                  strokeWidth="2"
                  strokeDasharray="100 300"
                  animate={{
                    strokeDashoffset: [0, -400],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{
                    strokeDashoffset: { duration: 8, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                  filter="url(#subtleGlow)"
                />

                {/* CORNER BRACKETS - Minimal L-shaped accents */}
                {[
                  { x: 0, y: 0, transform: "" },           // Top-left
                  { x: 400, y: 0, transform: "scale(-1,1)" },   // Top-right
                  { x: 400, y: 400, transform: "scale(-1,-1)" }, // Bottom-right
                  { x: 0, y: 400, transform: "scale(1,-1)" }     // Bottom-left
                ].map((corner, i) => (
                  <g key={`corner-${i}`} transform={`translate(${corner.x},${corner.y})`}>
                    <g transform={corner.transform}>
                      {/* Horizontal line */}
                      <motion.line
                        x1="0" y1="0" x2="40" y2="0"
                        stroke="rgba(34, 211, 238, 1)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        animate={{
                          opacity: [0.5, 1, 0.5],
                          x2: [30, 50, 30]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut"
                        }}
                        filter="url(#subtleGlow)"
                      />
                      {/* Vertical line */}
                      <motion.line
                        x1="0" y1="0" x2="0" y2="40"
                        stroke="rgba(34, 211, 238, 1)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        animate={{
                          opacity: [0.5, 1, 0.5],
                          y2: [30, 50, 30]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut"
                        }}
                        filter="url(#subtleGlow)"
                      />
                      {/* Corner dot */}
                      <motion.circle
                        cx="0" cy="0" r="3"
                        fill="rgba(34, 211, 238, 1)"
                        animate={{
                          opacity: [0.6, 1, 0.6],
                          r: [2.5, 4, 2.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut"
                        }}
                        filter="url(#subtleGlow)"
                      />
                    </g>
                  </g>
                ))}

                {/* MINIMAL FLOATING PARTICLES - Just a few subtle dots */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.circle
                    key={`particle-${i}`}
                    r="1.5"
                    fill="rgba(34, 211, 238, 0.8)"
                    animate={{
                      cx: [50 + i * 100, 50 + i * 100],
                      cy: [50, 350],
                      opacity: [0, 0.6, 0.6, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      delay: i * 1.5,
                      ease: "easeInOut"
                    }}
                    filter="url(#subtleGlow)"
                  />
                ))}
                
                {/* SVG filters - Subtle glow only */}
                <defs>
                  <filter id="subtleGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>

            {/* Floating spec badges */}
            
          </motion.div>

          {/* Product details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6 px-4 py-1.5 border border-cyan-500/30 rounded-full text-xs text-cyan-400 font-mono tracking-wider">
              THE PRODUCT
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white">
              Smart Hydration + Focus.
              <br />
              <span className="inline-flex flex-wrap items-center gap-3 md:gap-4 mt-2">
                <span>Zero Compromise.</span>
                <motion.button
                  onClick={() => {
                    const emailSection = document.getElementById('protocol-claim-position');
                    emailSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="relative inline-flex items-center gap-2 px-3 md:px-4 py-1.5 bg-gradient-to-r from-cyan-500/20 via-cyan-500/10 to-cyan-500/20 border border-cyan-400/50 rounded-full cursor-pointer ml-1 md:ml-2"
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
                    className="relative text-3xl md:text-4xl lg:text-5xl font-bold"
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
                  <span className="relative text-cyan-400 text-2xl md:text-3xl lg:text-4xl">You</span>
                </motion.button>
              </span>
            </h2>

            <p className="text-lg md:text-xl text-neutral-400 mb-8 leading-relaxed max-w-2xl">
              A whisper of coffee — the ritual without the heaviness. Engineered as a performance substrate to own the afternoon window.
              <span className="block mt-3 text-xl md:text-2xl text-neutral-300">
                Alkaline base, electrolyte-infused, calibrated to elevate your baseline. Arrive Optimized.
              </span>
            </p>

            {/* Specs grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-8">
              {specs.map((spec, index) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className={`flex items-start gap-4 rounded-xl p-5 md:p-6 relative ${
                    spec.label === 'Low Sugar'
                      ? 'bg-gradient-to-br from-cyan-500/20 via-cyan-400/10 to-neutral-900/50 border-2 border-cyan-400/60'
                      : spec.label === 'Shelf Stable'
                      ? 'bg-gradient-to-br from-red-900/20 via-orange-900/10 to-neutral-900/50 border border-red-500/40'
                      : spec.label === 'Low Caffeine'
                      ? 'bg-gradient-to-br from-emerald-900/20 via-green-900/10 to-neutral-900/50 border border-emerald-500/40'
                      : spec.label === 'Full Cognitive Stack'
                      ? 'bg-gradient-to-br from-purple-900/20 via-violet-900/10 to-neutral-900/50 border border-purple-500/40'
                      : 'bg-neutral-900/50 border border-neutral-800'
                  }`}
                >
                  {/* LOW GI Badge for Low Sugar */}
                  {spec.label === 'Low Sugar' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, x: -10 }}
                      animate={isInView ? {
                        opacity: 1,
                        scale: 1,
                        x: 0,
                      } : {}}
                      transition={{ duration: 0.5, delay: 0.6, type: "spring", bounce: 0.4 }}
                      className="absolute -top-3 -right-2 md:-top-3 md:-right-3 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md border border-cyan-300/50 shadow-lg"
                      style={{
                        boxShadow: '0 0 20px rgba(34, 211, 238, 0.6)'
                      }}
                    >
                      <span className="text-xs md:text-sm font-bold text-black tracking-wider whitespace-nowrap">LOW GI</span>
                    </motion.div>
                  )}
                  
                  {/* FIRST ON MARS Badge for Shelf Stable */}
                  {spec.label === 'Shelf Stable' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, x: -10 }}
                      animate={isInView ? { 
                        opacity: 1, 
                        scale: 1, 
                        x: 0,
                      } : {}}
                      transition={{ duration: 0.5, delay: 0.6, type: "spring", bounce: 0.4 }}
                      className="absolute -top-3 -right-2 md:-top-3 md:-right-3 px-2.5 py-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-md border border-red-400/50 shadow-lg"
                      style={{
                        boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)'
                      }}
                    >
                      <span className="text-[9px] md:text-[10px] font-bold text-white tracking-wider whitespace-nowrap">🚀 FIRST ON MARS</span>
                    </motion.div>
                  )}
                  
                  {/* SMOOTH FOCUS Badge for Low Caffeine */}
                  {spec.label === 'Low Caffeine' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, x: -10 }}
                      animate={isInView ? { 
                        opacity: 1, 
                        scale: 1, 
                        x: 0,
                      } : {}}
                      transition={{ duration: 0.5, delay: 0.6, type: "spring", bounce: 0.4 }}
                      className="absolute -top-3 -right-2 md:-top-3 md:-right-3 px-2.5 py-1 bg-gradient-to-r from-emerald-600 to-green-600 rounded-md border border-emerald-400/50 shadow-lg"
                      style={{
                        boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)'
                      }}
                    >
                      <span className="text-[9px] md:text-[10px] font-bold text-white tracking-wider whitespace-nowrap">⚡ SMOOTH FOCUS</span>
                    </motion.div>
                  )}
                  
                  {/* BRAIN OPTIMIZED Badge for Full Cognitive Stack */}
                  {spec.label === 'Full Cognitive Stack' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, x: -10 }}
                      animate={isInView ? { 
                        opacity: 1, 
                        scale: 1, 
                        x: 0,
                      } : {}}
                      transition={{ duration: 0.5, delay: 0.6, type: "spring", bounce: 0.4 }}
                      className="absolute -top-3 -right-2 md:-top-3 md:-right-3 px-2.5 py-1 bg-gradient-to-r from-purple-600 to-violet-600 rounded-md border border-purple-400/50 shadow-lg"
                      style={{
                        boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)'
                      }}
                    >
                      <span className="text-[9px] md:text-[10px] font-bold text-white tracking-wider whitespace-nowrap">🧠 BRAIN OPTIMIZED</span>
                    </motion.div>
                  )}
                  
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        filter: [
                          "drop-shadow(0 0 0px rgba(34, 211, 238, 0))",
                          "drop-shadow(0 0 8px rgba(34, 211, 238, 0.8))",
                          "drop-shadow(0 0 0px rgba(34, 211, 238, 0))"
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3
                      }}
                    >
                      <spec.icon className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                    </motion.div>
                  </div>
                  <div>
                    <div className="text-white text-base md:text-lg mb-1.5">{spec.label}</div>
                    <div className="text-neutral-400 text-base md:text-lg font-medium">
                      {spec.label === 'Low Sugar' ? (
                        <a
                          href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9964017/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400/80 hover:text-cyan-300 transition-colors underline decoration-dotted decoration-cyan-500/40 hover:decoration-cyan-400/80"
                        >
                          Sweetened with Coconut Sugar
                        </a>
                      ) : spec.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Taste profile */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6"
            >
              <div className="text-sm text-neutral-400 mb-3">Taste Profile</div>
              <p className="text-white mb-4">
                Subtle cold-brew notes meet mineral crispness. 
                Hydration first and low caffeine. The coffee you remember, 
                rebuilt to optimize you.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Smooth', 'Crisp', 'Mineral', 'Light'].map((tag, index) => (
                  <motion.span
                    key={tag}
                    animate={{
                      backgroundColor: activeTagIndex === index ? 'rgba(6, 182, 212, 0.2)' : 'rgba(38, 38, 38, 1)',
                      borderColor: activeTagIndex === index ? 'rgba(6, 182, 212, 0.8)' : 'rgba(64, 64, 64, 1)',
                      color: activeTagIndex === index ? 'rgba(34, 211, 238, 1)' : 'rgba(163, 163, 163, 1)',
                      scale: activeTagIndex === index ? 1.05 : 1,
                      boxShadow: activeTagIndex === index 
                        ? '0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(6, 182, 212, 0.2)' 
                        : '0 0 0px rgba(0, 0, 0, 0)',
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="px-3 py-1 border rounded-full text-xs"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Research Protocol - Data File */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-6 bg-black/20 border border-cyan-500/10 rounded-lg overflow-hidden backdrop-blur-sm"
            >
              {/* Collapsed Header - Always visible */}
              <button
                onClick={() => setIsResearchExpanded(!isResearchExpanded)}
                className="w-full flex items-center gap-2 px-4 py-3 hover:bg-cyan-500/5 transition-colors group"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400/60" style={{ boxShadow: '0 0 6px rgba(34, 211, 238, 0.4)' }} />
                <span className="text-xs md:text-sm font-mono text-cyan-400/70 group-hover:text-cyan-400 tracking-wider transition-colors">
                  RESEARCH.md
                </span>
                <span className="text-[10px] md:text-xs font-mono text-neutral-700 ml-auto mr-2">[3]</span>
                <motion.svg
                  animate={{ rotate: isResearchExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-4 h-4 md:w-5 md:h-5 text-cyan-400/50 group-hover:text-cyan-400 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              
              {/* Expanded Content */}
              <motion.div
                initial={false}
                animate={{
                  height: isResearchExpanded ? 'auto' : 0,
                  opacity: isResearchExpanded ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-3 pb-3 border-t border-cyan-500/10">
                  <div className="space-y-2.5 mt-3 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
                    <div className="flex items-start gap-2 text-xs md:text-sm font-mono">
                      <span className="text-neutral-600 select-none flex-shrink-0">[01]</span>
                      <div className="flex-1">
                        <span className="text-neutral-500">Zero Sugar —</span>
                        {' '}
                        <a 
                          href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10780393/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400/60 hover:text-cyan-400 underline decoration-dotted decoration-cyan-500/30 hover:decoration-cyan-400/60 transition-colors"
                        >
                          Sugar-sweetened beverage reduction studies
                        </a>
                        <span className="text-neutral-700 ml-1 text-[10px] md:text-xs">PMC10780393</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2 text-xs md:text-sm font-mono">
                      <span className="text-neutral-600 select-none flex-shrink-0">[02]</span>
                      <div className="flex-1">
                        <span className="text-neutral-500">L-Theanine + Caffeine —</span>
                        {' '}
                        <a 
                          href="https://www.researchgate.net/publication/47643925_The_combination_of_L-theanine_and_caffeine_improves_cognitive_performance_and_increases_subjective_alertness"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400/60 hover:text-cyan-400 underline decoration-dotted decoration-cyan-500/30 hover:decoration-cyan-400/60 transition-colors"
                        >
                          Cognitive performance and alertness synergy
                        </a>
                        <span className="text-neutral-700 ml-1 text-[10px] md:text-xs">ResearchGate</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2 text-xs md:text-sm font-mono">
                      <span className="text-neutral-600 select-none flex-shrink-0">[03]</span>
                      <div className="flex-1">
                        <span className="text-neutral-500">Lion's Mane —</span>
                        {' '}
                        <a 
                          href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10675414/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400/60 hover:text-cyan-400 underline decoration-dotted decoration-cyan-500/30 hover:decoration-cyan-400/60 transition-colors"
                        >
                          Neuroprotective and cognitive enhancement effects
                        </a>
                        <span className="text-neutral-700 ml-1 text-[10px] md:text-xs">PMC10675414</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-2 border-t border-cyan-500/10">
                    <p className="text-xs md:text-sm font-mono text-neutral-500 leading-relaxed">
                      All formulation claims calibrated against peer-reviewed research. 
                      hydrbrew° is designed for baseline optimization, not medical intervention.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Escape Hatch - Direct to Store */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-8 flex flex-col items-center md:items-start gap-2"
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
              <p className="text-xs text-neutral-200 font-mono ml-1">
                No NFT required. Just the brew.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}