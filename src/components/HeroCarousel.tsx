"use client";

import { useEffect, useState } from "react";

const images = [
  "/DSC_0504.jpg",
  "/DSC_0635 copy.jpg",
  "/DSC_0724.jpg",
  "/1A7A1097.JPG",
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4500); // Change image every 4.5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt="Luxury wedding experience"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ease-in-out ${
            index === currentIndex ? "opacity-80" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/40" />
    </>
  );
}
