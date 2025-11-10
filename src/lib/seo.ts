import type { DefaultSeoProps } from "next-seo";

export const defaultSeoConfig: DefaultSeoProps = {
  titleTemplate: "%s | VIATERRA",
  defaultTitle: "VIATERRA | Bodega mexicana de lujo",
  description:
    "VIATERRA es una bodega mexicana de edición limitada. Explora nuestros vinos, descubre historias A/B y asegura tu preventa.",
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
    },
  ],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://viaterra.mx",
    siteName: "VIATERRA",
    images: [
      {
        url: "https://viaterra.mx/og/viaterra-og.jpg",
        width: 1200,
        height: 630,
        alt: "Botella VIATERRA iluminada con destellos dorados",
      },
    ],
  },
  twitter: {
    handle: "@viaterra",
    site: "@viaterra",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "theme-color",
      content: "#000000",
    },
    {
      name: "color-scheme",
      content: "dark",
    },
    {
      name: "robots",
      content: "index, follow",
    },
  ],
};
