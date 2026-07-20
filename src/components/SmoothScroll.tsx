"use client";

import { useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { usePathname, useSearchParams } from "next/navigation";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    
    setLenis(lenisInstance);

    let raf = 0;
    const loop = (time: number) => {
      lenisInstance.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenisInstance.destroy();
    };
  }, []);

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, searchParams, lenis]);

  return <>{children}</>;
}
