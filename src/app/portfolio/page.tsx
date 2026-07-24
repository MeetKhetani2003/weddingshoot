import type { Metadata } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";
import { Reveal, SectionHeading, GoldLink } from "@/components/ui";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Portfolio — Weddings, Films, Decor & Fine-Art Photography",
  description:
    "A curated portfolio of luxury weddings, destination celebrations, decor design, maternity, newborn and family photography by The Eternal Bliss.",
};

export default async function PortfolioPage() {
  await connectToDatabase();
  const rawPortfolio = await Portfolio.find({}).sort({ createdAt: -1 }).lean();
  const portfolio = JSON.parse(JSON.stringify(rawPortfolio));

  return (
    <>
      <section className="bg-ink pb-24 pt-44 text-bone">
        <div className="mx-auto max-w-7xl px-6">
          <p className="fade-up eyebrow">Portfolio</p>
          <p className="fade-up font-script mt-5 text-4xl text-gold" style={{ animationDelay: "0.15s" }}>
            moments made eternal
          </p>
          <h1 className="fade-up h-display mt-2 max-w-4xl text-4xl md:text-7xl" style={{ animationDelay: "0.3s" }}>
            Celebrations we&apos;ve had the honour to craft
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        {portfolio.length === 0 && (
          <p className="text-center text-bone/50 text-xl py-20">No portfolio images found.</p>
        )}
        <div className="grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((p: any, i: number) => (
            <Reveal key={p._id + i} delay={(i % 3) * 100}>
              <article className="group">
                <div className="lux-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/api/images/${p.imageId}`}
                    alt={`${p.title} — ${p.place}`}
                    className={`w-full object-cover ${
                      i % 4 === 0 ? "aspect-[4/5]" : i % 4 === 1 ? "aspect-square" : "aspect-[4/5]"
                    }`}
                    loading="lazy"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h2 className="h-display text-2xl">{p.title}</h2>
                  <span className="shrink-0 text-[0.6rem] uppercase tracking-[0.3em] text-gold">
                    {p.tag}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink/50">{p.place}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-petal/50 py-24 text-center">
        <Reveal className="mx-auto max-w-2xl px-6">
          <SectionHeading
            eyebrow="Yours Could Be Next"
            title="Let's frame your forever"
            center
          />
          <div className="mt-10 flex justify-center">
            <GoldLink href="/contact">Enquire Now</GoldLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
