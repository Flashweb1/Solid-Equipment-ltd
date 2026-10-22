import type { Metadata } from "next";
import CatalogView, {
  type CatalogSearchParams,
} from "@/components/catalog/catalog-view";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Machinery Fleet — Earthmoving, Material Handling & Road Equipment",
  description:
    "Excavators, dozers, graders, wheel loaders and articulated haulers for lease or outright purchase. Caterpillar, Komatsu & Hyundai fleets deployed across West Africa.",
  alternates: { canonical: "/machinery" },
};

const KEYS = ["category", "subcategory", "brand", "availability", "q"] as const;

export default async function MachineryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const search: CatalogSearchParams = {};
  for (const key of KEYS) {
    const v = sp[key];
    if (typeof v === "string" && v) search[key] = v;
  }
  return <CatalogView section="machinery" search={search} />;
}
