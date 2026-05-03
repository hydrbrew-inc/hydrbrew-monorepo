import type { BuilderContent } from "@builder.io/sdk";

import { BUILDER_COMMERCE_SECTION_MODEL, BUILDER_PREVIEW_URL_PATH } from "./config";
import { getBuilderPublicApiKey } from "./get-public-api-key";

export type CommerceSectionPreviewFetch =
  | { status: "missing_api_key" }
  | { status: "fetch_error"; message: string }
  | { status: "empty" }
  | { status: "ok"; content: BuilderContent };

type BuilderContentListResponse = {
  results?: BuilderContent[];
};

/**
 * Loads published `commerce-section` for URL path `/builder-preview` via the
 * Content REST API (no `@builder.io/react` import on the server — avoids
 * React 19 / Next 16 bundling issues during static generation).
 */
export async function fetchCommerceSectionPreview(): Promise<CommerceSectionPreviewFetch> {
  const apiKey = getBuilderPublicApiKey();
  if (!apiKey) {
    return { status: "missing_api_key" };
  }

  const url = new URL(
    `https://cdn.builder.io/api/v3/content/${encodeURIComponent(BUILDER_COMMERCE_SECTION_MODEL)}`,
  );
  url.searchParams.set("apiKey", apiKey);
  url.searchParams.set("userAttributes.urlPath", BUILDER_PREVIEW_URL_PATH);

  try {
    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return {
        status: "fetch_error",
        message: `HTTP ${res.status}${text ? `: ${text.slice(0, 200)}` : ""}`,
      };
    }

    const json = (await res.json()) as BuilderContentListResponse;
    const content = json.results?.[0];
    if (!content) {
      return { status: "empty" };
    }

    return { status: "ok", content };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return { status: "fetch_error", message };
  }
}
