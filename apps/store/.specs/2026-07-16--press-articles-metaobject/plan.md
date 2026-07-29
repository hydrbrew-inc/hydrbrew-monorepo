# Plan: Press Articles via Metaobjects

## Approach

Follow the existing `our-team` section pattern: a Weaverse component `loader`
(`ComponentLoaderArgs`) that queries Storefront API metaobjects server-side and
delivers results to the section via the `loaderData` prop. No client fetch, no
new API route.

The metaobject type is hardcoded to `press_article` (no Weaverse picker —
simpler for a single-purpose section). The loader try/catches so the site keeps
working before the definition exists in Shopify Admin.

## Metaobject definition (created once in Shopify Admin)

Type handle: `press_article` — Settings → Custom data → Metaobjects → Add
definition, with **Storefronts** access enabled. Fields:

| Key        | Type                    | Required |
| ---------- | ----------------------- | -------- |
| `headline` | Single line text        | yes      |
| `outlet`   | Single line text        | yes      |
| `url`      | URL                     | yes      |
| `image`    | File (image)            | no       |
| `date`     | Date                    | no       |

Louis then adds entries at Content → Metaobjects → Press article.

## Code changes

- `app/sections/hb-footer-cta/index.tsx`
  - `export const loader` querying `metaobjects(type: "press_article", first: 24)`
  - Parse fields → `PressArticle[]`, sorted newest-first by `date`
  - Press modal: render article cards (outlet, headline, date, external link,
    optional logo image); keep "[ COVERAGE PENDING ]" placeholders and
    "Coming soon" subtitle when the list is empty

## Files touched

- `apps/store/app/sections/hb-footer-cta/index.tsx`
- `apps/store/.specs/2026-07-16--press-articles-metaobject/` (this spec)
