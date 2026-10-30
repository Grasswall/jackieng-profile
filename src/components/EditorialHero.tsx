'use client'

import { useRef } from 'react'
import { Magnetic } from '@/components/Magnetic'

// Identity: structural biologist turned founder, using ML to discover the 20 nm BBB-crossing LNP.
// Every figure below is verified (data/meta.json, cv/source.yaml).
const proof = [
  { v: '5', k: 'cryo-EM structures solved · 2.7 Å best' },
  { v: '20 nm', k: 'delivery platform built at AtomBios' },
  { v: '8×', k: 'BBB transcytosis measured in vivo' },
  { v: 'HK$7.05M', k: 'funding raised for AtomBios' },
]

export function EditorialHero() {
  const driftRef = useRef<HTMLDivElement>(null)

  // Mouse only: the photo drifts a few pixels against the cursor.
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = driftRef.current
    if (!el || e.pointerType !== 'mouse') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `translate(${(-x * 18).toFixed(1)}px, ${(-y * 12).toFixed(1)}px)`
  }
  const onLeave = () => {
    if (driftRef.current) driftRef.current.style.transform = ''
  }

  return (
    <section
      aria-label="Hero"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="on-dark relative flex flex-col bg-deep text-cream pt-16 md:min-h-[100svh]"
    >
      {/* Photo: full bleed on desktop, stacked above the text on phones */}
      <figure className="hero-photo-quiet relative m-0 h-[56svh] min-h-[22rem] overflow-hidden bg-stage md:absolute md:inset-0 md:top-16 md:h-auto">
        <div
          ref={driftRef}
          className="absolute -inset-3 transition-transform duration-300 ease-out will-change-transform"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/jackieng-profile/images/gallery/suzhou-pitch.jpg"
            alt="Jackie Ng pitching AtomBios at the WIN in Suzhou Global Entrepreneurship Competition finals"
            className="ed-reveal h-full w-full object-cover object-[58%_50%] md:origin-[0%_40%] md:scale-[1.18] md:object-center"
          />
        </div>
        <figcaption className="absolute bottom-0 right-0 bg-deep px-4 py-2 text-sm text-cream">
          Pitching AtomBios, WIN in Suzhou Global Finals, 2026
        </figcaption>
      </figure>

      {/* Solid text plate. Photo legibility never depends on what is behind the words. */}
      <div className="relative z-10 bg-deep px-6 py-9 md:mt-auto md:w-[min(46rem,48%)] md:px-12 md:py-12 lg:px-14">
        <p className="mb-4 text-base text-mist">Founder-scientist · AtomBios · structural biology + drug delivery</p>

        <h1 className="mb-5 font-heading text-[clamp(2.25rem,4.6vw,4.6rem)] font-semibold leading-[1] tracking-tight text-balance md:mb-6">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="ed-rise block" style={{ animationDelay: '0.1s' }}>
              Structural biology.
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="ed-rise block" style={{ animationDelay: '0.25s' }}>
              Drug delivery.
            </span>
          </span>
        </h1>

        <p className="mb-7 max-w-[44ch] text-lg leading-snug text-cream md:text-xl">
          I solve molecular structures and build delivery systems. Founder of AtomBios, bringing experimental science, computational tools and company-building experience to the same problem.
        </p>

        <dl className="mb-8 grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-4">
          {proof.map((p) => (
            <div key={p.k}>
              <dt className="font-heading text-3xl font-semibold leading-none text-signal md:text-4xl">{p.v}</dt>
              <dd className="mt-2 text-sm leading-snug text-mist">{p.k}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <Magnetic>
            <a
              href="#contact"
              className="group inline-flex min-h-12 items-center gap-3 bg-cream px-6 text-base font-medium text-ink transition-colors hover:bg-signal active:scale-95"
            >
              Hire or collaborate
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current transition-transform group-hover:translate-x-1" strokeWidth="1.75" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </Magnetic>
          <a
            href="#evidence"
            className="inline-flex min-h-11 items-center text-base text-cream underline decoration-signal decoration-2 underline-offset-[6px] transition-colors hover:text-signal"
          >
            View the evidence
          </a>
        </div>
      </div>
    </section>
  )
}
