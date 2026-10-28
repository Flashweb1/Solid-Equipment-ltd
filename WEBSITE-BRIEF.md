# Solid Equipment Ltd — Website Brief & Generation Spec

**Purpose of this document:** hand this to another AI (or designer/developer) to generate a better version of the Solid Equipment Ltd website. It contains the real business context, the real content, the required pages and features, a recommended design system, and a ready-to-paste prompt at the end.

**One-line summary:** a credible, fast, mobile-first B2B site for a Nigerian heavy-equipment leasing, sales and spare-parts company — catalog plus quote request, not a brochure.

---

## 1. Business snapshot

| Item | Detail |
|---|---|
| Company | Solid Equipment Ltd ("SEL") |
| Registration | RC 843928, Nigeria |
| Founded | 2014 |
| Headquarters | Plot 951, Km 32 Lagos–Abeokuta Expressway, beside AMJE Bus Stop, Alakuko, Lagos, Nigeria |
| Coverage | Lagos base, serving sites across Nigeria and West Africa |
| Phone / 24-7 hotline | +234 803 359 1883 |
| WhatsApp | +234 803 359 1883 (same number) |
| Email | sales@solidequipmentltd.com |
| Website | https://www.solidequipmentltd.com |
| Core offer | Heavy machinery leasing and sales, worksite attachments, undercarriage and wear parts, engines and powertrain, mining and infrastructure field support |
| Brands stocked/serviced | Caterpillar, Komatsu, Hyundai, JCB, Volvo, Hitachi |
| Commercial model | Lease (daily/monthly/multi-year with operator packages), outright purchase, parts supply, field support/AMC |
| Pricing | **Price on request** — the site must never show invented prices |

### What the company actually sells

Five divisions, presented consistently everywhere:

1. **Construction Equipment Leasing & Sales** — excavators, dozers, graders, loaders, articulated haulers.
2. **Worksite Attachments** — hydraulic breakers, buckets, rippers, quick couplers.
3. **Undercarriage & Wear Components** — track chains, rollers, sprockets, bucket teeth/GET.
4. **Engines & Powertrain** — complete blocks, turbochargers, fuel pumps, overhaul kits.
5. **Mining & Infrastructure Support** — field technicians, rapid parts delivery, site maintenance AMCs.

### Proof points used on the site

- 10+ years in operation (since 2014)
- 250+ machines deployed (sales and active leases)
- 3,000+ parts SKUs (OEM and aftermarket)
- 48-hour average yard-to-site deployment
- 98% parts fill rate
- Quotes answered within **4 working hours**
- 24/7 emergency hotline

> These figures are claims from the existing site. If the company cannot verify them, replace them with verifiable numbers rather than repeating them.

---

## 2. Audience and jobs to be done

| Persona | What they need | What convinces them |
|---|---|---|
| **Procurement officer / site manager** (construction) | A machine or part fast, with a written quote and a delivery date | Stock visibility, clear specs, OEM part numbers, quick RFQ, phone number |
| **Quarry / mining operator** | Uptime: undercarriage, GET, engines, field cover | Parts programs, AMC support, technician availability |
| **Contractor / fleet owner** | Lease vs. buy comparison, operator-included terms | Flexible terms, documentation, handover inspection |
| **Workshop / mechanic** | The exact part by OEM number | Search by part number, fitment data, condition |

Buying context: mostly mobile, often on site, often on a weak connection. The site must be usable one-handed in sunlight, and must let them call or WhatsApp in one tap.

---

## 3. Goals and success measures

Primary goals:
1. Generate qualified RFQs (form, phone, WhatsApp).
2. Make the catalog findable by part number and machine model.
3. Establish credibility in the first screen.

Suggested measures:
- RFQ submissions per month (primary)
- WhatsApp/phone click-throughs
- Catalog → product-detail → RFQ conversion
- Search success rate (searches that lead to a product or RFQ)
- Mobile Lighthouse performance ≥ 90, LCP < 2.5 s on 4G

---

## 4. Brand and tone

