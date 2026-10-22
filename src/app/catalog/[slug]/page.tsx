import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailView from "@/components/catalog/product-detail-view";
import { getProductBySlug, getRelatedProducts } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Equipment Not Found" };
  return {
    title: `${product.name}${product.oemPartNumber ? ` — OEM ${product.oemPartNumber}` : ""}`,
    description: product.description.slice(0, 160),
    alternates: { canonical: `/catalog/${product.slug}` },
    openGraph: { images: [{ url: product.imageUrl }] },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const related = await getRelatedProducts(product.category, product.slug, 3);
  return <ProductDetailView product={product} related={related} />;
}
