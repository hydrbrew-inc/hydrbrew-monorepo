import { createSchema } from "@weaverse/hydrogen";
import { useState } from "react";
import { Link } from "react-router";
import type { SectionProps } from "~/components/section";
import { sectionSettings } from "~/components/section";

const QUESTIONS = [
  {
    q: "When do you typically hit your afternoon wall?",
    opts: ["12–1 PM", "2–3 PM", "3–4 PM", "After 4 PM"],
  },
  {
    q: "What best describes your current afternoon go-to?",
    opts: ["Second coffee", "Energy drink", "Nothing — I white-knuckle it", "Nap or walk"],
  },
  {
    q: "What's your biggest afternoon problem?",
    opts: ["Focus drops off", "Jitters from caffeine", "Hard crash after lunch", "Can't wind down at night"],
  },
  {
    q: "What's your primary goal?",
    opts: ["Sustained focus", "No crash / clean exit", "Better sleep later", "All of the above"],
  },
  {
    q: "How would you describe your caffeine sensitivity?",
    opts: ["Very sensitive", "Moderate", "Low — I need a lot", "Varies day to day"],
  },
];

function HbQuiz(_props: SectionProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const handleAnswer = (i: number) => {
    const next = [...answers, i];
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  };

  const reset = () => { setOpen(false); setStep(0); setAnswers([]); setDone(false); };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-black">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,255,255,0.04) 100%)" }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <span
          className="inline-block px-6 py-3 rounded-full font-bold text-black text-sm uppercase tracking-wider mb-8"
          style={{ backgroundColor: "#00FFFF", fontFamily: "'Urbanist', sans-serif" }}
        >
          20% OFF — Take the Quiz ↓
        </span>
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#00FFFF", fontFamily: "'Roboto Mono', monospace" }}>
          COGNITIVE PROFILE // PERSONALIZED OPTIMIZATION
        </p>
        <h2 className="text-4xl md:text-7xl font-bold text-white uppercase mb-6" style={{ fontFamily: "'Urbanist', sans-serif", lineHeight: 1.05 }}>
          Find Your Perfect<br />Afternoon Ritual
        </h2>
        <p className="text-lg text-white/80 mb-10" style={{ fontFamily: "'Urbanist', sans-serif" }}>
          Take the <span style={{ color: "#00FFFF" }}>2 minute quiz</span> · Personalized results ·{" "}
          <span style={{ color: "#00FFFF" }}>Instant discount</span>
        </p>
        <button
          onClick={() => setOpen(true)}
          className="px-12 py-5 rounded-full font-bold text-black text-lg uppercase tracking-wider transition-all duration-300 hover:scale-105"
          style={{ backgroundColor: "#00FFFF", fontFamily: "'Urbanist', sans-serif", boxShadow: "0 0 40px rgba(0,255,255,0.4)" }}
        >
          CALIBRATE YOUR STACK →
        </button>
      </div>

      {/* Quiz Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(0,0,0,0.85)" }}>
          <div className="w-full max-w-xl rounded-2xl p-8 md:p-12 relative" style={{ backgroundColor: "rgba(10,10,10,0.95)", border: "2px solid rgba(0,255,255,0.2)" }}>
            {/* Progress bar */}
            {!done && (
              <div className="w-full h-1 rounded-full mb-8" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                <div
                  className="h-1 rounded-full transition-all duration-500"
                  style={{ width: `${((step) / QUESTIONS.length) * 100}%`, backgroundColor: "#00FFFF" }}
                />
              </div>
            )}

            {!done ? (
              <>
                <p className="text-xs text-white/40 mb-6" style={{ fontFamily: "'Roboto Mono', monospace" }}>
                  Question {step + 1} of {QUESTIONS.length}
                </p>
                <h3 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: "'Urbanist', sans-serif" }}>
                  {QUESTIONS[step].q}
                </h3>
                <div className="space-y-3">
                  {QUESTIONS[step].opts.map((opt, i) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(i)}
                      className="w-full text-left p-4 rounded-xl border-2 font-medium text-white transition-all duration-200 hover:scale-[1.01]"
                      style={{
                        borderColor: "rgba(255,255,255,0.1)",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        fontFamily: "'Urbanist', sans-serif",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,255,0.5)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "rgba(0,255,255,0.1)" }}>
                  <span className="text-3xl">✓</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Urbanist', sans-serif" }}>
                  Your Stack: <span style={{ color: "#00FFFF" }}>The Baseline Protocol</span>
                </h3>
                <p className="text-white/70 mb-8 leading-relaxed" style={{ fontFamily: "'Urbanist', sans-serif" }}>
                  Based on your profile, hydrbrew° is calibrated for your exact afternoon window. 85mg precision caffeine + 200mg L-Theanine + 200mg Lion's Mane — zero systemic debt.
                </p>
                <Link
                  to="/products/hydrbrew-pre-order-bundle"
                  className="block w-full py-4 rounded-xl font-bold text-black text-xl uppercase tracking-wider mb-4 transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: "#00FFFF", fontFamily: "'Urbanist', sans-serif" }}
                >
                  SECURE YOUR ALLOCATION
                </Link>
                <button onClick={reset} className="text-sm text-white/50 hover:text-white/80 transition-colors">
                  Retake quiz
                </button>
              </div>
            )}

            <button
              onClick={reset}
              className="absolute top-4 right-4 p-2 text-white/40 hover:text-white/80 transition-colors text-xl"
            >
              ✕
            </button>
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
  settings: [...sectionSettings],
  presets: {},
});
