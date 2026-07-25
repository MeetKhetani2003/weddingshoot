"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Story", href: "/our-story" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
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

  const headerDark = open ? false : scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          open
            ? "bg-ink/90 backdrop-blur-md"
            : headerDark
            ? "bg-bone/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-5">
          {/* Left Side */}
          <div className="flex flex-1 justify-start">
            <nav className="hidden items-center gap-5 xl:gap-8 lg:flex">
              {["/", "/about", "/our-story"].map((href) => {
                const link = links.find((l) => l.href === href)!;
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`link-underline text-[0.68rem] uppercase tracking-[0.3em] transition-colors whitespace-nowrap ${
                      isActive
                        ? headerDark
                          ? "text-gold-deep font-semibold"
                          : "text-gold font-semibold"
                        : headerDark
                        ? "text-ink/80 hover:text-ink"
                        : "text-bone/85 hover:text-bone"
                    }`}
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
                className={`h-16 sm:h-20 md:h-24 w-auto object-contain transition-all duration-500 ${
                  !headerDark ? "brightness-0 invert" : ""
                }`}
              />
              <span
                className={`block text-[0.55rem] uppercase tracking-[0.2em] transition-colors mt-2 ${
                  headerDark ? "text-gold-deep" : "text-gold"
                }`}
              >
                Since 2016
              </span>
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex flex-1 justify-end items-center gap-5 xl:gap-8">
            <nav className="hidden items-center gap-5 xl:gap-8 lg:flex">
              {["/portfolio", "/testimonials", "/contact"].map((href) => {
                const link = links.find((l) => l.href === href)!;
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`link-underline text-[0.68rem] uppercase tracking-[0.3em] transition-colors whitespace-nowrap ${
                      isActive
                        ? headerDark
                          ? "text-gold-deep font-semibold"
                          : "text-gold font-semibold"
                        : headerDark
                        ? "text-ink/80 hover:text-ink"
                        : "text-bone/85 hover:text-bone"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <button
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              className={`flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.3em] lg:hidden ${
                headerDark ? "text-ink" : "text-bone"
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
        className={`fixed inset-0 z-40 bg-ink text-bone transition-all duration-500 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-start gap-10 overflow-y-auto px-8 pt-36 pb-32 md:flex-row md:items-center md:justify-center md:gap-24 md:pt-24 md:pb-16">
          <div>
            <p className="eyebrow mb-6 text-gold">Explore</p>
            <ul className="space-y-4">
              {links.map((l, i) => {
                const isActive = pathname === l.href;
                return (
                  <li
                    key={l.href}
                    style={{ transitionDelay: `${i * 40}ms` }}
                    className={`transition-all duration-700 ${
                      open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                    }`}
                  >
                    <Link
                      href={l.href}
                      className={`h-display text-3xl transition-colors md:text-5xl ${
                        isActive ? "text-gold font-medium" : "text-bone/85 hover:text-gold"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="eyebrow mb-6 text-gold">Services</p>
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
                    className="text-xs uppercase tracking-[0.25em] text-bone/60 transition-colors hover:text-gold md:text-sm"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="font-script mt-10 text-2xl text-gold md:text-3xl">
              Creating timeless memories
            </p>
          </div>
        </div>
      </div>

      {/* Mobile bottom CTA */}
      <div className={`fixed inset-x-0 bottom-0 z-30 ${open ? "hidden" : "flex md:hidden"}`}>
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
