/**
 * Builder.io naming (agreed convention for this repo):
 * - Model handle in Builder: `commerce-section` (one reusable “commerce block” type).
 * - Preview route: `/builder-preview` — content is fetched with `userAttributes.urlPath`
 *   matching this path, so marketing targets this URL in Builder for the preview entry.
 */
export const BUILDER_COMMERCE_SECTION_MODEL = "commerce-section" as const;

export const BUILDER_PREVIEW_URL_PATH = "/builder-preview" as const;
