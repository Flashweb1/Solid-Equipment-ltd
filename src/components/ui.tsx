import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
  href,
  hrefLabel = "View all",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  dark?: boolean;
  href?: string;
  hrefLabel?: string;
}) {
  const match = eyebrow.match(/^(\d+)\s*·\s*(.*)$/);
  const num = match ? match[1] : null;
  const label = match ? match[2] : eyebrow;

  return (
    <div className="mb-12 md:mb-16">
      <div className="flex items-center gap-4">
        {num ? (
          <span className="font-mono text-xs font-bold text-bronze-600">
            {num}
          </span>
        ) : null}
        <span
          className={`h-px w-12 ${dark ? "bg-white/25" : "bg-navy-900/20"}`}
        />
        <span
          className={`text-xs font-semibold uppercase tracking-wide ${
            dark ? "text-steel-300" : "text-steel-500"
          }`}
        >
          {label}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <h2
          className={`max-w-3xl font-display text-2xl leading-tight font-bold tracking-tight text-balance md:text-4xl ${
            dark ? "text-white" : "text-navy-900"
          }`}
        >
          {title}
        </h2>
        {href ? (
          <Link
            href={href}
            className={`group inline-flex items-center gap-2.5 pb-1 text-sm font-semibold transition-colors ${
              dark
                ? "text-white hover:text-gold-400"
                : "text-navy-900 hover:text-bronze-600"
            }`}
          >
            <span className="border-b border-transparent transition-colors group-hover:border-current">
              {hrefLabel}
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : null}
      </div>

      {description ? (
        <p
          className={`mt-5 max-w-2xl text-base leading-relaxed md:text-lg ${
            dark ? "text-steel-300" : "text-steel-600"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function AvailabilityBadge({ availability }: { availability: string }) {
  const inStock = availability === "In Stock";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold ${
        inStock
          ? "bg-emerald-50 text-emerald-700"
          : "bg-amber-50 text-amber-700"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          inStock ? "bg-emerald-500" : "bg-amber-500"
        }`}
      />
      {availability}
    </span>
  );
}
