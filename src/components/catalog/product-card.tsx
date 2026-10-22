import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/db/schema";

export default function ProductCard({ product }: { product: Product }) {
  const inStock = product.availability === "In Stock";

  return (
    <Link
      href={`/catalog/${product.slug}`}
      className="card-soft group flex h-full flex-col overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-steel-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <span className="absolute top-3 left-3 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-navy-900 shadow-sm">
          {product.brand}
        </span>
        <span
          className={`absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold shadow-sm ${
            inStock ? "text-emerald-700" : "text-gold-600"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              inStock ? "bg-emerald-500" : "bg-gold-500"
            }`}
          />
          {product.availability}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[15px] leading-snug font-semibold text-navy-900 transition-colors group-hover:text-bronze-600">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-steel-500">
          {product.model ? `${product.model}` : "—"}
          {product.oemPartNumber ? ` · ${product.oemPartNumber}` : ""} ·{" "}
          {product.condition}
        </p>

        <div className="mt-4 space-y-1.5 border-t border-steel-100 pt-4">
          {product.specs.slice(0, 3).map((spec) => (
            <div key={spec.label} className="flex items-baseline justify-between gap-3 text-xs">
              <span className="text-steel-500">{spec.label}</span>
              <span className="font-medium text-navy-800">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-xs text-steel-400">Price on request</span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-bronze-600">
            Request
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
