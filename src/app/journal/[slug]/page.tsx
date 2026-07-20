import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { journal } from "@/lib/data";
import { Reveal, Breadcrumbs, GoldLink } from "@/components/ui";

export function generateStaticParams() {
  return journal.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = journal.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [{ url: post.image }] },
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = journal.find((p) => p.slug === slug);
  if (!post) notFound();

  const others = journal.filter((p) => p.slug !== slug).slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    author: { "@type": "Organization", name: "The Eternal Bliss" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <section className="relative flex min-h-[70svh] items-end overflow-hidden bg-ink">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="hero-zoom h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
        </div>
        <div className="relative mx-auto w-full max-w-4xl px-6 pb-20 pt-44">
          <div className="fade-up">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Journal", href: "/journal" },
                { label: post.category },
              ]}
            />
          </div>
          <p className="fade-up eyebrow mt-8" style={{ animationDelay: "0.15s" }}>
            {post.category} · {post.date}
          </p>
          <h1 className="fade-up h-display mt-4 text-4xl text-bone md:text-6xl" style={{ animationDelay: "0.3s" }}>
            {post.title}
          </h1>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-24">
        <Reveal>
          <p className="font-serif text-2xl leading-relaxed text-ink/80">{post.excerpt}</p>
          <div className="gold-rule my-10" />
        </Reveal>
        {post.body.map((para, i) => (
          <Reveal key={i} delay={i * 60}>
            <p className="mb-7 leading-loose text-ink/70">{para}</p>
          </Reveal>
        ))}
      </article>

      <section className="border-t border-ink/8 bg-petal/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="eyebrow text-center">Keep Reading</p>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <Link href={`/journal/${p.slug}`} className="group block">
                  <div className="lux-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={p.title}
                      className="aspect-[16/10] w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="h-display mt-4 text-2xl transition-colors group-hover:text-gold-deep">
                    {p.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 text-center">
            <GoldLink href="/journal">Back to Journal</GoldLink>
          </div>
        </div>
      </section>
    </>
  );
}
