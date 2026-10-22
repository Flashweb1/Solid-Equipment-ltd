import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsappFloat from "@/components/whatsapp-float";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default:
      "Solid Equipment Ltd — Heavy Machinery, Precision Parts & On-Site Reliability | West Africa",
    template: "%s | Solid Equipment Ltd",
  },
  description:
    "Powering civil infrastructure, high-rise building construction, and mining operations across West Africa through flexible leasing, equipment sales, and genuine spare parts. Caterpillar, Komatsu & Hyundai.",
  keywords: [
    "construction equipment Nigeria",
    "heavy machinery leasing West Africa",
    "excavator sales Port Harcourt",
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
    siteName: SITE.name,
    title: "Solid Equipment Ltd — Heavy Machinery & Precision Parts",
    description:
      "Sales, leasing, spare parts and mining support for civil infrastructure and mining operations across West Africa.",
    images: [{ url: "/images/hero-mining.jpg", width: 1600, height: 900 }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1E293B",
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
      streetAddress: SITE.hq,
      addressLocality: SITE.addressLocality,
      addressRegion: SITE.addressRegion,
      addressCountry: "NG",
    },
    hasMap: SITE.mapUrl,
    areaServed: "West Africa",
    openingHours: "Mo-Su 00:00-24:00",
    sameAs: ["https://wa.me/2348033591883"],
  };

  return (
    <html lang="en">
      <body className="bg-steel-50 font-sans text-navy-900 antialiased">
        <SiteHeader />
        <main>{children}</main>
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
