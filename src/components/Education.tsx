'use client'

import { useEffect, useRef } from 'react'

export interface EducationItem {
  degree: string
  field?: string
  institution: string
  years: string
  highlights?: string[]
}

interface EducationProps {
  items: EducationItem[]
}

export function Education({ items }: EducationProps) {
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
      id="education"
      className="education-section"
      aria-labelledby="education-heading"
    >
      <div className="container">
        <h2 className="section-heading fade-up" id="education-heading">Education</h2>
        <ol className="education-timeline" role="list">
          {items.map((item, idx) => (
            <li key={idx} className="education-item fade-up">
              <div className="education-item__marker" aria-hidden="true" />
              <div>
                <span className="education-item__period">{item.years}</span>
                <h3 className="education-item__degree">
                  {item.degree}
                  {item.field && `, ${item.field}`}
                </h3>
                <p className="education-item__school">{item.institution}</p>
                {item.highlights && (
                  <p className="education-item__note">
                    {item.highlights.join(' · ')}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
