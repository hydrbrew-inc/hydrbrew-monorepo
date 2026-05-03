"use client";

import type { BuilderContent } from "@builder.io/sdk";
import dynamic from "next/dynamic";

const BuilderPreviewCanvas = dynamic(
  () => import("./BuilderPreviewCanvas").then((m) => m.BuilderPreviewCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-8 text-center text-sm text-zinc-600">
        Loading Builder…
      </div>
    ),
  },
);

export function BuilderPreviewGate({ content }: { content: BuilderContent }) {
  return <BuilderPreviewCanvas content={content} />;
}
