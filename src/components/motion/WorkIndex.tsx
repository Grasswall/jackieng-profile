'use client'

import { useEffect, useRef, useState } from 'react'
import { BASE, clamp, isPhone, prefersReducedMotion, tween, type Tween } from './motionUtils'

// Spatial work index: a pannable, zoomable map of real photos, structures and
// results from this site. No dataset is linked to another; position is layout only.
interface Item {
  id: string
  type: 'img' | 'video' | 'stat'
  src?: string
  poster?: string
  x: number
  y: number
  w: number
  h: number
  title: string
  kind: string
  text: string
  dark?: boolean
  paper?: boolean
  stat?: string
  label?: string
  sub?: string
}

const g = (f: string) => `${BASE}/images/gallery/${f}`
const c = (n: string) => `${BASE}/images/corona/class-${n}.png`
const CLS_TEXT = 'Real 2D class average of the LNP corona protein complex (cryoSPARC J160).'

const ITEMS: Item[] = [
  { id: 'ml', type: 'stat', x: 2060, y: 1520, w: 500, h: 300, dark: true, stat: 'ML', label: 'I train the models', sub: 'Lipid nanoparticle design', title: 'ML training for LNP design', kind: 'My contribution', text: 'I train machine-learning models for lipid nanoparticle design at AtomBios. Model architecture, training data and evaluation results are not disclosed on this page.' },
  { id: 'suzhou', type: 'img', src: g('suzhou-pitch.jpg'), x: 120, y: 160, w: 760, h: 515, title: 'WIN in Suzhou Global Finals', kind: 'Pitch · 2026', text: 'Pitching AtomBios at the WIN in Suzhou Global Entrepreneurship Competition finals.' },
  { id: 'lindau', type: 'img', src: g('lindau-1.jpg'), x: 920, y: 100, w: 330, h: 440, title: 'Lindau Nobel Laureate Meeting', kind: '2025', text: 'Lindau Nobel Laureate Meeting, 2025.' },
  { id: 'shaw', type: 'img', src: g('shaw-1.jpg'), x: 920, y: 580, w: 440, h: 248, title: 'Shaw Prize Forum', kind: '2025', text: 'Laureates Roundtable at the Shaw Prize Forum, Academic Representative, 2025.' },
  { id: 'hkstp', type: 'img', src: g('hkstp-1.jpg'), x: 120, y: 715, w: 420, h: 280, title: 'HKSTP Ecopreneur', kind: '2025', text: 'HKSTP Ecopreneur event, 2025.' },
  { id: 'champion', type: 'img', src: g('champion-1.jpg'), x: 580, y: 715, w: 300, h: 200, title: 'PHBS-CJBS Global Pitch Competition', kind: 'Final round · 2026', text: 'PHBS-CJBS Global Pitch Competition, final round, 2026.' },

  { id: 'cls1', type: 'img', src: c('01'), x: 1640, y: 140, w: 231, h: 231, title: 'Class average 01', kind: 'Cryo-EM', text: CLS_TEXT, dark: true },
  { id: 'cls2', type: 'img', src: c('02'), x: 1882, y: 140, w: 231, h: 231, title: 'Class average 02', kind: 'Cryo-EM', text: CLS_TEXT, dark: true },
  { id: 'cls3', type: 'img', src: c('03'), x: 1640, y: 382, w: 231, h: 231, title: 'Class average 03', kind: 'Cryo-EM', text: CLS_TEXT, dark: true },
  { id: 'cls4', type: 'img', src: c('04'), x: 1882, y: 382, w: 231, h: 231, title: 'Class average 04', kind: 'Cryo-EM', text: CLS_TEXT, dark: true },
  { id: 'map', type: 'video', src: `${BASE}/images/corona/map-model.mp4`, poster: `${BASE}/images/corona/map-model-poster.jpg`, x: 2150, y: 140, w: 520, h: 452, title: 'Density map and atomic model', kind: 'Cryo-EM', text: 'Rotating cryo-EM density map with fitted atomic model.' },
  { id: 'res', type: 'stat', x: 2150, y: 640, w: 520, h: 240, dark: true, stat: '2.7 Å', label: 'Cryo-EM resolution', sub: 'five structures solved', title: '2.7 Å', kind: 'Structure', text: 'Five cryo-EM structures solved, best at 2.7 Å.' },

  { id: 'nm20', type: 'stat', x: 120, y: 1180, w: 320, h: 300, dark: true, stat: '20 nm', label: 'The platform', sub: 'vs 80–100 nm conventional LNPs', title: '20 nm platform', kind: 'Delivery', text: 'AtomBios nanoparticles engineered to cross the blood-brain barrier. Conventional LNPs (80–100 nm) are too large for efficient transcytosis.' },
  { id: 'x8', type: 'stat', x: 470, y: 1180, w: 320, h: 300, paper: true, stat: '8×', label: 'BBB transcytosis', sub: 'vs conventional LNPs', title: '8× BBB transcytosis', kind: 'Delivery', text: '8× higher blood-brain barrier crossing than conventional LNPs.' },
  { id: 'x32', type: 'stat', x: 820, y: 1180, w: 320, h: 300, paper: true, stat: '3.2×', label: 'Brain accumulation', sub: 'vs conventional LNPs', title: '3.2× brain accumulation', kind: 'Delivery', text: '3.2-fold brain accumulation versus conventional LNPs. Working with Sirnaomics.' },
  { id: 'tech', type: 'img', src: g('techathon-1.jpg'), x: 1180, y: 1180, w: 450, h: 300, title: 'Techathon+ 10th Anniversary', kind: 'Gold Medal · 2026', text: 'Techathon+ 10th Anniversary, Gold Medal, 2026.' },
  { id: 'fund', type: 'stat', x: 1670, y: 1180, w: 360, h: 300, dark: true, stat: 'HK$7.05M', label: 'Funded', sub: 'HKSTP incubated', title: 'HK$7.05M funded', kind: 'Company', text: 'AtomBios: HKSTP incubated, competition-validated, investor-backed. HK$7.05M funded.' },
  { id: 'suss', type: 'img', src: g('suss-1.jpg'), x: 1180, y: 1540, w: 450, h: 300, title: 'SUSS Pitch for Good', kind: 'People’s Choice Award · 2026', text: 'SUSS Pitch for Good — People’s Choice Award, 2026.' },
  { id: 'phd', type: 'stat', x: 2060, y: 1180, w: 360, h: 300, paper: true, stat: 'PhD', label: 'PolyU, 2023–', sub: 'Drug Delivery & Structural Biology', title: 'PhD, PolyU', kind: 'Training', text: 'PhD at PolyU in Drug Delivery & Structural Biology.' },
]

