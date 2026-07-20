import Link from "next/link";

import {
  Reveal,
  SectionHeading,
  GoldLink,
  Marquee,
  Highlights,
} from "@/components/ui";
import {
  SITE,
  highlights,
  portfolio,
  processSteps,
  fallbackTestimonials,
} from "@/lib/data";

export const dynamic = "force-dynamic";

const experiences = [
  {
    title: "Wedding Planning",
    href: "/wedding-planning",
    image: "/6.jpg",
    note: "Complete celebration curation",
  },
  {
    title: "Photography",
    href: "/wedding-photography",
    image: "/7.jpg",
    note: "Editorial, candid, timeless",
  },
  {
    title: "Wedding Films",
    href: "/wedding-films",
    image: "/8.jpg",
    note: "Cinema from your celebration",
  },
  {
    title: "Destinations",
    href: "/destination-weddings",
    image: "/9.jpg",
    note: "Palaces, beaches, beyond",
  },
];

const collections = [
  { title: "Maternity", href: "/maternity-photography", image: "/DSC-1288-Original Final copy.jpg" },
  { title: "Newborn", href: "/newborn-photography", image: "/DSC_0227.jpg" },
  { title: "Family", href: "/family-photography", image: "/DSC_0273 copy 2.png" },
];

async function getTestimonials() {
  return fallbackTestimonials;
}

