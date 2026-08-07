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
