import Link from "next/link";
import { siteConfig } from "@repo/lib/site-config";

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={18} height={18} aria-hidden>
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={18} height={18} aria-hidden>
      <path
        fill="currentColor"
        d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
      />
    </svg>
  );
}

function IconYouTube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={18} height={18} aria-hidden>
      <path
        fill="currentColor"
        d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"
      />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="lp-footer">
      <div className="lp-inner">
        <p className="lp-protocol-micro" style={{ marginBottom: "1rem", textAlign: "center" }}>
          ● END_TRANSMISSION _
        </p>

        <div className="lp-footer-map">
          <div className="lp-footer-map-inner">
            <div className="lp-map-placeholder">Map: Leucadia, CA (placeholder)</div>
            <div className="lp-coords">
              <p className="lp-founded">FOUNDED HERE</p>
              <h3>Leucadia, CA</h3>
              <p className="lp-lat">33.0644° N / 117.3017° W</p>
              <p className="lp-text" style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>
                <span className="lp-red" style={{ color: "var(--lp-red)" }}>
                  ●
                </span>{" "}
                Origin Point: Verified
              </p>
            </div>
          </div>
        </div>

        <div className="lp-solar-placeholder" aria-hidden>
          Solar system / uplink art placeholder
          {/* TODO: final footer illustration or Mux loop */}
        </div>

        <div className="lp-uplink">
          <div className="lp-uplink-hex" aria-hidden>
            ▲▲▲
          </div>
          <span className="lp-protocol-micro">UPLINK</span>
        </div>

        <div className="lp-footer-bottom">
          <div>
            <p className="lp-logo" style={{ marginBottom: "0.35rem" }}>
              • {siteConfig.name.toLowerCase()}
              <span>°</span>
            </p>
            <p className="lp-text" style={{ fontSize: "0.8rem", margin: 0 }}>
              Optimized Human Protocol
            </p>
            <p className="lp-text" style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
              Founder
              <br />
              hydrbrew° Protocol
            </p>
          </div>
          <nav className="lp-social" aria-label="Social">
            <Link href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <IconX className="lp-icon-social" />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <IconInstagram className="lp-icon-social" />
            </Link>
            <Link href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
              <IconYouTube className="lp-icon-social" />
            </Link>
          </nav>
          <nav className="lp-legal" aria-label="Legal">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Contact</Link>
          </nav>
        </div>

        <p className="lp-copyright">
          © 2026 HydrBrew, Inc. Engineered in Encinitas, CA. All rights reserved. Become a +1.
        </p>
      </div>
    </footer>
  );
}
