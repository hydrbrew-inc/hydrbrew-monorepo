import { siteMetadata } from "@repo/lib/site-config";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "hydrbrew°",
    url: siteMetadata.siteUrl,
    logo: `${siteMetadata.siteUrl}/logo.png`,
    description: siteMetadata.description,
    sameAs: [
      "https://www.instagram.com/hydrbrew",
      "https://www.tiktok.com/@hydrbrew",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
