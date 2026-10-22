import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { SelBadge } from "@/components/logo";
import { NAV_LINKS, SITE } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-steel-300">
      <div className="hazard-bar absolute inset-x-0 top-0 h-px opacity-70" aria-hidden="true" />
      <div className="grid-lines absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 md:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-4">
              <SelBadge className="h-24 w-24 shrink-0" />
              <div>
                <span className="font-display text-xl font-black tracking-tight text-white">
                  SOLID <span className="text-bronze-400">EQUIPMENT</span>
                  <span className="ml-1.5 font-mono text-[10px] font-semibold tracking-[0.3em] text-gold-500">LTD</span>
                </span>
                <span className="mt-1.5 block font-mono text-[9px] font-medium tracking-[0.22em] text-steel-400 uppercase">
                  RC: 843928 — Est. {SITE.founded}
                </span>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-steel-400">
              Equipment leasing, rentals and supplies — powering civil
              infrastructure, high-rise construction, and mining operations
              across West Africa with genuine parts and on-site reliability.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-steel-300 transition-colors hover:border-emerald-500 hover:text-emerald-400"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href={SITE.phoneHref}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-steel-300 transition-colors hover:border-bronze-500 hover:text-bronze-400"
                aria-label="Call us"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-steel-300 transition-colors hover:border-bronze-500 hover:text-bronze-400"
                aria-label="Email us"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Divisions */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Divisions
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { label: "Machinery Fleet — Sales & Leasing", href: "/machinery" },
                { label: "Attachments & Tools", href: "/attachments" },
                { label: "Spare Parts & Engines", href: "/parts" },
                { label: "Sectors We Serve", href: "/sectors" },
                { label: "Request a Quotation", href: "/rfq" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="group inline-flex items-center gap-1.5 text-steel-400 transition-colors hover:text-white">
                    {l.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Company
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV_LINKS.filter((l) => !l.children).map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="group inline-flex items-center gap-1.5 text-steel-400 transition-colors hover:text-white">
                    {l.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/machinery" className="group inline-flex items-center gap-1.5 text-steel-400 transition-colors hover:text-white">
                  Machinery Fleet
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link href="/attachments" className="group inline-flex items-center gap-1.5 text-steel-400 transition-colors hover:text-white">
                  Attachments & Tools
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link href="/parts" className="group inline-flex items-center gap-1.5 text-steel-400 transition-colors hover:text-white">
                  Spare Parts & Engines
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Headquarters
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bronze-400" />
                <a
                  href={SITE.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-steel-400 transition-colors hover:text-white"
                >
                  {SITE.hq}
                  <span className="mt-1 block text-xs text-bronze-400">
                    Get directions
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-bronze-400" />
                <a href={SITE.phoneHref} className="text-steel-400 transition-colors hover:text-white">
                  {SITE.phoneDisplay}
                  <span className="block text-xs text-steel-500">
                    24/7 Emergency Hotline
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-bronze-400" />
                <a href={`mailto:${SITE.email}`} className="text-steel-400 transition-colors hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-steel-400 transition-colors hover:text-emerald-400"
                >
                  WhatsApp Procurement Desk
                </a>
              </li>
              <li className="text-xs tracking-wide text-steel-500">
                RC: 843928 — Registered Company, Nigeria
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 text-xs tracking-wide text-steel-500 sm:flex-row">
          <span>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-bronze-500" />
            Built for West Africa&apos;s toughest sites.
          </span>
        </div>
      </div>
    </footer>
  );
}
