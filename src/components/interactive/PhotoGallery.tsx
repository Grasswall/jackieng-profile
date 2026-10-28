'use client'

import { useState, useCallback, useEffect } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface GalleryItem {
  src: string
  alt: string
  caption: string
  span: string // tailwind grid span classes
}

const basePath = '/jackieng-profile'

const items: GalleryItem[] = [
  {
    src: `${basePath}/images/gallery/lindau-1.jpg`,
    alt: 'Lindau Nobel Laureate Meeting 2025',
    caption: 'Lindau Nobel Laureate Meeting, 2025',
    span: 'row-span-2 col-span-1 md:col-span-1',
  },
  {
    src: `${basePath}/images/gallery/shaw-1.jpg`,
    alt: 'Shaw Prize Forum 2025 round table',
    caption: 'Shaw Prize Forum, round table, 2025',
    span: 'col-span-2 row-span-1',
  },
  {
    src: `${basePath}/images/gallery/hkstp-1.jpg`,
    alt: 'HKSTP Ecopreneur event',
    caption: 'HKSTP Ecopreneur, 2025',
    span: 'col-span-1 row-span-1',
  },
  {
    src: `${basePath}/images/gallery/shaw-2.jpg`,
    alt: 'Shaw Prize Forum 2025',
    caption: 'Shaw Prize Forum, 2025',
    span: 'col-span-1 row-span-1',
  },
  {
    src: `${basePath}/images/gallery/lindau-2.jpg`,
    alt: 'Lindau Nobel Laureate Meeting 2025',
    caption: 'Lindau Nobel Laureate Meeting, 2025',
    span: 'col-span-1 row-span-1',
  },
  {
    src: `${basePath}/images/gallery/hkstp-2.jpg`,
    alt: 'HKSTP Ecopreneur event',
    caption: 'HKSTP Ecopreneur, 2025',
    span: 'col-span-1 row-span-1',
  },
  {
    src: `${basePath}/images/gallery/shaw-3.jpg`,
    alt: 'Shaw Prize Forum 2025 round table',
    caption: 'Shaw Prize Forum, round table, 2025',
    span: 'col-span-2 row-span-1',
  },
]

export function PhotoGallery() {
  const containerRef = useScrollReveal()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const close = useCallback(() => setLightboxIndex(null), [])
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % items.length)),
    []
  )
  const prev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : (i - 1 + items.length) % items.length
      ),
    []
  )

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex, close, next, prev])

  return (
    <section
      id="gallery"
      className="bg-[#0F172A] py-20 md:py-32"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div ref={containerRef} className="space-y-10">
          <div data-reveal>
            <h2
              id="gallery-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.15] mb-4"
            >
              Elite Access
            </h2>
            <p className="text-xl text-[#94A3B8] max-w-3xl">
              Lindau Nobel Laureate Meeting, the Shaw Prize Forum, and
              HKSTP — events I have attended.
            </p>
          </div>

          <div
            data-reveal
            className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] gap-3"
          >
            {items.map((item, i) => (
              <button
                key={item.src}
                onClick={() => setLightboxIndex(i)}
                className={`relative overflow-hidden rounded-xl group focus:outline-none focus:ring-2 focus:ring-[#22D3EE] ${item.span}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-sm text-[#F8FAFC] font-medium text-left">
                    {item.caption}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#0B0E14]/95 flex items-center justify-center p-4 md:p-12"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              close()
            }}
            className="absolute top-6 right-6 text-[#F8FAFC] text-3xl leading-none hover:text-[#22D3EE] transition-colors"
            aria-label="Close"
          >
            &times;
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            className="absolute left-4 md:left-8 text-[#F8FAFC] text-4xl hover:text-[#22D3EE] transition-colors"
            aria-label="Previous photo"
          >
            &#8249;
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            className="absolute right-4 md:right-8 text-[#F8FAFC] text-4xl hover:text-[#22D3EE] transition-colors"
            aria-label="Next photo"
          >
            &#8250;
          </button>
          <figure
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={items[lightboxIndex].src}
              alt={items[lightboxIndex].alt}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
            />
            <figcaption className="mt-4 text-[#94A3B8] text-sm">
              {items[lightboxIndex].caption}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
