import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { AppProviders } from "@/providers/app-providers"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.casa-intencion.com"),
  title: {
    default: "Casa Intención Winery",
    template: "%s | Casa Intención Winery",
  },
  description:
    "A limited-edition Mexican winery where every bottle is crafted as a poetic A/B story. Discover vintages, preorder releases, and share your own narrative.",
  keywords: [
    "Mexican winery",
    "luxury wine",
    "limited edition wine",
    "A/B story wine",
    "Casa Intención",
    "rosé de prensa",
  ],
  authors: [{ name: "Casa Intención" }],
  openGraph: {
    title: "Casa Intención Winery",
    description:
      "A luxury winery from Aguascalientes crafting paired A/B story vintages with intention.",
    url: "https://www.casa-intencion.com",
    siteName: "Casa Intención Winery",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Casa Intención Winery — Every bottle tells a story.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@casaintencion",
    creator: "@casaintencion",
  },
  alternates: {
    canonical: "/",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} bg-background text-foreground`}
      >
        <AppProviders>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  )
}
