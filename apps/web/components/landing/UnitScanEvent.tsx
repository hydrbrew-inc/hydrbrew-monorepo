import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Lock, Zap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function UnitScanEvent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Simulated scan count
  const [scanCount, setScanCount] = useState(0);
  const targetScans = 5446;
  const currentScans = 3247; // Mock current progress
  
  // Scanner state for prize animations
  const [nftScannerIndex, setNftScannerIndex] = useState(0);
  const [cashScannerIndex, setCashScannerIndex] = useState(0);
  const [nftWinners, setNftWinners] = useState<number[]>([]);
  const [cashWinners, setCashWinners] = useState<number[]>([]);
  
  // AGI Clock state - Countdown to July 1, 2030
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  });

  // Fluctuating system stats
  const [quadrantSync, setQuadrantSync] = useState(98.7);
  const [agiUptime, setAgiUptime] = useState(99.94);

  // Target date: July 1, 2030 at midnight
  const targetDate = new Date('2030-07-01T00:00:00').getTime();

  // Animate scan count on mount
  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = currentScans / steps;
      let current = 0;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= currentScans) {
          setScanCount(currentScans);
          clearInterval(interval);
        } else {
          setScanCount(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(interval);
    }
  }, [isInView]);

  // AGI Clock countdown - Real-time to July 1, 2030
  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const distance = targetDate - now;
      
      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        const milliseconds = Math.floor((distance % 1000));
        
        setTimeRemaining({ days, hours, minutes, seconds, milliseconds });
      }
    };
    
    // Update immediately
    updateCountdown();
    
    // Update every ~50ms for smooth millisecond display
    const interval = setInterval(updateCountdown, 50);
    
    return () => clearInterval(interval);
  }, [targetDate]);

  const quadrants = [
    { name: 'ZEVON', position: 'top-right', color: 'from-green-500', scans: 892 },
    { name: 'VESPARA', position: 'bottom-right', color: 'from-emerald-500', scans: 756 },
    { name: 'LUNO', position: 'bottom-left', color: 'from-teal-500', scans: 634 },
    { name: 'ZENARA', position: 'top-left', color: 'from-lime-500', scans: 965 }
  ];

  const criticalHits = [
    { id: 1, locked: false, active: true },
    { id: 2, locked: false, active: true },
    { id: 3, locked: false, active: true },
    { id: 4, locked: false, active: false },
    { id: 5, locked: true, active: false },
    { id: 6, locked: true, active: false },
    { id: 7, locked: true, active: false },
    { id: 8, locked: true, active: false }
  ];

  const nftHits = [
    { id: 1, locked: false, active: true },
    { id: 2, locked: false, active: true },
    { id: 3, locked: false, active: true },
    { id: 4, locked: false, active: false },
    { id: 5, locked: true, active: false },
    { id: 6, locked: true, active: false },
    { id: 7, locked: true, active: false },
    { id: 8, locked: true, active: false },
    { id: 9, locked: false, active: true },
    { id: 10, locked: false, active: true },
    { id: 11, locked: false, active: true },
    { id: 12, locked: false, active: false },
    { id: 13, locked: true, active: false },
    { id: 14, locked: true, active: false },
    { id: 15, locked: true, active: false },
    { id: 16, locked: true, active: false }
  ];

  // AGI Expert Signals
  const agiSignals = [
    { author: "Sam Altman", role: "CEO, OpenAI", quote: "We are now confident we know how to build AGI as we have traditionally understood it… It is possible that we will have superintelligence in a few thousand days.", category: "optimist" },
    { author: "Elon Musk", role: "CEO, xAI/Tesla", quote: "My guess is that we'll have AI that is smarter than any one human probably by the end of next year.", category: "optimist" },
    { author: "Dario Amodei", role: "CEO, Anthropic", quote: "I think AGI is coming in the near term... possibly as early as 2026 or 2027. It will be a 'country of geniuses in a data center.'", category: "optimist" },
    { author: "Ilya Sutskever", role: "Co-founder, Safe Superintelligence", quote: "AI will do all the things that we can do... the rate of progress will become really extremely fast, resulting in unimaginable things.", category: "optimist" },
    { author: "Shane Legg", role: "Chief AGI Scientist, Google DeepMind", quote: "I've had roughly the same timeline for 15 years: a 50% probability of AGI by 2028, with the mode of that distribution being 2025.", category: "optimist" },
    { author: "John Schulman", role: "Co-founder, OpenAI", quote: "I predict AGI in 2027 and ASI (Artificial Superintelligence) by 2029.", category: "optimist" },
    { author: "Logan Kilpatrick", role: "Google AI", quote: "The possibility of direct access to ASI increases month by month.", category: "optimist" },
    { author: "Ben Goertzel", role: "SingularityNET", quote: "It seems quite plausible we could get to human-level AGI within the next three to eight years.", category: "optimist" },
    { author: "Emad Mostaque", role: "Former CEO, Stability AI", quote: "There will be no programmers in five years. We are moving toward a world of 100% automated intelligence.", category: "optimist" },
    { author: "Palmer Luckey", role: "Anduril", quote: "The timeline to AGI is much shorter than most people realize. We are seeing a massive compression of the R&D cycle.", category: "optimist" },
    { author: "Demis Hassabis", role: "CEO, Google DeepMind", quote: "We'll have something that exhibits all the cognitive capabilities humans have maybe in the next five to ten years, possibly the lower end of that.", category: "pragmatist" },
    { author: "Jensen Huang", role: "CEO, NVIDIA", quote: "If AGI is defined as passing human tests, it will be achieved within five years. AI shouldn't just answer; it should do research first.", category: "pragmatist" },
    { author: "Ray Kurzweil", role: "Futurist/Google", quote: "I predicted 2029 for AGI in 1999 and I still predict 2029. By then, everyone will accept it.", category: "pragmatist" },
    { author: "Mustafa Suleyman", role: "CEO, Microsoft AI", quote: "AGI will be achieved in 5-7 years. Existing hardware cannot support it yet; we need 2-5 generations of chip upgrades.", category: "pragmatist" },
    { author: "Geoffrey Hinton", role: "Godfather of AI", quote: "I used to think it was 30 to 50 years away. I now think AGI will be achieved in 3-5 years, but it may cause human extinction within 10.", category: "pragmatist" },
    { author: "Andrew Ng", role: "Stanford/DeepLearning.AI", quote: "The path to AGI is likely much longer than the current hype suggests, but the progress in reasoning is real and accelerating.", category: "pragmatist" },
    { author: "Dileep George", role: "DeepMind", quote: "We are entering the 'age of research' where big computers aren't enough; we need human-like generalization principles.", category: "pragmatist" },
    { author: "Bill Gates", role: "Microsoft", quote: "The development of AI is as fundamental as the creation of the microprocessor. AGI is coming, but it will be a gradual arrival over this decade.", category: "pragmatist" },
    { author: "Yann LeCun", role: "Chief AI Scientist, Meta", quote: "LLMs are not a road toward AGI. They don't understand the physical world, they can't plan, and they can't reason. We are stuck with dog-level AI first.", category: "skeptic" },
    { author: "Gary Marcus", role: "Cognitive Scientist", quote: "AGI cannot be achieved with existing technology. Deep learning has fundamental flaws and requires theoretical breakthroughs.", category: "skeptic" },
    { author: "Pedro Domingos", role: "Author, The Master Algorithm", quote: "AGI is a pipe dream for now. Existing technology lacks the theoretical support for true general intelligence.", category: "skeptic" },
    { author: "Fei-Fei Li", role: "Stanford", quote: "We need to focus on human-centered AI. True AGI requires an understanding of nuance and context that current models don't possess.", category: "skeptic" },
    { author: "Melanie Mitchell", role: "Santa Fe Institute", quote: "The 'common sense' gap in AI is much wider than people think. We are nowhere near the level of a human toddler.", category: "skeptic" },
    { author: "Rodney Brooks", role: "Robotics Expert", quote: "Don't mistake clear progress in one domain for general intelligence. We are still decades away from a robot that can truly navigate the world like a human.", category: "skeptic" },
    { author: "François Chollet", role: "Google/Keras Creator", quote: "Intelligence is about the ability to learn new skills, not just recall data. LLMs are not a path to AGI because they cannot handle novel situations.", category: "skeptic" }
  ];

  // Typewriter effect state
  const [currentSignalIndex, setCurrentSignalIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const activeAgiQuote = agiSignals[currentSignalIndex] ?? agiSignals[0]!;

  // Typewriter animation
  useEffect(() => {
    const currentSignal = agiSignals[currentSignalIndex];
    if (!currentSignal) return;
    const fullText = currentSignal.quote;

    if (isTyping) {
      if (displayedText.length < fullText.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        }, 20); // Typing speed
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, pause before next quote
        const timeout = setTimeout(() => {
          setIsTyping(false);
          setDisplayedText("");
          setCurrentSignalIndex((prev) => (prev + 1) % agiSignals.length);
          setIsTyping(true);
        }, 4000); // Pause duration
        return () => clearTimeout(timeout);
      }
    }
  }, [displayedText, isTyping, currentSignalIndex]);

  // NFT Scanner Animation - Rotates through all 16 slots
  useEffect(() => {
    const interval = setInterval(() => {
      setNftScannerIndex((prev) => (prev + 1) % 16);
    }, 400); // Faster rotation for 16 slots
    
    return () => clearInterval(interval);
  }, []);

  // Cash Prize Scanner Animation - Rotates through all 8 slots
  useEffect(() => {
    const interval = setInterval(() => {
      setCashScannerIndex((prev) => (prev + 1) % 8);
    }, 500); // Slightly slower for 8 slots
    
    return () => clearInterval(interval);
  }, []);

  // Fluctuating system stats update
  useEffect(() => {
    const interval = setInterval(() => {
      // Quadrant Sync: fluctuate between 85% and 100%
      setQuadrantSync(85 + Math.random() * 15);
      // AGI Uptime: fluctuate between 85% and 100%
      setAgiUptime(85 + Math.random() * 15);
    }, 1500); // Update every 1.5 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Random Winner Pop Effect for NFT - Adds random slots to winners array
  useEffect(() => {
    const interval = setInterval(() => {
      const randomSlot = Math.floor(Math.random() * 16);
      setNftWinners((prev) => {
        // Keep only last 3 winners to avoid too many active at once
        const newWinners = [...prev, randomSlot].slice(-3);
        return newWinners;
      });
      
      // Remove winner after animation completes
      setTimeout(() => {
        setNftWinners((prev) => prev.filter((w) => w !== randomSlot));
      }, 2000);
    }, 3000); // New winner every 3 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Random Winner Pop Effect for Cash - Adds random slots to winners array
  useEffect(() => {
    const interval = setInterval(() => {
      const randomSlot = Math.floor(Math.random() * 8);
      setCashWinners((prev) => {
        // Keep only last 2 winners to avoid too many active at once
        const newWinners = [...prev, randomSlot].slice(-2);
        return newWinners;
      });
      
      // Remove winner after animation completes
      setTimeout(() => {
        setCashWinners((prev) => prev.filter((w) => w !== randomSlot));
      }, 2000);
    }, 4000); // New winner every 4 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={ref}
      className="py-32 md:py-40 bg-black relative overflow-hidden border-t-4 border-green-500/30"
    >
      {/* Background grid */}
      <div className="absolute inset-0">
        {/* Green pulsing grid matching VideoShowcase style */}
        <div className="absolute inset-0 opacity-12 pointer-events-none">
          <div 
            className="absolute inset-0 animate-pulse"
            style={{
              backgroundImage: 'linear-gradient(rgba(34, 197, 94, 0.85) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(34, 197, 94, 0.85) 1.5px, transparent 1.5px)',
              backgroundSize: '40px 40px',
              animationDuration: '3s'
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          {/* Background Image Layer with Cyberpunk Effects */}
          <div className="absolute inset-0 -top-40 -bottom-40 flex items-center justify-center pointer-events-none overflow-hidden">
            <div className="relative w-full max-w-5xl h-full">
              <img 
                src="https://i.imgur.com/nBujlj7.png"
                alt=""
                className="w-full h-full object-cover opacity-50"
                style={{
                  filter: 'brightness(0.7) contrast(1.5) saturate(0.7) hue-rotate(90deg)',
                  mixBlendMode: 'screen',
                  objectPosition: 'center 35%'
                }}
              />
              {/* Green overlay glow */}
              <div className="absolute inset-0 bg-gradient-radial from-green-500/20 via-green-500/5 to-transparent animate-pulse" 
                style={{ animationDuration: '3s' }}
              />
              {/* Animated scan lines */}
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,197,94,0.15) 2px, rgba(34,197,94,0.15) 4px)',
                  animation: 'scan-lines 8s linear infinite'
                }}
              />
            </div>
          </div>

          <div className="relative z-10">
            <div className="inline-block mb-6 px-6 py-2 border-4 border-green-500 bg-green-500/10 font-mono text-sm text-green-400 tracking-widest">
              MISSION PROTOCOL: 5K+ UNIT SCAN EVENT
            </div>
            <h2 className="text-4xl md:text-6xl text-green-400 font-mono mb-4 tracking-tight">
              24 WINNING SCANS
            </h2>
            <p className="text-white text-lg md:text-xl font-mono mb-4">
              8 CASH PRIZES + 16 CHARACTER NFTs WITH VR ACCESS
            </p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { 
              opacity: 1, 
              scale: 1,
              boxShadow: [
                '0 0 20px rgba(34,197,94,0.4)',
                '0 0 40px rgba(34,197,94,0.7)',
                '0 0 20px rgba(34,197,94,0.4)'
              ]
            } : {}}
            transition={{ 
              duration: 0.6,
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="inline-block bg-gradient-to-r from-green-500/30 via-green-400/20 to-green-500/30 border-2 border-green-500 px-6 py-3 mt-2 relative"
            style={{
              boxShadow: '0 0 30px rgba(34,197,94,0.5), inset 0 0 20px rgba(34,197,94,0.1)'
            }}
          >
            {/* Animated corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-4 border-l-4 border-green-300 -translate-x-0.5 -translate-y-0.5" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-4 border-r-4 border-green-300 translate-x-0.5 -translate-y-0.5" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-4 border-l-4 border-green-300 -translate-x-0.5 translate-y-0.5" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-4 border-r-4 border-green-300 translate-x-0.5 translate-y-0.5" />
            
            {/* Glowing background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent animate-pulse" />
            
            <p className="text-green-400 font-mono text-sm md:text-base relative z-10">
              <span 
                className="text-green-300 font-bold"
                style={{
                  textShadow: '2px 0 rgba(255,0,0,0.3), -2px 0 rgba(0,255,255,0.3)',
                  animation: 'glitch-header 3s infinite'
                }}
              >
                SCAN GAME STARTS AT PRODUCT LAUNCH
              </span> // 
              <span 
                className="text-green-300 font-bold ml-1"
                style={{
                  textShadow: '2px 0 rgba(255,0,0,0.3), -2px 0 rgba(0,255,255,0.3)',
                  animation: 'glitch-header 3.5s infinite'
                }}
              >
                MORE SCANS = HIGHER WIN PROBABILITY
              </span> // <span
                style={{
                  textShadow: '1px 0 rgba(255,0,0,0.2), -1px 0 rgba(0,255,255,0.2)',
                  animation: 'glitch-text-subtle 4s infinite'
                }}
              >UNLIMITED ENTRIES</span>
            </p>
            
            <style>{`
              @keyframes glitch-header {
                0%, 90%, 100% { 
                  transform: translate(0);
                  text-shadow: 2px 0 rgba(255,0,0,0.3), -2px 0 rgba(0,255,255,0.3);
                }
                92% { 
                  transform: translate(-2px, 1px);
                  text-shadow: 3px 0 rgba(255,0,0,0.5), -3px 0 rgba(0,255,255,0.5);
                }
                94% { 
                  transform: translate(2px, -1px);
                  text-shadow: -3px 0 rgba(255,0,0,0.5), 3px 0 rgba(0,255,255,0.5);
                }
                96% { 
                  transform: translate(-1px, 0);
                }
              }
              
              @keyframes glitch-text-subtle {
                0%, 88%, 100% { 
                  transform: translate(0);
                  text-shadow: 1px 0 rgba(255,0,0,0.2), -1px 0 rgba(0,255,255,0.2);
                }
                90% { 
                  transform: translate(-1px, 0);
                  text-shadow: 2px 0 rgba(255,0,0,0.4), -2px 0 rgba(0,255,255,0.4);
                }
                92% { 
                  transform: translate(1px, 0);
                }
              }
              
              @keyframes scan-lines {
                0% {
                  transform: translateY(0);
                }
                100% {
                  transform: translateY(4px);
                }
              }
            `}</style>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Left Column: AGI Clock & Radar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* AGI Clock */}
            <div className="border-4 border-green-500 bg-black p-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-green-500/30">
                <h3 className="text-green-400 font-mono text-sm tracking-widest">GLOBAL AGI CLOCK</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 animate-pulse" />
                  <span className="text-green-400 font-mono text-xs">LIVE</span>
                </div>
              </div>
              
              {/* Target date indicator */}
              <div className="mb-4 text-center pb-4 border-b border-green-500/20">
                <div className="text-xs font-mono text-green-500/60 mb-1">COUNTDOWN TO</div>
                <div className="text-sm font-mono text-green-400">07/01/2030 00:00:00 UTC</div>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'DAYS', value: String(timeRemaining.days).padStart(2, '0') },
                  { label: 'HRS', value: String(timeRemaining.hours).padStart(2, '0') },
                  { label: 'MIN', value: String(timeRemaining.minutes).padStart(2, '0') },
                  { label: 'SEC', value: String(timeRemaining.seconds).padStart(2, '0') }
                ].map((unit, index) => (
                  <div key={unit.label} className="text-center">
                    <div className="bg-green-500/10 border border-green-500 md:border-2 p-2 md:p-4 mb-1.5 rounded md:rounded-lg">
                      <motion.div
                        key={unit.value}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.1 }}
                        className="text-xl md:text-4xl font-mono text-green-400 leading-none"
                      >
                        {unit.value}
                      </motion.div>
                    </div>
                    <div className="text-xs font-mono text-green-500/70">{unit.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center pb-4 border-b border-green-500/20">
                <div className="text-xs font-mono text-green-400/60">
                  MS: <motion.span
                    key={timeRemaining.milliseconds}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.05 }}
                  >
                    {String(timeRemaining.milliseconds).padStart(3, '0')}
                  </motion.span>
                </div>
              </div>
              
              {/* Scan mechanic explainer */}
              <div className="mt-4 bg-green-500/5 border-2 border-green-500/30 p-3 relative overflow-hidden">
                {/* Scanline overlay effect */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-30"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 197, 94, 0.1) 2px, rgba(34, 197, 94, 0.1) 4px)',
                    animation: 'scanline 8s linear infinite'
                  }}
                />
                
                {/* CRT flicker overlay */}
                <div 
                  className="absolute inset-0 bg-green-500/5 pointer-events-none"
                  style={{
                    animation: 'flicker 0.15s infinite'
                  }}
                />
                
                <div className="flex items-start gap-3 relative z-10">
                  <Zap className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div 
                      className="text-xs font-mono text-green-400 mb-1"
                      style={{
                        textShadow: '2px 0 rgba(255,0,0,0.3), -2px 0 rgba(0,255,255,0.3)',
                        animation: 'glitch 3s infinite'
                      }}
                    >
                      SCAN EFFECT
                    </div>
                    <div 
                      className="text-xs font-mono text-green-500/80 leading-relaxed"
                      style={{
                        textShadow: '1px 0 rgba(255,0,0,0.2), -1px 0 rgba(0,255,255,0.2)',
                        animation: 'glitch-text 5s infinite'
                      }}
                    >
                      Each can scan subtracts <span 
                        className="text-green-400 font-bold"
                        style={{
                          textShadow: '2px 0 rgba(255,0,0,0.4), -2px 0 rgba(0,255,255,0.4)',
                          animation: 'glitch-number 2s infinite'
                        }}
                      >24 hours</span> from the Global AGI Clock. Scan to become part of the AGI time acceleration experiment!
                    </div>
                  </div>
                </div>
                
                <style>{`
                  @keyframes glitch {
                    0%, 90%, 100% { 
                      transform: translate(0);
                      text-shadow: 2px 0 rgba(255,0,0,0.3), -2px 0 rgba(0,255,255,0.3);
                    }
                    92% { 
                      transform: translate(-2px, 1px);
                      text-shadow: 3px 0 rgba(255,0,0,0.5), -3px 0 rgba(0,255,255,0.5);
                    }
                    94% { 
                      transform: translate(2px, -1px);
                      text-shadow: -3px 0 rgba(255,0,0,0.5), 3px 0 rgba(0,255,255,0.5);
                    }
                    96% { 
                      transform: translate(-1px, 0);
                    }
                  }
                  
                  @keyframes glitch-text {
                    0%, 85%, 100% { 
                      transform: translate(0);
                      text-shadow: 1px 0 rgba(255,0,0,0.2), -1px 0 rgba(0,255,255,0.2);
                    }
                    87% { 
                      transform: translate(-1px, 0);
                      text-shadow: 2px 0 rgba(255,0,0,0.4), -2px 0 rgba(0,255,255,0.4);
                    }
                    89% { 
                      transform: translate(1px, 0);
                    }
                  }
                  
                  @keyframes glitch-number {
                    0%, 80%, 100% { 
                      transform: translate(0);
                      text-shadow: 2px 0 rgba(255,0,0,0.4), -2px 0 rgba(0,255,255,0.4);
                    }
                    82% { 
                      transform: translate(-3px, 1px);
                      text-shadow: 4px 0 rgba(255,0,0,0.7), -4px 0 rgba(0,255,255,0.7);
                    }
                    84% { 
                      transform: translate(3px, -1px);
                      text-shadow: -4px 0 rgba(255,0,0,0.7), 4px 0 rgba(0,255,255,0.7);
                    }
                    86% { 
                      transform: translate(-1px, 0);
                    }
                  }
                  
                  @keyframes scanline {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                  }
                  
                  @keyframes flicker {
                    0%, 100% { opacity: 0.05; }
                    50% { opacity: 0.03; }
                  }
                `}</style>
              </div>
            </div>

            {/* Circular HUD Radar */}
            <div className="border-4 border-green-500 bg-black p-8">
              <h3 className="text-green-400 font-mono text-sm tracking-widest mb-6 pb-4 border-b-2 border-green-500/30">
                QUADRANT HUD RADAR
              </h3>
              
              <div className="relative w-full aspect-square max-w-sm mx-auto">
                {/* Outer circle */}
                <div className="absolute inset-0 rounded-full border-4 border-green-500" />
                
                {/* Cross dividers */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-green-500" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-0.5 bg-green-500" />
                </div>
                
                {/* Inner circles */}
                <div className="absolute inset-[20%] rounded-full border-2 border-green-500/50" />
                <div className="absolute inset-[40%] rounded-full border-2 border-green-500/30" />
                
                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-green-500 animate-pulse" />
                
                {/* Quadrant labels */}
                {quadrants.map((quadrant, index) => {
                  const positions = {
                    'top-right': 'top-[15%] right-[15%]',
                    'bottom-right': 'bottom-[15%] right-[15%]',
                    'bottom-left': 'bottom-[15%] left-[15%]',
                    'top-left': 'top-[15%] left-[15%]'
                  };
                  
                  return (
                    <motion.div
                      key={quadrant.name}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                      className={`absolute ${positions[quadrant.position as keyof typeof positions]} text-center`}
                    >
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${quadrant.color} to-green-900 border-2 border-green-400 flex items-center justify-center mb-2`}>
                        <div className="text-xs font-mono text-black font-bold">
                          {quadrant.name.slice(0, 3)}
                        </div>
                      </div>
                      <div className="text-xs font-mono text-green-400">{quadrant.scans}</div>
                    </motion.div>
                  );
                })}
                
                {/* Scanning effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 0deg, rgba(34,197,94,0.3) 30deg, transparent 60deg)'
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>

            {/* NFT Prize Tracker - MOVED TO LEFT */}
            <div className="border-4 border-cyan-500 bg-black p-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-cyan-500/30">
                <h3 className="text-cyan-400 font-mono text-sm tracking-widest">NFT + VR ACCESS HITS</h3>
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
              
              {/* NFT Pool Callout */}
              <div className="mb-6 bg-cyan-500/10 border-2 border-cyan-500 p-4">
                <div className="text-center">
                  <div className="text-xs font-mono text-cyan-500/70 mb-1">CHARACTER NFT POOL</div>
                  <div className="text-3xl font-mono text-cyan-400 mb-2">16 WINNERS</div>
                  <div className="text-xs font-mono text-cyan-300 mb-3">
                    Unlock exclusive character NFT + future VR access
                  </div>
                  <div className="text-xs font-mono text-cyan-400/80 pt-2 border-t border-cyan-500/20">
                    4 NFTs per character × 4 quadrants
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-2 mb-2">
                {nftHits.slice(0, 4).map((hit, index) => {
                  const globalIndex = index;
                  const isScanning = nftScannerIndex === globalIndex;
                  const isWinner = nftWinners.includes(globalIndex);
                  
                  return (
                    <motion.div
                      key={hit.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { 
                        opacity: 1, 
                        scale: isWinner ? [1, 1.2, 1] : 1,
                        boxShadow: isWinner 
                          ? ['0 0 0px rgba(34, 211, 238, 0)', '0 0 30px rgba(34, 211, 238, 1)', '0 0 10px rgba(34, 211, 238, 0.5)']
                          : isScanning
                          ? '0 0 15px rgba(34, 211, 238, 0.6)'
                          : '0 0 0px rgba(34, 211, 238, 0)'
                      } : {}}
                      transition={{ 
                        duration: 0.3, 
                        delay: 1.0 + (index * 0.03),
                        scale: { duration: 0.5, repeat: isWinner ? 2 : 0 },
                        boxShadow: { duration: 0.5 }
                      }}
                      className={`
                        aspect-square border-2 flex items-center justify-center text-[8px] relative overflow-visible
                        ${hit.locked 
                          ? 'border-cyan-500/30 bg-cyan-950/30' 
                          : isWinner
                            ? 'border-cyan-400 bg-cyan-400/40'
                            : isScanning
                            ? 'border-cyan-400 bg-cyan-500/30'
                            : hit.active 
                            ? 'border-cyan-500 bg-cyan-500/20' 
                            : 'border-cyan-500/50 bg-black'
                        }
                      `}
                    >
                      {/* Winner burst particles */}
                      {isWinner && (
                        <>
                          {[...Array(8)].map((_, i) => {
                            const angle = (i / 8) * 360;
                            return (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                                style={{
                                  left: '50%',
                                  top: '50%',
                                }}
                                initial={{ x: 0, y: 0, opacity: 1 }}
                                animate={{
                                  x: Math.cos(angle * Math.PI / 180) * 20,
                                  y: Math.sin(angle * Math.PI / 180) * 20,
                                  opacity: 0,
                                  scale: [1, 2, 0]
                                }}
                                transition={{
                                  duration: 0.6,
                                  ease: "easeOut"
                                }}
                              />
                            );
                          })}
                          {/* Shockwave ring */}
                          <motion.div
                            className="absolute inset-0 border-2 border-cyan-400 rounded-sm"
                            initial={{ scale: 1, opacity: 0.8 }}
                            animate={{
                              scale: 2,
                              opacity: 0
                            }}
                            transition={{
                              duration: 0.6,
                              ease: "easeOut"
                            }}
                          />
                        </>
                      )}
                      
                      {hit.locked ? (
                        <Lock className="w-3 h-3 text-cyan-500/50" />
                      ) : hit.active ? (
                        <Zap className={`w-3 h-3 ${isWinner ? 'text-white' : 'text-cyan-400'} ${isWinner || isScanning ? 'animate-pulse' : ''}`} />
                      ) : (
                        <div className="w-1.5 h-1.5 border border-cyan-500/50" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="grid grid-cols-4 gap-2 mb-2">
                {nftHits.slice(4, 8).map((hit, index) => {
                  const globalIndex = 4 + index;
                  const isScanning = nftScannerIndex === globalIndex;
                  const isWinner = nftWinners.includes(globalIndex);
                  
                  return (
                    <motion.div
                      key={hit.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { 
                        opacity: 1, 
                        scale: isWinner ? [1, 1.2, 1] : 1,
                        boxShadow: isWinner 
                          ? ['0 0 0px rgba(34, 211, 238, 0)', '0 0 30px rgba(34, 211, 238, 1)', '0 0 10px rgba(34, 211, 238, 0.5)']
                          : isScanning
                          ? '0 0 15px rgba(34, 211, 238, 0.6)'
                          : '0 0 0px rgba(34, 211, 238, 0)'
                      } : {}}
                      transition={{ 
                        duration: 0.3, 
                        delay: 1.1 + (index * 0.03),
                        scale: { duration: 0.5, repeat: isWinner ? 2 : 0 },
                        boxShadow: { duration: 0.5 }
                      }}
                      className={`
                        aspect-square border-2 flex items-center justify-center relative overflow-visible
                        ${hit.locked 
                          ? 'border-cyan-500/30 bg-cyan-950/30' 
                          : isWinner
                            ? 'border-cyan-400 bg-cyan-400/40'
                            : isScanning
                            ? 'border-cyan-400 bg-cyan-500/30'
                            : hit.active 
                            ? 'border-cyan-500 bg-cyan-500/20' 
                            : 'border-cyan-500/50 bg-black'
                        }
                      `}
                    >
                      {/* Winner burst particles */}
                      {isWinner && (
                        <>
                          {[...Array(8)].map((_, i) => {
                            const angle = (i / 8) * 360;
                            return (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                                style={{ left: '50%', top: '50%' }}
                                initial={{ x: 0, y: 0, opacity: 1 }}
                                animate={{
                                  x: Math.cos(angle * Math.PI / 180) * 20,
                                  y: Math.sin(angle * Math.PI / 180) * 20,
                                  opacity: 0,
                                  scale: [1, 2, 0]
                                }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                              />
                            );
                          })}
                          <motion.div
                            className="absolute inset-0 border-2 border-cyan-400 rounded-sm"
                            initial={{ scale: 1, opacity: 0.8 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                        </>
                      )}
                      
                      {hit.locked ? (
                        <Lock className="w-3 h-3 text-cyan-500/50" />
                      ) : hit.active ? (
                        <Zap className={`w-3 h-3 ${isWinner ? 'text-white' : 'text-cyan-400'} ${isWinner || isScanning ? 'animate-pulse' : ''}`} />
                      ) : (
                        <div className="w-1.5 h-1.5 border border-cyan-500/50" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="grid grid-cols-4 gap-2 mb-2">
                {nftHits.slice(8, 12).map((hit, index) => {
                  const globalIndex = 8 + index;
                  const isScanning = nftScannerIndex === globalIndex;
                  const isWinner = nftWinners.includes(globalIndex);
                  
                  return (
                    <motion.div
                      key={hit.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { 
                        opacity: 1, 
                        scale: isWinner ? [1, 1.2, 1] : 1,
                        boxShadow: isWinner 
                          ? ['0 0 0px rgba(34, 211, 238, 0)', '0 0 30px rgba(34, 211, 238, 1)', '0 0 10px rgba(34, 211, 238, 0.5)']
                          : isScanning
                          ? '0 0 15px rgba(34, 211, 238, 0.6)'
                          : '0 0 0px rgba(34, 211, 238, 0)'
                      } : {}}
                      transition={{ 
                        duration: 0.3, 
                        delay: 1.2 + (index * 0.03),
                        scale: { duration: 0.5, repeat: isWinner ? 2 : 0 },
                        boxShadow: { duration: 0.5 }
                      }}
                      className={`
                        aspect-square border-2 flex items-center justify-center relative overflow-visible
                        ${hit.locked 
                          ? 'border-cyan-500/30 bg-cyan-950/30' 
                          : isWinner
                            ? 'border-cyan-400 bg-cyan-400/40'
                            : isScanning
                            ? 'border-cyan-400 bg-cyan-500/30'
                            : hit.active 
                            ? 'border-cyan-500 bg-cyan-500/20' 
                            : 'border-cyan-500/50 bg-black'
                        }
                      `}
                    >
                      {/* Winner burst particles */}
                      {isWinner && (
                        <>
                          {[...Array(8)].map((_, i) => {
                            const angle = (i / 8) * 360;
                            return (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                                style={{ left: '50%', top: '50%' }}
                                initial={{ x: 0, y: 0, opacity: 1 }}
                                animate={{
                                  x: Math.cos(angle * Math.PI / 180) * 20,
                                  y: Math.sin(angle * Math.PI / 180) * 20,
                                  opacity: 0,
                                  scale: [1, 2, 0]
                                }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                              />
                            );
                          })}
                          <motion.div
                            className="absolute inset-0 border-2 border-cyan-400 rounded-sm"
                            initial={{ scale: 1, opacity: 0.8 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                        </>
                      )}
                      
                      {hit.locked ? (
                        <Lock className="w-3 h-3 text-cyan-500/50" />
                      ) : hit.active ? (
                        <Zap className={`w-3 h-3 ${isWinner ? 'text-white' : 'text-cyan-400'} ${isWinner || isScanning ? 'animate-pulse' : ''}`} />
                      ) : (
                        <div className="w-1.5 h-1.5 border border-cyan-500/50" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {nftHits.slice(12, 16).map((hit, index) => {
                  const globalIndex = 12 + index;
                  const isScanning = nftScannerIndex === globalIndex;
                  const isWinner = nftWinners.includes(globalIndex);
                  
                  return (
                    <motion.div
                      key={hit.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { 
                        opacity: 1, 
                        scale: isWinner ? [1, 1.2, 1] : 1,
                        boxShadow: isWinner 
                          ? ['0 0 0px rgba(34, 211, 238, 0)', '0 0 30px rgba(34, 211, 238, 1)', '0 0 10px rgba(34, 211, 238, 0.5)']
                          : isScanning
                          ? '0 0 15px rgba(34, 211, 238, 0.6)'
                          : '0 0 0px rgba(34, 211, 238, 0)'
                      } : {}}
                      transition={{ 
                        duration: 0.3, 
                        delay: 1.3 + (index * 0.03),
                        scale: { duration: 0.5, repeat: isWinner ? 2 : 0 },
                        boxShadow: { duration: 0.5 }
                      }}
                      className={`
                        aspect-square border-2 flex items-center justify-center relative overflow-visible
                        ${hit.locked 
                          ? 'border-cyan-500/30 bg-cyan-950/30' 
                          : isWinner
                            ? 'border-cyan-400 bg-cyan-400/40'
                            : isScanning
                            ? 'border-cyan-400 bg-cyan-500/30'
                            : hit.active 
                            ? 'border-cyan-500 bg-cyan-500/20' 
                            : 'border-cyan-500/50 bg-black'
                        }
                      `}
                    >
                      {/* Winner burst particles */}
                      {isWinner && (
                        <>
                          {[...Array(8)].map((_, i) => {
                            const angle = (i / 8) * 360;
                            return (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                                style={{ left: '50%', top: '50%' }}
                                initial={{ x: 0, y: 0, opacity: 1 }}
                                animate={{
                                  x: Math.cos(angle * Math.PI / 180) * 20,
                                  y: Math.sin(angle * Math.PI / 180) * 20,
                                  opacity: 0,
                                  scale: [1, 2, 0]
                                }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                              />
                            );
                          })}
                          <motion.div
                            className="absolute inset-0 border-2 border-cyan-400 rounded-sm"
                            initial={{ scale: 1, opacity: 0.8 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                        </>
                      )}
                      
                      {hit.locked ? (
                        <Lock className="w-3 h-3 text-cyan-500/50" />
                      ) : hit.active ? (
                        <Zap className={`w-3 h-3 ${isWinner ? 'text-white' : 'text-cyan-400'} ${isWinner || isScanning ? 'animate-pulse' : ''}`} />
                      ) : (
                        <div className="w-1.5 h-1.5 border border-cyan-500/50" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="mt-6 pt-4 border-t border-cyan-500/30">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-cyan-500/70">NFT PRIZE SLOTS</span>
                  <span className="text-cyan-400">16 WINNERS</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-cyan-500/70">NFTs PER CHARACTER</span>
                  <span className="text-cyan-400">4 EACH</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-500/70">INCLUDES</span>
                  <span className="text-cyan-400">FUTURE VR ACCESS</span>
                </div>
              </div>
            </div>

            {/* Visual Asset - Scan Game */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="border-4 border-cyan-500 bg-black p-2 relative overflow-hidden"
            >
              {/* Glowing corners */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-cyan-300 -translate-x-1 -translate-y-1 z-10" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-cyan-300 translate-x-1 -translate-y-1 z-10" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-cyan-300 -translate-x-1 translate-y-1 z-10" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-cyan-300 translate-x-1 translate-y-1 z-10" />
              
              <img 
                src="https://i.imgur.com/i6XOdah.png" 
                alt="HydrBrew Scan Game Visual"
                className="w-full h-auto"
              />
              
              {/* Scan line effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-16"
                animate={{ y: ['0%', '400%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>

          {/* Right Column: Scan Status & Cash Prizes */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Scan Status */}
            <div className="border-4 border-green-500 bg-black p-8">
              <h3 className="text-green-400 font-mono text-sm tracking-widest mb-6 pb-4 border-b-2 border-green-500/30">
                EXTRACTION PROGRESS
              </h3>
              
              <div className="mb-8">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <div className="text-xs font-mono text-green-500/70 mb-1">SCANS RECORDED</div>
                    <motion.div
                      className="text-5xl md:text-6xl font-mono text-green-400"
                      initial={{ scale: 0.8 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {scanCount.toLocaleString()}
                    </motion.div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono text-green-500/70 mb-1">TARGET</div>
                    <div className="text-3xl font-mono text-green-400/60">
                      {targetScans.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="relative h-8 bg-green-950 border-2 border-green-500">
                  <motion.div
                    className="absolute inset-0 bg-green-500"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${(currentScans / targetScans) * 100}%` } : {}}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-xs text-black font-bold relative z-10 mix-blend-difference">
                      {Math.round((currentScans / targetScans) * 100)}% COMPLETE
                    </span>
                  </div>
                </div>
              </div>

              {/* Quadrant breakdown */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-green-500/70 mb-3 pb-2 border-b border-green-500/30">
                  QUADRANT BREAKDOWN // PRIZE DISTRIBUTION
                </div>
                {quadrants.map((quadrant, index) => (
                  <motion.div
                    key={quadrant.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                    className="border border-green-500/30 bg-green-500/5 p-3 rounded"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 bg-gradient-to-br ${quadrant.color} to-green-900`} />
                        <span className="font-mono text-sm text-green-400 font-bold">{quadrant.name}</span>
                      </div>
                      <span className="font-mono text-sm text-green-400">{quadrant.scans} scans</span>
                    </div>
                    <div className="space-y-1 mt-2 pt-2 border-t border-green-500/20">
                      <div className="flex items-center gap-2">
                        <Zap className="w-3 h-3 text-green-400" />
                        <span className="font-mono text-xs text-green-300">2 cash prizes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-3 h-3 text-cyan-400" />
                        <span className="font-mono text-xs text-cyan-300">4 Character NFTs + VR access</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Critical Hits Tracker */}
            <div className="border-4 border-green-500 bg-black p-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-green-500/30">
                <h3 className="text-green-400 font-mono text-sm tracking-widest">CASH PRIZE HITS</h3>
                <Zap className="w-5 h-5 text-green-400" />
              </div>
              
              {/* Prize Pool Callout */}
              <div className="mb-6 bg-green-500/10 border-2 border-green-500 p-4">
                <div className="text-center">
                  <div className="text-xs font-mono text-green-500/70 mb-1">CASH PRIZE POOL</div>
                  <div className="text-3xl font-mono text-green-400 mb-2">8 WINNERS</div>
                  <div className="text-xs font-mono text-green-300 mb-3">
                    Every scan = New entry // Scan more, win more
                  </div>
                  <div className="text-xs font-mono text-green-400/80 pt-2 border-t border-green-500/20">
                    2 cash prizes per character × 4 quadrants
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-3 mb-4">
                {criticalHits.slice(0, 4).map((hit, index) => {
                  const globalIndex = index;
                  const isScanning = cashScannerIndex === globalIndex;
                  const isWinner = cashWinners.includes(globalIndex);
                  
                  return (
                    <motion.div
                      key={hit.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { 
                        opacity: 1, 
                        scale: isWinner ? [1, 1.3, 1] : 1,
                        boxShadow: isWinner 
                          ? ['0 0 0px rgba(34, 197, 94, 0)', '0 0 40px rgba(34, 197, 94, 1)', '0 0 15px rgba(34, 197, 94, 0.6)']
                          : isScanning
                          ? '0 0 20px rgba(34, 197, 94, 0.7)'
                          : '0 0 0px rgba(34, 197, 94, 0)'
                      } : {}}
                      transition={{ 
                        duration: 0.3, 
                        delay: 0.7 + (index * 0.05),
                        scale: { duration: 0.6, repeat: isWinner ? 3 : 0 },
                        boxShadow: { duration: 0.6 }
                      }}
                      className={`
                        aspect-square border-2 flex items-center justify-center relative overflow-visible
                        ${hit.locked 
                          ? 'border-green-500/30 bg-green-950/30' 
                          : isWinner
                            ? 'border-green-400 bg-green-400/50'
                            : isScanning
                            ? 'border-green-400 bg-green-500/30'
                            : hit.active 
                            ? 'border-green-500 bg-green-500/20' 
                            : 'border-green-500/50 bg-black'
                        }
                      `}
                    >
                      {/* Winner burst particles - MORE INTENSE for cash prizes */}
                      {isWinner && (
                        <>
                          {[...Array(12)].map((_, i) => {
                            const angle = (i / 12) * 360;
                            return (
                              <motion.div
                                key={i}
                                className="absolute w-1.5 h-1.5 bg-green-400 rounded-full"
                                style={{
                                  left: '50%',
                                  top: '50%',
                                  filter: 'drop-shadow(0 0 4px rgba(34, 197, 94, 1))'
                                }}
                                initial={{ x: 0, y: 0, opacity: 1 }}
                                animate={{
                                  x: Math.cos(angle * Math.PI / 180) * 30,
                                  y: Math.sin(angle * Math.PI / 180) * 30,
                                  opacity: 0,
                                  scale: [1, 2.5, 0]
                                }}
                                transition={{
                                  duration: 0.8,
                                  ease: "easeOut"
                                }}
                              />
                            );
                          })}
                          {/* Multiple shockwave rings */}
                          <motion.div
                            className="absolute inset-0 border-2 border-green-400"
                            initial={{ scale: 1, opacity: 0.9 }}
                            animate={{
                              scale: 2.5,
                              opacity: 0
                            }}
                            transition={{
                              duration: 0.8,
                              ease: "easeOut"
                            }}
                          />
                          <motion.div
                            className="absolute inset-0 border-2 border-green-300"
                            initial={{ scale: 1, opacity: 0.7 }}
                            animate={{
                              scale: 2,
                              opacity: 0
                            }}
                            transition={{
                              duration: 0.6,
                              ease: "easeOut",
                              delay: 0.1
                            }}
                          />
                        </>
                      )}
                      
                      {hit.locked ? (
                        <Lock className="w-4 h-4 text-green-500/50" />
                      ) : hit.active ? (
                        <Zap className={`w-4 h-4 ${isWinner ? 'text-white' : 'text-green-400'} ${isWinner || isScanning ? 'animate-pulse' : ''}`} />
                      ) : (
                        <div className="w-2 h-2 border border-green-500/50" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                {criticalHits.slice(4, 8).map((hit, index) => {
                  const globalIndex = 4 + index;
                  const isScanning = cashScannerIndex === globalIndex;
                  const isWinner = cashWinners.includes(globalIndex);
                  
                  return (
                    <motion.div
                      key={hit.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { 
                        opacity: 1, 
                        scale: isWinner ? [1, 1.3, 1] : 1,
                        boxShadow: isWinner 
                          ? ['0 0 0px rgba(34, 197, 94, 0)', '0 0 40px rgba(34, 197, 94, 1)', '0 0 15px rgba(34, 197, 94, 0.6)']
                          : isScanning
                          ? '0 0 20px rgba(34, 197, 94, 0.7)'
                          : '0 0 0px rgba(34, 197, 94, 0)'
                      } : {}}
                      transition={{ 
                        duration: 0.3, 
                        delay: 0.9 + (index * 0.05),
                        scale: { duration: 0.6, repeat: isWinner ? 3 : 0 },
                        boxShadow: { duration: 0.6 }
                      }}
                      className={`
                        aspect-square border-2 flex items-center justify-center relative overflow-visible
                        ${hit.locked 
                          ? 'border-green-500/30 bg-green-950/30' 
                          : isWinner
                            ? 'border-green-400 bg-green-400/50'
                            : isScanning
                            ? 'border-green-400 bg-green-500/30'
                            : hit.active 
                            ? 'border-green-500 bg-green-500/20' 
                            : 'border-green-500/50 bg-black'
                        }
                      `}
                    >
                      {/* Winner burst particles - MORE INTENSE for cash prizes */}
                      {isWinner && (
                        <>
                          {[...Array(12)].map((_, i) => {
                            const angle = (i / 12) * 360;
                            return (
                              <motion.div
                                key={i}
                                className="absolute w-1.5 h-1.5 bg-green-400 rounded-full"
                                style={{
                                  left: '50%',
                                  top: '50%',
                                  filter: 'drop-shadow(0 0 4px rgba(34, 197, 94, 1))'
                                }}
                                initial={{ x: 0, y: 0, opacity: 1 }}
                                animate={{
                                  x: Math.cos(angle * Math.PI / 180) * 30,
                                  y: Math.sin(angle * Math.PI / 180) * 30,
                                  opacity: 0,
                                  scale: [1, 2.5, 0]
                                }}
                                transition={{
                                  duration: 0.8,
                                  ease: "easeOut"
                                }}
                              />
                            );
                          })}
                          {/* Multiple shockwave rings */}
                          <motion.div
                            className="absolute inset-0 border-2 border-green-400"
                            initial={{ scale: 1, opacity: 0.9 }}
                            animate={{
                              scale: 2.5,
                              opacity: 0
                            }}
                            transition={{
                              duration: 0.8,
                              ease: "easeOut"
                            }}
                          />
                          <motion.div
                            className="absolute inset-0 border-2 border-green-300"
                            initial={{ scale: 1, opacity: 0.7 }}
                            animate={{
                              scale: 2,
                              opacity: 0
                            }}
                            transition={{
                              duration: 0.6,
                              ease: "easeOut",
                              delay: 0.1
                            }}
                          />
                        </>
                      )}
                      
                      {hit.locked ? (
                        <Lock className="w-4 h-4 text-green-500/50" />
                      ) : hit.active ? (
                        <Zap className={`w-4 h-4 ${isWinner ? 'text-white' : 'text-green-400'} ${isWinner || isScanning ? 'animate-pulse' : ''}`} />
                      ) : (
                        <div className="w-2 h-2 border border-green-500/50" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="mt-6 pt-4 border-t border-green-500/30">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-green-500/70">CASH PRIZE SLOTS</span>
                  <span className="text-green-400">8 WINNERS</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-green-500/70">PRIZES PER CHARACTER</span>
                  <span className="text-green-400">2 EACH</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-green-500/70">YOUR ODDS INCREASE WITH</span>
                  <span className="text-green-400">EACH SCAN</span>
                </div>
              </div>
            </div>

            {/* AGI Signal Feed - Typewriter */}
            <div className="border-4 border-yellow-500 bg-black p-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-yellow-500/30">
                <h3 className="text-yellow-400 font-mono text-sm tracking-widest">INCOMING AGI SIGNALS</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 animate-pulse" />
                  <span className="text-yellow-400 font-mono text-xs">LIVE FEED</span>
                </div>
              </div>

              {/* Category indicator */}
              <div className="mb-4 flex items-center justify-between">
                <div className="text-xs font-mono text-yellow-500/70">
                  SOURCE CLASSIFICATION
                </div>
                <div className={`text-xs font-mono px-2 py-1 border ${
                  activeAgiQuote.category === 'optimist' 
                    ? 'border-green-500 bg-green-500/10 text-green-400'
                    : activeAgiQuote.category === 'pragmatist'
                    ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
                    : 'border-red-500 bg-red-500/10 text-red-400'
                }`}>
                  {activeAgiQuote.category === 'optimist' && '⚡ OPTIMIST: AGI <2 YEARS'}
                  {activeAgiQuote.category === 'pragmatist' && '⏳ PRAGMATIST: AGI 3-5 YEARS'}
                  {activeAgiQuote.category === 'skeptic' && '⚠️ SKEPTIC: AGI >5 YEARS'}
                </div>
              </div>

              {/* Terminal Display */}
              <div className="bg-black/50 border-2 border-yellow-500/30 p-4 min-h-[200px] font-mono text-sm">
                {/* Header */}
                <div className="mb-3 pb-2 border-b border-yellow-500/20">
                  <div className="text-yellow-400 text-xs mb-1">
                    &gt; SIGNAL SOURCE: {activeAgiQuote.author}
                  </div>
                  <div className="text-yellow-500/60 text-xs">
                    &gt; ROLE: {activeAgiQuote.role}
                  </div>
                </div>

                {/* Typewriter Text */}
                <div className="text-yellow-300/90 leading-relaxed">
                  <span className="text-yellow-500">&gt;&gt;</span> {displayedText}
                  <span className="inline-block w-2 h-4 bg-yellow-400 ml-1 animate-pulse" />
                </div>
              </div>

              {/* Signal Progress */}
              <div className="mt-4 pt-3 border-t border-yellow-500/30">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-yellow-500/70">SIGNAL BUFFER</span>
                  <span className="text-yellow-400">{currentSignalIndex + 1} / {agiSignals.length}</span>
                </div>
                <div className="flex gap-1">
                  {agiSignals.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 flex-1 ${
                        index === currentSignalIndex
                          ? 'bg-yellow-400 animate-pulse'
                          : index < currentSignalIndex
                          ? 'bg-yellow-500/30'
                          : 'bg-yellow-500/10'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 bg-yellow-500/5 border border-yellow-500/20 p-3 rounded">
                <div className="text-xs font-mono text-yellow-400/80 mb-2">SIGNAL CATEGORIES:</div>
                <div className="space-y-1 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500" />
                    <span className="text-green-400">10 Optimists (AGI &lt;2 years)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500" />
                    <span className="text-yellow-400">8 Pragmatists (AGI 3-5 years)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500" />
                    <span className="text-red-400">7 Skeptics (AGI &gt;5 years)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Easy to Play Callout */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { 
                opacity: 1, 
                scale: 1,
                boxShadow: [
                  '0 0 20px rgba(234,179,8,0.4)',
                  '0 0 40px rgba(234,179,8,0.7)',
                  '0 0 20px rgba(234,179,8,0.4)'
                ]
              } : {}}
              transition={{ 
                duration: 0.6,
                delay: 1.4,
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="border-4 border-yellow-500 bg-gradient-to-br from-yellow-500/20 via-yellow-400/10 to-yellow-500/20 p-8 relative overflow-hidden"
              style={{
                boxShadow: '0 0 30px rgba(234,179,8,0.5), inset 0 0 20px rgba(234,179,8,0.1)'
              }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-yellow-300 -translate-x-1 -translate-y-1" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-yellow-300 translate-x-1 -translate-y-1" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-yellow-300 -translate-x-1 translate-y-1" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-yellow-300 translate-x-1 translate-y-1" />
              
              {/* Glowing background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent animate-pulse" />
              
              <div className="relative z-10 text-center">
                {/* Main message */}
                <div className="mb-4">
                  <div className="text-3xl md:text-4xl font-mono font-bold text-yellow-400 mb-2">
                    It's Easy to Play!
                  </div>
                  <div className="text-2xl md:text-3xl font-mono font-bold text-white">
                    Just Scan the Can! 📱
                  </div>
                </div>
                
                {/* Steps */}
                <div className="space-y-3 max-w-md mx-auto">
                  <div className="flex items-center gap-3 bg-black/50 border-2 border-yellow-500/50 p-3 rounded">
                    <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-mono font-bold">
                      1
                    </div>
                    <div className="text-left text-sm font-mono text-yellow-100">
                      <span className="text-yellow-400 font-bold">BUY</span> hydrbrew° at launch
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-black/50 border-2 border-yellow-500/50 p-3 rounded">
                    <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-mono font-bold">
                      2
                    </div>
                    <div className="text-left text-sm font-mono text-yellow-100">
                      <span className="text-yellow-400 font-bold">SCAN</span> QR code on can
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-black/50 border-2 border-yellow-500/50 p-3 rounded">
                    <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-mono font-bold">
                      3
                    </div>
                    <div className="text-left text-sm font-mono text-yellow-100">
                      <span className="text-yellow-400 font-bold">WIN</span> medallion or NFT!
                    </div>
                  </div>
                </div>
                
                {/* Emphasis */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="mt-6 inline-block bg-yellow-500 text-black px-6 py-3 border-4 border-yellow-300"
                >
                  <p className="font-mono text-sm md:text-base font-bold tracking-wider">
                    ⚡ UNLIMITED SCANS = MORE CHANCES TO WIN ⚡
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom status bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="border-4 border-green-500 bg-black p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-green-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 animate-pulse" />
              <span>SYSTEM STATUS: OPERATIONAL</span>
            </div>
            <div>24 TOTAL PRIZES (8 CASH + 16 NFT+VR)</div>
            <div>QUADRANT SYNC: {quadrantSync.toFixed(1)}%</div>
            <div>AGI UPTIME: {agiUptime.toFixed(2)}%</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}