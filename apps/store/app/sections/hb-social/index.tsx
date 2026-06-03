import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

function HbSocial(props: HydrogenComponentProps) {
  const { ...rest } = props;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);
  const [liveVisitors, setLiveVisitors] = useState(247);
  const targetCount = 3847;

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

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVisitors((prev) => {
        const change = Math.floor(Math.random() * 10) - 4;
        return Math.max(220, Math.min(280, prev + change));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} {...rest} className="py-12 md:py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Founding members counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-8 text-center flex flex-col items-center"
            style={{ backgroundColor: "rgba(10,10,10,0.8)", border: "1px solid rgba(0,255,255,0.2)" }}
          >
            <div className="text-5xl md:text-6xl font-mono font-bold mb-2" style={{ color: "#00FFFF", textShadow: "0 0 20px rgba(0,255,255,0.6)" }}>
              {count.toLocaleString()}
            </div>
            <div className="text-neutral-400 font-mono text-sm tracking-wider uppercase">Founding Members</div>
            <div className="mt-4 flex items-center gap-2">
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#00FFFF" }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs font-mono text-neutral-500">LIVE COUNT</span>
            </div>
          </motion.div>

          {/* Live visitors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl p-8 text-center flex flex-col items-center"
            style={{ backgroundColor: "rgba(10,10,10,0.8)", border: "1px solid rgba(0,255,255,0.2)" }}
          >
            <div className="text-5xl md:text-6xl font-mono font-bold mb-2 text-white">
              {liveVisitors}
            </div>
            <div className="text-neutral-400 font-mono text-sm tracking-wider uppercase">Viewing Now</div>
            <div className="mt-4 flex items-center gap-2">
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-xs font-mono text-neutral-500">LIVE</span>
            </div>
          </motion.div>

          {/* Social badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl p-8 text-center flex flex-col items-center justify-center"
            style={{ backgroundColor: "rgba(10,10,10,0.8)", border: "1px solid rgba(0,255,255,0.2)" }}
          >
            <div className="mb-4">
              <span className="text-4xl font-bold" style={{ color: "#00FFFF" }}>+1</span>
              <span className="text-4xl font-bold text-white"> You</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">Join those who already refused the afternoon tax.</p>
            <div className="mt-4 flex gap-3">
              {["IG", "X", "YT"].map((s) => (
                <div key={s} className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-neutral-500" style={{ border: "1px solid rgba(0,255,255,0.2)" }}>
                  {s}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HbSocial;

export const schema = createSchema({
  type: "hb-social",
  title: "HB Social Proof",
  settings: [],
  presets: {},
});
