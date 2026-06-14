import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk, Urbanist } from "next/font/google";
import { siteMetadata } from "@repo/lib/site-config";
import { GoogleAnalytics } from "../components/analytics/GoogleAnalytics";
import { JsonLd } from "../components/JsonLd";
import { KlaviyoOnsite } from "../components/analytics/KlaviyoOnsite";
import { MetaPixel } from "../components/analytics/MetaPixel";
import { PostHog } from "../components/analytics/PostHog";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  robots: { index: true, follow: true },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: { title: "hydrbrew°" },
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://us.i.posthog.com" />
        <link
          rel="preload"
          as="image"
          href="/images/E8Ar62i.webp"
          fetchPriority="high"
        />
        <JsonLd />
      </head>
      <body
        className={`${inter.className} ${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${urbanist.variable} antialiased`}
      >
        {children}
        <GoogleAnalytics />
        <KlaviyoOnsite />
        <MetaPixel />
        <PostHog />
      </body>
    </html>
  );
}
