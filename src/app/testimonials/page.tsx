import type { Metadata } from "next";

import { fallbackTestimonials } from "@/lib/data";
import { Reveal, SectionHeading, GoldLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Testimonials — Love, In Their Words",
  description:
    "Read what couples and families say about The Eternal Bliss — luxury wedding planning, photography, films, decor and studio sessions.",
};

export const dynamic = "force-dynamic";

async function getTestimonials() {
  return fallbackTestimonials;
}

export default async function TestimonialsPage() {
  const quotes = await getTestimonials();

  return (
    <>
      <section className="bg-ink pb-24 pt-44 text-bone">
        <div className="mx-auto max-w-7xl px-6">
          <p className="fade-up eyebrow">Testimonials</p>
          <p className="fade-up font-script mt-5 text-4xl text-gold" style={{ animationDelay: "0.15s" }}>
            from the hearts we've held
          </p>
          <h1 className="fade-up h-display mt-2 max-w-4xl text-4xl md:text-7xl" style={{ animationDelay: "0.3s" }}>
            Love, in their words
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="columns-1 gap-8 md:columns-2 lg:columns-3 [&>*]:mb-8">
          {quotes.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 100} className="break-inside-avoid">
              <figure className="border border-ink/10 bg-white/60 p-10">
                <p className="text-gold">{"★".repeat(t.rating ?? 5)}</p>
                <blockquote className="font-serif mt-6 text-lg leading-relaxed text-ink/80">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-8">
                  <p className="h-display text-xl">{t.couple}</p>
                  <p className="mt-1 text-[0.62rem] uppercase tracking-[0.3em] text-ink/50">
                    {t.event} · {t.location}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-petal/50 py-24 text-center">
        <Reveal className="mx-auto max-w-2xl px-6">
          <SectionHeading
            eyebrow="Your Turn"
            title="Become our next love letter"
            center
          />
          <div className="mt-10 flex justify-center">
            <GoldLink href="/contact">Begin Your Story</GoldLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
