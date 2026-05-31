import { useRouteLoaderData } from "react-router";
import type { RootLoader } from "~/root";

export function KlaviyoOnsiteScript() {
  const data = useRouteLoaderData<RootLoader>("root");
  const publicKey = data?.publicKlaviyoPublicKey;
  if (!publicKey) return null;
  return (
    <script
      async
      type="text/javascript"
      src={`https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${publicKey}`}
    />
  );
}
