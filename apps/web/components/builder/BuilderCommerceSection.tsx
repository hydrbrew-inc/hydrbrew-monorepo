import { BUILDER_COMMERCE_SECTION_MODEL, BUILDER_PREVIEW_URL_PATH } from "../../lib/builder/config";
import { fetchCommerceSectionPreview } from "../../lib/builder/fetch-commerce-section-preview";
import { BuilderPreviewGate } from "./BuilderPreviewGate";

/**
 * Server wrapper: fetches Builder content once, handles errors, delegates rendering
 * to the client `BuilderPreviewCanvas` (Builder’s React runtime expects the browser).
 */
export async function BuilderCommerceSection() {
  const result = await fetchCommerceSectionPreview();

  if (result.status === "missing_api_key") {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
        <p className="font-medium">Builder API key is not configured</p>
        <p className="mt-1 text-amber-900/90">
          Add{" "}
          <code className="rounded bg-amber-100/80 px-1 py-0.5 font-mono text-xs">
            NEXT_PUBLIC_BUILDER_API_KEY
          </code>{" "}
          to <code className="font-mono text-xs">apps/web/.env.local</code>, then restart{" "}
          <code className="font-mono text-xs">pnpm dev</code>.
        </p>
      </div>
    );
  }

  if (result.status === "fetch_error") {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-950">
        <p className="font-medium">Could not load Builder content</p>
        <p className="mt-1 font-mono text-xs text-red-900/90">{result.message}</p>
      </div>
    );
  }

  if (result.status === "empty") {
    return (
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-800">
        <p className="font-medium">No published content yet</p>
        <p className="mt-2 text-zinc-700">
          In Builder.io (space <strong>Hydrbrew Store</strong> or your team space):
        </p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-zinc-700">
          <li>
            Create a model named{" "}
            <code className="rounded bg-white px-1 py-0.5 font-mono text-xs">
              {BUILDER_COMMERCE_SECTION_MODEL}
            </code>{" "}
            (or rename an existing section model to match this handle).
          </li>
          <li>
            Create a <strong>published</strong> entry and set URL targeting to{" "}
            <code className="rounded bg-white px-1 py-0.5 font-mono text-xs">
              {BUILDER_PREVIEW_URL_PATH}
            </code>
            .
          </li>
          <li>Refresh this page.</li>
        </ol>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      <BuilderPreviewGate content={result.content} />
    </div>
  );
}
