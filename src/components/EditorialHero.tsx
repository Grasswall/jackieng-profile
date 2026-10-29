'use client'

import { useRef } from 'react'

const facts = [
  { k: 'Transcytosis', v: '8×' },
  { k: 'Brain accumulation', v: '3.2-fold' },
  { k: 'Funding', v: 'HK$7.05M' },
  { k: 'Access', v: 'Lindau Nobel 2025 · Shaw Prize Forum 2025' },
]

export function EditorialHero() {
  const spotRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = spotRef.current
    if (!el) return
    const r = e.currentTarget.getBoundingClientRect()
    el.style.transform = `translate(${e.clientX - r.left - 260}px, ${e.clientY - r.top - 260}px)`
    el.style.opacity = '1'
  }
  const onLeave = () => {
    if (spotRef.current) spotRef.current.style.opacity = '0'
  }

  return (
    <section
      aria-label="Hero"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative overflow-hidden bg-[#F4F1EA] text-[#1C1A16] pt-24 md:pt-32 pb-12 md:pb-20"
    >
      <div
        ref={spotRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-[520px] w-[520px] rounded-full opacity-0 transition-opacity duration-300 hidden lg:block"
        style={{ background: 'radial-gradient(circle, rgba(138,59,43,0.10) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
        <div>
          <p className="font-body text-[11px] uppercase tracking-[0.14em] text-[#8A3B2B] mb-6">
            — Jackie Ng · Founder, AtomBios
          </p>

          <h1 className="font-heading font-medium text-[clamp(2.8rem,6.4vw,5.6rem)] leading-[1.0] tracking-tight mb-8">
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="block ed-rise" style={{ animationDelay: '0.1s' }}>
                Structural ML
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="block ed-rise" style={{ animationDelay: '0.25s' }}>
                scientist.
              </span>
            </span>
          </h1>

          <p className="font-body text-lg md:text-xl leading-relaxed text-[#413D34] max-w-[40ch] mb-8">
            Let&apos;s program delivery. 20nm nanoparticles cross the blood-brain barrier.
          </p>

          <dl className="font-body max-w-md mb-10">
            {facts.map((f) => (
              <div
                key={f.k}
                className="flex flex-wrap sm:flex-nowrap justify-between gap-x-6 gap-y-0.5 border-b border-[#D8D2C4] py-2.5 text-sm transition-[padding] duration-300 hover:pl-2"
              >
                <dt className="text-[#7A7468] shrink-0">{f.k}</dt>
                <dd className="font-semibold text-right sm:whitespace-nowrap">{f.v}</dd>
              </div>
            ))}
          </dl>

          <a
            href="mailto:jackie.ng@atombios.com?subject=Let%27s%20build%20delivery%20together"
            className="group inline-flex items-center gap-3 font-body text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A3B2B] rounded-full"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1C1A16] transition-all duration-300 group-hover:bg-[#1C1A16] group-hover:rotate-45 group-active:scale-90">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-[#1C1A16] group-hover:stroke-[#F4F1EA] transition-colors" strokeWidth="1.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
            Build with me
          </a>
        </div>

        <figure className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="ed-reveal overflow-hidden rounded-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/jackieng-profile/images/gallery/suzhou-pitch.jpg"
              alt="Jackie Ng pitching AtomBios at the WIN in Suzhou Global Entrepreneurship Competition finals"
              className="w-full aspect-[4/5] object-cover object-[50%_20%]"
            />
          </div>
          <figcaption className="mt-3 font-body text-[11px] text-[#7A7468]">
            Pitching AtomBios, WIN in Suzhou Global Finals, 2026
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
