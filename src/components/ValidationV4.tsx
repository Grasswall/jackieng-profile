'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

interface Entry {
  year: string
  label: string
  href?: string
}

const tracks: { title: string; entries: Entry[] }[] = [
  {
    title: 'Elite scientific access',
    entries: [
      { year: '2025', label: 'Lindau Nobel Laureate Meeting' },
      { year: '2025', label: 'Shaw Prize Forum' },
      { year: '', label: 'CAS Future Leader' },
    ],
  },
  {
    title: 'Platform & funding',
    entries: [
      { year: '', label: 'HK$7.05M total funding secured' },
      { year: '', label: 'HKSTP Incu-Bio, HK$6M' },
      { year: '', label: '贏在蘇州 Rising Star Award' },
    ],
  },
  {
    title: 'Media & speaking',
    entries: [
      { year: '', label: 'RTHK 尋找創科的故事 — featured' },
      { year: '', label: 'Max Planck Institute RPG Forum — speaker' },
      { year: '', label: 'Shaw Laureates Roundtable — academic representative' },
    ],
  },
  {
    title: 'Technical foundation',
    entries: [
      { year: '2023–', label: 'PhD, PolyU — Drug Delivery & Structural Biology' },
      { year: '2024', label: 'J. Biological Chemistry — doi:10.1016/j.jbc.2024.107390' },
      {
        year: '2026',
        label: 'PDB 9X3T — Vibrio parahaemolyticus flagellar filament (cryo-EM)',
        href: 'https://www.rcsb.org/structure/9X3T',
      },
      {
        year: '2026',
        label: 'PDB 9X3V — Vibrio cholerae flagellar filament (cryo-EM)',
        href: 'https://www.rcsb.org/structure/9X3V',
      },
    ],
  },
]

export function ValidationV4() {
  const containerRef = useScrollReveal()

  return (
    <section
      id="validation"
      className="on-dark bg-deep py-20 text-cream md:py-32"
      aria-labelledby="validation-heading"
    >
      <div ref={containerRef} className="mx-auto max-w-6xl px-6 md:px-12">
        <div data-reveal>
          <h2
            id="validation-heading"
            className="font-heading text-5xl font-semibold leading-[1] tracking-tight md:text-7xl"
          >
            Validation
          </h2>
          <p className="mb-12 mt-4 max-w-[52ch] text-xl leading-[1.5] text-mist">
            The short list. Full record on request.
          </p>
        </div>

        {/* Hover or keyboard focus on a row brings it forward; every row stays fully readable. */}
        <div data-reveal className="dim-siblings border-t-2 border-cream">
          {tracks.map((track) => (
            <section
              key={track.title}
              tabIndex={0}
              aria-label={track.title}
              className="grid gap-x-12 gap-y-4 border-b-2 border-cream/40 py-8 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:py-10"
            >
              <h3 className="font-heading text-3xl font-semibold leading-tight md:text-4xl">{track.title}</h3>
              <ul className="space-y-4" role="list">
                {track.entries.map((entry, i) => (
                  <li key={i} className="grid gap-x-6 sm:grid-cols-[5.5rem_1fr]">
                    <span className="text-base text-mist">{entry.year || '\u00a0'}</span>
                    {entry.href ? (
                      <a
                        href={entry.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg leading-snug text-cream underline decoration-signal decoration-2 underline-offset-[5px] hover:text-signal"
                      >
                        {entry.label}
                      </a>
                    ) : (
                      <span className="text-lg leading-snug text-cream">{entry.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
