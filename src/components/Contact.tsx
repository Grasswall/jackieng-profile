'use client'

import { useEffect, useRef } from 'react'

export function Contact() {
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
      id="contact"
      className="section reveal"
      aria-labelledby="contact-heading"
    >
      <div className="section-inner">
        <p className="section-label">08 — CONTACT</p>
        <h2 className="section-heading" id="contact-heading">
          Open to collaboration.
        </h2>

        <div className="section-body">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            <div>
              <h3 style={{ 
                fontSize: '1rem', 
                fontWeight: 600, 
                marginBottom: '0.75rem', 
                color: 'var(--accent-cyan)' 
              }}>
                AI Researchers
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Model development, architecture improvements, multi-modal learning for molecular systems.
              </p>
            </div>

            <div>
              <h3 style={{ 
                fontSize: '1rem', 
                fontWeight: 600, 
                marginBottom: '0.75rem', 
                color: 'var(--accent-cyan)' 
              }}>
                Pharma Partners
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Training data contribution, pilot validation studies, early access to our design service.
              </p>
            </div>

            <div>
              <h3 style={{ 
                fontSize: '1rem', 
                fontWeight: 600, 
                marginBottom: '0.75rem', 
                color: 'var(--accent-cyan)' 
              }}>
                Investors
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Scaling the platform, expanding training data, building the team.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <a 
              href="mailto:jackieng@atombios.com" 
              className="btn btn-primary"
            >
              jackieng@atombios.com
            </a>
            <a 
              href="https://linkedin.com/in/jackiengcc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              LinkedIn
            </a>
          </div>

          <p style={{ 
            marginTop: '1.5rem', 
            color: 'var(--text-muted)', 
            fontSize: '0.875rem' 
          }}>
            Responding within 24 hours.
          </p>
        </div>
      </div>
    </section>
  )
}
