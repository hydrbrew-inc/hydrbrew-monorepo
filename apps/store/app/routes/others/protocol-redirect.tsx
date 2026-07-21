// @ts-expect-error — Vite ?raw import, no module declaration needed
import protocolHtml from "./protocol.html?raw";

/**
 * /protocol — the "Afternoon Protocol Finder" (Caffeine Audit tool), ported
 * from the pre-Hydrogen Vercel landing site where a Next.js rewrite mapped
 * /protocol → public/protocol/index.html. The HTML is bundled into the worker
 * at build time (?raw) because Oxygen/MiniOxygen workers cannot reliably fetch
 * their own origin. Its images live in public/protocol/assets/ and are served
 * as regular static files.
 */
export async function loader() {
  return new Response(protocolHtml, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  });
}
