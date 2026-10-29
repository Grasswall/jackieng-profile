'use client'

import { Badge } from './ui/Badge'
import { SectionLabel } from './ui/SectionLabel'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const basePath = '/jackieng-profile'

export interface AtomBiosPillar {
  icon: string
  title: string
  description: string
}

export interface AtomBiosProps {
  heading: string
  tagline: string
  description: string
  pillars: AtomBiosPillar[]
  programBadges: string[]
  headshot?: string
}

export function AtomBios({ heading, tagline, description, pillars, programBadges, headshot }: AtomBiosProps) {
  const containerRef = useScrollReveal({ stagger: 0.12 })

  const headshotSrc = headshot
    ? headshot.startsWith('/')
      ? headshot
      : `${basePath}/assets/${headshot}`
    : `${basePath}/assets/headshot.jpg`

  return (
    <section aria-labelledby="atombios-heading" className="overflow-hidden">
      <div ref={containerRef} className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-20">
          <div>
            <SectionLabel label="AtomBios" className="mb-6" />

            <h2
              data-reveal
              id="atombios-heading"
              className="mb-5 font-heading text-4xl font-semibold leading-[1.05] text-balance md:text-6xl"
            >
              {heading}
            </h2>

            <p data-reveal className="mb-4 max-w-[56ch] text-lg leading-snug text-ink md:text-xl">{tagline}</p>

            {description && (
              <p data-reveal className="mb-8 max-w-[56ch] text-lg leading-relaxed text-stone">{description}</p>
            )}

            <ul className="dim-siblings mb-10 mt-8 border-t-2 border-ink" role="list">
              {pillars.map((pillar) => (
                <li
                  data-reveal
                  key={pillar.title}
                  tabIndex={0}
                  className="grid gap-x-8 gap-y-1 border-b-2 border-ink/25 py-5 sm:grid-cols-[13rem_1fr]"
                >
                  <p className="font-heading text-2xl font-semibold leading-tight">{pillar.title}</p>
                  <p className="text-lg leading-snug text-stone">{pillar.description}</p>
                </li>
              ))}
            </ul>

            <ul data-reveal className="flex flex-wrap gap-2" role="list" aria-label="Programs">
              {programBadges.map((b) => (
                <li key={b}>
                  <Badge variant="outline">{b}</Badge>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="mx-auto w-full max-w-sm lg:sticky lg:top-28 lg:max-w-none">
            <div className="relative aspect-[3/4] overflow-hidden bg-ink">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={headshotSrc} alt="Jackie Ng" className="h-full w-full object-cover object-top" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
