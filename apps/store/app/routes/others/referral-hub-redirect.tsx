import { redirect, type LoaderFunctionArgs } from "react-router";

/**
 * The Viral Loops referral dashboard lives on the Vercel app
 * (apps/web/app/dashboard/myreferralhub) and was reachable at
 * hydrbrew.com/dashboard/myreferralhub until the domain moved to Oxygen.
 * Klaviyo flow emails still link here with the member's ?userCode= — forward
 * the full query string so those links keep working.
 */
export async function loader({ request }: LoaderFunctionArgs) {
  const { search } = new URL(request.url);
  return redirect(
    `https://hydrbrew-landing.vercel.app/dashboard/myreferralhub${search}`,
    { status: 302 },
  );
}
