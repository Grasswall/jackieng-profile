'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// Reuse event assets and literal event/result captions already in WorkIndex and evidence.ts.
const ENTRIES = [
  { name: 'PKU–Cambridge', detail: 'Hong Kong Station · Champion', year: '2026', image: 'champion-1.jpg', category: 'Competition' },
  { name: 'Techathon+', detail: '10th Anniversary · Gold Medal', year: '2026', image: 'techathon-1.jpg', category: 'Competition' },
  { name: 'SUSS Pitch for Good', detail: 'People’s Choice Award', year: '2026', image: 'suss-1.jpg', category: 'Competition' },
  { name: 'Lindau', detail: 'Nobel Laureate Meeting · Selected participant', year: '2025', image: 'lindau-1.jpg', category: 'Academic selection' },
  { name: 'Shaw Prize Forum', detail: 'Academic Representative · Laureates Roundtable', year: '2025', image: 'shaw-1.jpg', category: 'Academic representation' },
  { name: 'WIN in Suzhou', detail: 'Rising Star Award', year: '2026', image: 'suzhou-pitch.jpg', category: 'Competition' },
  { name: 'GBA HYAB', detail: 'Donor visit · Attended', year: '2026', image: 'gba-hyab-1.jpg', category: 'Event' },
  { name: 'RTHK', detail: '尋找創科的故事 · Featured', year: '2026', image: '/jackieng-profile/images/gallery/rthk-broadcast.jpg', category: 'TV coverage' },
  { name: 'BRTV', detail: '轉在北京 · Featured', year: '2026', image: '/jackieng-profile/images/gallery/beijing-tv-speaking.jpg', category: 'TV coverage' },
  { name: 'Ming Pao · Sing Tao', detail: 'Published print coverage', year: '', image: '/jackieng-profile/images/gallery/mingpao-spread.jpg', category: 'Press' },
  { name: 'HKSTP Ecopreneur', detail: 'Event participation', year: '2025', image: 'hkstp-1.jpg', category: 'Entrepreneurship' },
]
const BASE = '/jackieng-profile/images/gallery/'
const source = (image: string) => image.startsWith('/') ? image : BASE + image
export function Accolades({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement | null>(null)
  useEffect(() => {
    if (selected !== null) dialog.current?.showModal()
  }, [selected])
  const close = () => { dialog.current?.close(); setSelected(null); trigger.current?.focus() }
  return (
    <section id="proof" aria-labelledby="accolades-heading" className={compact ? "compact-recognition scroll-mt-16 bg-cream px-6 py-7 text-ink md:px-12 md:py-8" : "scroll-mt-16 bg-cream px-6 py-14 text-ink md:px-12 md:py-20"}>
      <div className={compact ? "mx-auto max-w-[1056px]" : "mx-auto max-w-6xl"}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone">Awards · academic selection · press</p>
          <h2 id="accolades-heading" className={compact ? "mt-2 font-heading text-3xl tracking-tight" : "mt-3 font-heading text-4xl tracking-tight md:text-5xl"}>Recognition &amp; media.</h2></div>
          <Link href="/speaking" className="inline-flex min-h-11 items-center text-sm underline underline-offset-4">Events &amp; media ↗</Link>
        </div>
        <ul className={compact ? "compact-photo-list" : "mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"}>
          {ENTRIES.map((x, i) => <li key={x.name}>
            <button type="button" className="group block w-full overflow-hidden bg-ink/5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" aria-label={`Enlarge ${x.name} event photograph`} onClick={e => { trigger.current = e.currentTarget; setSelected(i) }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={source(x.image)} alt={`${x.name} · event photograph`} loading="lazy" width="640" height="480" className="aspect-[4/3] w-full object-contain transition-transform duration-300 motion-safe:group-hover:scale-[1.03]" />
            </button>
            <p className="photo-meta mt-4 flex justify-between gap-4 text-[10px] uppercase tracking-widest text-stone"><span>{x.category}</span><span>{x.year}</span></p>
            <h3 className="mt-2 font-heading text-2xl">{x.name}</h3>
            <p className="mt-1 text-sm leading-relaxed">{x.detail}</p>
          </li>)}
        </ul>
        {!compact && <p className="mt-8 text-xs text-stone">Event photographs document participation; award results and academic selections are identified separately.</p>}
      </div>
      <dialog ref={dialog} onCancel={() => setSelected(null)} onClick={e => { if (e.target === e.currentTarget) close() }} className="w-[min(94vw,70rem)] bg-cream p-4 text-ink backdrop:bg-black/85" aria-label="Event photograph">
        <button type="button" onClick={close} autoFocus className="mb-3 min-h-11 px-4 underline">Close photograph ×</button>
        {selected !== null && <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={source(ENTRIES[selected].image)} alt={`${ENTRIES[selected].name} event photograph, enlarged`} className="max-h-[70vh] w-full object-contain" />
          <figcaption className="mt-3 text-sm">{ENTRIES[selected].name} · {ENTRIES[selected].detail} · {ENTRIES[selected].year}</figcaption>
        </figure>}
      </dialog>
    </section>
  )
}
