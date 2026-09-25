'use client'

import { useEffect, useRef, useState } from 'react'

export interface StatItem {
  value: number
  suffix?: string
  label: string
}

interface SocialProofProps {
  stats: StatItem[]
}

function useCountUp(target: number, duration = 1500, active = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    if (target === 0) return

    const start = performance.now()
    let raf: number

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, active])

  return count
}

function StatCounter({ stat, active }: { stat: StatItem; active: boolean }) {
  const count = useCountUp(stat.value, 1400, active)
  return (
    <div className="flex flex-col items-center text-center">
      <span className="font-heading text-4xl md:text-5xl font-semibold text-gold leading-none">
        {count}
        {stat.suffix ?? ''}
      </span>
      <span className="mt-2 text-xs tracking-widest uppercase text-offwhite/50 font-medium max-w-[120px]">
        {stat.label}
      </span>
    </div>
  )
}

export function SocialProof({ stats }: SocialProofProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="bg-charcoal border-y border-white/10 py-12 md:py-16"
      aria-label="Key stats"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-wrap items-stretch justify-center gap-0 divide-x divide-white/10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex-1 min-w-[120px] max-w-[200px] px-6 md:px-10 py-4"
            >
              <StatCounter stat={stat} active={active} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
