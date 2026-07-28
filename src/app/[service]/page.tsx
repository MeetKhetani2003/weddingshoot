import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/lib/data";
import { Reveal, SectionHeading, GoldLink, Breadcrumbs } from "@/components/ui";
import { connectToDatabase } from "@/lib/mongodb";
import HomeConfig from "@/models/HomeConfig";

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

  await connectToDatabase();
  const config = await HomeConfig.findById("home").lean();
  
  // Find gallery images for this specific service
  const exploreItem = config?.explore?.items?.find((item: any) => item.href === `/${service}`);
  const galleryImageIds = exploreItem?.galleryImageIds || [];

  const idx = services.findIndex((s) => s.slug === service);
  const related = [
    services[(idx + 1) % services.length],
    services[(idx + 2) % services.length],
    services[(idx + 3) % services.length],
  ];

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

      {/* Intro */}
      <section className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center">
        <SectionHeading eyebrow="The Experience" title="What we craft for you" center />
        <Reveal delay={120}>
          <p className="mt-8 text-lg leading-relaxed text-ink/70">{data.intro}</p>
        </Reveal>
      </section>

      {/* Dynamic Image Gallery */}
      <section className="mx-auto max-w-7xl px-6 pb-32">
        {galleryImageIds.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImageIds.map((id: string, i: number) => (
              <Reveal key={id} delay={(i % 3) * 100} className="break-inside-avoid">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/api/images/${id}`}
                  alt={`${data.nav} gallery image`}
                  className="w-full object-cover shadow-2xl hover:scale-[1.02] transition-transform duration-500 cursor-pointer border border-ink/5"
                  loading="lazy"
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-ink/20 bg-ink/5 rounded-sm">
            <p className="text-ink/60 uppercase tracking-widest text-[0.65rem]">No gallery images yet. Add them in the Admin Panel.</p>
          </div>
        )}
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
                      className="aspect-[4/5] w-full object-cover"
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
      <section className="relative overflow-hidden bg-ink py-16 text-center text-bone md:py-20">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/10.jpg"
            alt="Luxury Celebration"
            className="h-full w-full object-cover opacity-35 scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/80 to-ink/90" />
        </div>
        <Reveal className="relative z-10 mx-auto max-w-2xl px-6">
          <p className="font-script text-3xl text-gold">shall we begin?</p>
          <h2 className="h-display mt-2 text-3xl md:text-5xl">
            Your celebration deserves The Eternal Bliss
          </h2>
          <div className="mt-8 flex justify-center">
            <GoldLink href="/contact" dark>
              Begin the Conversation
            </GoldLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
