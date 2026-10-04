"use client";

import { useEffect, useRef } from "react";

export interface EducationItem {
  degree: string;
  field?: string;
  institution: string;
  years: string;
  highlights?: string[];
}

interface EducationProps {
  items: EducationItem[];
}

export function Education({ items }: EducationProps) {
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

      const items = section.querySelectorAll(".education-item");
      gsap.fromTo(
        items,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
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
      id="education"
      className="education-section"
      aria-labelledby="education-heading"
    >
      <div className="container">
        <h2 className="section-heading" id="education-heading">
          Education
        </h2>
        <ol className="education-timeline" role="list">
          {items.map((item, idx) => (
            <li key={idx} className="education-item">
              <span className="education-period">{item.years}</span>
              <h3 className="education-degree">
                {item.degree}
                {item.field && `, ${item.field}`}
              </h3>
              <p className="education-school">{item.institution}</p>
              {item.highlights && (
                <p className="education-note">{item.highlights.join(" · ")}</p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
