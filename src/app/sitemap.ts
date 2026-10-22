import type { MetadataRoute } from "next";
import { getAllProductSlugs } from "@/lib/queries";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

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
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const slugs = await getAllProductSlugs();
  const productRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE.url}/catalog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
