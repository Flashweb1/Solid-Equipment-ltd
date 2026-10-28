import type { MetadataRoute } from "next";
import { getProductsForSitemap } from "@/lib/queries";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

// Fixed baseline for routes whose content isn't timestamp-tracked; product URLs
// use their real createdAt. Avoids telling crawlers "everything changed now".
const STATIC_BASELINE = new Date("2026-01-01T00:00:00.000Z");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/machinery",
    "/attachments",
    "/parts",
    "/sectors",
    "/about",
    "/contact",
    "/rfq",
    "/search",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: STATIC_BASELINE,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const rows = await getProductsForSitemap();
  const productRoutes: MetadataRoute.Sitemap = rows.map((row) => ({
    url: `${SITE.url}/catalog/${row.slug}`,
    lastModified: row.createdAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
