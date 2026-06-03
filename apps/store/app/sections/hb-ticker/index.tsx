import { createSchema } from "@weaverse/hydrogen";
import type { HydrogenComponentProps } from "@weaverse/hydrogen";

const ribbonItems = [
  'Zero Systemic Debt',
  'The Afternoon Stays Yours',
  'Built for the Back Half',
  "No Spike. No Crash. No Borrowed Energy",
  'The Second Coffee That Actually Works',
  'Light and Crisp. Clean Metabolic Exit.',
  'Engineered for the 2:15 PM Window',
  "The Room Is Running on a Depleted Baseline. You're Not.",
];

function HbTicker(props: HydrogenComponentProps) {
  const { ...rest } = props;
  return (
    <div {...rest} className="relative w-full overflow-hidden bg-[#0A0A0A]" style={{ height: "64px", borderTop: "0.5px solid #222222", borderBottom: "0.5px solid #222222" }}>
      <div className="ticker-wrapper">
        {[0, 1].map((rep) => (
          <div key={rep} className="ticker-content" aria-hidden={rep === 1 ? "true" : undefined}>
            {ribbonItems.map((item, index) => {
              const isCyan = index % 2 === 0;
              return (
                <span key={index} className="ticker-item">
                  <span className="inline-block px-8" style={{ fontFamily: "'Urbanist',sans-serif", fontSize: "52px", fontWeight: 700, letterSpacing: "1px", lineHeight: "64px", color: isCyan ? "#00FFFF" : "#FFFFFF", textShadow: isCyan ? "0px 0px 12px rgba(0,255,255,0.5)" : "none" }}>
                    {item}
                  </span>
                  <span className="inline-block mx-6" style={{ color: "#00FFFF", opacity: 0.6, fontSize: "40px", lineHeight: "64px" }}>·</span>
                </span>
              );
            })}
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .ticker-wrapper { display:flex; align-items:center; height:100%; overflow:hidden; width:100%; }
        .ticker-content { display:flex; align-items:center; white-space:nowrap; animation:hb-ticker-scroll 35s linear infinite; will-change:transform; backface-visibility:hidden; transform:translateZ(0); }
        .ticker-item { display:inline-flex; align-items:center; flex-shrink:0; }
        @keyframes hb-ticker-scroll { 0% { transform:translate3d(0,0,0); } 100% { transform:translate3d(-100%,0,0); } }
        @media (min-width:768px) { .ticker-content { animation:hb-ticker-scroll 45s linear infinite; } }
      `}} />
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
