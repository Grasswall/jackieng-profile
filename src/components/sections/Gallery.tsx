'use client'

const basePath = '/jackieng-profile'

type Tile =
  | { kind: 'word'; label: string }
  | { kind: 'photo'; src: string; alt: string }

const tiles: Tile[] = [
  { kind: 'word', label: 'Lindau' },
  { kind: 'word', label: 'Shaw Prize' },
  { kind: 'photo', src: 'images/gallery/lindau-1.jpg', alt: 'Jackie Ng at the Lindau Nobel Laureate Meeting 2025' },
  { kind: 'word', label: 'HKSTP' },
  { kind: 'word', label: 'CAS Future Leader' },
  { kind: 'photo', src: 'images/gallery/shaw-1.jpg', alt: 'Jackie Ng at the Shaw Prize Forum 2025' },
  { kind: 'word', label: 'Techathon+' },
  { kind: 'word', label: 'SUSS' },
  { kind: 'photo', src: 'images/gallery/hkstp-1.jpg', alt: 'Jackie Ng at HKSTP' },
  { kind: 'word', label: 'Win in Suzhou' },
  { kind: 'word', label: 'GBA HYAB' },
  { kind: 'photo', src: 'images/gallery/suzhou-pitch.jpg', alt: 'Jackie Ng pitching AtomBios in Suzhou' },
  { kind: 'word', label: 'ABCT' },
  { kind: 'word', label: 'JBC 2024' },
  { kind: 'photo', src: 'images/gallery/champion-1.jpg', alt: 'Jackie Ng receiving a competition award' },
  { kind: 'word', label: 'Sirnaomics' },
]

export function Gallery() {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="bg-bg text-ink"
      data-ink="dark"
    >
      <h2 id="gallery-heading" className="sr-only">Record</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 bg-bg">
        {tiles.map((tile, i) =>
          tile.kind === 'word' ? (
            <div
              key={i}
              className="aspect-square bg-surface flex items-center justify-center text-center p-4"
              data-reveal
            >
              <span
                className="font-display font-bold uppercase leading-[1.05]"
                style={{ fontSize: 'clamp(1rem, 2.6vw, 1.5rem)' }}
              >
                {tile.label}
              </span>
            </div>
          ) : (
            <div
              key={i}
              className="aspect-square overflow-hidden"
              data-reveal
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${basePath}/${tile.src}`}
                alt={tile.alt}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-[filter] duration-500"
                loading="lazy"
              />
            </div>
          )
        )}
      </div>
    </section>
  )
}
