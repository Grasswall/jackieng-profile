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

function src(photo?: string) {
  if (!photo) return null
  return photo.startsWith('/') ? photo.replace(/^\/jackieng-profile/, basePath) : `${basePath}/assets/${photo}`
}

// Photo cards: the image is shown whole above a solid text plate, no overlay on the picture.
function MediaCardPhoto({ card, tall }: { card: MediaCard; tall?: boolean }) {
  const photoSrc = src(card.photo)
  return (
    <article data-reveal tabIndex={0} className="group flex flex-col bg-deep text-cream on-dark">
      {photoSrc && (
        <div className={['overflow-hidden bg-stage', tall ? 'aspect-[4/3]' : 'aspect-[3/2]'].join(' ')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            alt={`${card.outlet}: ${card.title}`}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        {card.badge && (
          <div className="mb-3">
            <Badge variant="gold">{card.badge}</Badge>
          </div>
        )}
        <p className="text-base text-mist">{card.outlet}</p>
        <h3 className="mt-1 font-heading text-3xl font-semibold leading-tight">{card.title}</h3>
        {card.description && <p className="mt-3 text-base leading-relaxed text-cream">{card.description}</p>}
      </div>
    </article>
  )
}

function MediaCardTextOnly({ card }: { card: MediaCard }) {
  return (
    <article data-reveal tabIndex={0} className="on-dark flex h-full flex-col bg-deep p-6 text-cream">
      {card.badge && (
        <div className="mb-3">
          <Badge variant="gold">{card.badge}</Badge>
        </div>
      )}
      <p className="text-base text-mist">{card.outlet}</p>
      <h3 className="mt-1 font-heading text-3xl font-semibold leading-tight">{card.title}</h3>
      {card.description && <p className="mt-3 text-base leading-relaxed text-cream">{card.description}</p>}
    </article>
  )
}

export function Media({ cards, speaking }: MediaProps) {
  const containerRef = useScrollReveal({ stagger: 0.1 })
  const largeCards = cards.filter((c) => c.type === 'large')
  const otherCards = cards.filter((c) => c.type !== 'large')

  return (
    <section aria-labelledby="media-heading">
      <div ref={containerRef} className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-10 md:mb-14">
          <SectionLabel label="Media & Speaking" className="mb-6" />
          <h2
            data-reveal
            id="media-heading"
            className="max-w-[18ch] font-heading text-4xl font-semibold leading-[1.05] text-balance md:text-6xl"
          >
            From the bench to the broadcast.
          </h2>
        </div>

        {largeCards.length > 0 && (
          <div className="dim-siblings mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {largeCards.map((card) => (
              <MediaCardPhoto key={card.id} card={card} tall />
            ))}
          </div>
        )}

        {otherCards.length > 0 && (
          <div className="dim-siblings mb-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {otherCards.map((card) =>
              card.type === 'text-only' ? (
                <MediaCardTextOnly key={card.id} card={card} />
              ) : (
                <MediaCardPhoto key={card.id} card={card} />
              )
            )}
          </div>
        )}

        {speaking.length > 0 && (
          <div>
            <h3 className="mb-4 font-heading text-4xl font-semibold">Speaking engagements</h3>
            <ul className="dim-siblings border-t-2 border-ink" role="list">
              {speaking.map((eng, i) => (
                <li
                  data-reveal
                  key={i}
                  tabIndex={0}
                  className="grid gap-x-8 gap-y-1 border-b-2 border-ink/25 py-4 sm:grid-cols-[16rem_1fr]"
                >
                  <span className="text-lg font-medium text-clay">{eng.org}</span>
                  <span className="text-lg text-ink">{eng.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
