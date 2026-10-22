"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SLIDE_MS = 5000;

type Slide = {
  tab: string;
  eyebrow: string;
  lines: string[];
  accentLine: number;
  body: string;
  cta: { label: string; href: string };
  image: string;
  position: string;
};

const SLIDES: Slide[] = [
  {
    tab: "Overview",
    eyebrow: "Solid Equipment Ltd",
    lines: ["Heavy machinery.", "Precision parts.", "On site, on time."],
    accentLine: 1,
    body: "Leasing, sales and genuine spare parts for the infrastructure, construction and mining sites powering West Africa.",
    cta: { label: "Browse the fleet", href: "/machinery" },
    image: "/images/loader.jpg",
    position: "72% 55%",
  },
  {
    tab: "Fleet",
    eyebrow: "Equipment leasing & sales",
    lines: ["Excavators, dozers,", "graders & loaders."],
    accentLine: 1,
    body: "Flexible lease terms or outright purchase, with full documentation and a site-ready inspection at handover.",
    cta: { label: "View machinery", href: "/machinery" },
    image: "/images/excavator.jpg",
    position: "70% 60%",
  },
  {
    tab: "Engines",
    eyebrow: "Engines & powertrain",
    lines: ["Bench-tested.", "Ready to run."],
    accentLine: 1,
    body: "Complete engine blocks, turbochargers, fuel pumps and overhaul kits, tested before they leave our yard.",
    cta: { label: "Shop engines", href: "/parts?category=engines" },
    image: "/images/engine.jpg",
    position: "60% 40%",
  },
  {
    tab: "Undercarriage",
    eyebrow: "Undercarriage & wear parts",
    lines: ["Keep every track", "turning."],
    accentLine: 1,
    body: "Track chains, rollers, sprockets and bucket teeth stocked for Caterpillar, Komatsu, Hyundai and more.",
    cta: { label: "Shop undercarriage", href: "/parts?category=undercarriage" },
    image: "/images/undercarriage.jpg",
    position: "65% 50%",
  },
  {
    tab: "Mining",
    eyebrow: "Mining & infrastructure support",
    lines: ["Support that", "reaches the site."],
    accentLine: 1,
    body: "Field technicians, rapid parts delivery and site maintenance contracts across West Africa.",
    cta: { label: "Explore sectors", href: "/sectors" },
    image: "/images/grader.jpg",
    position: "75% 55%",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const touchX = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((i: number) => {
    setActive((i + SLIDES.length) % SLIDES.length);
  }, []);

  // Autoplay on a real timer (not an animation event) so it still runs when the
  // OS asks for reduced motion. Pausing keeps the time left for the resume.
  const remaining = useRef(SLIDE_MS);
  const startedAt = useRef(0);
  useEffect(() => {
    remaining.current = SLIDE_MS;
  }, [active]);
  useEffect(() => {
    if (paused) return;
    startedAt.current = performance.now();
    const id = setTimeout(() => go(active + 1), remaining.current);
    return () => {
      clearTimeout(id);
      remaining.current = Math.max(0, remaining.current - (performance.now() - startedAt.current));
    };
  }, [active, paused, go]);

  // Keyboard arrows (ignored while typing in a field)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      if (window.scrollY > window.innerHeight * 0.6) return;
      if (e.key === "ArrowRight") setActive((a) => (a + 1) % SLIDES.length);
      if (e.key === "ArrowLeft") setActive((a) => (a - 1 + SLIDES.length) % SLIDES.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Pointer parallax via CSS variables so React never re-renders on mouse move
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", String((e.clientX - r.left) / r.width - 0.5));
      el.style.setProperty("--my", String((e.clientY - r.top) / r.height - 0.5));
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  const slide = SLIDES[active];

  return (
    <section
      ref={root}
      className="hero-root relative isolate min-h-[100svh] overflow-hidden bg-navy-950"
      style={{ ["--mx" as string]: 0, ["--my" as string]: 0, ["--slide-ms" as string]: `${SLIDE_MS}ms` }}
      aria-roledescription="carousel"
      aria-label="Featured services"
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
      }}
    >
      {/* Photo stack — crossfade, slow zoom, pointer parallax */}
      <div className="hero-photo absolute inset-0 -z-10" aria-hidden="true">
        {SLIDES.map((s, i) => (
          <div
            key={s.image}
            className={`slide-frame absolute inset-0 ${i === active ? "is-active" : ""}`}
          >
            <div className="slide-zoom absolute inset-0">
              <Image
                src={s.image}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: s.position }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Grading: navy wash on the text side, warm glow opposite, floor fade */}
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(95deg,rgba(7,13,26,0.96)_6%,rgba(7,13,26,0.82)_38%,rgba(7,13,26,0.35)_72%,rgba(7,13,26,0.15)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(7,13,26,0.55),rgba(7,13,26,0.88)_55%,rgba(7,13,26,0.97))]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_88%_80%,rgba(226,35,31,0.2),transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-navy-950/80 to-transparent"
        aria-hidden="true"
      />

      {/* Slide copy — keyed so each change replays the entrance */}
      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pt-28 pb-44 sm:px-6 lg:pb-40">
        <div key={active} className="max-w-3xl" aria-live="polite">
          <div
            className="hero-fade flex items-center gap-4"
            style={{ animationDelay: "100ms" }}
          >
            <span className="font-mono text-xs font-semibold tracking-widest text-bronze-400">
              {pad(active + 1)}
            </span>
            <span className="h-px w-10 bg-white/30" />
            <span className="text-xs font-semibold tracking-[0.18em] text-steel-300 uppercase">
              {slide.eyebrow}
            </span>
          </div>

          <h1 className="mt-7 font-display text-[2.6rem] leading-[1.03] font-extrabold tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.6rem]">
            {slide.lines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.1em]">
                <span
                  className="hero-line block"
                  style={{ animationDelay: `${180 + i * 120}ms` }}
                >
                  {i === slide.accentLine ? (
                    <span className="bg-gradient-to-r from-bronze-500 via-bronze-400 to-gold-400 bg-clip-text text-transparent">
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="hero-rise mt-7 max-w-xl text-base leading-relaxed text-steel-300 md:text-lg"
            style={{ animationDelay: "560ms" }}
          >
            {slide.body}
          </p>

          <div
            className="hero-rise mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "700ms" }}
          >
            <Link
              href={slide.cta.href}
              className="group inline-flex items-center gap-3 rounded-full bg-bronze-600 py-3.5 pr-3.5 pl-7 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(226,35,31,0.7)] transition-colors hover:bg-bronze-500"
            >
              {slide.cta.label}
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <Link
              href="/rfq"
              className="inline-flex items-center rounded-full border border-white/25 bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-white/50 hover:bg-white/10"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto flex max-w-7xl items-end gap-8 px-4 pr-24 pb-7 sm:px-6 sm:pr-28 lg:pb-9">
          <div
            className="grid flex-1 grid-cols-5 gap-2 sm:gap-3"
            role="tablist"
            aria-label="Choose slide"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            {SLIDES.map((s, i) => {
              const on = i === active;
              return (
                <button
                  key={s.tab}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-label={`Slide ${i + 1}: ${s.tab}`}
                  onClick={() => go(i)}
                  className="group text-left"
                >
                  <span className="relative block h-[3px] overflow-hidden rounded-full bg-white/20">
                    {on ? (
                      <span
                        key={active}
                        className="hero-progress absolute inset-0 origin-left rounded-full bg-white"
                        style={{ animationPlayState: paused ? "paused" : "running" }}
                      />
                    ) : null}
                  </span>
                  <span
                    className={`mt-3 hidden items-baseline gap-2 transition-opacity sm:flex ${
                      on ? "opacity-100" : "opacity-45 group-hover:opacity-80"
                    }`}
                  >
                    <span className="font-mono text-[11px] text-bronze-400">{pad(i + 1)}</span>
                    <span className="text-[13px] font-semibold text-white">{s.tab}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous slide"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white backdrop-blur-md transition-colors hover:border-white hover:bg-white hover:text-navy-950"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next slide"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white backdrop-blur-md transition-colors hover:border-white hover:bg-white hover:text-navy-950"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
