import type { Metadata } from "next";
import Link from "next/link";
import { connectToDatabase } from "@/lib/mongodb";
import Story from "@/models/Story";
import { Reveal, GoldLink, SectionHeading } from "@/components/ui";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Journal — Stories, Guides & Inspiration",
  description:
    "The Eternal Bliss journal — destination wedding guides, planning wisdom, photography stories and inspiration from a decade of celebrations.",
};

export default async function JournalPage() {
  await connectToDatabase();
  const rawStories = await Story.find({}).sort({ createdAt: -1 }).lean();
  const journal = JSON.parse(JSON.stringify(rawStories));

  return (
    <>
      <section className="bg-ink pb-24 pt-44 text-bone">
        <div className="mx-auto max-w-7xl px-6">
          <p className="fade-up eyebrow">The Journal</p>
          <p className="fade-up font-script mt-5 text-4xl text-gold" style={{ animationDelay: "0.15s" }}>
            notes from the atelier
          </p>
          <h1 className="fade-up h-display mt-2 max-w-4xl text-4xl md:text-7xl" style={{ animationDelay: "0.3s" }}>
            Stories, guides and quiet wisdom
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        {journal.length === 0 && (
          <p className="text-center text-bone/50 text-xl py-20">No stories found.</p>
        )}
        <div className="grid gap-x-6 gap-y-16 md:grid-cols-3">
          {journal.map((post: any, i: number) => (
            <Reveal key={post.slug} delay={i * 120}>
              <Link href={`/journal/${post.slug}`} className="group block">
                <div className="lux-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/api/images/${post.imageId}`}
                    alt={post.title}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="mt-6 text-[0.6rem] uppercase tracking-[0.35em] text-gold">
                  {post.category} · {post.date}
                </p>
                <h2 className="h-display mt-3 text-2xl transition-colors group-hover:text-gold-deep md:text-3xl">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{post.excerpt}</p>
                <span className="link-underline mt-5 inline-block text-[0.65rem] uppercase tracking-[0.3em] text-ink/70">
                  Read the Story
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-petal/50 py-24 text-center">
        <Reveal className="mx-auto max-w-2xl px-6">
          <SectionHeading eyebrow="Planning a Celebration?" title="Let's talk about yours" center />
          <div className="mt-10 flex justify-center">
            <GoldLink href="/contact">Contact Us</GoldLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
