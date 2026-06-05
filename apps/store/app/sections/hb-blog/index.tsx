import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { useState } from "react";
import { ArrowRight, Clock, User, X, Calendar } from "lucide-react";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  contentHtml: string;
  image: string;
  author: string;
  readTime: string;
  date: string;
  category: string;
}

// ── Regular articles ────────────────────────────────────────────────────────

const articles: Article[] = [
  {
    id: 1,
    title: "The Afternoon Manifesto: A Structural Correction for the Pre-Sovereign Era",
    excerpt: "Legacy Logic is a Bug in the Human Code. Stop reacting. Start directing. This is coffee, reimagined for the future.",
    image: "https://i.imgur.com/f8a6GyL.jpeg",
    author: "hydrbrew° Research Division",
    readTime: "8 min read",
    date: "May 20, 2026",
    category: "Manifesto",
    contentHtml: `
<p><strong>Legacy Logic is a Bug in the Human Code. Stop reacting. Start directing. This is coffee, reimagined for the future.</strong></p>
<p>Most high-performers still treat afternoon performance decay like an unavoidable tax on existence. You feel the cognitive fog rolling in. The packet loss in your data processing begins. Your response? You take out another energy loan from a 20th-century commodity.</p>
<p>By 2:15 PM, you are dehydrated, twitchy, and mentally bankrupt. This isn't a lack of willpower; it's a design instability. You are operating in Biological Debt, trapped in a primitive energy loop that favors volatile stimulation over sustained execution.</p>
<h2>> The Mandate for Cognitive Sovereignty</h2>
<p>We are moving past the era of passive consumption. The near future demands Cognitive Sovereignty — the ability to direct your own neural architecture without interference from volatility, latency, or systemic depletion.</p>
<h2>> The Architectural Correction</h2>
<p>We built hydrbrew° to be the ultimate baseline substrate for the optimized human. We kept the soul of elite coffee, then executed a precise cognitive patch underneath:</p>
<ul>
<li>Lion's Mane &amp; L-Theanine // The Focus Engine: Neural priming. Stabilizes the signal, removing the twitch and leaving only the sharp.</li>
<li>Ionic Electrolytes // The Substrate: Coffee is naturally dehydrating; we fixed the math.</li>
<li>Precision Caffeine // The Anchor: A perfectly calibrated caffeine stack that runs clean, exits clean, and leaves zero debt on the operating baseline.</li>
</ul>
<p>Stop reacting. Start directing. This is premium coffee, reimagined for the future.</p>
    `.trim(),
  },
  {
    id: 2,
    title: "The Distributed Ritual: Bieber, Coachella & The Baseline Problem",
    excerpt: "What Bieber did at Coachella was not a concert. It was a live demonstration of the gap between the room running on borrowed energy, and one person who was not.",
    image: "https://i.imgur.com/d0nlyo5.png",
    author: "hydrbrew° Research Division",
    readTime: "10 min read",
    date: "Apr 18, 2026",
    category: "Culture",
    contentHtml: `
<p>We have always been Bieber fans. But his Coachella appearance felt different — it felt like a diagnostic.</p>
<p>What Bieber did at Coachella was not a concert. It was a live demonstration of the gap between two states: the room running on borrowed energy, and one person who was not.</p>
<p>That gap is the only thing hydrbrew° is interested in.</p>
<h2>> The Focus Problem Is a Hardware Problem</h2>
<p>Most people in that field were not present. They were running on the standard afternoon substrate: cortisol debt from the morning, glycemic crash from lunch, the ambient system noise of a stimulant that had already peaked.</p>
<p>hydrbrew° is not interested in the buzz. It is interested in the baseline.</p>
<p>Our Substrate Protocol — 85mg buffered caffeine, 200mg L-Theanine, 200mg Lion's Mane — is not designed to elevate. It is designed to remove what was pulling you down.</p>
<h2>> Zero Systemic Debt</h2>
<p>The afternoon crash is not inevitable. The operators who understand this do not manage the crash. They architect around it.</p>
<p>85mg. Buffered beneath the anxiety threshold. 200mg L-Theanine. Modulating, not amplifying. 200mg Lion's Mane. The architecture of sustained output.</p>
<p><strong>ZERO SYSTEMIC DEBT — hydrbrew°</strong></p>
    `.trim(),
  },
  {
    id: 3,
    title: "From Jitters to Zen: A Journey to Precision Focus and a Clean Metabolic Exit",
    excerpt: "The origin story of hydrbrew° and why we reimagined the functional beverage.",
    image: "https://i.imgur.com/qCYobqP.png",
    author: "hydrbrew° Research Division",
    readTime: "12 min read",
    date: "Feb 10, 2026",
    category: "Story",
    contentHtml: `
<p>Most people assume the afternoon crash is just part of the deal.</p>
<p>You push hard in the morning, hit your peak somewhere around 11, and by 2:15 you're managing. Reaching for another coffee. Recalibrating expectations for what the next three hours could actually produce.</p>
<p>That assumption runs on autopilot for years. High-output mornings, diminishing afternoons, and a stimulant habit that keeps escalating the dose to hold the baseline.</p>
<p>The real cost isn't the crash. It's the quality of thinking during the hours you're supposedly functional.</p>
<h2>> The Research</h2>
<p>The standard caffeine delivery model is blunt. It hits fast, peaks hard, and exits through a cortisol spike that leaves you wired but unfocused. The solution isn't more caffeine. It's a different architecture.</p>
<ul>
<li>85mg buffered caffeine — below the threshold that triggers the cortisol spike</li>
<li>200mg L-Theanine — converts stimulation into focus</li>
<li>200mg Lion's Mane — sustained cognitive function, executive decision-making</li>
</ul>
<p>Together, these three don't amplify your state. They remove what was degrading it.</p>
<p><strong>CONCLUSION: hydrbrew° — 85mg buffered caffeine · 200mg L-Theanine · 200mg Lion's Mane — Zero Systemic Debt. The afternoon stays yours.</strong></p>
    `.trim(),
  },
  {
    id: 4,
    title: "Biohacker's Guide: Stacking Adaptogens with Low-Caf Drinks",
    excerpt: "Expert tips on combining functional ingredients for maximum cognitive benefits.",
    image: "https://i.imgur.com/XJwgah6.png",
    author: "hydrbrew° Research Division",
    readTime: "8 min read",
    date: "Feb 8, 2026",
    category: "Biohacking",
    contentHtml: `
<p>The biohacking community has known for years what the mainstream beverage industry is only beginning to catch up to: caffeine alone is a blunt instrument.</p>
<p>High-dose caffeine delivers amplitude without resolution. The smarter play is the stack.</p>
<h2>> Why Low-Caf Is the Foundation</h2>
<p>Caffeine's performance curve is not linear. At low to moderate doses — roughly 40mg to 100mg — it produces clean adenosine blockade without triggering the HPA axis response. Above that threshold, the anxiety, jitter, and attention fragmentation begin to outweigh the cognitive benefits.</p>
<p>85mg is the target. Below the spike threshold. Above the activation floor.</p>
<h2>> The Core Stack — Caffeine + L-Theanine</h2>
<p>L-Theanine promotes alpha-wave brain activity — the state associated with relaxed alertness, creative flow, and focused attention. Combined with caffeine, it produces "alert calmness" — a cognitive state genuinely different from either compound alone.</p>
<h2>> Adding Lion's Mane — The Executive Function Layer</h2>
<p>L-Theanine handles the modulation. Lion's Mane handles the depth. Hericium erinaceus stimulates nerve growth factor synthesis, supporting neuroplasticity and the kind of sustained executive function that degrades under cognitive load.</p>
<p><strong>CONCLUSION: Zero systemic debt. The afternoon stays yours.</strong></p>
    `.trim(),
  },
];

