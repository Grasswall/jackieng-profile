'use client';

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

const phases = [
  {
    label: 'Phase 1 — Complete',
    title: '20nm Endosome Platform',
    description:
      'Proof that computational design produces novel delivery vehicles. Synthesized, characterized, validated.',
    badge: { text: 'Complete', class: 'badge-cyan' },
  },
  {
    label: 'Phase 2 — In Progress',
    title: 'Expand Training Data',
    description:
      'Scaling from 800 to 5,000+ formulation-outcome training pairs through pharma partnerships. Publishing validation study.',
    badge: { text: 'In Progress', class: 'badge-cyan' },
  },
  {
    label: 'Phase 3 — 2027',
    title: 'Launch Design Service',
    description:
      'Pharma inputs payload type and target tissue. We output optimal formulation, predicted performance, and synthesis protocol.',
    badge: { text: 'Upcoming', class: 'badge-gold' },
  },
  {
    label: 'Long-term Vision',
    title: 'Foundation Model for All Delivery',
    description: 'Non-viral, viral, conjugates, exosomes — one model, any modality.',
    badge: null,
  },
];

export function Roadmap() {
  const sectionRef = useReveal();

  return (
    <section
      id="roadmap"
      className="section"
      style={{ background: '#111827' }}
      ref={sectionRef}
    >
      <div className="section-inner">
        <div className="reveal">
          <p className="section-label">04 — ROADMAP</p>
          <h2 className="section-heading">Platform proven. Model scaling.</h2>
        </div>

        <div className="reveal timeline" style={{ marginTop: '2.5rem' }}>
          {phases.map((phase) => (
            <div key={phase.title} className="timeline-item">
              <p
                className="mono"
                style={{
                  color: '#22D3EE',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  letterSpacing: '0.05em',
                }}
              >
                {phase.label}
              </p>
              <h3
                style={{
                  color: '#F8FAFC',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  lineHeight: 1.3,
                }}
              >
                {phase.title}
              </h3>
              <p className="section-body" style={{ marginBottom: '0.75rem' }}>
                {phase.description}
              </p>
              {phase.badge && (
                <span className={`badge ${phase.badge.class}`} style={{ fontSize: '0.75rem' }}>
                  {phase.badge.text}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
