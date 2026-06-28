import { motion } from "motion/react";
import { Twitter, Instagram, Youtube } from "lucide-react";
import { useState, useEffect } from "react";
import { VRPortalModal } from "./VRPortalModal";

export function Footer() {
  const [showGlitch, setShowGlitch] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

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
    <footer className="bg-black border-t border-neutral-900 py-12 relative z-30">
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
              textShadow: "0 0 10px rgba(239, 68, 68, 0.5)",
              filter: "contrast(1.2) brightness(1.1)",
            }}
          >
            <span className="inline-block animate-pulse">⚠️</span>
            <span className="mx-1.5">DIMENSIONAL ANOMALY DETECTED</span>
            <span className="text-red-500/60">SECTOR 7</span>
          </motion.button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 relative z-0">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div
              className="text-2xl mb-2"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 500,
              }}
            >
              <span style={{ color: "#00FFFF" }}>hydr</span>
              <span className="text-white">brew°</span>
            </div>
            <p className="text-sm text-neutral-500 font-mono">
              Optimized Human Protocol
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <motion.a
              href="https://x.com/hydrbrew"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center transition-colors"
              aria-label="Twitter"
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(0, 255, 255, 0.5)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgb(38, 38, 38)")
              }
            >
              <Twitter
                className="w-5 h-5 text-neutral-400 transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00FFFF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/tryhydrbrew/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center transition-colors"
              aria-label="Instagram"
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(0, 255, 255, 0.5)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgb(38, 38, 38)")
              }
            >
              <Instagram
                className="w-5 h-5 text-neutral-400 transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00FFFF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              />
            </motion.a>
            <motion.a
              href="https://www.youtube.com/@hydrbrew"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center transition-colors"
              aria-label="YouTube"
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(0, 255, 255, 0.5)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgb(38, 38, 38)")
              }
            >
              <Youtube
                className="w-5 h-5 text-neutral-400 transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00FFFF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              />
            </motion.a>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a
              href="/signup"
              className="text-neutral-400 transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00FFFF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
            >
              Sign-Up
            </a>
            <a
              href="/protocol"
              className="text-neutral-400 transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00FFFF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
            >
              Caffeine Audit
            </a>
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="text-neutral-400 transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00FFFF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
            >
              Privacy
            </button>
            <button
              onClick={() => setIsTermsOpen(true)}
              className="text-neutral-400 transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00FFFF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
            >
              Terms
            </button>
            <a
              href="mailto:optimizedhuman@hydrbrew.com"
              className="text-neutral-400 transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00FFFF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
            >
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-900 text-center">
          <p className="text-xs text-neutral-600 font-mono">
            © 2026 Hydrbrew, Inc. Engineered in Leucadia, CA.
            <br className="md:hidden" />
            <span className="md:ml-2">All rights reserved.</span>
          </p>
        </div>
      </div>

      {/* VR Portal Modal */}
      <VRPortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
      />

      {/* Privacy Protocol Modal */}
      {isPrivacyOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsPrivacyOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative bg-neutral-900 border-2 border-cyan-500/30 rounded-xl max-w-3xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-cyan-500/20 p-6">
              <div className="flex items-center justify-between">
                <h2
                  className="text-2xl font-bold uppercase tracking-wider"
                  style={{
                    fontFamily: "Space Grotesk, system-ui, sans-serif",
                    letterSpacing: "2px",
                    color: "#00FFFF",
                  }}
                >
                  hydrbrew° PRIVACY PROTOCOL
                </h2>
                <button
                  onClick={() => setIsPrivacyOpen(false)}
                  className="text-neutral-400 hover:text-cyan-400 transition-colors"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)] space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-3">
                  1. DATA ACQUISITION (THE INPUT)
                </h3>
                <p className="text-neutral-300 leading-relaxed mb-3">
                  To initialize your position in the hydrbrew° protocol, we
                  collect specific telemetry:
                </p>
                <ul className="list-disc list-inside space-y-2 text-neutral-400 ml-4">
                  <li>
                    <strong className="text-white">Identity Data:</strong> Name
                    and email address provided during waitlist signup.
                  </li>
                  <li>
                    <strong className="text-white">Biometric Intent:</strong>{" "}
                    Optional data regarding Oura Ring usage for those opting
                    into the Field Testing cohort.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3">
                  2. PROTOCOL UTILIZATION (THE PROCESS)
                </h3>
                <p className="text-neutral-300 leading-relaxed mb-3">
                  Your data is utilized strictly for mission-critical
                  operations:
                </p>
                <ul className="list-disc list-inside space-y-2 text-neutral-400 ml-4">
                  <li>Securing your position in the product queue.</li>
                  <li>
                    Distributing Multiplier Rewards and referral discounts.
                  </li>
                  <li>Transmitting Neural Briefings and launch updates.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3">
                  3. TRANSMISSION & SECURITY
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  We do not arbitrage your personal data to third-party legacy
                  entities. Data is encrypted and stored using industry-standard
                  security stacks to ensure your digital baseline remains
                  uncompromised.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3">
                  4. THIRD-PARTY INTEGRATIONS
                </h3>
                <p className="text-neutral-300 leading-relaxed mb-3">
                  The hydrbrew° ecosystem utilizes high-performance tools to
                  manage the stack:
                </p>
                <ul className="list-disc list-inside space-y-2 text-neutral-400 ml-4">
                  <li>
                    <strong className="text-white">Viral Loops:</strong> For
                    referral tracking and multiplier awards.
                  </li>
                  <li>
                    <strong className="text-white">Oura:</strong> Biometric data
                    is accessed only with explicit user authorization during
                    beta testing. We do not use Oura data for commercial
                    purposes or third-party data arbitrage.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3">
                  5. DATA EXTRACTION (YOUR RIGHTS)
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  At any point, an Operative may request a "Clean Metabolic
                  Exit" from our database. You may request to view, edit, or
                  purge your data from the protocol by contacting{" "}
                  <a
                    href="mailto:support@hydrbrew.com"
                    className="text-cyan-400 hover:text-cyan-300 underline"
                  >
                    support@hydrbrew.com
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border-t border-cyan-500/20 p-4">
              <button
                onClick={() => setIsPrivacyOpen(false)}
                className="w-full px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 rounded text-cyan-400 font-mono text-sm transition-all"
              >
                [CLOSE]
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {isTermsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsTermsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative bg-neutral-900 border-2 border-cyan-500/30 rounded-xl max-w-3xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-cyan-500/20 p-6">
              <div className="flex items-center justify-between">
                <h2
                  className="text-2xl font-bold uppercase tracking-wider"
                  style={{
                    fontFamily: "Space Grotesk, system-ui, sans-serif",
                    letterSpacing: "2px",
                    color: "#00FFFF",
                  }}
                >
                  HYDRBREW, INC. TERMS OF SERVICE
                </h2>
                <button
                  onClick={() => setIsTermsOpen(false)}
                  className="text-neutral-400 hover:text-cyan-400 transition-colors"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)] space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-3">
                  1. THE BINDING PROTOCOL
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  By accessing hydrbrew.com (the "Site"), you are entering a
                  legally binding agreement with Hydrbrew, Inc. ("the Company").
                  If you do not agree to these terms, you are prohibited from
                  utilizing the protocol and must terminate your session
                  immediately.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3">
                  2. INTELLECTUAL PROPERTY & OWNERSHIP
                </h3>
                <p className="text-neutral-300 leading-relaxed mb-3">
                  All digital and physical assets, including but not limited to
                  the hydrbrew° logo, the "Afternoon Antidote" trademark, the
                  "Quadrant Series" NFT artwork, the HydrCore Base lore, and all
                  underlying code/algorithms, are the exclusive property of
                  Hydrbrew, Inc.
                </p>
                <ul className="list-disc list-inside space-y-2 text-neutral-400 ml-4">
                  <li>
                    <strong className="text-white">License:</strong> Users are
                    granted a limited, non-transferable license to view the
                    site.
                  </li>
                  <li>
                    <strong className="text-white">Restrictions:</strong> You
                    may not scrape, mirror, reverse-engineer, or redistribute
                    any "Mission Intel" or proprietary assets without express
                    written authorization from the Founder.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3">
                  3. DIGITAL ASSETS & NFTS
                </h3>
                <p className="text-neutral-300 leading-relaxed mb-3">
                  Participation in the Quadrant Series 1 distribution is subject
                  to protocol availability.
                </p>
                <ul className="list-disc list-inside space-y-2 text-neutral-400 ml-4">
                  <li>
                    <strong className="text-white">No Financial Advice:</strong>{" "}
                    NFTs issued by Hydrbrew, Inc. are digital collectibles and
                    "Archetype Identities." They are not intended as investment
                    vehicles.
                  </li>
                  <li>
                    <strong className="text-white">Ownership Transfer:</strong>{" "}
                    While users may hold the NFT in a private wallet, the
                    underlying IP and brand rights remain with Hydrbrew, Inc.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3">
                  4. BIOMETRIC & BETA TESTING (OURA)
                </h3>
                <p className="text-neutral-300 leading-relaxed mb-3">
                  Participation in the Field Testing cohort (Oura integration)
                  is voluntary.
                </p>
                <ul className="list-disc list-inside space-y-2 text-neutral-400 ml-4">
                  <li>
                    <strong className="text-white">Non-Commercial Data:</strong>{" "}
                    Hydrbrew, Inc. does not sell your health telemetry. Data is
                    used strictly for hardware-validated performance tracking.
                  </li>
                  <li>
                    <strong className="text-white">Assumption of Risk:</strong>{" "}
                    Users acknowledge that beta features are experimental.
                    Hydrbrew, Inc. is not liable for data inaccuracies or
                    hardware malfunctions.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3">
                  5. PERFORMANCE & HEALTH DISCLAIMER
                </h3>
                <p className="text-neutral-300 leading-relaxed mb-3">
                  hydrbrew° is a performance beverage engineered for "Biological
                  Arbitrage."
                </p>
                <p className="text-neutral-300 leading-relaxed mb-3">
                  These statements have not been evaluated by the Food and Drug
                  Administration.
                </p>
                <p className="text-neutral-300 leading-relaxed mb-3">
                  Our products are not intended to diagnose, treat, cure, or
                  prevent any disease.
                </p>
                <p className="text-neutral-300 leading-relaxed">
                  Operatives are encouraged to consult their own medical
                  baseline before introducing new cognitive stacks (Caffeine +
                  L-Theanine + Lion's Mane).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3">
                  6. TERMINATION (PROTOCOL REVOCATION)
                </h3>
                <p className="text-neutral-300 leading-relaxed mb-3">
                  Hydrbrew, Inc. reserves the right to revoke access, cancel
                  waitlist positions, or nullify "Multiplier Rewards" for any
                  user engaged in:
                </p>
                <ul className="list-disc list-inside space-y-2 text-neutral-400 ml-4">
                  <li>Sybil attacks (creating fake accounts for referrals).</li>
                  <li>Harassment of other Operatives.</li>
                  <li>
                    Any activity that compromises the integrity of the HydrCore
                    ecosystem.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3">
                  7. GOVERNING LAW
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  This protocol is governed by the laws of the State of
                  California. Any disputes shall be settled in the jurisdiction
                  of San Diego County.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border-t border-cyan-500/20 p-4">
              <button
                onClick={() => setIsTermsOpen(false)}
                className="w-full px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 rounded text-cyan-400 font-mono text-sm transition-all"
              >
                [CLOSE]
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </footer>
  );
}
