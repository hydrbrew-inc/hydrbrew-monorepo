export function ScanGameHudSection() {
  const tiles = [
    "GLOBAL AGI CLOCK",
    "QUADRANT HUD RADAR",
    "NFT + VR ACCESS HITS",
    "EXTRACTION PROGRESS",
    "CASH PRIZE HITS",
    "INCOMING AGI SIGNALS",
  ] as const;

  return (
    <section className="lp-section" style={{ background: "var(--lp-bg-elevated)" }} aria-labelledby="lp-scan-title">
      <div className="lp-inner">
        <h2 id="lp-scan-title" className="lp-h2 lp-center">
          24 WINNING SCANS
        </h2>
        <p className="lp-text lp-center" style={{ margin: "0 auto", maxWidth: "36rem" }}>
          8 CASH PRIZES + 16 CHARACTER NFTs WITH VR ACCESS
        </p>
        <p className="lp-protocol-micro lp-center" style={{ margin: "1rem auto 0" }}>
          SCAN GAME STARTS AT PRODUCT LAUNCH // MORE SCANS = HIGHER WIN PROBABILITY // UNLIMITED
          ENTRIES
        </p>
        <div className="lp-hud-grid lp-mt">
          {tiles.map((t) => (
            <div key={t} className="lp-hud-tile">
              {t}
            </div>
          ))}
        </div>
        <p className="lp-cyan lp-center lp-mt" style={{ fontWeight: 700 }}>
          ⚡ UNLIMITED SCANS = MORE CHANCES TO WIN ⚡
        </p>
      </div>
    </section>
  );
}
