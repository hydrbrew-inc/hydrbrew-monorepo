import Link from "next/link";
import { devAppOrigins, siteConfig } from "@repo/lib/site-config";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.wordmark}>{siteConfig.name}</span>
        <nav className={styles.nav}>
          <Link className={styles.navLink} href={devAppOrigins.arc}>
            ARC
          </Link>
          <span className={styles.navMuted} title="Separate Next app in monorepo">
            (dev)
          </span>
        </nav>
      </header>

      <main className={styles.main}>
        <p className={styles.eyebrow}>Pre-launch</p>
        <h1 className={styles.headline}>
          One homepage: marketing now, storefront later.
        </h1>
        <p className={styles.lede}>
          This app is the canonical HydrBrew site. At launch, sections like the
          hero and footer will swap in headless Shopify-powered UI—same routes,
          evolved content. No separate &quot;shop homepage&quot; app.
        </p>
        <p className={styles.meta}>
          <code>launchMode</code> is{" "}
          <strong>{siteConfig.launchMode ? "true" : "false"}</strong> in{" "}
          <code>@repo/lib/site-config</code>.
        </p>
        <Button appName="web" className={styles.button}>
          Shared UI smoke test
        </Button>
      </main>

      <footer className={styles.footer}>
        <p>{siteConfig.name} · Main site (apps/web)</p>
        <p className={styles.footerNote}>
          Footer will gain cart, policies, and collection links when commerce is
          wired up.
        </p>
      </footer>
    </div>
  );
}
