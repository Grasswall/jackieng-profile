'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

export interface EducationItem {
  degree: string
  field: string
  institution: string
  years: string
  highlights: string[]
  tags: string[]
  location?: string
}

interface EducationProps {
  items: EducationItem[]
}

export function Education({ items }: EducationProps) {
  const containerRef = useScrollReveal({ stagger: 0.15 })

  return (
    <section aria-labelledby="education-heading" className="on-dark bg-deep py-16 text-cream md:py-24">
      <div ref={containerRef} className="mx-auto max-w-6xl px-6 md:px-12">
        <h2
          data-reveal
          id="education-heading"
          className="mb-10 max-w-[18ch] font-heading text-4xl font-semibold leading-tight text-balance md:mb-14 md:text-6xl"
        >
          Built on rigorous foundations.
        </h2>

        <div className="dim-siblings border-t-2 border-cream">
          {items.map((item) => (
            <article
              key={item.degree + item.institution}
              data-reveal
              tabIndex={0}
              className="grid gap-x-12 gap-y-4 border-b-2 border-cream/40 py-8 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:py-10"
            >
              <div>
                <p className="text-base text-mist">
                  {item.years}
                  {item.location ? ` · ${item.location}` : ''}
                </p>
                <h3 className="mt-1 font-heading text-4xl font-semibold leading-tight md:text-5xl">{item.degree}</h3>
                <p className="mt-1 text-lg text-cream">{item.field}</p>
                <p className="mt-1 text-base text-mist">{item.institution}</p>
              </div>
              <div>
                <ul className="space-y-3" role="list">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 text-lg leading-snug">
                      <span className="text-signal" aria-hidden="true">—</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-2" role="list" aria-label="Tags">
                  {item.tags.map((tag) => (
                    <li key={tag} className="bg-deep2 px-3 py-1 text-sm text-cream">{tag}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
