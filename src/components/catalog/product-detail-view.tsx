import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import type { Product } from "@/db/schema";
import { CATEGORIES, SECTIONS, SITE } from "@/lib/site";
import { Reveal } from "@/components/motion";
import ProductCard from "./product-card";

export default function ProductDetailView({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const category = CATEGORIES[product.category as keyof typeof CATEGORIES];
  const section = category ? SECTIONS[category.section] : null;
  const inStock = product.availability === "In Stock";

  const whatsappHref = `https://wa.me/2348033591883?text=${encodeURIComponent(
    `Hello Solid Equipment Ltd, I need a quote for ${product.name}${
      product.oemPartNumber ? ` (OEM ${product.oemPartNumber})` : ""
    }.`
  )}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    sku: product.oemPartNumber ?? product.slug,
    offers: {
      "@type": "Offer",
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      seller: { "@type": "Organization", name: SITE.name },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Band */}
      <div className="relative overflow-hidden bg-navy-950">
        <div className="grid-lines absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs text-steel-400"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            {section ? (
              <>
                <Link
                  href={section.href}
                  className="transition-colors hover:text-white"
                >
                  {section.label}
                </Link>
                <ChevronRight className="h-3 w-3" />
                <Link
                  href={`${section.href}?category=${product.category}`}
                  className="transition-colors hover:text-white"
                >
                  {category?.label}
                </Link>
                <ChevronRight className="h-3 w-3" />
              </>
            ) : null}
            <span className="text-white">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main */}
      <div className="bg-steel-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Image */}
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-steel-200 bg-steel-100 shadow-sm">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-navy-900 shadow-sm">
                    {product.brand}
                  </span>
                  <span
                    className={`rounded-md px-2.5 py-1 text-xs font-semibold text-white ${
                      inStock ? "bg-emerald-500" : "bg-gold-500"
                    }`}
                  >
                    {product.availability}
                  </span>
                </div>
                <span className="absolute bottom-4 left-4 rounded-md bg-white/95 px-2.5 py-1 text-xs font-medium text-navy-800 shadow-sm">
                  {product.condition}
                </span>
              </div>
            </Reveal>

            {/* Info */}
            <Reveal delay={120}>
              <div className="flex h-full flex-col">
                <p className="text-sm font-medium text-bronze-600">
                  {product.brand}
                  {product.model ? ` · ${product.model}` : ""}
                  {product.oemPartNumber ? ` · OEM ${product.oemPartNumber}` : ""}
                </p>
                <h1 className="mt-3 font-display text-2xl leading-tight font-bold tracking-tight text-navy-900 md:text-3xl">
                  {product.name}
                </h1>
                <p className="mt-5 leading-relaxed text-steel-600">
                  {product.description}
                </p>

                <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-steel-200 bg-steel-200">
                  {[
                    { label: "Condition", value: product.condition },
                    { label: "Availability", value: product.availability },
                    { label: "Category", value: category?.label ?? "—" },
                    { label: "Brand", value: product.brand },
                  ].map((f) => (
                    <div key={f.label} className="bg-white p-4">
                      <div className="text-xs text-steel-500">
                        {f.label}
                      </div>
                      <div className="mt-1.5 text-sm font-semibold text-navy-900">
                        {f.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={`/rfq?product=${product.slug}`}
                    className="group inline-flex items-center gap-2.5 rounded-lg bg-bronze-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-bronze-500"
                  >
                    Request a Quote
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-lg border border-emerald-600/40 px-6 py-3 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Quote
                  </a>
                </div>

                <div className="mt-8 space-y-2.5 border-t border-steel-200 pt-6 text-sm text-steel-600">
                  <p className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                    Inspected, serviced &amp; dispatched from our Port Harcourt
                    yard
                  </p>
                  <p className="flex items-center gap-2.5">
                    <CalendarCheck2 className="h-4 w-4 shrink-0 text-bronze-600" />
                    Flexible leasing or outright purchase terms available
                  </p>
                  <p className="flex items-center gap-2.5">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-gold-600" />
                    Genuine OEM &amp; verified aftermarket components
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Specs */}
          {product.specs.length > 0 ? (
            <Reveal className="mt-16">
              <div className="overflow-hidden rounded-lg border border-steel-200 bg-white">
                <div className="flex items-center justify-between bg-navy-950 px-6 py-4">
                  <h2 className="text-sm font-semibold text-white">
                    Technical Specifications
                  </h2>
                  <span className="text-xs text-steel-400">
                    {product.brand}
                  </span>
                </div>
                <div className="grid md:grid-cols-2">
                  {product.specs.map((spec, i) => (
                    <div
                      key={spec.label}
                      className={`flex items-baseline justify-between gap-6 px-6 py-4 ${
                        i % 2 === 0 ? "bg-steel-50/60" : ""
                      }`}
                    >
                      <span className="flex items-baseline gap-3 text-sm text-steel-600">
                        <span className="font-mono text-[10px] text-steel-400">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {spec.label}
                      </span>
                      <span className="font-medium text-navy-900">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ) : null}

          {/* Related */}
          {related.length > 0 ? (
            <div className="mt-16">
              <div className="mb-8 flex items-end justify-between">
                <h2 className="font-display text-2xl font-bold tracking-tight text-navy-900">
                  Related Equipment
                </h2>
                {section ? (
                  <Link
                    href={section.href}
                    className="text-sm font-semibold text-bronze-600 transition-colors hover:text-bronze-500"
                  >
                    View all →
                  </Link>
                ) : null}
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
