import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsappFloat from "@/components/whatsapp-float";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  alternates: { canonical: "/" },
  title: {
    default: "Heavy Equipment & Parts Supplier in Lagos | Solid Equipment",
    template: "%s | Solid Equipment Ltd",
  },
  description:
    "Heavy equipment sales, leasing and genuine spare parts from Solid Equipment Ltd in Alakuko, Lagos. Serving construction, mining and infrastructure projects across West Africa.",
  keywords: [
    "construction equipment Nigeria",
    "heavy equipment supplier Lagos",
    "construction equipment Alakuko",
    "equipment leasing Lagos",
    "heavy machinery leasing West Africa",
    "excavator sales Lagos",
    "spare parts Caterpillar Komatsu",
    "hydraulic breaker",
    "turbocharger OEM parts",
    "undercarriage track chain",
    "mining support services",
    "Solid Equipment Ltd",
  ],
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: "Heavy Equipment & Parts Supplier in Lagos | Solid Equipment",
    description:
      "Heavy equipment sales, leasing and genuine spare parts from Solid Equipment Ltd in Alakuko, Lagos, serving projects across West Africa.",
    images: [{ url: "/images/hero-mining.jpg", width: 1600, height: 900 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070d1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SITE.url,
    name: SITE.name,
    description:
      "Construction machinery sales, leasing, spare parts and mining support across West Africa.",
    url: SITE.url,
    telephone: "+2348033591883",
    email: SITE.email,
    foundingDate: String(SITE.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.addressStreet,
      addressLocality: SITE.addressLocality,
      addressRegion: SITE.addressRegion,
      addressCountry: "NG",
    },
    hasMap: SITE.mapUrl,
    areaServed: "West Africa",
    logo: `${SITE.url}/icon.svg`,
    image: `${SITE.url}/images/hero-mining.jpg`,
    sameAs: ["https://wa.me/2348033591883"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+2348033591883",
      email: SITE.email,
      contactType: "sales",
      areaServed: "NG",
      availableLanguage: "English",
    },
  };

  return (
    <html lang="en">
      <body className="bg-steel-50 font-sans text-navy-900 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy-950 focus:shadow-lg"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <WhatsappFloat />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
