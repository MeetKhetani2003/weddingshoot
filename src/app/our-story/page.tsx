import type { Metadata } from "next";
import { Reveal, SectionHeading, GoldLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Story — From One Camera to a Wedding Experience House",
  description:
    "The journey of The Eternal Bliss — founded in 2016 by Garima Dhingra, growing from a photography studio into a complete luxury wedding experience brand.",
};

const chapters = [
  {
    year: "2016",
    title: "A camera and a conviction",
    detail:
      "Garima Dhingra photographs her first wedding — and realises that what she is capturing is not events, but heirlooms. The Eternal Bliss is born.",
    image: "/1A7A1097.JPG",
  },
  {
    year: "2018",
    title: "The studio opens its doors",
    detail:
      "Certified in newborn photography, Garima expands into maternity, newborn and family portraiture — life's gentlest chapters, kept forever.",
    image: "/1A7A1150.JPG",
  },
  {
    year: "2020",
    title: "Films join the frame",
    detail:
      "A cinematography wing brings weddings to life in motion — teasers, feature films, drone cinema and same-day edits premiered at receptions.",
    image: "/1A7A1477.JPG",
  },
  {
    year: "2022",
    title: "Design becomes destiny",
    detail:
      "The decor and planning studios launch. Mandaps, floral styling, complete production — The Eternal Bliss becomes a full experience house.",
    image: "/1A7A1555.JPG",
  },
  {
    year: "Today",
    title: "Destinations without limits",
    detail:
      "From Udaipur's palaces to Goa's shores and beyond India's borders — 450+ celebrations later, the mission remains beautifully unchanged.",
    image: "/1S6A3248.JPG",
  },
];

export default function OurStoryPage() {
  return (
    <>
      <section className="relative flex min-h-[70svh] items-end overflow-hidden bg-ink">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/1S6A3355.JPG"
            alt="The Eternal Bliss story"
            className="hero-zoom h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/40" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-44">
          <p className="fade-up eyebrow">Our Story</p>
          <p className="fade-up font-script mt-5 text-4xl text-gold" style={{ animationDelay: "0.15s" }}>
            since 2016
          </p>
          <h1 className="fade-up h-display mt-2 max-w-4xl text-4xl text-bone md:text-7xl" style={{ animationDelay: "0.3s" }}>
            Every love story deserves a storyteller
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <div className="space-y-24">
          {chapters.map((c, i) => (
            <Reveal key={c.year}>
              <div
                className={`grid items-center gap-10 md:grid-cols-2 ${
                  i % 2 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="lux-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.image}
                    alt={c.title}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="font-script text-4xl text-gold">{c.year}</p>
                  <h2 className="h-display mt-3 text-3xl md:text-4xl">{c.title}</h2>
                  <div className="gold-rule mt-5" />
                  <p className="mt-6 leading-relaxed text-ink/70">{c.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-petal/50 py-24 text-center">
        <Reveal className="mx-auto max-w-2xl px-6">
          <SectionHeading
            eyebrow="The Next Chapter"
            title="Perhaps it begins with you"
            center
          />
          <div className="mt-10 flex justify-center">
            <GoldLink href="/contact">Write It With Us</GoldLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
