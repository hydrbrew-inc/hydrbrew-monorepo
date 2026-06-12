// Serves the standalone /protocol landing page (Afternoon Caffeine Audit).
// Vite inlines the HTML at build time via ?raw so it works on Cloudflare Workers.
import protocolHtml from "../../public/protocol/index.html?raw";

export async function loader() {
  return new Response(protocolHtml, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
