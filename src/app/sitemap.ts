import type { MetadataRoute } from "next";

import { wines } from "@/lib/data";

const baseUrl = "https://viaterra.mx";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/wines",
    "/story",
    "/preorder",
    "/stories",
    "/partners",
    "/contact",
    "/privacy",
  ];

  const wineRoutes = wines.flatMap((wine) =>
    wine.vintages.map(
      (vintage) => `/wine/${wine.slug}/${vintage.year.toString()}`,
    ),
  );

  return [...staticRoutes, ...wineRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
