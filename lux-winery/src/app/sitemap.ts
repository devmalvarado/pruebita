import type { MetadataRoute } from "next"

const baseUrl = "https://www.casa-intencion.com"

const staticRoutes = [
  "",
  "/wines",
  "/story",
  "/stories",
  "/preorder",
  "/partners",
  "/contact",
  "/privacy",
  "/terms",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const wineRoutes = [
    "/wine/canto-circular-rose/2026",
  ]

  return [...staticRoutes, ...wineRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }))
}
