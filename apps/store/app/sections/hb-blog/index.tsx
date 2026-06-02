import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { Link } from "react-router";

const ARTICLES = [
  { title: "The L-Theanine + Caffeine Stack: A Science Review", excerpt: "How the combination of caffeine and L-Theanine may support sustained cognitive performance — and why the ratio matters.", badge: "SCIENCE REVIEW", slug: "l-theanine-caffeine-stack-science-review" },
  { title: "The Afternoon Manifesto", excerpt: "A structural correction for the pre-sovereign era. Why the 2:15 PM window defines your day.", badge: "MANIFESTO", slug: "afternoon-manifesto" },
  { title: "Lion's Mane & Neuroplasticity", excerpt: "What the research actually says about hericenones, NGF synthesis, and cognitive support.", badge: "RESEARCH", slug: "lions-mane-neuroplasticity" },
];

function HbBlog(props: HydrogenComponentProps) {
  const { ...rest } = props;

  return (
    <section {...rest} className="py-20 md:py-32 bg-black relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{ backgroundImage: "linear-gradient(rgba(0,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,255,1) 1px,transparent 1px)", backgroundSize: "50px 50px" }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
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
              <div className="h-48 relative overflow-hidden" style={{ background: "linear-gradient(135deg,rgba(0,255,255,0.1),rgba(128,0,255,0.1))" }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src="/can-front.webp" alt="" className="h-32 object-contain opacity-40" style={{ filter: "drop-shadow(0 0 20px rgba(0,255,255,0.3))" }} />
                </div>
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
                <span className="text-sm font-bold flex items-center gap-2" style={{ color: "#00FFFF", fontFamily: "'Urbanist',sans-serif" }}>Read Article →</span>
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
