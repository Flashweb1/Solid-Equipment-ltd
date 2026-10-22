"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, PackageSearch, Search } from "lucide-react";
import { POPULAR_SEARCHES } from "@/lib/site";

type Suggestion = {
  slug: string;
  name: string;
  brand: string;
  model: string | null;
  oemPartNumber: string | null;
  category: string;
  availability: string;
};

export default function SearchBar() {
  const [q, setQ] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = q.trim();
    if (query.length < 2) return;
    const controller = new AbortController();
    const t = setTimeout(async () => {
      setLoading(true);
      setSearchError("");
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Search suggestions failed: ${res.status}`);
        const data = (await res.json()) as { results?: Suggestion[] };
        setSuggestions(data.results ?? []);
        setOpen(true);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Search suggestions request failed:", error);
        setSearchError("Suggestions are unavailable. Submit your search to continue.");
        setOpen(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 250);
    return () => {
      clearTimeout(t);
      controller.abort();
    };
  }, [q]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const go = (s: Suggestion) => {
    setOpen(false);
    router.push(`/catalog/${s.slug}`);
  };

  return (
    <div ref={containerRef} className="relative">
      <form onSubmit={submit} className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-steel-400" />
        <input
          type="text"
          value={q}
          onChange={(e) => {
            const value = e.target.value;
            setQ(value);
            setSearchError("");
            if (value.trim().length < 2) {
              setSuggestions([]);
              setOpen(false);
              setLoading(false);
            }
          }}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder="Search by part name, OEM part number, or machinery model…"
          aria-label="Search parts and machinery"
          className="h-14 w-full rounded-lg border border-white/15 bg-white/5 pr-32 pl-13 text-base text-white placeholder:text-steel-400 transition-colors focus:border-bronze-500 focus:ring-2 focus:ring-bronze-500/25 focus:outline-none sm:h-16 sm:text-lg"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-2 flex h-10 -translate-y-1/2 items-center gap-2 rounded-md bg-bronze-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-bronze-500 sm:h-12"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">
            {loading ? "Searching" : "Search"}
          </span>
        </button>
      </form>

      {/* Suggestions dropdown */}
      {open && q.trim().length >= 2 ? (
        <div className="absolute top-full right-0 left-0 z-30 mt-2 overflow-hidden rounded-lg border border-white/10 bg-navy-900 shadow-xl">
          <div className="hazard-bar h-1 w-full" />
          {searchError ? (
            <div className="px-5 py-4 text-sm text-amber-300">{searchError}</div>
          ) : suggestions.length === 0 && !loading ? (
            <div className="flex items-center gap-3 px-5 py-6 text-sm text-steel-400">
              <PackageSearch className="h-5 w-5 text-steel-500" />
              No matches for “{q}” — submit an RFQ and our procurement desk
              will source it.
            </div>
          ) : null}
          <ul className="max-h-[380px] overflow-y-auto">
            {suggestions.map((s) => (
              <li key={s.slug}>
                <button
                  type="button"
                  onClick={() => go(s)}
                  className="group flex w-full items-center justify-between gap-4 border-b border-white/5 px-5 py-4 text-left transition-colors last:border-0 hover:bg-white/5"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-white group-hover:text-bronze-400">
                      {s.name}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-steel-400">
                      {s.brand}
                      {s.model ? ` · ${s.model}` : ""}
                      {s.oemPartNumber ? ` · OEM ${s.oemPartNumber}` : ""}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      s.availability === "In Stock"
                        ? "bg-emerald-400/15 text-emerald-300"
                        : "bg-gold-500/15 text-gold-400"
                    }`}
                  >
                    {s.availability}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={submit}
            className="flex w-full items-center justify-center gap-2 border-t border-white/10 px-5 py-3 text-sm font-semibold text-bronze-400 transition-colors hover:bg-white/5"
          >
            View all results for “{q.trim()}” <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : null}

      {/* Popular searches */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs font-semibold text-steel-400">
          Popular:
        </span>
        {POPULAR_SEARCHES.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => router.push(`/search?q=${encodeURIComponent(term)}`)}
            className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-steel-300 transition-colors hover:border-bronze-500 hover:text-white"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
