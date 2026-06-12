// Serves the standalone /protocol landing page (Afternoon Caffeine Audit).
// Vite inlines the HTML at build time via ?raw so it works on Cloudflare Workers.
// Images are imported via Vite so they are fingerprinted and guaranteed on the CDN.
import protocolHtml from "../../public/protocol/index.html?raw";
import heroCan from "../../public/protocol/assets/hero-can.webp";
import lifestyle from "../../public/protocol/assets/lifestyle.webp";

const html = protocolHtml
  .replace('src="/protocol/assets/hero-can.webp"', `src="${heroCan}"`)
  .replace('src="/protocol/assets/lifestyle.webp"', `src="${lifestyle}"`);

export async function loader() {
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
