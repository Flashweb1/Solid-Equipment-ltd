import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion";

const DIVISIONS = [
  {
    number: "01",
    title: "Construction Equipment Leasing & Sales",
    desc: "Excavators, dozers, graders and loaders on flexible lease terms or outright purchase — full documentation and site-ready handover inspection.",
    items: "Excavators · Dozers · Graders · Loaders",
    image: "/images/excavator.jpg",
    href: "/machinery",
  },
  {
    number: "02",
    title: "Worksite Attachments",
    desc: "Hydraulic breakers (jackhammers), heavy-duty buckets and quick couplers engineered for high-impact carriers.",
    items: "Hydraulic Breakers · Buckets · Quick Couplers",
    image: "/images/breaker.jpg",
    href: "/attachments",
  },
  {
    number: "03",
    title: "Undercarriage & Wear Components",
    desc: "Track chains, rollers, sprockets and bucket teeth (GET) stocked for all major brands.",
    items: "Track Chains · Rollers · Sprockets · GET",
    image: "/images/undercarriage.jpg",
    href: "/parts?category=undercarriage",
  },
  {
    number: "04",
    title: "Engines & Powertrain",
    desc: "Complete engine blocks, turbochargers, fuel pumps and full overhaul kits — bench-tested before dispatch.",
    items: "Engine Blocks · Turbochargers · Overhaul Kits",
    image: "/images/engine.jpg",
    href: "/parts?category=engines",
  },
  {
    number: "05",
    title: "Mining & Infrastructure Support",
    desc: "Dedicated field technicians, rapid parts delivery and site maintenance AMCs across West Africa.",
    items: "Field Technicians · Rapid Delivery · Site AMC",
    image: "/images/hero-mining.jpg",
    href: "/sectors",
  },
];

export default function DivisionGrid() {
  return (
    <div className="space-y-3">
      {DIVISIONS.map((d, i) => (
        <Reveal
          key={d.number}
          delay={Math.min(i * 70, 280)}
          className=""
        >
          <Link
            href={d.href}
            className="group grid grid-cols-[2.75rem_1fr_auto] items-center gap-4 rounded-lg border border-steel-200 bg-white px-4 py-5 transition-colors hover:border-steel-300 sm:gap-5 md:grid-cols-[4rem_1fr_auto] md:gap-8 md:px-8 md:py-7"
          >
            <span className="text-sm font-semibold text-steel-400 transition-colors group-hover:text-bronze-600">
              {d.number}
            </span>

            <div className="min-w-0">
              <h3 className="font-display text-lg leading-tight font-semibold tracking-tight text-navy-900 transition-colors group-hover:text-bronze-600 md:text-2xl">
                {d.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-steel-500 md:text-[15px]">
                {d.desc}
              </p>
              <p className="mt-2.5 text-xs text-steel-400">
                {d.items}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="relative hidden h-14 w-20 shrink-0 overflow-hidden rounded-md border border-steel-200 bg-steel-100 sm:block">
                <Image
                  src={d.image}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-steel-200 text-navy-900 transition-colors group-hover:border-bronze-600 group-hover:text-bronze-600">
                <ArrowUpRight className="h-4.5 w-4.5" />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
