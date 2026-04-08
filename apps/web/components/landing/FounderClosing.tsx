import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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
            backgroundImage: 'url(https://i.imgur.com/RL3WvBB.jpeg)',
            opacity: 0.37
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
                <div className="flex items-center gap-2 border border-cyan-500/30 bg-cyan-500/5 px-4 py-2 rounded-sm font-mono text-xs md:text-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <span className="text-cyan-400">BRIEFING_CONCLUDED.TXT</span>
                </div>
                <IntelButton 
                  variant="red"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.dispatchEvent(new CustomEvent('openNeuralBriefing', { 
                      detail: { briefingId: 'founderClosing' } 
                    }));
                  }}
                  onMouseEnter={() => {
                    window.dispatchEvent(new CustomEvent('neuralBriefingTrigger', { 
                      detail: { active: true, briefingId: 'founderClosing' } 
                    }));
                  }}
                  onMouseLeave={() => {
                    window.dispatchEvent(new CustomEvent('neuralBriefingTrigger', { 
                      detail: { active: false, briefingId: 'founderClosing' } 
                    }));
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Main content box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { 
              opacity: 1, 
              scale: 1,
            } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            {/* Outer glow */}
            <div className="absolute -inset-[2px] bg-gradient-to-br from-cyan-500/30 via-purple-500/20 to-red-500/30 blur-xl opacity-50" />
            
            {/* Main container */}
            <div className="relative bg-neutral-950/70 backdrop-blur-sm border-2 border-neutral-800 rounded-lg overflow-hidden">
              {/* Top accent line with gradient */}
              <div className="h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
              
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-500/40" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-500/40" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-500/40" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-500/40" />
              
              <div className="p-8 md:p-12">
                {/* Statement text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="mb-8 md:mb-10"
                >
                  <p className="text-base md:text-lg leading-relaxed text-neutral-300 mb-4">
                    <span className="text-cyan-400 font-mono">Briefing concluded.</span> Thanks for visiting <span className="text-white">hydrbrew°</span>. You've breached the perimeter of the <span className="text-cyan-400">+1 Human experience</span>. It's time to move into the high-fidelity reality of <span className="text-white font-medium">total optimization</span>. The <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 font-mono text-xs text-cyan-400">+1 You</span>.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-neutral-300 mb-4">
                    Don't just watch the future—<span className="text-red-400 font-medium">arbitrage it</span>.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-neutral-300">
                    <span className="text-cyan-400">Stay sharp. Stay optimized.</span>
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-neutral-400 italic mt-2">
                    The Base is always watching.
                  </p>
                </motion.div>

                {/* Signature */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="flex flex-col items-start gap-3 mb-8 md:mb-10"
                >
                  <div className="relative">
                    {/* Signature glow effect */}
                    <motion.div
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 bg-cyan-400/20 blur-md"
                    />
                    <ImageWithFallback
                      src="https://i.imgur.com/a339hLi.png"
                      alt="Founder Signature"
                      className="relative h-20 md:h-28 w-auto brightness-0 invert opacity-80"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="border-l-2 border-cyan-500/40 pl-4">
                      <p className="text-white font-medium text-sm md:text-base">Founder</p>
                      <p className="text-cyan-400 font-mono text-xs md:text-sm">hydrbrew° Protocol</p>
                    </div>
                    {/* Founder Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 1.4 }}
                      className="relative"
                    >
                      {/* Badge glow */}
                      <motion.div
                        className="absolute -inset-2 bg-cyan-400/20 rounded-full blur-lg"
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      {/* Badge container */}
                      <div className="relative w-28 h-28 rounded-full border-2 border-cyan-400/40 overflow-hidden bg-neutral-900/50 backdrop-blur-sm">
                        <ImageWithFallback
                          src="https://i.imgur.com/KIVrOVW.jpeg"
                          alt="Founder Badge"
                          className="w-full h-full object-cover object-[center_30%]"
                        />
                      </div>
                      
                      {/* +1 badge in 4 pm position */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: 1.6 }}
                        className="absolute bottom-1 right-0 translate-x-1/4 translate-y-1/4"
                      >
                        <div className="relative">
                          {/* +1 badge glow */}
                          <motion.div
                            className="absolute -inset-1 bg-cyan-400/30 rounded-full blur-sm"
                            animate={{
                              opacity: [0.4, 0.8, 0.4],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                          {/* +1 badge */}
                          <div className="relative flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/90 to-blue-500/90 border border-cyan-400/50 backdrop-blur-sm">
                            <span className="font-mono text-sm font-bold text-white">+1</span>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Leucadia Map */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="relative"
                >
                  <div className="relative bg-neutral-900/50 border border-cyan-500/20 rounded-lg p-6 overflow-hidden">
                    {/* Grid background */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }} />
                    </div>

                    <div className="relative flex flex-col md:flex-row items-center gap-6">
                      {/* Map visualization */}
                      <div className="relative w-full md:w-1/2 aspect-square max-w-[280px]">
                        {/* Stylized map container */}
                        <div className="absolute inset-0 rounded-lg border-2 border-cyan-500/30 bg-gradient-to-br from-cyan-950/20 to-neutral-950/40 overflow-hidden">
                          {/* Actual map background */}
                          <div className="absolute inset-0">
                            <iframe
                              src="https://www.openstreetmap.org/export/embed.html?bbox=-117.3217%2C33.0544%2C-117.2817%2C33.0744&layer=mapnik&marker=33.0644%2C-117.3017"
                              className="w-full h-full opacity-30 grayscale contrast-125 brightness-75"
                              style={{ border: 'none', pointerEvents: 'none' }}
                              title="Leucadia Map"
                            />
                          </div>
                          
                          {/* Dark overlay to blend with cyberpunk theme */}
                          <div className="absolute inset-0 bg-black/40" />
                          
                          {/* Overlay to hide OpenStreetMap attribution text */}
                          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-neutral-950 to-transparent z-20" />
                          
                          {/* Coordinate grid lines */}
                          <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 200 200">
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
                                ease: "linear"
                              }}
                            />
                          </svg>
                          
                          {/* Pulsing glow effect at center */}
                          <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-500/30 rounded-full blur-md"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        </div>

                        {/* Corner brackets */}
                        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-cyan-400" />
                        <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-cyan-400" />
                        <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-cyan-400" />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-cyan-400" />
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
                              opacity: [0.7, 1, 0.7]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            FOUNDED HERE
                          </motion.p>
                          <p className="text-white font-medium text-base md:text-lg mb-1">
                            Leucadia, CA
                          </p>
                          <div className="font-mono text-xs md:text-sm text-cyan-400 space-y-0.5">
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

                {/* Bottom accent line */}
                <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
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

          {/* Closing terminal line */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={isInView ? { opacity: 1, width: "auto" } : {}}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="mt-8 overflow-hidden"
          >
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-500/60">
              <div className="w-2 h-2 bg-cyan-500/60 rounded-full animate-pulse" />
              <span>END_TRANSMISSION</span>
              <span className="animate-pulse">_</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}