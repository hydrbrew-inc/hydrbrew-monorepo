import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import {
  getEmailDomain,
  scrollToSection,
  showSignupToast,
  submitSignup,
  trackSignupEvent,
} from './signupFlow';

interface EmailCaptureFormProps {
  variant?: 'hero' | 'final' | 'referral';
  className?: string;
  remainingCount?: number;
  source?: string;
}

export function EmailCaptureForm({
  variant = 'hero',
  className = '',
  remainingCount = 1000,
  source,
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate pulse speed based on remaining count (faster as it gets lower)
  // When remainingCount is 1000, duration is ~3s; when it's 100, duration is ~0.8s
  const pulseDuration = Math.max(0.6, (remainingCount / 1000) * 3);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const sourceByVariant = {
      hero: 'video_showcase_capture',
      final: 'final_cta',
      referral: 'referral_capture',
    } as const;
    const signupSource = source ?? sourceByVariant[variant];

    const result = await submitSignup({
      email,
      ...(name && { firstName: name }),
      signupSource,
    });

    if (result.ok && result.profile) {
      trackSignupEvent('waitlist_join_success', {
        source: signupSource,
        status: result.status,
        emailDomain: getEmailDomain(email),
      });
      showSignupToast({
        variant: 'success',
        message: `You're in, operative ${result.profile.operativeNumber}. Check your inbox.`,
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      if (variant === 'hero') {
        setTimeout(() => scrollToSection('product'), 300);
      } else if (variant === 'final') {
        setTimeout(() => scrollToSection('manifesto'), 300);
      }
      setEmail('');
      setName('');
    } else {
      trackSignupEvent('waitlist_join_failed', {
        source: signupSource,
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

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-cyan-500/10 border border-cyan-500/50 ${className}`}
      >
        <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">
          <Check className="w-5 h-5 text-black" />
        </div>
        <div>
          <p className="text-cyan-400 font-mono text-sm">POSITION SECURED</p>
          <p className="text-neutral-400 text-xs">Check your inbox for NFT access</p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className={variant === 'final' ? 'flex flex-col gap-3' : 'flex flex-col sm:flex-row gap-3'}>
        <div className={variant === 'final' ? 'flex flex-col sm:flex-row gap-3' : 'contents'}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <input
            type="email"
            placeholder="your.email@protocol.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className={`${
            variant === 'final'
              ? 'w-full px-8 py-4 md:py-5'
              : 'w-full sm:w-auto px-8 py-3.5'
          } relative bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg transition-colors group overflow-hidden flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          {/* Animated pulsing border that speeds up as count drops */}
          <motion.div
            className="absolute inset-0 rounded-lg"
            style={{
              border: '2px solid rgba(34, 211, 238, 0.6)',
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.4), inset 0 0 20px rgba(34, 211, 238, 0.2)'
            }}
            animate={{
              opacity: [0.4, 1, 0.4],
              boxShadow: [
                '0 0 10px rgba(34, 211, 238, 0.3), inset 0 0 10px rgba(34, 211, 238, 0.1)',
                '0 0 30px rgba(34, 211, 238, 0.8), inset 0 0 30px rgba(34, 211, 238, 0.4)',
                '0 0 10px rgba(34, 211, 238, 0.3), inset 0 0 10px rgba(34, 211, 238, 0.1)'
              ]
            }}
            transition={{
              duration: pulseDuration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Corner scan lines */}
          {[0, 1, 2, 3].map((corner) => (
            <motion.div
              key={corner}
              className="absolute w-6 h-6"
              style={{
                top: corner < 2 ? 0 : 'auto',
                bottom: corner >= 2 ? 0 : 'auto',
                left: corner % 2 === 0 ? 0 : 'auto',
                right: corner % 2 === 1 ? 0 : 'auto',
                borderTop: corner < 2 ? '2px solid rgba(34, 211, 238, 0.9)' : 'none',
                borderBottom: corner >= 2 ? '2px solid rgba(34, 211, 238, 0.9)' : 'none',
                borderLeft: corner % 2 === 0 ? '2px solid rgba(34, 211, 238, 0.9)' : 'none',
                borderRight: corner % 2 === 1 ? '2px solid rgba(34, 211, 238, 0.9)' : 'none',
              }}
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: pulseDuration * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: corner * (pulseDuration / 8)
              }}
            />
          ))}

          <div className="relative z-10 flex items-center justify-center gap-2 w-full">
            <span className={`font-mono tracking-wide ${variant === 'final' ? 'text-base md:text-lg font-bold' : 'text-sm'}`}>
              {isSubmitting ? 'SUBMITTING...' : (variant === 'final' ? 'MINT YOUR ASSET' : 'JOIN WAITLIST')}
            </span>
            {!isSubmitting && (
              <ArrowRight className={`${variant === 'final' ? 'w-4 h-4' : 'w-4 h-4'} group-hover:translate-x-1 transition-transform`} />
            )}
          </div>
        </motion.button>
      </div>
      {variant === 'hero' && (
        <p className="mt-3 text-xs text-neutral-500 text-center sm:text-left">
          Early access + NFT identity + free drop. Zero spam protocol.
        </p>
      )}
    </form>
  );
}