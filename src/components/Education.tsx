'use client'

import { useEffect, useRef } from 'react'

export function Education() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="education"
      className="section reveal"
      aria-labelledby="education-heading"
    >
      <div className="section-inner">
        <p className="section-label">07 — EDUCATION</p>
        <h2 className="section-heading" id="education-heading">
          Academic foundation.
        </h2>

        <div className="section-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {/* Card 1 */}
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text)' }}>
                PhD, Applied Biology & Chemical Technology
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                The Hong Kong Polytechnic University
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                2023 – Present
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span className="badge badge-cyan">Outstanding Postgraduate Student Award (2024)</span>
                <span className="badge badge-cyan">Best Oral Presentation (2025)</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text)' }}>
                BSc, Biochemistry & Cell Biology
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                (International Research Enrichment)
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Hong Kong University of Science and Technology
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                2018 – 2022
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span className="badge badge-cyan">First Class Honours (GPA 4.0/4.3)</span>
                <span className="badge badge-cyan">Dean&apos;s List ×7</span>
                <span className="badge badge-cyan">D.H. Chen Foundation Scholarship</span>
                <span className="badge badge-cyan">MTR Corporate Scholarship</span>
                <span className="badge badge-cyan">Kitchell Undergraduate Research Award</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
