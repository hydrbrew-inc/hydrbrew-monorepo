import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HydrBrew — Scan (placeholder)",
  description: "Monorepo placeholder for the scan app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
