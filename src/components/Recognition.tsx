'use client'

import { useEffect, useRef } from 'react'

const basePath = '/jackieng-profile'

export interface RecognitionItem {
  index: string
  title: string
  org: string
  year: string
  description: string
  photo?: string
}

interface RecognitionProps {
  items: RecognitionItem[]
}

export function Recognition({ items }: RecognitionProps) {
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
      id="recognition"
      className="recognition-section"
      aria-labelledby="recognition-heading"
    >
      <div className="container">
        <h2 className="section-heading fade-up" id="recognition-heading">Recognition</h2>
        <ul className="recognition-list" role="list">
          {items.map((item) => {
            const photoSrc = item.photo
              ? item.photo.startsWith('/')
                ? item.photo
                : `${basePath}/assets/${item.photo}`
              : null

            return (
              <li key={item.title} className="recognition-item fade-up">
                {photoSrc && (
                  <div className="recognition-item__img-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photoSrc}
                      alt={`${item.org} — ${item.title}`}
                      loading="lazy"
                      width={600}
                      height={400}
                    />
                  </div>
                )}
                <div>
                  <span className="recognition-item__year">{item.year}</span>
                  <h3 className="recognition-item__title">{item.title}</h3>
                  <p className="recognition-item__org">{item.org}</p>
                  <p className="recognition-item__detail">{item.description}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
