'use client'

import { useEffect, useRef } from 'react'

const basePath = '/jackieng-profile'

export interface AtomBiosPillar {
  icon: string
  title: string
  description: string
}

export interface AtomBiosProps {
  headshot?: string
}

export function AtomBios({ headshot }: AtomBiosProps) {
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

  const headshotSrc = headshot
    ? headshot.startsWith('/')
      ? headshot
      : `${basePath}/assets/${headshot}`
    : `${basePath}/assets/headshot.jpg`

  return (
    <section
      ref={containerRef}
      id="atombios"
      className="atombios-section"
      aria-labelledby="atombios-heading"
    >
      <div className="container">
        <div className="atombios-inner">
          <div className="atombios__text fade-up">
            <h2 className="section-heading" id="atombios-heading">AtomBios</h2>
            <p className="atombios__lead">
              Making molecular structure accessible to researchers and clinicians.
            </p>
            <p>
              AtomBios is a deep-tech startup built on the insight that computational
              structural biology produces powerful predictions that most researchers
              can&apos;t easily interpret or act on. AtomBios bridges that gap —
              translating structure into actionable insight.
            </p>
            <p>
              Supported by HKSTP Ideation and PolyU IEP Year 12, AtomBios operates at the
              intersection of structural biology, machine learning, and clinical translation.
            </p>
            <a href="mailto:jackieng@atombios.com" className="atombios__cta-link">
              Get in touch about AtomBios →
            </a>
          </div>

          <div className="atombios__headshot fade-up">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={headshotSrc}
              alt="Jackie Ng"
              width={320}
              height={320}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
