import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";
import { useState } from "react";
import { ChevronLeft, ArrowRight, Check } from "lucide-react";
import { useFetcher } from "react-router";

type QuizAnswers = {
  frequency: string | null;
  loveScale: string | null;
  overload: string[];
  crashes: string | null;
  craving: string | null;
};

function HbQuiz(props: HydrogenComponentProps) {
  const { ...rest } = props;
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({ frequency: null, loveScale: null, overload: [], crashes: null, craving: null });
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const fetcher = useFetcher<{ ok: boolean }>();
  const totalQuestions = 5;
  const progress = (currentStep / totalQuestions) * 100;

  const handleAnswer = (question: keyof QuizAnswers, value: string | string[]) =>
    setAnswers({ ...answers, [question]: value });

  const nextStep = () => {
    if (currentStep < totalQuestions - 1) setCurrentStep(currentStep + 1);
    else setShowResult(true);
  };
  const prevStep = () => currentStep > 0 && setCurrentStep(currentStep - 1);

  const calculateScore = () => {
    const q1: Record<string, number> = { oneclean: 0, twothree: 2, coffeeplusenergy: 4, multipleenergy: 5, whatever: 3, noneofabove: 0 };
    const q2: Record<string, number> = { finebutpay: 1, wiredfoggy: 2, anxious: 3, crashing: 4, empty: 5, noneofabove: 0 };
    const q4: Record<string, number> = { slowdecline: 1, overdone: 2, mostdays: 3, occasional: 3, everyday: 4, noimpact: 0 };
    const q5: Record<string, number> = { honestlyfine: 0, finesleep: 1, depleted: 2, foggy: 3, irritable: 4, exhaustedwired: 5 };
    const symptoms = answers.overload.includes("none") ? 0 : Math.min(answers.overload.length, 5);
    return Math.min((q1[answers.frequency ?? ""] ?? 0) + (q2[answers.loveScale ?? ""] ?? 0) + symptoms + (q4[answers.crashes ?? ""] ?? 0) + (q5[answers.craving ?? ""] ?? 0), 20);
  };

  const getResult = () => {
    const score = calculateScore();
    return score <= 10
      ? { title: "You're already ahead of most.", description: "You manage caffeine better than the average person. One or two drinks, mostly clean, no major fallout. The afternoon works - most of the time.", fit: "When you do reach for that second caffeine of the day, make it count. hydrbrew° is the one that delivers clean focus without the tradeoff - light, crisp, and out of your system before the evening starts.", cta: "The smarter second caffeine." }
      : { title: "Your afternoon has been asking for a better option.", description: "The pattern is familiar. The second and third caffeine beverage of the day delivers less than the first - and costs more on the back end. It's not a willpower issue. It's an architecture issue.", fit: "hydrbrew° was built specifically for that second drink moment. 85mg. L-Theanine. Lion's Mane. Everything the afternoon needs - none of what makes the evening harder.", cta: "The second caffeine beverage that actually works." };
  };

  const renderQuestion = () => {
    const btnCls = (selected: boolean) => `w-full p-4 md:p-5 rounded-xl md:rounded-2xl border-2 transition-all text-left flex items-center gap-3 md:gap-4 active:scale-[0.98] ${selected ? "border-[#00FFFF] bg-[#00FFFF]/10 shadow-lg shadow-[#00FFFF]/20" : "border-white/10 bg-white/5 hover:border-[#00FFFF]/50"}`;
    switch (currentStep) {
      case 0: return (
        <div className="space-y-4 md:space-y-6">
          <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-4 md:mb-6 leading-tight">What does your current caffeine stack look like?</h3>
          <div className="space-y-2 md:space-y-3">
            {[{ label: "One coffee in the morning - I keep it clean", value: "oneclean", emoji: "☕" }, { label: "Two or three coffees spread across the day", value: "twothree", emoji: "☕☕☕" }, { label: "Coffee plus an energy drink in the afternoon", value: "coffeeplusenergy", emoji: "☕🔋" }, { label: "Multiple energy drinks - I need the hit", value: "multipleenergy", emoji: "⚡💥" }, { label: "Whatever's available - I'm just trying to function", value: "whatever", emoji: "🆘" }, { label: "None of the Above", value: "noneofabove", emoji: "⊘" }].map((o) => (
              <button key={o.value} type="button" onClick={() => { handleAnswer("frequency", o.value); setTimeout(nextStep, 300); }} className={btnCls(answers.frequency === o.value)}>
                <span className="text-2xl">{o.emoji}</span><span className="text-base md:text-lg text-white font-medium leading-snug">{o.label}</span>
                {answers.frequency === o.value && <Check className="ml-auto w-6 h-6 text-[#00FFFF]" />}
              </button>
            ))}
          </div>
        </div>
      );
      case 1: return (
        <div className="space-y-4 md:space-y-6">
          <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-4 md:mb-6 leading-tight">Two hours following your afternoon caffeine, your body is:</h3>
          <div className="space-y-2 md:space-y-3">
            {[{ label: "Fine for now, but I know I'll pay for it tonight", value: "finebutpay", emoji: "🌙" }, { label: "Wired but foggy - the energy arrived, the focus didn't", value: "wiredfoggy", emoji: "🌫️" }, { label: "Anxious and restless - elevated heart rate, hard to settle", value: "anxious", emoji: "💓" }, { label: "Already crashing - the spike wore off faster than it hit", value: "crashing", emoji: "📉" }, { label: "Running on empty - the caffeine stopped working hours ago", value: "empty", emoji: "🪫" }, { label: "None of the Above", value: "noneofabove", emoji: "⊘" }].map((o) => (
              <button key={o.value} type="button" onClick={() => { handleAnswer("loveScale", o.value); setTimeout(nextStep, 300); }} className={btnCls(answers.loveScale === o.value)}>
                <span className="text-2xl">{o.emoji}</span><span className="text-base md:text-lg text-white font-medium leading-snug">{o.label}</span>
                {answers.loveScale === o.value && <Check className="ml-auto w-6 h-6 text-[#00FFFF]" />}
              </button>
            ))}
          </div>
        </div>
      );
      case 2: return (
        <div className="space-y-4 md:space-y-6">
          <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-3 md:mb-4 leading-tight">Which of these have you experienced from caffeine overload?</h3>
          <p className="text-base md:text-lg text-white/60 mb-4 md:mb-6">Select all that apply</p>
          <div className="space-y-2 md:space-y-3">
            {[{ label: "Jitters or shaky hands", value: "jitters", emoji: "🤝" }, { label: "Heart racing or chest tightness", value: "heartracing", emoji: "💓" }, { label: "Unable to focus despite feeling wired", value: "unfocused", emoji: "🌀" }, { label: "Anxiety spike in the afternoon", value: "anxiety", emoji: "😰" }, { label: "Disrupted sleep even when exhausted", value: "sleep", emoji: "😴" }, { label: "Needing more caffeine just to feel normal", value: "dependency", emoji: "🔄" }, { label: "None of the above", value: "none", emoji: "✅" }].map((o) => {
              const isSelected = answers.overload.includes(o.value);
              return (
                <button key={o.value} type="button" onClick={() => {
                  let next: string[];
                  if (o.value === "none") next = isSelected ? [] : ["none"];
                  else next = isSelected ? answers.overload.filter(v => v !== o.value) : [...answers.overload.filter(v => v !== "none"), o.value];
                  handleAnswer("overload", next);
                }} className={btnCls(isSelected)}>
                  <span className="text-2xl">{o.emoji}</span><span className="text-base md:text-lg text-white font-medium flex-1 leading-snug">{o.label}</span>
                  {isSelected && <Check className="w-6 h-6 text-[#00FFFF]" />}
                </button>
              );
            })}
          </div>
          <button type="button" onClick={nextStep} disabled={answers.overload.length === 0} className={`w-full mt-6 md:mt-8 py-4 md:py-5 rounded-xl md:rounded-2xl transition-all flex items-center justify-center gap-2 text-base md:text-lg font-semibold ${answers.overload.length > 0 ? "bg-[#00FFFF] text-black hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]" : "bg-white/10 text-white/40 cursor-not-allowed"}`}>Continue<ArrowRight className="w-5 h-5" /></button>
        </div>
      );
      case 3: return (
        <div className="space-y-4 md:space-y-6">
          <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-4 md:mb-6 leading-tight">The afternoon energy dip hits you:</h3>
          <div className="space-y-2 md:space-y-3">
            {[{ label: "I don't crash - I just slowly stop being productive after 3 PM", value: "slowdecline", emoji: "📉" }, { label: "Only when I've overdone the caffeine", value: "overdone", emoji: "☕💥" }, { label: "Most days - especially after a big lunch or second coffee", value: "mostdays", emoji: "🍽️" }, { label: "Occasionally - but when it hits, it wipes me out", value: "occasional", emoji: "💤" }, { label: "Every single day - it's so predictable I plan around it", value: "everyday", emoji: "📅" }, { label: "I haven't noticed the impact from caffeine.", value: "noimpact", emoji: "?" }].map((o) => (
              <button key={o.value} type="button" onClick={() => { handleAnswer("crashes", o.value); setTimeout(nextStep, 300); }} className={btnCls(answers.crashes === o.value)}>
                <span className="text-2xl">{o.emoji}</span><span className="text-base md:text-lg text-white font-medium leading-snug">{o.label}</span>
                {answers.crashes === o.value && <Check className="ml-auto w-6 h-6 text-[#00FFFF]" />}
              </button>
            ))}
          </div>
        </div>
      );
      case 4: return (
        <div className="space-y-4 md:space-y-6">
          <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-4 md:mb-6 leading-tight">By 6 PM, your caffeine has left you:</h3>
          <div className="space-y-2 md:space-y-3">
            {[{ label: "Fine, but I sacrificed tomorrow's sleep to get here", value: "finesleep", emoji: "🌙" }, { label: "Depleted - and reaching for something else just to get through the night", value: "depleted", emoji: "🪫" }, { label: "Foggy - the evening is a write-off", value: "foggy", emoji: "🌫️" }, { label: "Irritable - the crash cost me more than the energy gave me", value: "irritable", emoji: "😤" }, { label: "Exhausted but wired - tired and can't sleep", value: "exhaustedwired", emoji: "😵‍💫" }, { label: "Honestly fine — caffeine doesn't really affect me either way", value: "honestlyfine", emoji: "✅" }].map((o) => (
              <button key={o.value} type="button" onClick={() => { handleAnswer("craving", o.value); setTimeout(nextStep, 300); }} className={btnCls(answers.craving === o.value)}>
                <span className="text-2xl">{o.emoji}</span><span className="text-base md:text-lg text-white font-medium leading-snug">{o.label}</span>
                {answers.craving === o.value && <Check className="ml-auto w-6 h-6 text-[#00FFFF]" />}
              </button>
            ))}
          </div>
        </div>
      );
      default: return null;
    }
  };

  const result = getResult();

  if (showResult) {
    return (
      <section {...rest} className="relative py-20 bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00FFFF] rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[150px]" />
        </div>
        <div className="relative z-10 container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-block p-4 bg-[#00FFFF]/10 rounded-full mb-4"><Check className="w-12 h-12 text-[#00FFFF]" /></div>
            <h2 className="text-4xl md:text-5xl text-white font-bold">{result.title}</h2>
          </div>
          <div className="bg-[#0A0A0A] rounded-3xl border-2 border-[#00FFFF]/20 shadow-2xl p-8 md:p-12 space-y-8">
            <p className="text-xl text-white/70 leading-relaxed">{result.description}</p>
            <div className="p-6 bg-[#00FFFF]/5 rounded-2xl border-2 border-[#00FFFF]/30">
              <p className="text-lg text-white font-semibold">{result.fit}</p>
            </div>
            <div className="space-y-4 pt-6">
              <p className="text-center text-white/60">Your <span className="font-bold text-[#00FFFF]">20% discount</span> is waiting.</p>
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-6 py-4 bg-white/5 border-2 border-[#00FFFF]/30 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-[#00FFFF] transition-all text-lg" />
            </div>
            {fetcher.data?.ok ? (
              <div className="w-full py-5 bg-[#00FFFF]/20 border border-[#00FFFF] text-[#00FFFF] rounded-2xl text-center text-xl font-bold">Check your inbox for HYDR20 ✓</div>
            ) : (
              <button type="button" onClick={() => {
                if (!email) return;
                const fd = new FormData();
                fd.set("email", email);
                fetcher.submit(fd, { action: "/api/klaviyo", method: "POST", encType: "multipart/form-data" });
              }} className="w-full py-5 bg-[#00FFFF] text-black rounded-2xl hover:bg-[#00FFFF]/90 transition-all flex items-center justify-center gap-3 text-xl font-bold shadow-xl hover:shadow-[0_0_30px_rgba(0,255,255,0.5)]">
                {result.cta} →
              </button>
            )}
            <button type="button" onClick={() => { setShowResult(false); setCurrentStep(0); }} className="w-full py-3 text-white/60 hover:text-white transition-all text-sm font-medium">Retake Quiz</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section {...rest} className="relative bg-black overflow-visible" id="quiz">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hb-quiz-arrow { 0%,100%{transform:translateX(0)} 50%{transform:translateX(6px)} }
        @keyframes hb-quiz-arrow-down { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }
        .hb-quiz-cta-arrow { animation:hb-quiz-arrow 1.5s ease-in-out infinite; }
        .hb-quiz-badge-arrow { animation:hb-quiz-arrow-down 1.5s ease-in-out infinite; }
        @keyframes hb-quiz-expand { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
        .hb-quiz-expand { animation:hb-quiz-expand 0.4s ease-in-out; }
        @keyframes hb-quiz-fade { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .hb-quiz-fade { animation:hb-quiz-fade 0.5s ease-out; }
        @keyframes hb-quiz-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.02);opacity:0.95} }
        .hb-quiz-pulse { animation:hb-quiz-pulse 3s ease-in-out infinite; }
      `}} />

      {!isExpanded ? (
        <div className="relative w-full overflow-hidden" style={{ backgroundColor: "#000000" }}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(0,0,0,0.5) 0%,rgba(0,240,255,0.05) 100%)" }} />
          <div className="absolute inset-0 opacity-30"><div className="absolute top-0 right-0 w-96 h-96 bg-[#00FFFF]/20 rounded-full blur-[100px] animate-pulse" /></div>
          <div className="relative z-10 container mx-auto px-4 py-12 md:py-16 overflow-hidden">
            <img src="https://i.imgur.com/wKngvLJ.png" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover -z-10 opacity-60" loading="lazy" />
            <div className="flex flex-col items-center text-center gap-6 md:gap-8 max-w-4xl mx-auto">
              <p className="text-[#00FFFF] text-sm uppercase tracking-wider" style={{ fontFamily: "'Roboto Mono',monospace" }}>COGNITIVE PROFILE // PERSONALIZED OPTIMIZATION</p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#00FFFF] rounded-full hb-quiz-pulse">
                <span className="text-black font-bold text-lg md:text-xl" style={{ fontFamily: "'Urbanist',sans-serif", fontWeight: 700 }}>20% OFF</span>
                <span className="text-black text-sm md:text-base font-bold flex items-center gap-1" style={{ fontFamily: "'Urbanist',sans-serif" }}>- Take the Quiz<span className="hb-quiz-badge-arrow inline-block">↓</span></span>
              </div>
              <h3 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold uppercase leading-tight" style={{ fontFamily: "'Urbanist',sans-serif" }}>Find Your Perfect<br />Afternoon Ritual</h3>
              <p className="text-white/80 text-base md:text-lg max-w-2xl">
                <span className="text-[#00FFFF]">Take the 2 minute quiz</span> • Personalized results • <span className="text-[#00FFFF]">Instant discount</span>
              </p>
              <button type="button" onClick={() => setIsExpanded(true)} className="group relative px-12 md:px-16 py-5 md:py-6 rounded-full transition-all hover:scale-105" style={{ backgroundColor: "#00FFFF", color: "#000000", fontFamily: "'Urbanist',sans-serif", fontWeight: 700, fontSize: "18px", letterSpacing: "1px", boxShadow: "0 0 40px rgba(0,255,255,0.4)" }}>
                <span className="relative z-10 flex items-center gap-2">CALIBRATE YOUR STACK<span className="hb-quiz-cta-arrow inline-block">→</span></span>
              </button>
              <div className="flex items-center gap-2 text-white/40 text-xs md:text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span className="text-white/70">No email required • Immediate Results</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="fixed inset-0 z-40" style={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(0,0,0,0.85)" }} />
          <div className="relative z-50 py-20">
            <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-white/10">
              <div className="h-full bg-[#00FFFF] transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
            </div>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00FFFF] rounded-full blur-[150px]" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[150px]" />
            </div>
            <div className="relative z-10 container mx-auto px-3 md:px-4 max-w-3xl">
              <div className="rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-8 lg:p-12 border-2 border-[#00FFFF]/20 min-h-[500px] flex flex-col hb-quiz-expand" style={{ backgroundColor: "rgba(10,10,10,0.85)" }}>
                <div className="flex items-center justify-between mb-4 md:mb-6 text-xs md:text-sm text-white/40">
                  <span>Question {currentStep + 1} of {totalQuestions}</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                <div className="flex-1 hb-quiz-fade">{renderQuestion()}</div>
                <div className="flex items-center justify-between mt-4 md:mt-8 pt-4 md:pt-6 border-t border-white/10">
                  <button type="button" onClick={prevStep} disabled={currentStep === 0} className={`flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl transition-all text-sm md:text-base ${currentStep === 0 ? "text-white/20 cursor-not-allowed" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                    <ChevronLeft className="w-5 h-5" /><span className="hidden sm:inline">Back</span>
                  </button>
                  <button type="button" onClick={() => { setIsExpanded(false); setCurrentStep(0); }} className="text-white/40 hover:text-white/60 transition-all text-sm px-4 py-2.5 rounded-xl hover:bg-white/5">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default HbQuiz;

export const schema = createSchema({
  type: "hb-quiz",
  title: "HB Quiz",
  settings: [],
  presets: {},
});