- **Positioning:** the reliable heavy-equipment partner — stocked, documented, and reachable.
- **Personality:** engineering-grade, plain-spoken, calm, confident. Not hyped, not "construction clip-art".
- **Voice:** short sentences, specific nouns, no jargon for its own sake. Use real part numbers and real capacities. Avoid "solutions", "synergy", "world-class".
- **Visual brand assets:** red diamond monogram with calligraphic "S" (already exists as SVG in `src/components/logo.tsx`); wordmark "SOLID EQUIPMENT LTD"; brand red `#E2231F`.
- **Tone examples:**
  - Good: "Track chains, rollers and sprockets for CAT, Komatsu and Hyundai — in stock in Lagos."
  - Bad: "Unleashing unparalleled synergistic equipment solutions."

---

## 5. Sitemap and page jobs

```
/                     Home — credibility + routing to catalog + RFQ
/machinery            Machinery catalog (earthmoving, material handling, road & paving)
/attachments          Attachments catalog (breakers, buckets, rippers, couplers)
/parts                Spare parts catalog (engines, turbos, undercarriage, wear parts)
/catalog/[slug]       Product detail + quote CTA
/search?q=            Search results
/sectors              Building construction / mining & quarrying
/about                Company, values, HQ, proof
/contact              Phone, WhatsApp, email, address, map
/rfq                  4-step quote request + file upload
(404)                 Not found
```

Supporting: `/sitemap.xml`, `/robots.txt`, JSON-LD (`LocalBusiness` site-wide, `Product` on detail pages), OpenGraph metadata.

---

## 6. Content inventory

### 6.1 Navigation

`Machinery Fleet` (dropdown: Earthmoving, Material Handling, Road & Paving) · `Attachments & Tools` (Hydraulic Breakers, Heavy-Duty Buckets, Rippers, Quick Couplers) · `Spare Parts & Engines` (Engines, Turbochargers, Undercarriage, Wear Parts) · `Sectors` · `About Us` · `Contact` · CTA `Get a Quote`.

### 6.2 Catalog taxonomy

| Section | Categories | Count |
|---|---|---|
| Machinery | earthmoving, material_handling, road_paving | 13 |
| Attachments | attachments (subcategories: hydraulic-breakers, buckets, rippers, quick-couplers) | 5 |
| Parts | engines, turbochargers, undercarriage, wear_parts | 9 |

Product conditions: New, Used, Refurbished. Availability: In Stock, On Order. Every product has 3–5 technical specs (label/value).

### 6.3 The 27 products (use these exactly; do not invent a different catalog)

| # | Product | Brand | Model | OEM | Condition | Availability |
|---|---|---|---|---|---|---|
| 1 | Caterpillar 336 GC Hydraulic Excavator | Caterpillar | 336 GC | — | New | In Stock |
| 2 | Komatsu PC490LC-11 Excavator | Komatsu | PC490LC-11 | — | New | On Order |
| 3 | Hyundai HX220L Crawler Excavator | Hyundai | HX220L | — | New | In Stock |
| 4 | Caterpillar D6 XE Dozer | Caterpillar | D6 XE | — | New | On Order |
| 5 | Komatsu D65PX-18 Dozer | Komatsu | D65PX-18 | — | Refurbished | In Stock |
| 6 | JCB JS130 Tracked Excavator | JCB | JS130 | — | New | In Stock |
| 7 | JCB 3CX Super Backhoe Loader | JCB | 3CX Super | — | Used | In Stock |
| 8 | Caterpillar 140 GC Motor Grader | Caterpillar | 140 GC | — | New | In Stock |
| 9 | Komatsu GD655-7 Grader | Komatsu | GD655-7 | — | New | On Order |
| 10 | Caterpillar AP1000 Asphalt Paver | Caterpillar | AP1000 | — | Used | In Stock |
| 11 | Hyundai HL940 Wheel Loader | Hyundai | HL940 | — | New | In Stock |
| 12 | Caterpillar 950 GC Wheel Loader | Caterpillar | 950 GC | — | New | In Stock |
| 13 | Komatsu HM300-5 Articulated Haul Truck | Komatsu | HM300-5 | — | New | On Order |
| 14 | CAT H140D Hydraulic Breaker | Caterpillar | H140D | — | New | In Stock |
| 15 | CAT H90D Hydraulic Breaker | Caterpillar | H90D | — | New | In Stock |
| 16 | Heavy-Duty Rock Bucket 1.4 m³ | Caterpillar | J-Series | 326-6650 | New | In Stock |
| 17 | Single-Shank Ripper — CAT D6 | Caterpillar | D6 | 5S-8800 | New | In Stock |
| 18 | Hydraulic Quick Coupler — CW-30 | Caterpillar | CW-30 | 258-9224 | New | In Stock |
| 19 | Caterpillar 3306 Diesel Engine — Complete | Caterpillar | 3306 | 107-5000 | Refurbished | In Stock |
| 20 | Komatsu SAA6D125E-7 Engine Assembly | Komatsu | SAA6D125E-7 | — | New | On Order |
| 21 | Caterpillar 330 Turbocharger | Caterpillar | 330 / 3306 | 101-6473 | New | In Stock |
| 22 | Komatsu SAA6D125 Turbocharger | Komatsu | SAA6D125 | 6152-81-8210 | New | In Stock |
| 23 | Track Chain Assembly — CAT D6 | Caterpillar | D6 | 244-7544 | New | In Stock |
| 24 | Sprocket Rim — Komatsu D65 | Komatsu | D65PX | 21N-30-00261 | Refurbished | On Order |
| 25 | Track Roller — Hyundai R220 | Hyundai | R220 | 2112-27-0350 | New | In Stock |
| 26 | Bucket Teeth (GET) — CAT J-Series | Caterpillar | J-Series | 1U-3352 | New | In Stock |
| 27 | Double Bevel Cutting Edge — 140G | Caterpillar | 140G | 9S-7497 | New | In Stock |

