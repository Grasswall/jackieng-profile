'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsapConfig'
import { Badge } from './ui/Badge'
import { MoleculeBackdrop } from './interactive/MoleculeBackdrop'

const heroBadges = [
  'BBB-Targeted Delivery',
  '20nm Platform',
  '8× Transcytosis',
  'HK$7.05M Funded',
]

const eliteBadges = [
  'Lindau Nobel 2025',
  'Shaw Prize Forum 2025',
  'CAS Future Leader',
]

export function HeroV4() {
  const containerRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const badgesRef = useRef<HTMLDivElement>(null)
  const eliteRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (mediaQuery.matches) return

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      gsap.set(
        [headingRef.current, subtitleRef.current],
        { opacity: 0, y: 40 }
      )
      if (badgesRef.current) {
        const badges = badgesRef.current.querySelectorAll('[role="listitem"]')
        gsap.set(badges, { opacity: 0, y: 20 })
      }
      gsap.set(eliteRef.current, { opacity: 0, y: 20 })

      tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.7 })
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .to(
          badgesRef.current
            ? badgesRef.current.querySelectorAll('[role="listitem"]')
            : [],
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          '-=0.3'
        )
        .to(eliteRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0B0E14] pt-20"
      aria-label="Hero"
    >
      {/* Radial gradient background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(34, 211, 238, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(247, 115, 22, 0.06) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Real ApoE3 backbone (PDB 1LPE) rendered from published coordinates */}
      <MoleculeBackdrop className="hidden lg:block absolute right-[2%] top-1/2 -translate-y-1/2 z-0 w-[48vw] max-w-[640px] h-[48vw] max-h-[640px] opacity-35 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-24 grid lg:grid-cols-[1fr_340px] gap-12 items-center">
        <div className="max-w-3xl">
          <h1
            ref={headingRef}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase leading-[1.05] tracking-tight mb-4 text-[#F8FAFC]"
          >
            <span className="block text-xl md:text-2xl font-light normal-case tracking-normal text-[#94A3B8] mb-2">
              Jackie Ng, founder of AtomBios
            </span>
            <span className="text-[#F97316]">Structural ML</span> scientist
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-[#94A3B8] font-light leading-[1.5] mb-8 max-w-[42ch]"
          >
            Structural biologist building ML for drug delivery. 20nm nanoparticles that cross the blood-brain barrier: 8× transcytosis, 3.2-fold brain accumulation. Next: corona-programmable delivery.
          </p>

          <a
            href="mailto:jackie.ng@atombios.com"
            className="inline-block mb-8 px-6 py-3 rounded-full bg-[#F97316] text-[#0B0E14] font-semibold hover:bg-[#FB923C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
          >
            Get in touch
          </a>

          {/* Platform badges */}
          <div
            ref={badgesRef}
            className="flex flex-wrap gap-4 mb-8"
            role="list"
            aria-label="Platform metrics"
          >
            {heroBadges.map((badge) => (
              <div key={badge} role="listitem">
                <Badge variant="outline">{badge}</Badge>
              </div>
            ))}
          </div>

          {/* Elite badges */}
          <div
            ref={eliteRef}
            className="text-[15px] font-medium text-[#22D3EE] tracking-wide pt-8 border-t border-[#334155]"
          >
            {eliteBadges.join(' · ')}
          </div>
        </div>

        {/* Hero shot: pitching AtomBios at WIN in Suzhou Global Finals, not a studio headshot */}
        <div className="relative mx-auto lg:mx-0 w-full max-w-sm lg:max-w-none">
          <div
            className="absolute -inset-6 rounded-full opacity-70 blur-3xl"
            style={{
              background:
                'radial-gradient(circle at 50% 60%, rgba(249,115,22,0.35), rgba(34,211,238,0.15) 60%, transparent 75%)',
            }}
            aria-hidden="true"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/jackieng-profile/images/gallery/suzhou-pitch.jpg"
            alt="Jackie Ng pitching AtomBios at the WIN in Suzhou Global Entrepreneurship Competition finals"
            className="relative w-full aspect-[4/5] object-cover object-[50%_20%] rounded-2xl"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, #000 55%, transparent 95%)',
              maskImage: 'linear-gradient(to bottom, #000 55%, transparent 95%)',
            }}
          />
          <p className="mt-3 text-[11px] text-[#64748B] text-center lg:text-left">
            Pitching AtomBios, WIN in Suzhou Global Finals, 2026
          </p>
        </div>
      </div>

      <p className="absolute bottom-4 right-6 md:right-12 z-10 text-[11px] text-[#64748B] max-w-[48ch] text-right">
        Background: human apolipoprotein E3 N-terminal domain, C-alpha trace.{' '}
        <a
          href="https://www.rcsb.org/structure/1LPE"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[#94A3B8]"
        >
          PDB 1LPE
        </a>
        , Wilson et al., Science 1991. Published structure, not from my own work.
      </p>
    </section>
  )
}
