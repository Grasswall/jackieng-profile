"use client";

import { useEffect, useRef } from "react";

const basePath = "/jackieng-profile";

export interface MediaCard {
  id: string;
  title: string;
  outlet: string;
  description?: string;
  photo?: string;
}

export interface SpeakingEngagement {
  org: string;
  title: string;
}

interface PressProps {
  cards: MediaCard[];
}

export function Press({ cards }: PressProps) {
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

      const pressCards = section.querySelectorAll(".press-card");
      gsap.fromTo(
        pressCards,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
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
      id="press"
      className="press-section"
      aria-labelledby="press-heading"
    >
      <div className="container">
        <h2 className="section-heading" id="press-heading">
          Press
        </h2>

        <div className="press-grid">
          {cards.map((card) => {
            const photoSrc = card.photo
              ? card.photo.startsWith("/")
                ? card.photo
                : `${basePath}/assets/${card.photo}`
              : null;

            return (
              <article key={card.id} className="press-card">
                {photoSrc && (
                  <div className="press-image">
                    <img
                      src={photoSrc}
                      alt={`${card.outlet} — ${card.title}`}
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="press-content">
                  <span className="press-outlet">{card.outlet}</span>
                  <h3 className="press-title">{card.title}</h3>
                  {card.description && <p className="press-description">{card.description}</p>}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
