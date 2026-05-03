import type { Metadata } from "next";

import { BuilderCommerceSection } from "../../components/builder/BuilderCommerceSection";
import { BUILDER_COMMERCE_SECTION_MODEL, BUILDER_PREVIEW_URL_PATH } from "../../lib/builder/config";

/** Always hit Builder on each request so marketing sees publish changes without redeploying. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Builder preview · Hydrbrew",
  description: "Internal preview of Builder.io commerce blocks — not linked from the public homepage.",
  robots: { index: false, follow: false },
};

export default function BuilderPreviewPage() {
  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-10 text-zinc-900">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Internal · not in main nav</p>
          <h1 className="text-2xl font-semibold tracking-tight">Builder.io preview</h1>
          <p className="text-sm leading-relaxed text-zinc-600">
            This page loads one <strong>{BUILDER_COMMERCE_SECTION_MODEL}</strong> entry from Builder when it is
            targeted to <code className="rounded bg-zinc-200/80 px-1.5 py-0.5 font-mono text-xs">{BUILDER_PREVIEW_URL_PATH}</code>.
            Marketing edits content in Builder; you refresh here to see updates (after publish).
          </p>
        </header>

        <section className="rounded-2xl border border-sky-200 bg-sky-50 p-5 text-sm text-sky-950">
          <h2 className="font-semibold text-sky-950">About the “Failed to fetch projects” message in Builder</h2>
          <p className="mt-2 leading-relaxed text-sky-900/90">
            That banner appears inside <strong>builder.io</strong> (their web app), not in this Next.js repo. It
            usually means your browser could not reach Builder’s API (network, VPN, firewall, ad blocker, or a
            temporary Builder outage). Try another network, disable blockers for{" "}
            <code className="rounded bg-white/80 px-1 font-mono text-xs">builder.io</code>, or use{" "}
            <strong>Try again</strong> in their UI. Your public API key is safe for frontend use; if it was exposed
            somewhere public, rotate it in Builder <strong>Settings → API Keys</strong>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-zinc-800">Live block</h2>
          <BuilderCommerceSection />
        </section>
      </div>
    </main>
  );
}
