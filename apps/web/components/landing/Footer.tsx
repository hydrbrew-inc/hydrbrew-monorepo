import { motion } from 'motion/react';
import { Twitter, Instagram, Youtube } from 'lucide-react';
import { useState, useEffect } from 'react';
import { siteConfig } from '@repo/lib/site-config';
import { Container } from '@repo/ui/container';
import { VRPortalModal } from './VRPortalModal';

export function Footer() {
  const [showGlitch, setShowGlitch] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  // Random glitch effect (every 45-60 seconds)
  useEffect(() => {
    const triggerGlitch = () => {
      setShowGlitch(true);
      setTimeout(() => setShowGlitch(false), 3000); // Show for 3 seconds
      
      // Schedule next glitch (random interval between 45-60 seconds)
      const nextGlitch = 45000 + Math.random() * 15000;
      setTimeout(triggerGlitch, nextGlitch);
    };

    // Initial delay before first glitch (30-40 seconds)
    const initialDelay = 30000 + Math.random() * 10000;
    const timeout = setTimeout(triggerGlitch, initialDelay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <footer className="bg-black border-t border-neutral-900 py-12 relative">
      {/* Hidden Glitch Easter Egg */}
      {showGlitch && (
        <div className="absolute top-4 left-4 z-10">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: [0, 1, 0.5, 1, 0], x: [-10, 0, 2, -2, 0] }}
            transition={{ duration: 0.4, repeat: 3 }}
            onClick={() => setIsPortalOpen(true)}
            className="group px-3 py-1.5 bg-red-500/10 border border-red-500/30 hover:border-red-500/60 rounded text-xs font-mono text-red-400 hover:text-red-300 transition-all"
            style={{
              textShadow: '0 0 10px rgba(239, 68, 68, 0.5)',
              filter: 'contrast(1.2) brightness(1.1)'
            }}
          >
            <span className="inline-block animate-pulse">⚠️</span>
            <span className="mx-1.5">DIMENSIONAL ANOMALY DETECTED</span>
            <span className="text-red-500/60">SECTOR 7</span>
          </motion.button>
        </div>
      )}

      <Container className="relative z-0">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="text-2xl mb-2">
              <span className="text-white">{siteConfig.wordmarkLead}</span>
              <span className="text-cyan-400">{siteConfig.wordmarkAccent}</span>
            </div>
            <p className="text-sm text-neutral-500 font-mono">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <motion.a
              href="https://x.com/hydrbrew"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 hover:border-cyan-500/50 flex items-center justify-center transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-neutral-400 hover:text-cyan-400" />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/tryhydrbrew/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 hover:border-cyan-500/50 flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-neutral-400 hover:text-cyan-400" />
            </motion.a>
            <motion.a
              href="https://www.youtube.com/@hydrbrew"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 hover:border-cyan-500/50 flex items-center justify-center transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5 text-neutral-400 hover:text-cyan-400" />
            </motion.a>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-neutral-400 hover:text-cyan-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-neutral-400 hover:text-cyan-400 transition-colors">
              Terms
            </a>
            <a href="mailto:optimizedhuman@hydrbrew.com" className="text-neutral-400 hover:text-cyan-400 transition-colors">
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-900 text-center">
          <p className="text-xs text-neutral-600 font-mono">
            © 2026 {siteConfig.name}, Inc. Engineered in Encinitas, CA. 
            <br className="md:hidden" />
            <span className="md:ml-2">All rights reserved. Become a +1.</span>
          </p>
        </div>
      </Container>

      {/* VR Portal Modal */}
      <VRPortalModal isOpen={isPortalOpen} onClose={() => setIsPortalOpen(false)} />
    </footer>
  );
}