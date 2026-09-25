import { Badge } from './ui/Badge'
import { SectionLabel } from './ui/SectionLabel'

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

export function AtomBios({
  heading,
  tagline,
  description,
  pillars,
  programBadges,
  headshot,
}: AtomBiosProps) {
  const headshotSrc = headshot
    ? `${basePath}/assets/${headshot}`
    : `${basePath}/assets/headshot.jpg`

  return (
    <section
      id="atombios"
      className="bg-navy py-20 md:py-32 overflow-hidden"
      aria-labelledby="atombios-heading"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: content */}
          <div>
            <SectionLabel label="AtomBios" className="mb-6" />

            <h2
              id="atombios-heading"
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-offwhite leading-tight mb-4"
            >
              {heading}
            </h2>

            <p className="text-base md:text-lg text-gold/80 font-medium mb-4 leading-snug">
              {tagline}
            </p>

            <p className="text-sm md:text-base text-offwhite/60 leading-relaxed mb-10">
              {description}
            </p>

            {/* Three pillars */}
            <ul className="space-y-6 mb-10" role="list">
              {pillars.map((pillar) => (
                <li key={pillar.title} className="flex items-start gap-4">
                  <span
                    className="text-2xl shrink-0 leading-none mt-0.5"
                    aria-hidden="true"
                  >
                    {pillar.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-offwhite mb-1">
                      {pillar.title}
                    </p>
                    <p className="text-sm text-offwhite/50 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Program badges */}
            <div className="flex flex-wrap gap-2" role="list" aria-label="Programs">
              {programBadges.map((b) => (
                <div key={b} role="listitem">
                  <Badge variant="muted">{b}</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Right: headshot */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Decorative bg ring */}
            <div
              className="absolute inset-0 rounded-full bg-gold/5 blur-3xl scale-75"
              aria-hidden="true"
            />
            <div className="relative w-72 md:w-80 lg:w-96 aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={headshotSrc}
                alt="Jackie Ng"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
