import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Clock3, FileCheck2, Phone, Search, Send } from "lucide-react";
import RfqForm from "@/components/rfq-form";
import { getProductBySlug } from "@/lib/queries";
import {
  CATEGORIES,
  SITE,
  type CategoryKey,
} from "@/lib/site";
import { Reveal } from "@/components/motion";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Request a Quotation (RFQ) — Machinery, Parts & Field Support",
  description:
    "Submit a request for quotation for equipment leasing, outright purchase, spare parts or field support. Our procurement desk responds within 4 working hours.",
  alternates: { canonical: "/rfq" },
  robots: { index: false, follow: true },
};

const SERVICE_MAP: Record<string, string> = {
  parts: "Spare Parts",
  leasing: "Leasing",
  purchase: "Outright Purchase",
  support: "Field Support",
};

const CATEGORY_TO_RFQ: Record<CategoryKey, string> = {
  earthmoving: "Earthmoving",
  material_handling: "Material Handling",
  road_paving: "Road & Paving",
  attachments: "Attachments",
  engines: "Engine / Turbo",
  turbochargers: "Engine / Turbo",
  undercarriage: "Undercarriage",
  wear_parts: "Wear Parts",
};

const PROCESS = [
  {
    icon: Send,
    title: "Transmit RFQ",
    desc: "Four quick steps — service, category, details, contact.",
  },
  {
    icon: Search,
    title: "Desk Review",
    desc: "Engineers verify specs, stock and logistics within 4 working hours.",
  },
  {
    icon: FileCheck2,
    title: "Formal Quotation",
    desc: "Written quote with pricing, terms and dispatch schedule.",
  },
  {
    icon: Clock3,
    title: "Rapid Dispatch",
    desc: "48-hour average deployment from our yard to your site.",
  },
];

export default async function RfqPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const productSlug = typeof sp.product === "string" ? sp.product : "";
  const serviceParam = typeof sp.service === "string" ? sp.service : "";
  const urgent = sp.urgent === "1";
  const product = productSlug ? await getProductBySlug(productSlug) : null;

  let prefillService = SERVICE_MAP[serviceParam] ?? "";
  let prefillCategory = "";
  let prefillPartNumbers = "";

  if (product) {
    const categoryKey = product.category as CategoryKey;
    prefillCategory = CATEGORY_TO_RFQ[categoryKey] ?? "";
    prefillPartNumbers = `${product.name}${
      product.oemPartNumber ? ` (OEM ${product.oemPartNumber})` : ""
    }`;
    if (!prefillService && CATEGORIES[categoryKey]?.section === "parts") {
      prefillService = "Spare Parts";
    }
  }

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
            <span className="text-white">Request a Quotation</span>
          </nav>
          <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
            Request a Quotation
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-steel-300 md:text-base">
            Machinery leasing, outright purchase, spare parts or field support —
            tell us what your site needs. Responses within{" "}
            <span className="font-semibold text-bronze-400">4 working hours</span>.
          </p>
        </div>
      </div>

      <div className="relative bg-navy-950 pb-20 md:pb-28">
        <div className="grid-lines absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <Reveal>
            <RfqForm
              prefillService={prefillService}
              prefillCategory={prefillCategory}
              prefillPartNumbers={prefillPartNumbers}
              urgent={urgent}
            />
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={100}>
              <div className="glass p-6 md:p-8">
                <h2 className="font-display text-lg font-bold text-white">
                  What Happens Next
                </h2>
                <div className="mt-6 space-y-6">
                  {PROCESS.map((step, i) => (
                    <div key={step.title} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-bronze-500/40 bg-bronze-500/10 text-bronze-400">
                          <step.icon className="h-4.5 w-4.5" />
                        </span>
                        {i < PROCESS.length - 1 ? (
                          <span className="mt-2 w-px flex-1 bg-white/10" />
                        ) : null}
                      </div>
                      <div className="pb-2">
                        <div className="text-xs font-medium text-steel-400">
                          Step 0{i + 1}
                        </div>
                        <div className="mt-1 font-display text-sm font-semibold text-white">
                          {step.title}
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-steel-400">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="glass p-6 md:p-8">
                <h2 className="font-display text-lg font-bold text-white">
                  Prefer to Talk?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-steel-400">
                  Our hotline is staffed 24/7 for breakdowns and urgent
                  on-site deployment.
                </p>
                <a
                  href={SITE.phoneHref}
                  className="mt-5 flex items-center gap-3 rounded-lg border border-bronze-500/40 bg-bronze-500/10 px-4 py-3.5 transition-colors hover:border-bronze-500 hover:bg-bronze-500/20"
                >
                  <Phone className="h-5 w-5 text-bronze-400" />
                  <span className="font-display text-lg font-semibold text-white">
                    {SITE.phoneDisplay}
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}
