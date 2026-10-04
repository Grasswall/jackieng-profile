'use client'

import { useEffect, useRef } from 'react'

const basePath = '/jackieng-profile'

export interface MediaCard {
  id: string
  title: string
  outlet: string
  description?: string
  photo?: string
}

export interface SpeakingEngagement {
  org: string
  title: string
}

interface MediaProps {
  cards: MediaCard[]
  speaking?: SpeakingEngagement[]
}

export function Media({ cards, speaking = [] }: MediaProps) {
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
      id="media"
      className="media-section"
      aria-labelledby="media-heading"
    >
      <div className="container">
        <h2 className="section-heading fade-up" id="media-heading">Media</h2>

        <div className="media-grid">
          {cards.map((card) => {
            const photoSrc = card.photo
              ? card.photo.startsWith('/')
                ? card.photo
                : `${basePath}/assets/${card.photo}`
              : null

            return (
              <article key={card.id} className="media-card fade-up">
                {photoSrc && (
                  <div className="media-card__img-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photoSrc}
                      alt={`${card.outlet} — ${card.title}`}
                      loading="lazy"
                      width={480}
                      height={320}
                    />
                  </div>
                )}
                <div className="media-card__body">
                  <span className="media-card__outlet">{card.outlet}</span>
                  <h3 className="media-card__title">{card.title}</h3>
                  {card.description && (
                    <p className="media-card__detail">{card.description}</p>
                  )}
                </div>
              </article>
            )
          })}
        </div>

        {speaking.length > 0 && (
          <div style={{ marginTop: '4rem' }}>
            <h3 className="section-heading">Speaking</h3>
            <ul className="speaking-list" role="list">
              {speaking.map((eng, i) => (
                <li key={i} className="speaking-item fade-up">
                  <span className="speaking-item__org">{eng.org}</span>
                  <span className="speaking-item__title">{eng.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
