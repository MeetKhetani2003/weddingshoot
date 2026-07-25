import type { Metadata } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";
import { Reveal, SectionHeading, GoldLink } from "@/components/ui";
import PortfolioGallery from "@/components/PortfolioGallery";

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
        <PortfolioGallery items={portfolio} />
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
