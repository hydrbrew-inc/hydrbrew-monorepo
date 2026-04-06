const ITEMS = [
  "ZERO GLYCEMIC DEBT",
  "SYSTEM SYNC: 100%",
  "ALKALINE BASE",
  "LOW CAFFEINE SUBSTRATE",
  "L-THEANINE ACTIVATION",
  "LION'S MANE CATALYST",
  "ELECTROLYTE STACK",
  "HYDRATION FIRST",
] as const;

export function ProtocolTicker() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="lp-ticker-wrap" aria-hidden>
      <div className="lp-ticker">
        {doubled.map((t, i) => (
          <span key={`${t}-${i}`}>{`// ${t} //`}</span>
        ))}
      </div>
    </div>
  );
}
