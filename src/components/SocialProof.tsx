'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsapConfig'

import { useScrollReveal } from '@/hooks/useScrollReveal'

export interface StatItem {
  value: number
  suffix?: string
  label: string
}

interface SocialProofProps {
  stats: StatItem[]
}

export function SocialProof({ stats }: SocialProofProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const revealRef = useScrollReveal({ stagger: 0.1 })

  useGSAP(() => {
    if (!containerRef.current) return
    const counters = containerRef.current.querySelectorAll('[data-count]')

    counters.forEach((el) => {
      const target = parseInt(el.getAttribute('data-count') || '0', 10)
      const obj = { value: 0 }

      gsap.to(obj, {
        value: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
        onUpdate: () => {
          el.textContent = Math.round(obj.value).toString()
        },
      })
    })
  }, { scope: containerRef })

  return (
    <section
      aria-label="Key stats"
      className="bg-charcoal border-y border-white/10 py-12 md:py-16"
    >
      <div ref={revealRef} className="max-w-6xl mx-auto px-6 md:px-12">
        <div
          ref={containerRef}
          className="flex flex-wrap items-stretch justify-center gap-0 divide-x divide-white/10"
        >
          {stats.map((stat, i) => (
            <div
              data-reveal
              key={i}
              className="flex-1 min-w-[120px] max-w-[200px] px-6 md:px-10 py-4"
            >
              <div className="flex flex-col items-center text-center">
                <span className="font-heading text-4xl md:text-5xl font-semibold text-gold leading-none">
                  <span data-count={stat.value}>0</span>
                  {stat.suffix && <span>{stat.suffix}</span>}
                </span>
                <span className="mt-2 text-xs tracking-widest uppercase text-offwhite/50 font-medium max-w-[120px]">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
