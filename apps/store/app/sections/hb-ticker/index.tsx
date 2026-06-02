import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";

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

function HbTicker(props: HydrogenComponentProps) {
  const { ...rest } = props;
  const repeated = [...ITEMS, ...ITEMS];

  return (
    <div
      {...rest}
      className="relative overflow-hidden"
      style={{ height: 64, backgroundColor: "#0A0A0A", borderTop: "0.5px solid #222", borderBottom: "0.5px solid #222" }}
    >
      <div
        className="flex items-center"
        style={{ height: 64, width: "max-content", animation: "hb-scroll 40s linear infinite" }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center" style={{ height: 64 }}>
            <span
              style={{
                fontSize: 18, fontWeight: 700, letterSpacing: "0.5px", whiteSpace: "nowrap", lineHeight: "64px",
                fontFamily: "'Urbanist',sans-serif",
                color: item.cyan ? "#00FFFF" : "#FFFFFF",
                textShadow: item.cyan ? "0 0 12px rgba(0,255,255,0.5)" : "none",
              }}
            >
              {item.text}
            </span>
            <span style={{ fontSize: 32, color: "#00FFFF", opacity: 0.6, margin: "0 24px", lineHeight: "64px" }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default HbTicker;

export const schema = createSchema({
  type: "hb-ticker",
  title: "HB Ticker",
  settings: [],
  presets: {},
});
