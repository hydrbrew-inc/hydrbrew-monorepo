import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { useState } from "react";
import { ArrowRight, Clock, User, X } from "lucide-react";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  readTime: string;
  date: string;
  category: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "The Afternoon Manifesto: A Structural Correction for the Pre-Sovereign Era",
    excerpt: "Legacy Logic is a Bug in the Human Code. Stop reacting. Start directing. This is coffee, reimagined for the future.",
    content: `Legacy Logic is a Bug in the Human Code.

Most high-performers still treat afternoon performance decay like an unavoidable tax on existence. You feel the cognitive fog rolling in. The packet loss in your data processing begins. Your response? You take out another energy loan from a 20th-century commodity.

By 2:15 PM, you are dehydrated, twitchy, and mentally bankrupt. This isn't a lack of willpower; it's a design instability. You are operating in Biological Debt, trapped in a primitive energy loop that favors volatile stimulation over sustained execution.

The Mandate for Cognitive Sovereignty

We are moving past the era of passive consumption. The near future demands Cognitive Sovereignty — the ability to direct your own neural architecture without interference from volatility, latency, or systemic depletion.

The Architectural Correction

We built hydrbrew° to be the ultimate baseline substrate for the optimized human. We kept the soul of elite coffee, then executed a precise cognitive patch underneath:

• Lion's Mane & L-Theanine // The Focus Engine: Neural priming. Stabilizes the signal, removing the twitch and leaving only the sharp.
• Ionic Electrolytes // The Substrate: Coffee is naturally dehydrating; we fixed the math.
• Precision Caffeine // The Anchor: A perfectly calibrated caffeine stack that runs clean, exits clean, and leaves zero debt on the operating baseline.

Stop reacting. Start directing. This is premium coffee, reimagined for the future.`,
    image: "https://i.imgur.com/f8a6GyL.jpeg",
    author: "hydrbrew° Research Division",
    readTime: "8 min read",
    date: "May 20, 2026",
    category: "Manifesto",
  },
  {
    id: 2,
    title: "The Distributed Ritual: Bieber, Coachella & The Baseline Problem",
    excerpt: "What Bieber did at Coachella was not a concert. It was a live demonstration of the gap between the room running on borrowed energy, and one person who was not.",
    content: `We have always been Bieber fans. But his Coachella appearance felt different — it felt like a diagnostic.

What Bieber did at Coachella was not a concert. It was a live demonstration of the gap between two states: the room running on borrowed energy, and one person who was not.

That gap is the only thing hydrbrew° is interested in.

The Focus Problem Is a Hardware Problem

Most people in that field were not present. They were running on the standard afternoon substrate: cortisol debt from the morning, glycemic crash from lunch, the ambient system noise of a stimulant that had already peaked.

hydrbrew° is not interested in the buzz. It is interested in the baseline.

Our Substrate Protocol — 85mg buffered caffeine, 200mg L-Theanine, 200mg Lion's Mane — is not designed to elevate. It is designed to remove what was pulling you down.

Zero Systemic Debt

The afternoon crash is not inevitable. The operators who understand this do not manage the crash. They architect around it.

85mg. Buffered beneath the anxiety threshold. 200mg L-Theanine. Modulating, not amplifying. 200mg Lion's Mane. The architecture of sustained output.

ZERO SYSTEMIC DEBT — hydrbrew°`,
    image: "https://i.imgur.com/d0nlyo5.png",
    author: "hydrbrew° Research Division",
    readTime: "10 min read",
    date: "Apr 18, 2026",
    category: "Culture",
  },
  {
    id: 3,
    title: "From Jitters to Zen: A Journey to Precision Focus and a Clean Metabolic Exit",
    excerpt: "The origin story of hydrbrew° and why we reimagined the functional beverage.",
    content: `Most people assume the afternoon crash is just part of the deal.

You push hard in the morning, hit your peak somewhere around 11, and by 2:15 you're managing. Reaching for another coffee. Recalibrating expectations for what the next three hours could actually produce.

That assumption runs on autopilot for years. High-output mornings, diminishing afternoons, and a stimulant habit that keeps escalating the dose to hold the baseline.

The real cost isn't the crash. It's the quality of thinking during the hours you're supposedly functional.

The Research:

The standard caffeine delivery model is blunt. It hits fast, peaks hard, and exits through a cortisol spike that leaves you wired but unfocused. The solution isn't more caffeine. It's a different architecture.

• 85mg buffered caffeine — below the threshold that triggers the cortisol spike
• 200mg L-Theanine — converts stimulation into focus
• 200mg Lion's Mane — sustained cognitive function, executive decision-making

Together, these three don't amplify your state. They remove what was degrading it.

CONCLUSION: hydrbrew° — 85mg buffered caffeine · 200mg L-Theanine · 200mg Lion's Mane — Zero Systemic Debt. The afternoon stays yours.`,
    image: "https://i.imgur.com/qCYobqP.png",
    author: "hydrbrew° Research Division",
    readTime: "12 min read",
    date: "Feb 10, 2026",
    category: "Story",
  },
  {
    id: 4,
    title: "Biohacker's Guide: Stacking Adaptogens with Low-Caf Drinks",
    excerpt: "Expert tips on combining functional ingredients for maximum cognitive benefits.",
    content: `The biohacking community has known for years what the mainstream beverage industry is only beginning to catch up to: caffeine alone is a blunt instrument.

High-dose caffeine delivers amplitude without resolution. The smarter play is the stack.

Why Low-Caf Is the Foundation:

Caffeine's performance curve is not linear. At low to moderate doses — roughly 40mg to 100mg — it produces clean adenosine blockade without triggering the HPA axis response. Above that threshold, the anxiety, jitter, and attention fragmentation begin to outweigh the cognitive benefits.

85mg is the target. Below the spike threshold. Above the activation floor.

The Core Stack — Caffeine + L-Theanine:

L-Theanine promotes alpha-wave brain activity — the state associated with relaxed alertness, creative flow, and focused attention. Combined with caffeine, it produces "alert calmness" — a cognitive state genuinely different from either compound alone.

Adding Lion's Mane — The Executive Function Layer:

L-Theanine handles the modulation. Lion's Mane handles the depth. Hericium erinaceus stimulates nerve growth factor synthesis, supporting neuroplasticity and the kind of sustained executive function that degrades under cognitive load.

CONCLUSION: Zero systemic debt. The afternoon stays yours.`,
    image: "https://i.imgur.com/XJwgah6.png",
    author: "hydrbrew° Research Division",
    readTime: "8 min read",
    date: "Feb 8, 2026",
    category: "Biohacking",
  },
];

