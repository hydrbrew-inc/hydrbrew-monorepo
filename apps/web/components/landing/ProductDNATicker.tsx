import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function ProductDNATicker() {
  const [isShopHovered, setIsShopHovered] = useState(false);

  // Listen for hover events from the Shop card
  useEffect(() => {
    const handleShopHover = (e: CustomEvent) => {
      setIsShopHovered(e.detail.isHovered);
    };

    window.addEventListener('shopCardHover', handleShopHover as EventListener);
    return () => window.removeEventListener('shopCardHover', handleShopHover as EventListener);
  }, []);

  const tickerContent = 'ALKALINE BASE // LOW CAFFEINE SUBSTRATE // L-THEANINE ACTIVATION // LION\'S MANE CATALYST // SUB-THRESHOLD GLYCEMIC LOAD // SYSTEM SYNC: 100% // ';

  return (
    <div className="relative h-[40px] bg-black/80 border-y border-cyan-500/20 overflow-hidden">
      {/* Subtle background grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                           linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Glow effect when Shop card is hovered */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
        animate={{
          opacity: isShopHovered ? [0.3, 0.6, 0.3] : 0,
          x: isShopHovered ? ['0%', '100%'] : '0%'
        }}
        transition={{
          opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 3, repeat: Infinity, ease: "linear" }
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
            duration: isShopHovered ? 21 : 35, // Speed up when hovered
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Repeat the content twice for seamless loop */}
          <motion.span 
            className="font-mono text-xs tracking-wider px-4"
            animate={{
              color: isShopHovered 
                ? ['rgba(34, 211, 238, 0.8)', 'rgba(34, 211, 238, 1)', 'rgba(34, 211, 238, 0.8)']
                : 'rgba(34, 211, 238, 0.6)',
              textShadow: isShopHovered
                ? [
                    '0 0 10px rgba(34, 211, 238, 0.4)',
                    '0 0 20px rgba(34, 211, 238, 0.8)',
                    '0 0 10px rgba(34, 211, 238, 0.4)'
                  ]
                : '0 0 5px rgba(34, 211, 238, 0.2)'
            }}
            transition={{
              color: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              textShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            {tickerContent}
          </motion.span>
          <motion.span 
            className="font-mono text-xs tracking-wider px-4"
            animate={{
              color: isShopHovered 
                ? ['rgba(34, 211, 238, 0.8)', 'rgba(34, 211, 238, 1)', 'rgba(34, 211, 238, 0.8)']
                : 'rgba(34, 211, 238, 0.6)',
              textShadow: isShopHovered
                ? [
                    '0 0 10px rgba(34, 211, 238, 0.4)',
                    '0 0 20px rgba(34, 211, 238, 0.8)',
                    '0 0 10px rgba(34, 211, 238, 0.4)'
                  ]
                : '0 0 5px rgba(34, 211, 238, 0.2)'
            }}
            transition={{
              color: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              textShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            {tickerContent}
          </motion.span>
        </motion.div>
      </div>

      {/* Progress bar indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        animate={{
          scaleX: isShopHovered ? [0, 1] : 0,
          opacity: isShopHovered ? [0.5, 1, 0.5] : 0
        }}
        transition={{
          scaleX: { duration: 3, repeat: Infinity, ease: "linear" },
          opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{ transformOrigin: 'left' }}
      />
    </div>
  );
}