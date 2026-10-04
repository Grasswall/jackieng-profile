'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

// Lazy-load Three.js scene
const NanoparticleScene = dynamic(() => import('./NanoparticleScene'), {
  ssr: false,
  loading: () => <div className="hero-bg-fallback" />
})

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionQuery.matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const el = contentRef.current
    if (el) {
      const children = Array.from(el.children)
      children.forEach((child) => {
        if (child instanceof HTMLElement) {
          observer.observe(child)
        }
      })
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="hero" className="hero-section">
      <NanoparticleScene />
      <div className="hero-content" ref={contentRef}>
        <h1 className="reveal hero-headline">
          The first foundation model for rational drug delivery design.
        </h1>
        <p className="reveal hero-subheader">
          The best drugs already exist. They just can&apos;t get where they need to go.
        </p>
        <p className="reveal hero-credential">
          AtomBios · 20nm Endosome Platform · HKSTP Incu-Bio
        </p>
        <p className="reveal hero-recognition">
          Lindau 2025 · Shaw Prize Forum 2025 · CAS Future Leader
        </p>
        <div className="reveal hero-cta-row">
          <a href="#platform" className="btn-primary">
            See the Platform
          </a>
          <a href="#contact" className="btn-outline">
            Partner With Us
          </a>
        </div>
      </div>
    </section>
  )
}