const comparisons = [
  { id: 100, title: "Red Bull vs. hydrbrew°", excerpt: "80mg caffeine + 27g sugar causes 3:30 PM crashes.", image: "https://i.imgur.com/IOMVKF7.png", readTime: "6 min read", content: "Red Bull's 80mg caffeine combined with 27g of sugar produces a predictable 3:30 PM crash. hydrbrew° uses 85mg buffered caffeine with L-Theanine and Lion's Mane for sustained output without the crash. Zero systemic debt. The afternoon stays yours." },
  { id: 101, title: "Energy Drink vs. Functional Coffee", excerpt: "150-300mg spikes vs. 85mg + L-Theanine for sustained focus.", image: "https://i.imgur.com/1f6wCBo.png", readTime: "7 min read", content: "Standard energy drinks deliver 150-300mg caffeine without modulation, causing jitters and crashes. Functional coffee uses 85mg buffered caffeine + 200mg L-Theanine for focused calm and clean exit. Zero systemic debt. The afternoon stays yours." },
  { id: 102, title: "Bang Energy vs. hydrbrew°", excerpt: "300mg triggers anxiety in meetings - why 85mg works better.", image: "https://i.imgur.com/b5qCx4B.png", readTime: "6 min read", content: "Bang Energy's 300mg dose pushes most professionals past the clean performance window into anxiety, jitters, and fragmented attention. 85mg buffered caffeine stays below the anxiety threshold while delivering real activation. Zero systemic debt." },
  { id: 103, title: "Celsius vs. hydrbrew°", excerpt: "200mg built for workouts, not 2 PM desk work.", image: "https://i.imgur.com/nGsStwV.png", readTime: "6 min read", content: "Celsius is optimized for morning workouts, not afternoon desk work. Its 200mg caffeine dose and thermogenic blend trigger cortisol spikes at 2 PM. 85mg buffered caffeine with L-Theanine works with your cortisol cycle instead of against it." },
];

