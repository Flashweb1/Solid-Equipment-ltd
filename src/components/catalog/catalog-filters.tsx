"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import {
  ATTACHMENT_SUBCATEGORIES,
  AVAILABILITIES,
  BRANDS,
  CATEGORIES,
  SECTIONS,
  type SectionKey,
} from "@/lib/site";

export default function CatalogFilters({ section }: { section: SectionKey }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [qInput, setQInput] = useState(params.get("q") ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentCategories = (params.get("category") ?? "")
    .split(",")
    .filter(Boolean);
  const currentBrands = (params.get("brand") ?? "").split(",").filter(Boolean);
  const currentAvailability = params.get("availability") ?? "";
  const currentSub = params.get("subcategory") ?? "";
  const hasQuery = params.get("q") ?? "";

  const sectionCategories = SECTIONS[section].categories;

  const push = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(updates)) {
      if (!v) next.delete(k);
      else next.set(k, v);
    }
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const toggleMulti = (key: string, value: string, current: string[]) => {
    const set = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    push({ [key]: set.join(",") || null });
  };

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    push({ q: qInput.trim() || null });
  };

  const activeCount =
    currentCategories.length +
    currentBrands.length +
    (currentAvailability ? 1 : 0) +
    (currentSub ? 1 : 0) +
    (hasQuery ? 1 : 0);

  const clearAll = () => {
    setQInput("");
    router.replace(pathname, { scroll: false });
  };

  const body = (
    <div className="space-y-7">
      {/* Search within catalog */}
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-navy-900">
          Search
        </h4>
        <form onSubmit={onSearch} className="relative">
          <input
            type="text"
            value={qInput}
            onChange={(e) => setQInput(e.target.value)}
            placeholder="OEM no., model…"
            aria-label="Search within catalog"
            className="w-full rounded-lg border border-steel-300 bg-white py-2.5 pr-9 pl-3.5 text-sm transition-colors focus:border-bronze-500 focus:ring-2 focus:ring-bronze-500/15 focus:outline-none"
          />
          <button
            type="submit"
            className="absolute top-1/2 right-2 -translate-y-1/2 text-steel-500 hover:text-bronze-600"
            aria-label="Apply search"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Categories */}
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-navy-900">
          Category
        </h4>
        <ul className="space-y-2.5">
          {sectionCategories.map((cat) => {
            const checked = currentCategories.includes(cat);
            return (
              <li key={cat}>
                <label className="group flex cursor-pointer items-center gap-3">
                  <span
                    className={`flex h-4.5 w-4.5 items-center justify-center rounded-md border transition-colors ${
                      checked
                        ? "border-bronze-600 bg-bronze-600"
                        : "border-steel-400 group-hover:border-bronze-500"
                    }`}
                  >
                    {checked ? (
                      <span className="h-2 w-2 rounded-[2px] bg-white" />
                    ) : null}
                  </span>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => toggleMulti("category", cat, currentCategories)}
                  />
                  <span
                    className={`text-sm ${
                      checked
                        ? "font-semibold text-navy-900"
                        : "text-steel-600 group-hover:text-navy-900"
                    }`}
                  >
                    {CATEGORIES[cat].label}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Attachment subcategories */}
      {section === "attachments" ? (
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-navy-900">
            Attachment Type
          </h4>
          <ul className="space-y-2.5">
            {ATTACHMENT_SUBCATEGORIES.map((sub) => {
              const checked = currentSub === sub.key;
              return (
                <li key={sub.key}>
                  <label className="group flex cursor-pointer items-center gap-3">
                    <span
                      className={`flex h-4.5 w-4.5 items-center justify-center rounded-md border transition-colors ${
                        checked
                          ? "border-bronze-600 bg-bronze-600"
                          : "border-steel-400 group-hover:border-bronze-500"
                      }`}
                    >
                      {checked ? <span className="h-2 w-2 rounded-[2px] bg-white" /> : null}
                    </span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() =>
                        push({ subcategory: checked ? null : sub.key })
                      }
                    />
                    <span
                      className={`text-sm ${
                        checked
                          ? "font-semibold text-navy-900"
                          : "text-steel-600 group-hover:text-navy-900"
                      }`}
                    >
                      {sub.label}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      {/* Brand */}
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-navy-900">
          Brand
        </h4>
        <ul className="space-y-2.5">
          {BRANDS.map((brand) => {
            const checked = currentBrands.includes(brand);
            return (
              <li key={brand}>
                <label className="group flex cursor-pointer items-center gap-3">
                  <span
                    className={`flex h-4.5 w-4.5 items-center justify-center rounded-md border transition-colors ${
                      checked
                        ? "border-bronze-600 bg-bronze-600"
                        : "border-steel-400 group-hover:border-bronze-500"
                    }`}
                  >
                    {checked ? <span className="h-2 w-2 rounded-[2px] bg-white" /> : null}
                  </span>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => toggleMulti("brand", brand, currentBrands)}
                  />
                  <span
                    className={`text-sm ${
                      checked
                        ? "font-semibold text-navy-900"
                        : "text-steel-600 group-hover:text-navy-900"
                    }`}
                  >
                    {brand}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Availability */}
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-navy-900">
          Availability
        </h4>
        <ul className="space-y-2.5">
          {AVAILABILITIES.map((a) => {
            const checked = currentAvailability === a;
            return (
              <li key={a}>
                <label className="group flex cursor-pointer items-center gap-3">
                  <span
                    className={`flex h-4.5 w-4.5 items-center justify-center rounded-full border transition-colors ${
                      checked
                        ? "border-bronze-600"
                        : "border-steel-400 group-hover:border-bronze-500"
                    }`}
                  >
                    {checked ? (
                      <span className="h-2 w-2 rounded-full bg-bronze-600" />
                    ) : null}
                  </span>
                  <input
                    type="radio"
                    name="availability"
                    className="sr-only"
                    checked={checked}
                    onChange={() =>
                      push({ availability: checked ? null : a })
                    }
                  />
                  <span
                    className={`text-sm ${
                      checked
                        ? "font-semibold text-navy-900"
                        : "text-steel-600 group-hover:text-navy-900"
                    }`}
                  >
                    {a}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {activeCount > 0 ? (
        <button
          type="button"
          onClick={clearAll}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-steel-300 py-2.5 text-sm font-semibold text-navy-800 transition-colors hover:border-bronze-600 hover:text-bronze-600"
        >
          <X className="h-3.5 w-3.5" /> Clear all filters
        </button>
      ) : null}
    </div>
  );

  return (
    <aside>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setMobileOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-lg border border-steel-300 bg-white px-4 py-3.5 text-sm font-semibold text-navy-900 lg:hidden"
        aria-expanded={mobileOpen}
      >
        Filters {activeCount > 0 ? `(${activeCount})` : ""}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${mobileOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Desktop sidebar */}
      <div className="sticky top-32 hidden rounded-lg border border-steel-200 bg-white p-6 lg:block">
        <div className="mb-6 flex items-center justify-between border-b border-steel-200 pb-4">
          <span className="text-sm font-semibold text-navy-900">
            Refine
          </span>
          <span className="text-xs text-steel-500">
            {activeCount > 0 ? `${activeCount} active` : "—"}
          </span>
        </div>
        {body}
      </div>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div className="mt-3 rounded-lg border border-steel-200 bg-white p-6 lg:hidden">
          <div className="mb-6 border-b border-steel-200 pb-4 text-sm font-semibold text-navy-900">
            Refine
          </div>
          {body}
        </div>
      ) : null}
    </aside>
  );
}
