import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { siteMetadata } from "@repo/lib/site-config";
import { GoogleAnalytics } from "../components/analytics/GoogleAnalytics";
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
  openGraph: {
    title: siteMetadata.ogTitle,
    description: siteMetadata.ogDescription,
    type: "website",
    siteName: "hydrbrew°",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.ogTitle,
    description: siteMetadata.ogDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${jetbrainsMono.variable} antialiased`}
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
