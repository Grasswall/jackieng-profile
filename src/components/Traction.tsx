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

const funding = [
  { value: 'HK$7.3M+', label: 'Total Funded' },
  { value: 'HK$6M', label: 'HKSTP Incu-Bio' },
  { value: 'HK$600K', label: 'PolyU IEP' },
  { value: 'HK$600K', label: 'GBA Innovation' },
];

const competitions = [
  { title: 'HKSTP Techathon+', badge: 'Gold Medal' },
  { title: '赢在苏州', badge: 'Rising Star 新銳獎' },
  { title: '北大滙豐-劍橋嘉治', badge: 'HK Champion' },
  { title: 'GBA STEAM', badge: '1st Runner Up' },
  { title: 'SUSS Pitch for Good', badge: "People's Choice" },
  { title: 'MU Metro Challenge', badge: 'Top 1 Team' },
];

const press = ['RTHK', 'BRTV Beijing', 'Ming Pao', 'Sing Tao', 'HK01'];

const incubation = [
  'HKSTP Incu-Bio (Funded)',
  'PolyU IEP Y12 (In Progress)',
  'HKSTP Ideation (Conditional)',
  'China Resources Incubation (In Progress)',
  'HKU SEED / HKU Techno 2026 (Completed)',
];

export function Traction() {
  const sectionRef = useReveal();

  return (
    <section
      id="traction"
      className="section"
      style={{ background: 'var(--bg-subtle)' }}
      ref={sectionRef}
    >
      <div className="section-inner">
        <div className="reveal">
          <p className="section-label">06 — TRACTION</p>
          <h2 className="section-heading">Institutional validation.</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            marginTop: '2.5rem',
          }}
        >
          {/* Funding — hero stat */}
          <div className="reveal" style={{ gridColumn: '1 / -1' }}>
            <h3
              style={{
                color: 'var(--accent-cyan)',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
              }}
            >
              Funding
            </h3>
            <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'baseline' }}>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>HK$7.3M+</div>
                <div style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Total Funded</div>
              </div>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {funding.slice(1).map((item) => (
                  <div key={item.label}>
                    <div className="mono" style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text)' }}>{item.value}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Competitions */}
          <div className="reveal">
            <h3
              style={{
                color: 'var(--accent-cyan)',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                marginBottom: '1rem',
                textTransform: 'uppercase',
              }}
            >
              Competitions
            </h3>
            <div
              style={{
                display: 'grid',
                gap: '0.75rem',
              }}
            >
              {competitions.slice(0, 3).map((comp) => (
                <div key={comp.title} className="card" style={{ padding: '0.85rem' }}>
                  <p
                    style={{
                      color: 'var(--text)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      marginBottom: '0.4rem',
                    }}
                  >
                    {comp.title}
                  </p>
                  <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>
                    {comp.badge}
                  </span>
                </div>
              ))}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.75rem' }}>
              + 3 more pitch competition wins
            </p>
          </div>

          {/* Press */}
          <div className="reveal">
            <h3
              style={{
                color: 'var(--accent-cyan)',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                marginBottom: '1rem',
                textTransform: 'uppercase',
              }}
            >
              Press
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              {press.map((outlet) => (
                <li
                  key={outlet}
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span style={{ color: 'var(--accent-cyan)' }}>›</span>
                  {outlet}
                </li>
              ))}
            </ul>
          </div>

          {/* Incubation */}
          <div className="reveal">
            <h3
              style={{
                color: 'var(--accent-cyan)',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                marginBottom: '1rem',
                textTransform: 'uppercase',
              }}
            >
              Incubation & Accelerators
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              {incubation.map((program) => (
                <li
                  key={program}
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span style={{ color: 'var(--accent-cyan)' }}>›</span>
                  {program}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
