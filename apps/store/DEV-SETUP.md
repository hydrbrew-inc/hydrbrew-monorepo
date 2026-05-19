# Store app local dev (Hydrogen + Weaverse)

## Quick start

```powershell
cd apps/store
npm install
npm run dev
```

Open **`http://127.0.0.1:3456/`** in the browser (preferred on Windows).  
`localhost:3456` usually works too after the `vite.config.ts` host fix.

## Windows: connection refused?

Hydrogen uses **MiniOxygen** (Cloudflare workerd). On Windows, the dev server sometimes listens on IPv6 (`::1`) only while the browser uses `127.0.0.1`.

1. Stop all dev servers (`Ctrl+C`).
2. Run: `npm run dev:ipv4`
3. Use `http://127.0.0.1:3456/` (not only `localhost`).
4. If it still fails, use **WSL (Ubuntu)**:

   ```bash
   cd /mnt/c/work/Hydrbrew/hydrbrew-monorepo/apps/store
   npm install
   npm run dev
   ```

5. Install/repair [Visual C++ Redistributable (x64)](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist).

## Shopify store in `.env`

`npx shopify hydrogen env pull` links whatever store the CLI is connected to.

- **Weaverse Pilot demo** (e.g. `gweng8-n3.myshopify.com`) — fine for local theme/Studio testing.
- **Hydrbrew production** — run `npx shopify hydrogen link`, pick **hydrbrew**, then `npx shopify hydrogen env pull` and confirm domain is `hydrbrew.myshopify.com`.

All of `PUBLIC_STORE_DOMAIN`, `PUBLIC_STOREFRONT_API_TOKEN`, and `SHOP_ID` must be from the **same** store.

## Weaverse Studio

With `npm run dev` running, open:

`https://studio.weaverse.io/projects/<WEAVERSE_PROJECT_ID>`

## Env list in the terminal

`Environment variables injected into MiniOxygen` is informational (values loaded from `.env`), not an error.

## Oxygen shows "An unexpected error occurred"

Deploy can succeed while the live URL still 500s. Common causes:

1. **Env vars not on Oxygen** — local `.env` is not uploaded automatically. Push them:

   ```powershell
   npx shopify hydrogen env push --env production
   ```

   Confirm **Yes**. Required at minimum: `SESSION_SECRET`, `WEAVERSE_PROJECT_ID`, `WEAVERSE_API_KEY`.

2. **`PUBLIC_CHECKOUT_DOMAIN`** — use hostname only (no `https://`), e.g. `your-store.o2.myshopify.dev`.

3. **Mismatched Shopify credentials** — `PUBLIC_STORE_DOMAIN`, `PUBLIC_STOREFRONT_API_TOKEN`, and `SHOP_ID` must all be from the same store. Fix with `npx shopify hydrogen link` + `env pull` for Hydrbrew, then push again.

4. **Redeploy** after env changes:

   ```powershell
   npx shopify hydrogen deploy --force
   ```

5. **Logs** — Shopify Admin → Hydrogen → your storefront → **Deployments** → open latest → view logs.
