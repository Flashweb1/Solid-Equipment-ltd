import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-navy-950">
      <div className="grid-lines absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="relative mx-auto max-w-xl px-6 py-24 text-center">
        <span className="text-sm font-semibold text-bronze-400">
          Error 404
        </span>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-steel-300">
          The page you requested does not exist or has been moved. Return to
          the homepage, or browse the equipment fleet and parts catalog.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 rounded-lg bg-bronze-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-bronze-500"
          >
            Return Home
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/machinery"
            className="inline-flex items-center gap-2.5 rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-bronze-500 hover:text-bronze-300"
          >
            Browse Machinery
          </Link>
        </div>
      </div>
    </div>
  );
}
