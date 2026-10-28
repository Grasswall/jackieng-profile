'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

interface Stat {
  value: number
  decimals: number
  prefix?: string
  suffix: string
  label: string
}

// Only figures verified by Jackie (see BRAND_STATUS.md and data/meta.json).
const stats: Stat[] = [
  { value: 8, decimals: 0, suffix: '×', label: 'BBB transcytosis vs. conventional LNPs' },
  { value: 3.2, decimals: 1, suffix: '-fold', label: 'Brain accumulation vs. conventional LNPs' },
  { value: 20, decimals: 0, suffix: ' nm', label: 'Nanoliposome platform size' },
  { value: 7.05, decimals: 2, prefix: 'HK$', suffix: 'M', label: 'Funding secured' },
]

function CountUp({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  // Start at the final value so the static HTML and no-JS view are correct.
  const [display, setDisplay] = useState(stat.value)

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const controls = animate(0, stat.value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [inView, stat.value])

  return (
    <span ref={ref}>
      {stat.prefix}
      {display.toFixed(stat.decimals)}
      {stat.suffix}
    </span>
  )
}

export function StatsStrip() {
  return (
    <section
      className="bg-[#0B0E14] border-y border-[#1E293B]"
      aria-label="Key figures"
    >
      <dl className="max-w-6xl mx-auto px-6 md:px-12 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label}>
            <dd className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-[#22D3EE] to-[#F97316] bg-clip-text text-transparent">
              <CountUp stat={s} />
            </dd>
            <dt className="mt-2 text-sm text-[#94A3B8]">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  )
}
