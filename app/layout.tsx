import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Immo-Showcase - Premium Real Estate",
  description: "Premium real estate for investors beyond ownership.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable} data-scroll-behavior="smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://db.onlinewebfonts.com/c/cc69fe194f7ed41628d4628f37a10a21?family=Haboro+Norm+Regular"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
