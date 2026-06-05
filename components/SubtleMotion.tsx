"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export function SubtleMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = gsap.utils.toArray<HTMLElement>(
      "main > section, main article"
    );

    gsap.fromTo(
      elements,
      { autoAlpha: 0, y: 14 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.035
      }
    );
  }, [pathname]);

  return null;
}