Featured products (home): 336 GC, H140D, 3306 engine, D6 track chain, J-Series teeth, 330 turbo (six are flagged featured in data; show 3–4).

Specs to keep (examples, from the seed data):
- 336 GC: 36,200 kg · Cat C9.3B · 236 kW (316 hp) · 1.35 m³ · 7,180 mm dig depth
- PC490LC-11: 49,850 kg · SAA6D125E-7 · 270 kW · 2.2 m³ · 7,580 mm
- D6 XE: 47,900 kg · Cat C9.3B · 161 kW · 3.9 m³ blade · 466 kN drawbar
- 140 GC: 15,735 kg · Cat C7.1 · 104 kW · 3.7 m moldboard
- 950 GC: 17,298 kg · Cat C7.1 · 162 kW · 3.3 m³ · 145 kN breakout
- H140D: 20–30 t carrier · 2,700 J · 1,890 kg · 400–580 bpm · 160–180 bar
- 3306: 10.5 L · 6-cyl · 239 hp (178 kW) · mechanical governor
- D6 track chain: 39 links/side · 560 mm shoe · sealed & lubricated

### 6.4 Sectors

**Building Construction** — high-rise basements, material handling and logistics fleets, access roads, rapid breakdown response, attachment supply.
**Mining & Quarrying** — open-pit excavation and haulage, GET programs, undercarriage supply/rebuild, engine and turbo overhaul, resident technicians/AMCs.

### 6.5 Field support capabilities

Dedicated field technicians · Site maintenance AMCs · 48-hour rapid deployment · Genuine parts programs.

### 6.6 RFQ flow

4 steps: **Service** (Leasing / Outright Purchase / Spare Parts / Field Support) → **Category** (Earthmoving, Material Handling, Road & Paving, Attachments, Engine/Turbo, Undercarriage, Wear Parts, Other) → **Details** (scope, duration, part numbers/models, optional attachment) → **Contact** (name, company, email, phone).
Durations: Immediate/one-off, <1 month, 1–6, 6–12, 12+ months, N/A.
Attachments: PDF, PNG, JPG, DWG, DXF, STEP/STP, max 10 MB, stored privately.
Success: reference like `RFQ-2026-00042`, "reply within 4 working hours", WhatsApp fallback.
Prefill: `/rfq?service=parts`, `/rfq?product=<slug>`, `/rfq?urgent=1`.

### 6.7 Contact details

Address, phone, WhatsApp, email, map link. No opening hours are published except "24/7 hotline"; do not invent office hours.

---

## 7. Functional requirements

