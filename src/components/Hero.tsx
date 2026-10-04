'use client'

import { useEffect, useRef } from 'react'

export function Hero() {
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
    <section ref={containerRef} className="hero" aria-labelledby="hero-heading">
      <div className="container">
        <p className="hero__kicker fade-up">Computational Structural Biologist</p>
        <h1 className="hero__heading fade-up" id="hero-heading">Jackie Ng</h1>
        <p className="hero__tagline fade-up">I see the algorithms running inside molecules.</p>
        <a href="#recognition" className="hero__cta fade-up">
          Get in touch
        </a>
      </div>
    </section>
  )
}
