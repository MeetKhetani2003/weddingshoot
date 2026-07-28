"use client";

import { useState, useEffect } from "react";
import { Reveal, SectionHeading, GoldLink } from "@/components/ui";

export type GalleryItem = {
  _id: string;
  title: string;
  categoryLabel: string;
  location: string;
  imageId: string;
  orientation?: "vertical" | "horizontal" | "auto";
};

/* ---------- Single card — proper component so hooks are legal ---------- */
function GalleryCard({
  item,
  index,
  onSelect,
}: {
  item: GalleryItem;
  index: number;
  onSelect: (item: GalleryItem) => void;
}) {
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">(
    item.orientation === "horizontal"
      ? "horizontal"
      : item.orientation === "vertical"
      ? "vertical"
      : "vertical"
  );

  const isHorizontal = orientation === "horizontal";

  return (
    <Reveal
      delay={index * 60}
      className={`group relative overflow-hidden rounded-sm cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 ${
        isHorizontal ? "col-span-1 md:col-span-2" : "col-span-1"
      }`}
    >
      <div
        onClick={() => onSelect(item)}
        className={`relative w-full overflow-hidden ${
          isHorizontal ? "aspect-[16/9] md:aspect-[16/10]" : "aspect-[3/4]"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/api/images/${item.imageId}`}
          alt={item.title}
          onLoad={(e) => {
            if (!item.orientation || item.orientation === "auto") {
              const img = e.currentTarget;
              if (img.naturalWidth > img.naturalHeight * 1.1) {
                setOrientation("horizontal");
              } else {
                setOrientation("vertical");
              }
            }
          }}
          className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-block rounded-full bg-bone/90 backdrop-blur-md px-3.5 py-1 text-[0.6rem] uppercase tracking-[0.25em] text-ink font-medium shadow-sm">
            {item.categoryLabel}
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 z-10 transition-transform duration-500 group-hover:-translate-y-1">
          <p className="text-[0.6rem] uppercase tracking-[0.3em] text-gold opacity-90 mb-1">
            {item.location}
          </p>
          <h3 className="h-display text-2xl md:text-3xl text-bone group-hover:text-white transition-colors">
            {item.title}
          </h3>
          <div className="mt-3 flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.3em] text-bone/80 opacity-0 transition-all duration-500 group-hover:opacity-100">
            <span>View Full Photo</span>
            <span className="text-gold">→</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------- Main component ---------- */
export default function HomeImageGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/featured")
      .then((r) => r.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <section className="mx-auto w-full max-w-[1800px] px-4 sm:px-8 md:px-12 lg:px-16 py-20 md:py-32 border-t border-ink/8">
        <SectionHeading
          eyebrow="EDITORIAL CURATION"
          script="crafted for eternity"
          title="Featured Celebrations & Stories"
          center
        />
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-[3/4] bg-ink/5 animate-pulse rounded-sm" />
          ))}
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-[1800px] px-4 sm:px-8 md:px-12 lg:px-16 py-20 md:py-32 border-t border-ink/8">
      <SectionHeading
        eyebrow="EDITORIAL CURATION"
        script="crafted for eternity"
        title="Featured Celebrations & Stories"
        center
      />

      {/* Grid Showcase */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
        {items.map((item, index) => (
          <GalleryCard key={item._id} item={item} index={index} onSelect={setActiveImage} />
        ))}
      </div>

      <div className="mt-16 text-center">
        <GoldLink href="/portfolio">Explore Full Portfolio</GoldLink>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-md p-4 md:p-10 transition-all"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute -top-12 right-0 text-bone/80 hover:text-gold transition-colors p-2 text-sm uppercase tracking-widest flex items-center gap-2"
            >
              Close ✕
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/api/images/${activeImage.imageId}`}
              alt={activeImage.title}
              className="max-h-[78vh] w-auto max-w-full object-contain rounded-sm shadow-2xl ring-1 ring-white/10"
            />
            <div className="mt-5 text-center text-bone">
              <span className="text-gold text-xs uppercase tracking-[0.3em] block mb-1">
                {activeImage.categoryLabel} · {activeImage.location}
              </span>
              <h4 className="h-display text-3xl">{activeImage.title}</h4>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
