import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Menu, Zap, Activity, Users, Package, Radio, Skull, FileText, Award, HelpCircle, Share2, Terminal } from 'lucide-react';

interface MenuLink {
  id: string;
  label: string;
  sector: string;
  icon: any;
  color: 'cyan' | 'red';
}

const menuLinks: MenuLink[] = [
  { id: 'hero', label: 'MISSION START', sector: 'SECTOR_00', icon: Zap, color: 'cyan' },
  { id: 'product', label: 'THE PRODUCT', sector: 'SECTOR_01', icon: Package, color: 'cyan' },
  { id: 'email-capture', label: 'SECURE YOUR POSITION', sector: 'SECTOR_02', icon: Users, color: 'cyan' },
  { id: 'referral', label: 'PROTOCOL AMPLIFICATION', sector: 'SECTOR_03', icon: Share2, color: 'cyan' },
  { id: 'manifesto', label: 'MANIFESTO', sector: 'SECTOR_04', icon: FileText, color: 'cyan' },
  { id: 'faq', label: 'PROTOCOL ARCHIVE', sector: 'SECTOR_05', icon: HelpCircle, color: 'cyan' },
  { id: 'two-ways-to-play', label: 'TWO WAYS TO PLAY', sector: 'SECTOR_06', icon: Activity, color: 'red' },
  { id: 'founder-closing', label: 'BRIEFING CONCLUDED', sector: 'SECTOR_07', icon: Terminal, color: 'cyan' },
];

