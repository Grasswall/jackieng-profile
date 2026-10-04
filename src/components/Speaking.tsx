"use client";

import { useEffect, useRef } from "react";

export interface SpeakingEngagement {
  org: string;
  title: string;
}

interface SpeakingProps {
  engagements: SpeakingEngagement[];
}

export function Speaking({ engagements }: SpeakingProps) {
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

      const items = section.querySelectorAll(".speaking-item");
      gsap.fromTo(
        items,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
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
      id="speaking"
      className="speaking-section"
      aria-labelledby="speaking-heading"
    >
      <div className="container">
        <h2 className="section-heading" id="speaking-heading">
          Speaking
        </h2>
        <ul className="speaking-list" role="list">
          {engagements.map((eng, i) => (
            <li key={i} className="speaking-item">
              <span className="speaking-org">{eng.org}</span>
              <span className="speaking-title">{eng.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
