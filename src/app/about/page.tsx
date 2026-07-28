import type { Metadata } from "next";
import { Reveal, SectionHeading, GoldLink, Marquee } from "@/components/ui";
import { fallbackTestimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us — A Luxury Wedding Experience House",
  description:
    "The Eternal Bliss is a complete luxury wedding experience brand founded by Garima Dhingra in 2016 — planning, decor, photography, films, invitations and entertainment.",
};

const values = [
  {
    title: "Curate Emotions",
    detail:
      "Every celebration is designed around the people in it — their rituals, their humour, their tears of joy.",
  },
  {
    title: "Preserve Memories",
    detail:
      "Photographs, films and albums crafted as heirlooms — made to be held by generations that follow.",
  },
  {
    title: "Transform Celebrations",
    detail:
      "Planning, decor and production woven into a single, seamless, timeless experience.",
  },
];

const stats = [
  { n: "2016", label: "Founded" },
  { n: "450+", label: "Celebrations" },
  { n: "30+", label: "Destinations" },
  { n: "1", label: "Promise: Perfection" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink pb-24 pt-44 text-bone">
        <div className="mx-auto max-w-7xl px-6">
          <p className="fade-up eyebrow">About The Eternal Bliss</p>
          <p className="fade-up font-script mt-5 text-4xl text-gold" style={{ animationDelay: "0.15s" }}>
            more than photography
          </p>
          <h1 className="fade-up h-display mt-2 max-w-4xl text-4xl md:text-7xl" style={{ animationDelay: "0.3s" }}>
            A complete luxury wedding experience house
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <Reveal className="lux-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/10.jpg"
              alt="Garima Dhingra, founder of The Eternal Bliss"
              className="aspect-[4/5] w-full object-cover"
            />
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="The Founder"
              script="Garima Dhingra"
              title="The woman behind the bliss"
            />
            <Reveal delay={150}>
              <ul className="mt-8 space-y-3 text-sm uppercase tracking-[0.25em] text-ink/60">
                <li>— Wedding Experience Curator</li>
                <li>— Certified Newborn Photographer</li>
                <li>— Luxury Wedding Planner</li>
                <li>— Decor Specialist</li>
              </ul>
              <p className="mt-8 leading-relaxed text-ink/70">
                Since 2016, Garima has led The Eternal Bliss with a singular
                philosophy: curate emotions, preserve memories, and transform
                celebrations into timeless experiences. Under her direction, a
                photography studio grew into one of India&apos;s most complete
                wedding experience houses — planning, decor, films,
                invitations, entertainment and fine-art photography under one
                roof.
              </p>
              <div className="mt-10">
                <GoldLink href="/our-story">Read Our Story</GoldLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-petal/50 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 text-center md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <p className="h-display text-5xl text-gold-deep md:text-6xl">{s.n}</p>
              <p className="mt-2 text-[0.62rem] uppercase tracking-[0.3em] text-ink/60">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionHeading eyebrow="Philosophy" title="What we believe" center />
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 120}>
              <div className="h-full border border-ink/10 bg-white/60 p-10 text-center">
                <p className="font-script text-3xl text-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="h-display mt-4 text-2xl">{v.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink/60">{v.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-24 max-w-3xl border-l-2 border-gold pl-8">
          <p className="eyebrow">Mission</p>
          <p className="font-serif mt-3 text-2xl leading-relaxed text-ink/80">
            Deliver complete wedding experiences through planning, storytelling,
            photography, decor, films and flawless execution.
          </p>
          <p className="eyebrow mt-10">Vision</p>
          <p className="font-serif mt-3 text-2xl leading-relaxed text-ink/80">
            Become one of India&apos;s leading luxury wedding experience companies.
          </p>
        </Reveal>
      </section>

      {/* Testimonials Section */}
      <section className="bg-bone py-24 md:py-32 border-t border-ink/8">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="KIND WORDS FROM OUR"
            script="blessed couples"
            title="TEB Family Stories"
            center
          />
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {fallbackTestimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 120}>
                <figure className="flex h-full flex-col border border-ink/10 bg-white/70 backdrop-blur-sm p-8 md:p-10 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex items-center gap-1 text-gold text-sm">
                    {"★".repeat(t.rating ?? 5)}
                  </div>
                  <blockquote className="font-serif mt-6 flex-1 text-lg leading-relaxed text-ink/80 italic">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-8 pt-6 border-t border-ink/10">
                    <p className="h-display text-xl text-ink font-serif">{t.couple}</p>
                    <p className="mt-1 text-[0.62rem] uppercase tracking-[0.3em] text-gold-deep font-sans">
                      {t.event} · {t.location}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Marquee items={["Trust", "Craftsmanship", "Elegance", "Emotion"]} />

      <section className="relative overflow-hidden bg-ink py-16 text-center text-bone md:py-20">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/12.jpg"
            alt="Luxury Wedding"
            className="h-full w-full object-cover opacity-35 scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/80 to-ink/90" />
        </div>
        <Reveal className="relative z-10 mx-auto max-w-2xl px-6">
          <h2 className="h-display text-3xl md:text-5xl">
            Come, be part of our story
          </h2>
          <div className="mt-8 flex justify-center">
            <GoldLink href="/contact" dark>
              Start a Conversation
            </GoldLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
