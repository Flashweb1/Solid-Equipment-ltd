import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Mountain,
  Phone,
} from "lucide-react";
import Hero from "@/components/hero";
import DivisionGrid from "@/components/division-grid";
import SearchBar from "@/components/search-bar";
import RfqForm from "@/components/rfq-form";
import ProductCard from "@/components/catalog/product-card";
import { SectionHeading } from "@/components/ui";
import { Reveal, StatCounter } from "@/components/motion";
import { getProducts } from "@/lib/queries";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

const ABOUT_POINTS = [
  "Fleet dispatch coordinated from a single modern facility",
  "Replacement part distribution across West Africa",
  "Rapid engineering response for sites across the region",
];

export default async function HomePage() {
  const featured = await getProducts({ featuredOnly: true, limit: 4 });

  return (
    <>
      <Hero />

      {/* Divisions */}
      <section id="divisions" className="relative scroll-mt-28 bg-steel-50">
        <div className="grid-lines-light absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
          <SectionHeading
            eyebrow=" 01 · Divisions"
            title="Five Divisions. One Heavy-Duty Standard."
            description="From 36-ton excavators to a single bucket tooth — every division is stocked, serviced and dispatched with the same engineering discipline."
          />
          <DivisionGrid />
        </div>
      </section>

      {/* Search */}
      <section className="relative overflow-hidden bg-navy-950">
        <div className="grid-lines absolute inset-0" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(226,35,31,0.14),transparent_60%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 md:py-28">
          <Reveal>
            <p className="mb-3 text-sm font-semibold text-bronze-400">
              02 — Parts &amp; Machinery Finder
            </p>
            <h2 className="font-display text-2xl leading-tight font-bold tracking-tight text-white md:text-4xl">
              Find Any Part.
              <br />
              <span className="text-steel-400">Or Any Machine.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-steel-300 md:text-base">
              Search by part name, OEM part number, or machinery model — the
              way engineers and procurement managers actually work.
            </p>
          </Reveal>
          <Reveal delay={150} className="mt-10 text-left">
            <SearchBar />
          </Reveal>
        </div>
      </section>

      {/* Featured equipment */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
          <SectionHeading
            eyebrow=" 03 · Fleet Highlights"
            title="Ready to Work Today"
            description="Featured machinery and components from our Port Harcourt yard — inspected, serviced and available for immediate deployment."
            href="/machinery"
            hrefLabel="Browse Full Fleet"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden bg-navy-950">
        <div className="grid-lines absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <StatCounter value={10} suffix="+" label="Years Experience" sub="Serving West African sites" />
            <StatCounter value={250} suffix="+" label="Machines Deployed" sub="Sales & active leases" />
            <StatCounter value={3000} suffix="+" label="Parts SKUs" sub="OEM & aftermarket" />
            <StatCounter value={48} suffix="h" label="Avg. Deployment" sub="Yard to site, door-to-door" />
          </div>
        </div>
      </section>

      {/* About showcase */}
      <section className="relative bg-steel-50">
        <div className="grid-lines-light absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-steel-200 bg-steel-100 shadow-sm sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/images/hq-building.jpg"
                alt="Solid Equipment Ltd headquarters in Alakuko, Lagos"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-6 max-w-[260px] rounded-lg border border-steel-200 bg-white p-5 shadow-sm sm:left-8">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-bronze-600/10">
                <MapPin className="h-5 w-5 text-bronze-600" />
              </span>
              <div className="mt-3 font-display text-sm leading-snug font-semibold text-navy-900">
                Corporate Headquarters
              </div>
              <div className="mt-1.5 text-xs leading-relaxed text-steel-500">
                {SITE.hq}
              </div>
            </div>
            <div className="mt-10 flex items-center justify-between text-xs text-steel-500">
              <span>Solid Equipment Ltd — Headquarters</span>
              <span>RC: 843928 · Est. {SITE.founded}</span>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <p className="mb-3 text-sm font-semibold text-bronze-600">
              04 · The Company
            </p>
            <h2 className="font-display text-2xl leading-tight font-bold tracking-tight text-navy-900 md:text-4xl">
              Grounded in Strength.
              <br />
              <span className="text-bronze-600">Backed by Expertise.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-steel-600 md:text-lg">
              Solid Equipment Ltd operates from a modern corporate facility
              equipped to coordinate fleet dispatch, replacement part
              distribution, and rapid engineering response for sites across the
              region.
            </p>
            <ul className="mt-8 space-y-3.5">
              {ABOUT_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-navy-800 md:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2.5 rounded-lg bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-bronze-600"
              >
                About Solid Equipment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/sectors"
                className="inline-flex items-center gap-2.5 rounded-lg border border-navy-900/20 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors hover:border-bronze-600 hover:text-bronze-600"
              >
                Sectors We Serve
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sectors strip */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-24">
          {[
            {
              icon: Building2,
              title: "Building Construction",
              desc: "High-rise, commercial and residential projects — tower cranes, excavators and fast part turnarounds that keep concrete pouring.",
              href: "/sectors#building-construction",
              image: "/images/excavator.jpg",
            },
            {
              icon: Mountain,
              title: "Mining & Quarrying",
              desc: "Open-pit and quarry operations — heavy excavation fleets, GET programs and dedicated field maintenance cover.",
              href: "/sectors#mining-quarrying",
              image: "/images/hero-mining.jpg",
            },
          ].map((sector, i) => (
            <Reveal key={sector.title} delay={i * 100}>
              <Link
                href={sector.href}
                className="group relative block overflow-hidden rounded-xl border border-steel-200 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={sector.image}
                    alt={sector.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/35 to-navy-950/5" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <sector.icon className="h-7 w-7 text-bronze-400" />
                  <h3 className="mt-3 font-display text-xl font-bold text-white md:text-2xl">
                    {sector.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-steel-300">
                    {sector.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    Explore Sector
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* RFQ */}
      <section id="rfq" className="relative scroll-mt-24 overflow-hidden bg-navy-950">
        <div className="grid-lines absolute inset-0" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(226,35,31,0.10),transparent_55%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="mb-3 text-sm font-semibold text-bronze-400">
              05 · Request for Quotation
            </p>
            <h2 className="font-display text-2xl leading-tight font-bold tracking-tight text-white md:text-4xl">
              Get a Quote in
              <br />
              <span className="text-bronze-400">4 Working Hours.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-steel-300 md:text-base">
              Four quick steps — service, category, project details and
              contact. Attach a spec sheet, CAD drawing or a photo of the part
              tag, and our procurement desk takes it from there.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href={SITE.phoneHref}
                className="group flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-bronze-500/50"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-bronze-500/15 text-bronze-400">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs text-steel-400">
                    Emergency Hotline — 24/7
                  </span>
                  <span className="block font-display text-base font-semibold text-white group-hover:text-bronze-300">
                    {SITE.phoneDisplay}
                  </span>
                </span>
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-emerald-500/50"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs text-steel-400">
                    WhatsApp Procurement Desk
                  </span>
                  <span className="block font-display text-base font-semibold text-white group-hover:text-emerald-400">
                    Chat instantly — {SITE.phoneDisplay}
                  </span>
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <RfqForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