- **Catalog** — filter by category, subcategory, brand, availability; free-text search over name, brand, model, OEM number, description, specs. Works without JavaScript for core listing if possible.
- **Search** — suggestions after 2 characters (debounced), keyboard accessible, "no matches → submit an RFQ".
- **Product detail** — image, name, brand/model/OEM, condition, availability, description, spec table, quote CTA, WhatsApp CTA, related products, Product JSON-LD.
- **RFQ** — validation, loading/error states, file upload, success screen with reference, prefilled from product/search context.
- **Contact** — tel:, WhatsApp, mailto:, map/directions.
- **SEO** — unique title/description per page, canonical, sitemap, robots, OpenGraph image, LocalBusiness JSON-LD.
- **No prices**, no login, no payments.

---

## 8. Current implementation (for reference only)

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`), lucide-react icons.
- PostgreSQL via Drizzle ORM (`products`, `rfq_submissions` tables); seed script with 27 products.
- RFQ API: validates, stores row, sends staff email via Resend, uploads attachments to private Firebase Storage, returns reference.
- Self-hosted fonts: Montserrat, Inter, IBM Plex Mono (woff2).
- 10 local JPGs in `public/images`.
- A 5-slide autoplaying hero, sticky header that is transparent over the home hero, and a WhatsApp floating button.
- Desktop nav only at ≥1536px (`2xl`); below that it collapses to a full-screen menu.

A new generation does **not** need to copy this implementation. Keep the content, routes and flows; replace the presentation.

---

## 9. Problems the redesign must solve

1. **Mobile is an afterthought.** Huge fixed type, a 5-slide carousel, a full-screen menu and tiny (9–11px) uppercase labels. The experience must be designed at 360px first.
2. **Desktop navigation disappears below 1536px.** Most laptops get a hamburger. Use a normal 1024px breakpoint with a compact nav.
3. **Too many dark full-bleed bands.** Four dark sections on the home page plus dark page headers on every inner page makes the site feel heavy and repetitive. Use light surfaces with one dark hero and a dark footer.
4. **Weak hierarchy.** Every section has a big heading, an eyebrow, a description and a CTA, all at similar volume. Reduce the number of sections and let one thing lead.
5. **Type is too small and too tracked.** Labels at 9–11px with 0.2em letter-spacing are hard to read. Minimum 13px for body/meta, 12px for labels.
6. **Mixed visual languages.** Sharp 0-radius buttons in one place, `rounded-lg`/`rounded-xl` cards in another, pills in a third. Pick one radius scale and one button system.
7. **Repetitive cards.** Every product card has the same 4:3 crop, tiny meta, three specs and "Price on request". Differentiate machinery (larger imagery, model prominent) from parts (part number prominent).
8. **Imagery is thin.** Only 10 photos; two (`bulldozer.jpg`, `grader.jpg`) are stand-ins cropped from a backhoe photo; the HQ shot is a phone photo with a watermark. Design must not depend on a rich photo library.
9. **Carousel and autoplay.** Five rotating hero slides at 5s are easy to miss and hurt LCP. Use one strong static hero.
10. **No filters on mobile beyond an accordion**, no sorting, no result count context, no pagination.
11. **No trust content**: no testimonials, project references, certifications or team. Either add real ones or don't fake them.
12. **No analytics/consent story**, no 404 polish, no form spam protection beyond validation.

---

## 10. Recommended design direction

**"Quiet industrial."** Calm, editorial, photo-led, engineering-precise. The machines provide the drama; the interface stays out of the way. This is the safest way to look credible next to CAT/Komatsu dealer sites without copying their clutter.

Principles:
1. **One accent, one dark surface.** Brand red for primary actions and active states only. Navy for the hero and footer. Everything else is white/off-white with hairlines.
2. **Content first, decoration last.** Remove grid overlays, hazard stripes, glow gradients and 3D scenes from content sections.
3. **Fewer sections, more space.** Every section earns its place; 96–120px vertical rhythm on desktop, 56–72px on mobile.
4. **One primary action per view.** Quote is primary; phone/WhatsApp are secondary utilities.
5. **Mobile is the design.** 360px first, then scale up.
6. **Real content only.** No lorem, no invented certifications, no fake logos.

Alternatives if the client wants a different feel:
- **Bold machinery brand:** dark hero, larger imagery, red blocks — but still one accent and a normal type scale.
- **Catalog-first marketplace:** dense listings, prominent search and filters, less storytelling.

---

## 11. Design system specification

### 11.1 Color

| Token | Hex | Usage |
|---|---|---|
| `--ink` | `#0B1220` | Headings, primary text |
| `--body` | `#334155` | Paragraph text |
| `--muted` | `#64748B` | Secondary meta (≥4.5:1 on white) |
| `--line` | `#E2E8F0` | Borders, dividers |
| `--surface` | `#F6F7F9` | Alternate section background |
| `--white` | `#FFFFFF` | Cards, main canvas |
| `--red` | `#E2231F` | Primary CTA, active nav, key markers |
| `--red-dark` | `#B91C1C` | Hover/pressed |
| `--navy` | `#0E1728` | Hero overlay, footer |
| `--success` | `#0F7A4D` | "In Stock" only |
| `--warning` | `#B45309` | "On Order", form warnings |

