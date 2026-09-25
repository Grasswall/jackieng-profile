import { SectionLabel } from './ui/SectionLabel'

const basePath = '/jackieng-profile'

export interface RecognitionItem {
  index: string
  title: string
  org: string
  year: string
  description: string
  photo?: string
}

interface RecognitionProps {
  items: RecognitionItem[]
}

function RecognitionCard({
  item,
}: {
  item: RecognitionItem
}) {
  const photoSrc = item.photo ? `${basePath}/assets/${item.photo}` : null

  return (
    <article className="group flex flex-col md:flex-row gap-6 py-10 border-b border-white/10 last:border-b-0">
      {/* Index */}
      <div className="shrink-0 w-12">
        <span className="font-heading text-4xl font-semibold text-gold/30 leading-none">
          {item.index}
        </span>
      </div>

      {/* Photo */}
      {photoSrc && (
        <div className="shrink-0 w-full md:w-48 h-32 md:h-36 rounded overflow-hidden relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            alt={`${item.org} — ${item.title}`}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay label */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent flex items-end p-3">
            <div>
              <p className="text-xs text-gold tracking-wider uppercase font-medium leading-none">
                {item.org}
              </p>
              <p className="text-xs text-offwhite/60 mt-0.5">{item.year}</p>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-heading text-xl md:text-2xl font-semibold text-offwhite leading-tight">
            {item.title}
          </h3>
          {!photoSrc && (
            <span className="text-xs text-offwhite/40 tracking-wide shrink-0">
              {item.year}
            </span>
          )}
        </div>
        <p className="text-sm text-gold/80 tracking-wider uppercase font-medium mb-3">
          {item.org}
        </p>
        <p className="text-sm md:text-base text-offwhite/60 leading-relaxed">
          {item.description}
        </p>
      </div>
    </article>
  )
}

export function Recognition({ items }: RecognitionProps) {
  return (
    <section
      id="recognition"
      className="bg-navy py-20 md:py-32"
      aria-labelledby="recognition-heading"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          {/* Sticky left header */}
          <div className="md:sticky md:top-24 md:self-start md:w-64 shrink-0">
            <SectionLabel label="Recognition" className="mb-6" />
            <h2
              id="recognition-heading"
              className="font-heading text-4xl md:text-5xl font-semibold text-offwhite leading-tight"
            >
              <span className="text-gold/40 font-heading">01</span>
              <br />
              Recognition
            </h2>
            <p className="mt-4 text-sm text-offwhite/50 leading-relaxed">
              Invited to rooms that shape science — before turning 26.
            </p>
          </div>

          {/* Cards */}
          <div className="flex-1 min-w-0">
            {items.map((item) => (
              <RecognitionCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