const ZONES = [
  { t: 'Stage', x: 120, y: 10 },
  { t: 'Structure', x: 1640, y: 10 },
  { t: 'Delivery', x: 120, y: 1030 },
  { t: 'Standing', x: 1180, y: 1030 },
]

const PAD = 140
const BX0 = Math.min(...ITEMS.map((i) => i.x)) - PAD
const BY0 = 0
const BX1 = Math.max(...ITEMS.map((i) => i.x + i.w)) + PAD
const BY1 = Math.max(...ITEMS.map((i) => i.y + i.h)) + PAD
const BW = BX1 - BX0
const BH = BY1 - BY0

interface Cam { x: number; y: number; s: number }

export function WorkIndex() {
  const stageRef = useRef<HTMLDivElement>(null)
  const worldRef = useRef<HTMLDivElement>(null)
  const vpRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const api = useRef<{ select: (i: number) => void; close: () => void; overview: () => void; zoom: (f: number) => void; center: (wx: number, wy: number) => void }>({
    select: () => {}, close: () => {}, overview: () => {}, zoom: () => {}, center: () => {},
  })
  const [sel, setSel] = useState(-1)
  const [touchPan, setTouchPan] = useState(false)
  const [hintGone, setHintGone] = useState(false)
  const selRef = useRef(-1)
  const touchRef = useRef(false)
  touchRef.current = touchPan

  useEffect(() => {
    const stage = stageRef.current
    const world = worldRef.current
    const vp = vpRef.current
    const video = videoRef.current
    if (!stage || !world || !vp) return

    let cam: Cam = { x: 0, y: 0, s: 0.4 }
    let fly: Tween | null = null
    let panned = false
    let drag: { id: number; x: number; y: number; cx: number; cy: number; on: boolean } | null = null
    let inView = false

    const apply = () => {
      world.style.transform = `translate3d(${cam.x}px,${cam.y}px,0) scale(${cam.s})`
      let gs = 120 * cam.s
      while (gs < 28) gs *= 2
      const ox = cam.x % gs
      const oy = cam.y % gs
      stage.style.backgroundSize = `${gs}px ${gs}px,${gs}px ${gs}px,auto`
      stage.style.backgroundPosition = `${ox}px ${oy}px,${ox}px ${oy}px,0 0`
      const w = stage.clientWidth
      const h = stage.clientHeight
      const wx0 = -cam.x / cam.s
      const wy0 = -cam.y / cam.s
      const l = clamp((wx0 - BX0) / BW, 0, 1)
      const t = clamp((wy0 - BY0) / BH, 0, 1)
      const r = clamp((wx0 + w / cam.s - BX0) / BW, 0, 1)
      const b = clamp((wy0 + h / cam.s - BY0) / BH, 0, 1)
      Object.assign(vp.style, { left: l * 100 + '%', top: t * 100 + '%', width: (r - l) * 100 + '%', height: (b - t) * 100 + '%' })
    }

    // Area of the stage not covered by the HUD or the detail panel.
    const area = () => {
      const w = stage.clientWidth
      const h = stage.clientHeight
      if (isPhone()) return { x0: 8, x1: w - 8, y0: 112, y1: selRef.current >= 0 ? h - 222 : h - 16 }
      return { x0: 290, x1: selRef.current >= 0 ? w - 410 : w - 16, y0: 24, y1: h - 16 }
    }
    const camFor = (cx: number, cy: number, bw: number, bh: number, maxS: number): Cam => {
      const a = area()
      const s = clamp(Math.min((a.x1 - a.x0) / bw, (a.y1 - a.y0) / bh), 0.08, maxS)
      return { s, x: (a.x0 + a.x1) / 2 - cx * s, y: (a.y0 + a.y1) / 2 - cy * s }
    }
    const flyTo = (target: Cam, ms = 850) => {
      fly?.cancel()
      const w = stage.clientWidth
      const h = stage.clientHeight
      const from = { ...cam }
      const c0 = { x: (w / 2 - from.x) / from.s, y: (h / 2 - from.y) / from.s }
      const c1 = { x: (w / 2 - target.x) / target.s, y: (h / 2 - target.y) / target.s }
      fly = tween(ms, (k) => {
        const s = Math.exp(Math.log(from.s) + (Math.log(target.s) - Math.log(from.s)) * k)
        const cx = c0.x + (c1.x - c0.x) * k
        const cy = c0.y + (c1.y - c0.y) * k
        cam = { s, x: w / 2 - cx * s, y: h / 2 - cy * s }
        apply()
      })
    }
    const initial = (): Cam => (isPhone() ? camFor(700, 560, 1400, 1000, 1) : camFor(BX0 + BW / 2, BY0 + BH / 2, BW, BH, 1))

    const select = (i: number) => {
      selRef.current = i
      setSel(i)
      setHintGone(true)
      const it = ITEMS[i]
      flyTo(camFor(it.x + it.w / 2, it.y + it.h / 2, it.w * 1.08, it.h * 1.08, 1.8))
    }
    const close = () => {
      selRef.current = -1
      setSel(-1)
    }
    const overview = () => {
      close()
      flyTo(camFor(BX0 + BW / 2, BY0 + BH / 2, BW, BH, 1))
    }
    const zoomBy = (f: number, px?: number, py?: number) => {
      const w = stage.clientWidth
      const h = stage.clientHeight
      const x = px ?? w / 2
      const y = py ?? h / 2
      const s = clamp(cam.s * f, 0.08, 2.4)
      const k = s / cam.s
      fly?.cancel()
      cam = { s, x: x - (x - cam.x) * k, y: y - (y - cam.y) * k }
      apply()
    }
    api.current = {
      select,
      close,
      overview,
      zoom: (f) => zoomBy(f),
      center: (wx, wy) => flyTo({ s: cam.s, x: stage.clientWidth / 2 - wx * cam.s, y: stage.clientHeight / 2 - wy * cam.s }, 500),
    }

    // Mouse and pen always drag. Touch only drags once the visitor has switched
    // touch panning on; otherwise touch-action: pan-y hands vertical swipes to the page.
    const onDown = (e: PointerEvent) => {
      if (e.button > 0) return
      if (e.pointerType === 'touch' && !touchRef.current) return
      fly?.cancel()
      panned = false
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, cx: cam.x, cy: cam.y, on: false }
    }
    const onMove = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return
      const dx = e.clientX - drag.x
      const dy = e.clientY - drag.y
      if (!drag.on && Math.hypot(dx, dy) > 6) {
        drag.on = true
        panned = true
        stage.setPointerCapture(e.pointerId)
        stage.classList.add('is-drag')
        setHintGone(true)
      }
      if (drag.on) {
        cam.x = drag.cx + dx
        cam.y = drag.cy + dy
        apply()
      }
    }
    const onEnd = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return
      drag = null
      stage.classList.remove('is-drag')
      setTimeout(() => { panned = false }, 0)
    }
    // Wheel: only a pinch or ctrl/cmd + wheel zooms the map. Plain wheel is left
    // alone so the page keeps scrolling over the map.
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return
      e.preventDefault()
      zoomBy(Math.exp(-e.deltaY * 0.01), e.clientX - stage.getBoundingClientRect().left, e.clientY - stage.getBoundingClientRect().top)
    }
    const onClickCapture = (e: MouseEvent) => {
      if (panned) {
        e.stopPropagation()
        e.preventDefault()
        panned = false
      }
    }
    const onScrollReset = () => { stage.scrollLeft = 0; stage.scrollTop = 0 }
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const inside = stage.parentElement?.contains(document.activeElement)
      if (!inside) return
      const n = ITEMS.length
      const cur = selRef.current
      if (e.key === 'Escape' && cur >= 0) close()
      else if (cur >= 0 && e.key === 'ArrowRight') { e.preventDefault(); select((cur + 1) % n) }
      else if (cur >= 0 && e.key === 'ArrowLeft') { e.preventDefault(); select((cur - 1 + n) % n) }
    }
    const onFocusIn = (e: FocusEvent) => {
      const t = e.target as HTMLElement
      const idx = t.dataset?.i
      if (idx != null && t.matches(':focus-visible') && selRef.current !== +idx) select(+idx)
    }
    const onResize = () => apply()

    stage.addEventListener('pointerdown', onDown)
    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerup', onEnd)
    stage.addEventListener('pointercancel', onEnd)
    stage.addEventListener('wheel', onWheel, { passive: false })
    stage.addEventListener('click', onClickCapture, true)
    stage.addEventListener('scroll', onScrollReset)
    stage.addEventListener('focusin', onFocusIn)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        if (!video) return
        if (inView && !prefersReducedMotion()) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.1 }
    )
    io.observe(stage)

    cam = initial()
    apply()

    return () => {
      fly?.cancel()
      io.disconnect()
      stage.removeEventListener('pointerdown', onDown)
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerup', onEnd)
      stage.removeEventListener('pointercancel', onEnd)
      stage.removeEventListener('wheel', onWheel)
      stage.removeEventListener('click', onClickCapture, true)
      stage.removeEventListener('scroll', onScrollReset)
      stage.removeEventListener('focusin', onFocusIn)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const it = sel >= 0 ? ITEMS[sel] : null

  const onMiniDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    api.current.center(BX0 + ((e.clientX - r.left) / r.width) * BW, BY0 + ((e.clientY - r.top) / r.height) * BH)
  }

  return (
    <section id="work-index" aria-labelledby="index-heading" className="chapter wi scroll-mt-16">
      <a href="#work-index-end" className="wi-skip">Skip the work map</a>
      <div className={`wi-frame ${sel >= 0 ? 'is-open' : ''}`}>
        <div ref={stageRef} className={`wi-stage ${touchPan ? 'is-touch' : ''}`}>
          <div ref={worldRef} className="wi-world">
            {ZONES.map((z) => (
              <div key={z.t} className="wi-zone" aria-hidden="true" style={{ left: z.x, top: z.y, fontSize: 150 }}>{z.t}</div>
            ))}
            {ITEMS.map((o, i) => (
              <button
                key={o.id}
                type="button"
                data-i={i}
                className={`wi-item ${o.dark ? 'dark' : ''} ${o.paper ? 'paper' : ''}`}
                style={{ width: o.w, height: o.h, transform: `translate(${o.x}px,${o.y}px)` }}
                aria-pressed={sel === i}
                aria-label={`${o.title}. ${o.kind}`}
                onClick={() => api.current.select(i)}
              >
                {o.type === 'img' && (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={o.src} alt="" width={o.w} height={o.h} draggable={false} />
                    {o.w > 280 && <span className="wi-tag">{o.title}</span>}
                  </>
                )}
                {o.type === 'video' && (
                  <>
                    <video ref={videoRef} muted loop playsInline preload="metadata" poster={o.poster} src={o.src} />
                    <span className="wi-tag">{o.title}</span>
                  </>
                )}
                {o.type === 'stat' && (
                  <div className="wi-stat">
                    <span>{o.label}</span>
                    <b>{o.stat}</b>
                    <span>{o.sub}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="wi-hud">
          <p className="eyebrow wi-eyebrow">Work index</p>
          <h2 id="index-heading">The range of the work</h2>
          <p className="wi-lede">Structures, model training and delivery results. Drag to explore; select an item to see my contribution.</p>
          <div className="wi-ctl">
            <button type="button" onClick={() => api.current.overview()}>Overview</button>
            <button type="button" aria-label="Zoom in" onClick={() => api.current.zoom(1.3)}>+</button>
            <button type="button" aria-label="Zoom out" onClick={() => api.current.zoom(1 / 1.3)}>−</button>
            <button
              type="button"
              className="wi-touch"
              aria-pressed={touchPan}
              onClick={() => setTouchPan((v) => !v)}
              title="Off: swipes scroll the page. On: one finger moves the map."
            >
              {touchPan ? 'Map drag on' : 'Map drag off'}
            </button>
          </div>
          <ul className="wi-list">
            {ITEMS.map((o, i) => (
              <li key={o.id}>
                <button type="button" aria-pressed={sel === i} onClick={() => api.current.select(i)}>
                  {o.title}<em>{o.kind}</em>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {!hintGone && <div className="wi-hint">Drag to explore · ctrl + scroll zooms</div>}
        <div className="wi-mini" aria-hidden="true" onPointerDown={onMiniDown}>
          {ITEMS.map((o, i) => (
            <i
              key={o.id}
              className={sel === i ? 'on' : ''}
              style={{ left: `${((o.x - BX0) / BW) * 100}%`, top: `${((o.y - BY0) / BH) * 100}%`, width: `${(o.w / BW) * 100}%`, height: `${(o.h / BH) * 100}%` }}
            />
          ))}
          <b ref={vpRef} />
        </div>
        <div className={`wi-detail ${it ? 'on' : ''}`} role="region" aria-label="Selected work" aria-live="polite" {...(it ? {} : { inert: '' as unknown as boolean })}>
          <p className="eyebrow">{it?.kind}</p>
          <h3>{it?.title}</h3>
          <p>{it?.text}</p>
          <div className="wi-row">
            <button type="button" onClick={() => api.current.select((sel - 1 + ITEMS.length) % ITEMS.length)}>Previous</button>
            <button type="button" onClick={() => api.current.select((sel + 1) % ITEMS.length)}>Next</button>
            <button type="button" onClick={() => api.current.close()}>Close</button>
          </div>
        </div>
      </div>
      <span id="work-index-end" tabIndex={-1} />
    </section>
  )
}
