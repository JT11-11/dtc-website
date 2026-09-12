import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { workItems } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/about", "/contact", "/partners", "/work"].map(
    (path) => ({
      url: `${SITE_URL}${path || "/"}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );
  return [
    ...staticRoutes,
    {
      // The DTC-owned database view (map + canonical table).
      url: `${SITE_URL}/work/database`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    // Per-research permalinks resolve client-side via ?id= today; listed so
    // crawlers discover them, and ready for real /work/[id] pages later.
    ...workItems.map((w) => ({
      url: `${SITE_URL}/work#${w.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
