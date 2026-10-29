'use client'

import { useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

// The moat: four skills in one person. Every line is a fact already stated
// elsewhere on this site (hero, Flow, Validation); nothing here is computed.
const SKILLS = [
  {
    id: 'bench',
    name: 'Wet lab',
    line: 'I run the bench work behind the 8× transcytosis result.',
    evidence: '8× BBB transcytosis and 3.2-fold brain accumulation vs. conventional LNPs, measured in vivo.',
  },
  {
    id: 'structure',
    name: 'Structural biology',
    line: 'I solved five cryo-EM structures myself, best at 2.7 Å.',
    evidence: 'PDB 9X3T and 9X3V (2026), flagellar filaments by cryo-EM. J. Biological Chemistry, 2024.',
  },
  {
    id: 'ml',
    name: 'Machine learning',
    line: 'I explore machine learning for formulation design.',
    evidence: 'In the pipeline above, a small network trained on synthetic formulations. It is a simulation and is labelled as one.',
  },
  {
    id: 'founder',
    name: 'Founder',
    line: 'I took the result into AtomBios, funded with HK$7.05M.',
    evidence: 'HKSTP Incu-Bio, HK$6M. Rising Star Award, WIN in Suzhou.',
  },
] as const

export function Combination() {
  const ref = useScrollReveal({ stagger: 0.1 })
  const [picked, setPicked] = useState<string[]>(['structure'])

  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? (p.length > 1 ? p.filter((x) => x !== id) : p) : [...p, id]))
  const all = picked.length === SKILLS.length
  const chosen = SKILLS.filter((s) => picked.includes(s.id))

  return (
    <section id="combination" aria-labelledby="combo-heading" className="bg-cream py-20 text-ink md:py-32">
      <div ref={ref} className="mx-auto max-w-6xl px-6 md:px-12">
        <p data-reveal className="mb-4 text-base text-stone">What I bring to a team</p>
        <h2 data-reveal id="combo-heading" className="max-w-[16ch] font-heading text-5xl font-semibold leading-[1] tracking-tight text-balance md:text-7xl">
          Structure meets delivery.
        </h2>
        <p data-reveal className="mt-6 max-w-[52ch] text-lg leading-[1.6] text-stone md:text-xl">
          Structural biology is my foundation. Drug delivery is where I apply it. Computation extends the experimental work; building AtomBios adds experience turning research into a company.
        </p>

        <div data-reveal className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <div>
            <p id="combo-hint" className="mb-3 text-base text-stone">Pick the skills to combine.</p>
            <ul className="flex flex-col gap-2" role="list" aria-describedby="combo-hint">
              {SKILLS.map((s) => {
                const on = picked.includes(s.id)
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(s.id)}
                      className={[
                        'group flex min-h-16 w-full items-center justify-between gap-4 border-b-2 border-ink px-1 py-3 text-left transition-colors active:scale-[0.99]',
                        on ? 'bg-ink text-cream px-4' : 'hover:bg-ink/10',
                      ].join(' ')}
                    >
                      <span className="font-heading text-3xl font-semibold leading-none md:text-4xl">{s.name}</span>
                      <span
                        aria-hidden="true"
                        className={[
                          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-lg leading-none',
                          on ? 'border-signal bg-signal text-ink' : 'border-ink',
                        ].join(' ')}
                      >
                        {on ? '✓' : '+'}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
            <button
              type="button"
              onClick={() => setPicked(all ? ['structure'] : SKILLS.map((s) => s.id))}
              className="mt-5 inline-flex min-h-11 items-center text-base font-medium underline decoration-2 underline-offset-[6px] hover:decoration-clay"
            >
              {all ? 'Start over' : 'Combine all four'}
            </button>
          </div>

          <div aria-live="polite" className="bg-deep p-7 text-cream md:p-10 on-dark">
            <p className="text-base text-mist">
              {all ? 'All four, together' : `${chosen.length} of 4 selected`}
            </p>
            <ul key={picked.join('-')} className="swap-in mt-5 space-y-6" role="list">
              {chosen.map((s) => (
                <li key={s.id}>
                  <p className="font-heading text-2xl font-semibold md:text-3xl">{s.line}</p>
                  <p className="mt-2 text-base leading-snug text-mist">{s.evidence}</p>
                </li>
              ))}
            </ul>
            <p
              className={[
                'mt-8 border-t-2 pt-5 font-heading text-3xl font-semibold leading-tight md:text-4xl',
                all ? 'border-signal text-signal' : 'border-mist/40 text-mist',
              ].join(' ')}
            >
              {all ? 'Structure, delivery, computation and execution.' : 'Explore the evidence across the profile.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
