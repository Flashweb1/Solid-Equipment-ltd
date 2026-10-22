import type { Metadata } from "next";
import CatalogView, {
  type CatalogSearchParams,
} from "@/components/catalog/catalog-view";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Spare Parts & Engines — OEM Components, Turbochargers, Undercarriage",
  description:
    "Genuine OEM and aftermarket spare parts: complete engines, turbochargers, undercarriage track chains, rollers, sprockets and wear parts (GET) for Caterpillar, Komatsu & Hyundai.",
};

const KEYS = ["category", "subcategory", "brand", "availability", "q"] as const;

export default async function PartsPage({
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
  return <CatalogView section="parts" search={search} />;
}
