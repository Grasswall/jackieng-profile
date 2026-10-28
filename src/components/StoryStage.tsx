'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsapConfig'

// Four beats, one tagline per screen. Wording reuses copy already on the site.
const BEATS = [
  { line: 'I started with atoms.', sub: 'Cryo-EM structures, deposited in PDB and EMDB.', color: '#22D3EE' },
  { line: 'The brain keeps most particles out.', sub: 'Conventional LNPs are 80-100 nm. Too large to cross.', color: '#22D3EE' },
  { line: 'So I made them 20 nm.', sub: '4-5× smaller, built from structural insight into endosomal transcytosis.', color: '#22D3EE' },
  { line: '8× crossing. 3.2× in the brain.', sub: 'Versus conventional LNPs.', color: '#22D3EE' },
]

export function StoryStage() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const beats = q('[data-beat]')
      const ticks = q('[data-tick]')

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // No pinning: show all beats as a plain stacked list.
        gsap.set(q('[data-story-root]'), { height: 'auto' })
        gsap.set(q('[data-story-stage]'), { position: 'relative', height: 'auto', paddingTop: '6rem', paddingBottom: '6rem' })
        gsap.set(q('[data-beats]'), { height: 'auto' })
        gsap.set(beats, { position: 'relative', marginBottom: '4rem' })
        gsap.set(q('[data-ticks]'), { display: 'none' })
        return
      }

      gsap.set(beats.slice(1), { opacity: 0, y: 24 })
      gsap.set(ticks.slice(1), { opacity: 0.5 })

      const tl = gsap.timeline({
        defaults: { ease: 'power1.inOut' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      })
      for (let i = 1; i < beats.length; i++) {
        const t = i - 0.3
        tl.to(beats[i - 1], { opacity: 0, y: -24, duration: 0.3 }, t)
        tl.to(ticks[i - 1], { opacity: 0.5, duration: 0.3 }, t)
        tl.to(beats[i], { opacity: 1, y: 0, duration: 0.3 }, t + 0.1)
        tl.to(ticks[i], { opacity: 1, duration: 0.3 }, t + 0.1)
      }
      tl.to({}, { duration: 0.6 }, beats.length - 1) // hold the last beat
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      id="story"
      aria-labelledby="story-heading"
      data-story-root
      className="relative bg-[#0B0E14]"
      style={{ height: '380vh' }}
    >
      <div
        data-story-stage
        className="sticky top-0 flex h-screen flex-col justify-center px-6 md:px-12 pt-20"
      >
        <h2 id="story-heading" className="sr-only">How I got here</h2>
        <div className="mx-auto w-full max-w-5xl">
          <div data-beats className="relative min-h-[16rem] md:min-h-[18rem]">
            {BEATS.map((b, i) => (
              <div key={b.line} data-beat className="absolute inset-0 flex flex-col justify-center">
                <p className="font-mono text-xs tracking-widest" style={{ color: b.color }}>
                  0{i + 1}
                </p>
                <p className="mt-4 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-[#F8FAFC] text-balance">
                  {b.line}
                </p>
                <p className="mt-6 text-lg md:text-xl font-light leading-[1.6] text-[#94A3B8] max-w-[44ch]">
                  {b.sub}
                </p>
              </div>
            ))}
          </div>
          <div data-ticks className="mt-10 flex gap-2" aria-hidden="true">
            {BEATS.map((b) => (
              <span key={b.line} data-tick className="h-px w-10 md:w-14 bg-[#22D3EE]" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
