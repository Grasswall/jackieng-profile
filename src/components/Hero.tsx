'use client'

import { Badge } from './ui/Badge'
import { Button } from './ui/Button'

const basePath = '/jackieng-profile'

const heroBadges = [
  'Nobel Foundation',
  'Shaw Prize',
  'CAS Future Leader',
  'Techathon+ Gold',
  'JBC Published',
]

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}/assets/hero-stage.jpg`}
          alt=""
          className="w-full h-full object-cover object-center"
          aria-hidden="true"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
        />
        {/* Gradient overlays: dark navy base + directional fade */}
        <div className="absolute inset-0 bg-navy/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="max-w-2xl">
          {/* Tag */}
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-gold shrink-0" />
            <span className="text-xs tracking-[0.25em] uppercase text-gold font-medium">
              The Invisible Architect
            </span>
          </div>

          {/* Main heading */}
          <h1 className="font-heading text-7xl md:text-8xl lg:text-9xl font-semibold text-offwhite leading-none tracking-tight mb-4">
            Jackie Ng
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gold/90 font-medium tracking-wide mb-6">
            Computational Biologist · Founder, AtomBios
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-offwhite/70 leading-relaxed mb-8 max-w-xl">
            From Nobel Foundation symposia and Shaw Prize ceremonies to CAS
            Future Science Leader programmes — building the molecular simulation
            platform that bridges atomic precision and pharma-grade speed.
          </p>

          {/* Pill badges */}
          <div className="flex flex-wrap gap-2 mb-10" role="list" aria-label="Affiliations">
            {heroBadges.map((badge) => (
              <div key={badge} role="listitem">
                <Badge variant="outline">{badge}</Badge>
              </div>
            ))}
          </div>

                    {/* CTA */}
          <a href="#recognition" className="inline-flex items-center gap-2">
            <Button variant="primary" size="lg">
              See the full story
              <span aria-hidden="true">→</span>
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce"
        aria-hidden="true"
      >
        <span className="text-xs text-offwhite/30 tracking-widest uppercase">
          Scroll
        </span>
        <span className="block w-px h-8 bg-gradient-to-b from-offwhite/30 to-transparent" />
      </div>
    </section>
  )
}
