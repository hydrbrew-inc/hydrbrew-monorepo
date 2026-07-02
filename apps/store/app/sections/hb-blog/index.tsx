import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { useState, useEffect } from "react";
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
    title: "The Afternoon Manifesto: A Structural Correction for the Second Half of Your Day",
    excerpt: "The problem was never caffeine. Most high-output professionals treat the afternoon fade as an unavoidable cost of doing serious work. It's not. It's a formulation problem.",
    image: "https://i.imgur.com/f8a6GyL.jpeg",
    author: "hydrbrew° Research",
    readTime: "8 min read",
    date: "May 20, 2026",
    category: "Manifesto",
    contentHtml: `
<p>The problem was never caffeine. Most high-output professionals treat the afternoon fade as an unavoidable cost of doing serious work. The cognitive fog arrives at 2:15 PM like clockwork. Processing slows. The options feel binary — another coffee, an energy drink, or surrender. By 4 PM, you are dehydrated, running on cortisol interference, and borrowing from your evening to finish what should have been easy. This is not a willpower problem. It is a formulation problem. You are operating on biological debt — an energy architecture designed for a different era, running on hardware that has never been updated. The afternoon doesn't have to cost you what it's costing you.</p>
<h2>The Case for Cognitive Architecture</h2>
<p>We are past the era of reactive consumption. The professionals building what comes next need sustained cognitive output — not a morning spike that burns out by noon, nor an afternoon loan that gets repaid with disrupted sleep and a foggy evening. What the best work requires is interference-free focus throughout the day. Not more stimulation. A better architecture.</p>
<p>The stimulants of the last century were engineered for a different kind of output. What the next decade demands is precision — the ability to direct your cognitive resources without fatigue, cortisol interference, or systemic depletion that taxes the system from within.</p>
<h2>What We Built and Why</h2>
<p>We didn't set out to build a better coffee. We set out to fix the afternoon. The ritual of coffee — the sensory signal that initiates focus — is worth preserving. What needed correcting was the delivery mechanism. High caffeine, at the wrong dose and at the wrong time, creates cortisol interference. The afternoon fade isn't caffeine leaving your system. It's caffeine doing exactly what it was always going to do at that dose and at that hour.</p>
<p>hydrbrew° is the structural correction.</p>
<ul>
<li><strong>85mg buffered caffeine</strong> — below the threshold that triggers a meaningful cortisol response in most people. Enough to sharpen the afternoon. Not enough to cost you the evening.</li>
<li><strong>200mg L-Theanine</strong> — takes the edge off the caffeine signal. Focus that holds without the pressure building behind it. The alpha-wave modulation layer that changes a volatile spike into a sustained, interference-free output state.</li>
<li><strong>200mg Lion's Mane</strong> — executive function depth in hours three and four, when standard caffeine has already faded, and most people are operating on reserves. This is the ingredient that keeps your thinking sharp when everything else starts to drift.</li>
<li><strong>255mg ionic electrolytes</strong> — coffee is dehydrating by nature. We fixed the math. Sodium, potassium, magnesium — the cellular baseline your brain requires to stay in the work with you. Dehydration is half the afternoon fade. We built the correction into the can.</li>
</ul>
<p>Zero systemic debt. The night stays yours.</p>
<h2>Who This Is For</h2>
<p>The future will not be built by people living in biological debt. It will be built by people who understood that the afternoon is not something to survive — it is the second half of the day, and it deserves the same precision as the first.</p>
<p>You are already tracking your output. You already know the 2:15 PM window is real. You've already felt the cost of getting it wrong — the sluggish meeting, the decision you second-guessed, the evening you couldn't turn off because the caffeine was still running.</p>
<p>hydrbrew° is not a performance enhancer. It is a calibration. A structural correction to the afternoon architecture that has been running the same legacy code for a hundred years. We started with the problem. The 2:15 PM window — when cortisol rises, morning caffeine precision degrades, and high-output professionals start borrowing from their evening to finish the day. We engineered the structural correction first: 85mg buffered caffeine, 200mg L-Theanine, 200mg Lion's Mane, 255mg ionic electrolytes. Zero systemic debt.</p>
<p><em>This is what advancing coffee looks like. Stop reacting. Start directing. Not energy. Not recovery. A calibrated system that runs clean, exits clean, and leaves no debt on the operating baseline. The afternoon stays yours.</em></p>
    `.trim(),
  },
  {
    id: 2,
    title: "The Attention Economy Has a Caffeine Problem",
    excerpt: "Why the most valuable asset in the digital age is the one most people are actively depleting — and what a structural correction actually looks like.",
    image: "https://i.imgur.com/d0nlyo5.png",
    author: "hydrbrew° Research",
    readTime: "10 min read",
    date: "May 22, 2026",
    category: "Analysis",
    contentHtml: `
<p>There is a version of focus that most high-output professionals have never actually experienced in the afternoon. Not managed attention — the kind where you're technically present in the room but running on cortisol and willpower, catching every third word and filling in the rest. Not caffeinated alertness — the kind that feels productive but produces work you revise in the morning when you can see it clearly. Actual focus. The kind where the signal is clean, the decision is precise, and the output reflects what you're actually capable of.</p>
<p>For most people, that state exists in the morning and disappears by 2:15 PM. Not because they stop trying. Because the architecture they're running on was never designed for the second half of the day.</p>
<h2>The Continuous Engagement Problem</h2>
<p>The modern professional workday is no longer a series of discrete tasks. It is continuous engagement — a live stream of decisions, reactions, interpretations, and outputs that runs from the first notification of the morning to the last message at night. In that environment, the quality of your attention is not a soft metric. It is the primary variable that determines the quality of everything you produce.</p>
<p>A founder at a 2:30 PM board meeting who is managing cortisol interference rather than processing information is not making precise decisions. They are making adequate ones. The difference between adequate and precise, compounded across the decisions that matter, is the difference between the company they're building and the one they could be building. This is not a willpower problem. It is an infrastructure problem. And most people are solving it using tools designed for a different kind of work.</p>
<h2>Legacy Stimulants Were Built for a Different Output</h2>
<p>The standard caffeine delivery model was engineered for physical labor — a hard, fast spike of activation that got the body moving. For knowledge work, specifically the high-bandwidth, continuous-engagement knowledge work that defines the modern professional environment, it is the wrong tool.</p>
<p>High-dose caffeine in the afternoon produces what looks like energy and functions like noise. The cortisol spike elevates anxiety, degrades the quality of attention, and creates the distinctive 2:15 PM state: activated but not sharp, present but not precise. Add the glycemic instability from lunch and the natural cortisol decline that occurs in the early afternoon regardless of caffeine intake, and the result is a predictable system failure at exactly the moment the day demands the most.</p>
<p>The response most professionals have developed — another coffee, an energy drink, more caffeine at a higher dose — doesn't solve the architecture problem. It borrows against the evening to extend a state that was already degraded. The debt gets paid in disrupted sleep, a harder morning, and a baseline that requires progressively more input to maintain the same output. The system is not optimized. It is running in debt.</p>
<h2>What a Structural Correction Actually Looks Like</h2>
<p>The solution to an architecture problem is not more of what caused it. It is a different architecture.</p>
<ul>
<li><strong>85mg buffered caffeine</strong> — enough to activate clean cognitive function, below the threshold that triggers the cortisol spike in most people. The signal without the noise.</li>
<li><strong>200mg L-Theanine</strong> — the compound that converts stimulation into focus. Alpha-wave modulation produces the cognitive state that high-dose caffeine approximates but never quite delivers — alert, precise, interference-free. This is the reason green tea and espresso at equivalent caffeine levels produce measurably different cognitive states.</li>
<li><strong>200mg Lion's Mane</strong> — executive function support during hours three and four of the afternoon, when standard caffeine has already peaked and begun to decline. Peer-reviewed research on Lion's Mane and sustained cognitive performance is the most rigorous among adaptogens. This is not a wellness ingredient. It is a performance ingredient with a specific mechanism and documented outcomes.</li>
<li><strong>255mg ionic electrolytes</strong> — sodium, potassium, and magnesium. Coffee is dehydrating. A measurable portion of the afternoon fade is cellular dehydration masquerading as cognitive fatigue. We built the correction into the formulation, so the infrastructure stays operational while everything else does its work.</li>
</ul>
<p>Together these four ingredients don't push you higher. They remove what was pulling you down. The cortisol interference clears. The cognitive noise drops. What remains is the quality of attention you were always capable of — running on a baseline that isn't borrowed.</p>
<h2>The Afternoon as Competitive Advantage</h2>
<p>The professionals who figure out the afternoon first have a structural advantage that compounds. Every precise decision made at 4 PM instead of an adequate one. Every creative call that required a breakthrough instead of an autocomplete. Every conversation where the other person in the room was managing their energy and you weren't. These are not dramatic differences in the moment. Over time they are the difference between the work you did and the work you could have done.</p>
<p>The afternoon is not the back half of the day. It is the second shift — the hours where the real problems get solved or deferred, where the decisions that looked complex in the morning either get made or get pushed. The professionals who treat it that way, who bring the same infrastructure to 2:15 PM as they bring to 9 AM, are not working harder. They are working on a better operating system.</p>
<h2>What Zero Systemic Debt Actually Means</h2>
<p>Every stimulant is a negotiation with your future self. The question is always the same: what am I borrowing, and when does the bill arrive? The standard model borrows from your evening, your sleep architecture, and your next morning's baseline. The debt is real, and it compounds.</p>
<p>hydrbrew° was built on a different premise. The 85mg buffered caffeine doesn't borrow. The L-Theanine doesn't deplete. The Lion's Mane doesn't spike. The electrolytes restore what coffee takes. You finish the afternoon at the same baseline you started it — not elevated and crashing, not depleted and managing. Operational. Precise.</p>
<p><em>Zero systemic debt means the night is yours. The 5 PM decision is as clean as the 9 AM one. The next morning starts where it should. This is what advancing coffee looks like. The afternoon stays yours.</em></p>
    `.trim(),
  },
  {
    id: 3,
    title: "From the Afternoon Fade to Interference-Free Focus",
    excerpt: "The origin story of hydrbrew° and why we reimagined the second half of the day.",
    image: "https://i.imgur.com/qCYobqP.png",
    author: "hydrbrew° Research",
    readTime: "12 min read",
    date: "May 24, 2026",
    category: "Origin Story",
    contentHtml: `
<p>I used to think the afternoon fade was just part of the deal. Push hard in the morning, hit your peak somewhere around 11, and by 2:15 you're managing. Reaching for another coffee. Quietly recalibrating what the next three hours could produce. Telling yourself the important work is done and now it's just execution.</p>
<p>I ran on that assumption for years. High-output mornings, diminishing afternoons, and a caffeine habit that kept escalating the dose to maintain the baseline. Double espresso became triple. The pre-workout powder made an appearance. And every time I pushed through, I was borrowing against the next day — cortisol debt, disrupted sleep, and wired-but-unfocused energy that felt productive but wasn't. The real cost wasn't the fade. It was the quality of thinking during the hours I was supposedly functional.</p>
<h2>The Moment the Assumption Broke</h2>
<p>I was in a meeting at 2:30 PM. An important room. A decision that mattered. I had a nitro cold brew in hand, and I was, by any external measure, present. But I wasn't sharp. I was managing — my energy, my attention, and the gap between where I was and where I needed to be. Cortisol interference was high. The signal was noisy. The decision I made in that room was adequate, not precise.</p>
<p>I walked out and started asking a different question. Not how do I get more energy — but why is the baseline this low in the first place?</p>
<h2>What the Research Actually Shows</h2>
<p>What I found was not complicated. It had been hiding in plain sight. The standard caffeine delivery model is blunt. It hits fast, peaks hard, and exits through a cortisol response that leaves you activated but unfocused — high amplitude, low resolution. You feel like you're working, but the quality of your attention is degraded.</p>
<p>Add the glycemic instability from lunch and the natural cortisol decline that occurs in the early afternoon, regardless of what you've consumed, and you have a predictable system failure at 2:15 PM — dressed up as normal. The solution wasn't more caffeine. It was a different architecture:</p>
<ul>
<li><strong>85mg buffered caffeine</strong> — below the threshold that triggers a meaningful cortisol response in most people, yet above the threshold for clean cognitive activation. Not a jolt. A sustained, even signal that sharpens the afternoon without borrowing from the evening.</li>
<li><strong>200mg L-Theanine</strong> — modulates caffeine's rough edges, promotes alpha-wave activity, and turns stimulation into focus. This is why green tea produces a different cognitive state than espresso at equivalent caffeine levels. The focus holds without the pressure building behind it.</li>
<li><strong>200mg Lion's Mane</strong> — executive function depth in hours three and four, when standard caffeine has already faded. Peer-reviewed research on Lion's Mane and cognitive function is among the most rigorous in the adaptogen category — nerve growth factor support, executive decision-making under cognitive load, and sustained performance through the latter half of the day.</li>
<li><strong>255mg ionic electrolytes</strong> — sodium, potassium, and magnesium. This is the piece most formulations miss entirely. Coffee is dehydrating by nature. Dehydration is measurably responsible for a significant portion of what we experience as the afternoon fade. We fixed the math and built the correction into the can.</li>
</ul>
<p>Together, these four don't amplify your state. They remove what was degrading it. Cortisol interference clears. Cognitive noise drops. What remains is the signal you were always capable of running on — just without the debt.</p>
<h2>Why Iced Coffee</h2>
<p>Because the afternoon ritual already exists. At 2:15, high-output professionals reach for something. The behavior is locked in. What we changed was what they were reaching for. Cold brew as the base delivers clean extraction — lower acidity, a smoother profile, and no heat degradation of the functional compounds. The can format makes it ambient — it fits the 2:15 PM moment without requiring a barista, a blender, or a ritual that interrupts work. You open it, you drink it, and the afternoon changes. Light and crisp. Lightly sweetened with coconut sugar. No residue. No cortisol interference six hours later, because there was no spike to come down from.</p>
<h2>What Zero Systemic Debt Actually Means</h2>
<p>Every stimulant you take is a negotiation with your future self. The question is always: what am I borrowing, and when do I pay it back? The standard energy drink model borrows heavily. Two hours of elevated output, paid back in disrupted sleep, elevated baseline anxiety, and a tolerance curve that keeps requiring more to achieve less. The debt compounds. The baseline erodes.</p>
<p>hydrbrew° was built on a different premise. The 85mg buffered caffeine doesn't borrow. The L-Theanine doesn't deplete. The Lion's Mane doesn't spike. The electrolytes don't leave a deficit. You finish the afternoon at the same baseline you started it — not elevated and crashing, not depleted and managing. Operational. Clear.</p>
<p>Zero systemic debt means the night is yours. It means the decision you make at 5 PM is as precise as the one you made at 9 AM. It means the next morning starts clean. That is what we built. Not a better stimulant. A different relationship with the afternoon entirely.</p>
<h2>Who This Is For</h2>
<p>hydrbrew° is not a mass-market energy play. It is not a wellness brand with a nootropic on the label for optics. It is not trying to replace your morning coffee. It is built for the professional who has already figured out that the afternoon is where the real work gets done — or doesn't. The founder who needs the 4 PM call to be as sharp as the 9 AM call. The creative director who can't afford to autocomplete when the brief needs a breakthrough. The person who looked at the 2:15 PM fade and decided it was a formulation problem, not an inevitability.</p>
<p><em>We started with the problem. The 2:15 PM window — when cortisol rises, morning caffeine precision degrades, and high-output professionals start borrowing from their evening to finish the day. We engineered the structural correction: 85mg buffered caffeine, 200mg L-Theanine, 200mg Lion's Mane, 255mg ionic electrolytes. Zero systemic debt. This is what advancing coffee looks like. The afternoon stays yours.</em></p>
    `.trim(),
  },
  {
    id: 4,
    title: "Biohacker's Guide: Stacking Adaptogens with Low-Dose Caffeine",
    excerpt: "How to combine functional ingredients for sustained afternoon cognitive output — and why the dose matters more than the compound.",
    image: "https://i.imgur.com/XJwgah6.png",
    author: "hydrbrew° Research",
    readTime: "9 min read",
    date: "May 24, 2026",
    category: "Biohacking",
    contentHtml: `
<p>The biohacking community has known for years what the mainstream beverage industry is only now beginning to recognize: caffeine alone is a blunt instrument. High-dose caffeine delivers amplitude without resolution. You feel activated, but the quality of that activation — the signal-to-noise ratio of your cognitive output — is often degraded by the cortisol response, heightened anxiety, and the attention fragmentation that accompanies it. The energy is real. The focus is borrowed. The smarter play is to stack. Understanding how adaptogens, nootropics, and low-dose caffeine interact is the difference between interference-free afternoon focus and a wired, depleted state.</p>
<h2>Why Low-Dose Caffeine Is the Foundation</h2>
<p>Before you build a stack, understand why the dose matters more than the compound. Caffeine's performance curve is not linear. At low to moderate doses — roughly 40mg to 100mg — it produces clean adenosine blockade, improved reaction time, and elevated mood without triggering the HPA axis response that causes a cortisol spike. Above that threshold, especially in individuals with slower CYP1A2 caffeine metabolism, the cortisol interference, attention fragmentation, and elevated anxiety begin to outweigh the cognitive benefits.</p>
<p>The standard energy drink delivers 150–300mg per serving. A double espresso delivers 130–180mg. Both exceed the clean performance window for most people in the afternoon. 85mg is the target. Below the spike threshold for most people. Above the activation floor. The dose at which caffeine does its job without the cortisol interference it's known for at higher doses. Build the stack from here.</p>
<h2>The Core Stack: Caffeine + L-Theanine</h2>
<p>This is the most well-researched cognitive combination in the nootropic literature. It works — and the mechanism is well understood. L-Theanine is an amino acid naturally found in green tea that promotes alpha-wave brain activity — the state associated with relaxed alertness, creative flow, and sustained focus. On its own, it produces a settled, slightly meditative effect. Combined with caffeine, something more precise happens.</p>
<p>L-Theanine smooths caffeine's rough edges — reducing the cortisol response, attenuating anxiety, and extending the focus window without blunting activation. The combination produces what researchers describe as alert calmness — a cognitive state measurably distinct from either compound alone. The 2:1 L-Theanine-to-caffeine ratio is the most studied protocol. At 85mg of caffeine, 200mg L-Theanine is the performance-optimized dose used in most clinical contexts and consistently produces the clearest results in the peer-reviewed literature.</p>
<p>What you experience: The activation arrives without the edge. Focus is sustained rather than peaked. The exit is clean — no hard afternoon fade because there was no hard cortisol spike to come down from.</p>
<h2>Adding Lion's Mane: The Executive Function Layer</h2>
<p>L-Theanine manages modulation. Lion's Mane manages depth. Hericium erinaceus — Lion's Mane mushroom — is the most rigorously studied nootropic adaptogen for sustained cognitive function. The active compounds, hericenones and erinacines, stimulate nerve growth factor synthesis, supporting neuroplasticity, synaptic density, and the sustained executive function that typically degrades under cognitive load and time pressure.</p>
<p>In practical terms: L-Theanine keeps focus interference-free. Lion's Mane keeps your thinking sharp in hours three and four — when standard caffeine has already peaked and most people are operating on reserves. The two compounds work through different mechanisms and compound without conflict. The dose: 200mg of Lion's Mane extract is the entry-level functional dose. Look for dual-extracted formulas — both water- and alcohol-extracted — to ensure the full compound profile is bioavailable.</p>
<p>What you experience: Less immediately noticeable than caffeine or L-Theanine alone. Lion's Mane operates beneath the surface — the difference shows up in decision quality, working memory under load, and the absence of the cognitive degradation that usually arrives in the third hour of deep work.</p>
<h2>The Electrolyte Layer: The Most Overlooked Variable</h2>
<p>Cognitive performance is directly tied to hydration status. A 1–2% drop in body water produces measurable declines in attention, short-term memory, and processing speed. Most professionals operating in temperature-controlled offices, running on coffee through the morning, are chronically mildly dehydrated by mid-afternoon. The fatigue they attribute to the afternoon fade is, in measurable part, cellular dehydration.</p>
<p>Ionic electrolytes — sodium, potassium, magnesium — don't simply hydrate. They support the electrical signaling that underlies neural function at the cellular level. Magnesium in particular is the most commonly deficient mineral in high-stress professional populations, and its role in NMDA receptor function makes it directly relevant to the quality of focused cognition. The dose: 255mg of ionic electrolytes — the specific mineral profile that addresses the dehydration variable that most afternoon stacks ignore entirely. Coffee is naturally dehydrating. A functional afternoon stack that doesn't address hydration is solving half the problem.</p>
<h2>Timing the Stack</h2>
<p>When matters as much as what. Caffeine's half-life is approximately 5–6 hours for fast CYP1A2 metabolizers — and 7–9 hours for slow metabolizers, who make up roughly half the population. An 85mg dose taken at 2:00 PM will be approximately 40mg circulating at 7–8 PM for a fast metabolizer — low enough not to interfere with sleep onset. A 150mg dose taken at the same time is still 75mg circulating at 7–8 PM, which meaningfully degrades sleep latency and sleep architecture in most people.</p>
<p>The low-dose stack is engineered for the afternoon window. The 2:00–2:30 PM deployment aligns with the natural circadian cortisol decline, extends the productive window into the late afternoon, and clears before sleep architecture is affected.</p>
<p>The protocol:</p>
<ul>
<li>Deploy at 1:30–2:30 PM — no later than 3:00 PM for individuals with slower caffeine metabolism</li>
<li>Do not stack with additional caffeine sources in the same window</li>
<li>Hydrate before — the electrolytes perform better on a pre-hydrated baseline</li>
<li>If you are unsure of your CYP1A2 metabolizer type, start at 1:30 PM and observe sleep quality for one week</li>
</ul>
<h2>The Stack in Full</h2>
<p>The cognitive stack that holds up under scrutiny is not complicated: 85mg buffered caffeine · 200mg L-Theanine · 200mg Lion's Mane · 255mg ionic electrolytes. Together, these four don't push you past your ceiling. They remove what was pulling you below your floor. The cortisol interference clears. The cognitive noise drops. What remains is the signal you have always been operating on — running clean, without debt.</p>
<p>The afternoon performance problem is not a motivation, discipline, or caffeine-quantity problem. It is a formulation problem. The right stack, at the right dose and at the right time, produces a measurably different afternoon — not because it adds something artificial, but because it removes the interference that was always there.</p>
<p><em>Zero systemic debt. This is what advancing coffee looks like.</em></p>
<h2>References</h2>
<p style="font-size:0.85em;color:rgba(255,255,255,0.5);">Giesbrecht T et al. (2010). The combination of L-theanine and caffeine improves cognitive performance and increases subjective alertness. <em>Nutritional Neuroscience</em>, 13(6), 283–290. · Owen GN et al. (2008). The combined effects of L-theanine and caffeine on cognitive performance and mood. <em>Nutritional Neuroscience</em>, 11(4), 193–198. · Mori K et al. (2009). Improving effects of the mushroom Yamabushitake on mild cognitive impairment. <em>Phytotherapy Research</em>, 23(3), 367–372. · Grandjean AC et al. (2000). The effect of caffeinated, non-caffeinated, caloric and non-caloric beverages on hydration. <em>Journal of the American College of Nutrition</em>, 19(5), 591–600.</p>
    `.trim(),
  },
];

