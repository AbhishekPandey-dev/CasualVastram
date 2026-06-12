import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import MarqueeStrip from "@/components/layout/MarqueeStrip";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Casual Vastram | Comfort Meets Creativity",
  description: "Premium oversized streetwear.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <MarqueeStrip />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

