import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/lib/data";
import { Reveal, SectionHeading, GoldLink, Breadcrumbs } from "@/components/ui";

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const data = services.find((s) => s.slug === service);
  if (!data) return {};
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      images: [{ url: data.image }],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const data = services.find((s) => s.slug === service);
  if (!data) notFound();

  const idx = services.findIndex((s) => s.slug === service);
  const related = [
    services[(idx + 1) % services.length],
    services[(idx + 2) % services.length],
    services[(idx + 3) % services.length],
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: data.nav, item: `/${data.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="relative flex min-h-[78svh] items-end overflow-hidden bg-ink">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.image}
            alt={data.nav}
            className="hero-zoom h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/30" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-44">
          <div className="fade-up" style={{ animationDelay: "0.3s" }}>
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: data.nav }]}
            />
          </div>
          <p
            className="fade-up eyebrow mt-8"
            style={{ animationDelay: "0.45s" }}
          >
            {data.eyebrow}
          </p>
          <h1
            className="fade-up h-display mt-4 max-w-4xl text-4xl text-bone md:text-7xl"
            style={{ animationDelay: "0.6s" }}
          >
            {data.h1}
          </h1>
        </div>
      </section>

      {/* Intro + features */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <SectionHeading eyebrow="The Experience" title="What we craft for you" />
            <Reveal delay={120}>
              <p className="mt-8 text-lg leading-relaxed text-ink/70">{data.intro}</p>
              <div className="mt-10">
                <GoldLink href="/contact">Enquire About This Service</GoldLink>
              </div>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {data.features.map((f, i) => (
                <li key={f} className="flex items-baseline gap-6 py-4">
                  <span className="font-serif text-sm text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-display text-xl md:text-2xl">{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="bg-ink py-24 text-bone md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Our Approach" title="From vision to eternity" light />
          <div className="mt-16 grid gap-10 md:grid-cols-4">
            {data.process.map((p, i) => (
              <Reveal key={p.step} delay={i * 120}>
                <p className="h-display text-5xl text-gold/40">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="h-display mt-4 text-2xl">{p.step}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bone/60">{p.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-24 md:py-32">
        <SectionHeading eyebrow="Questions" title="Frequently asked" center />
        <div className="mt-14 space-y-4">
          {data.faqs.map((f) => (
            <Reveal key={f.q}>
              <details className="faq group border border-ink/10 bg-white/60 px-8 py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                  <span className="h-display text-xl md:text-2xl">{f.q}</span>
                  <span className="faq-icon text-2xl text-gold">+</span>
                </summary>
                <p className="mt-4 leading-relaxed text-ink/65">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Related services */}
      <section className="border-t border-ink/8 bg-petal/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="eyebrow text-center">Continue Exploring</p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 100}>
                <Link href={`/${r.slug}`} className="group block">
                  <div className="lux-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.image}
                      alt={r.nav}
                      className="aspect-[16/10] w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="h-display mt-4 text-2xl transition-colors group-hover:text-gold-deep">
                    {r.nav} <span className="text-gold">→</span>
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-24 text-center text-bone">
        <Reveal className="mx-auto max-w-2xl px-6">
          <p className="font-script text-4xl text-gold">shall we begin?</p>
          <h2 className="h-display mt-4 text-3xl md:text-5xl">
            Your celebration deserves The Eternal Bliss
          </h2>
          <div className="mt-10 flex justify-center">
            <GoldLink href="/contact" dark>
              Begin the Conversation
            </GoldLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
