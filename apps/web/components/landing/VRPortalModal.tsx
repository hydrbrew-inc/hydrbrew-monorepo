import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

interface VRPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VRPortalModal({ isOpen, onClose }: VRPortalModalProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Terminal loading animation
  useEffect(() => {
    if (isOpen && !isLoaded) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsLoaded(true);
            return 100;
          }
          return prev + 2;
        });
      }, 30);

      return () => clearInterval(interval);
    }
  }, [isOpen, isLoaded]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setLoadingProgress(0);
      setIsLoaded(false);
    }
  }, [isOpen]);

  // ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:h-[80vh] z-[10000]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-full bg-black border border-cyan-500/30 rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden">
              {/* Animated border glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-xl blur opacity-75 animate-pulse" />
              
              {/* Content */}
              <div className="relative h-full flex flex-col bg-black rounded-xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-neutral-950/50 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Zap className="w-5 h-5 text-cyan-400" />
                      <div className="absolute inset-0 animate-ping">
                        <Zap className="w-5 h-5 text-cyan-400 opacity-75" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-mono text-cyan-400 tracking-wider">
                        ⚠️ DIMENSIONAL BREACH DETECTED
                      </h3>
                      <p className="text-xs text-neutral-500 font-mono">
                        HYDRACORE SECTOR 7 - QUANTUM RECONSTRUCTION ZONE
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-cyan-500/50 flex items-center justify-center transition-colors group"
                  >
                    <X className="w-4 h-4 text-neutral-400 group-hover:text-cyan-400" />
                  </button>
                </div>

                {/* Loading Animation */}
                {!isLoaded && (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 gap-6">
                    <div className="w-full max-w-md">
                      <div className="mb-3 font-mono text-xs text-cyan-400/60 flex items-center justify-between">
                        <span>INITIALIZING PORTAL...</span>
                        <span>{loadingProgress}%</span>
                      </div>
                      <div className="h-2 bg-neutral-900 rounded-full overflow-hidden border border-cyan-500/20">
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 relative"
                          style={{ width: `${loadingProgress}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Terminal log */}
                    <div className="w-full max-w-md bg-neutral-950 border border-cyan-500/20 rounded-lg p-4 font-mono text-xs text-cyan-400/80 space-y-1">
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-500">{'>'}</span>
                        <span>Accessing HydraCore mainframe...</span>
                      </div>
                      {loadingProgress > 20 && (
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }}
                          className="flex items-start gap-2"
                        >
                          <span className="text-cyan-500">{'>'}</span>
                          <span>Decrypting Sector 7 coordinates...</span>
                        </motion.div>
                      )}
                      {loadingProgress > 40 && (
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }}
                          className="flex items-start gap-2"
                        >
                          <span className="text-cyan-500">{'>'}</span>
                          <span>Quantum entanglement verified...</span>
                        </motion.div>
                      )}
                      {loadingProgress > 60 && (
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }}
                          className="flex items-start gap-2"
                        >
                          <span className="text-cyan-500">{'>'}</span>
                          <span>Establishing dimensional bridge...</span>
                        </motion.div>
                      )}
                      {loadingProgress > 80 && (
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }}
                          className="flex items-start gap-2 text-emerald-400"
                        >
                          <span className="text-emerald-500">✓</span>
                          <span>Portal breach successful. Welcome, Operative.</span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}

                {/* VR World Content */}
                {isLoaded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 flex flex-col"
                  >
                    {/* Lore Message */}
                    <div className="px-6 py-4 bg-gradient-to-r from-purple-950/30 to-cyan-950/30 border-b border-cyan-500/20">
                      <p className="text-sm text-cyan-100/90 leading-relaxed">
                        <span className="text-cyan-400 font-mono">[CLASSIFIED]</span> You've breached the perimeter. 
                        Sector 7 is undergoing quantum reconstruction. The HydraCore Base extends beyond conventional reality. 
                        <span className="text-purple-400"> Proceed with caution.</span>
                      </p>
                    </div>

                    {/* VR World Preview */}
                    <div className="flex-1 relative bg-neutral-950 group cursor-pointer">
                      <a
                        href="https://marble.worldlabs.ai/worldvr/8bb2a9cb-8374-4b4b-aba6-a84bd5342470"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full relative overflow-hidden"
                      >
                        {/* Preview Image with gradient overlay */}
                        <div className="absolute inset-0">
                          <img
                            src="https://images.unsplash.com/photo-1637577309263-ea2e5128880a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBmdXR1cmlzdGljJTIwcG9ydGFsJTIwdm9ydGV4fGVufDF8fHx8MTc3MTUyOTk5OHww&ixlib=rb-4.1.0&q=80&w=1080"
                            alt="Sector 7 Portal Preview"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          {/* Dark overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                          
                          {/* Cyan glow overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-cyan-500/20 group-hover:via-purple-500/10 group-hover:to-cyan-500/20 transition-all duration-500" />
                        </div>

                        {/* Scanline effect */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6, 182, 212, 0.1) 2px, rgba(6, 182, 212, 0.1) 4px)'
                        }} />

                        {/* Center content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
                          {/* Pulsing portal icon */}
                          <div className="relative">
                            <div className="absolute inset-0 animate-ping">
                              <div className="w-24 h-24 rounded-full border-2 border-cyan-400/50" />
                            </div>
                            <div className="relative w-24 h-24 rounded-full border-2 border-cyan-500 bg-cyan-500/10 backdrop-blur-sm flex items-center justify-center">
                              <div className="w-16 h-16 rounded-full border-2 border-purple-500 bg-purple-500/10 flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 animate-pulse" />
                              </div>
                            </div>
                          </div>

                          {/* Text */}
                          <div className="text-center space-y-2">
                            <h4 className="text-2xl font-bold text-cyan-400 font-mono tracking-wider">
                              SECTOR 7
                            </h4>
                            <p className="text-sm text-purple-300/80 max-w-md">
                              Quantum Reconstruction Zone - Active
                            </p>
                          </div>

                          {/* CTA Button */}
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-4"
                          >
                            <div className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] transition-shadow">
                              <div className="flex items-center gap-3">
                                <span className="text-black font-bold text-lg">ENTER VR PORTAL</span>
                                <ExternalLink className="w-5 h-5 text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                              </div>
                              <div className="text-xs text-black/70 font-mono text-center mt-1">
                                Opens in new dimension
                              </div>
                            </div>
                          </motion.div>

                          {/* Warning label */}
                          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-black/80 border border-red-500/30 rounded-lg backdrop-blur-sm">
                            <div className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                            </div>
                            <span className="text-xs text-red-400/90 font-mono">RESTRICTED ACCESS - OPERATIVES ONLY</span>
                          </div>
                        </div>

                        {/* Overlay corners for cyberpunk aesthetic */}
                        <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-cyan-500/50 pointer-events-none" />
                        <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-cyan-500/50 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-cyan-500/50 pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-cyan-500/50 pointer-events-none" />
                      </a>
                    </div>

                    {/* Footer info bar */}
                    <div className="px-6 py-3 bg-neutral-950/80 backdrop-blur-sm border-t border-cyan-500/20 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                        <div className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </div>
                        <span>RECONSTRUCTION ACTIVE</span>
                      </div>
                      
                      <div className="text-xs text-cyan-400/60 font-mono">
                        POWERED BY MARBLE VR
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}