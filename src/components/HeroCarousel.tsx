"use client";

import { useEffect, useState } from "react";

export default function HeroCarousel({ images = [] }: { images?: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4500); // Change image every 4.5 seconds
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <>
      {images.length === 0 && <div className="absolute inset-0 bg-ink" />}
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt="Luxury wedding experience"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent pointer-events-none" />
    </>
  );
}
