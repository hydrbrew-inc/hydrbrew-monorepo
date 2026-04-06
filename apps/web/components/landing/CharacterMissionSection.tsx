export function CharacterMissionSection() {
  return (
    <section className="lp-section" aria-labelledby="lp-reels-title">
      <div className="lp-inner">
        <h2 id="lp-reels-title" className="lp-h3" style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)" }}>
          CHARACTER INTEL REELS // CODES EMBEDDED
        </h2>
        <div className="lp-hud-grid lp-mt">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="lp-hud-tile">
              Character reel {i}
              {/* TODO(Mux): embed character reel video */}
            </div>
          ))}
        </div>

        <h3 className="lp-h3 lp-mt">🔐 MISSION: DECODE THE SEQUENCE</h3>
        <p className="lp-text">
          Explore HydrCore Base thoroughly. Numbers are encrypted in character dialogues, hidden in
          terminal interfaces, and secretly coded in visuals.
        </p>
        <p className="lp-text">
          💡 HINT: Each of the 4 characters holds exactly 1 digit. Watch their reels. Read the
          terminals. Decode the messages.
        </p>
        <p className="lp-text">
          Solve the sequence → Claim physical Medallion with engraved VR access code → Unlock HydrCore
          Base VR worlds with exclusive missions, prize drops &amp; evolving gameplay.
        </p>
        <p className="lp-cyan" style={{ fontWeight: 600 }}>
          ⏱️ 21 Medallions left // Codes reset when inventory depletes
        </p>

        <h3 className="lp-h3 lp-mt">LIVE EXTRACTIONS</h3>
        <div className="lp-hud-tile lp-hud-wide" style={{ minHeight: "8rem", marginTop: "0.75rem" }}>
          Live feed placeholder
          {/* TODO: real-time extraction ticker / WebSocket */}
        </div>
      </div>
    </section>
  );
}
