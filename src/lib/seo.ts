import type { DefaultSeoProps } from "next-seo";

const siteUrl = "https://lux-mexican-winery.example.com";

export const defaultSeo: DefaultSeoProps = {
  titleTemplate: "%s | Bodega Círculo Interior",
  defaultTitle: "Bodega Círculo Interior",
  description:
    "Vinos de autor desde Aguascalientes; cada botella cuenta una historia A/B hecha para ser compartida.",
  canonical: siteUrl,
  openGraph: {
    url: siteUrl,
    type: "website",
    locale: "es_MX",
    siteName: "Bodega Círculo Interior",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Botella rosé con detalles dorados sobre fondo negro.",
      },
    ],
  },
  twitter: {
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "theme-color",
      content: "#000000",
    },
    {
      name: "author",
      content: "Bodega Círculo Interior",
    },
  ],
};

export const siteMetadata = {
  siteName: "Bodega Círculo Interior",
  shortName: "Círculo Interior",
  description:
    "Una bodega mexicana que celebra historias duales con vinos de edición limitada.",
  keywords: [
    "vino rosé mexicano",
    "bodega de lujo",
    "edición limitada",
    "historias A/B",
    "Aguascalientes vino",
  ],
};
