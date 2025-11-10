import type { MetadataRoute } from "next";
import { wines } from "@/lib/data";

const baseUrl = "https://lux-mexican-winery.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/wines",
    "/story",
    "/preorder",
    "/stories",
    "/partners",
    "/contact",
    "/privacy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const wineRoutes = wines.flatMap((wine) =>
    wine.vintages.map((vintage) => ({
      url: `${baseUrl}/wine/${wine.slug}/${vintage.year}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    }))
  );

  return [...staticRoutes, ...wineRoutes];
}
