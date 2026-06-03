import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { motion, useInView } from "motion/react";
import { Play, TrendingUp, Zap, Eye } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface HbBlogProps extends HydrogenComponentProps {
  videoId?: string;
  preOrderLink?: string;
}

function HbBlog(props: HbBlogProps) {
  const { videoId = "", preOrderLink = "/products", ...rest } = props;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showVideo, setShowVideo] = useState(false);
  const [currentNumbers, setCurrentNumbers] = useState([0, 0, 0, 0]);
  const [isSpinning, setIsSpinning] = useState(false);

  const sequences = [[7,3,9,2],[4,8,1,6],[5,2,7,3],[9,1,4,8],[3,6,2,5]];
  const [seqIdx, setSeqIdx] = useState(0);

  useEffect(() => {
    const spinInterval = setInterval(() => {
      setIsSpinning(true);
      const rapid = setInterval(() => {
        setCurrentNumbers([
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
        ]);
      }, 100);
      setTimeout(() => {
        clearInterval(rapid);
        setCurrentNumbers(sequences[seqIdx]!);
        setIsSpinning(false);
        setSeqIdx((p) => (p + 1) % sequences.length);
      }, 4500);
    }, 5000);
    return () => clearInterval(spinInterval);
  }, [seqIdx]);

  const stats = [
    { icon: TrendingUp, label: "Focus Duration", value: "4-6hr", sub: "sustained clarity" },
    { icon: Zap, label: "Caffeine Precision", value: "85mg", sub: "below cortisol threshold" },
    { icon: Eye, label: "Cognitive Stack", value: "4-layer", sub: "precursor model" },
  ];

  return (
    <section ref={ref} {...rest} className="py-24 md:py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-neutral-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-6 px-4 py-1.5 border border-red-500/30 rounded-full text-xs font-mono tracking-wider text-red-400">
            MISSION INTEL
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white">
            The Science<br />
            <span style={{ color: "#00FFFF" }}>Behind the Protocol</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
            See exactly what goes into every can and why each compound was chosen.
          </p>
        </motion.div>

        {/* Slot machine counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div
            className="flex items-center gap-2 px-8 py-4 rounded-2xl font-mono"
            style={{ backgroundColor: "rgba(10,10,10,0.9)", border: "2px solid rgba(0,255,255,0.3)", boxShadow: "0 0 40px rgba(0,255,255,0.15)" }}
          >
            <span className="text-neutral-500 text-sm tracking-wider uppercase mr-4">Operatives</span>
            {currentNumbers.map((n, i) => (
              <motion.div
                key={i}
                className="w-10 h-12 flex items-center justify-center rounded-lg text-2xl font-bold"
                style={{ backgroundColor: "rgba(0,255,255,0.08)", color: "#00FFFF", border: "1px solid rgba(0,255,255,0.2)", textShadow: "0 0 10px rgba(0,255,255,0.8)" }}
                animate={isSpinning ? { y: [0, -4, 0], opacity: [1, 0.6, 1] } : {}}
                transition={{ duration: 0.1, repeat: isSpinning ? Infinity : 0 }}
              >
                {n}
              </motion.div>
            ))}
            <motion.div
              className="w-2 h-2 rounded-full ml-4"
              style={{ backgroundColor: "#00FFFF" }}
              animate={{ opacity: [0.4, 1, 0.4], boxShadow: ["0 0 6px rgba(0,255,255,0.6)", "0 0 12px rgba(0,255,255,1)", "0 0 6px rgba(0,255,255,0.6)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Video area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative rounded-2xl overflow-hidden mb-12"
          style={{ border: "1px solid rgba(0,255,255,0.2)", minHeight: "400px", backgroundColor: "rgba(5,7,10,0.95)" }}
        >
          {videoId && showVideo ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              className="w-full"
              style={{ height: "500px" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="hydrbrew video"
            />
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[400px] relative">
              {/* Grid background */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "linear-gradient(rgba(239,68,68,0.5) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(239,68,68,0.5) 1.5px, transparent 1.5px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Corner markers */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-red-500/60" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-red-500/60" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-red-500/60" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-red-500/60" />

              <div className="relative z-10 text-center px-8">
                <div className="mb-6 px-3 py-1 rounded-full text-xs font-mono tracking-widest text-red-400 inline-block" style={{ border: "1px solid rgba(239,68,68,0.4)" }}>
                  ● CLASSIFIED
                </div>
                <h3 className="text-2xl md:text-3xl text-white font-bold mb-4">
                  The +1 Protocol<br />
                  <span style={{ color: "#00FFFF" }}>In Action</span>
                </h3>
                <p className="text-neutral-400 mb-8 max-w-md mx-auto">
                  See how hydrbrew° rewires the afternoon crash into sustained high-output performance.
                </p>
                {videoId ? (
                  <motion.button
                    type="button"
                    onClick={() => setShowVideo(true)}
                    className="flex items-center gap-3 px-8 py-4 rounded-full font-mono font-bold text-black mx-auto"
                    style={{ backgroundColor: "#00FFFF", boxShadow: "0 0 30px rgba(0,255,255,0.6)" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Play className="w-5 h-5" />
                    PLAY MISSION INTEL
                  </motion.button>
                ) : (
                  <a
                    href={preOrderLink}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-mono font-bold text-black"
                    style={{ backgroundColor: "#00FFFF", boxShadow: "0 0 30px rgba(0,255,255,0.6)" }}
                  >
                    SECURE YOUR ALLOCATION →
                  </a>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="rounded-xl p-6 flex items-start gap-4"
              style={{ backgroundColor: "rgba(10,10,10,0.8)", border: "1px solid rgba(0,255,255,0.15)" }}
            >
              <div className="p-2 rounded-lg shrink-0" style={{ backgroundColor: "rgba(0,255,255,0.08)" }}>
                <stat.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="text-2xl font-mono font-bold mb-1" style={{ color: "#00FFFF" }}>{stat.value}</div>
                <div className="text-white text-sm font-medium mb-0.5">{stat.label}</div>
                <div className="text-neutral-500 text-xs">{stat.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HbBlog;

export const schema = createSchema({
  type: "hb-blog",
  title: "HB Mission Intel",
  settings: [
    {
      group: "Content",
      inputs: [
        { type: "text", name: "videoId", label: "YouTube video ID (optional)", placeholder: "dQw4w9WgXcQ" },
        { type: "text", name: "preOrderLink", label: "Pre-order link", defaultValue: "/products" },
      ],
    },
  ],
  presets: { preOrderLink: "/products" },
});
