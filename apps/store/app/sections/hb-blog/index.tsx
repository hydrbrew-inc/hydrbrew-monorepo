import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { useState } from "react";
import { ArrowRight, Clock, X } from "lucide-react";

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

By 2:15 PM, you are dehydrated, twitchy, and mentally bankrupt. This isn't a lack of willpower; it's a design instability. You are operating in Biological Debt.

The Mandate for Cognitive Sovereignty

We are moving past the era of passive consumption. The near future demands Cognitive Sovereignty — the ability to direct your own neural architecture without interference from volatility, latency, or systemic depletion.

The Architectural Correction

We built hydrbrew° to be the ultimate baseline substrate for the optimized human. We kept the soul of elite coffee, then executed a precise cognitive patch underneath:

• Lion's Mane & L-Theanine // The Focus Engine: Neural priming. Stabilizes the signal, removing the twitch and leaving only the sharp.
• Ionic Electrolytes // The Substrate: Coffee is naturally dehydrating; we fixed the math.
• Precision Caffeine // The Anchor: A perfectly calibrated caffeine stack that runs clean, exits clean, and leaves zero debt on the operating baseline.

The future will not be built by those living in debt. It will be built by those who have achieved Bio-Integrity.`,
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

The afternoon crash is not inevitable. It is the predictable output of a system running on the wrong substrate. The operators who understand this do not manage the crash. They architect around it.

85mg. Buffered beneath the anxiety threshold.
200mg L-Theanine. Modulating, not amplifying.
200mg Lion's Mane. The architecture of sustained output.

ZERO SYSTEMIC DEBT — hydrbrew°`,
    image: "https://i.imgur.com/f8a6GyL.jpeg",
    author: "hydrbrew° Research Division",
    readTime: "6 min read",
    date: "May 15, 2026",
    category: "Culture",
  },
  {
    id: 3,
    title: "The Science of the 2:15 PM Window",
    excerpt: "Why the afternoon fade isn't about willpower — and the precise biochemical architecture that eliminates it.",
    content: `The 2:15 PM problem is not random. It has a biochemical signature.

After lunch, blood glucose spikes and then drops. Core body temperature follows a circadian dip. Adenosine — the molecule that makes you feel sleepy — has been accumulating since you woke up. Your morning caffeine has worn off. The cortisol response from your first coffee has long cleared. You are in a trough.

Most people's response is another caffeine hit. The problem: a standard afternoon coffee at 150-300mg triggers a cortisol response that disrupts your sleep 6-8 hours later. You are borrowing energy from tonight to get through this afternoon.

The hydrbrew° approach is different.

85mg buffered caffeine sits below the cortisol spike threshold. It activates without triggering the stress cascade. 200mg L-Theanine converts that activation into calm, sustained focus — the alpha-wave state. 200mg Lion's Mane supports the executive function depth that the afternoon demands. 255mg ionic electrolytes correct the hydration deficit that compounds cognitive decline.

The result is not a spike. It is a maintained baseline. The 2:15 PM window becomes not a problem to manage, but a protocol to execute.`,
    image: "https://i.imgur.com/f8a6GyL.jpeg",
    author: "hydrbrew° Research Division",
    readTime: "5 min read",
    date: "May 10, 2026",
    category: "Science",
  },
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
            <h2 className="text-3xl md:text-4xl text-white font-bold mb-6 leading-tight" style={{ fontFamily: "'Urbanist',sans-serif" }}>{article.title}</h2>
            <div className="text-white/40 text-sm font-mono mb-8">{article.author}</div>
            <div className="prose prose-invert max-w-none">
              {article.content.split("\n\n").map((para, i) => (
                <p key={i} className="text-white/80 leading-relaxed mb-4" style={{ fontFamily: "'Inter',sans-serif", fontSize: "17px", lineHeight: "1.8" }}>{para}</p>
              ))}
            </div>
            <div className="mt-10 pt-8 border-t border-[#00FFFF]/20 flex items-center justify-between">
              <button type="button" onClick={onClose} className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>← Close</button>
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
    <section {...rest} className="relative py-24 bg-black overflow-hidden" id="knowledge-base">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-96 bg-[#00FFFF]/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-[#00FFFF] text-sm mb-4 uppercase tracking-wider" style={{ fontFamily: "'Roboto Mono',monospace" }}>INTELLIGENCE ARCHIVE // SIGNAL DROPS</p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-6 leading-tight" style={{ fontFamily: "'Urbanist',sans-serif" }}>
            The<br /><span className="text-[#00FFFF]">Intelligence</span>
          </h2>
          <p className="text-lg text-white/60">Dispatches from the baseline — research, culture, and the science of the afternoon.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {articles.map((article, index) => (
            <div
              key={article.id}
              className="group relative bg-[#0A0A0A] border border-[#00FFFF]/15 rounded-2xl overflow-hidden cursor-pointer hover:border-[#00FFFF]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.1)]"
              onClick={() => setSelectedArticle(article)}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/80 backdrop-blur-sm border border-[#00FFFF]/30 text-[#00FFFF] text-xs font-mono uppercase tracking-wider rounded-full">{article.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4 text-white/40 text-xs font-mono">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
                  <span>{article.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-[#00FFFF] transition-colors" style={{ fontFamily: "'Urbanist',sans-serif" }}>{article.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6" style={{ fontFamily: "'Inter',sans-serif" }}>{article.excerpt}</p>
                <div className="flex items-center gap-2 text-[#00FFFF] text-sm font-medium group-hover:gap-3 transition-all">
                  <span>Read article</span><ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00FFFF]/20 group-hover:border-[#00FFFF]/60 transition-colors" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00FFFF]/20 group-hover:border-[#00FFFF]/60 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {selectedArticle && <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
    </section>
  );
}

export default HbBlog;

export const schema = createSchema({
  type: "hb-blog",
  title: "HB Blog",
  settings: [],
  presets: {},
});
