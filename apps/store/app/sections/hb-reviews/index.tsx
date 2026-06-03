import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const SineWaveIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M2 12 L4 8 L6 16 L8 10 L10 14 L12 12" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <motion.path
      d="M12 12 Q14 10 16 12 T20 12 L22 12"
      stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  </svg>
);

const RadarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <motion.circle cx="12" cy="12" r="8" stroke="#22d3ee" strokeWidth="2" fill="none" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
    <motion.circle cx="12" cy="12" r="4" stroke="#22d3ee" strokeWidth="2" fill="none" animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} />
    <circle cx="12" cy="12" r="2" fill="#22d3ee" />
  </svg>
);

const SpinnerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <motion.circle cx="12" cy="12" r="8" stroke="#22d3ee" strokeWidth="2" fill="none" strokeDasharray="50 10" animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
    <circle cx="12" cy="12" r="3" fill="#22d3ee" />
  </svg>
);

const StarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <motion.path
      d="M12 2 L15 9 L22 10 L17 15 L18 22 L12 18 L6 22 L7 15 L2 10 L9 9 Z"
      stroke="#22d3ee" strokeWidth="2" strokeLinejoin="round"
      animate={{ scale: [1, 1.1, 1], fill: ["rgba(34,211,238,0.2)", "rgba(34,211,238,0.4)", "rgba(34,211,238,0.2)"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
  </svg>
);

const benefits = [
  {
    Icon: SineWaveIcon,
    title: "Sustainable Focus",
    description: "4–6 hours of deep work without the cortisol spike. Our L-Theanine ratio eliminates the jitter, sustaining clarity through your longest sprints.",
    metric: "4-6hr",
    metricLabel: "sustained",
  },
  {
    Icon: RadarIcon,
    title: "Smart Energy",
    description: "Stay in flow. Our optimized dose keeps your heart rate stable, preventing the anxiety-cascade triggered by traditional caffeine.",
    metric: "<5 BPM",
    metricLabel: "increase",
  },
  {
    Icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <motion.path d="M2 12 L8 4 L12 8 L16 2 L22 10" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <motion.line x1="2" y1="16" x2="22" y2="16" stroke="#22d3ee" strokeWidth="2" strokeDasharray="2 2" strokeLinecap="round" />
      </svg>
    ),
    title: "Clean Metabolic Exit",
    description: "No sugar crash, no prefrontal fog. Engineered for a gentle return to baseline, protecting your output for the rest of the evening.",
    metric: "Low",
    metricLabel: "sugar",
  },
  {
    Icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <motion.circle cx="12" cy="12" r="8" stroke="#22d3ee" strokeWidth="2" fill="none" strokeDasharray="50 10" animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
        <circle cx="12" cy="12" r="3" fill="#22d3ee" />
      </svg>
    ),
    title: "Premium Hydration Layer",
    description: "Electrolytes + magnesium + alkaline base. Cellular recovery while you focus. Lightness, not heaviness.",
    metric: "255mg",
    metricLabel: "electrolytes",
  },
  {
    Icon: StarIcon,
    title: "The High-Performance Edge",
    description: "Engineered for those who can't afford a 'down' afternoon. Become a +1 you.",
    metric: "+1",
    metricLabel: "optimized",
  },
];

function HbReviews(props: HydrogenComponentProps) {
  const { ...rest } = props;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} {...rest} className="py-24 md:py-32 bg-black relative mt-16">
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="px-4 py-1.5 border border-cyan-500/30 rounded-full text-xs font-mono tracking-wider" style={{ color: "#00FFFF" }}>
              THE BENEFITS
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white">
            Why It Works
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Five measurable outcomes from one precise formula.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div
                className="relative rounded-xl p-6 h-full flex flex-col"
                style={{ backgroundColor: "rgba(10,10,10,0.8)", border: "1px solid rgba(34,211,238,0.15)", backdropFilter: "blur(10px)" }}
              >
                {/* Icon + metric */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: "rgba(34,211,238,0.08)" }}>
                    <benefit.Icon />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-mono font-bold" style={{ color: "#00FFFF", textShadow: "0 0 10px rgba(0,255,255,0.5)" }}>
                      {benefit.metric}
                    </div>
                    <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">{benefit.metricLabel}</div>
                  </div>
                </div>

                <h3 className="text-white font-bold text-lg mb-3">{benefit.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed flex-1">{benefit.description}</p>

                {/* Bottom accent */}
                <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(34,211,238,0.1)" }}>
                  <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(34,211,238,0.1)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(to right, #00FFFF, #06b6d4)" }}
                      initial={{ width: "0%" }}
                      animate={isInView ? { width: "100%" } : {}}
                      transition={{ duration: 1.5, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HbReviews;

export const schema = createSchema({
  type: "hb-reviews",
  title: "HB Benefits",
  settings: [],
  presets: {},
});
