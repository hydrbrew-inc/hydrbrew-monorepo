import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Mail, Search, Award, Scan, Gift, Trophy } from 'lucide-react';

export function TwoWaysToPlay() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [topSquareCount, setTopSquareCount] = useState(32);

  useEffect(() => {
    const update = () => {
      setTopSquareCount(Math.max(16, Math.ceil(window.innerWidth / 50)));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const scrollToQRScan = () => {
    const element = document.getElementById('scan-event');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="two-ways-to-play" ref={ref} className="py-24 md:py-32 bg-neutral-800 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden" 
        >
          {/* Crowd photo background */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{
              backgroundImage: 'url(https://i.imgur.com/s3dIhL2.jpeg)',
              filter: 'grayscale(20%) contrast(1.4) brightness(1.1) saturate(1.2)',
            }}
          />
          
          {/* Cyan holographic overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 mix-blend-hard-light"
          />

          {/* Top row animated squares */}
          <div className="absolute top-0 left-0 right-0 flex">
            {Array.from({ length: topSquareCount }).map((_, i) => {
              const colors = ['#06b6d4', '#ec4899', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'] as const;
              const color = colors[i % colors.length]!;
              
              return (
                <motion.div
                  key={i}
                  className="w-[50px] h-[50px]"
                  initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
                  animate={{
                    backgroundColor: [
                      'rgba(0,0,0,0)',
                      color,
                      color,
                      'rgba(0,0,0,0)'
                    ],
                    boxShadow: [
                      '0 0 0px rgba(0,0,0,0)',
                      `0 0 20px ${color}`,
                      `0 0 20px ${color}`,
                      '0 0 0px rgba(0,0,0,0)'
                    ]
                  }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.05,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                />
              );
            })}
          </div>
        </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Glassmorphism container */}
          <div className="inline-block bg-black/40 backdrop-blur-md border border-cyan-500/20 rounded-3xl px-8 py-10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <div className="px-4 py-1.5 border border-cyan-500/30 rounded-full text-xs text-cyan-400 font-mono tracking-wider">
                DUAL PROTOCOL SYSTEM
              </div>
              
              {/* Two Ways to Play Intel Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  // Dispatch event to open neural briefing with Two Ways to Play briefing
                  window.dispatchEvent(new CustomEvent('openNeuralBriefing', { 
                    detail: { briefingId: 'twoWaysToPlay' } 
                  }));
                }}
                onMouseEnter={() => {
                  // Dispatch custom event to trigger Neural Briefing attention
                  window.dispatchEvent(new CustomEvent('neuralBriefingTrigger', { 
                    detail: { active: true, briefingId: 'twoWaysToPlay' } 
                  }));
                }}
                onMouseLeave={() => {
                  // Dispatch custom event to stop Neural Briefing attention
                  window.dispatchEvent(new CustomEvent('neuralBriefingTrigger', { 
                    detail: { active: false, briefingId: 'twoWaysToPlay' } 
                  }));
                }}
                className="group/briefing flex items-center gap-2 px-3 py-2 bg-black/90 border border-red-400/50 hover:border-red-400 rounded-lg backdrop-blur-sm transition-all hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]"
              >
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-0.5 bg-red-400 rounded-full"
                      style={{
                        height: `${8 + i * 2}px`,
                        animation: `wave-pulse 0.8s ease-in-out infinite`,
                        animationDelay: `${i * 0.15}s`
                      }}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-red-400 tracking-wider">INTEL</span>
              </motion.button>
            </div>
            
            <h2 className="text-5xl md:text-7xl mb-6 text-white leading-tight font-mono">
              TWO WAYS TO PLAY
            </h2>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
              Engage with hydrbrew° through our dual-phase gamification system
            </p>
          </div>
        </motion.div>

        {/* Two game cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission Intel - Pre-Launch */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border border-red-500/30 rounded-2xl p-8 h-full relative overflow-hidden">
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  background: [
                    'linear-gradient(0deg, rgba(239,68,68,0.1) 0%, transparent 100%)',
                    'linear-gradient(360deg, rgba(239,68,68,0.1) 0%, transparent 100%)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-red-500/40 rounded-full bg-red-500/10 mb-6">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                  <span className="text-xs text-red-400 font-mono tracking-wider">
                    PRE-LAUNCH PHASE
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl text-white mb-4 font-mono">
                  Mission Intel
                </h3>

                <p className="text-neutral-400 mb-8 leading-relaxed">
                  Decrypt codes hidden in HydrCore Base to claim exclusive medallions before launch
                </p>

                {/* Steps */}
                <div className="space-y-4 mb-8">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-start gap-4 bg-neutral-900/50 border border-red-500/10 rounded-lg p-4 hover:border-red-500/30 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                      <span className="text-red-400 font-mono text-sm font-bold">1</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Mail className="w-4 h-4 text-red-400" />
                        <h4 className="text-white font-medium">Sign Up for Protocol Drops</h4>
                      </div>
                      <p className="text-neutral-400 text-sm">Subscribe to receive mission briefings</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex items-start gap-4 bg-neutral-900/50 border border-red-500/10 rounded-lg p-4 hover:border-red-500/30 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                      <span className="text-red-400 font-mono text-sm font-bold">2</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Search className="w-4 h-4 text-red-400" />
                        <h4 className="text-white font-medium">Hunt for Secret Codes</h4>
                      </div>
                      <p className="text-neutral-400 text-sm">Codes drop in HydrCore Base via email alerts</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex items-start gap-4 bg-neutral-900/50 border border-red-500/10 rounded-lg p-4 hover:border-red-500/30 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                      <span className="text-red-400 font-mono text-sm font-bold">3</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Award className="w-4 h-4 text-red-400" />
                        <h4 className="text-white font-medium">Claim Your Medallion</h4>
                      </div>
                      <p className="text-neutral-400 text-sm">Enter code in Mission Intel to unlock rewards</p>
                    </div>
                  </motion.div>
                </div>

                {/* CTA */}
                <a
                  href="#mission-intel-section"
                  className="group/btn inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-mono font-bold text-sm tracking-wider rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]"
                >
                  <span>ENTER MISSION INTEL</span>
                  <motion.svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path
                      d="M5 12h14m0 0l-6-6m6 6l-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* QR Scan Event - Launch */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative group"
          >
            <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border border-emerald-500/30 rounded-2xl p-8 h-full relative overflow-hidden">
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  background: [
                    'linear-gradient(0deg, rgba(16,185,129,0.1) 0%, transparent 100%)',
                    'linear-gradient(360deg, rgba(16,185,129,0.1) 0%, transparent 100%)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-emerald-500/40 rounded-full bg-emerald-500/10 mb-6">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-xs text-emerald-400 font-mono tracking-wider">
                    LAUNCH EVENT
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl text-white mb-4 font-mono">
                  QR Scan Event
                </h3>

                <p className="text-neutral-400 mb-8 leading-relaxed">
                  Scan to win cash prizes and exclusive NFTs from 5,446 limited cans
                </p>

                {/* Prize breakdown */}
                <div className="space-y-4 mb-8">
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-center justify-between bg-neutral-900/50 border border-emerald-500/10 rounded-lg p-4 hover:border-emerald-500/30 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <Trophy className="w-5 h-5 text-yellow-400" />
                      <span className="text-white font-medium">Cash Prizes</span>
                    </div>
                    <span className="text-yellow-400 font-mono font-bold">8 Winners</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex items-center justify-between bg-neutral-900/50 border border-emerald-500/10 rounded-lg p-4 hover:border-emerald-500/30 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <Gift className="w-5 h-5 text-purple-400" />
                      <span className="text-white font-medium">NFT Rewards</span>
                    </div>
                    <span className="text-purple-400 font-mono font-bold">16 Winners</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex items-center justify-between bg-neutral-900/50 border border-emerald-500/10 rounded-lg p-4 hover:border-emerald-500/30 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <Scan className="w-5 h-5 text-cyan-400" />
                      <span className="text-white font-medium">Total Cans</span>
                    </div>
                    <span className="text-cyan-400 font-mono font-bold">5,446</span>
                  </motion.div>
                </div>

                {/* Free play notice */}
                <div className="bg-black/40 border border-emerald-500/20 rounded-lg p-4 mb-6">
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    <span className="text-emerald-400 font-bold">FREE DAILY SCAN:</span> No purchase necessary. One scan per 24-hour period.
                  </p>
                </div>

                {/* CTA */}
                <button
                  onClick={scrollToQRScan}
                  className="group/btn inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-mono font-bold text-sm tracking-wider rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] w-full justify-center"
                >
                  <span>VIEW QR SCAN DETAILS</span>
                  <motion.svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path
                      d="M12 5v14m0 0l-6-6m6 6l6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-black/30 backdrop-blur-sm border border-neutral-700/30 rounded-full px-6 py-3">
            <p className="text-neutral-300 text-sm font-mono">
              Both games reward early adopters who engage with the hydrbrew° ecosystem
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}