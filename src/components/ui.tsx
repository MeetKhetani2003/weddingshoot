"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";

/* ---------------- Reveal on scroll ---------------- */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-visible");
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* ---------------- Section heading ---------------- */
export function SectionHeading({
  eyebrow,
  title,
  script,
  light = false,
  center = false,
}: {
  eyebrow: string;
  title: string;
  script?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "text-center" : ""}>
      <p className="eyebrow">{eyebrow}</p>
      {script && (
        <p className="font-script text-3xl text-gold mt-4 md:text-4xl">{script}</p>
      )}
      <h2
        className={`h-display mt-3 text-4xl md:text-6xl ${
          light ? "text-bone" : "text-ink"
        }`}
      >
        {title}
      </h2>
      <div className={`gold-rule mt-6 ${center ? "mx-auto" : ""}`} />
    </Reveal>
  );
}

/* ---------------- Gold button ---------------- */
export function GoldLink({
  href,
  children,
  dark = false,
}: {
  href: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-4 border px-8 py-4 text-[0.7rem] uppercase tracking-[0.35em] transition-all duration-500 ${
        dark
          ? "border-bone/40 text-bone hover:bg-bone hover:text-ink"
          : "border-ink/30 text-ink hover:bg-ink hover:text-bone"
      }`}
    >
      {children}
      <span className="transition-transform duration-500 group-hover:translate-x-1.5">
        →
      </span>
    </Link>
  );
}

/* ---------------- Infinite marquee ---------------- */
export function Marquee({ items, light = false }: { items: string[]; light?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden py-6">
      <div className="marquee-track">
        {row.map((item, i) => (
          <span
            key={i}
            className={`h-display flex items-center whitespace-nowrap text-4xl md:text-6xl ${
              light ? "text-bone/25" : "text-ink/15"
            }`}
          >
            {item}
            <span className="mx-8 text-gold text-2xl md:text-3xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Instagram story highlights ---------------- */
export function Highlights({
  items,
}: {
  items: { label: string; image: string; href: string }[];
}) {
  return (
    <div className="no-scrollbar flex gap-6 overflow-x-auto px-6 pb-2 md:justify-center md:flex-wrap md:overflow-visible">
      {items.map((h) => (
        <Link
          key={h.label}
          href={h.href}
          className="group flex shrink-0 flex-col items-center gap-3"
        >
          <span className="rounded-full bg-gradient-to-tr from-gold via-blush to-gold p-[2px] transition-transform duration-500 group-hover:scale-105">
            <span className="block rounded-full bg-bone p-[3px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={h.image}
                alt={h.label}
                className="h-16 w-16 rounded-full object-cover md:h-20 md:w-20"
                loading="lazy"
              />
            </span>
          </span>
          <span className="text-[0.62rem] uppercase tracking-[0.25em] text-ink/60 group-hover:text-gold transition-colors">
            {h.label}
          </span>
        </Link>
      ))}
    </div>
  );
}

/* ---------------- Breadcrumbs ---------------- */
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[0.65rem] uppercase tracking-[0.3em] text-ink/50">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-gold">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-gold transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink/80">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
