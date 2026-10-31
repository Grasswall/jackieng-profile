'use client'

import { useEffect, useRef, useState } from 'react'
import { BASE, clamp, isPhone, tween, type Tween } from './motionUtils'

// Natural size of suzhou-pitch.jpg. u,v are fractions of the photo, placed by
// inspecting the image. Every figure is verified (data/meta.json, cv/source.yaml).
const IW = 2000
const IH = 1356
const PHOTO = `${BASE}/images/gallery/suzhou-pitch.jpg`

const SPOTS = [
  { label: 'Company', u: 0.355, v: 0.195, eyebrow: 'The company', stat: 'HK$7.05M', unit: 'funded', note: 'AtomBios, HKSTP incubated. Pitched at the WIN in Suzhou Global Finals, 2026.' },
  { label: 'Barrier', u: 0.65, v: 0.46, eyebrow: 'The barrier on the slide', stat: '8×', unit: 'higher BBB crossing', note: 'With 20 nm particles, versus conventional LNPs. The blood-brain barrier blocks most nanoparticle formulations.' },
  { label: 'Particle', u: 0.583, v: 0.365, eyebrow: 'The particle', stat: '3.2×', unit: 'brain accumulation', note: 'Versus conventional LNPs, which at 80–100 nm are too large for efficient transcytosis.' },
  { label: 'Founder', u: 0.55, v: 0.43, eyebrow: 'The founder', stat: '2.7 Å', unit: 'best of five cryo-EM structures', note: 'I solve cryo-EM structures and train ML models for LNP design. Structural biologist, PolyU PhD student and founder of AtomBios.' },
] as const

interface Layout {
  w: number
  h: number
  dw: number
  dh: number
  ox: number
  oy: number
}

