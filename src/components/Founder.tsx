'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const items = el.querySelectorAll('.reveal');
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return ref;
}

const photos = [
  {
    src: '/assets/nobel-new.jpg',
    caption: 'Lindau Nobel Laureate Meeting, 2025',
  },
  {
    src: '/assets/shaw-prize-new.jpg',
    caption: 'Shaw Prize Science Forum, 2025',
  },
  {
    src: '/assets/abct-new.jpg',
    caption: 'CAS Future Leader, 2025',
  },
  {
    src: '/assets/hklf-new.jpg',
    caption: 'Young Scientist Award, HKLF 2024',
  },
];

const founderText = [
  `Most delivery scientists start from chemistry — screening lipid formulations until something works. Jackie started from biology.`,
  `As a structural biologist studying molecular interactions at atomic resolution, he saw something others missed: the endosome isn't a trap to escape from. It's a sorting machine. Understanding how it processes cargo — which receptors, which pH triggers, which trafficking signals — enabled the design of a vehicle the cell wants to deliver.`,
  `Published in Journal of Biological Chemistry (2024). Selected for Lindau Nobel Laureate Meeting (2025), Shaw Prize Forum (2025), CAS Future Leader (2025). Built and validated the 20nm platform experimentally. Now building the computational engine that designed it.`,
];

export function Founder() {
  const sectionRef = useReveal();

  return (
    <section id="founder" className="section" ref={sectionRef}>
      <div className="section-inner">
        <div className="reveal">
          <p className="section-label">05 — FOUNDER</p>
          <h2 className="section-heading">
            Built by someone who sees biology at atomic resolution.
          </h2>
        </div>

        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            marginTop: '2.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left: text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {founderText.map((para, i) => (
              <p key={i} className="section-body" style={{ lineHeight: '1.7' }}>
                {para}
              </p>
            ))}
          </div>

          {/* Right: 2×2 photo grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
            }}
          >
            {photos.map((photo) => (
              <figure
                key={photo.src}
                style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}
              >
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '4 / 3',
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                    border: '1px solid var(--border)',
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <figcaption
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.72rem',
                    lineHeight: '1.4',
                    textAlign: 'center',
                  }}
                >
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
