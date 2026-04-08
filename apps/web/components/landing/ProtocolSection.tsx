import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Activity, Brain, Droplet, Zap, Heart, Sparkles } from 'lucide-react';

export function ProtocolSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const precursors = [
    {
      icon: Activity,
      name: 'Caffeine',
      dose: '75mg',
      role: 'Clean energy substrate',
      description: '75mg Precision-Dosed Coffee Extract: A stabilized caffeine signal engineered to bypass the anxiety-cascade of traditional brews. Optimized for the 2-4PM performance window.'
    },
    {
      icon: Brain,
      name: 'L-Theanine',
      dose: '200mg',
      role: 'Smooth activation',
      description: 'Delivers 200 mg of high-purity (+95%) L-Theanine, an amino acid that human studies indicate can promote increased alpha brain wave activity linked to relaxed alertness and help modulate responses to daily stressors.'
    },
    {
      icon: Droplet,
      name: 'Lion\'s Mane',
      dose: '250mg',
      role: 'Neurogenesis catalyst',
      description: '8:1 Lion\'s Mane extract—used in studies exploring potential cognitive and mood support in adults.'
    },
    {
      icon: Zap,
      name: 'Sodium',
      dose: '75mg',
      role: 'Hydration support',
      description: 'Includes 75 mg sodium to contribute to the electrolyte stack\'s support for hydration and flavor enhancement, as part of maintaining normal body fluid balance.'
    },
    {
      icon: Heart,
      name: 'Potassium',
      dose: '100mg',
      role: 'Hydration support',
      description: 'Includes 100 mg potassium—an intracellular electrolyte shown in physiological studies to help regulate osmotic pressure and fluid balance inside cells, supporting electrolyte harmony in the body.'
    },
    {
      icon: Sparkles,
      name: 'Magnesium',
      dose: '65mg',
      role: 'Calm response',
      description: 'Contains 65 mg magnesium to contribute to the electrolyte stack\'s support for normal relaxation processes and electrolyte/fluid balance in healthy adults.'
    }
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-neutral-950 relative overflow-visible">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6 relative">
            {/* Floating Optimized Human Visual #3 - positioned above on mobile, to the right on desktop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
              className="absolute -top-20 left-1/2 -translate-x-1/2 md:top-8 md:right-8 md:left-auto md:translate-x-0 lg:left-[calc(50%+200px)] lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 pointer-events-none"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotateZ: [0, 1, 0, -1, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative inline-block"
              >
                {/* Glowing rings around image */}
                <motion.div
                  className="absolute -inset-4 rounded-full border-2 border-cyan-400/30 blur-sm"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    boxShadow: "0 0 40px rgba(34, 211, 238, 0.4)"
                  }}
                />
                
                {/* Image container with cyberpunk frame */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-cyan-500/50 shadow-[0_0_40px_rgba(34,211,238,0.6)]">
                  <img
                    src="https://i.imgur.com/MIapoa8.png"
                    alt="Optimized Human"
                    className="w-full h-full object-cover object-[60%_center]"
                  />
                  {/* Scanline effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
                    animate={{
                      y: ['-100%', '200%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </div>
                
                {/* +1 Badge overlay */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8, type: "spring", bounce: 0.5 }}
                  className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full p-2 border-2 border-black shadow-[0_0_20px_rgba(34,211,238,0.8)]"
                >
                  <span className="text-black font-bold text-sm">+1</span>
                </motion.div>
                
                {/* Particle effects */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                    }}
                    animate={{
                      x: [0, Math.cos((i / 8) * Math.PI * 2) * 60],
                      y: [0, Math.sin((i / 8) * Math.PI * 2) * 60],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            <div className="px-4 py-1.5 border border-cyan-500/30 rounded-full text-xs text-cyan-400 font-mono tracking-wider">
              THE PRECURSOR MODEL
            </div>
            
            {/* Contextual Neural Briefing Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
                // Dispatch event to open neural briefing with precursor model briefing
                window.dispatchEvent(new CustomEvent('openNeuralBriefing', { 
                  detail: { briefingId: 'precursorModel' } 
                }));
              }}
              onMouseEnter={() => {
                // Dispatch custom event to trigger Neural Briefing attention with specific briefing
                window.dispatchEvent(new CustomEvent('neuralBriefingTrigger', { 
                  detail: { active: true, briefingId: 'precursorModel' } 
                }));
              }}
              onMouseLeave={() => {
                // Dispatch custom event to stop Neural Briefing attention
                window.dispatchEvent(new CustomEvent('neuralBriefingTrigger', { 
                  detail: { active: false, briefingId: 'precursorModel' } 
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white relative z-20">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Six clinically-validated compounds in precise ratios, engineered to upgrade your operating system.
          </p>
          <div className="mt-3 text-xl md:text-2xl text-neutral-300 font-medium flex flex-wrap items-center justify-center gap-2">
            <span>Bypass the afternoon crash, elevate your baseline.</span>
            <motion.button
              onClick={() => {
                const emailSection = document.getElementById('protocol-claim-position');
                emailSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className="relative inline-flex items-center gap-2 px-3 md:px-4 py-1.5 bg-gradient-to-r from-cyan-500/20 via-cyan-500/10 to-cyan-500/20 border border-cyan-400/50 rounded-full cursor-pointer"
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
                className="relative text-2xl md:text-3xl lg:text-4xl font-bold"
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
              <span className="relative text-cyan-400 text-xl md:text-2xl lg:text-3xl">You</span>
            </motion.button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {precursors.map((precursor, index) => (
            <motion.div
              key={precursor.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Enhanced pulsing glow */}
              <motion.div 
                className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/40 via-blue-500/40 to-transparent rounded-2xl blur-xl"
                animate={{
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: "easeInOut"
                }}
              />
              
              <div className="absolute -inset-0.5 bg-gradient-to-b from-cyan-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
              <motion.div 
                className="relative bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 group-hover:border-cyan-500/30 rounded-2xl p-8 h-full flex flex-col transition-all duration-500 overflow-hidden"
                animate={{
                  boxShadow: [
                    '0 0 0 rgba(34, 211, 238, 0)',
                    '0 0 30px rgba(34, 211, 238, 0.4)',
                    '0 0 0 rgba(34, 211, 238, 0)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: "easeInOut"
                }}
              >
                {/* Category Badge */}
                <div className="absolute top-4 right-4 z-20">
                  {(precursor.name === 'Caffeine' || precursor.name === 'L-Theanine') && (
                    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/40 to-red-500/40 border-2 border-orange-500/70 backdrop-blur-sm shadow-[0_0_15px_rgba(249,115,22,0.6)]">
                      <span className="text-xs font-mono text-orange-200 tracking-wider drop-shadow-[0_0_8px_rgba(249,115,22,1)]">ENERGY</span>
                    </div>
                  )}
                  {precursor.name === "Lion's Mane" && (
                    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/40 to-violet-500/40 border-2 border-purple-500/70 backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.6)]">
                      <span className="text-xs font-mono text-purple-200 tracking-wider drop-shadow-[0_0_8px_rgba(168,85,247,1)]">COGNITION</span>
                    </div>
                  )}
                  {(precursor.name === 'Sodium' || precursor.name === 'Potassium' || precursor.name === 'Magnesium') && (
                    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/40 to-green-500/40 border-2 border-emerald-500/70 backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.6)]">
                      <span className="text-xs font-mono text-emerald-200 tracking-wider drop-shadow-[0_0_8px_rgba(16,185,129,1)]">RECOVERY</span>
                    </div>
                  )}
                </div>

                {/* Background Image - Only for Caffeine */}
                {precursor.name === 'Caffeine' && (
                  <>
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-35"
                      style={{ 
                        backgroundImage: 'url(https://i.imgur.com/ZP8W2eJ.png)',
                        filter: 'brightness(0.8) contrast(1.1)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/80 to-neutral-900/90" />
                  </>
                )}
                
                {precursor.name === 'L-Theanine' && (
                  <>
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-35"
                      style={{ 
                        backgroundImage: 'url(https://i.imgur.com/lqeCIH5.png)',
                        filter: 'brightness(0.8) contrast(1.1)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/80 to-neutral-900/90" />
                  </>
                )}
                
                {precursor.name === "Lion's Mane" && (
                  <>
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-35"
                      style={{ 
                        backgroundImage: 'url(https://i.imgur.com/2Bzoa7c.png)',
                        filter: 'brightness(0.8) contrast(1.1)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/80 to-neutral-900/90" />
                  </>
                )}
                
                {precursor.name === 'Sodium' && (
                  <>
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-35"
                      style={{ 
                        backgroundImage: 'url(https://i.imgur.com/taTxDfF.png)',
                        filter: 'brightness(0.8) contrast(1.1)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/80 to-neutral-900/90" />
                  </>
                )}
                
                {precursor.name === 'Potassium' && (
                  <>
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-35"
                      style={{ 
                        backgroundImage: 'url(https://i.imgur.com/RphqNFC.png)',
                        filter: 'brightness(0.8) contrast(1.1)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/80 to-neutral-900/90" />
                  </>
                )}
                
                {precursor.name === 'Magnesium' && (
                  <>
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-35"
                      style={{ 
                        backgroundImage: 'url(https://i.imgur.com/jmNWj2G.png)',
                        filter: 'brightness(0.8) contrast(1.1)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/80 to-neutral-900/90" />
                  </>
                )}
                
                <motion.div 
                  className="relative mb-6 w-16 h-16 rounded-xl bg-cyan-500/10 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.08, 1.05, 1.08, 1],
                    boxShadow: [
                      '0 0 0 rgba(34, 211, 238, 0)',
                      '0 0 15px rgba(34, 211, 238, 0.3)',
                      '0 0 20px rgba(34, 211, 238, 0.5)',
                      '0 0 15px rgba(34, 211, 238, 0.3)',
                      '0 0 0 rgba(34, 211, 238, 0)'
                    ]
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: [0.4, 0.0, 0.6, 1]
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, -8, 8, -8, 0],
                      scale: [1, 1.1, 0.95, 1.1, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3
                    }}
                  >
                    <precursor.icon className="w-8 h-8 text-cyan-400" />
                  </motion.div>
                </motion.div>
                
                <div className="relative mb-4">
                  <h3 className="text-2xl text-white mb-1">{precursor.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl text-cyan-400 font-mono">{precursor.dose}</span>
                    <span className="text-sm text-neutral-500 font-mono">/ serving</span>
                  </div>
                </div>

                <div className="relative mb-4 px-3 py-1.5 bg-neutral-800/50 border border-neutral-700 rounded-lg inline-block">
                  <p className="text-xs text-cyan-400 font-mono tracking-wide">
                    {precursor.role.toUpperCase()}
                  </p>
                </div>

                <p className="relative text-base md:text-lg text-neutral-400 leading-relaxed font-medium">
                  {precursor.name === 'Caffeine' ? (
                    <>
                      75mg Precision-Dosed Coffee Extract: A stabilized caffeine signal engineered to bypass the anxiety-cascade of traditional brews. Optimized for the <span className="text-cyan-400">2-4PM performance window.</span>
                    </>
                  ) : (
                    precursor.description
                  )}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Formula visualization with background image */}
        <div className="relative pb-48 mt-16">
          {/* Background image layer - spans formula + badges with extended height */}
          <div className="absolute inset-0 -bottom-48 overflow-hidden rounded-3xl">
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="relative w-full h-full min-h-[700px] md:min-h-[900px]"
            >
              {/* The actual image */}
              <img
                src="https://i.imgur.com/dciPtob.jpeg"
                alt="Formula background"
                className="w-full h-full object-cover object-[50%_70%] md:object-[50%_65%]"
                style={{
                  filter: 'brightness(1.15) contrast(1.1) saturate(1.2)'
                }}
              />
              
              {/* Bright cyan/white overlay for optimism and clarity */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(34, 211, 238, 0.25), rgba(56, 189, 248, 0.2))',
                  mixBlendMode: 'overlay'
                }}
              />
              
              {/* Enhanced cyan glow for vibrancy */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at 50% 40%, rgba(34, 211, 238, 0.4), rgba(56, 189, 248, 0.15) 50%, transparent 80%)',
                  mixBlendMode: 'screen'
                }}
              />
              
              {/* Subtle white lift for clarity */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 50%, rgba(0, 0, 0, 0.1) 100%)'
                }}
              />
              
              {/* Animated scan lines */}
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 211, 238, 0.1) 2px, rgba(34, 211, 238, 0.1) 4px)'
                }}
                animate={{
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Glowing border effect */}
              <div 
                className="absolute inset-0 rounded-3xl"
                style={{
                  boxShadow: 'inset 0 0 60px rgba(34, 211, 238, 0.2), inset 0 0 100px rgba(34, 211, 238, 0.1)'
                }}
              />
            </motion.div>
          </div>

          {/* Formula code */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative text-center px-4 py-12"
          >
            <div className="hidden md:inline-flex relative items-center gap-2 md:gap-4 px-4 md:px-8 py-3 md:py-4 bg-neutral-900/80 backdrop-blur-sm border border-cyan-500/20 rounded-full max-w-full overflow-x-auto scrollbar-hide">
              <code className="text-cyan-400 font-mono text-[10px] sm:text-xs md:text-sm lg:text-base whitespace-normal sm:whitespace-nowrap text-center sm:text-left">
                caffeine
                <span className="text-neutral-600 mx-0.5 sm:mx-1 md:mx-2">+</span> 
                theanine
                <span className="text-neutral-600 mx-0.5 sm:mx-1 md:mx-2">+</span> 
                lionsmane
                <span className="text-neutral-600 mx-0.5 sm:mx-1 md:mx-2">+</span>
                magnesium
                <span className="text-neutral-600 mx-0.5 sm:mx-1 md:mx-2">+</span>
                electrolytes
                <span className="text-white mx-1 sm:mx-2 md:mx-3">→</span>
                <motion.span 
                  className="relative inline-block font-bold text-sm sm:text-base md:text-lg lg:text-xl"
                  style={{
                    background: 'linear-gradient(90deg, rgba(34,211,238,1) 0%, rgba(255,255,255,1) 50%, rgba(34,211,238,1) 100%)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 20px rgba(34,211,238,1)) drop-shadow(0 0 40px rgba(34,211,238,0.6)) drop-shadow(0 0 60px rgba(34,211,238,0.3))'
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '200% 0%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  flow
                </motion.span>
              </code>
            </div>
          </motion.div>

          {/* Back to Top - Terminal Uplink - positioned below the formula visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="relative mt-8 flex justify-center"
          >
            <motion.button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group relative flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
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
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${angle}deg) translateY(-40px)`
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: angle / 180
                    }}
                  />
                ))}
              </div>

              {/* Outer glow ring - now below hexagon */}
              <motion.div
                className="relative w-32 h-8 -mt-4"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.9, 1.1, 0.9]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl" />
              </motion.div>

              {/* Terminal text below */}
              <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                animate={{
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="text-[10px] font-mono text-cyan-400 tracking-widest">
                  ^UPLINK
                </span>
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Escape Hatch - Direct to Store */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-16 flex flex-col items-center gap-2"
          >
            <motion.div className="relative">
              <motion.button
                onClick={() => {
                  window.open('https://hydrbrew.com/store', '_blank');
                }}
                className="relative group px-8 py-4 border-2 border-cyan-400 hover:border-cyan-300 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/15 transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.7),0_0_50px_rgba(6,182,212,0.4),0_0_75px_rgba(6,182,212,0.2)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Strong constant pulsing glow */}
                <motion.div
                  className="absolute -inset-2 rounded-lg bg-cyan-500/30 blur-xl"
                  animate={{
                    opacity: [0.5, 0.9, 0.5],
                    scale: [0.95, 1.05, 0.95]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="relative text-base md:text-lg font-mono text-white group-hover:text-cyan-50 transition-colors tracking-wide font-semibold" style={{ textShadow: '0 0 12px rgba(6,182,212,0.9), 0 0 24px rgba(6,182,212,0.5)' }}>
                  [SECURE YOUR 12-PACK]
                </span>
              </motion.button>
              <p className="text-xs text-neutral-200 font-mono text-center mt-3">
                No NFT required. Just the brew.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}