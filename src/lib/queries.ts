import { db } from "@/db";
import { products, type Product } from "@/db/schema";
import { and, asc, desc, eq, ilike, inArray, ne, or, sql } from "drizzle-orm";

export type CatalogFilters = {
  categories?: string[];
  subcategory?: string;
  brand?: string;
  availability?: string;
  q?: string;
  featuredOnly?: boolean;
  limit?: number;
};

export async function getProducts(
  filters: CatalogFilters = {}
): Promise<Product[]> {
  try {
    const conditions = [];
    if (filters.categories?.length) {
      conditions.push(inArray(products.category, filters.categories));
    }
    if (filters.subcategory) {
      conditions.push(eq(products.subcategory, filters.subcategory));
    }
    if (filters.brand) conditions.push(eq(products.brand, filters.brand));
    if (filters.availability) {
      conditions.push(eq(products.availability, filters.availability));
    }
    if (filters.featuredOnly) conditions.push(eq(products.featured, true));
    if (filters.q) {
      const like = `%${filters.q}%`;
      conditions.push(
        or(
          ilike(products.name, like),
          ilike(products.brand, like),
          ilike(products.model, like),
          ilike(products.oemPartNumber, like),
          ilike(products.description, like),
          sql`cast(${products.specs} as text) ilike ${like}`
        )
      );
    }

    const base = db.select().from(products);
    const filtered = conditions.length ? base.where(and(...conditions)) : base;
    const ordered = filtered.orderBy(
      desc(products.featured),
      asc(products.name)
    );
    const rows = filters.limit
      ? await ordered.limit(filters.limit)
      : await ordered;
    return rows;
  } catch (error) {
    console.error("getProducts failed:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const rows = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug))
      .limit(1);
    return rows[0] ?? null;
  } catch (error) {
    console.error("getProductBySlug failed:", error);
    return null;
  }
}

export async function getRelatedProducts(
  category: string,
  excludeSlug: string,
  limit = 3
): Promise<Product[]> {
  try {
    return await db
      .select()
      .from(products)
      .where(and(eq(products.category, category), ne(products.slug, excludeSlug)))
      .orderBy(desc(products.featured), asc(products.name))
      .limit(limit);
  } catch (error) {
    console.error("getRelatedProducts failed:", error);
    return [];
  }
}

export type Suggestion = {
  slug: string;
  name: string;
  brand: string;
  model: string | null;
  oemPartNumber: string | null;
  category: string;
  availability: string;
};

export async function getSearchSuggestions(q: string): Promise<Suggestion[]> {
  try {
    const like = `%${q}%`;
    return await db
      .select({
        slug: products.slug,
        name: products.name,
        brand: products.brand,
        model: products.model,
        oemPartNumber: products.oemPartNumber,
        category: products.category,
        availability: products.availability,
      })
      .from(products)
      .where(
        or(
          ilike(products.name, like),
          ilike(products.brand, like),
          ilike(products.model, like),
          ilike(products.oemPartNumber, like)
        )
      )
      .orderBy(desc(products.featured), asc(products.name))
      .limit(6);
  } catch (error) {
    console.error("getSearchSuggestions failed:", error);
    return [];
  }
}

export async function getAllProductSlugs(): Promise<string[]> {
  try {
    const rows = await db.select({ slug: products.slug }).from(products);
    return rows.map((r) => r.slug);
  } catch (error) {
    console.error("getAllProductSlugs failed:", error);
    return [];
  }
}
