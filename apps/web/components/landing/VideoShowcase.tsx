import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { Lock } from 'lucide-react';
import { TrendingUp } from 'lucide-react';
import { Zap } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { Eye } from 'lucide-react';
import { VRPortalModal } from './VRPortalModal';
import { EmailCaptureForm } from './EmailCaptureForm';

export function VideoShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // VR Portal state
  const [isVRPortalOpen, setIsVRPortalOpen] = useState(false);
  
  // Slot machine state - array of 4 numbers, one for each digit
  const [currentNumbers, setCurrentNumbers] = useState([0, 0, 0, 0]);
  const [isSpinning, setIsSpinning] = useState(false);
  
  // Target number sequences to land on
  const sequences = [
    [7, 3, 9, 2],
    [4, 8, 1, 6],
    [5, 2, 7, 3],
    [9, 1, 4, 8],
    [3, 6, 2, 5]
  ];
  const [sequenceIndex, setSequenceIndex] = useState(0);
  
  useEffect(() => {
    // Start spinning cycle
    const spinInterval = setInterval(() => {
      setIsSpinning(true);
      
      // Rapid number changes for slot machine effect (100ms intervals)
      const rapidSpinInterval = setInterval(() => {
        setCurrentNumbers([
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10)
        ]);
      }, 100);
      
      // After 4.5 seconds, land on target sequence
      setTimeout(() => {
        clearInterval(rapidSpinInterval);
        setCurrentNumbers(sequences[sequenceIndex] ?? sequences[0]!);
        setIsSpinning(false);
        setSequenceIndex((prev) => (prev + 1) % sequences.length);
      }, 4500);
      
    }, 5000); // Restart cycle every 5 seconds
    
    return () => clearInterval(spinInterval);
  }, [sequenceIndex]);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-neutral-950">
        {/* Red alert grid */}
        <div className="absolute inset-0 opacity-12 pointer-events-none">
          <div 
            className="absolute inset-0 animate-pulse"
            style={{
              backgroundImage: 'linear-gradient(rgba(239, 68, 68, 0.85) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(239, 68, 68, 0.85) 1.5px, transparent 1.5px)',
              backgroundSize: '40px 40px',
              animationDuration: '3s'
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header with urgency */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          {/* HydrCore Base Background Image */}
          <div 
            className="absolute inset-0 -mx-8 md:-mx-16 lg:-mx-24 -my-16 opacity-60 bg-cover bg-no-repeat bg-center md:bg-top"
            style={{
              backgroundImage: 'url(https://i.imgur.com/3D3shvu.jpeg)',
              backgroundAttachment: 'scroll',
              mixBlendMode: 'screen',
            }}
          />
          
          {/* Dark gradient overlays for readability */}
          <div className="absolute inset-0 -mx-8 md:-mx-16 lg:-mx-24 -my-16 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
          <div className="absolute inset-0 -mx-8 md:-mx-16 lg:-mx-24 -my-16 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
          
          {/* Red glow effect overlay matching the theme */}
          <div className="absolute inset-0 -mx-8 md:-mx-16 lg:-mx-24 -my-16 bg-red-500/30 md:bg-red-500/25 mix-blend-overlay" />
          
          {/* Content (positioned above background) */}
          <div className="relative z-10">
            <div className="inline-block mb-6 px-4 py-1.5 border border-red-500/30 rounded-full text-xs text-red-400 font-mono tracking-wider animate-pulse">
              ⚠️ ACTIVE SCAVENGER PROTOCOL // NUMBERS HIDDEN IN BASE
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white">
              Find The Hidden Terminal Numbers
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto mb-4">4 secret digits scattered across HydrCore Base. Characters hide clues. Terminals contain codes.</p>
            <div className="text-lg text-red-400 font-mono mb-8">
              <span className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/30 rounded">
                WHERE ARE THE NUMBERS? 🔍
              </span>
            </div>
            
            {/* Cohort Inventory Progress Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex justify-between text-sm text-red-400 font-mono mb-2">
                <span>MEDALLION INVENTORY</span>
                <span>21/100 REMAINING</span>
              </div>
              <div className="h-2 bg-neutral-900 border border-red-500/30 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "21%" } : {}}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                />
              </div>
              <p className="text-xs text-neutral-500 mt-2 font-mono">
                Supply depleting in real-time
              </p>
            </div>

            {/* Pre-Launch Email Signup Requirement */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                {/* Cyan blur glow wrapper */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-50" />
                
                <div className="relative bg-gradient-to-br from-neutral-900 via-neutral-900 to-cyan-950/20 rounded-3xl p-8 md:p-12 border border-cyan-500/40 overflow-hidden">
                  {/* Animated background grid */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
                                       linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)`,
                      backgroundSize: '30px 30px',
                    }} />
                  </div>

                  {/* Glowing corner accents */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />

                  {/* Live visitors badge - top right */}
                  <div className="absolute top-4 right-4 bg-emerald-500/10 border border-emerald-500/50 rounded-lg px-3 py-2 backdrop-blur-sm hidden md:flex z-10">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Eye className="w-4 h-4 text-emerald-400" />
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      </div>
                      <div className="text-xs font-mono">
                        <span className="text-emerald-400 font-bold tabular-nums">143</span>
                        <span className="text-emerald-400/60 ml-1">viewing</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10">
                    {/* Requirement Header */}
                    <div className="mb-6 text-center">
                      <div className="inline-block px-3 py-1.5 bg-cyan-500/20 border border-cyan-400 rounded-full mb-3">
                        <p className="text-cyan-300 font-mono text-xs tracking-wider font-bold">
                          🔒 ACCESS REQUIREMENT
                        </p>
                      </div>
                      <p className="text-cyan-100 font-mono text-sm md:text-base mb-2">
                        <span className="text-cyan-300 font-bold">PRE-LAUNCH EMAIL SIGNUP REQUIRED</span> TO PLAY
                      </p>
                      <p className="text-cyan-400/80 font-mono text-xs">
                        Join the waitlist to unlock scan eligibility + exclusive launch access
                      </p>
                    </div>

                    {/* Email Signup Form */}
                    <div className="mb-6">
                      <EmailCaptureForm />
                    </div>

                    {/* Benefits List */}
                    <div className="pt-4 border-t border-cyan-500/30">
                      <div className="grid sm:grid-cols-3 gap-3 text-xs font-mono text-cyan-300/90">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                          <span>Mission Intel Access</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                          <span>Launch Day Priority</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                          <span>Exclusive Updates</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-8 max-w-6xl mx-auto">
          {/* Left: Character Reels Carousel */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-sm text-red-400 font-mono tracking-wider mb-4 flex items-center gap-2 drop-shadow-[0_0_8px_rgba(248,113,113,0.9)]">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                CHARACTER INTEL REELS // CODES EMBEDDED
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    name: 'ZEVON',
                    role: 'Head of Human Optimization',
                    image: 'https://i.imgur.com/H43dZi2.jpeg',
                    hint: 'First digit'
                  },
                  {
                    name: 'VESPARA',
                    role: 'Chief Neural Integration Officer',
                    image: 'https://i.imgur.com/7rF3Rd5.jpeg',
                    hint: 'Second digit'
                  },
                  {
                    name: 'LUNO',
                    role: 'Lead Mission\nEngineer',
                    image: 'https://i.imgur.com/xOlsna0.jpeg',
                    hint: 'Third digit'
                  },
                  {
                    name: 'ZENARA',
                    role: 'Director of Flow Dynamics',
                    image: 'https://i.imgur.com/giDeBcH.jpeg',
                    hint: 'Final digit'
                  }
                ].map((character, index) => (
                  <motion.div
                    key={character.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="relative group cursor-pointer"
                  >
                    <div className="relative aspect-[9/16] rounded-xl overflow-visible border border-red-500/20 hover:border-red-500/50 transition-all duration-300 hover:scale-125 hover:z-50 hover:shadow-[0_0_40px_rgba(239,68,68,0.6)]">
                      <div className="absolute inset-0 rounded-xl overflow-hidden">
                        <img
                          src={character.image}
                          alt={character.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                        />
                        
                        {/* Scanning Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-red-500/20 via-transparent to-black/80">
                          <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-500 animate-pulse" />
                        </div>

                        {/* Character Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                          <div className="text-sm text-white font-mono">{character.name}</div>
                          <div className="text-sm text-red-400 font-mono drop-shadow-[0_0_6px_rgba(248,113,113,0.9)] whitespace-pre-line">{character.role}</div>
                        </div>
                        
                        {/* Hidden code indicator */}
                        <div className="absolute top-2 right-2">
                          <motion.div 
                            className="w-7 h-7 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center border-2 border-black shadow-[0_0_15px_rgba(234,179,8,0.8)]"
                            animate={{
                              scale: [1, 1.2, 1],
                              boxShadow: [
                                '0 0 15px rgba(234, 179, 8, 0.8)',
                                '0 0 25px rgba(234, 179, 8, 1)',
                                '0 0 15px rgba(234, 179, 8, 0.8)'
                              ]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <span className="text-black text-xs font-bold">?</span>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Terminal Preview / CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse" />
              <div className="relative bg-black/90 backdrop-blur-sm border-2 border-red-500/50 rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-red-500/20 border-2 border-red-500/50 rounded-lg flex items-center justify-center flex-shrink-0 animate-pulse">
                    <Lock className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-2xl text-white mb-2 font-mono">
                      🔐 MISSION: DECODE THE SEQUENCE
                    </h4>
                    <p className="text-sm text-neutral-300 leading-relaxed mb-3">Explore HydrCore Base thoroughly. Numbers are <span className="text-red-400 font-bold">encrypted in character dialogues</span>, <span className="text-cyan-400 font-bold">hidden in terminal interfaces</span>, and <span className="text-yellow-400 font-bold">secretly coded in visuals</span>.</p>
                    <div className="bg-red-500/10 border border-red-500/30 rounded p-3 mb-3">
                      <p className="text-sm text-red-400 font-mono drop-shadow-[0_0_8px_rgba(248,113,113,0.9)]">
                        💡 HINT: Each of the 4 characters holds exactly 1 digit. Watch their reels. Read the terminals. Decode the messages.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Code Hunt Visual */}
                <div className="mb-6 bg-gradient-to-br from-neutral-900 to-black border border-yellow-500/30 rounded-xl p-4">
                  <div className="text-xs text-yellow-400 font-mono tracking-wider mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
                    ACTIVE EXTRACTION ZONES
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      <span className="text-neutral-400">Character Reels</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                      <span className="text-neutral-400">Mission Terminals</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      <span className="text-neutral-400">Manifesto Text</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                      <span className="text-neutral-400">Hidden Layers</span>
                    </div>
                  </div>
                </div>

                {/* VR World Access Teaser */}
                <div className="mb-6 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-cyan-500/20 border border-cyan-400/40 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                    </div>
                    <div>
                      <div className="text-xs text-cyan-400 font-mono tracking-wider mb-1">
                        PRIZE: MEDALLION + VR ACCESS CODE
                      </div>
                      <p className="text-sm text-neutral-300 leading-relaxed">Solve the sequence → Claim physical Medallion with <span className="text-cyan-400 font-mono">engraved VR access code</span> → Unlock <span className="text-white font-semibold">HydrCore Base VR worlds</span> with exclusive missions, prize drops & evolving gameplay.</p>
                    </div>
                  </div>
                </div>

                {/* Fake Terminal Keypad Preview */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {[0, 1, 2, 3].map((index) => (
                    <div 
                      key={index}
                      className="aspect-square bg-neutral-900 border-2 border-red-500/30 rounded-lg flex items-center justify-center relative overflow-hidden"
                    >
                      {/* Slot machine number display */}
                      <motion.div
                        key={currentNumbers[index]}
                        initial={{ y: -20, opacity: 0 }}
                        animate={
                          isSpinning 
                            ? { y: 0, opacity: 1 }
                            : { 
                                y: 0, 
                                opacity: 1,
                                scale: [1, 1.15, 1],
                                textShadow: [
                                  '0 0 10px rgba(239, 68, 68, 0.3)',
                                  '0 0 20px rgba(239, 68, 68, 0.8), 0 0 30px rgba(239, 68, 68, 0.6)',
                                  '0 0 10px rgba(239, 68, 68, 0.3)'
                                ]
                              }
                        }
                        transition={
                          isSpinning
                            ? { duration: 0.15 }
                            : { 
                                duration: 1.2, 
                                repeat: Infinity,
                                ease: "easeInOut"
                              }
                        }
                        className={`text-3xl font-mono font-bold ${
                          isSpinning ? 'text-red-400/60' : 'text-red-400'
                        }`}
                      >
                        {currentNumbers[index]}
                      </motion.div>
                      
                      {/* Spinning indicator */}
                      {isSpinning && (
                        <motion.div 
                          className="absolute inset-0 bg-red-500/10"
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 0.3, repeat: Infinity }}
                        />
                      )}
                      
                      {/* Corner indicators */}
                      <div className="absolute top-1 left-1 text-[8px] text-red-500/50 font-mono">
                        {index + 1}
                      </div>
                      <div className="absolute top-1 right-1 text-[8px] text-red-500/50 font-mono">
                        {isSpinning ? '⟳' : '✓'}
                      </div>
                    </div>
                  ))}
                </div>

                {/* GLITCHING TERMINAL ACCESS BUTTON - Easter Egg */}
                <motion.button
                  onClick={() => setIsVRPortalOpen(true)}
                  className="w-full mb-4 relative group/terminal"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated glitch border */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 rounded-lg opacity-75 blur-sm group-hover/terminal:opacity-100 transition-all"
                       style={{
                         animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                       }}
                  />
                  
                  {/* Main button */}
                  <div className="relative bg-neutral-950 border-2 border-purple-500/50 group-hover/terminal:border-cyan-500 rounded-lg px-6 py-4 overflow-hidden transition-all">
                    {/* Scanline effect */}
                    <motion.div
                      className="absolute inset-0 h-full w-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
                      animate={{
                        y: ['-100%', '200%']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    {/* Glitch overlay */}
                    <motion.div
                      className="absolute inset-0 bg-purple-500/10"
                      animate={{
                        opacity: [0, 0.3, 0, 0.5, 0],
                        x: [0, -2, 2, -2, 0]
                      }}
                      transition={{
                        duration: 0.4,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10 flex items-center justify-center gap-3">
                      {/* Pulsing icon */}
                      <div className="relative">
                        <div className="absolute inset-0 animate-ping">
                          <Zap className="w-5 h-5 text-purple-400 opacity-75" />
                        </div>
                        <Zap className="relative w-5 h-5 text-cyan-400" />
                      </div>
                      
                      {/* Glitching text */}
                      <div className="font-mono font-bold tracking-wider">
                        <motion.span
                          className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400"
                          animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          style={{
                            backgroundSize: '200% 200%'
                          }}
                        >
                          ⚠️ RESTRICTED TERMINAL ACCESS
                        </motion.span>
                      </div>
                      
                      {/* Warning indicators */}
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
                            animate={{
                              opacity: [0.3, 1, 0.3]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Bottom status bar */}
                    <div className="relative z-10 mt-2 pt-2 border-t border-purple-500/30 flex items-center justify-between text-[10px] font-mono">
                      <div className="flex items-center gap-1.5 text-purple-400/80">
                        <div className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500" />
                        </div>
                        <span>DIMENSIONAL BREACH</span>
                      </div>
                      <span className="text-sm text-cyan-400/60">CLICK TO INVESTIGATE →</span>
                    </div>
                  </div>
                </motion.button>

                <a
                  href="https://arc.hydrbrew.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 text-black font-mono font-bold tracking-wider text-center text-lg rounded-xl hover:shadow-[0_0_40px_rgba(239,68,68,0.7)] transition-all group-hover:scale-[1.03] relative overflow-hidden"
                >
                  <div className="relative z-10">
                    🚀 ENTER HYDRCORE BASE → FIND THE NUMBERS
                  </div>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </a>
                
                <p className="text-center text-xs text-neutral-500 mt-3 font-mono">
                  ⏱️ 21 Medallions left // Codes reset when inventory depletes
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: Live Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="block"
          >
            <div className="lg:sticky lg:top-24">
              <h3 className="text-sm text-red-400 font-mono tracking-wider mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                LIVE EXTRACTIONS
              </h3>
              <div className="bg-neutral-900/50 border border-red-500/20 rounded-xl p-4 space-y-3 h-[500px] overflow-hidden">
                {[
                  { operative: 'x72', time: '2m ago' },
                  { operative: 'k19', time: '5m ago' },
                  { operative: 'm44', time: '8m ago' },
                  { operative: 'v03', time: '12m ago' },
                  { operative: 'z88', time: '15m ago' },
                  { operative: 'q51', time: '18m ago' },
                  { operative: 'r37', time: '21m ago' },
                  { operative: 'n66', time: '24m ago' }
                ].map((entry, index) => (
                  <motion.div
                    key={entry.operative + index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3 text-xs border-b border-neutral-800 pb-3"
                  >
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <div className="flex-1">
                      <div className="text-white font-mono">
                        Operative <span className="text-red-400">{entry.operative}</span>
                      </div>
                      <div className="text-neutral-500 text-[10px]">Medallion Secured</div>
                    </div>
                    <div className="text-neutral-600 font-mono text-[10px]">
                      {entry.time}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Medallion Prize Showcase */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.9 }}
                className="mt-6"
              >
                {/* PHYGITAL PRIZE SHOWCASE FRAME */}
                <div className="relative p-4 bg-gradient-to-br from-neutral-950 via-black to-neutral-950 border-2 border-cyan-500/50 rounded-lg shadow-2xl"
                     style={{
                       boxShadow: '0 0 30px rgba(6, 182, 212, 0.3), inset 0 0 20px rgba(6, 182, 212, 0.05)'
                     }}>
                  
                  {/* Prize Label Header */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black border-2 border-cyan-500 px-3 py-1 rounded">
                    <div className="text-[10px] font-mono text-cyan-400 tracking-widest flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      PRIZE ITEM
                    </div>
                  </div>

                  {/* Serial Number Tag */}
                  <div className="absolute -top-2 -right-2 bg-red-500 text-black text-[8px] font-mono font-bold px-2 py-1 rounded rotate-12 shadow-lg">
                    LIMITED
                  </div>

                  {/* Medallion Container */}
                  <div className="relative flex justify-center group/medallion cursor-pointer">
                    {/* Holographic Glow */}
                    <div 
                      className="absolute -inset-3 bg-gradient-to-r from-cyan-500/30 via-green-500/30 to-cyan-500/30 rounded-full blur-xl transition-opacity duration-300 group-hover/medallion:opacity-100"
                      style={{
                        animation: 'glow-pulse 3s ease-in-out infinite'
                      }}
                    />
                    
                    {/* Authentication Grid Overlay */}
                    <div className="absolute inset-0 rounded-full opacity-20"
                         style={{
                           backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(6, 182, 212, 0.2) 8px, rgba(6, 182, 212, 0.2) 9px), repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(6, 182, 212, 0.2) 8px, rgba(6, 182, 212, 0.2) 9px)'
                         }}
                    />

                    {/* Medallion Image */}
                    <img
                      src="https://i.imgur.com/4JfT8q9.jpeg"
                      alt="HydrBrew Phygital Medallion"
                      className="relative w-32 h-32 rounded-full object-cover border-4 border-cyan-500/70 shadow-2xl transition-all duration-300 group-hover/medallion:scale-150 group-hover/medallion:shadow-[0_0_50px_rgba(6,182,212,0.8)] group-hover/medallion:z-50"
                      style={{
                        animation: 'medallion-pulse 3s ease-in-out infinite'
                      }}
                    />

                    {/* Holographic Shine Sweep */}
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent"
                        style={{
                          animation: 'shine-sweep 4s ease-in-out infinite',
                          transform: 'translateX(-100%) rotate(45deg)'
                        }}
                      />
                    </div>

                    {/* NFC/Scan Indicator */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                      <div 
                        className="w-16 h-16 border-2 border-cyan-400/40 rounded-full"
                        style={{
                          animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
                        }}
                      />
                      <div 
                        className="absolute inset-0 w-16 h-16 border-2 border-green-400/40 rounded-full"
                        style={{
                          animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite 0.5s'
                        }}
                      />
                    </div>

                    {/* QR Code Corner Markers */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-cyan-400/60" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-cyan-400/60" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-cyan-400/60" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-cyan-400/60" />
                  </div>

                  {/* Prize Info Panel */}
                  <div className="mt-3 pt-3 border-t border-cyan-500/30 space-y-2">
                    <div className="text-[10px] font-mono text-cyan-400/80 text-center">
                      PHYGITAL ASSET
                    </div>
                    <div className="text-xs font-mono text-white text-center font-bold">
                      ENTER#-TO-WIN
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                      <div className="text-[10px] font-mono text-green-400">
                        AUTHENTIC
                      </div>
                    </div>
                  </div>

                  {/* Edition Number */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black border border-cyan-500/50 px-2 py-0.5 rounded text-[8px] font-mono text-cyan-400">
                    #001/100
                  </div>
                </div>

                {/* Scan Instruction Callout */}
                <div className="mt-4 flex justify-center">
                  <div className="bg-green-500/10 border border-green-500/50 px-3 py-1.5 rounded text-[10px] font-mono text-green-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Win This Item
                  </div>
                </div>

                {/* Purchase Button */}
                <div className="mt-3">
                  <div className="text-center mb-2">
                    <div className="text-xs text-neutral-500 font-mono">OR</div>
                  </div>
                  <a
                    href="https://hydrbrew.com/shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-mono font-bold tracking-wider text-center text-xs rounded-lg transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] relative overflow-hidden group animate-pulse"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      <ShoppingCart className="w-3.5 h-3.5" />
                      RESERVE NOW
                    </div>
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                  </a>
                  <div className="text-center mt-2">
                    <div className="text-xs text-neutral-500 font-mono">Instant Access</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* VR Portal Modal */}
      <VRPortalModal 
        isOpen={isVRPortalOpen} 
        onClose={() => setIsVRPortalOpen(false)} 
      />
    </section>
  );
}