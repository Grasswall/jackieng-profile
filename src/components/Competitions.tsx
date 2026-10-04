'use client'

import { useEffect, useRef } from 'react'

const basePath = '/jackieng-profile'

export interface CompetitionItem {
  title: string
  badge: string
  description: string
  photo?: string
}

interface CompetitionsProps {
  items: CompetitionItem[]
}

export function Competitions({ items }: CompetitionsProps) {
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
      id="competitions"
      className="competitions-section"
      aria-labelledby="competitions-heading"
    >
      <div className="container">
        <h2 className="section-heading fade-up" id="competitions-heading">Competitions</h2>
        <div className="competitions-grid">
          {items.map((item) => {
            const photoSrc = item.photo
              ? item.photo.startsWith('/')
                ? item.photo
                : `${basePath}/assets/${item.photo}`
              : null
            const hasPhoto = Boolean(photoSrc)

            return (
              <article
                key={item.title}
                className={`comp-card fade-up${hasPhoto ? '' : ' comp-card--no-img'}`}
              >
                {hasPhoto && (
                  <div className="comp-card__img-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photoSrc!}
                      alt={item.title}
                      loading="lazy"
                      width={480}
                      height={320}
                    />
                  </div>
                )}
                <div className="comp-card__body">
                  <span className="comp-card__award">{item.badge}</span>
                  <h3 className="comp-card__title">{item.title}</h3>
                  <p className="comp-card__detail">{item.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
