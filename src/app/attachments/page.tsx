import type { Metadata } from "next";
import CatalogView, {
  type CatalogSearchParams,
} from "@/components/catalog/catalog-view";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Attachments & Tools — Hydraulic Breakers, Buckets, Rippers",
  description:
    "Hydraulic breakers (jackhammers), heavy-duty buckets, rippers and quick couplers for excavators and carriers of all sizes.",
};

const KEYS = ["category", "subcategory", "brand", "availability", "q"] as const;

export default async function AttachmentsPage({
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
  return <CatalogView section="attachments" search={search} />;
}
