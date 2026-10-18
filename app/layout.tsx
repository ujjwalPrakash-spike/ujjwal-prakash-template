import type { Metadata } from "next";
import { Inter_Tight, Geist_Mono } from "next/font/google";
import { SITE_METADATA } from "@/lib/site/constants";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { SiteFooter } from "@/components/ui/SiteFooter";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${geistMono.variable} dark h-full`}
    >
      <body className="min-h-full bg-[#06080d] text-white antialiased font-sans flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
        <SiteFooter />
      </body>
    </html>
  );
}
