export const SITE = {
  name: "Solid Equipment Ltd",
  shortName: "Solid Equipment",
  tagline:
    "Heavy Machinery, Precision Parts & Unmatched On-Site Reliability.",
  phoneDisplay: "+234 803 359 1883",
  phoneHref: "tel:+2348033591883",
  whatsapp:
    "https://wa.me/2348033591883?text=" +
    encodeURIComponent(
      "Hello Solid Equipment Ltd, I need a quote for machinery/spare parts."
    ),
  email: "sales@solidequipmentltd.com",
  hq: "Plot 951, Km 32 Lagos - Abeokuta Expressway, beside AMJE Bus Stop, Alakuko",
  addressStreet:
    "Plot 951, Km 32 Lagos - Abeokuta Expressway, beside AMJE Bus Stop",
  addressLocality: "Alakuko",
  addressRegion: "Lagos",
  addressCountry: "Nigeria",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      "Plot 951, Km 32 Lagos - Abeokuta Expressway, beside AMJE Bus Stop, Alakuko, Lagos, Nigeria"
    ),
  mapEmbedUrl:
    "https://maps.google.com/maps?q=" +
    encodeURIComponent(
      "Plot 951, Km 32 Lagos - Abeokuta Expressway, beside AMJE Bus Stop, Alakuko, Lagos, Nigeria"
    ) +
    "&output=embed",
  founded: 2014,
  url: "https://www.solidequipmentltd.com",
};

export type CategoryKey =
  | "earthmoving"
  | "material_handling"
  | "road_paving"
  | "attachments"
  | "engines"
  | "turbochargers"
  | "undercarriage"
  | "wear_parts";

export type CategoryMeta = {
  label: string;
  section: SectionKey;
  blurb: string;
  image: string;
};

export const CATEGORIES: Record<CategoryKey, CategoryMeta> = {
  earthmoving: {
    label: "Earthmoving",
    section: "machinery",
    blurb: "Excavators, dozers, graders & loaders",
    image: "/images/excavator.jpg",
  },
  material_handling: {
    label: "Material Handling",
    section: "machinery",
    blurb: "Wheel loaders & articulated haul trucks",
    image: "/images/loader.jpg",
  },
  road_paving: {
    label: "Road & Paving",
    section: "machinery",
    blurb: "Graders, pavers & compactors",
    image: "/images/grader.jpg",
  },
  attachments: {
    label: "Attachments & Tools",
    section: "attachments",
    blurb: "Breakers, buckets, rippers & couplers",
    image: "/images/breaker.jpg",
  },
  engines: {
    label: "Engines",
    section: "parts",
    blurb: "Complete blocks & overhaul kits",
    image: "/images/engine.jpg",
  },
  turbochargers: {
    label: "Turbochargers",
    section: "parts",
    blurb: "Genuine OEM & exchange units",
    image: "/images/engine.jpg",
  },
  undercarriage: {
    label: "Undercarriage",
    section: "parts",
    blurb: "Track chains, rollers & sprockets",
    image: "/images/undercarriage.jpg",
  },
  wear_parts: {
    label: "Wear Parts",
    section: "parts",
    blurb: "Bucket teeth, cutting edges & GET",
    image: "/images/wear-parts.jpg",
  },
};

export const ATTACHMENT_SUBCATEGORIES = [
  { key: "hydraulic-breakers", label: "Hydraulic Breakers" },
  { key: "buckets", label: "Heavy-Duty Buckets" },
  { key: "rippers", label: "Rippers" },
  { key: "quick-couplers", label: "Quick Couplers" },
] as const;

export type SectionKey = "machinery" | "attachments" | "parts";

export const SECTIONS: Record<
  SectionKey,
  { label: string; href: string; categories: CategoryKey[] }
> = {
  machinery: {
    label: "Machinery Fleet",
    href: "/machinery",
    categories: ["earthmoving", "material_handling", "road_paving"],
  },
  attachments: {
    label: "Attachments & Tools",
    href: "/attachments",
    categories: ["attachments"],
  },
  parts: {
    label: "Spare Parts & Engines",
    href: "/parts",
    categories: ["engines", "turbochargers", "undercarriage", "wear_parts"],
  },
};

export const BRANDS = [
  "Caterpillar",
  "Komatsu",
  "Hyundai",
  "JCB",
  "Volvo",
  "Hitachi",
] as const;

export const AVAILABILITIES = ["In Stock", "On Order"] as const;

export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string; desc: string }[];
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Machinery Fleet",
    href: "/machinery",
    children: [
      {
        label: "Earthmoving",
        href: "/machinery?category=earthmoving",
        desc: "Excavators, dozers, graders & loaders",
      },
      {
        label: "Material Handling",
        href: "/machinery?category=material_handling",
        desc: "Wheel loaders & articulated haulers",
      },
      {
        label: "Road & Paving",
        href: "/machinery?category=road_paving",
        desc: "Graders, pavers & compaction",
      },
    ],
  },
  {
    label: "Attachments & Tools",
    href: "/attachments",
    children: [
      {
        label: "Hydraulic Breakers",
        href: "/attachments?subcategory=hydraulic-breakers",
        desc: "10–90 ton class demolition hammers",
      },
      {
        label: "Heavy-Duty Buckets",
        href: "/attachments?subcategory=buckets",
        desc: "GP, trench & rock buckets",
      },
      {
        label: "Rippers",
        href: "/attachments?subcategory=rippers",
        desc: "Single & multi-shank ripper assemblies",
      },
      {
        label: "Quick Couplers",
        href: "/attachments?subcategory=quick-couplers",
        desc: "Hydraulic pin-lock coupler systems",
      },
    ],
  },
  {
    label: "Spare Parts & Engines",
    href: "/parts",
    children: [
      {
        label: "Engines",
        href: "/parts?category=engines",
        desc: "Complete blocks & overhaul kits",
      },
      {
        label: "Turbochargers",
        href: "/parts?category=turbochargers",
        desc: "Genuine OEM & exchange units",
      },
      {
        label: "Undercarriage",
        href: "/parts?category=undercarriage",
        desc: "Track chains, rollers & sprockets",
      },
      {
        label: "Wear Parts",
        href: "/parts?category=wear_parts",
        desc: "Bucket teeth, edges & GET",
      },
    ],
  },
  { label: "Sectors", href: "/sectors" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const POPULAR_SEARCHES = [
  "CAT 330 Turbocharger",
  "Hydraulic Breaker 20-Ton",
  "Track Chain D6",
  "Komatsu PC490",
  "Bucket Teeth",
];

export function formatReference(id: number) {
  return `RFQ-${new Date().getFullYear()}-${String(id).padStart(5, "0")}`;
}
