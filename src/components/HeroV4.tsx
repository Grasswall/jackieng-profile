'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsapConfig'
import { Badge } from './ui/Badge'

const heroBadges = [
  'BBB-Targeted Delivery',
  '20nm Platform',
  '8× Transcytosis',
  'HK$7.05M Funded',
]

const eliteBadges = [
  'Lindau Nobel 2025',
  'Shaw Prize Forum 2025',
  'CAS Future Leader',
]

export function HeroV4() {
  const containerRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const badgesRef = useRef<HTMLDivElement>(null)
  const eliteRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (mediaQuery.matches) return

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      gsap.set(
        [headingRef.current, subtitleRef.current],
        { opacity: 0, y: 40 }
      )
      if (badgesRef.current) {
        const badges = badgesRef.current.querySelectorAll('[role="listitem"]')
        gsap.set(badges, { opacity: 0, y: 20 })
      }
      gsap.set(eliteRef.current, { opacity: 0, y: 20 })

      tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.7 })
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .to(
          badgesRef.current
            ? badgesRef.current.querySelectorAll('[role="listitem"]')
            : [],
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          '-=0.3'
        )
        .to(eliteRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0B0E14] pt-20"
      aria-label="Hero"
    >
      {/* Radial gradient background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(34, 211, 238, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(247, 115, 22, 0.06) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-24">
        <div className="max-w-3xl">
          <h1
            ref={headingRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight mb-6 bg-gradient-to-br from-[#F8FAFC] to-[#94A3B8] bg-clip-text text-transparent"
          >
            Brain delivery scientist
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-[#94A3B8] font-light leading-[1.5] mb-10 max-w-[42ch]"
          >
            Engineering 20nm nanoparticles that cross the blood-brain barrier. 8× transcytosis, 3.2-fold brain accumulation. Researching AI-guided formulation design via protein corona engineering.
          </p>

          {/* Platform badges */}
          <div
            ref={badgesRef}
            className="flex flex-wrap gap-4 mb-8"
            role="list"
            aria-label="Platform metrics"
          >
            {heroBadges.map((badge) => (
              <div key={badge} role="listitem">
                <Badge variant="outline">{badge}</Badge>
              </div>
            ))}
          </div>

          {/* Elite badges */}
          <div
            ref={eliteRef}
            className="text-[15px] font-medium text-[#22D3EE] tracking-wide pt-8 border-t border-[#334155]"
          >
            {eliteBadges.join(' · ')}
          </div>
        </div>
      </div>
    </section>
  )
}
