'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface GalleryItem {
  src: string
  alt: string
  caption: string
}

const basePath = '/jackieng-profile'

const items: GalleryItem[] = [
  {
    src: `${basePath}/images/gallery/lindau-1.jpg`,
    alt: 'Lindau Nobel Laureate Meeting 2025',
    caption: 'Lindau Nobel Laureate Meeting, 2025',
  },
  {
    src: `${basePath}/images/gallery/shaw-1.jpg`,
    alt: 'Shaw Prize Forum 2025 round table',
    caption: 'Shaw Prize Forum, round table, 2025',
  },
  {
    src: `${basePath}/images/gallery/hkstp-1.jpg`,
    alt: 'HKSTP Ecopreneur event',
    caption: 'HKSTP Ecopreneur, 2025',
  },
]

const wins: GalleryItem[] = [
  {
    src: `${basePath}/images/gallery/champion-1.jpg`,
    alt: 'PHBS-CJBS Global Pitch Competition final round',
    caption: 'PHBS-CJBS Global Pitch Competition, Final Round, 2026',
  },
  {
    src: `${basePath}/images/gallery/suss-1.jpg`,
    alt: 'SUSS Pitch for Good award event',
    caption: "SUSS Pitch for Good — People's Choice Award, 2026",
  },
  {
    src: `${basePath}/images/gallery/techathon-1.jpg`,
    alt: 'Techathon+ 10th Anniversary award event',
    caption: 'Techathon+ 10th Anniversary — Gold Medal, 2026',
  },
]

const allItems = [...items, ...wins]

function Thumb({
  item,
  index,
  selected,
  onSelect,
}: {
  item: GalleryItem
  index: number
  selected: boolean
  onSelect: (i: number) => void
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(index)}
        // Mouse hover previews on the stage; touch and keyboard select by tap or focus-then-Enter.
        onPointerEnter={(e) => e.pointerType === 'mouse' && onSelect(index)}
        aria-pressed={selected}
        aria-label={item.caption}
        className={[
          'group relative block aspect-[4/3] w-full overflow-hidden bg-stage transition-opacity',
          selected ? 'opacity-100 outline outline-[3px] -outline-offset-[3px] outline-signal' : 'opacity-70 hover:opacity-100',
        ].join(' ')}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.src} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      </button>
    </li>
  )
}

export function PhotoGallery() {
  const containerRef = useScrollReveal()
  const [sel, setSel] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const opener = useRef<HTMLElement | null>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)

  const open = (i: number) => {
    opener.current = document.activeElement as HTMLElement
    setLightboxIndex(i)
  }
  const close = useCallback(() => {
    setLightboxIndex(null)
    opener.current?.focus()
  }, [])
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % allItems.length)),
    []
  )
  const prev = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + allItems.length) % allItems.length)),
    []
  )

  useEffect(() => {
    if (lightboxIndex === null) return
    closeBtn.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'Tab') {
        // Keep focus inside the dialog.
        const f = document.querySelectorAll<HTMLElement>('[data-lightbox] button')
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex, close, next, prev])

  const current = allItems[sel]

  return (
    <section
      id="gallery"
      className="on-dark bg-stage py-20 text-cream md:py-32"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div ref={containerRef}>
          <div data-reveal className="mb-10 max-w-3xl">
            <h2
              id="gallery-heading"
              className="font-heading text-5xl font-semibold leading-[1] tracking-tight md:text-7xl"
            >
              Elite Access
            </h2>
            <p className="mt-4 text-xl text-mist">Lindau, Shaw Prize Forum, and HKSTP.</p>
          </div>

          <div data-reveal className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-8">
            {/* Stage: the photo is shown whole on a flat dark field, caption on a solid bar */}
            <figure className="m-0">
              <button
                type="button"
                onClick={() => open(sel)}
                aria-label={`Enlarge photo: ${current.caption}`}
                className="group relative block h-[56svh] min-h-[20rem] w-full cursor-zoom-in overflow-hidden bg-deep lg:h-[68svh]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  className="swap-in absolute inset-0 h-full w-full object-contain"
                />
              </button>
              <figcaption className="flex items-center justify-between gap-4 bg-deep px-4 py-3 text-base text-cream">
                <span aria-live="polite">{current.caption}</span>
                <span className="hidden shrink-0 text-mist sm:inline">Click to enlarge</span>
              </figcaption>
            </figure>

            {/* Rail: two groups, same stage */}
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="mb-3 font-heading text-2xl font-semibold">Elite access</h3>
                <ul className="grid grid-cols-3 gap-2 lg:grid-cols-2" role="list">
                  {items.map((it, i) => (
                    <Thumb key={it.src} item={it} index={i} selected={sel === i} onSelect={setSel} />
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-heading text-2xl font-semibold">Competitions and programmes</h3>
                <p className="mb-3 text-base text-mist">Wins from 2026.</p>
                <ul className="grid grid-cols-3 gap-2 lg:grid-cols-2" role="list">
                  {wins.map((it, i) => (
                    <Thumb
                      key={it.src}
                      item={it}
                      index={items.length + i}
                      selected={sel === items.length + i}
                      onSelect={setSel}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          data-lightbox
          className="on-dark fixed inset-0 z-[60] flex items-center justify-center bg-stage p-4 md:p-12"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          <button
            ref={closeBtn}
            onClick={(e) => {
              e.stopPropagation()
              close()
            }}
            className="absolute right-3 top-3 flex h-12 w-12 items-center justify-center bg-deep text-3xl leading-none text-cream hover:text-signal"
            aria-label="Close"
          >
            &times;
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-deep text-4xl leading-none text-cream hover:text-signal md:left-6"
            aria-label="Previous photo"
          >
            &#8249;
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-deep text-4xl leading-none text-cream hover:text-signal md:right-6"
            aria-label="Next photo"
          >
            &#8250;
          </button>
          <figure
            className="flex max-h-[88vh] max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={allItems[lightboxIndex].src}
              alt={allItems[lightboxIndex].alt}
              className="max-h-[75vh] max-w-full object-contain"
            />
            <figcaption className="mt-4 text-base text-cream">{allItems[lightboxIndex].caption}</figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
