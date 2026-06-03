import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Activity, Brain, Droplet, Sparkles, Plus, Minus } from "lucide-react";
import { useRef, useState } from "react";

function HbQuiz(props: HydrogenComponentProps) {
  const { ...rest } = props;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleCard = (name: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(name)) {
        newSet.delete(name);
      } else {
        newSet.add(name);
      }
      return newSet;
    });
  };

  const precursors = [
    {
      icon: Brain,
      name: "L-Theanine",
      dose: "200mg",
      role: "Smooth activation",
      description: "Delivers 200mg of high-purity (+95%) L-Theanine, an amino acid that human studies indicate can promote increased alpha brain wave activity linked to relaxed alertness and help modulate responses to daily stressors.",
      category: "ENERGY",
      categoryColor: "orange",
      bgImage: "/images/5oFWKa4.webp",
    },
    {
      icon: Droplet,
      name: "Lion's Mane",
      dose: "200mg",
      role: "Neurogenesis catalyst",
      description: "8:1 Lion's Mane extract—used in studies exploring potential cognitive and mood support in adults.",
      category: "COGNITIVE",
      categoryColor: "purple",
      bgImage: "/images/1QM0Ftl.webp",
    },
    {
      icon: Activity,
      name: "Caffeine",
      dose: "85mg",
      role: "Clean energy substrate",
      description: "85mg Precision-Dosed Coffee Extract: A stabilized caffeine signal engineered to bypass the anxiety-cascade of traditional brews. Optimized for the 2-4PM performance window.",
      category: "ENERGY",
      categoryColor: "orange",
      bgImage: "/images/p4iy3vq.webp",
    },
    {
      icon: Sparkles,
      name: "Hydration Layer",
      dose: "255mg",
      role: "Cellular hydration",
      description: "A balanced matrix of Sodium, Potassium, and Magnesium. Replenishes cellular hydration while you focus. Lightness, not heaviness.",
      category: "HYDRATION",
      categoryColor: "cyan",
      bgImage: "/images/uARXRtG.webp",
    },
  ];

  const categoryStyles: Record<string, { border: string; bg: string; text: string; shadow: string }> = {
    orange: { border: "border-orange-400/60", bg: "bg-orange-400/5", text: "text-orange-200", shadow: "0 0 8px rgba(251, 146, 60, 0.4)" },
    purple: { border: "border-purple-400/60", bg: "bg-purple-400/5", text: "text-purple-200", shadow: "0 0 8px rgba(192, 132, 252, 0.4)" },
    cyan: { border: "border-cyan-400/60", bg: "bg-cyan-400/5", text: "text-cyan-200", shadow: "0 0 8px rgba(34, 211, 238, 0.4)" },
  };

  return (
    <section
      ref={ref}
      {...rest}
      className="py-24 md:py-32 bg-neutral-950 relative overflow-visible"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <div className="px-4 py-1.5 border border-cyan-500/30 rounded-full text-xs font-mono tracking-wider" style={{ color: "#00FFFF" }}>
              THE PRECURSOR MODEL
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white relative z-20">How It Works</h2>
          <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Six clinical-grade compounds. One precise protocol.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {precursors.map((precursor, index) => {
            const isExpanded = expandedCards.has(precursor.name);
            const styles = categoryStyles[precursor.categoryColor];

            return (
              <motion.div
                key={precursor.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-cyan-400/0 group-hover:bg-cyan-400/20 rounded-xl blur-xl transition-all duration-500" />

                <motion.div
                  className="relative rounded-xl p-5 flex flex-col cursor-pointer overflow-hidden min-h-[200px]"
                  onClick={() => toggleCard(precursor.name)}
                  style={{ backgroundColor: "rgba(15, 15, 15, 0.85)", backdropFilter: "blur(10px)" }}
                >
                  {/* Static background image */}
                  <div className="absolute inset-0 pointer-events-none opacity-20 md:opacity-30">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${precursor.bgImage})`, filter: "brightness(1.3) contrast(0.9)" }}
                    />
                  </div>

                  {/* Expanded background */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 pointer-events-none"
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center opacity-40 md:opacity-50"
                          style={{ backgroundImage: `url(${precursor.bgImage})`, filter: "brightness(1.3) contrast(0.9)" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-[#0a0a0a]/70 to-[#0a0a0a]/90" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="mb-4">
                      <precursor.icon className="w-8 h-8 text-cyan-400" strokeWidth={1.5} />
                    </div>

                    <div className="mb-3">
                      <div className={`inline-block px-2 py-0.5 border ${styles.border} rounded ${styles.bg}`}>
                        <span className={`text-[9px] font-mono ${styles.text} tracking-widest font-bold`} style={{ textShadow: styles.shadow }}>
                          [ {precursor.category} ]
                        </span>
                      </div>
                    </div>

                    <h3 className="text-white font-bold text-lg mb-1">{precursor.name}</h3>
                    <div className="text-cyan-400 font-mono text-2xl font-bold mb-1">{precursor.dose}</div>
                    <div className="text-neutral-400 text-sm mb-3">{precursor.role}</div>

                    <button
                      type="button"
                      className="flex items-center gap-2 text-xs font-mono text-cyan-400/60 hover:text-cyan-400 transition-colors"
                    >
                      {isExpanded ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                      {isExpanded ? "COLLAPSE" : "EXPAND"}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-neutral-300 text-sm mt-4 leading-relaxed">{precursor.description}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HbQuiz;

export const schema = createSchema({
  type: "hb-quiz",
  title: "HB Protocol",
  settings: [],
  presets: {},
});
