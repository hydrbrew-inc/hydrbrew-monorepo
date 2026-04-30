import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import {
  getEmailDomain,
  scrollToSection,
  showSignupToast,
  submitSignup,
  trackSignupEvent,
} from './signupFlow';

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero (roughly 100vh)
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await submitSignup({
      email,
      signupSource: 'floating_nav',
    });

    if (result.ok && result.profile) {
      trackSignupEvent('waitlist_join_success', {
        source: 'floating_nav',
        status: result.status,
        emailDomain: getEmailDomain(email),
      });
      showSignupToast({
        variant: 'success',
        message: `You're in, operative ${result.profile.operativeNumber}. Check your inbox.`,
      });
      setSubmitted(true);
      setEmail('');
      setTimeout(() => scrollToSection('manifesto'), 300);
      setTimeout(() => setSubmitted(false), 3000);
    } else {
      trackSignupEvent('waitlist_join_failed', {
        source: 'floating_nav',
        status: result.status,
        reason: result.error ?? 'upstream_rejected',
        emailDomain: getEmailDomain(email),
      });
      showSignupToast({
        variant: 'error',
        message:
          result.status === 0
            ? 'Network issue. Please try again in a moment.'
            : 'Join failed. Please try again.',
      });
    }

    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-neutral-900"
        >
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Logo */}
              <div className="text-xl">
                <span className="text-white">hydr</span>
                <span className="text-cyan-400">brew°</span>
              </div>

              {/* Quick signup */}
              <form onSubmit={handleSubmit} className="hidden md:flex items-center gap-2">
                {submitted ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/50 rounded-lg">
                    <span className="text-cyan-400 text-sm font-mono">✓ YOU'RE IN. CHECK INBOX.</span>
                  </div>
                ) : (
                  <>
                    <input
                      type="email"
                      placeholder="your.email@protocol.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-neutral-900/50 border border-neutral-800 rounded-lg text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all w-64 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="hidden md:flex px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg items-center gap-2 transition-colors text-sm font-mono whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'JOINING...' : 'JOIN'}
                      {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                    </motion.button>
                  </>
                )}
              </form>

              {/* Mobile CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="md:hidden px-4 py-2 bg-cyan-500 text-black rounded-lg text-sm font-mono"
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              >
                JOIN WAITLIST
              </motion.button>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}