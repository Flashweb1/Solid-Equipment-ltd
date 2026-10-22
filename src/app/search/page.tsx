import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, PackageSearch } from "lucide-react";
import SearchBar from "@/components/search-bar";
import ProductCard from "@/components/catalog/product-card";
import { getProducts } from "@/lib/queries";
import { Reveal } from "@/components/motion";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  return {
    title: q ? `Search — “${q}”` : "Search Equipment & Parts",
    description: `Search the Solid Equipment Ltd catalog for ${q || "machinery and spare parts"}.`,
    alternates: { canonical: "/search" },
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const results = q ? await getProducts({ q }) : [];

  return (
    <>
      <div className="relative overflow-hidden bg-navy-950">
        <div className="grid-lines absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 sm:px-6 md:py-20">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-steel-400"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">Search</span>
          </nav>
          <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            Catalog Search
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-steel-300 md:text-base">
            Search across machinery, attachments and spare parts by part name,
            OEM part number, brand or machinery model.
          </p>
          <div className="mt-8">
            <SearchBar />
          </div>
        </div>
      </div>

      <div className="bg-steel-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
          {q ? (
            <p className="mb-8 text-sm text-steel-500">
              {results.length} {results.length === 1 ? "result" : "results"} for
              “<span className="font-medium text-bronze-600">{q}</span>”
            </p>
          ) : null}

          {q && results.length === 0 ? (
            <div className="flex flex-col items-center rounded-xl border border-dashed border-steel-300 bg-white px-6 py-20 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-steel-100">
                <PackageSearch className="h-8 w-8 text-steel-400" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold text-navy-900">
                Nothing found for “{q}”
              </h2>
              <p className="mt-2 max-w-md text-sm text-steel-500">
                Our procurement desk sources custom parts weekly — tell us what
                you need and we will find it.
              </p>
              <Link
                href="/rfq?service=parts"
                className="mt-6 rounded-lg bg-bronze-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-bronze-500"
              >
                Submit a Parts RFQ
              </Link>
            </div>
          ) : null}

          {!q ? (
            <div className="flex flex-col items-center rounded-xl border border-dashed border-steel-300 bg-white px-6 py-20 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-steel-100">
                <PackageSearch className="h-8 w-8 text-steel-400" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold text-navy-900">
                Start typing to search
              </h2>
              <p className="mt-2 max-w-md text-sm text-steel-500">
                Try “CAT 330”, “turbocharger”, “track chain” or an OEM part
                number.
              </p>
            </div>
          ) : null}

          {results.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((p, i) => (
                <Reveal key={p.slug} delay={Math.min(i * 60, 240)}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
