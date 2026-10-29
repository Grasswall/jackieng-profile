'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

// Every figure here is verified (data/meta.json, cv/source.yaml).
const proof = [
  { value: '3.2×', label: 'brain accumulation vs. conventional LNPs' },
  { value: 'JBC 2024', label: 'peer-reviewed publication' },
  { value: 'Lindau 2025', label: 'Nobel Laureate Meeting' },
  { value: 'Shaw 2025', label: 'Laureates Roundtable, Academic Representative' },
  { value: 'Cryo-EM Forum', label: 'speaker, Greater Bay Area 2025' },
]

export function ProofStrip() {
  const containerRef = useScrollReveal()

  return (
    <section
      aria-label="Key results"
      className="bg-[#0B0E14] border-y border-[#1E293B] py-10 md:py-12"
    >
      <div
        ref={containerRef}
        className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-6"
      >
        {proof.map((p) => (
          <div key={p.value} data-reveal>
            <div className="text-2xl md:text-3xl font-bold tracking-tight text-[#F8FAFC]">
              {p.value}
            </div>
            <div className="mt-1 text-xs md:text-sm text-[#94A3B8] leading-snug">
              {p.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
