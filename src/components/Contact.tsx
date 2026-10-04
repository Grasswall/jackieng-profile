"use client";

import { useEffect, useRef } from "react";
import { meta } from "@/lib/data";

export function Contact() {
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

      const children = section.querySelectorAll(".contact-intro, .contact-links");
      gsap.fromTo(
        children,
        { opacity: 0, y: 30 },
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
      id="contact"
      className="contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <h2 className="section-heading" id="contact-heading">
          Contact
        </h2>
        <p className="contact-intro">
          Investor conversations, research collaborations, speaking engagements.
        </p>
        <div className="contact-links">
          <a href={`mailto:${meta.email}`} className="contact-email">
            {meta.email}
          </a>
          <nav className="contact-social" aria-label="Social links">
            <a
              href={meta.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              LinkedIn
            </a>
            <a
              href="https://scholar.google.com/citations?user=YOUR_ID"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Scholar profile"
            >
              Google Scholar
            </a>
            <a
              href="https://twitter.com/jackieng"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter profile"
            >
              Twitter
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}
