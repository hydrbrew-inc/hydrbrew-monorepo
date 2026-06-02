import { createSchema } from "@weaverse/hydrogen";
import type { SectionProps } from "~/components/section";

const ITEMS = [
  { text: "Zero Systemic Debt", cyan: true },
  { text: "The Afternoon Stays Yours", cyan: false },
  { text: "Built for the Back Half", cyan: true },
  { text: "No Spike. No Crash. No Borrowed Energy", cyan: false },
  { text: "The Second Coffee That Actually Works", cyan: true },
  { text: "Light and Crisp. Clean Metabolic Exit.", cyan: false },
  { text: "Engineered for the 2:15 PM Window", cyan: true },
  { text: "The Room Is Running on a Depleted Baseline. You're Not.", cyan: false },
];

function HbTicker(_props: SectionProps) {
  const repeated = [...ITEMS, ...ITEMS];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@700&display=swap');
        .hb-ticker-track { font-family: 'Urbanist', sans-serif; }
        @keyframes hb-scroll { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }
        .hb-ticker-inner { animation: hb-scroll 40s linear infinite; display:flex; width:max-content; }
        .hb-ticker-inner:hover { animation-play-state: paused; }
      `}</style>
      <div
        className="relative overflow-hidden"
        style={{
          height: 64,
          backgroundColor: "#0A0A0A",
          borderTop: "0.5px solid #222222",
          borderBottom: "0.5px solid #222222",
        }}
      >
        <div className="hb-ticker-inner hb-ticker-track items-center" style={{ height: 64 }}>
          {repeated.map((item, i) => (
            <span key={i} className="flex items-center" style={{ height: 64 }}>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  color: item.cyan ? "#00FFFF" : "#FFFFFF",
                  textShadow: item.cyan
                    ? "0px 0px 12px rgba(0,255,255,0.5)"
                    : "none",
                  whiteSpace: "nowrap",
                  lineHeight: "64px",
                }}
              >
                {item.text}
              </span>
              <span
                style={{
                  fontSize: 32,
                  color: "#00FFFF",
                  opacity: 0.6,
                  margin: "0 24px",
                  lineHeight: "64px",
                }}
              >
                ·
              </span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default HbTicker;

export const schema = createSchema({
  type: "hb-ticker",
  title: "HB Ticker",
  settings: [],
  presets: {},
});
