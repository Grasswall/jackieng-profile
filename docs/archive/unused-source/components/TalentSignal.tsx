'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { meta } from '@/lib/data'

// Identity + verified proof, in reading order: who (three roles), what backs
// each role, then outside recognition. Every line maps to a source:
//  - 5 cryo-EM structures, best 2.7 Å: Jackie confirmed, publication still in progress (cv/source.yaml)
//  - JBC 2024: doi:10.1016/j.jbc.2024.107390 (co-author, checked on Crossref)
//  - ML ownership: Jackie confirmed he trains the ML; model details are not public
//  - HK$7.05M: AtomBios company funding (HK$6M of it HKSTP Incu-Bio), not personal
//  - Lindau 2025 / Shaw Prize Forum 2025: participation only, no prize
const ROLES = [
  {
    role: 'Structural biologist',
    headline: '5 cryo-EM structures solved',
    detail: 'Best resolution 2.7 Å. Ongoing research; publication in progress.',
    extra: { text: 'Peer-reviewed: co-author, Journal of Biological Chemistry 2024', href: 'https://doi.org/10.1016/j.jbc.2024.107390', },
  },
  {
    role: 'Hands-on ML',
    headline: 'I train the ML for LNP design',
    detail: 'Hands-on model training for lipid nanoparticle design at AtomBios. Explore a separate synthetic-data demonstration below.',
  },
  {
    role: 'Founder',
    headline: 'AtomBios',
    detail: '20 nm particles: 8× BBB transcytosis and 3.2× brain accumulation versus conventional LNPs. HK$7.05M raised for AtomBios.',
  },
] as const

const RECOGNITION = [
  { name: 'Lindau Nobel Laureate Meeting', year: '2025', note: 'Selected participant' },
  { name: 'Shaw Prize Forum', year: '2025', note: 'Academic Representative · Laureates Roundtable' },
  { name: 'Techathon+ 10th Anniversary', year: '2026', note: 'Gold Medal' },
  { name: 'PKU–Cambridge Global Innovation & Entrepreneurship Competition', year: '2026', note: 'Hong Kong Station · Champion' },
] as const

const mail = (subject: string) => `mailto:${meta.email}?subject=${encodeURIComponent(subject)}`

export function TalentSignal() {
  const ref = useScrollReveal({ stagger: 0.1 })
  return (
    <section ref={ref} id="proof" aria-labelledby="proof-heading" className="scroll-mt-16 bg-cream px-6 py-16 text-ink md:px-12 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p data-reveal className="text-xs font-semibold uppercase tracking-[0.16em] text-stone">Who I am, and what backs it</p>
        <h2 data-reveal id="proof-heading" className="mt-3 font-heading text-4xl font-medium leading-[1] tracking-tight md:text-6xl">
          Structural biologist. Hands-on ML. Founder.
        </h2>

        <ol className="mt-10 grid gap-px overflow-hidden border border-ink/20 bg-ink/20 md:grid-cols-3">
          {ROLES.map((r, i) => (
            <li key={r.role} data-reveal className="flex flex-col bg-cream p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone">
                <span aria-hidden="true">{i + 1} · </span>
                {r.role}
              </p>
              <p className="mt-4 font-heading text-3xl font-semibold leading-[1.05] md:text-4xl">{r.headline}</p>
              <p className="mt-3 text-base leading-relaxed text-stone">{r.detail}</p>
              {'extra' in r && (
                <p className="mt-4 border-t border-ink/15 pt-4 text-base leading-relaxed">
                  {r.extra.text}{' '}
                  <a href={r.extra.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline decoration-2 underline-offset-4 hover:text-clay">
                    DOI ↗
                  </a>
                </p>
              )}
            </li>
          ))}
        </ol>

        <div data-reveal className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] md:items-start">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone">Recognition</p>
          <ul className="grid gap-6 md:grid-cols-2">
            {RECOGNITION.map((x) => (
              <li key={x.name} className="border-l-2 border-ink pl-4">
                <p className="text-lg font-semibold leading-snug">
                  {x.name}, {x.year}
                </p>
                <p className="mt-1 text-base leading-relaxed text-stone">{x.note}</p>
              </li>
            ))}
          </ul>
        </div>

        <p data-reveal className="mt-10 text-base text-stone">
          Hiring, research or collaboration?{' '}
          <a href="#contact" className="inline-flex min-h-11 items-center font-medium text-ink underline decoration-2 underline-offset-4 hover:text-clay">
            Get in touch ↓
          </a>
        </p>
      </div>
    </section>
  )
}

export function ContactCta() {
  const ref = useScrollReveal({ stagger: 0.1 })
  return (
    <section ref={ref} id="contact" aria-labelledby="contact-heading" className="on-dark scroll-mt-16 bg-deep px-6 py-16 text-cream md:px-12 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p data-reveal className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Contact</p>
        <h2 data-reveal id="contact-heading" className="mt-3 font-heading text-4xl font-medium leading-[1] tracking-tight md:text-6xl">
          Hiring, research or collaboration.
        </h2>
        <p data-reveal className="mt-5 max-w-2xl text-base leading-relaxed text-cream/80 md:text-lg">
          Tell me the problem and the team.
        </p>
        <div data-reveal className="mt-8 flex flex-wrap gap-3">
          <a href={mail('Role discussion')} className="inline-flex min-h-12 items-center bg-signal px-6 text-base font-semibold text-deep transition-colors hover:bg-cream">
            Hiring: discuss a role
          </a>
          <a href={mail('Research collaboration')} className="inline-flex min-h-12 items-center border border-cream/50 px-6 text-base font-medium text-cream transition-colors hover:border-signal hover:text-signal">
            Research collaboration
          </a>
          <a href={mail('CV request')} className="inline-flex min-h-12 items-center border border-cream/50 px-6 text-base font-medium text-cream transition-colors hover:border-signal hover:text-signal">
            Request my CV
          </a>
        </div>
        <p data-reveal className="mt-6 text-base text-cream/80">
          <a href={`mailto:${meta.email}`} className="inline-flex min-h-11 items-center underline decoration-signal decoration-2 underline-offset-[6px] hover:text-signal">
            {meta.email}
          </a>
        </p>
      </div>
    </section>
  )
}
