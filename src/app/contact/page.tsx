import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us — Visit Our Alakuko, Lagos Office",
  description:
    "Contact Solid Equipment Ltd by phone, WhatsApp or email, or get directions to Plot 951, Km 32 Lagos - Abeokuta Expressway, beside AMJE Bus Stop, Alakuko.",
};

const CONTACT_METHODS = [
  {
    label: "Call our team",
    value: SITE.phoneDisplay,
    href: SITE.phoneHref,
    icon: Phone,
    accent: "text-bronze-400",
  },
  {
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    icon: Mail,
    accent: "text-bronze-400",
  },
  {
    label: "WhatsApp",
    value: "Chat with our procurement desk",
    href: SITE.whatsapp,
    icon: MessageCircle,
    accent: "text-emerald-400",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950">
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
            <span className="text-white">Contact</span>
          </nav>
          <p className="mt-8 text-sm font-semibold text-bronze-400">
            Solid Equipment Ltd
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
            Talk to our team.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-steel-300 md:text-base">
            Contact us about equipment, parts or site support, or visit our
            headquarters in Alakuko, Lagos.
          </p>
        </div>
      </section>

      <section className="bg-steel-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-5">
            <div className="rounded-xl border border-steel-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="font-display text-xl font-bold text-navy-900">
                Contact details
              </h2>
              <div className="mt-6 space-y-4">
                {CONTACT_METHODS.map(({ label, value, href, icon: Icon, accent }) => (
                  <a
                    key={label}
                    href={href}
                    target={label === "WhatsApp" ? "_blank" : undefined}
                    rel={label === "WhatsApp" ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-4 rounded-lg border border-steel-100 p-4 transition-colors hover:border-bronze-300 hover:bg-steel-50"
                  >
                    <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${accent}`} />
                    <span className="min-w-0">
                      <span className="block text-xs font-medium text-steel-500">
                        {label}
                      </span>
                      <span className="mt-1 block break-words text-sm font-semibold text-navy-900">
                        {value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
              <div className="mt-6 flex items-start gap-3 border-t border-steel-100 pt-5 text-sm text-steel-600">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-bronze-500" />
                <p>
                  Call for urgent equipment and field-support enquiries. Send a
                  quotation request online for a detailed response.
                </p>
              </div>
              <Link
                href="/rfq"
                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-bronze-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-bronze-500"
              >
                Request a quotation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-xl border border-steel-200 bg-white p-6 shadow-sm md:p-8">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-bronze-500" />
                <div>
                  <h2 className="font-display text-lg font-bold text-navy-900">
                    Our office
                  </h2>
                  <address className="mt-2 text-sm leading-relaxed text-steel-600 not-italic">
                    {SITE.hq}, {SITE.addressRegion}, Nigeria
                  </address>
                  <a
                    href={SITE.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-bronze-600 hover:text-bronze-700"
                  >
                    Get directions <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-steel-200 bg-white shadow-sm">
            <iframe
              title={`Map to Solid Equipment Ltd, ${SITE.hq}`}
              src={SITE.mapEmbedUrl}
              className="h-[360px] w-full border-0 md:h-[520px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="border-t border-steel-100 px-5 py-4 text-xs leading-relaxed text-steel-500 md:px-6">
              Map search: Plot 951, Km 32 Lagos - Abeokuta Expressway, beside
              AMJE Bus Stop, Alakuko, Lagos.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