Rules: no amber/gold, no salmon, no cyan, no emerald except status. Never use red for decorative lines or hover text on body copy. Ensure 4.5:1 for text, 3:1 for UI borders.

### 11.2 Typography

- Display: **Montserrat** 600/700 (not 800/900 everywhere).
- Body/UI: **Inter** 400/500/600.
- Technical: **IBM Plex Mono** 400/500 only for OEM numbers, part references, specs, RFQ references.

| Style | Size | Line height | Usage |
|---|---|---|---|
| Display 1 | `clamp(2.5rem, 5vw, 4rem)` | 1.05 | Home hero only |
| Display 2 | `clamp(2rem, 3.5vw, 3rem)` | 1.1 | Page titles |
| H2 | `clamp(1.6rem, 2.5vw, 2.25rem)` | 1.15 | Section headings |
| H3 | `1.25rem` | 1.3 | Card titles |
| Body L | `1.125rem` | 1.65 | Hero subcopy, intros |
| Body | `1rem` | 1.65 | Default |
| Meta | `0.875rem` | 1.5 | Card meta, labels |
| Label | `0.75rem` uppercase, 0.06em | 1.4 | Field labels, eyebrows (sparingly) |
| Mono | `0.875rem` | 1.5 | Part numbers, specs |

Max 3 sizes per viewport. No text below 12px. Line length 60–75 characters.

### 11.3 Layout and spacing

- Container `1200px`, gutters 20px (mobile), 24px (tablet), 32px (desktop).
- 12-column grid, 24px gap.
- Spacing scale 4/8/12/16/24/32/48/64/96/128.
- Section padding: mobile 56–72px, desktop 96–120px.
- Radius: `8px` buttons/inputs, `12px` cards/media, `999px` badges only.
- Shadows: none at rest; `0 2px 8px rgb(11 18 32 / 0.06)` on hover; header gets a hairline, not a shadow.
- Dark hero may bleed full width; content stays on the grid.

### 11.4 Components

**Header (72px desktop / 60px mobile).** Logo left, nav centre/left, phone link + "Get a quote" right. Solid white with hairline on inner pages; transparent over the home hero then solid on scroll. Mobile: logo + phone icon + menu. Menu = full-height sheet with plain links, phone/WhatsApp at the bottom, 44px targets.

**Buttons.** Primary: red, white text, 48px, 8px radius, 14px semibold, hover `--red-dark`. Secondary: white with `--line` border, ink text. Tertiary: text link with 16px arrow. No uppercase mono buttons.

**Product card.** 4:3 image with subtle zoom on hover; brand and availability as small text badges *on* the image, 12px; title 18px/600; model/OEM in mono 13px; two key specs in a definition row; footer "Request quote →". Whole card clickable, focus ring visible.

**Filter panel.** Desktop: sticky sidebar, groups as checkboxes with counts, "Clear all". Mobile: "Filters (3)" button opening a bottom sheet, apply/clear sticky footer. Show result count and sort (Newest, Brand, Availability).

**Search field.** 56px, icon left, clear button, suggestions panel with product name, model/OEM, availability. Keyboard: arrows, enter, escape.

**RFQ form.** Light card on white, 4 steps with a visible progress bar. One question per screen, Back/Continue, validation inline. File drop zone with type/size hint. Success screen with reference and WhatsApp/call buttons.

