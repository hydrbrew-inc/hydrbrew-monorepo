import { motion } from 'motion/react';

export function BenefitsTicker() {
  const tickerContent = 'NEURAL STABILIZATION // HRV FLOW // AFTERNOON CLARITY // CELLULAR RECOVERY // RITUALIZED // + 1 YOU // ';

  return (
    <div className="relative h-[40px] bg-black/80 border-y border-cyan-500/20 overflow-hidden mt-32">
      {/* Subtle background grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                           linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Scrolling ticker text */}
      <div className="relative h-full flex items-center">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: [0, '-50%']
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Repeat the content twice for seamless loop */}
          <span 
            className="font-mono text-xs tracking-wider px-4 text-cyan-400/60"
            style={{
              textShadow: '0 0 5px rgba(34, 211, 238, 0.2)'
            }}
          >
            {tickerContent}
          </span>
          <span 
            className="font-mono text-xs tracking-wider px-4 text-white/60"
            style={{
              textShadow: '0 0 5px rgba(255, 255, 255, 0.2)'
            }}
          >
            {tickerContent}
          </span>
        </motion.div>
      </div>
    </div>
  );
}