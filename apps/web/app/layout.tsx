import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { siteMetadata } from "@repo/lib/site-config";
import { GoogleAnalytics } from "../components/analytics/GoogleAnalytics";
import { JsonLd } from "../components/JsonLd";
import { KlaviyoOnsite } from "../components/analytics/KlaviyoOnsite";
import { MetaPixel } from "../components/analytics/MetaPixel";
import { PostHog } from "../components/analytics/PostHog";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  robots: { index: true, follow: true },
  alternates: {
    canonical: siteMetadata.siteUrl,
  },
  openGraph: {
    type: "website",
    title: siteMetadata.ogTitle,
    description: siteMetadata.ogDescription,
    url: siteMetadata.siteUrl,
    siteName: "hydrbrew°",
    locale: "en_US",
    images: [
      {
        url: `${siteMetadata.siteUrl}${siteMetadata.ogImage}`,
        width: 1200,
        height: 630,
        alt: "hydrbrew° — Functional Iced Coffee | Zero Systemic Debt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.ogTitle,
    description: siteMetadata.ogDescription,
    images: [`${siteMetadata.siteUrl}${siteMetadata.ogImage}`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/E8Ar62i.jpeg"
          fetchPriority="high"
        />
        <JsonLd />
        <KlaviyoOnsite />
      </head>
      <body
        className={`${inter.className} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <GoogleAnalytics />
        <MetaPixel />
        <PostHog />
      </body>
    </html>
  );
}
