import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display as PlayfairDisplay } from "next/font/google";
import { Toaster } from "sonner";
import { DefaultSeo } from "next-seo";

import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { defaultSeoConfig } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = PlayfairDisplay({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://viaterra.mx"),
  title: {
    default: "VIATERRA | Bodega mexicana de lujo",
    template: "%s | VIATERRA",
  },
  description:
    "Vinos mexicanos de colección donde cada botella narra un pasado y un futuro. Descubre ediciones limitadas, historias A/B y preventas exclusivas.",
  keywords: [
    "vino mexicano",
    "vinícola de lujo",
    "rosé de prensa",
    "edición limitada",
    "preventa de vino",
  ],
  authors: [{ name: "VIATERRA" }],
  creator: "VIATERRA",
  publisher: "VIATERRA",
  openGraph: {
    title: "VIATERRA | Bodega mexicana de lujo",
    description:
      "Colecciones limitadas nacidas en Aguascalientes. Historias A/B, preventas exclusivas y experiencias memorables.",
    type: "website",
    locale: "es_MX",
    url: "https://viaterra.mx",
    siteName: "VIATERRA",
    images: [
      {
        url: "https://viaterra.mx/og/viaterra-og.jpg",
        width: 1200,
        height: 630,
        alt: "Botella de vino rosé VIATERRA con destellos dorados",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VIATERRA | Bodega mexicana de lujo",
    description:
      "Cada botella despierta dos historias. Reserva tu experiencia A/B.",
    site: "@viaterra",
    creator: "@viaterra",
  },
  alternates: {
    canonical: "https://viaterra.mx",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${playfair.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-background text-foreground selection:bg-gold/20 selection:text-gold">
        <DefaultSeo {...defaultSeoConfig} />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster richColors theme="dark" position="top-right" />
      </body>
    </html>
  );
}
