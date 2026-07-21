"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/data";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Story", href: "/our-story" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Packages", href: "/packages" },
  { label: "Journal", href: "/journal" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact Us", href: "/contact" },
];

const serviceLinks = [
  { label: "Wedding Planning", href: "/wedding-planning" },
  { label: "Wedding Photography", href: "/wedding-photography" },
  { label: "Wedding Films", href: "/wedding-films" },
  { label: "Wedding Decor", href: "/wedding-decor" },
  { label: "Destination Weddings", href: "/destination-weddings" },
  { label: "Maternity", href: "/maternity-photography" },
  { label: "Newborn", href: "/newborn-photography" },
  { label: "Family", href: "/family-photography" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const dark = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          dark ? "bg-bone/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-5">
          {/* Left Side */}
          <div className="flex flex-1 justify-start">
            <nav className="hidden items-center gap-4 lg:gap-8 md:flex">
              {["/", "/about", "/portfolio", "/contact"].map((href) => {
                const link = links.find((l) => l.href === href)!;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`link-underline text-[0.68rem] uppercase tracking-[0.3em] transition-colors whitespace-nowrap ${
                      dark ? "text-ink/80 hover:text-ink" : "text-bone/85 hover:text-bone"
                    } ${pathname === href ? "text-bone" : ""}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Center Logo */}
          <div className="flex justify-center lg:px-8">
            <Link href="/" className="group flex flex-col items-center">
              <img 
                src="/teb logo.png" 
                alt="The Eternal Bliss Logo" 
                className={`h-20 md:h-24 w-auto object-contain transition-all duration-500 ${
                  !dark ? "brightness-0 invert" : ""
                }`} 
              />
              <span
                className={`block text-[0.55rem] uppercase tracking-[0.4em] transition-colors mt-2 ${
                  dark ? "text-ink" : "text-bone"
                }`}
              >
                Since 2016
              </span>
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex flex-1 justify-end items-center gap-5 xl:gap-8">
            <nav className="hidden items-center gap-4 lg:gap-6 md:flex">
              <a
                href={`https://instagram.com/${SITE.instagram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className={`transition-all hover:scale-110 ${
                  dark ? "text-ink/80 hover:text-ink" : "text-bone/85 hover:text-bone"
                }`}
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className={`transition-all hover:scale-110 ${
                  dark ? "text-ink/80 hover:text-ink" : "text-bone/85 hover:text-bone"
                }`}
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className={`transition-all hover:scale-110 ${
                  dark ? "text-ink/80 hover:text-ink" : "text-bone/85 hover:text-bone"
                }`}
                aria-label="YouTube"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
            </nav>

            <button
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              className={`flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.3em] md:hidden ${
                dark ? "text-ink" : "text-bone"
              }`}
            >
              <span className="hidden md:inline">{open ? "Close" : "Menu"}</span>
              <span className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-current/30 rounded-full">
                <span
                  className={`block h-px w-4 bg-current transition-transform duration-300 ${
                    open ? "translate-y-[3.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px w-4 bg-current transition-transform duration-300 ${
                    open ? "-translate-y-[3.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu */}
      <div
        className={`fixed inset-0 z-40 bg-ink text-bone transition-all duration-700 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center gap-10 overflow-y-auto px-6 pt-24 pb-16 md:flex-row md:items-center md:gap-24">
          <div>
            <p className="eyebrow mb-6">Explore</p>
            <ul className="space-y-3">
              {links.map((l, i) => (
                <li
                  key={l.href}
                  style={{ transitionDelay: `${i * 40}ms` }}
                  className={`transition-all duration-700 ${
                    open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                >
                  <Link
                    href={l.href}
                    className="h-display text-3xl text-bone/85 transition-colors hover:text-bone md:text-5xl"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-6">Services</p>
            <ul className="space-y-3">
              {serviceLinks.map((l, i) => (
                <li
                  key={l.href}
                  style={{ transitionDelay: `${200 + i * 40}ms` }}
                  className={`transition-all duration-700 ${
                    open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                >
                  <Link
                    href={l.href}
                    className="text-sm uppercase tracking-[0.25em] text-bone/60 transition-colors hover:text-bone"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="font-script mt-10 text-3xl text-bone">
              Creating timeless memories
            </p>
          </div>
        </div>
      </div>

      {/* Mobile bottom CTA */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex md:hidden">
        <Link
          href="/contact"
          className="flex-1 bg-ink py-4 text-center text-[0.7rem] uppercase tracking-[0.35em] text-bone"
        >
          Enquire Now
        </Link>
        <a
          href="tel:+919810000000"
          className="flex-1 bg-gold py-4 text-center text-[0.7rem] uppercase tracking-[0.35em] text-ink"
        >
          Call Us
        </a>
      </div>
    </>
  );
}