// ── Comparison articles ─────────────────────────────────────────────────────

const comparisons: Article[] = [
  {
    id: 100,
    title: "Red Bull vs. hydrbrew°",
    excerpt: "80mg caffeine + 27g sugar causes 3:30 PM crashes. Here's the architecture problem.",
    image: "https://i.imgur.com/IOMVKF7.png",
    author: "hydrbrew° Research",
    readTime: "6 min read",
    date: "May 26, 2026",
    category: "Comparison",
    contentHtml: `
<p><strong>Red Bull vs. hydrbrew°: Same Energy Category, Completely Different Metabolic Architecture.</strong></p>
<p>Why the professional who reaches for a Red Bull at 2 PM is solving a real problem with a product built for a different occasion.</p>
<hr>
<h2>> The 3:30 PM Problem</h2>
<p><strong>Red Bull's 80mg caffeine combined with 27 grams of sugar produces a predictable performance curve: spike at 30 minutes, peak at 60–90 minutes, crash at 3:30 PM. This is not a flaw in the product. It is the product working exactly as designed.</strong></p>
<p>Red Bull was engineered for high-intensity short-duration scenarios — the club, the gaming session, the late-night push. It was not engineered for the sustained executive function window that professionals actually need at 2:15 PM. The 27g sugar load triggers an insulin response that amplifies the energy cycle's oscillation. The caffeine dose — adequate for a 30-minute activation window — is insufficient for the 4-hour afternoon work block.</p>
<p>The result is borrowed energy with a guaranteed repayment schedule. By 3:30 PM, you are paying it back with interest.</p>
<h2>> What Red Bull Was Built For</h2>
<p>Red Bull earned its market position by solving a specific problem: short-duration, high-intensity energy. Its formula is well-matched to that use case. The B-vitamin stack, taurine, and caffeine combination is appropriate for physical exertion or social stamina in a bounded time window. The sugar provides immediate glucose for scenarios where it will be consumed quickly.</p>
<p>The problem is context drift. Red Bull became the default afternoon energy solution for professionals not because it was designed for sustained cognitive output, but because it was available and familiar. When your only tool is a spike, every afternoon looks like a problem that needs a spike.</p>
<h2>> The Formulation Comparison</h2>
<table>
<thead><tr><th>Feature</th><th>Red Bull (8.4oz)</th><th>hydrbrew° (12oz)</th></tr></thead>
<tbody>
<tr><td>Caffeine</td><td>80mg conventional</td><td>85mg buffered</td></tr>
<tr><td>Sugar</td><td>27g</td><td>Low sugar</td></tr>
<tr><td>L-Theanine</td><td>None</td><td>200mg</td></tr>
<tr><td>Lion's Mane</td><td>None</td><td>200mg</td></tr>
<tr><td>Electrolytes</td><td>None</td><td>255mg ionic</td></tr>
<tr><td>Calories</td><td>110</td><td>20</td></tr>
<tr><td>Activation profile</td><td>Fast spike</td><td>Linear sustained</td></tr>
<tr><td>Exit profile</td><td>Sugar crash + caffeine drop</td><td>Clean linear exit</td></tr>
<tr><td>Primary occasion</td><td>Short-duration energy</td><td>Afternoon cognitive window</td></tr>
</tbody>
</table>
<h2>> The Zero Debt Standard</h2>
<p><strong>The core difference is not the caffeine dose. It is the systemic debt that comes with each option.</strong></p>
<p>Red Bull's sugar load creates insulin debt. Its conventional caffeine creates cortisol debt. By 3:30 PM, the professional who chose Red Bull at 1:00 PM is managing both simultaneously. The afternoon doesn't recover — it terminates early.</p>
<p>hydrbrew° uses 85mg buffered caffeine — close to Red Bull's 80mg in absolute terms, but architecturally different. Buffered caffeine stays below the cortisol spike threshold. L-Theanine converts the activation into focused calm. Lion's Mane extends the cognitive depth that the sustained afternoon requires.</p>
<p>Zero systemic debt. The afternoon stays yours.</p>
    `.trim(),
  },
  {
    id: 101,
    title: "Energy Drink vs. Functional Coffee",
    excerpt: "150–300mg spikes vs. 85mg + L-Theanine. Why the ingredient architecture matters more than the caffeine number.",
    image: "https://i.imgur.com/1f6wCBo.png",
    author: "hydrbrew° Research",
    readTime: "7 min read",
    date: "May 26, 2026",
    category: "Comparison",
    contentHtml: `
<p><strong>Energy Drink vs. Functional Coffee: Why the Ingredient Architecture Matters More Than the Caffeine Number.</strong></p>
<p>The shift from conventional energy drinks to functional coffee is not about reducing caffeine. It is about deploying it differently.</p>
<hr>
<h2>> The Architecture Problem</h2>
<p><strong>Standard energy drinks deliver 150–300mg caffeine without cognitive modulation, producing a stimulant signature of elevated heart rate, anxiety potential, and attention fragmentation. Functional coffee uses 85mg buffered caffeine with L-Theanine to produce focused calm — a genuinely different cognitive state.</strong></p>
<p>The energy drink category was built on a simple premise: more caffeine equals more energy. This premise is wrong above a threshold of approximately 100mg in most individuals, but the marketing has been so effective that the myth persists. The result is a market full of products that overshoot the optimal caffeine window and deliver anxiety alongside activation.</p>
<p>Functional coffee addresses this by reframing the question. The goal is not maximum stimulation. The goal is maximum sustained executive function. Those are different targets that require different ingredient architectures.</p>
<h2>> The Modulation Stack</h2>
<p>The core innovation in functional coffee is the addition of cognitive modulators that work with the caffeine rather than alongside it:</p>
<ul>
<li><strong>L-Theanine (200mg)</strong> — promotes alpha-wave brain activity, the state associated with relaxed alertness. Combined with caffeine, it converts stimulation into focus rather than anxiety.</li>
<li><strong>Lion's Mane (200mg)</strong> — stimulates nerve growth factor synthesis, supporting the neuroplasticity and executive function depth that energy drinks cannot address.</li>
<li><strong>Ionic Electrolytes (255mg)</strong> — caffeine is naturally dehydrating; electrolyte supplementation addresses the hydration deficit that conventional energy drinks ignore.</li>
</ul>
<h2>> The Formulation Comparison</h2>
<table>
<thead><tr><th>Feature</th><th>Standard Energy Drink</th><th>hydrbrew° Functional Coffee</th></tr></thead>
<tbody>
<tr><td>Caffeine</td><td>150–300mg conventional</td><td>85mg buffered</td></tr>
<tr><td>L-Theanine</td><td>None</td><td>200mg</td></tr>
<tr><td>Lion's Mane</td><td>None</td><td>200mg</td></tr>
<tr><td>Electrolytes</td><td>None or minimal</td><td>255mg ionic blend</td></tr>
<tr><td>Sugar</td><td>0–27g</td><td>Low sugar</td></tr>
<tr><td>Cognitive modulation</td><td>None</td><td>L-Theanine + Lion's Mane</td></tr>
<tr><td>Activation profile</td><td>High spike</td><td>Linear sustained</td></tr>
<tr><td>Exit profile</td><td>Hard crash</td><td>Clean linear exit</td></tr>
<tr><td>Systemic debt</td><td>High</td><td>Zero</td></tr>
</tbody>
</table>
<h2>> The Afternoon Window</h2>
<p>The afternoon cognitive window — roughly 1:00 PM to 5:00 PM — is the highest-value performance period in the professional day for most knowledge workers. Decisions made in this window are frequently the most consequential. The quality of thinking in this window determines outcomes.</p>
<p>Standard energy drinks are not designed for this window. Their dosing, their ingredient architecture, and their activation profile are all calibrated for different use cases. Using them in the afternoon cognitive window is a category error — not because they are bad products, but because they were built for different jobs.</p>
<p>hydrbrew° was built specifically for the 2:15 PM window. Zero systemic debt. The afternoon stays yours.</p>
    `.trim(),
  },
  {
    id: 102,
    title: "Bang Energy vs. hydrbrew°",
    excerpt: "300mg triggers anxiety in meetings. Why 85mg buffered works better for the afternoon cognitive window.",
    image: "https://i.imgur.com/b5qCx4B.png",
    author: "hydrbrew° Research",
    readTime: "6 min read",
    date: "May 26, 2026",
    category: "Comparison",
    contentHtml: `
<p><strong>Bang Energy vs. hydrbrew°: The 300mg Problem and Why More Caffeine Is the Wrong Answer at 2:15 PM.</strong></p>
<p>Why the professional who reaches for Bang in the afternoon is using a pre-workout in a boardroom.</p>
<hr>
<h2>> The 300mg Problem</h2>
<p><strong>Bang Energy's 300mg caffeine dose pushes most professionals past the clean performance window into anxiety, jitters, and fragmented attention. At 2:15 PM, when your cortisol is naturally declining and your system is entering recovery mode, 300mg is not a performance upgrade. It is a physiological override that your body will fight.</strong></p>
<p>The research on caffeine and performance follows an inverted U-curve. Performance improves with increasing doses up to approximately 100mg in most individuals, then plateaus, then begins to decline as anxiety and attention fragmentation increase. At 300mg consumed during the afternoon cortisol decline, you are well past the peak of that curve.</p>
<p>What Bang delivers at 2:15 PM is not sustained performance. It is a stimulant override that feels like energy but produces the cognitive noise signature of elevated cortisol — fast-moving thoughts without the depth to execute on them.</p>
<h2>> The Architecture Problem</h2>
<p>Bang was designed for the gym. Its formula — high-dose caffeine, BCAAs, creatine, and CoQ10 — is targeted at pre-workout performance, not afternoon cognitive output. At 300mg, the caffeine load is calibrated for an athlete about to move through 60–90 minutes of high-intensity physical activity that will metabolize the cortisol response naturally.</p>
<p>Sitting at a desk, the cortisol spike has nowhere to go. It accumulates as background anxiety, depletes available working memory, and accelerates the attention fragmentation that is the opposite of the sustained executive function you actually need.</p>
<h2>> The Formulation Comparison</h2>
<table>
<thead><tr><th>Feature</th><th>Bang Energy (16oz)</th><th>hydrbrew° (12oz)</th></tr></thead>
<tbody>
<tr><td>Caffeine</td><td>300mg conventional</td><td>85mg buffered</td></tr>
<tr><td>L-Theanine</td><td>None</td><td>200mg</td></tr>
<tr><td>Lion's Mane</td><td>None</td><td>200mg</td></tr>
<tr><td>Sugar</td><td>0g</td><td>Low sugar</td></tr>
<tr><td>Electrolytes</td><td>Sodium / potassium</td><td>255mg ionic blend</td></tr>
<tr><td>Calories</td><td>0</td><td>20</td></tr>
<tr><td>Primary occasion</td><td>Pre-workout</td><td>Afternoon cognitive window</td></tr>
<tr><td>Activation profile</td><td>Hard spike</td><td>Linear sustained</td></tr>
<tr><td>Exit profile</td><td>Hard crash</td><td>Clean linear exit</td></tr>
<tr><td>Cortisol impact at 2 PM</td><td>High — activates HPA axis</td><td>Low — stays below threshold</td></tr>
</tbody>
</table>
<h2>> The Anxiety Threshold</h2>
<p><strong>The anxiety threshold is real, it is measurable, and at 2:15 PM your threshold is lower than it was at 9 AM.</strong></p>
<p>Cortisol follows a natural daily rhythm. It peaks in the morning and declines through the afternoon. When cortisol is low, your sensitivity to stimulant-induced cortisol spikes increases. A 300mg dose that might feel manageable in the morning becomes genuinely destabilizing in the afternoon because your baseline is already depleted.</p>
<p>85mg buffered caffeine stays below the threshold at all points in the cortisol cycle, including the afternoon trough. That is the design intent. It is not timid dosing — it is precision dosing for the occasion that actually matters.</p>
<p>Zero systemic debt. The afternoon stays yours.</p>
    `.trim(),
  },
  {
    id: 103,
    title: "Celsius vs. hydrbrew°",
    excerpt: "200mg built for workouts, not 2 PM desk work. The occasion gap that matters.",
    image: "https://i.imgur.com/nGsStwV.png",
    author: "hydrbrew° Research",
    readTime: "6 min read",
    date: "May 26, 2026",
    category: "Comparison",
    contentHtml: `
<p><strong>hydrbrew° vs. Celsius: Same Professional, Different Architecture.</strong></p>
<p>Why the woman who built her morning on Celsius is reaching for something different at 2:15 PM.</p>
<hr>
<h2>> Is Celsius Good for Afternoon Energy?</h2>
<p><strong>Celsius is optimized for morning workouts, not afternoon desk work. Its 200mg caffeine dose and thermogenic blend trigger cortisol spikes at 2 PM when your system is moving toward recovery. 85mg buffered caffeine with L-Theanine works with your cortisol cycle instead of against it.</strong></p>
<p>Celsius earned its position in the professional female market honestly. Clean label, no artificial preservatives, a fitness-forward positioning that resonated with the health-conscious professional consumer who had already left sugary energy drinks behind. If you are a Celsius drinker, you already understand that what you put in your body matters. You have already made the upgrade once.</p>
<p>This is not an argument that Celsius is a bad product. It is an argument that it was built for a different occasion than the one you are using it at 2:15 PM.</p>
<h2>> What Celsius Was Built For</h2>
<p>Celsius was engineered around fitness occasions — pre-workout, morning activation, and metabolic support. Its MetaPlus blend combines caffeine (200mg), green tea extract, guarana, and ginger to produce a thermogenic effect designed to support calorie burn during physical activity. The 200mg caffeine dose is calibrated for a workout, not a workday.</p>
<p>For a 45-minute training session, this profile is well-designed. The activation is strong; the thermogenic compounds support the calorie burn the session requires; the cortisol spike is metabolized naturally through physical exertion.</p>
<p>At a standing desk at 2:15 PM, there is no physical exertion to metabolize the cortisol load. What remains is elevated heart rate, ambient anxiety, and a stimulant dose that peaks and crashes inside the afternoon cognitive window you needed most.</p>
<h2>> The Occasion Gap</h2>
<p>This is the core distinction between Celsius and hydrbrew° — and it is not a quality argument, it is an occasion argument.</p>
<p>Celsius is a morning and fitness product. It is designed to be consumed before physical activity or as a morning activation tool. Its thermogenic compounds support calorie burn. Its 200mg caffeine dose is appropriate for a session that will metabolize the cortisol load naturally.</p>
<p>hydrbrew° is an afternoon precision product. It is designed for the 2:15 PM cognitive performance window — the moment that requires sustained executive function, not elevated heart rate. Its 85mg buffered caffeine stays below the anxiety threshold. Its L-Theanine modulation converts activation into focused calm. Its Lion's Mane supports the cognitive depth that the back half of the professional day requires.</p>
<p>The Celsius drinker who reaches for a second Celsius at 2 PM is using a morning fitness tool for an afternoon cognitive occasion. The product was not designed to fail her — it was designed for a different job.</p>
<h2>> The Formulation Comparison</h2>
<table>
<thead><tr><th>Feature</th><th>Celsius (12oz)</th><th>hydrbrew° (12oz)</th></tr></thead>
<tbody>
<tr><td>Caffeine</td><td>200mg conventional</td><td>85mg buffered</td></tr>
<tr><td>L-Theanine</td><td>None</td><td>200mg</td></tr>
<tr><td>Lion's Mane</td><td>None</td><td>200mg</td></tr>
<tr><td>Thermogenic blend</td><td>Yes — MetaPlus</td><td>No</td></tr>
<tr><td>Electrolytes</td><td>Minimal</td><td>255mg ionic</td></tr>
<tr><td>Sugar</td><td>0g</td><td>Low sugar</td></tr>
<tr><td>Calories</td><td>10</td><td>20</td></tr>
<tr><td>Primary occasion</td><td>Pre-workout / morning</td><td>Afternoon cognitive window</td></tr>
<tr><td>Activation profile</td><td>High spike</td><td>Linear sustained</td></tr>
<tr><td>Exit profile</td><td>Moderate crash</td><td>Clean linear exit</td></tr>
</tbody>
</table>
<h2>> The Woman Who Uses Both</h2>
<p>The most honest framing is not Celsius vs. hydrbrew° — it is Celsius in the morning and hydrbrew° in the afternoon. These products are not competitors for the same occasion. They are complements across different windows of the day.</p>
<p>The professional woman who starts her morning with Celsius before a workout or as a morning activation is making a well-considered choice for that occasion. The same woman who reaches for a second Celsius at 2:15 PM because there is no better option is making a forced choice rather than a considered one.</p>
<p>hydrbrew° is the better option she was reaching for. Zero systemic debt. The afternoon stays yours.</p>
    `.trim(),
  },
];

