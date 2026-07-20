import type { Metadata } from "next";
import { packages } from "@/lib/data";
import { Reveal, SectionHeading, GoldLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Packages — Luxury Wedding Collections & Pricing",
  description:
    "Explore The Eternal Bliss wedding collections — signature photography packages, complete multi-day coverage and full-service luxury wedding experiences.",
};

export default function PackagesPage() {
  return (
    <>
      <section className="bg-ink pb-24 pt-44 text-bone">
        <div className="mx-auto max-w-7xl px-6">
          <p className="fade-up eyebrow">Collections</p>
          <p className="fade-up font-script mt-5 text-4xl text-gold" style={{ animationDelay: "0.15s" }}>
            crafted for every celebration
          </p>
          <h1 className="fade-up h-display mt-2 max-w-4xl text-4xl md:text-7xl" style={{ animationDelay: "0.3s" }}>
            Our signature packages
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 lg:grid-cols-3">
          {packages.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <div
                className={`relative flex h-full flex-col p-10 ${
                  p.featured
                    ? "bg-ink text-bone shadow-2xl lg:-mt-6 lg:mb-6"
                    : "border border-ink/10 bg-white/70"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold px-5 py-1.5 text-[0.6rem] uppercase tracking-[0.3em] text-ink">
                    Most Loved
                  </span>
                )}
                <p className={`eyebrow ${p.featured ? "" : ""}`}>{p.tagline}</p>
                <h2 className="h-display mt-4 text-3xl">{p.name}</h2>
                <p className="mt-6">
                  <span className="h-display text-5xl">{p.price}</span>{" "}
                  <span className={`text-xs uppercase tracking-[0.25em] ${p.featured ? "text-bone/50" : "text-ink/50"}`}>
                    {p.unit}
                  </span>
                </p>
                <div className="gold-rule my-8" />
                <ul className={`flex-1 space-y-4 text-sm leading-relaxed ${p.featured ? "text-bone/75" : "text-ink/70"}`}>
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span className="text-gold">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <GoldLink href="/contact" dark={p.featured}>
                    Reserve This Collection
                  </GoldLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-20 max-w-2xl text-center">
          <p className="font-script text-3xl text-gold">bespoke, always</p>
          <p className="mt-4 text-sm leading-relaxed text-ink/60">
            Every celebration is unique — our collections are starting points, not
            boundaries. Share your vision and we&apos;ll compose a bespoke proposal
            with planning, decor, entertainment and invitations woven in.
          </p>
        </Reveal>
      </section>

      <section className="bg-petal/50 py-24 text-center">
        <Reveal className="mx-auto max-w-2xl px-6">
          <SectionHeading eyebrow="Next Step" title="Request a bespoke proposal" center />
          <div className="mt-10 flex justify-center">
            <GoldLink href="/contact">Begin the Conversation</GoldLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
