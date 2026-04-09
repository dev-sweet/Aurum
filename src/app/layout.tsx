import type { Metadata } from "next";
import { Jost, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AURUM | Crafted for the Exceptional",
  description: "Ultra-luxury fashion, accessories, and lifestyle objects. Discover exceptional craftsmanship and timeless design in our exclusive collections.",
  keywords: ["luxury", "fashion", "watches", "accessories", "lifestyle", "premium", "handcrafted", "AURUM"],
  authors: [{ name: "AURUM" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "AURUM | Crafted for the Exceptional",
    description: "Ultra-luxury fashion, accessories, and lifestyle objects",
    url: "https://aurum.com",
    siteName: "AURUM",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AURUM | Crafted for the Exceptional",
    description: "Ultra-luxury fashion, accessories, and lifestyle objects",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${jost.variable} ${cormorant.variable} antialiased bg-[#0A0A0A] text-[#F5F0E8]`}
      >
        <Header />
        {children}
        <Footer />
        <Toaster />

      </body>
    </html>
  );
}