**Tables.** Spec table: two columns, mono values, zebra rows optional, no heavy borders.

### 11.5 Imagery

- Use the 10 existing photos. Hero: `loader.jpg` or `excavator.jpg`, cropped 16:9 with a dark gradient for text contrast.
- Do not stretch low-resolution images beyond their size. `loader.jpg` is 678×452 and `breaker.jpg` 598×450 — use them at card size, not full-bleed.
- Replace `bulldozer.jpg` and `grader.jpg` with real photos when available; until then label those products honestly and avoid using them in hero/OG images.
- No stock photos of unrelated machines. No watermarks. Consistent warm-neutral grade.
- Every image needs meaningful `alt` text.

### 11.6 Motion

- 150–250ms ease-out on hover/focus.
- One subtle reveal on scroll (opacity + 8px), disabled under `prefers-reduced-motion`.
- No autoplay carousels, no parallax, no 3D, no counters that start at zero (or make them start at the final value for reduced motion/no-JS).

---

## 12. Page-by-page specification

### Home `/`
1. **Hero** — one static image, headline max 2 lines desktop / 3 mobile: "Heavy machinery. Genuine parts. On site, on time." Subcopy 1–2 sentences. Primary `Browse the fleet`, secondary `Request a quote`. Small proof line: `10+ years · 3,000+ parts · 48h deployment`.
2. **Browse by need** — three cards: Machinery (13), Attachments (5), Parts (9), each with image, count and arrow.
3. **Featured equipment** — 3 product cards + "View all machinery".
4. **Parts finder** — light surface, large search, popular chips (CAT 330 Turbocharger, Track Chain D6, Komatsu PC490, Bucket Teeth).
5. **Sectors** — two wide cards (Building Construction, Mining & Quarrying) with one-line description.
6. **Why SEL / about** — HQ image, 3 proof bullets, link to About.
7. **Quote CTA** — split: short pitch + phone/WhatsApp links, compact RFQ entry (button to `/rfq`, not the full form).
8. **Footer** — dark navy, 4 columns: brand + RC, divisions, company, contact; bottom line year + "Built for West Africa's toughest sites."

Target height: ~4,500px desktop, ~6,000px mobile.

### Catalog `/machinery`, `/attachments`, `/parts`
- Page header: breadcrumb, H1, one-line description, result count. Light background, not a dark band.
- Toolbar: search within results, filter button (mobile) / sidebar (desktop), sort.
- Grid: 1 col <640, 2 col 640–1023, 3 col ≥1024.
- Empty state: icon, "No matches", clear filters + RFQ CTA.
- Pagination or "Load more"; show 9–12 per page.

### Product `/catalog/[slug]`
- Breadcrumb; 2-column layout (image 55% / info 45%).
- Info: brand · model · OEM, H1, availability + condition badges, description, primary `Request a quote`, secondary `WhatsApp`, tertiary phone.
- Key specs grid (4–6), then full technical table.
- Related products (3).
- Sticky mobile CTA bar with quote + call.

### Search `/search`
- H1 "Results for …", count, search field with query, results grid, empty state with RFQ CTA.

### Sectors `/sectors`
- Intro, two alternating image/text blocks with capability lists and links to filtered catalog pages, field-support strip with 4 cards, CTA.

### About `/about`
- Intro + HQ image with address, story (2 paragraphs), RC and founding year, values (4 cards), stats band (dark, once), CTA.

### Contact `/contact`
- Contact cards (call, WhatsApp, email), address with map embed/link, hotline note, RFQ CTA. No invented opening hours.

### RFQ `/rfq`
- Light page, short intro ("Reply within 4 working hours"), 4-step form, "What happens next" (4 steps) side panel, hotline card. Success state. Prefill from query params.

### 404
- Plain, helpful: "Page not found", links to Machinery, Parts, Home, RFQ.

---

## 13. Responsive contract

