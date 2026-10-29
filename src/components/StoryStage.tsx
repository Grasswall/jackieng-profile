'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsapConfig'

// Four beats, one tagline per screen. Wording reuses copy already on the site.
const BEATS = [
  { line: 'I solve structures at atomic resolution.', sub: 'Cryo-EM, down to 2.7 Å. Then I ask what a particle needs to do.' },
  { line: 'The brain keeps most particles out.', sub: 'Conventional LNPs are 80-100 nm. Too large to cross.' },
  { line: 'So I made them 20 nm.', sub: '4-5× smaller. Structure-guided, ML-assisted, built around endosomal transcytosis.' },
  { line: '8× crossing. 3.2× in the brain.', sub: 'Versus conventional LNPs.' },
]

export function StoryStage() {
  const root = useRef<HTMLElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const [active, setActive] = useState(0)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const beats = q('[data-beat]')
      const ticks = q('[data-tick]')

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // No pinning: show all beats as a plain stacked list.
        gsap.set(q('[data-story-root]'), { height: 'auto' })
        gsap.set(q('[data-story-stage]'), { position: 'relative', height: 'auto', paddingTop: '6rem', paddingBottom: '6rem' })
        gsap.set(q('[data-beats]'), { height: 'auto', minHeight: 0 })
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
          onUpdate: () => setActive(Math.min(beats.length - 1, Math.round(tl.time()))),
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
      tlRef.current = tl
    },
    { scope: root }
  )

  // Touch and keyboard fallback: jump straight to a beat.
  const jump = (i: number) => {
    const tl = tlRef.current
    const st = tl?.scrollTrigger
    if (!tl || !st) return
    const y = st.start + (st.end - st.start) * (i / tl.duration())
    window.scrollTo({ top: y, behavior: 'auto' })
  }

  return (
    <section
      ref={root}
      id="story"
      aria-labelledby="story-heading"
      data-story-root
      className="on-dark relative bg-deep text-cream"
      style={{ height: '380vh' }}
    >
      <div data-story-stage className="sticky top-0 flex h-screen flex-col justify-center px-6 pt-20 md:px-12">
        <h2 id="story-heading" className="sr-only">How I got here</h2>
        <div className="mx-auto w-full max-w-6xl">
          <div data-beats className="relative min-h-[23rem] md:min-h-[26rem]">
            {BEATS.map((b, i) => (
              <div key={b.line} data-beat className="absolute inset-0 flex flex-col justify-center">
                <p className="font-heading text-xl text-signal">{i + 1} / {BEATS.length}</p>
                <p className="mt-3 font-heading text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-cream text-balance sm:text-6xl lg:text-[5.5rem]">
                  {b.line}
                </p>
                <p className="mt-6 max-w-[44ch] text-lg leading-[1.55] text-mist md:text-xl">{b.sub}</p>
              </div>
            ))}
          </div>
          <div data-ticks className="mt-8 flex gap-1">
            {BEATS.map((b, i) => (
              <button
                key={b.line}
                type="button"
                data-tick
                onClick={() => jump(i)}
                aria-label={`Go to part ${i + 1} of ${BEATS.length}`}
                aria-current={active === i ? 'step' : undefined}
                className="group flex h-11 w-14 items-center md:w-16"
              >
                <span className="block h-1 w-full bg-signal transition-transform group-hover:scale-y-[2.5]" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