export function FounderLens() {
  const boxRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const lensRef = useRef<HTMLDivElement>(null)
  const lensImgRef = useRef<HTMLImageElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const api = useRef<{ select: (i: number, move: boolean) => void }>({ select: () => {} })
  const [active, setActive] = useState(0)
  const [dims, setDims] = useState<Layout | null>(null)

  useEffect(() => {
    const box = boxRef.current
    const img = imgRef.current
    const lens = lensRef.current
    const li = lensImgRef.current
    const hint = hintRef.current
    if (!box || !img || !lens || !li || !hint) return

    let L: Layout = { w: 1, h: 1, dw: 1, dh: 1, ox: 0, oy: 0 }
    let R = 120
    let Z = 2.1
    const pos = { u: SPOTS[0].u as number, v: SPOTS[0].v as number }
    let current = -1
    let anim: Tween | null = null
    let drag: { id: number; off: { x: number; y: number } } | null = null

    const render = () => {
      const cx = L.ox + pos.u * L.dw
      const cy = L.oy + pos.v * L.dh
      lens.style.transform = `translate3d(${cx - R}px,${cy - R}px,0)`
      li.style.left = R - pos.u * L.dw * Z + 'px'
      li.style.top = R - pos.v * L.dh * Z + 'px'
      box.style.setProperty('--lx', cx + 'px')
      box.style.setProperty('--ly', cy + 'px')
      box.style.setProperty('--lr', R + 'px')
    }

    const layout = () => {
      const w = box.clientWidth
      const h = box.clientHeight
      const ph = isPhone()
      const sc = Math.max(w / IW, h / IH)
      const dw = IW * sc
      const dh = IH * sc
      const fx = ph ? 0.5 : 0.56
      const fy = ph ? 0.45 : 0.42
      const ox = clamp(w / 2 - fx * dw, w - dw, 0)
      const oy = clamp(h / 2 - fy * dh, h - dh, 0)
      L = { w, h, dw, dh, ox, oy }
      Object.assign(img.style, { left: ox + 'px', top: oy + 'px', width: dw + 'px', height: dh + 'px' })
      R = ph ? 64 : Math.round(clamp(w * 0.09, 100, 138))
      Z = ph ? 2.4 : 2.1
      lens.style.width = lens.style.height = 2 * R + 'px'
      li.style.width = dw * Z + 'px'
      li.style.height = dh * Z + 'px'
      setDims(L)
      render()
    }

    const moveTo = (u: number, v: number) => {
      anim?.cancel()
      const f = { u: pos.u, v: pos.v }
      anim = tween(560, (k) => {
        pos.u = f.u + (u - f.u) * k
        pos.v = f.v + (v - f.v) * k
        render()
      })
    }

    const select = (i: number, move: boolean) => {
      if (i !== current) {
        current = i
        setActive(i)
      }
      if (move) moveTo(SPOTS[i].u, SPOTS[i].v)
    }
    api.current = { select }

    const nearest = (maxR: number) => {
      const cx = L.ox + pos.u * L.dw
      const cy = L.oy + pos.v * L.dh
      let best = -1
      let bd = maxR
      SPOTS.forEach((s, i) => {
        const d = Math.hypot(L.ox + s.u * L.dw - cx, L.oy + s.v * L.dh - cy)
        if (d < bd) {
          bd = d
          best = i
        }
      })
      return best
    }

    const setFromPoint = (x: number, y: number, off: { x: number; y: number }) => {
      const r = box.getBoundingClientRect()
      const cx = clamp(x - r.left + off.x, 0, L.w)
      const cy = clamp(y - r.top + off.y, 0, L.h)
      pos.u = clamp((cx - L.ox) / L.dw, 0, 1)
      pos.v = clamp((cy - L.oy) / L.dh, 0, 1)
      render()
    }

    const onDown = (e: PointerEvent) => {
      if (e.button > 0) return
      const target = e.target as Element
      if (target.closest('.lens-spot')) return
      const onLens = lens.contains(target)
      // Touch: only the lens itself drags, so the rest of the photo still scrolls the page.
      if (e.pointerType === 'touch' && !onLens) return
      anim?.cancel()
      const r = box.getBoundingClientRect()
      const cx = r.left + L.ox + pos.u * L.dw
      const cy = r.top + L.oy + pos.v * L.dh
      const off = onLens ? { x: cx - e.clientX, y: cy - e.clientY } : { x: 0, y: 0 }
      drag = { id: e.pointerId, off }
      box.setPointerCapture(e.pointerId)
      lens.classList.add('is-drag')
      setFromPoint(e.clientX, e.clientY, off)
      hint.style.opacity = '0'
      const n = nearest(R * 0.75)
      if (n >= 0) select(n, false)
    }
    const onMove = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return
      setFromPoint(e.clientX, e.clientY, drag.off)
      const n = nearest(R * 0.75)
      if (n >= 0) select(n, false)
    }
    const onEnd = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return
      drag = null
      lens.classList.remove('is-drag')
      const n = nearest(R * 1.15)
      if (n >= 0) select(n, true)
    }
    const onKey = (e: KeyboardEvent) => {
      const step = 0.03
      const m = ({ ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] } as Record<string, number[]>)[e.key]
      if (!m) return
      e.preventDefault()
      anim?.cancel()
      pos.u = clamp(pos.u + m[0], 0, 1)
      pos.v = clamp(pos.v + m[1], 0, 1)
      render()
      const n = nearest(R * 0.75)
      if (n >= 0) select(n, false)
      hint.style.opacity = '0'
    }

    const noDrag = (e: Event) => e.preventDefault()
    box.addEventListener('dragstart', noDrag)
    box.addEventListener('pointerdown', onDown)
    box.addEventListener('pointermove', onMove)
    box.addEventListener('pointerup', onEnd)
    box.addEventListener('pointercancel', onEnd)
    lens.addEventListener('keydown', onKey)
    const ro = new ResizeObserver(layout)
    ro.observe(box)
    layout()
    select(0, false)

    return () => {
      anim?.cancel()
      ro.disconnect()
      box.removeEventListener('dragstart', noDrag)
      box.removeEventListener('pointerdown', onDown)
      box.removeEventListener('pointermove', onMove)
      box.removeEventListener('pointerup', onEnd)
      box.removeEventListener('pointercancel', onEnd)
      lens.removeEventListener('keydown', onKey)
    }
  }, [])

  const s = SPOTS[active]

  return (
    <section id="founder" aria-labelledby="founder-heading" className="chapter lens on-dark scroll-mt-16">
      <div className="lens-stage">
        <div ref={boxRef} className="lens-box">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            className="lens-img"
            src={PHOTO}
            width={IW}
            height={IH}
            alt="Jackie Ng pitching AtomBios at the WIN in Suzhou Global Entrepreneurship Competition finals, in front of a slide showing the blood-brain barrier problem"
          />
          <div className="lens-scrim" />
          <div className="lens-fade" />
          {dims &&
            SPOTS.map((sp, i) => (
              <button
                key={sp.label}
                type="button"
                className="lens-spot"
                aria-pressed={active === i}
                aria-label={`${sp.label}: ${sp.stat} ${sp.unit}`}
                style={{ left: dims.ox + sp.u * dims.dw, top: dims.oy + sp.v * dims.dh }}
                onClick={() => api.current.select(i, true)}
              >
                <i />
              </button>
            ))}
          <div
            ref={lensRef}
            className="lens-lens"
            tabIndex={0}
            role="group"
            aria-label="Work lens. Drag it over the photo, or use the arrow keys."
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={lensImgRef} src={PHOTO} alt="" />
          </div>
        </div>
        <div ref={hintRef} className="lens-hint">Drag the lens across the photo</div>
        <div className="lens-head">
          <p className="eyebrow">Jackie Ng · Structural biologist · ML practitioner · Founder</p>
          <h2 id="founder-heading">I train ML for LNP design.</h2>
          <p className="lens-sub">I solve cryo-EM structures, train machine-learning models and apply both to lipid nanoparticle design at AtomBios.</p>
        </div>
      </div>
      <div className="lens-side">
        <div key={active} className="lens-card" aria-live="polite">
          <p className="eyebrow">{s.eyebrow}</p>
          <div className="lens-sb">
            <div className="lens-stat">{s.stat}</div>
            <div className="lens-unit">{s.unit}</div>
          </div>
          <p className="lens-note">{s.note}</p>
        </div>
        <div className="lens-pager" role="group" aria-label="Points on the photo">
          {SPOTS.map((sp, i) => (
            <button key={sp.label} type="button" aria-pressed={active === i} onClick={() => api.current.select(i, true)}>
              <span>{i + 1}</span>
              {sp.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
