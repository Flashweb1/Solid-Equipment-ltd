"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/site";

import { SelMark } from "@/components/logo";

function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return <SelMark className={className} />;
}

export default function SiteHeader() {
  const pathname = usePathname();
  return <SiteHeaderContent key={pathname} pathname={pathname} />;
}

function SiteHeaderContent({ pathname }: { pathname: string }) {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  // Transparent only while resting on top of the home hero
  const solid = !isHome || scrolled || openDropdown !== null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    const base = href.split("?")[0];
    if (base === "/") return pathname === "/";
    return pathname.startsWith(base);
  };

  return (
    <header className={`sticky top-0 z-50 ${isHome ? "-mb-20" : ""}`}>
      <div
        className={`border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
          solid
            ? "border-white/10 bg-navy-950/85 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            aria-label="Solid Equipment Ltd — Home"
          >
            <LogoMark />
            <span className="font-display text-lg font-black tracking-tight whitespace-nowrap text-white">
              SOLID <span className="text-bronze-400">EQUIPMENT</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV_LINKS.filter((l) => l.href !== "/").map((link, i) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.children ? i : null)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`relative flex items-center gap-1 px-3.5 py-2.5 text-[13px] font-medium whitespace-nowrap transition-colors ${
                    isActive(link.href) ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  {link.children ? (
                    <ChevronDown
                      className={`h-3.5 w-3.5 opacity-60 transition-transform duration-200 ${
                        openDropdown === i ? "rotate-180" : ""
                      }`}
                    />
                  ) : null}
                  {isActive(link.href) ? (
                    <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-bronze-500" />
                  ) : null}
                </Link>

                {link.children && openDropdown === i ? (
                  <div className="absolute top-full left-1/2 w-[330px] -translate-x-1/2 pt-3">
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-900/95 p-2 shadow-2xl backdrop-blur-xl">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.06]"
                        >
                          <span>
                            <span className="block text-sm font-semibold text-white">
                              {child.label}
                            </span>
                            <span className="mt-0.5 block text-xs text-steel-400">
                              {child.desc}
                            </span>
                          </span>
                          <ArrowRight className="h-4 w-4 -translate-x-1 text-bronze-400 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/rfq"
              className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-navy-950 transition-colors duration-200 hover:bg-bronze-600 hover:text-white sm:block"
            >
              Get a Quote
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-[60] flex flex-col bg-navy-950 lg:hidden">
          <div className="flex h-20 items-center justify-between border-b border-white/10 px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <LogoMark className="h-9 w-9" />
              <span className="font-display text-base font-black tracking-tight text-white">
                SOLID <span className="text-bronze-400">EQUIPMENT</span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-6 sm:px-6" aria-label="Mobile">
            {NAV_LINKS.map((link, i) => (
              <div key={link.label} className="border-b border-white/8">
                <div className="flex items-center justify-between">
                  <Link
                    href={link.href}
                    className={`flex-1 py-4 font-display text-xl font-extrabold tracking-tight ${
                      isActive(link.href) ? "text-bronze-400" : "text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.children ? (
                    <button
                      type="button"
                      onClick={() =>
                        setMobileExpanded(mobileExpanded === i ? null : i)
                      }
                      className="flex h-10 w-10 items-center justify-center text-steel-300"
                      aria-label={`Toggle ${link.label} submenu`}
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          mobileExpanded === i ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : null}
                </div>
                {link.children && mobileExpanded === i ? (
                  <div className="pb-4">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block border-l-2 border-bronze-600 py-2.5 pl-4 text-sm text-steel-300"
                      >
                        {child.label}
                        <span className="mt-0.5 block text-xs text-steel-500">
                          {child.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
          <div className="space-y-3 border-t border-white/10 px-4 py-6 sm:px-6">
            <Link
              href="/rfq"
              className="block rounded-full bg-bronze-600 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-bronze-500"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
