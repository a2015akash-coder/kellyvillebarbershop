import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllServices } from "@/lib/service-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  let serviceRoutes: MetadataRoute.Sitemap = [];
  try {
    const services = await getAllServices();
    serviceRoutes = services.map((s) => ({
        url: `${SITE_URL}/mens-haircuts-beard-trims-kellyville/${s.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));
  } catch {
    // Firestore unavailable — skip dynamic service URLs
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/mens-haircuts-beard-trims-kellyville`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/monthly-draw-kellyville-barber`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/win`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  return [...staticRoutes, ...serviceRoutes];
}
