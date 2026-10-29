'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Magnetic } from '@/components/Magnetic'

interface ContactProps {
  email: string
}

export function ContactV4({ email }: ContactProps) {
  const containerRef = useScrollReveal({ stagger: 0.1 })

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-cream py-20 text-ink md:py-32"
    >
      <div ref={containerRef} className="mx-auto grid max-w-6xl gap-12 px-6 md:px-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-20">
        <div data-reveal className="mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden bg-ink">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/jackieng-profile/images/gallery/headshot.jpg"
              alt="Jackie Ng"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </div>
        </div>

        <div>
          <h2
            data-reveal
            id="contact-heading"
            className="font-heading text-5xl font-semibold leading-[1] tracking-tight text-balance md:text-7xl"
          >
            Partner with me, or join the team.
          </h2>

          <p data-reveal className="mt-6 max-w-[50ch] text-lg leading-[1.6] text-stone md:text-xl">
            Pharma and biotech teams with a payload stuck at the blood-brain barrier. Investors in CNS delivery. Scientists who work across the bench, structure and ML and want to build AtomBios with me.
          </p>

          <div data-reveal className="mt-10">
            <Magnetic>
              <a
                href={`mailto:${email}`}
                className="group inline-flex min-h-14 items-center gap-3 bg-ink px-8 text-xl font-medium text-cream transition-colors hover:bg-clay active:scale-95"
                aria-label={`Email ${email}`}
              >
                Email me
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current transition-transform group-hover:translate-x-1" strokeWidth="1.75" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </Magnetic>
            <p className="mt-4 text-base text-stone">{email}</p>
          </div>

          <p data-reveal className="mt-10 text-lg leading-[1.8] text-ink">
            CNS delivery. mRNA and siRNA beyond liver. ML for formulation design.
          </p>
        </div>
      </div>
    </section>
  )
}
