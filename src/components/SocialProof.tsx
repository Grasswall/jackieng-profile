'use client'

import { useEffect, useRef } from 'react'

export interface StatItem {
  value: number | string
  label: string
}

interface SocialProofProps {
  stats: StatItem[]
}

export function SocialProof({ stats }: SocialProofProps) {
  const containerRef = useRef<HTMLDivElement>(null)

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
    <section className="stats-bar" aria-label="Key stats">
      <div ref={containerRef} className="container">
        <ul className="stats-bar__list fade-up" role="list">
          {stats.map((stat, i) => (
            <li key={i} className="stats-bar__item">
              <span className="stats-bar__value">{stat.value}</span>
              <span className="stats-bar__label">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
