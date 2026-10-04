'use client'

import { useEffect, useRef } from 'react'
import { meta } from '@/lib/data'

export function Contact() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const elements = containerRef.current.querySelectorAll('.fade-up')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={containerRef}
      id="contact"
      className="contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <h2 className="section-heading fade-up" id="contact-heading">Contact</h2>
        <p className="contact__intro fade-up">
          Research collaborations, media, and speaking enquiries welcome.
        </p>
        <div className="contact__links fade-up">
          <a href={`mailto:${meta.email}`} className="contact__email">
            {meta.email}
          </a>
          <nav className="contact__social" aria-label="Social links">
            <a
              href={meta.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              LinkedIn
            </a>
            <a
              href="https://scholar.google.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Scholar profile"
            >
              Google Scholar
            </a>
            <a
              href="https://atombios.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AtomBios website"
            >
              AtomBios
            </a>
          </nav>
        </div>
      </div>
    </section>
  )
}
