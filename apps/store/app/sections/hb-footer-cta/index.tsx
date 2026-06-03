import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { useFetcher } from "react-router";

interface HbFooterCtaProps extends HydrogenComponentProps {
  founderBgImage?: string;
  founder1Image?: string;
  founder2Image?: string;
}

function HbFooterCta(props: HbFooterCtaProps) {
  const {
    founderBgImage = "/images/opC81Wx.webp",
    founder1Image = "/images/E8Ar62i.webp",
    founder2Image = "/images/1QM0Ftl.webp",
    ...rest
  } = props;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [primaryEmail, setPrimaryEmail] = useState("");
  const [primaryName, setPrimaryName] = useState("");
  const fetcher = useFetcher<{ ok: boolean; error: string }>();
  const isPrimarySubmitting = fetcher.state === "submitting";
  const submitSuccess = fetcher.data?.ok === true;

  const handleSubmit = () => {
    if (!primaryEmail) return;
    const formData = new FormData();
    formData.set("email", primaryEmail);
    if (primaryName) formData.set("firstName", primaryName);
    fetcher.submit(formData, { action: "/api/klaviyo", method: "POST", encType: "multipart/form-data" });
  };

  return (
    <section ref={ref} {...rest} className="bg-black">
      {/* ── FinalCTA / Claim Position ── */}
      <div className="py-24 md:py-32 relative overflow-hidden">
        {/* Animated cyan glow background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
            style={{ backgroundColor: "rgba(0,255,255,0.04)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-6 px-4 py-1.5 border border-cyan-500/30 rounded-full text-xs font-mono tracking-wider" style={{ color: "#00FFFF" }}>
              TRANSMIT THE SIGNAL
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white font-bold">
              Claim Your Position
            </h2>
            <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Join the founding cohort. Pre-sale pricing locks in on signup.
            </p>
          </motion.div>

          {/* Email capture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            id="protocol-claim-position"
            className="rounded-2xl p-8 md:p-12"
            style={{
              backgroundColor: "rgba(5,7,10,0.95)",
              border: "2px solid rgba(0,255,255,0.2)",
              boxShadow: "0 0 60px rgba(0,255,255,0.08)",
            }}
          >
            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4" style={{ color: "#00FFFF" }}>✓</div>
                <h3 className="text-2xl text-white font-bold mb-2">Access Initialized</h3>
                <p className="text-neutral-400">Check your inbox. Your pre-sale position is confirmed.</p>
              </div>
            ) : (
              <>
                <div className="font-mono mb-6 text-sm" style={{ color: "#00FFFF" }}>
                  // INITIALIZE YOUR POSITION
                </div>
                <div className="flex flex-col gap-3 mb-4">
                  <input
                    type="text"
                    value={primaryName}
                    onChange={(e) => setPrimaryName(e.target.value)}
                    placeholder="First name (optional)"
                    className="w-full px-4 py-3 bg-neutral-900/80 rounded-lg text-white placeholder:text-neutral-600 text-sm"
                    style={{ border: "1px solid rgba(0,255,255,0.2)", outline: "none", fontFamily: "Roboto Mono, monospace" }}
                    onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,255,0.6)")}
                    onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,255,0.2)")}
                  />
                  <div className="flex flex-col md:flex-row gap-3">
                    <input
                      type="email"
                      value={primaryEmail}
                      onChange={(e) => setPrimaryEmail(e.target.value)}
                      placeholder="email@protocol.com"
                      className="flex-1 px-4 py-3 bg-neutral-900/80 rounded-lg text-white placeholder:text-neutral-600 text-sm"
                      style={{ border: "2px solid rgba(0,255,255,0.4)", outline: "none", fontFamily: "Roboto Mono, monospace" }}
                      onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#00FFFF")}
                      onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,255,0.4)")}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    />
                    <motion.button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isPrimarySubmitting}
                      className="px-8 py-3 text-black font-mono font-bold rounded-lg"
                      style={{ backgroundColor: "#00FFFF", boxShadow: "0 0 20px rgba(0,255,255,0.4)" }}
                      whileHover={{ scale: isPrimarySubmitting ? 1 : 1.02, backgroundColor: "#00CCCC" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isPrimarySubmitting ? "SUBMITTING..." : "INITIALIZE →"}
                    </motion.button>
                  </div>
                </div>
                <p className="text-neutral-600 text-xs font-mono">No spam. Unsubscribe at any time. Pre-sale discount applied automatically.</p>
              </>
            )}
          </motion.div>

          {/* Testimonials strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              { quote: "Finally a coffee that doesn't wreck my sleep.", name: "Alex M.", tag: "Software Engineer" },
              { quote: "The 2pm window used to destroy me. Not anymore.", name: "Jordan K.", tag: "Founder" },
              { quote: "Same ritual. Zero crash. Actually works.", name: "Sam R.", tag: "Creative Director" },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="rounded-xl p-5"
                style={{ backgroundColor: "rgba(10,10,10,0.8)", border: "1px solid rgba(0,255,255,0.1)" }}
              >
                <p className="text-neutral-300 text-sm mb-4 leading-relaxed">"{t.quote}"</p>
                <div>
                  <div className="text-white text-sm font-medium">{t.name}</div>
                  <div className="text-neutral-500 text-xs">{t.tag}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── FounderClosing ── */}
      <div className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40 md:from-black/70 md:via-black/50 md:to-black/70" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center md:bg-fixed" style={{ backgroundImage: `url(${founderBgImage})`, opacity: 0.5 }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 blur-[120px] rounded-full" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full" />

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Terminal header */}
            <div className="mb-8 md:mb-12">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: "auto" } : {}}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="inline-block overflow-hidden"
              >
                <div className="flex items-center gap-2 bg-black/80 px-4 py-2 rounded font-mono text-xs md:text-sm" style={{ border: "1px solid #00FFFF" }}>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <span style={{ color: "#00FFFF" }}>BRIEFING_CONCLUDED.TXT</span>
                </div>
              </motion.div>
            </div>

            {/* Main content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
            >
              <div className="relative bg-black/50 backdrop-blur-md rounded-lg overflow-hidden" style={{ border: "2px solid #00FFFF" }}>
                <div className="h-px" style={{ backgroundColor: "#00FFFF" }} />
                <div className="p-6 md:p-8">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mb-6"
                  >
                    <p className="text-base md:text-lg leading-relaxed text-neutral-300 mb-3">
                      <span className="font-mono" style={{ color: "#00FFFF" }}>Briefing concluded.</span>{" "}
                      Thanks for visiting{" "}
                      <span style={{ color: "#00FFFF" }}>hydr</span><span className="text-white">brew°</span>.
                      You've breached the perimeter of the{" "}
                      <span style={{ color: "#00FFFF" }}>+1 Human experience</span>.
                      It's time to move into the high-fidelity reality of{" "}
                      <span className="text-white font-medium">total optimization</span>. The{" "}
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-xs" style={{ background: "linear-gradient(to right, rgba(0,255,255,0.2), rgba(0,255,255,0.2))", border: "1px solid rgba(0,255,255,0.3)", color: "#00FFFF" }}>
                        +1 You
                      </span>.
                    </p>
                    <p className="text-base md:text-lg leading-relaxed text-neutral-300 mb-3">
                      Don't just watch the future—<span className="text-red-400 font-medium">arbitrage it</span>.
                    </p>
                    <p className="text-base md:text-lg leading-relaxed text-neutral-300">
                      <span style={{ color: "#00FFFF" }}>Stay sharp. Stay optimized.</span>
                    </p>
                  </motion.div>

                  {/* Founders */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-6 justify-items-center"
                  >
                    {[
                      { image: founder1Image, name: "Louis Caverly", title: "Co-Founder & CEO" },
                      { image: founder2Image, name: "Alexander Nygaard", title: "Co-Founder & CTO" },
                    ].map((founder, i) => (
                      <div key={i} className="flex flex-col items-center gap-4">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.6, delay: 1.4 + i * 0.1 }}
                          className="relative"
                        >
                          <motion.div
                            className="absolute -inset-3 rounded-full blur-xl"
                            style={{ backgroundColor: "rgba(0,255,255,0.2)" }}
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <div
                            className="relative w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden bg-neutral-900/50"
                            style={{ border: "2px solid rgba(0,255,255,0.5)" }}
                          >
                            <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
                            {/* Scan overlay */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
                              animate={{ y: ["-100%", "200%"] }}
                              transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                            />
                          </div>
                        </motion.div>
                        <div className="text-center">
                          <div className="text-white font-bold">{founder.name}</div>
                          <div className="text-cyan-400 text-sm font-mono">{founder.title}</div>
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  {/* Bottom accent */}
                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(0,255,255,0.2)" }}>
                    <motion.div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#00FFFF" }}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="font-mono text-xs" style={{ color: "rgba(0,255,255,0.6)" }}>
                      hydrbrew° — The Afternoon Protocol // {new Date().getFullYear()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HbFooterCta;

export const schema = createSchema({
  type: "hb-footer-cta",
  title: "HB Footer CTA",
  settings: [
    {
      group: "Images",
      inputs: [
        { type: "image", name: "founderBgImage", label: "Background image" },
        { type: "image", name: "founder1Image", label: "Founder 1 image" },
        { type: "image", name: "founder2Image", label: "Founder 2 image" },
      ],
    },
  ],
  presets: {},
});
