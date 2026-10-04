"use client";

import { useEffect, useRef } from "react";

export function Story() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    async function init() {
      const gsap = (await import("gsap")).gsap;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const section = containerRef.current;
      if (!section) return;

      const paras = section.querySelectorAll(".story-content p");
      gsap.fromTo(
        paras,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );
    }

    init();
  }, []);

  return (
    <section
      ref={containerRef}
      id="story"
      className="story-section"
      aria-labelledby="story-heading"
    >
      <div className="container">
        <div className="story-content">
          <p>
            Most people see a protein structure and think it&apos;s art. I see instructions —
            algorithms written in chemistry, running continuously at femtosecond timescales.
          </p>
          <p>
            Every fold, every charged patch, every hydrophobic cluster is there for a reason.
            Understanding those reasons means understanding how life works at its most fundamental
            level. And once you understand how something works, you can change it.
          </p>
          <p>
            That&apos;s why I started AtomBios. Because the insight is already there, buried in
            computational predictions and structural databases. We just need to make it
            accessible enough that researchers and clinicians can act on it.
          </p>
        </div>
      </div>
    </section>
  );
}
