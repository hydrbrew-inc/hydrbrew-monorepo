import { motion } from 'motion/react';

export function PathSeparator() {
  return (
    <div className="relative w-full h-32 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />
      
      {/* Animated motion path waves */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        {/* First wave layer */}
        <motion.path
          d="M0,60 Q150,40 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z"
          fill="rgba(6, 182, 212, 0.08)"
          animate={{
            d: [
              "M0,60 Q150,40 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z",
              "M0,60 Q150,80 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z",
              "M0,60 Q150,40 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z"
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Second wave layer */}
        <motion.path
          d="M0,70 Q200,50 400,70 T800,70 T1200,70 L1200,120 L0,120 Z"
          fill="rgba(6, 182, 212, 0.12)"
          animate={{
            d: [
              "M0,70 Q200,50 400,70 T800,70 T1200,70 L1200,120 L0,120 Z",
              "M0,70 Q200,90 400,70 T800,70 T1200,70 L1200,120 L0,120 Z",
              "M0,70 Q200,50 400,70 T800,70 T1200,70 L1200,120 L0,120 Z"
            ]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />

        {/* Third wave layer - main featured wave */}
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
      </svg>

      {/* Subtle glow line at the top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      
      {/* Subtle glow line at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
    </div>
  );
}
