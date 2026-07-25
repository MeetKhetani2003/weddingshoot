import Link from "next/link";
import { SITE, services } from "@/lib/data";

const explore = [
  { label: "About", href: "/about" },
  { label: "Our Story", href: "/our-story" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <img src="/teb logo.png" alt="The Eternal Bliss Logo" className="h-20 w-auto object-contain mb-4 filter brightness-0 invert" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone/60">
              {SITE.tagline}. A complete luxury wedding experience house —
              planning, decor, photography, films and celebrations curated by{" "}
              {SITE.founder}.
            </p>
            <div className="mt-8 space-y-2 text-sm text-bone/70">
              <p>{SITE.email}</p>
              <p>{SITE.phone}</p>
              <p className="text-gold">{SITE.instagram}</p>
            </div>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow">Services</p>
            <ul className="mt-6 space-y-3 text-sm text-bone/70">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="hover:text-gold transition-colors">
                    {s.nav}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow">Explore</p>
            <ul className="mt-6 space-y-3 text-sm text-bone/70">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-bone/10 pt-8 text-[0.65rem] uppercase tracking-[0.3em] text-bone/40 md:flex-row">
          <p>© {new Date().getFullYear()} The Eternal Bliss</p>
          <p>Creating Timeless Memories Since 2016</p>
        </div>
      </div>
    </footer>
  );
}
