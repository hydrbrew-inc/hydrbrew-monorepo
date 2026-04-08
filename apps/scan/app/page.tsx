import Link from "next/link";
import { devAppOrigins, siteConfig } from "@repo/lib/site-config";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

export default function Page() {
  return (
    <main className={styles.root}>
      <div className={styles.card}>
        <p className={styles.label}>apps/scan</p>
        <h1 className={styles.title}>QR scan</h1>
        <p className={styles.note}>
          Placeholder scaffold only — no camera or QR logic yet. This app will
          host the future scan experience.
        </p>
        <p className={styles.note}>
          Main site:{" "}
          <Link className={styles.link} href={devAppOrigins.web}>
            {siteConfig.name} (web)
          </Link>
          {" · "}
          <Link className={styles.link} href={devAppOrigins.arc}>
            ARC (dev)
          </Link>
        </p>
        <Button type="button" className={styles.button}>
          Shared UI smoke test
        </Button>
      </div>
    </main>
  );
}
