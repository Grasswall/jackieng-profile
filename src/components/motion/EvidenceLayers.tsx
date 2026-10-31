'use client'

import { useEffect, useRef, useState } from 'react'
import { BASE, clamp, prefersReducedMotion, tween, type Tween } from './motionUtils'

// Draggable evidence layers. One pinned stage: scroll moves the wipe, and so
// does dragging the screen or the rail, or the arrow keys on the slider.
// Every figure here already appears elsewhere on the site (data/meta.json).
const NAMES = ['Cryo-EM', 'Structure', 'Results'] as const
const N = NAMES.length
const STICKY_RUN = 90 // svh of scroll per layer step

export function EvidenceLayers() {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const layers = useRef<(HTMLDivElement | null)[]>([])
  const inners = useRef<(HTMLDivElement | null)[]>([])
  const seam = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const thumb = useRef<HTMLDivElement>(null)
  const fill = useRef<HTMLDivElement>(null)
  const hint = useRef<HTMLDivElement>(null)
  const vid = useRef<HTMLVideoElement>(null)
  const api = useRef<{ goTo: (i: number) => void; step: (d: number) => void }>({ goTo: () => {}, step: () => {} })
  const [idx, setIdx] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const section = root.current
    const st = stage.current
    const tr = track.current
    const th = thumb.current
    const fl = fill.current
    const sm = seam.current
    const video = vid.current
    if (!section || !st || !tr || !th || !fl || !sm) return
    setReduced(prefersReducedMotion())

    let p = 0
    let tw: Tween | null = null
    let interacting = false
    let inView = false
    let raf = 0
    let drag: { id: number; x0: number; p0: number; samples: [number, number][]; rail?: boolean } | null = null

    const syncVideo = (i: number) => {
      if (!video) return
      if (prefersReducedMotion() || !inView || i !== 1) video.pause()
      else video.play().catch(() => {})
    }

    const render = () => {
      const rm = prefersReducedMotion()
      if (rm) {
        // Stacked fallback: every layer stays visible, no inline wipe state.
        layers.current.forEach((l) => {
          if (!l) return
          l.style.clipPath = ''
          l.style.visibility = ''
          l.removeAttribute('aria-hidden')
        })
        inners.current.forEach((n) => n && (n.style.transform = ''))
        syncVideo(0)
        return
      }
      layers.current.forEach((l, i) => {
        if (!l) return
        const t = i === 0 ? 1 : clamp(p - (i - 1), 0, 1)
        const nt = i < N - 1 ? clamp(p - i, 0, 1) : 0
        l.style.clipPath = `inset(0 0 0 ${(1 - t) * 100}%)`
        l.style.visibility = t > 0 ? 'visible' : 'hidden'
        const inner = inners.current[i]
        if (inner) inner.style.transform = `translate3d(${(1 - t) * 14 - nt * 10}%,0,0)`
      })
      const f = p - Math.floor(p)
      sm.style.left = (1 - f) * 100 + '%'
      sm.style.opacity = f > 0.002 && p < N - 1 ? '0.8' : '0'
      const frac = p / (N - 1)
      th.style.left = `calc(12px + (100% - 24px) * ${frac})`
      fl.style.width = `calc((100% - 24px) * ${frac})`
      const i = Math.round(p)
      layers.current.forEach((l, j) => l?.setAttribute('aria-hidden', j === i ? 'false' : 'true'))
      setIdx(i)
      syncVideo(i)
    }

    // Scroll position that parks the stage on layer i.
    const scrollFor = (i: number) => {
      const top = section.getBoundingClientRect().top + window.scrollY
      const run = section.offsetHeight - window.innerHeight
      return top + (i / (N - 1)) * run
    }
    const pFromScroll = () => {
      const r = section.getBoundingClientRect()
      const run = Math.max(1, section.offsetHeight - window.innerHeight)
      return clamp(-r.top / run, 0, 1) * (N - 1)
    }

    const onScroll = () => {
      if (interacting || raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        if (interacting) return
        p = pFromScroll()
        render()
      })
    }

    const goTo = (i: number) => {
      i = clamp(i, 0, N - 1)
      tw?.cancel()
      interacting = true
      const from = p
      tw = tween(
        720,
        (k) => {
          p = from + (i - from) * k
          render()
        },
        () => {
          // Park the page scroll on the chosen layer so scroll and drag agree.
          interacting = false
          if (!prefersReducedMotion()) window.scrollTo({ top: scrollFor(i), behavior: 'auto' })
        }
      )
    }
    const step = (d: number) => goTo(Math.round(p) + d)
    api.current = { goTo, step }

    // Drag the screen. Touch keeps vertical swipes for page scroll (touch-action: pan-y).
    const onDown = (e: PointerEvent) => {
      if (e.button > 0 || prefersReducedMotion()) return
      tw?.cancel()
      interacting = true
      drag = { id: e.pointerId, x0: e.clientX, p0: p, samples: [[performance.now(), p]] }
      st.setPointerCapture(e.pointerId)
      st.classList.add('is-drag')
      if (hint.current) hint.current.style.opacity = '0'
    }
    const onMove = (e: PointerEvent) => {
      if (!drag || drag.rail || e.pointerId !== drag.id) return
      p = clamp(drag.p0 - ((e.clientX - drag.x0) / (window.innerWidth * 0.85)) * (N > 1 ? 1 : 0), 0, N - 1)
      const now = performance.now()
      drag.samples.push([now, p])
      while (drag.samples.length > 2 && now - drag.samples[0][0] > 90) drag.samples.shift()
      render()
    }
    const onEnd = (e: PointerEvent) => {
      if (!drag || drag.rail || e.pointerId !== drag.id) return
      const s = drag.samples
      const a = s[0]
      const b = s[s.length - 1]
      const v = b[0] > a[0] ? (b[1] - a[1]) / (b[0] - a[0]) : 0
      drag = null
      st.classList.remove('is-drag')
      goTo(Math.round(p + clamp(v * 200, -1, 1)))
    }

    // Drag the rail.
    const pFromRail = (x: number) => {
      const r = tr.getBoundingClientRect()
      return clamp((x - r.left - 12) / (r.width - 24), 0, 1) * (N - 1)
    }
    const onRailDown = (e: PointerEvent) => {
      if (e.button > 0 || prefersReducedMotion()) return
      tw?.cancel()
      interacting = true
      drag = { id: e.pointerId, x0: 0, p0: p, samples: [], rail: true }
      tr.setPointerCapture(e.pointerId)
      p = pFromRail(e.clientX)
      render()
      if (hint.current) hint.current.style.opacity = '0'
    }
    const onRailMove = (e: PointerEvent) => {
      if (drag?.rail && e.pointerId === drag.id) {
        p = pFromRail(e.clientX)
        render()
      }
    }
    const onRailEnd = (e: PointerEvent) => {
      if (drag?.rail && e.pointerId === drag.id) {
        drag = null
        goTo(Math.round(p))
      }
    }

    const onKey = (e: KeyboardEvent) => {
      const k = e.key
      if (k === 'ArrowRight' || k === 'ArrowUp') { e.preventDefault(); step(1) }
      else if (k === 'ArrowLeft' || k === 'ArrowDown') { e.preventDefault(); step(-1) }
      else if (k === 'Home') { e.preventDefault(); goTo(0) }
      else if (k === 'End') { e.preventDefault(); goTo(N - 1) }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        syncVideo(Math.round(p))
      },
      { threshold: 0.1 }
    )
    io.observe(section)

    st.addEventListener('pointerdown', onDown)
    st.addEventListener('pointermove', onMove)
    st.addEventListener('pointerup', onEnd)
    st.addEventListener('pointercancel', onEnd)
    tr.addEventListener('pointerdown', onRailDown)
    tr.addEventListener('pointermove', onRailMove)
    tr.addEventListener('pointerup', onRailEnd)
    tr.addEventListener('pointercancel', onRailEnd)
    th.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    p = pFromScroll()
    render()

    return () => {
      tw?.cancel()
      cancelAnimationFrame(raf)
      io.disconnect()
      st.removeEventListener('pointerdown', onDown)
      st.removeEventListener('pointermove', onMove)
      st.removeEventListener('pointerup', onEnd)
      st.removeEventListener('pointercancel', onEnd)
      tr.removeEventListener('pointerdown', onRailDown)
      tr.removeEventListener('pointermove', onRailMove)
      tr.removeEventListener('pointerup', onRailEnd)
      tr.removeEventListener('pointercancel', onRailEnd)
      th.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const setLayer = (i: number) => (el: HTMLDivElement | null) => {
    layers.current[i] = el
  }
  const setInner = (i: number) => (el: HTMLDivElement | null) => {
    inners.current[i] = el
  }

  return (
    <section
      ref={root}
      id="evidence"
      aria-labelledby="evidence-heading"
      className="chapter ev on-dark scroll-mt-0"
      style={{ height: `calc(100svh + ${(N - 1) * STICKY_RUN}svh)` }}
    >
      <div className="ev-sticky">
        <h2 id="evidence-heading" className="sr-only">Evidence I can show</h2>
        <div ref={stage} className="ev-stage">
          {/* Layer 1: cryo-EM class averages */}
          <div ref={setLayer(0)} className="ev-layer ev0">
            <div ref={setInner(0)} className="ev-inner">
              <div className="ev-grid">
                {Array.from({ length: 10 }, (_, i) => {
                  const n = String(i + 1).padStart(2, '0')
                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={n}
                      src={`${BASE}/images/corona/class-${n}.png`}
                      alt={`Cryo-EM 2D class average ${i + 1} of 10`}
                      loading="lazy"
                      width={231}
                      height={231}
                      draggable={false}
                    />
                  )
                })}
              </div>
            </div>
            <div className="ev-cap ev-dark">
              <p className="eyebrow">Evidence · Cryo-EM</p>
              <h3>Real 2D class averages.</h3>
              <p>
                Real class averages of the LNP corona protein complex. Separately: five cryo-EM structures solved, best at 2.7 Å.
              </p>
            </div>
          </div>

          {/* Layer 2: density map + model */}
          <div ref={setLayer(1)} className="ev-layer ev1">
            <div ref={setInner(1)} className="ev-inner">
              <div className="ev-vid">
                <video
                  ref={vid}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  controls={reduced}
                  poster={`${BASE}/images/corona/map-model-poster.jpg`}
                  aria-label="Rotating cryo-EM density map with fitted atomic model"
                >
                  <source src={`${BASE}/images/corona/map-model.mp4`} type="video/mp4" />
                </video>
              </div>
            </div>
            <div className="ev-cap ev-light">
              <p className="eyebrow ev-eyebrow-light">Evidence · Structure</p>
              <h3>The structure, in three dimensions.</h3>
              <p>Rotating cryo-EM density map with fitted atomic model. A direct view of the structural work.</p>
            </div>
          </div>

          {/* Layer 3: reported results */}
          <div ref={setLayer(2)} className="ev-layer ev2">
            <div ref={setInner(2)} className="ev-inner" />
            <div className="ev-cap ev-dark">
              <p className="eyebrow">Reported results · 20 nm platform</p>
              <h3>Measured against conventional LNPs.</h3>
              <p>Team preclinical results for the AtomBios platform, each versus conventional LNPs. Not clinical efficacy.</p>
            </div>
            <div className="ev-stats ev-dark">
              <div><b>8×</b><span>BBB transcytosis</span></div>
              <div><b>3.2×</b><span>brain accumulation</span></div>
              <div><b>HK$7.05M</b><span>funding for AtomBios</span></div>
            </div>
          </div>
          <div ref={seam} className="ev-seam" />
        </div>

        <div ref={hint} className="ev-hint">Scroll, or drag the screen or the rail</div>
        <div className="ev-rail">
          <div ref={track} className="ev-track">
            <div ref={fill} className="ev-fill" />
            <div className="ev-stops" aria-hidden="true">
              {NAMES.map((n) => (
                <span key={n}><i /></span>
              ))}
            </div>
            <div
              ref={thumb}
              className="ev-thumb"
              tabIndex={0}
              role="slider"
              aria-label="Evidence layer"
              aria-valuemin={1}
              aria-valuemax={N}
              aria-valuenow={idx + 1}
              aria-valuetext={`${idx + 1} of ${N}, ${NAMES[idx]}`}
            >
              {idx + 1}
            </div>
          </div>
          <div className="ev-labels">
            {NAMES.map((n, i) => (
              <button key={n} type="button" aria-current={i === idx ? 'true' : 'false'} onClick={() => api.current.goTo(i)}>
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