function ArticleModal({ article, onClose }: { article: Article; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 py-8 md:py-16">
        <button type="button" onClick={onClose} className="fixed top-6 right-6 z-20 p-3 bg-[#00FFFF]/10 border-2 border-[#00FFFF]/30 hover:border-[#00FFFF] rounded-xl text-[#00FFFF] hover:bg-[#00FFFF]/20 transition-all" aria-label="Close">
          <X className="w-6 h-6" />
        </button>
        <article className="bg-[#0A0A0A] border-2 border-[#00FFFF]/20 rounded-3xl overflow-hidden">
          <div className="relative h-64 overflow-hidden">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
          </div>
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-[#00FFFF]/10 border border-[#00FFFF]/30 text-[#00FFFF] text-xs font-mono uppercase tracking-wider rounded-full">{article.category}</span>
              <span className="text-white/40 text-sm font-mono flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
              <span className="text-white/40 text-sm">{article.date}</span>
            </div>
            <h2 className="text-3xl md:text-4xl text-white font-bold mb-4 leading-tight" style={{ fontFamily: "'Urbanist',sans-serif" }}>{article.title}</h2>
            <div className="text-white/40 text-sm font-mono mb-8">{article.author}</div>
            <div className="space-y-4">
              {article.content.split("\n\n").map((para, i) => (
                <p key={i} className="text-white/80 leading-relaxed" style={{ fontFamily: "'Inter',sans-serif", fontSize: "17px", lineHeight: "1.8" }}>{para}</p>
              ))}
            </div>
            <div className="mt-10 pt-8 border-t border-[#00FFFF]/20 flex items-center justify-between">
              <button type="button" onClick={onClose} className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all">← Close</button>
              <div className="text-sm text-white/40 font-mono">End of transmission //</div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

function HbBlog(props: HydrogenComponentProps) {
  const { ...rest } = props;
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <>
      <section id="knowledge-base" {...rest} className="relative py-24 bg-black overflow-hidden">
        {/* Dreamcore Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#00FFFF]/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{ backgroundImage: "linear-gradient(#00FFFF 1px,transparent 1px),linear-gradient(90deg,#00FFFF 1px,transparent 1px)", backgroundSize: "50px 50px" }} />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <p className="text-[#00FFFF] text-sm mb-4 uppercase tracking-wider" style={{ fontFamily: "'Roboto Mono',monospace" }}>
              KNOWLEDGE BASE // COGNITIVE ARCHIVE
            </p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-6 leading-tight" style={{ fontFamily: "'Urbanist',sans-serif" }}>
              High-Resolution<br /><span className="text-[#00FFFF]">Intelligence</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Deep dives into latency reduction, metabolic efficiency, and clear focus
            </p>
          </div>

          {/* Featured article */}
          <div className="max-w-6xl mx-auto mb-16">
            <div
              className="group relative overflow-hidden rounded-3xl border-2 border-[#00FFFF]/20 hover:border-[#00FFFF]/60 transition-all duration-500 cursor-pointer"
              onClick={() => setSelectedArticle(articles[0])}
            >
              <div className="relative h-[500px] overflow-hidden">
                <img
                  src={articles[0].image}
                  alt={articles[0].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-[#00FFFF]/20 border border-[#00FFFF] text-[#00FFFF] text-xs font-mono uppercase tracking-wider rounded-full">Featured</span>
                  <span className="text-white/60 text-sm">{articles[0].category}</span>
                </div>
                <h3 className="text-3xl md:text-4xl text-white font-bold mb-4 group-hover:text-[#00FFFF] transition-colors" style={{ fontFamily: "'Urbanist',sans-serif" }}>{articles[0].title}</h3>
                <p className="text-lg text-white/70 mb-6 max-w-3xl">{articles[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="hidden md:flex items-center gap-6 text-sm text-white/60">
                    <div className="flex items-center gap-2"><User className="w-4 h-4" /><span>{articles[0].author}</span></div>
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>{articles[0].readTime}</span></div>
                    <span>{articles[0].date}</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setSelectedArticle(articles[0]); }}
                    className="flex items-center gap-2 px-6 py-3 bg-[#00FFFF] text-black rounded-xl hover:bg-[#00FFFF]/90 transition-all text-base font-semibold group-hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
                  >
                    Read Article<ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Article grid (articles 2–4) */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {articles.slice(1).map((article) => (
              <div
                key={article.id}
                className="group relative overflow-hidden rounded-2xl border-2 border-white/10 hover:border-[#00FFFF]/60 transition-all duration-500 bg-[#0A0A0A] cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-sm border border-[#00FFFF]/30 text-[#00FFFF] text-xs font-mono uppercase tracking-wider rounded-full">{article.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-white font-bold mb-3 group-hover:text-[#00FFFF] transition-colors line-clamp-2" style={{ fontFamily: "'Urbanist',sans-serif" }}>{article.title}</h3>
                  <p className="text-sm text-white/60 mb-4 line-clamp-2">{article.excerpt}</p>
                  <div className="hidden md:flex items-center justify-between text-xs text-white/40 mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
                    <span>{article.date}</span>
                  </div>
                  <button type="button" onClick={(e) => { e.stopPropagation(); setSelectedArticle(article); }} className="flex items-center gap-2 text-[#00FFFF] font-semibold hover:gap-3 transition-all">
                    Read More<ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00FFFF]/5 to-transparent" />
                </div>
              </div>
            ))}
          </div>

          {/* Comparisons */}
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center">
              <p className="text-[#00FFFF]/60 text-xs uppercase tracking-wider font-mono">COMPARISONS</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {comparisons.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedArticle({ ...c, author: "hydrbrew° Research", date: "May 26, 2026", category: "Comparison" })}
                  className="group relative overflow-hidden rounded-xl border border-white/10 hover:border-[#00FFFF]/60 transition-all bg-[#0A0A0A] text-left"
                >
                  <div className="relative h-32 overflow-hidden">
                    <img src={c.image} alt={c.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm text-white font-bold mb-2 group-hover:text-[#00FFFF] transition-colors line-clamp-2" style={{ fontFamily: "'Urbanist',sans-serif" }}>{c.title}</h3>
                    <p className="text-xs text-white/50 line-clamp-2 mb-2">{c.excerpt}</p>
                    <span className="text-xs text-[#00FFFF]/60 font-mono">{c.readTime}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedArticle && <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
    </>
  );
}

export default HbBlog;

export const schema = createSchema({
  type: "hb-blog",
  title: "HB Blog",
  settings: [],
  presets: {},
});
