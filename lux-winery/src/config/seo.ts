import type { DefaultSeoProps } from "next-seo"

const title = "Casa Intención Winery"
const description =
  "Luxury Mexican winery crafting paired A/B story vintages with meticulous intention."

const seoConfig: DefaultSeoProps = {
  title,
  description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.casa-intencion.com",
    title,
    description,
    siteName: title,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Casa Intención Winery — Every bottle tells a story.",
      },
    ],
  },
  twitter: {
    cardType: "summary_large_image",
    site: "@casaintencion",
  },
  additionalMetaTags: [
    {
      name: "theme-color",
      content: "#000000",
    },
    {
      name: "apple-mobile-web-app-title",
      content: title,
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black",
    },
    {
      name: "application-name",
      content: title,
    },
  ],
}

export default seoConfig
