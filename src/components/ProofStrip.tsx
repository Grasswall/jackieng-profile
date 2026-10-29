'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

// Every figure here is verified (data/meta.json, cv/source.yaml).
const proof = [
  { value: 'JBC 2024', label: 'peer-reviewed, J. Biological Chemistry' },
  { value: 'Lindau 2025', label: 'Nobel Laureate Meeting' },
  { value: 'Shaw 2025', label: 'Laureates Roundtable, Academic Representative' },
  { value: 'CAS', label: 'Future Leader' },
  { value: 'Cryo-EM Forum', label: 'speaker, Greater Bay Area 2025' },
]

export function ProofStrip() {
  const containerRef = useScrollReveal()

  return (
    <section aria-label="Key results" className="bg-cream py-14 text-ink md:py-20">
      <div ref={containerRef} className="mx-auto max-w-6xl px-6 md:px-12">
        <ul className="dim-siblings grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-8">
          {proof.map((p) => (
            <li key={p.value} data-reveal className="border-l-4 border-ink pl-4 outline-offset-4" tabIndex={0}>
              <p className="font-heading text-3xl font-semibold leading-none tracking-tight md:text-[2rem]">{p.value}</p>
              <p className="mt-2 text-base leading-snug text-stone">{p.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