export function CyberpunkMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [systemStats, setSystemStats] = useState({
    cpu: 0,
    sync: 0,
    cohort: 0,
  });

  // Simulate system stats animation
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setSystemStats({
          cpu: Math.floor(Math.random() * 20) + 75,
          sync: Math.floor(Math.random() * 5) + 95,
          cohort: 1247 + Math.floor(Math.random() * 10),
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  // Play typewriter sound effect
  const playTypewriterSound = () => {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);
  };

  const handleLinkHover = (linkId: string) => {
    setHoveredLink(linkId);
    playTypewriterSound();
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Menu Toggle Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-20 right-4 md:top-6 md:right-6 z-[100] w-14 h-14 flex items-center justify-center border-2 transition-all duration-300 shadow-lg ${
          isOpen 
            ? 'bg-black border-cyan-400 text-cyan-400 shadow-cyan-500/50' 
            : 'bg-black/95 backdrop-blur-md border-cyan-400 text-cyan-400 hover:border-cyan-300 shadow-cyan-500/30 hover:shadow-cyan-500/60'
        }`}
        style={{
          boxShadow: isOpen 
            ? '0 0 40px rgba(34, 211, 238, 0.8), 0 0 60px rgba(34, 211, 238, 0.4), inset 0 0 25px rgba(34, 211, 238, 0.15)' 
            : '0 0 30px rgba(34, 211, 238, 0.6), 0 0 50px rgba(34, 211, 238, 0.3), inset 0 0 15px rgba(34, 211, 238, 0.1)'
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: '0 0 50px rgba(34, 211, 238, 0.9), 0 0 80px rgba(34, 211, 238, 0.5), inset 0 0 30px rgba(34, 211, 238, 0.2)'
        }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Main Content Wrapper with 3D Transform */}
      <motion.div
        animate={{
          rotateY: isOpen ? -8 : 0,
          scale: isOpen ? 0.95 : 1,
          x: isOpen ? -100 : 0,
        }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        style={{
          perspective: '2000px',
          transformStyle: 'preserve-3d',
        }}
        className="relative"
      >
        <motion.div
          animate={{
            filter: isOpen ? 'blur(4px)' : 'blur(0px)',
          }}
          transition={{ duration: 0.4 }}
        >
          {/* Content will be rendered here by parent */}
        </motion.div>
      </motion.div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ 
                x: 0, 
                opacity: 1,
                transition: {
                  x: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
                  opacity: { duration: 0.3 }
                }
              }}
              exit={{ 
                x: '100%', 
                opacity: 0,
                transition: { duration: 0.4 }
              }}
              className="fixed top-0 right-0 h-full w-full md:w-96 z-50 bg-black/40 backdrop-blur-md border-l-2 border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.2)]"
            >
              {/* Flicker effect overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.3, 0, 0.5, 0, 0.2, 0],
                }}
                transition={{ duration: 0.8, times: [0, 0.1, 0.2, 0.4, 0.5, 0.7, 1] }}
                className="absolute inset-0 bg-cyan-500/10 pointer-events-none"
              />

              {/* Glowing border effect */}
              <div className="absolute inset-0 border-2 border-cyan-500/20 pointer-events-none">
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 border border-cyan-400/40 shadow-[inset_0_0_20px_rgba(6,182,212,0.3)]"
                />
              </div>

              <div className="relative h-full flex flex-col p-8">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-12"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
                    <span className="font-mono text-xs text-cyan-400 tracking-widest">SYSTEM NAVIGATION</span>
                  </div>
                  <h2 className="text-3xl font-mono text-white">NEURAL_ROOT</h2>
                  <div className="h-px bg-gradient-to-r from-cyan-500 to-transparent mt-3" />
                </motion.div>

                {/* Navigation Links with Vertical Text */}
                <nav className="flex-1 space-y-1 overflow-y-auto">
                  {menuLinks.map((link, index) => (
                    <motion.div
                      key={link.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index + 0.3 }}
                      onMouseEnter={() => handleLinkHover(link.id)}
                      onMouseLeave={() => setHoveredLink(null)}
                      onClick={() => scrollToSection(link.id)}
                      className={`relative cursor-pointer group transition-all duration-300`}
                    >
                      <div className={`flex items-center gap-4 p-4 border transition-all duration-300 ${
                        hoveredLink === link.id
                          ? link.color === 'cyan'
                            ? 'border-cyan-500 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                            : 'border-red-500 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                          : 'border-neutral-800 bg-black/20'
                      }`}>
                        <link.icon className={`w-5 h-5 transition-colors ${
                          hoveredLink === link.id
                            ? link.color === 'cyan' ? 'text-cyan-400' : 'text-red-400'
                            : 'text-neutral-500'
                        }`} />
                        
                        <div className="flex-1">
                          <div className={`font-mono text-sm tracking-wider transition-colors ${
                            hoveredLink === link.id
                              ? link.color === 'cyan' ? 'text-cyan-400' : 'text-red-400'
                              : 'text-neutral-400'
                          }`}>
                            {link.label}
                          </div>
                          <div className="font-mono text-xs text-neutral-600 mt-0.5">
                            {link.sector}
                          </div>
                        </div>

                        {/* Mini wireframe preview on hover */}
                        <AnimatePresence>
                          {hoveredLink === link.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className={`absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 border ${
                                link.color === 'cyan' ? 'border-cyan-500/50' : 'border-red-500/50'
                              }`}
                            >
                              {/* Wireframe grid */}
                              <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-px">
                                {Array.from({ length: 9 }).map((_, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.3 }}
                                    transition={{ delay: i * 0.02 }}
                                    className={`${
                                      link.color === 'cyan' ? 'bg-cyan-500' : 'bg-red-500'
                                    }`}
                                  />
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Glowing trail effect */}
                      {hoveredLink === link.id && (
                        <motion.div
                          layoutId="activeLink"
                          className={`absolute -inset-1 -z-10 blur-md ${
                            link.color === 'cyan' ? 'bg-cyan-500/20' : 'bg-red-500/20'
                          }`}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.div>
                  ))}
                </nav>

                {/* System Status Readouts */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 pt-6 border-t border-neutral-800"
                >
                  <div className="font-mono text-xs text-cyan-400 mb-4 tracking-widest">
                    SYSTEM STATUS
                  </div>
                  
                  <div className="space-y-3">
                    {/* CPU Status */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs text-neutral-500">CPU_LOAD</span>
                        <span className="font-mono text-xs text-cyan-400">{systemStats.cpu}%</span>
                      </div>
                      <div className="h-1 bg-neutral-900 overflow-hidden">
                        <motion.div
                          animate={{ width: `${systemStats.cpu}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        />
                      </div>
                    </div>

                    {/* Sync Status */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs text-neutral-500">SYNC_RATE</span>
                        <span className="font-mono text-xs text-green-400">{systemStats.sync}%</span>
                      </div>
                      <div className="h-1 bg-neutral-900 overflow-hidden">
                        <motion.div
                          animate={{ width: `${systemStats.sync}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Cohort Population */}
                    <div className="flex items-center justify-between pt-2 border-t border-neutral-900">
                      <span className="font-mono text-xs text-neutral-500">COHORT_POP</span>
                      <motion.span
                        key={systemStats.cohort}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        className="font-mono text-sm text-red-400 font-bold"
                      >
                        {systemStats.cohort.toLocaleString()}
                      </motion.span>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-neutral-900">
                    <motion.div
                      animate={{
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    />
                    <span className="font-mono text-xs text-green-400">OPERATIONAL</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}