// ── Article Modal ───────────────────────────────────────────────────────────

function ArticleModal({ article, onClose }: { article: Article; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 md:py-16">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="fixed top-6 right-6 z-20 p-3 bg-[#00FFFF]/10 border-2 border-[#00FFFF]/30 hover:border-[#00FFFF] rounded-xl text-[#00FFFF] hover:bg-[#00FFFF]/20 transition-all"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <article className="bg-[#0A0A0A] border-2 border-[#00FFFF]/20 rounded-3xl overflow-hidden">
          {/* Hero image */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />
            <div className="absolute top-6 left-6">
              <span className="px-3 py-1 bg-[#00FFFF]/20 border border-[#00FFFF] text-[#00FFFF] text-xs font-mono uppercase tracking-wider rounded-full">
                {article.category}
              </span>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {/* Title */}
            <h2
              className="text-3xl md:text-5xl text-white font-bold mb-6 leading-tight"
              style={{ fontFamily: "'Urbanist', sans-serif" }}
            >
              {article.title}
            </h2>

            {/* Meta row */}
            <div
              className="flex flex-wrap items-center gap-6 text-sm text-white/60 mb-8 pb-8 border-b border-[#00FFFF]/20"
              style={{ fontFamily: "'Roboto Mono', monospace" }}
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#00FFFF]" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00FFFF]" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#00FFFF]" />
                <span>{article.date}</span>
              </div>
            </div>

            {/* Article content */}
            <div
              className="hb-article-content"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />

            {/* Footer */}
            <div className="mt-10 pt-8 border-t border-[#00FFFF]/20 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                ← Close
              </button>
              <div className="text-sm text-white/40 font-mono">End of transmission //</div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

// ── Section ─────────────────────────────────────────────────────────────────

function HbBlog(props: HydrogenComponentProps) {
  const { ...rest } = props;
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <>
      <section id="knowledge-base" {...rest} className="relative py-24 bg-black overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-150 h-150 bg-[#00FFFF]/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/3 left-1/3 w-125 h-125 bg-purple-500/10 rounded-full blur-[150px]" />
        </div>
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(#00FFFF 1px,transparent 1px),linear-gradient(90deg,#00FFFF 1px,transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <p
              className="text-[#00FFFF] text-sm mb-4 uppercase tracking-wider"
              style={{ fontFamily: "'Roboto Mono',monospace" }}
            >
              KNOWLEDGE BASE // COGNITIVE ARCHIVE
            </p>
            <h2
              className="text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-6 leading-tight"
              style={{ fontFamily: "'Urbanist',sans-serif" }}
            >
              High-Resolution<br />
              <span className="text-[#00FFFF]">Intelligence</span>
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
              <div className="relative h-125 overflow-hidden">
                <img
                  src={articles[0].image}
                  alt={articles[0].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-[#00FFFF]/20 border border-[#00FFFF] text-[#00FFFF] text-xs font-mono uppercase tracking-wider rounded-full">
                    Featured
                  </span>
                  <span className="text-white/60 text-sm">{articles[0].category}</span>
                </div>
                <h3
                  className="text-3xl md:text-4xl text-white font-bold mb-4 group-hover:text-[#00FFFF] transition-colors"
                  style={{ fontFamily: "'Urbanist',sans-serif" }}
                >
                  {articles[0].title}
                </h3>
                <p className="text-lg text-white/70 mb-6 max-w-3xl">{articles[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="hidden md:flex items-center gap-6 text-sm text-white/60">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" /><span>{articles[0].author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" /><span>{articles[0].readTime}</span>
                    </div>
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
                  <img
                    src={article.image}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0A0A0A] to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-sm border border-[#00FFFF]/30 text-[#00FFFF] text-xs font-mono uppercase tracking-wider rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl text-white font-bold mb-3 group-hover:text-[#00FFFF] transition-colors line-clamp-2"
                    style={{ fontFamily: "'Urbanist',sans-serif" }}
                  >
                    {article.title}
                  </h3>
                  <p className="text-sm text-white/60 mb-4 line-clamp-2">{article.excerpt}</p>
                  <div className="hidden md:flex items-center justify-between text-xs text-white/40 mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
                    <span>{article.date}</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setSelectedArticle(article); }}
                    className="flex items-center gap-2 text-[#00FFFF] font-semibold hover:gap-3 transition-all"
                  >
                    Read More<ArrowRight className="w-4 h-4" />
                  </button>
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
                  onClick={() => setSelectedArticle(c)}
                  className="group relative overflow-hidden rounded-xl border border-white/10 hover:border-[#00FFFF]/60 transition-all bg-[#0A0A0A] text-left"
                >
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0A0A0A] to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3
                      className="text-sm text-white font-bold mb-2 group-hover:text-[#00FFFF] transition-colors line-clamp-2"
                      style={{ fontFamily: "'Urbanist',sans-serif" }}
                    >
                      {c.title}
                    </h3>
                    <p className="text-xs text-white/50 line-clamp-2 mb-2">{c.excerpt}</p>
                    <span className="text-xs text-[#00FFFF]/60 font-mono">{c.readTime}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedArticle && (
        <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      )}
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
