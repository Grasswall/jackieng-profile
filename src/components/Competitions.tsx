"use client";

import { useEffect, useRef } from "react";

export interface CompetitionItem {
  title: string;
  badge: string;
  description: string;
  photo?: string;
}

interface CompetitionsProps {
  items: CompetitionItem[];
}

export function Competitions({ items }: CompetitionsProps) {
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

      const cards = section.querySelectorAll(".comp-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
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
      id="competitions"
      className="competitions-section"
      aria-labelledby="competitions-heading"
    >
      <div className="container">
        <h2 className="section-heading" id="competitions-heading">
          Competitions
        </h2>
        <div className="competitions-grid">
          {items.map((item) => (
            <article key={item.title} className="comp-card">
              <span className="comp-badge">{item.badge}</span>
              <h3 className="comp-title">{item.title}</h3>
              <p className="comp-description">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
