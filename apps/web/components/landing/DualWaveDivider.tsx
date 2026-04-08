import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function DualWaveDivider() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative h-48 md:h-64 bg-black overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />

      {/* Center vertical line */}
      <motion.div
        className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* SVG Container for waves */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
      >
        {/* Cyan wave from left */}
        <motion.path
          d="M0,150 Q150,100 300,150 T600,150"
          stroke="url(#cyanGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { 
            pathLength: 1, 
            opacity: [0, 1, 1, 0.8],
          } : {}}
          transition={{ 
            pathLength: { duration: 2, ease: "easeInOut" },
            opacity: { duration: 2, ease: "easeInOut" }
          }}
        />

        {/* Red wave from right */}
        <motion.path
          d="M1200,150 Q1050,200 900,150 T600,150"
          stroke="url(#redGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { 
            pathLength: 1, 
            opacity: [0, 1, 1, 0.8],
          } : {}}
          transition={{ 
            pathLength: { duration: 2, ease: "easeInOut" },
            opacity: { duration: 2, ease: "easeInOut" }
          }}
        />

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(34, 211, 238, 0)" />
            <stop offset="50%" stopColor="rgba(34, 211, 238, 1)" />
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0.6)" />
          </linearGradient>
          <linearGradient id="redGradient" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(239, 68, 68, 0)" />
            <stop offset="50%" stopColor="rgba(239, 68, 68, 1)" />
            <stop offset="100%" stopColor="rgba(239, 68, 68, 0.6)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center convergence point with pulsing glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { 
          scale: [0, 1.2, 1], 
          opacity: [0, 1, 1] 
        } : {}}
        transition={{ duration: 1, delay: 2 }}
      >
        {/* Outer pulsing ring */}
        <motion.div
          className="absolute inset-0 w-20 h-20 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full"
          animate={{
            boxShadow: [
              '0 0 20px 5px rgba(34, 211, 238, 0.4), 0 0 40px 10px rgba(239, 68, 68, 0.2)',
              '0 0 30px 10px rgba(239, 68, 68, 0.4), 0 0 50px 15px rgba(34, 211, 238, 0.2)',
              '0 0 20px 5px rgba(34, 211, 238, 0.4), 0 0 40px 10px rgba(239, 68, 68, 0.2)',
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Center medallion */}
        <div className="relative w-12 h-12 rounded-full bg-black border-2 border-cyan-400 flex items-center justify-center">
          {/* Rotating gradient border effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, rgba(34, 211, 238, 1), rgba(239, 68, 68, 1), rgba(34, 211, 238, 1))',
              padding: '2px',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full rounded-full bg-black" />
          </motion.div>

          {/* Center dot */}
          <motion.div
            className="relative w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-red-400"
            animate={{
              scale: [1, 1.3, 1],
              boxShadow: [
                '0 0 10px rgba(34, 211, 238, 0.8)',
                '0 0 20px rgba(239, 68, 68, 0.8)',
                '0 0 10px rgba(34, 211, 238, 0.8)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Particle effects emanating from center */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full"
          style={{
            background: i % 2 === 0 ? '#22d3ee' : '#ef4444'
          }}
          initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
          animate={isInView ? {
            scale: [0, 1, 0],
            x: [0, Math.cos((i / 12) * Math.PI * 2) * 120],
            y: [0, Math.sin((i / 12) * Math.PI * 2) * 80],
            opacity: [0, 1, 0]
          } : {}}
          transition={{
            duration: 2,
            delay: 2 + (i * 0.05),
            ease: "easeOut"
          }}
        />
      ))}

      {/* Subtle text labels */}
      <motion.div
        className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 text-cyan-400 font-mono text-xs md:text-sm tracking-wider opacity-50"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 0.5, x: 0 } : {}}
        transition={{ duration: 1, delay: 1 }}
      >
        PRODUCT PATH
      </motion.div>

      <motion.div
        className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 text-red-400 font-mono text-xs md:text-sm tracking-wider opacity-50"
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 0.5, x: 0 } : {}}
        transition={{ duration: 1, delay: 1 }}
      >
        LORE PATH
      </motion.div>

      {/* Bottom text */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-500 font-mono text-xs tracking-widest"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 0.7, y: 0 } : {}}
        transition={{ duration: 1, delay: 2.5 }}
      >
        // PATHS CONVERGE //
      </motion.div>
    </section>
  );
}
