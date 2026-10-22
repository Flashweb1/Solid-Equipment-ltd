import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Mountain,
  Timer,
  Users,
  Wrench,
} from "lucide-react";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Sectors — Building Construction & Mining / Quarrying",
  description:
    "Solid Equipment Ltd supports high-rise building construction and mining & quarrying operations across West Africa with machinery, parts and dedicated field support.",
};

const SECTORS = [
  {
    id: "building-construction",
    icon: Building2,
    label: "Sector 01",
    title: "Building Construction",
    image: "/images/excavator.jpg",
    alt: "Excavator on a high-rise construction site",
    description:
      "From foundation excavation to topping-out, we keep building projects moving — earthmoving fleets for high-rise basements, material handling for logistics, and a parts pipeline that stops downtime from ever reaching the critical path.",
    capabilities: [
      "High-rise basement excavation & earthworks",
      "On-site material handling & logistics fleets",
      "Road base, paving & compaction for access roads",
      "Rapid breakdown response with 24/7 hotline",
      "Attachment supply — breakers, buckets, couplers",
    ],
    links: [
      { label: "Earthmoving Fleet", href: "/machinery?category=earthmoving" },
      { label: "Material Handling", href: "/machinery?category=material_handling" },
      { label: "Worksite Attachments", href: "/attachments" },
    ],
  },
  {
    id: "mining-quarrying",
    icon: Mountain,
    label: "Sector 02",
    title: "Mining & Quarrying",
    image: "/images/hero-mining.jpg",
    alt: "Mining excavator loading a haul truck in an open pit",
    description:
      "Open-pit and quarry operations run on uptime. We supply heavy excavation fleets, structured GET and undercarriage programs, and dedicated field maintenance cover that keeps tonnes moving shift after shift.",
    capabilities: [
      "Open-pit excavation & haulage support",
      "Ground engaging tools (GET) replacement programs",
      "Undercarriage supply, rebuild & measurement",
      "Engine & turbocharger overhaul support",
      "Site maintenance AMCs with resident technicians",
    ],
    links: [
      { label: "Undercarriage Components", href: "/parts?category=undercarriage" },
      { label: "Wear Parts & GET", href: "/parts?category=wear_parts" },
      { label: "Engines & Powertrain", href: "/parts?category=engines" },
    ],
  },
];

const SUPPORT = [
  {
    icon: Users,
    title: "Dedicated Field Technicians",
    desc: "Factory-trained engineers stationed for your site, not a call centre.",
  },
  {
    icon: ClipboardCheck,
    title: "Site Maintenance AMCs",
    desc: "Scheduled service contracts covering full fleets and attachments.",
  },
  {
    icon: Timer,
    title: "48h Rapid Deployment",
    desc: "Machines and parts dispatched from yard to site in 48 hours on average.",
  },
  {
    icon: Wrench,
    title: "Genuine Parts Programs",
    desc: "Structured stock holding of OEM and verified aftermarket components.",
  },
];

export default function SectorsPage() {
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
            <span className="text-white">Sectors</span>
          </nav>
          <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
            Sectors We Power
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-steel-300 md:text-base">
            Two demanding sectors, one standard of reliability — machinery,
            parts and engineering support engineered for the toughest sites in
            West Africa.
          </p>
        </div>
      </div>

      {/* Sector detail blocks */}
      <div className="bg-steel-50">
        <div className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 md:space-y-28 md:py-24">
          {SECTORS.map((sector, i) => (
            <div
              key={sector.id}
              id={sector.id}
              className="grid scroll-mt-32 items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-steel-200 shadow-sm">
                  <Image
                    src={sector.image}
                    alt={sector.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute top-5 left-5 rounded-md bg-white px-3.5 py-1.5 text-xs font-semibold text-navy-900 shadow-sm">
                    {sector.label}
                  </span>
                </div>
              </Reveal>
              <Reveal delay={120} className={i % 2 === 1 ? "lg:order-1" : ""}>
                <sector.icon className="h-9 w-9 text-bronze-600" />
                <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-navy-900 md:text-3xl">
                  {sector.title}
                </h2>
                <p className="mt-4 leading-relaxed text-steel-600">
                  {sector.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {sector.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="flex items-start gap-3 text-sm text-navy-800"
                    >
                      <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-emerald-600" />
                      {cap}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {sector.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group inline-flex items-center gap-2 rounded-lg border border-steel-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-800 transition-colors hover:border-bronze-600 hover:text-bronze-600"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  ))}
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>

      {/* Field support strip */}
      <section className="relative overflow-hidden bg-navy-950">
        <div className="grid-lines absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
          <SectionHeading
            dark
            eyebrow=" Mining & Infrastructure Support"
            title="Field Support That Lives On Site"
            description="Dedicated technicians, structured maintenance contracts and rapid logistics — the division that keeps every other division running."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SUPPORT.map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <div className="group h-full rounded-lg border border-white/10 bg-white/5 p-6 transition-colors hover:border-bronze-500/40">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-bronze-600/20 text-bronze-300">
                    <item.icon className="h-5.5 w-5.5" />
                  </span>
                  <h3 className="mt-5 font-display text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-steel-400">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} className="mt-12 text-center">
            <Link
              href="/rfq"
              className="group inline-flex items-center gap-3 rounded-lg bg-bronze-600 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-bronze-500"
            >
              Request Field Support
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
