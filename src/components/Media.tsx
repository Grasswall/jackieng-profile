'use client'

import { Badge } from './ui/Badge'
import { SectionLabel } from './ui/SectionLabel'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const basePath = '/jackieng-profile'

export interface MediaCard {
  id: string
  type: 'large' | 'regular' | 'text-only'
  title: string
  outlet: string
  badge?: string
  photo?: string
  description?: string
}

export interface SpeakingEngagement {
  org: string
  title: string
}

interface MediaProps {
  cards: MediaCard[]
  speaking: SpeakingEngagement[]
}

function MediaCardLarge({ card }: { card: MediaCard }) {
  const photoSrc = card.photo
    ? card.photo.startsWith('/')
      ? card.photo
      : `${basePath}/assets/${card.photo}`
    : null

  return (
    <article
      data-reveal
      className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-gold/30 transition-all duration-300 h-72 md:h-80"
    >
      {photoSrc ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            alt={`${card.outlet} — ${card.title}`}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-charcoal" />
      )}

      <div className="absolute inset-0 flex flex-col justify-end p-6">
        {card.badge && (
          <div className="mb-3">
            <Badge variant="gold">{card.badge}</Badge>
          </div>
        )}
        <p className="text-xs text-gold/70 tracking-widest uppercase font-medium mb-1">
          {card.outlet}
        </p>
        <h3 className="font-heading text-xl md:text-2xl font-semibold text-offwhite leading-tight">
          {card.title}
        </h3>
        {card.description && (
          <p className="mt-2 text-sm text-offwhite/60 leading-relaxed line-clamp-2">
            {card.description}
          </p>
        )}
      </div>
    </article>
  )
}

function MediaCardRegular({ card }: { card: MediaCard }) {
  const photoSrc = card.photo
    ? card.photo.startsWith('/')
      ? card.photo
      : `${basePath}/assets/${card.photo}`
    : null

  return (
    <article
      data-reveal
      className="group bg-navy rounded-xl overflow-hidden border border-navy/20 hover:border-gold/30 transition-all duration-300 flex flex-col"
    >
      {photoSrc && (
        <div className="h-40 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            alt={`${card.outlet} — ${card.title}`}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        {card.badge && (
          <div className="mb-2">
            <Badge variant="outline">{card.badge}</Badge>
          </div>
        )}
        <p className="text-xs text-gold/70 tracking-widest uppercase font-medium mb-1">
          {card.outlet}
        </p>
        <h3 className="font-heading text-lg font-semibold text-offwhite leading-snug mb-2">
          {card.title}
        </h3>
        {card.description && (
          <p className="text-sm text-offwhite/55 leading-relaxed">{card.description}</p>
        )}
      </div>
    </article>
  )
}

function MediaCardTextOnly({ card }: { card: MediaCard }) {
  return (
    <article
      data-reveal
      className="bg-navy rounded-xl border border-navy/20 hover:border-gold/30 transition-all duration-300 p-6 flex flex-col justify-between h-full"
    >
      <div>
        {card.badge && (
          <div className="mb-3">
            <Badge variant="outline">{card.badge}</Badge>
          </div>
        )}
        <p className="text-xs text-gold/70 tracking-widest uppercase font-medium mb-2">
          {card.outlet}
        </p>
        <h3 className="font-heading text-xl font-semibold text-offwhite leading-snug mb-3">
          {card.title}
        </h3>
        {card.description && (
          <p className="text-sm text-offwhite/55 leading-relaxed">{card.description}</p>
        )}
      </div>
    </article>
  )
}

export function Media({ cards, speaking }: MediaProps) {
  const containerRef = useScrollReveal({ stagger: 0.1 })
  const largeCards = cards.filter((c) => c.type === 'large')
  const otherCards = cards.filter((c) => c.type !== 'large')

  return (
    <section
      aria-labelledby="media-heading"
    >
      <div ref={containerRef} className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-12 md:mb-16">
          <SectionLabel label="Media & Speaking" className="mb-6" />
          <h2
            data-reveal
            id="media-heading"
            className="font-heading text-4xl md:text-5xl font-semibold text-navy max-w-xl leading-tight"
          >
            From the bench to the broadcast.
          </h2>
        </div>

        {/* Large feature cards */}
        {largeCards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {largeCards.map((card) => (
              <MediaCardLarge key={card.id} card={card} />
            ))}
          </div>
        )}

        {/* Regular / text-only cards */}
        {otherCards.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {otherCards.map((card) =>
              card.type === 'text-only' ? (
                <MediaCardTextOnly key={card.id} card={card} />
              ) : (
                <MediaCardRegular key={card.id} card={card} />
              )
            )}
          </div>
        )}

        {/* Speaking engagements */}
        {speaking.length > 0 && (
          <div>
            <h3 className="text-xs tracking-widest uppercase text-navy/40 font-medium mb-6">
              Speaking Engagements
            </h3>
            <ul className="divide-y divide-navy/10" role="list">
              {speaking.map((eng, i) => (
                <li
                  data-reveal
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-4"
                >
                  <span className="text-sm font-medium text-gold/80 tracking-wide uppercase shrink-0">
                    {eng.org}
                  </span>
                  <span className="text-sm text-navy/60 sm:text-right">
                    {eng.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
