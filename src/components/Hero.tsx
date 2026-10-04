"use client";

import { useEffect, useRef } from "react";
import { MoleculeHero } from "./MoleculeHero";

interface HeroProps {
  atomBiosId: string;
}

export function Hero({ atomBiosId }: HeroProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    async function init() {
      const { gsap } = await import("gsap");
      const el = contentRef.current;
      if (!el) return;

      const children = Array.from(el.children);
      gsap.fromTo(
        children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }
    init();
  }, []);

  return (
    <section className="hero-section" aria-label="Introduction">
      {/* Three.js molecular visualization */}
      <div className="hero-canvas-container" aria-hidden="true">
        <MoleculeHero className="w-full h-full" />
      </div>

      {/* Hero content */}
      <div className="hero-content" ref={contentRef}>
        <h1 className="hero-headline">
          I see the algorithms running inside molecules.
        </h1>
        <p className="hero-subheader">
          Lindau Nobel Laureate 2025 &nbsp;·&nbsp; Shaw Prize Forum 2025 &nbsp;·&nbsp;
          CAS Future Leader 2025 &nbsp;·&nbsp; AtomBios Founder
        </p>
        <a href={`#${atomBiosId}`} className="hero-cta">
          About AtomBios
        </a>
      </div>
    </section>
  );
}