| Width | Columns | Gutters | H1 | Header | Notes |
|---|---|---|---|---|---|
| 320–479 | 1 | 20px | 32–36px | 60px | No horizontal scroll; 44px targets |
| 480–639 | 1 | 20px | 36–40px | 60px | Hero image 4:3 |
| 640–1023 | 2 | 24px | 40–48px | 64px | Two-up cards |
| 1024–1279 | 3 / 12 | 32px | 48–56px | 72px | Full desktop nav |
| 1280–1535 | 3 / 12 | 32px | 56px | 72px | Container 1200 |
| 1536+ | 4 / 12 | 32px | 56–64px | 72px | Max container 1280 |

Rules: nav must never wrap; no fixed heights on text containers; images `width/height` set; test at 320/360/390/414/768/1024/1280/1440/1920.

---

## 14. Accessibility and performance budgets

- WCAG 2.2 AA: contrast, focus visible, labels, error identification, keyboard-operable menu/dropdowns/filters/carousel (none).
- Semantic landmarks, one H1 per page, logical heading order.
- `prefers-reduced-motion` respected.
- Form errors announced (`aria-live`), inputs with visible labels (placeholders are not labels).
- Tap targets ≥44×44px.
- Images: AVIF/WebP, responsive `sizes`, explicit dimensions, lazy-load below the fold.
- Performance targets: LCP < 2.5s on 4G, CLS < 0.1, INP < 200ms, initial JS < 200KB gzip, no web fonts blocking (use `font-display: swap`).
- No layout shift from counters, carousels or images.

---

## 15. SEO

- Title pattern: `{Page} | Solid Equipment Ltd — {Location}` (≤60 chars where possible).
- Descriptions 140–160 chars, specific.
- Canonical URLs; `robots` allows indexing except `/rfq` (noindex, follow).
- `LocalBusiness` JSON-LD with name, address, phone, email, founding year, area served, sameAs WhatsApp.
- `Product` JSON-LD on detail pages with brand, sku (OEM), availability, priceSpecification "on request" (do not put a fake price).
- `sitemap.xml` from static routes + product slugs; `robots.txt` points to it.
- OpenGraph image 1200×630 from a real machine photo.

---

## 16. Copy deck (use or adapt)

- Hero H1: **Heavy machinery. Genuine parts. On site, on time.**
- Hero sub: "Leasing, sales and genuine spare parts for construction and mining sites across West Africa."
- Primary CTA: **Browse the fleet** / **Request a quote**
- Section eyebrows: "What we supply", "Fleet highlights", "Find a part", "Sectors we serve", "Why Solid Equipment"
- Catalog intro: "Inspected, serviced and ready to deploy from our Lagos yard."
- Product CTA: **Request a quote** · **Chat on WhatsApp**
- Empty search: "No matches for “{query}”. Send us the part number and we'll source it."
- RFQ success: "RFQ received — {reference}. Our procurement desk replies within 4 working hours."
- Footer: "Solid Equipment Ltd · RC 843928 · Plot 951, Km 32 Lagos–Abeokuta Expressway, Alakuko, Lagos."
- Avoid: "unmatched", "world-class", "solutions", "cutting-edge", "synergy".

---

## 17. Acceptance checklist

- [ ] Designed and tested at 320, 360, 390, 768, 1024, 1280, 1440, 1920.
- [ ] No horizontal scroll at any width.
- [ ] Navigation label does not wrap and is available from 1024px.
- [ ] One H1 per page; heading order logical.
- [ ] Text ≥ 13px except 12px labels; contrast ≥ 4.5:1.
- [ ] All CTAs reachable by keyboard; visible focus ring.
- [ ] Hero is a single static image; no autoplay carousel.
- [ ] 27 products render; filters and search work; empty states exist.
- [ ] Product page shows OEM, condition, availability, specs, quote CTA.
- [ ] RFQ form validates and shows success reference; errors are readable.
- [ ] Phone, WhatsApp and email links work on mobile.
- [ ] Sitemap, robots, metadata and JSON-LD present.
- [ ] Lighthouse mobile ≥ 90 performance / 100 accessibility / 100 SEO.
- [ ] No invented prices, certifications, testimonials or clients.
- [ ] Real contact details exactly as listed above.

---

## 18. Open questions / assumptions

