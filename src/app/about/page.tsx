import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Handshake,
  HardHat,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Reveal, StatCounter } from "@/components/motion";
import { SectionHeading } from "@/components/ui";
import { SelBadge } from "@/components/logo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us — Lagos HQ, 10+ Years in West Africa",
  description:
    "Solid Equipment Ltd operates from its headquarters in Alakuko, Lagos, coordinating fleet dispatch, replacement part distribution and rapid engineering response across West Africa.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Reliability",
    desc: "Machines that show up, parts that fit, quotes that hold. Our name is the contract.",
  },
  {
    icon: HardHat,
    title: "Expertise",
    desc: "Factory-trained engineers who know a D6 undercarriage from a breaker line, part number first.",
  },
  {
    icon: Truck,
    title: "Speed",
    desc: "48-hour average deployment from yard to site. Downtime is the enemy; logistics is our weapon.",
  },
  {
    icon: Handshake,
    title: "Partnership",
    desc: "We build decade-long relationships with contractors, quarries and procurement teams.",
  },
];

const WHY_POINTS = [
  "One supplier across machinery, attachments and parts — one PO, one logistics chain",
  "Genuine OEM and verified aftermarket components, never mystery metal",
  "Flexible commercial models: daily, monthly or multi-year leases with operator packages",
  "Field technicians on call 24/7 with stocked service vehicles",
  "Full documentation: inspection reports, service histories and handover files",
];

export default function AboutPage() {
  return (
    <>
      <div className="relative overflow-hidden bg-navy-950">
        <div className="grid-lines absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-steel-400"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">About Us</span>
          </nav>
          <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
            Built on Strength.
            <br />
            <span className="text-bronze-300">Run on Expertise.</span>
          </h1>
        </div>
      </div>

      {/* HQ showcase */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-steel-200 shadow-sm md:aspect-[21/9]">
              <Image
                src="/images/hq-building.jpg"
                alt="Solid Equipment Ltd headquarters in Alakuko, Lagos"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute bottom-5 left-5 rounded-md bg-white px-4 py-2 text-xs font-semibold text-navy-900 shadow-sm sm:bottom-8 sm:left-8">
                HQ — {SITE.hq}
              </div>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="mb-7 flex items-center gap-5">
                <SelBadge className="h-24 w-24 shrink-0 drop-shadow-lg" />
                <div>
                  <p className="text-sm font-semibold text-bronze-600">
                    The Company — RC: 843928
                  </p>
                  <p className="mt-2 text-xs font-medium text-steel-500">
                    Solid Equipment Ltd (&ldquo;SEL&rdquo;) — Equipment leasing,
                    rentals &amp; supplies.
                  </p>
                </div>
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-navy-900 md:text-3xl">
                A Facility Built for Response
              </h2>
              <p className="mt-5 leading-relaxed text-steel-600">
                Solid Equipment Ltd operates from a modern corporate facility
                equipped to coordinate fleet dispatch, replacement part
                distribution, and rapid engineering response for sites across
                the region. From our Alakuko headquarters, our teams coordinate
                parts logistics and machine deployments across West Africa.
              </p>
              <p className="mt-4 leading-relaxed text-steel-600">
                Founded in {SITE.founded}, we have grown from a single-yard
                operation into a five-division company — machinery sales and
                leasing, attachments, undercarriage, engines, and field
                support — while keeping one promise: heavy machinery, precision
                parts and unmatched on-site reliability.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="mb-3 text-sm font-semibold text-bronze-600">
                Why Procurement Teams Stay
              </p>
              <ul className="space-y-3.5">
                {WHY_POINTS.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 border-b border-steel-100 pb-3.5 text-sm text-navy-800 last:border-0"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative bg-steel-50">
        <div className="grid-lines-light absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <SectionHeading
            eyebrow=" Operating Principles"
            title="What Solid Means"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, i) => (
              <Reveal key={value.title} delay={i * 90}>
                <div className="card-soft group h-full p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-bronze-600 text-white">
                    <value.icon className="h-5.5 w-5.5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-navy-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-600">
                    {value.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden bg-navy-950">
        <div className="grid-lines absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <StatCounter value={10} suffix="+" label="Years Operational" sub="Since 2014" />
            <StatCounter value={5} label="Divisions" sub="Machinery to field support" />
            <StatCounter value={250} suffix="+" label="Machines Deployed" sub="Sales & active leases" />
            <StatCounter value={98} suffix="%" label="Fill Rate" sub="Parts dispatched on time" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 md:py-24">
          <Reveal>
            <h2 className="mx-auto max-w-3xl font-display text-2xl leading-tight font-bold tracking-tight text-navy-900 md:text-4xl">
              Put Our Yard Behind <span className="text-bronze-600">Your Next Project.</span>
            </h2>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/rfq"
                className="group inline-flex items-center gap-3 rounded-lg bg-bronze-600 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-bronze-500"
              >
                Get a Quote / RFQ
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/machinery"
                className="inline-flex items-center gap-3 rounded-lg border border-navy-900/20 px-7 py-3.5 text-sm font-semibold text-navy-900 transition-colors hover:border-bronze-600 hover:text-bronze-600"
              >
                Browse the Fleet
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
