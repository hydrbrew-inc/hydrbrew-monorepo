/**
 * Static env reads so Next.js can inline `NEXT_PUBLIC_*` for client bundles.
 * @see https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
 */
export function getBuilderPublicApiKey(): string | undefined {
  const key = process.env.NEXT_PUBLIC_BUILDER_API_KEY;
  if (typeof key === "string" && key.trim() !== "") return key.trim();
  return undefined;
}