// ── Comparison articles ─────────────────────────────────────────────────────

const comparisons: Article[] = [
  {
    id: 100,
    title: "hydrbrew° vs. Red Bull",
    excerpt: "Why the professional woman stopped reaching for the blue and silver can — and the science behind why it matters.",
    image: "https://i.imgur.com/IOMVKF7.png",
    author: "hydrbrew° Research",
    readTime: "6 min read",
    date: "May 26, 2026",
    category: "Comparison",
    contentHtml: `
<p>If you have ever cracked open a Red Bull at 2 PM in a professional setting, you already know the arc. The activation arrives quickly, peaks around the 45-minute mark, and then the invoice arrives — cortisol interference and elevated anxiety, a cortisol spike that makes the next meeting harder than it needs to be, and a crash that starts around 3:30 and costs you the rest of the afternoon. You got the energy. You paid for it with the evening. Red Bull is not a bad product. It was just never designed for what you are asking it to do.</p>
<h2>What Red Bull Was Built For</h2>
<p>Red Bull was engineered for a specific occasion — short-burst activation in high-stimulation environments. Nightclubs, long drives, exam cram sessions. The 80mg of caffeine, combined with 27 grams of sugar and taurine, produces a fast, hard spike. For a 20-year-old pulling an all-nighter, that profile works. For a founder in a board meeting at 2:30 PM who needs precise, sustained cognitive output for the next four hours without elevated anxiety, it is the wrong architecture entirely.</p>
<p>The sugar load compounds the problem. The glycemic spike from 27 grams of sugar coincides with the caffeine hit, producing a combined energy peak that feels strong but drops off sharply. The glucose crash and the caffeine crash arrive in close succession. By 3:30 PM, you are managing two simultaneous deficits instead of one.</p>
<h2>The Side-by-Side Comparison</h2>
<table>
<thead><tr><th>Feature</th><th>Red Bull (8.4oz)</th><th>hydrbrew° (12oz)</th></tr></thead>
<tbody>
<tr><td>Caffeine</td><td>80mg conventional</td><td>85mg buffered</td></tr>
<tr><td>Sugar</td><td>27g</td><td>3g Coconut Sugar</td></tr>
<tr><td>L-Theanine</td><td>None</td><td>200mg</td></tr>
<tr><td>Lion's Mane</td><td>None</td><td>200mg</td></tr>
<tr><td>Electrolytes</td><td>None</td><td>255mg ionic</td></tr>
<tr><td>Calories</td><td>110</td><td>20</td></tr>
<tr><td>Crash profile</td><td>Hard exit, cortisol spike</td><td>Clean linear exit</td></tr>
<tr><td>Designed for</td><td>Short-burst activation</td><td>Sustained afternoon output</td></tr>
</tbody>
</table>
<h2>The Alternative That Was Actually Designed for Work</h2>
<p>hydrbrew° was built specifically for the professional performance window — the 2:15 PM moment when legacy stimulants start to show their cost. The architecture is different at every level.</p>
<p><strong>85mg buffered caffeine vs. Red Bull's 80mg.</strong> On paper, these numbers are close. In practice, they are not. Buffered caffeine is formulated to slow absorption and flatten the delivery curve — activation arrives more gradually, lasts longer, and leaves without the hard cortisol spike that conventional caffeine produces. The dose is calibrated to stay below the anxiety threshold, not to maximize the initial hit.</p>
<p><strong>200mg L-Theanine</strong> — the compound Red Bull lacks. L-Theanine is an amino acid naturally found in green tea that promotes alpha-wave brain activity — the state associated with focused calm rather than anxious activation. The reason green tea produces a different cognitive state than espresso at equivalent caffeine levels is L-Theanine. Red Bull has no equivalent. The result is activation without the edge — clean, sustained focus rather than wired fragmentation.</p>
<p><strong>200mg Lion's Mane</strong> — executive function under load. Lion's Mane mushroom extract supports nerve growth factor synthesis and the sustained executive decision-making that degrades under cognitive load. Research on Lion's Mane and cognitive function has been published in peer-reviewed journals and cited by institutions including the NIH. Red Bull has no equivalent.</p>
<p><strong>255mg ionic electrolytes</strong> — the hydration layer. Long hours in air-conditioned offices lead to chronic, mild dehydration. A 1–2% drop in body water causes measurable declines in attention and processing speed. Red Bull's diuretic effect from caffeine actively works against hydration. hydrbrew° builds the electrolyte layer — sodium, potassium, magnesium — to maintain the hardware baseline on which all of the above depend.</p>
<h2>Who Red Bull Is For vs. Who hydrbrew° Is For</h2>
<p>Red Bull is for the occasion that needs a fast, hard hit and doesn't care about the exit. That occasion exists. hydrbrew° is not for that occasion. hydrbrew° is for the professional who needs the 4 PM decision to be as precise as the 9 AM one. The founder who cannot afford elevated anxiety during a negotiation. The creative director who needs to generate, not just execute, in the back half of the day. The person who looked at the 2:15 fade and decided it was a system error, not an inevitability.</p>
<p>The alternative to Red Bull for work is not a product that tries to do what Red Bull does more cleanly. It is a product designed for a completely different objective — sustained precision output with a clean metabolic exit.</p>
<p><em>Red Bull delivers amplitude. hydrbrew° delivers resolution. Zero systemic debt. The afternoon stays yours.</em></p>
    `.trim(),
  },
  {
    id: 101,
    title: "Energy Drink vs. Functional Coffee",
    excerpt: "Why your 2:15 PM drink choice is costing you the evening — and what the research says about a better option.",
    image: "https://i.imgur.com/1f6wCBo.png",
    author: "hydrbrew° Research",
    readTime: "7 min read",
    date: "May 26, 2026",
    category: "Comparison",
    contentHtml: `
<p>The afternoon energy category is crowded. Red Bull, Monster, Bang, Celsius, Reign, C4 — every shelf in every convenience store is stacked with products promising sustained energy, focus, and performance. Most of them deliver the same thing: a fast caffeine spike, a sugar or artificial-sweetener load, and an eventual crash that leaves you somewhere between 2 and 6 hours later. The problem is not caffeine. The problem is architecture.</p>
<h2>How the Standard Energy Drink Model Works — and Where It Fails</h2>
<p>The conventional energy drink is built on a simple premise: deliver a large caffeine dose quickly, add stimulatory compounds like taurine and B vitamins for label depth, and produce a strong initial activation signal. It works. For approximately 90 minutes. After that, the cortisol spike — triggered by a rapid, high-dose caffeine hit — begins to decline. The glycemic response to sugar or the insulin spike from artificial sweeteners compounds the issue. Taurine and B vitamins are supporting actors who cannot carry the narrative once caffeine peaks and wears off. The result is a predictable system failure every afternoon, which the industry has dressed up as normal because everyone is experiencing it at the same time.</p>
<p>The average energy drink consumer has accepted the crash as the price of activation. They have optimized for the peak without questioning the cost of the exit.</p>
<h2>The Three Profiles Compared</h2>
<table>
<thead><tr><th></th><th>Standard Energy Drink</th><th>Standard Cold Brew</th><th>hydrbrew° Functional Iced Coffee</th></tr></thead>
<tbody>
<tr><td>Caffeine dose</td><td>150–300mg</td><td>150–200mg</td><td>85mg buffered</td></tr>
<tr><td>L-Theanine</td><td>None</td><td>None</td><td>200mg</td></tr>
<tr><td>Adaptogen</td><td>None</td><td>None</td><td>200mg Lion's Mane</td></tr>
<tr><td>Electrolytes</td><td>None</td><td>None</td><td>255mg ionic</td></tr>
<tr><td>Sugar</td><td>High</td><td>None</td><td>3g Coconut Sugar</td></tr>
<tr><td>Activation profile</td><td>Fast spike</td><td>Moderate spike</td><td>Linear sustained</td></tr>
<tr><td>Exit profile</td><td>Hard crash</td><td>Moderate crash</td><td>Clean linear exit</td></tr>
<tr><td>Sleep impact</td><td>Significant</td><td>Moderate</td><td>Minimal</td></tr>
<tr><td>Systemic debt</td><td>High</td><td>Moderate</td><td>Zero</td></tr>
</tbody>
</table>
<h2>Why Standard Cold Brew Is Not the Answer Either</h2>
<p>The professional who has already graduated from energy drinks often moves to cold brew — and improves their situation marginally. Cold brew is cleaner than a Red Bull. It has lower acidity, no sugar load, and an extraction process that produces a slightly different caffeine profile than hot-brewed coffee. But the fundamental problem remains. A standard cold brew delivers 150–200mg of conventional caffeine with no modulation layer. No L-Theanine. No adaptogen support. No electrolyte component. The blunt caffeine spike is smaller than a Bang Energy, but the architecture is identical — fast hit, cortisol response, hard exit, systemic debt.</p>
<p>The second cold brew of the afternoon compounds the problem. Cortisol on top of cortisol. A tolerance curve that keeps requiring more to achieve less. Disrupted sleep that degrades the next morning's baseline before the day even starts.</p>
<h2>What Functional Coffee Does Differently</h2>
<p>Functional coffee is not a marketing category. It is a formulation philosophy — the application of clinical-grade cognitive compounds to a coffee base in order to change the delivery architecture, not just the dose:</p>
<ul>
<li><strong>Caffeine modulation vs. amplification</strong> — Energy drinks amplify caffeine's effects with additional stimulatory compounds. Functional coffee modulates caffeine's effects with compounds that smooth the delivery curve and reduce the cortisol response. The goal is not a bigger spike — it is a cleaner, longer, more precise activation with a linear decline.</li>
<li><strong>L-Theanine — the functional layer energy drinks skip</strong> — The most well-researched cognitive stack in the nootropic literature is caffeine plus L-Theanine at a 1:2 ratio. L-Theanine promotes alpha-wave brain activity, attenuates caffeine's anxiety response, and extends the focus window without blunting activation. Energy drinks omit L-Theanine because it runs counter to the hard-hit profile their audience expects. Functional coffee includes it because sustained precision output is the objective.</li>
<li><strong>Adaptogens vs. stimulants</strong> — Energy drinks use stimulatory compounds — taurine, guarana, synephrine — to amplify the initial activation signal. Functional coffee uses adaptogens like Lion's Mane to support the underlying cognitive hardware — nerve growth factor synthesis, neuroplasticity, and executive function under load. One category borrows. The other builds.</li>
<li><strong>Electrolytes vs. diuretics</strong> — Caffeine is mildly diuretic. High-dose caffeine in an energy drink undermines the hydration baseline on which cognitive performance depends. Functional coffee with an ionic electrolyte stack compensates for this — maintaining the cellular environment that the cognitive compounds require to function properly.</li>
</ul>
<h2>What to Look for in a Functional Coffee Alternative</h2>
<p>If you are evaluating alternatives to your current afternoon energy source, these are the formulation markers that indicate a genuinely functional product versus a conventional energy drink with a nootropic on the label for optics:</p>
<ul>
<li>Caffeine dose below 100mg — above this threshold, the cortisol response becomes difficult to modulate, regardless of what else is in the formula</li>
<li>L-Theanine at a 2:1 ratio to caffeine — the clinically studied ratio is 200mg L-Theanine to 100mg caffeine</li>
<li>Dual-extracted Lion's Mane — water and alcohol extracts ensure the full bioavailable compound profile</li>
<li>Ionic electrolytes — sodium, potassium, and magnesium, not just sodium</li>
<li>Low sugar — any sugar load at 2 PM compounds the glycemic instability that caffeine is already causing</li>
</ul>
<p><em>Zero systemic debt is not a marketing line. It is the output of a formulation designed from the exit point backward — asking not how to maximize the spike but how to eliminate the debt. The afternoon stays yours.</em></p>
    `.trim(),
  },
  {
    id: 102,
    title: "hydrbrew° vs. Bang Energy",
    excerpt: "A better option than Bang Energy for the professional who can't afford to crash — and the science behind 300mg.",
    image: "https://i.imgur.com/b5qCx4B.png",
    author: "hydrbrew° Research",
    readTime: "6 min read",
    date: "May 26, 2026",
    category: "Comparison",
    contentHtml: `
<p>Bang Energy built its brand on a simple proposition: maximum caffeine, zero sugar, and aggressive marketing. For its target audience — gym-goers, athletes, and college students seeking a pre-workout boost — the formula delivers exactly what it promises. 300mg of caffeine in a single can. Fast. Hard. Loud. For the professional in a client meeting at 2:30 PM, 300mg of caffeine is not a performance tool. It is a liability.</p>
<h2>The 300mg Problem</h2>
<p>The research on caffeine and cognitive performance is clear on one point: the dose-response curve is not linear. More caffeine does not produce more focus. Above a certain threshold — roughly 100–200mg, depending on individual sensitivity — additional caffeine yields diminishing cognitive returns and escalating anxiety, jitter, and cortisol levels. Bang Energy's 300mg dose pushes most professional users well beyond the clean performance window.</p>
<p>The activation is strong, and the accompanying anxiety is equally strong. For someone who needs to hold competing variables in working memory, synthesize ambiguous data, and make precise decisions under pressure, elevated cortisol and fragmented attention are the last things the afternoon needs. Add to this the artificial sweetener load — sucralose at the levels used in Bang may affect insulin response in certain individuals — and you have a product that optimizes for the initial hit at the expense of everything that follows. The crash is not a side effect. It is a mathematical inevitability when 300mg of conventional caffeine clears your system.</p>
<h2>The Side-by-Side Comparison</h2>
<table>
<thead><tr><th>Feature</th><th>Bang Energy (16oz)</th><th>hydrbrew° (12oz)</th></tr></thead>
<tbody>
<tr><td>Caffeine</td><td>300mg conventional</td><td>85mg buffered</td></tr>
<tr><td>Sugar</td><td>0g</td><td>3g Coconut Sugar</td></tr>
<tr><td>Artificial sweeteners</td><td>Sucralose</td><td>None</td></tr>
<tr><td>L-Theanine</td><td>None</td><td>200mg</td></tr>
<tr><td>Lion's Mane</td><td>None</td><td>200mg</td></tr>
<tr><td>Electrolytes</td><td>None</td><td>255mg ionic</td></tr>
<tr><td>Calories</td><td>0</td><td>20</td></tr>
<tr><td>Activation profile</td><td>Extreme spike</td><td>Linear sustained</td></tr>
<tr><td>Exit profile</td><td>Hard crash</td><td>Clean linear exit</td></tr>
<tr><td>Designed for</td><td>Pre-workout, gym</td><td>Sustained professional output</td></tr>
</tbody>
</table>
<h2>What the Professional Afternoon Actually Requires</h2>
<p>The professional performance window is not a gym session. It does not require maximum activation. It requires precise, sustained, low-noise cognitive output for four to six consecutive hours. The difference between those two objectives is the difference between a sprinter and a long-distance runner. Bang Energy is built for the sprinter. The professional afternoon belongs to the long-distance runner.</p>
<p>85mg of buffered caffeine delivers clean adenosine blockade — caffeine's core function — without triggering the HPA axis response that 300mg inevitably produces. The activation is real. The anxiety is not. 200mg L-Theanine converts that activation into focused calm, rather than the activated scatter that high-dose stimulants produce. It promotes alpha-wave brain activity — the state associated with creative synthesis, working memory, and high-resolution decision-making. 200mg Lion's Mane supports the executive function layer — not the initial activation, but the quality of thinking three hours in, when the meeting runs long and the decision still needs to be made correctly. 255mg ionic electrolytes maintain the hydration baseline. Bang's diuretic caffeine load actively works against this. hydrbrew° builds in the correction.</p>
<h2>Who Bang Is For vs. Who hydrbrew° Is For</h2>
<p>Bang Energy is a legitimate pre-workout product, but it's being used in the wrong context. In a gym at 6 AM before a high-intensity training session, 300mg of caffeine makes sense. The session ends, the crash arrives, and sleep recovers the deficit. In a professional environment, the crash arrives at 2 PM — precisely when the afternoon's most consequential work is underway. The stimulant meant to support the afternoon becomes the reason it fails.</p>
<p>hydrbrew° was built for the professional who has already learned this lesson. Not through research — through experience. The person who cracked a Bang at 2 PM, felt wired and anxious during a critical meeting, crashed at 4, and decided there had to be a better architecture. There is.</p>
<p><em>300mg of caffeine is not precise. It is a volume. The professional afternoon does not need volume. It needs resolution — clean, sustained, anxiety-free cognitive output with an exit that does not compromise the evening. Zero systemic debt. The afternoon stays yours.</em></p>
    `.trim(),
  },
  {
    id: 103,
    title: "hydrbrew° vs. Celsius",
    excerpt: "Same professional, different architecture. Why the woman who built her morning on Celsius is reaching for something different at 2:15 PM.",
    image: "https://i.imgur.com/nGsStwV.png",
    author: "hydrbrew° Research",
    readTime: "6 min read",
    date: "May 26, 2026",
    category: "Comparison",
    contentHtml: `
<p>Celsius earned its place in the professional female market honestly. Clean label, no artificial preservatives, and a fitness-forward positioning that resonated with the health-conscious professional consumer who had already left sugary energy drinks behind. If you are a Celsius drinker, you already understand that what you put in your body matters. You have already made the upgrade once. This is not an argument that Celsius is a bad product. It is an argument that it was built for a different occasion than the one you are using it for at 2:15 PM.</p>
<h2>What Celsius Was Built For</h2>
<p>Celsius was engineered for fitness occasions — pre-workout, morning activation, and metabolic support. Its MetaPlus blend combines caffeine (200mg), green tea extract, guarana, and ginger to produce a thermogenic effect that supports calorie burn during physical activity. The 200mg caffeine dose is calibrated for a workout, not a workday.</p>
<p>For a 45-minute training session, this profile is well-designed. The activation is strong; the thermogenic compounds support the physical objective; and the exit occurs naturally through the exercise itself — you burn off the cortisol load during the session. At 2:15 PM, in a professional setting with no physical exertion to process the cortisol load, the same profile becomes problematic. 200mg of caffeine without a modulation layer produces activation without resolution — elevated heart rate, heightened anxiety, and the kind of scattered attention that makes the afternoon harder than it needs to be.</p>
<h2>The Formulation Comparison</h2>
<table>
<thead><tr><th>Feature</th><th>Celsius (12oz)</th><th>hydrbrew° (12oz)</th></tr></thead>
<tbody>
<tr><td>Caffeine</td><td>200mg conventional</td><td>85mg buffered</td></tr>
<tr><td>L-Theanine</td><td>None</td><td>200mg</td></tr>
<tr><td>Lion's Mane</td><td>None</td><td>200mg</td></tr>
<tr><td>Thermogenic blend</td><td>Yes — MetaPlus</td><td>No</td></tr>
<tr><td>Electrolytes</td><td>Minimal</td><td>255mg ionic</td></tr>
<tr><td>Sugar</td><td>0g</td><td>3g Coconut Sugar</td></tr>
<tr><td>Calories</td><td>10</td><td>20</td></tr>
<tr><td>Primary occasion</td><td>Pre-workout / morning</td><td>Afternoon cognitive window</td></tr>
<tr><td>Activation profile</td><td>High spike</td><td>Linear sustained</td></tr>
<tr><td>Exit profile</td><td>Moderate crash</td><td>Clean linear exit</td></tr>
</tbody>
</table>
<h2>The Occasion Gap</h2>
<p>This is the core distinction between Celsius and hydrbrew° — and it is not a quality argument; it is an occasion argument. Celsius is a morning and fitness product. It is designed to be consumed before physical activity or as a morning activation tool. Its thermogenic compounds support calorie burn. Its 200mg caffeine dose is appropriate for a session that will naturally metabolize the cortisol load. hydrbrew° is an afternoon precision product. It is designed for the 2:15 PM cognitive performance window — the moment that requires sustained executive function, not an elevated heart rate.</p>
<h2>What Shifts at 2:15 PM</h2>
<p>The morning activation occasion and the afternoon performance occasion are physiologically distinct. In the morning, cortisol is naturally elevated — your body's cortisol awakening response peaks between 30 and 45 minutes after waking. Adding 200mg of caffeine to an already elevated baseline is manageable because the curve is descending. By 2 PM, cortisol has declined significantly from its morning peak. Adding a high-dose caffeine hit at this point produces a secondary cortisol spike in a system that was moving toward recovery. The anxiety, the jitter, and the afternoon fragmentation that follow are predictable outcomes of triggering the HPA axis at the wrong point in the cortisol cycle.</p>
<p>85mg of buffered caffeine with 200mg of L-Theanine modulation at 2:15 PM works with the cortisol cycle rather than against it. The activation is clean, and the cortisol response is minimal. The focus window extends through the afternoon without the secondary spike and its associated costs.</p>
<h2>The Woman Who Uses Both</h2>
<p>The most honest framing is not Celsius vs. hydrbrew° — it is Celsius in the morning and hydrbrew° in the afternoon. These products are not competitors for the same occasion. They are complements across different times of day. The best functional beverage strategy is not brand loyalty — it is occasion matching. Celsius owns the morning. hydrbrew° was built for what comes next.</p>
<p>The professional woman who starts her morning with Celsius before a workout or as a morning activation is making a well-considered choice for that occasion. The same woman who reaches for a second Celsius at 2:15 PM because there is no better option is making a forced choice rather than a considered one. hydrbrew° is not asking her to abandon Celsius. It is giving her the purpose-built tool for the occasion Celsius was never intended for.</p>
<p><em>If you are a Celsius drinker, hydrbrew° is not asking you to make a different choice in the morning. It is asking you to make a better choice in the afternoon. The morning belongs to activation. The afternoon belongs to precision. Zero systemic debt means the evening is yours.</em></p>
    `.trim(),
  },
];

// ── Article Modal ───────────────────────────────────────────────────────────

function ArticleModal({ article, onClose }: { article: Article; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const style = document.createElement("style");
    style.id = "hb-modal-nav-hide";
    style.textContent = "header, nav { display: none !important; }";
    document.head.appendChild(style);
    return () => {
      document.body.style.overflow = "";
      document.getElementById("hb-modal-nav-hide")?.remove();
    };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col" style={{ zIndex: 9000 }}>
      <div className="fixed inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full h-full overflow-y-auto" style={{ zIndex: 9001 }}>
        <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-16">
        {/* Close — top-right X button */}
        <button
          type="button"
          onClick={onClose}
          className="fixed top-4 right-4 w-11 h-11 flex items-center justify-center bg-white rounded-full text-black shadow-lg hover:bg-neutral-200 transition-all"
          style={{ zIndex: 9999 }}
          aria-label="Close article"
        >
          <X className="w-5 h-5" />
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