1. Are the 27 products real and currently available, or representative demo data? (If demo, the new site should not imply live stock.)
2. Can the company substantiate 250+ machines, 3,000+ SKUs, 98% fill rate and 48-hour deployment?
3. Does the company operate only from Alakuko, Lagos, or also Port Harcourt/other yards? (The previous version said Port Harcourt; current content says Lagos.)
4. Are real dozer and grader photos available? Current `bulldozer.jpg` and `grader.jpg` are stand-ins.
5. Are there customer testimonials, project references or certifications that can be published?
6. Should prices ever be displayed (NGN), or remain "on request"?
7. Is there a second phone line, sales email per division, or office hours?
8. Is the domain/email `solidequipmentltd.com` confirmed and live?

---

## 19. Ready-to-paste prompt for another AI

> Build a complete, production-quality marketing and catalog website for **Solid Equipment Ltd**, a Nigerian heavy-equipment company in Alakuko, Lagos. Founded 2014, RC 843928. Phone/WhatsApp +234 803 359 1883, email sales@solidequipmentltd.com. They lease and sell construction machinery, supply attachments, undercarriage/wear parts and engines, and provide field support to building-construction and mining/quarrying sites across West Africa. Brands: Caterpillar, Komatsu, Hyundai, JCB, Volvo, Hitachi. Prices are always "on request".
>
> **Pages:** Home; Machinery catalog; Attachments catalog; Parts catalog; Product detail; Search results; Sectors; About; Contact; Request a Quote (4 steps); 404.
>
> **Catalog:** 27 products across 8 categories (earthmoving, material handling, road & paving, attachments, engines, turbochargers, undercarriage, wear parts). Each has name, brand, model, OEM part number where applicable, condition (New/Used/Refurbished), availability (In Stock/On Order), description, 3–5 specs. Use realistic products such as Caterpillar 336 GC excavator, Komatsu PC490LC-11, CAT D6 XE dozer, CAT 140 GC grader, Hyundai HL940 loader, CAT H140D breaker, CAT 3306 engine, CAT 330 turbocharger, CAT D6 track chain, CAT J-Series bucket teeth. Filters by category, subcategory, brand, availability; search by part name, OEM number or model. Product pages include a quote CTA and WhatsApp CTA.
>
> **RFQ:** four steps — service (Leasing, Outright Purchase, Spare Parts, Field Support), equipment category, project details + optional file (PDF/image/CAD, 10MB), contact. Show a reference on success and promise a reply within 4 working hours. Prefill from `?service=`, `?product=`, `?urgent=1`.
>
> **Design direction:** "quiet industrial" — white/off-white canvas, ink text, hairline borders, one brand-red accent (#E2231F) used only for primary actions, navy (#0E1728) only for the hero overlay and footer. Montserrat for display (600/700), Inter for body, IBM Plex Mono only for part numbers and specs. Generous spacing (96–120px desktop sections, 56–72px mobile), 1200px container, 12-column grid, 8px button radius, 12px card radius. No gradients, grid overlays, hazard stripes, 3D, autoplay carousels or gold accents.
>
> **Home:** one static hero photo with headline "Heavy machinery. Genuine parts. On site, on time."; three "browse by need" cards; three featured products; a parts search band; two sector cards; a short about/proof block; a quote CTA; four-column footer.
>
> **Responsive:** mobile-first, tested from 320px. Header 60px mobile / 72px desktop with a real nav from 1024px (not 1536px). One column below 640px, two to 1023px, three above. No text below 13px (12px labels). 44px tap targets. No horizontal scroll.
>
> **Quality:** WCAG 2.2 AA, visible focus, labelled inputs, `prefers-reduced-motion`, semantic headings, one H1 per page. LCP < 2.5s on 4G, CLS < 0.1, JS < 200KB gzip. Unique metadata, OpenGraph, `LocalBusiness` and `Product` JSON-LD, sitemap, robots.
>
> **Content rules:** use the real contact details and product names above; do not invent prices, certifications, testimonials or clients; do not claim stock levels beyond In Stock/On Order; keep copy plain and specific.
>
> **Deliver:** a responsive multi-page site with reusable header/footer, catalog cards, filters, search, product detail, RFQ flow, contact page and all states (empty, loading, error, success). If generating static HTML/Tailwind, produce separate files per page with shared components; if React/Next.js, use the App Router and server components for catalog pages.

---

*Prepared from the current Solid Equipment Ltd codebase and content. Update the open questions with the client before publishing new claims.*