export default async function HomePage() {
  const quotes = await getTestimonials();

  return (
    <>
      {/* 1 — Cinematic Hero */}
      <section className="relative flex min-h-svh items-end overflow-hidden bg-ink">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/DSC_0504.jpg"
            alt="Luxury Indian wedding by The Eternal Bliss"
            className="hero-zoom h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/40" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-40 md:pb-32">
          <p className="fade-up eyebrow" style={{ animationDelay: "0.4s" }}>
            Luxury Wedding Experience House · India
          </p>
          <p
            className="fade-up font-script mt-6 text-4xl text-gold md:text-6xl"
            style={{ animationDelay: "0.6s" }}
          >
            Creating timeless memories
          </p>
          <h1
            className="fade-up h-display mt-2 max-w-5xl text-5xl text-bone md:text-8xl"
            style={{ animationDelay: "0.8s" }}
          >
            Where every celebration becomes eternal
          </h1>
          <div
            className="fade-up mt-10 flex flex-wrap items-center gap-6"
            style={{ animationDelay: "1.05s" }}
          >
            <GoldLink href="/contact" dark>
              Begin Your Story
            </GoldLink>
            <Link
              href="/portfolio"
              className="link-underline text-[0.7rem] uppercase tracking-[0.35em] text-bone/80"
            >
              View Portfolio
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 hidden text-[0.6rem] uppercase tracking-[0.4em] text-bone/50 md:block">
          Since 2016 — Scroll
        </div>
      </section>

      {/* 2 — Instagram Story Highlights */}
      <section className="border-b border-ink/8 bg-bone py-12">
        <Reveal>
          <p className="eyebrow mb-8 text-center">Explore Our World</p>
          <Highlights items={highlights} />
        </Reveal>
      </section>

      {/* 3 — Founder Story */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <Reveal className="lux-img relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/DSC_0506.jpg"
              alt={`${SITE.founder}, founder of The Eternal Bliss`}
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute -bottom-6 -right-4 bg-ink px-8 py-6 text-bone md:-right-8">
              <p className="font-script text-2xl text-gold">Garima Dhingra</p>
              <p className="mt-1 text-[0.6rem] uppercase tracking-[0.3em] text-bone/60">
                Founder & Experience Curator
              </p>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="The Founder"
              script="a decade of devotion"
              title="Behind every celebration, a curator of emotions"
            />
            <Reveal delay={150}>
              <p className="mt-8 leading-relaxed text-ink/70">
                The Eternal Bliss was born in 2016 from a simple belief — that a
                wedding is not an event, but an heirloom in the making. Founder{" "}
                <em className="font-serif text-lg">Garima Dhingra</em> — wedding
                experience curator, certified newborn photographer, luxury
                planner and decor specialist — has since transformed hundreds of
                celebrations into timeless experiences.
              </p>
              <p className="mt-5 leading-relaxed text-ink/70">
                We curate emotions, preserve memories and craft every detail —
                from the first invitation to the final frame of your film.
              </p>
              <div className="mt-10 flex gap-6">
                <GoldLink href="/about">Meet The Eternal Bliss</GoldLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee
        items={["Planning", "Photography", "Films", "Decor", "Destinations", "Studio"]}
      />

      {/* 4 — Signature Experiences */}
      <section className="bg-ink py-24 text-bone md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Signature Experiences"
              title="One house, every craft"
              light
            />
            <Reveal delay={200}>
              <GoldLink href="/packages" dark>
                Explore Packages
              </GoldLink>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-4">
            {experiences.map((e, i) => (
              <Reveal key={e.title} delay={i * 100}>
                <Link href={e.href} className="group block">
                  <div className="lux-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={e.image}
                      alt={e.title}
                      className="aspect-[3/4] w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-5 text-[0.6rem] uppercase tracking-[0.35em] text-gold">
                    {e.note}
                  </p>
                  <h3 className="h-display mt-2 text-2xl text-bone transition-colors group-hover:text-gold">
                    {e.title} <span className="text-gold">→</span>
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Wedding Stories */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <SectionHeading
          eyebrow="Wedding Stories"
          script="told with light"
          title="Recent celebrations"
          center
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {portfolio.slice(0, 3).map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <Link href="/portfolio" className="group block">
                <div className="lux-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.title}
                    className="aspect-[4/5] w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between">
                  <h3 className="h-display text-2xl">{p.title}</h3>
                  <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gold">
                    {p.tag}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink/50">{p.place}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 text-center">
          <GoldLink href="/portfolio">View Full Portfolio</GoldLink>
        </Reveal>
      </section>

      {/* 6 — Featured Film */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/DSC_0508.JPG"
            alt="Featured wedding film"
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-32 md:py-44">
          <Reveal>
            <p className="eyebrow">Featured Film</p>
            <p className="font-script mt-4 text-4xl text-gold">Meera & Kabir</p>
            <h2 className="h-display mt-2 max-w-2xl text-4xl text-bone md:text-6xl">
              “A sunset in Goa, and a promise for every lifetime”
            </h2>
            <div className="mt-10 flex items-center gap-6">
              <Link
                href="/wedding-films"
                className="group flex h-20 w-20 items-center justify-center rounded-full border border-bone/40 text-bone transition-all duration-500 hover:scale-105 hover:border-gold hover:text-gold"
                aria-label="Watch wedding films"
              >
                <span className="ml-1 text-xl">▶</span>
              </Link>
              <span className="text-[0.65rem] uppercase tracking-[0.35em] text-bone/60">
                Watch our films
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7+8 — Decor Gallery & Photography Collections */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Decor & Design"
              script="spaces that feel like poetry"
              title="Venues transformed into dreamscapes"
            />
            <Reveal delay={150}>
              <p className="mt-8 leading-relaxed text-ink/70">
                Mandaps that frame your vows, florals that perfume the evening,
                stages designed like editorials. Our in-house decor studio
                designs every function from a blank canvas.
              </p>
              <div className="mt-10">
                <GoldLink href="/wedding-decor">Explore Decor</GoldLink>
              </div>
            </Reveal>
          </div>
          <Reveal className="lux-img" delay={100}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/DSC_0548 (1).JPG"
              alt="Luxury wedding decor"
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
          </Reveal>
        </div>

        <div className="mt-28">
          <SectionHeading
            eyebrow="The Photography Studio"
            title="Life's gentlest chapters, beautifully kept"
            center
          />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {collections.map((c, i) => (
              <Reveal key={c.title + i} delay={i * 120}>
                <Link href={c.href} className="group block">
                  <div className="lux-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.image}
                      alt={`${c.title} photography`}
                      className="aspect-square w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="h-display mt-5 text-center text-2xl transition-colors group-hover:text-gold-deep">
                    {c.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9 — Planning Process */}
      <section className="bg-petal/50 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="The Process" title="How the magic unfolds" center />
          <div className="mt-16 grid gap-10 md:grid-cols-4">
            {processSteps.map((s, i) => (
              <Reveal key={s.n} delay={i * 120} className="text-center md:text-left">
                <p className="h-display text-6xl text-gold/50">{s.n}</p>
                <h3 className="h-display mt-4 text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{s.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — Testimonials */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <SectionHeading
          eyebrow="Kind Words"
          script="from our couples"
          title="Love, in their words"
          center
        />
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {quotes.map((t, i) => (
            <Reveal key={t.id} delay={i * 120}>
              <figure className="flex h-full flex-col border border-ink/10 bg-white/60 p-10">
                <p className="text-gold">{"★".repeat(t.rating ?? 5)}</p>
                <blockquote className="font-serif mt-6 flex-1 text-lg leading-relaxed text-ink/80">
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
        <Reveal className="mt-14 text-center">
          <GoldLink href="/testimonials">Read All Testimonials</GoldLink>
        </Reveal>
      </section>

      {/* 11 — Instagram Feed */}
      <section className="border-y border-ink/8 bg-bone py-20">
        <Reveal className="text-center">
          <p className="eyebrow">Instagram</p>
          <p className="font-script mt-3 text-4xl text-gold">{SITE.instagram}</p>
        </Reveal>
        <div className="mt-12 grid grid-cols-3 gap-2 px-2 md:grid-cols-6">
          {["/10.jpg", "/11.jpg", "/12.jpg", "/6.jpg", "/7.jpg", "/8.jpg"].map(
            (img, i) => (
              <Reveal key={img} delay={i * 80} className="lux-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt="The Eternal Bliss on Instagram"
                  className="aspect-square w-full object-cover"
                  loading="lazy"
                />
              </Reveal>
            )
          )}
        </div>
      </section>

      {/* 12 — CTA */}
      <section className="bg-ink py-28 text-center text-bone md:py-40">
        <Reveal className="mx-auto max-w-3xl px-6">
          <p className="font-script text-4xl text-gold md:text-5xl">your forever begins here</p>
          <h2 className="h-display mt-4 text-4xl md:text-6xl">
            Let&apos;s create something eternal
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-bone/60">
            Tell us about your celebration — a wedding, a destination dream, a
            new life on the way. We&apos;ll write back within 24 hours.
          </p>
          <div className="mt-12 flex justify-center">
            <GoldLink href="/contact" dark>
              Enquire Now
            </GoldLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
