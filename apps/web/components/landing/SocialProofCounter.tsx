import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { Users, TrendingUp, Zap, Eye } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

export function SocialProofCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);
  const targetCount = 3847; // Mock waitlist count
  const [liveVisitors, setLiveVisitors] = useState(247);
  const [progressWidth, setProgressWidth] = useState(62.35);
  const [claimedCount, setClaimedCount] = useState(1247);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = targetCount / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetCount) {
        setCount(targetCount);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView]);

  // Live visitors fluctuation
  useEffect(() => {
    const visitorInterval = setInterval(() => {
      setLiveVisitors(prev => {
        const change = Math.floor(Math.random() * 10) - 4; // -4 to +5 range
        const newValue = prev + change;
        return Math.max(220, Math.min(280, newValue)); // Keep between 220-280
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(visitorInterval);
  }, []);

  // Progress bar continuous loading
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgressWidth(prev => {
        const newWidth = prev + 0.05; // Slow incremental growth
        if (newWidth >= 65) return 62.35; // Reset to base
        return newWidth;
      });
      
      // Occasionally increment claimed count
      if (Math.random() > 0.7) {
        setClaimedCount(prev => Math.min(1999, prev + 1));
      }
    }, 2000); // Update every 2 seconds

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <section ref={ref} className="py-8 md:py-12 bg-black relative overflow-hidden">
      {/* Animated grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* All content removed - Testimonials moved to FinalCTA.tsx */}
      </div>
    </section>
  );
}