import type { Metadata } from "next";
import InquiryForm from "@/components/InquiryForm";
import { Reveal, SectionHeading } from "@/components/ui";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact — Begin Your Story",
  description:
    "Enquire with The Eternal Bliss — luxury wedding planning, photography, films, decor, destination weddings and studio sessions. We reply within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink pb-24 pt-44 text-bone">
        <div className="mx-auto max-w-7xl px-6">
          <p className="fade-up eyebrow">Contact</p>
          {/* <p className="fade-up font-script mt-5 text-4xl text-gold" style={{ animationDelay: "0.15s" }}>
            we'd love to hear from you
          </p> */}
          <h1 className="fade-up h-display mt-2 max-w-4xl text-4xl md:text-6xl" style={{ animationDelay: "0.3s" }}>
            Begin your <span className="font-sans text-white  font-bold text-[0.8em] inline-block -translate-y-1 uppercase">Story</span> with us
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="Say Hello"
              title="Every eternal celebration begins with a conversation"
            />
            <Reveal delay={150}>
              <div className="mt-10 space-y-8">
                <div>
                  <p className="eyebrow">Email</p>
                  <a href={`mailto:${SITE.email}`} className="h-display mt-2 block text-2xl hover:text-gold-deep transition-colors">
                    {SITE.email}
                  </a>
                </div>
                <div>
                  <p className="eyebrow">Phone / WhatsApp</p>
                  <a href="tel:+919810000000" className="h-display mt-2 block text-2xl hover:text-gold-deep transition-colors">
                    {SITE.phone}
                  </a>
                </div>
                <div>
                  <p className="eyebrow">Instagram</p>
                  <p className="h-display mt-2 text-2xl text-gold-deep">{SITE.instagram}</p>
                </div>
                <div>
                  <p className="eyebrow">Studio</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">
                    New Delhi, India — celebrations crafted across India and worldwide.
                  </p>
                </div>
              </div>
              <div className="lux-img mt-12 hidden lg:block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/11.jpg"
                  alt="The Eternal Bliss studio"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
          <Reveal delay={200} className="lg:col-span-3">
            <div className="border border-ink/10 bg-white/70 p-8 md:p-12">
              <InquiryForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
