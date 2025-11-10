import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { DefaultSeo } from "@/components/seo/default-seo";
import { siteMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteMetadata.siteName,
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  metadataBase: new URL("https://lux-mexican-winery.example.com"),
  openGraph: {
    title: siteMetadata.siteName,
    description: siteMetadata.description,
    url: "https://lux-mexican-winery.example.com",
    siteName: siteMetadata.siteName,
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.siteName,
    description: siteMetadata.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={cn("bg-background text-foreground", playfair.variable, inter.variable)}>
        <Providers>
          <DefaultSeo />
          {children}
        </Providers>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
