import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { Link } from "react-router";

const FEATURED = {
  title: "The Afternoon Manifesto: A Structural Correction for the Pre-Sovereign Era",
  excerpt: "The afternoon performance drop is not a character defect. It's a design flaw in how modern humans fuel themselves. Here's the fix.",
  badge: "FEATURED",
  slug: "afternoon-manifesto",
};

const ARTICLES = [
  { title: "The L-Theanine + Caffeine Stack: A Science Review", excerpt: "How caffeine and L-Theanine work synergistically and why the ratio matters.", badge: "SCIENCE", slug: "l-theanine-caffeine-stack-science-review" },
  { title: "From Skim to 3+: 3 Concepts to Reclaim Your Afternoon", excerpt: "Tactical frameworks for reclaiming the second half of your working day.", badge: "TACTICS", slug: "reclaim-your-afternoon" },
  { title: "Biohacker's Guide: Stacking Thinking for the 2:15 PM Window", excerpt: "Advanced protocols for sustained cognitive performance past the afternoon wall.", badge: "ADVANCED", slug: "biohackers-guide" },
];

function HbBlog(props: HydrogenComponentProps) {
  const { ...rest } = props;

  return (
    <section {...rest} className="py-20 md:py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: "linear-gradient(rgba(0,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,255,1) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#00FFFF", fontFamily: "'Roboto Mono',monospace" }}>
            KNOWLEDGE BASE // COGNITIVE ARCHIVE
          </p>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4" style={{ fontFamily: "'Urbanist',sans-serif" }}>
            High-Resolution <span style={{ color: "#00FFFF" }}>Intelligence</span>
          </h2>
          <p className="text-xl text-white/60" style={{ fontFamily: "'Urbanist',sans-serif" }}>
            Deep dives into latency reduction, metabolic efficiency, and clear focus
          </p>
        </div>

        {/* Featured article */}
        <Link
          to={`/blogs/news/${FEATURED.slug}`}
          className="group block rounded-3xl overflow-hidden mb-8 relative transition-all duration-300"
          style={{ border: "2px solid rgba(0,255,255,0.2)", height: 500 }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,255,0.6)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,255,0.2)"; }}
        >
          {/* Background */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(0,255,255,0.08),rgba(0,0,0,0.9))" }}>
            <img src="/can-front.webp" alt="" className="w-full h-full object-cover opacity-25 scale-110 group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: "rgba(0,255,255,0.15)", border: "1px solid rgba(0,255,255,0.4)", color: "#00FFFF", fontFamily: "'Roboto Mono',monospace" }}>
              {FEATURED.badge}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-[#00FFFF] transition-colors" style={{ fontFamily: "'Urbanist',sans-serif", maxWidth: "70%" }}>
              {FEATURED.title}
            </h3>
            <p className="text-lg text-white/70 max-w-3xl mb-6" style={{ fontFamily: "'Urbanist',sans-serif" }}>
              {FEATURED.excerpt}
            </p>
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-black text-sm uppercase tracking-wider" style={{ backgroundColor: "#00FFFF", fontFamily: "'Urbanist',sans-serif" }}>
              Read Article →
            </span>
          </div>
        </Link>

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              to={`/blogs/news/${article.slug}`}
              className="group block rounded-2xl overflow-hidden transition-all duration-300"
              style={{ border: "2px solid rgba(255,255,255,0.1)", backgroundColor: "#0A0A0A" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,255,0.6)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
            >
              <div className="h-48 relative overflow-hidden" style={{ background: "linear-gradient(135deg,rgba(0,255,255,0.08),rgba(128,0,255,0.08))" }}>
                <img src="/can-front.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-[#0A0A0A] to-transparent" />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3" style={{ backgroundColor: "rgba(0,255,255,0.1)", border: "1px solid rgba(0,255,255,0.3)", color: "#00FFFF", fontFamily: "'Roboto Mono',monospace" }}>
                  {article.badge}
                </span>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00FFFF] transition-colors line-clamp-2" style={{ fontFamily: "'Urbanist',sans-serif" }}>
                  {article.title}
                </h3>
                <p className="text-sm text-white/60 line-clamp-2 mb-4" style={{ fontFamily: "'Urbanist',sans-serif" }}>{article.excerpt}</p>
                <span className="text-sm font-bold flex items-center gap-2" style={{ color: "#00FFFF", fontFamily: "'Urbanist',sans-serif" }}>Read More →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/blogs/news"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
            style={{ border: "2px solid rgba(0,255,255,0.4)", color: "#00FFFF", fontFamily: "'Urbanist',sans-serif" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(0,255,255,0.05)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
          >
            View All Articles →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HbBlog;

export const schema = createSchema({
  type: "hb-blog",
  title: "HB Blog / Articles",
  settings: [],
  presets: {},
});
