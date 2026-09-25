import { Badge } from './ui/Badge'
import { SectionLabel } from './ui/SectionLabel'

export interface EducationItem {
  degree: string
  field: string
  institution: string
  years: string
  highlights: string[]
  tags: string[]
  location?: string
}

interface EducationProps {
  items: EducationItem[]
}

function EducationCard({ item }: { item: EducationItem }) {
  return (
    <article className="bg-charcoal rounded-xl border border-white/10 hover:border-gold/30 transition-all duration-300 p-8">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
        <div>
          <p className="text-xs text-gold/70 tracking-widest uppercase font-medium mb-1">
            {item.years}{item.location ? ` · ${item.location}` : ''}
          </p>
          <h3 className="font-heading text-2xl md:text-3xl font-semibold text-offwhite leading-tight">
            {item.degree}
          </h3>
          <p className="text-base text-gold/80 font-medium mt-1">{item.field}</p>
        </div>
        <span className="text-sm text-offwhite/50 tracking-wide shrink-0 sm:text-right pt-1">
          {item.institution}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/10 mb-6" />

      {/* Highlights */}
      <ul className="space-y-2 mb-6" role="list">
        {item.highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-offwhite/60 leading-relaxed">
            <span className="text-gold shrink-0 mt-0.5" aria-hidden="true">—</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {/* Tags */}
      <div className="flex flex-wrap gap-2" role="list" aria-label="Tags">
        {item.tags.map((tag) => (
          <div key={tag} role="listitem">
            <Badge variant="muted">{tag}</Badge>
          </div>
        ))}
      </div>
    </article>
  )
}

export function Education({ items }: EducationProps) {
  return (
    <section
      id="education"
      className="bg-navy py-20 md:py-32"
      aria-labelledby="education-heading"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-12 md:mb-16">
          <SectionLabel label="Education" className="mb-6" />
          <h2
            id="education-heading"
            className="font-heading text-4xl md:text-5xl font-semibold text-offwhite max-w-lg leading-tight"
          >
            Built on rigorous foundations.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {items.map((item) => (
            <EducationCard key={item.degree + item.institution} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
