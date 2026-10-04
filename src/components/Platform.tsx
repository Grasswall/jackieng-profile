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
            entry.target.classList.add('revealed');
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

const advantages = [
  '4-5× smaller than conventional LNPs (80-100nm)',
  'Deep tissue penetration — solid tumors, fibrotic tissue, CNS',
  'Below immune surveillance thresholds',
  'Engineered for endosomal sorting, not brute-force escape',
  'Designed from structural biology first principles',
];

const statusCards = [
  { title: 'HKSTP Incu-Bio', value: 'HK$6M Funded', badge: 'badge-cyan' },
  { title: 'Total Funding', value: 'HK$7.3M+', badge: 'badge-gold' },
  { title: 'Status', value: 'Early Partner Validation', badge: 'badge-cyan' },
];

// nm sizes for proportional circles
const particles = [
  { nm: 12, label: '~12nm — Antibody', color: '#475569' },
  { nm: 20, label: '20nm — AtomBios', color: '#22D3EE' },
  { nm: 80, label: '80-100nm — Conventional LNP', color: '#64748B' },
  { nm: 100, label: '~100nm — Viral Vector', color: '#334155' },
];

function SizeComparison() {
  const maxNm = 100;
  const maxR = 54; // max radius in SVG units
  const svgWidth = 380;
  const svgHeight = 220;
  const spacing = svgWidth / particles.length;

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      width="100%"
      aria-label="Particle size comparison diagram"
      style={{ maxWidth: '420px', display: 'block', margin: '0 auto' }}
    >
      {particles.map((p, i) => {
        const r = (p.nm / maxNm) * maxR;
        const cx = spacing * i + spacing / 2;
        const cy = svgHeight / 2 - 10;
        return (
          <g key={p.label}>
            <circle cx={cx} cy={cy} r={r} fill={p.color} opacity={0.85} />
            <text
              x={cx}
              y={svgHeight - 8}
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="9"
              fontFamily="monospace"
            >
              {p.label.split(' — ').map((line, li) => (
                <tspan key={li} x={cx} dy={li === 0 ? 0 : 12}>
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function Platform() {
  const sectionRef = useReveal();

  return (
    <section id="platform" className="section" ref={sectionRef}>
      <div className="section-inner">
        <div className="reveal">
          <p className="section-label">03 — PROOF OF CONCEPT</p>
          <h2 className="section-heading">The 20nm Endosome Platform</h2>
          <p className="section-body" style={{ color: '#94A3B8', marginTop: '0.5rem' }}>
            First output from our computational design engine.
          </p>
        </div>

        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            marginTop: '2.5rem',
            alignItems: 'center',
          }}
        >
          {/* Left column */}
          <div>
            <p className="section-body" style={{ marginBottom: '1.5rem' }}>
              Our model predicted that ~20nm particles with endosome-mimetic composition would
              outperform conventional LNPs. We synthesized the predicted formulation. Validated it
              experimentally. It worked.
            </p>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
              }}
            >
              {advantages.map((adv) => (
                <li
                  key={adv}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}
                >
                  <span
                    style={{
                      color: '#22D3EE',
                      fontWeight: 700,
                      lineHeight: '1.6',
                      flexShrink: 0,
                    }}
                  >
                    ›
                  </span>
                  <span className="section-body" style={{ lineHeight: '1.6' }}>
                    {adv}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column — size comparison */}
          <div
            style={{
              background: '#0F172A',
              border: '1px solid #1E293B',
              borderRadius: '0.5rem',
              padding: '1.5rem',
            }}
          >
            <p
              className="mono"
              style={{ color: '#94A3B8', fontSize: '0.7rem', marginBottom: '1rem', textAlign: 'center' }}
            >
              PARTICLE SIZE COMPARISON (to scale)
            </p>
            <SizeComparison />
          </div>
        </div>

        {/* Status cards */}
        <div
          className="reveal card-grid"
          style={{ marginTop: '2.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
        >
          {statusCards.map((card) => (
            <div key={card.title} className="card" style={{ textAlign: 'center' }}>
              <p className="section-body" style={{ color: '#94A3B8', marginBottom: '0.5rem', fontSize: '0.8rem' }}>
                {card.title}
              </p>
              <span className={`badge ${card.badge}`} style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                {card.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
