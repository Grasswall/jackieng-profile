"use client";

import { useEffect, useRef } from "react";

const basePath = "/jackieng-profile";

export interface AtomBiosProps {
  headshot?: string;
}

export function AtomBios({ headshot }: AtomBiosProps) {
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

      const content = section.querySelector(".atombios-content");
      const headshot = section.querySelector(".atombios-headshot-wrap");

      if (content) {
        gsap.fromTo(
          content,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: content,
              start: "top 80%",
            },
          }
        );
      }

      if (headshot) {
        gsap.fromTo(
          headshot,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: headshot,
              start: "top 85%",
            },
          }
        );
      }
    }

    init();
  }, []);

  const headshotSrc = headshot
    ? headshot.startsWith("/")
      ? headshot
      : `${basePath}/assets/${headshot}`
    : `${basePath}/assets/headshot.jpg`;

  return (
    <section
      ref={containerRef}
      id="atombios"
      className="atombios-section"
      aria-labelledby="atombios-heading"
    >
      <div className="container">
        <div className="atombios-grid">
          <div className="atombios-content">
            <h2 id="atombios-heading">AtomBios</h2>
            <p>
              Drug development is slow and expensive because we still don&apos;t fully understand
              how proteins work. Decades of structural biology research have given us
              atomic-resolution snapshots of molecular machines, but translating those
              structures into therapies remains a bottleneck.
            </p>
            <p>
              AtomBios is built on a simple premise: <strong>if you understand a protein&apos;s
              structure, you understand how to modulate it.</strong> We use computational
              structural biology and machine learning to predict binding sites, conformational
              dynamics, and small-molecule interactions at atomic resolution — before
              expensive wet-lab experiments.
            </p>

            <h3>Problem</h3>
            <p>
              Drug candidates fail in late-stage trials not because the target is wrong,
              but because the interaction wasn&apos;t fully understood at the molecular level.
              Structural prediction tools exist, but turning predictions into actionable
              drug design insights is still a specialized, manual process.
            </p>

            <h3>Solution</h3>
            <p>
              AtomBios automates the workflow from structure prediction to binding site
              identification, giving researchers and pharma partners the molecular clarity
              they need to design better candidates faster.
            </p>

            <h3>Current Milestone</h3>
            <p>
              Supported by <strong>HKSTP Ideation Programme</strong> and{" "}
              <strong>PolyU Innovation &amp; Entrepreneurship Programme (Year 12)</strong>.
              We&apos;re working with early academic and industry partners to validate our
              first modules on high-value therapeutic targets.
            </p>
          </div>

          <div className="atombios-headshot-wrap">
            <img
              src={headshotSrc}
              alt="Jackie Ng, Founder & CEO of AtomBios"
              className="atombios-headshot"
              loading="lazy"
            />
            <p className="atombios-title">Jackie Ng<br />Founder &amp; CEO</p>
          </div>
        </div>
      </div>
    </section>
  );
}
