import { siteConfig } from "@repo/lib/site-config";
import { HeaderJoinForm } from "./LandingForms";

export function SiteHeader() {
  return (
    <header className="lp-header">
      <a href="#" className="lp-logo">
        • {siteConfig.name.toLowerCase()}
        <span>°</span>
      </a>
      <div className="lp-header-form-wrap">
        <HeaderJoinForm />
      </div>
      <div className="lp-header-actions">
        <button type="button" className="lp-menu-btn" aria-label="Open menu">
          <span className="lp-menu-icon" aria-hidden>
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
    </header>
  );
}
