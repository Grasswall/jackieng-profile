import { Badge } from './ui/Badge'
import { SectionLabel } from './ui/SectionLabel'

const basePath = '/jackieng-profile'

type CompetitionBadge = 'Gold Medal' | 'Rising Star' | 'Silver' | 'Best Oral' | string

export interface CompetitionItem {
  title: string
  context: string
  description: string
  badge: CompetitionBadge
  photo?: string
}

interface CompetitionsProps {
  items: CompetitionItem[]
}

function badgeVariant(badge: CompetitionBadge) {
  if (badge === 'Gold Medal') return 'gold' as const
  if (badge === 'Rising Star') return 'gold' as const
  return 'outline' as const
}

function CompetitionCard({ item }: { item: CompetitionItem }) {
  const photoSrc = item.photo ? `${basePath}/assets/${item.photo}` : null

  return (
    <article className="group bg-charcoal rounded-lg overflow-hidden border border-white/10 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/5 flex flex-col">
      {/* Photo */}
      {photoSrc ? (
        <div className="relative h-48 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            alt={item.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
          {/* Badge overlay */}
          <div className="absolute top-3 right-3">
            <Badge variant={badgeVariant(item.badge)}>{item.badge}</Badge>
          </div>
        </div>
      ) : (
        <div className="relative h-16 bg-navy/60 flex items-start pt-4 px-6">
          <Badge variant={badgeVariant(item.badge)}>{item.badge}</Badge>
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <p className="text-xs text-gold/70 tracking-wider uppercase font-medium mb-2">
          {item.context}
        </p>
        <h3 className="font-heading text-xl font-semibold text-offwhite mb-3 leading-tight">
          {item.title}
        </h3>
        <p className="text-sm text-offwhite/60 leading-relaxed flex-1">
          {item.description}
        </p>
      </div>
    </article>
  )
}

export function Competitions({ items }: CompetitionsProps) {
  return (
    <section
      id="competitions"
      className="bg-charcoal py-20 md:py-32"
      aria-labelledby="competitions-heading"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-12 md:mb-16">
          <SectionLabel label="Competitions" className="mb-6" />
          <h2
            id="competitions-heading"
            className="font-heading text-4xl md:text-5xl font-semibold text-offwhite max-w-lg leading-tight"
          >
            Turning research into ventures that win.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <CompetitionCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
