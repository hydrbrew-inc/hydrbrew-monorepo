import type { LoaderFunctionArgs } from "react-router";

// Products, pages, collections, blogs and articles are listed by
// shop.hydrbrew.com's sitemap, the SEO canonical. This index only lists
// the Weaverse custom pages that exist on hydrbrew.com alone.
export function loader({ request }: LoaderFunctionArgs) {
  const { origin } = new URL(request.url);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${origin}/sitemap-weaverse.xml</loc>
  </sitemap>
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": `max-age=${60 * 60 * 24}`,
    },
  });
}
