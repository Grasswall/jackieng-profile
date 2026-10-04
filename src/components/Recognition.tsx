"use client";

import { useEffect, useRef } from "react";

const basePath = "/jackieng-profile";

export interface RecognitionItem {
  index: string;
  title: string;
  org: string;
  year: string;
  description: string;
  photo?: string;
}

interface RecognitionProps {
  items: RecognitionItem[];
}

export function Recognition({ items }: RecognitionProps) {
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

      const cards = section.querySelectorAll(".recognition-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        // Parallax image on scroll
        const img = card.querySelector(".recognition-image");
        if (img) {
          gsap.to(img, {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      });
    }

    init();
  }, []);

  // Filter out items with photos
  const itemsWithPhotos = items.filter((item) => item.photo);

  return (
    <section
      ref={containerRef}
      id="recognition"
      className="recognition-section"
      aria-labelledby="recognition-heading"
    >
      <div className="container">
        <h2 className="section-heading" id="recognition-heading">
          Recognition
        </h2>
        <div className="recognition-timeline">
          {itemsWithPhotos.map((item) => {
            const photoSrc = item.photo
              ? item.photo.startsWith("/")
                ? item.photo
                : `${basePath}/assets/${item.photo}`
              : null;

            return (
              <article key={item.title} className="recognition-card">
                {photoSrc && (
                  <div className="recognition-image">
                    <img
                      src={photoSrc}
                      alt={`${item.org} — ${item.title}`}
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="recognition-content">
                  <span className="recognition-year">{item.year}</span>
                  <h3 className="recognition-title">{item.title}</h3>
                  <p className="recognition-org">{item.org}</p>
                  <p className="recognition-description">{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
