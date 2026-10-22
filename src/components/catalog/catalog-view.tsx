import Link from "next/link";
import { ChevronRight, PackageSearch } from "lucide-react";
import { getProducts } from "@/lib/queries";
import {
  CATEGORIES,
  SECTIONS,
  type CategoryKey,
  type SectionKey,
} from "@/lib/site";
import ProductCard from "./product-card";
import CatalogFilters from "./catalog-filters";
import { Reveal } from "@/components/motion";

const SECTION_COPY: Record<
  SectionKey,
  { title: string; description: string }
> = {
  machinery: {
    title: "Machinery Fleet",
    description:
      "Excavators, dozers, graders, loaders and haulers — available for flexible lease or outright purchase, deployed with full documentation and site-ready inspection.",
  },
  attachments: {
    title: "Attachments & Tools",
    description:
      "Hydraulic breakers, heavy-duty buckets, rippers and quick couplers engineered for high-impact carriers and demolition work.",
  },
  parts: {
    title: "Spare Parts & Engines",
    description:
      "Genuine OEM and quality aftermarket components — engines, turbochargers, undercarriage and ground engaging tools, dispatched across West Africa.",
  },
};

export type CatalogSearchParams = {
  category?: string;
  subcategory?: string;
  brand?: string;
  availability?: string;
  q?: string;
};

export default async function CatalogView({
  section,
  search,
}: {
  section: SectionKey;
  search: CatalogSearchParams;
}) {
  const sectionCategories = SECTIONS[section].categories;

  const selectedCategories = (search.category ?? "")
    .split(",")
    .filter((c) => sectionCategories.includes(c as CategoryKey));

  const products = await getProducts({
    categories: selectedCategories.length
      ? selectedCategories
      : sectionCategories,
    subcategory: search.subcategory,
    brand: search.brand,
    availability: search.availability,
    q: search.q,
  });

  const copy = SECTION_COPY[section];

  return (
    <>
      {/* Page band */}
      <div className="relative overflow-hidden bg-navy-950">
        <div className="grid-lines absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-steel-400"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{copy.title}</span>
          </nav>
          <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-steel-300 md:text-base">
            {copy.description}
          </p>
          <div className="mt-6 flex items-center gap-2.5 text-sm text-steel-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {products.length} {products.length === 1 ? "listing" : "listings"}{" "}
            available
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-steel-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[280px_1fr] lg:py-16">
          <CatalogFilters section={section} />

          <div>
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-steel-300 bg-white px-6 py-20 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-steel-100">
                  <PackageSearch className="h-8 w-8 text-steel-400" />
                </span>
                <h2 className="mt-5 font-display text-2xl font-bold text-navy-900">
                  No matches found
                </h2>
                <p className="mt-2 max-w-md text-sm text-steel-500">
                  No equipment matches your current filters. Adjust the filters
                  or submit an RFQ — our procurement desk sources custom
                  requirements weekly.
                </p>
                <Link
                  href="/rfq"
                  className="mt-6 rounded-lg bg-bronze-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-bronze-500"
                >
                  Submit an RFQ
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((p, i) => (
                  <Reveal key={p.slug} delay={Math.min(i * 60, 240)}>
                    <ProductCard product={p} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
