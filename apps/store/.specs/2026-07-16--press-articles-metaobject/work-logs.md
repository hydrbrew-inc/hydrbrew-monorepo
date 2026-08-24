# Work Logs

## 2026-07-16 — @dmytro
- Added Weaverse component `loader` to `hb-footer-cta` querying the
  `press_article` metaobject; Press modal renders entries as cards.
- Metaobject definition NOT yet created in Shopify Admin.

## 2026-07-23 — @dmytro
- Louis reported "Press article" missing under Admin → Metaobjects: the
  definition still has to be created (it is not auto-created by the query).
- Added `FALLBACK_PRESS_ARTICLES` so the first piece of coverage (Sable West,
  "Editor's Guide: The Luxury Fitness and Wellness Brands Worth Discovering")
  is live now without blocking on Admin setup. Admin entries override the
  fallback entirely once they exist.
- Capped the grid at `MAX_PRESS_ARTICLES = 3` per Louis's note that the section
  has room for three; unfilled slots keep the dashed "pending" placeholders so
  the row always reads as three across.
- Cards without an `imageUrl` render the outlet name as a wordmark instead of a
  generic file icon. Press asset image still to be uploaded to Admin → Content
  → Files; its CDN URL goes in `imageUrl` on the fallback entry.
- Verified locally: `GET /` → 200, footer renders, article headline/outlet/URL
  present in the served module. The metaobjects query does not throw for a
  missing definition — it returns an empty node list, so the fallback engages
  via the empty-array path rather than the try/catch.

## 2026-07-24 — @dmytro
- Louis blocked a second time: still no "Press article" option in Admin. The
  definition genuinely does not exist yet and cannot be created from this repo
  — only `PRIVATE_STOREFRONT_API_TOKEN` is configured, and metaobject
  *definitions* require the Admin API or the Admin UI. Storefront API can read
  definitions but never create them.
- **Remaining action is manual, in Shopify Admin** (see README setup steps).
- Made `parsePressArticles` accept alias field keys (`title`/`link`/
  `publication`/`published_date`, etc.) so the hand-created definition works
  even if field names differ slightly from the spec. Only `headline` + `url`
  equivalents are required; an entry missing either is skipped.

## 2026-07-25 — @dmytro
- Louis's Admin screenshot confirms the diagnosis: Content → Metaobjects shows
  **"No definitions found"**. The 10 existing entries are Shopify's standard
  "Dietary supplements" type; there are zero custom definitions.
- Verified independently against the live Storefront API — all press type
  handles return empty node lists. Store handle is `gweng8-n3.myshopify.com`
  (`hydrbrew.myshopify.com` is an alias on the SAME store, not a second store).
- Query now requests three likely type handles via GraphQL aliases
  (`press_article`, `press`, `press_coverage`) and merges the results, so a
  differently-named definition still works. Non-existent types return empty
  lists rather than errors, so unused aliases are harmless. Validated the exact
  query against the live API: HTTP 200.
- **Still blocked on the manual Admin step.** Nothing further can be done from
  the repo; the definition must be created in Admin (Add definition button,
  top-right of the Metaobjects page).
