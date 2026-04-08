import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Droplet {
  id: number;
  x: number;
  delay: number;
}

export function LiquidWaveDivider() {
  const [droplets, setDroplets] = useState<Droplet[]>([]);

  useEffect(() => {
    // Generate droplets at wave peaks
    const peaks = [15, 35, 55, 75, 95]; // Percentage positions of wave peaks
    const initialDroplets = peaks.map((x, index) => ({
      id: index,
      x,
      delay: index * 0.8
    }));
    setDroplets(initialDroplets);

    // Continuously regenerate droplets
    const interval = setInterval(() => {
      setDroplets(prev => 
        peaks.map((x, index) => ({
          id: Date.now() + index,
          x,
          delay: index * 0.8
        }))
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-48 overflow-hidden">
      {/* Dark to light gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-800" />
      
      {/* Animated liquid wave */}
      <svg
        className="absolute bottom-0 w-full h-32"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        {/* Multiple wave layers for depth */}
        <motion.path
          d="M0,60 Q150,40 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z"
          fill="rgba(6, 182, 212, 0.1)"
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
        
        <motion.path
          d="M0,70 Q200,50 400,70 T800,70 T1200,70 L1200,120 L0,120 Z"
          fill="rgba(6, 182, 212, 0.15)"
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

      {/* Falling droplets */}
      {droplets.map((droplet) => (
        <motion.div
          key={droplet.id}
          className="absolute w-2 h-2 rounded-full bg-cyan-400/60 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
          initial={{
            x: `${droplet.x}%`,
            y: '25%',
            opacity: 0,
            scale: 0
          }}
          animate={{
            y: '100%',
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0.5]
          }}
          transition={{
            duration: 2.5,
            delay: droplet.delay,
            ease: "easeIn"
          }}
        />
      ))}

      {/* Additional smaller droplets for variety */}
      {droplets.map((droplet) => (
        <motion.div
          key={`small-${droplet.id}`}
          className="absolute w-1 h-1 rounded-full bg-cyan-300/40"
          initial={{
            x: `${droplet.x + 3}%`,
            y: '30%',
            opacity: 0,
            scale: 0
          }}
          animate={{
            y: '100%',
            opacity: [0, 0.8, 0.8, 0],
            scale: [0, 1, 1, 0.3]
          }}
          transition={{
            duration: 2,
            delay: droplet.delay + 0.3,
            ease: "easeIn"
          }}
        />
      ))}
    </div>
  );
}
