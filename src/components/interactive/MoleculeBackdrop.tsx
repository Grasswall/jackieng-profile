'use client'

import { useEffect, useRef } from 'react'
import structure from '@/data/apoe_1lpe_ca.json'

// Real C-alpha coordinates of human apolipoprotein E3 N-terminal domain,
// PDB 1LPE (Wilson et al., Science 1991, X-ray, 2.25 A). Coordinates are
// centred and scaled to a unit sphere by the build script. This is a
// published structure, not a structure from Jackie's own work.

const ca = structure.ca as number[][]

function rotate(p: number[], ay: number, ax: number): [number, number, number] {
  const [x, y, z] = p
  const cy = Math.cos(ay)
  const sy = Math.sin(ay)
  const x1 = x * cy + z * sy
  const z1 = -x * sy + z * cy
  const cx = Math.cos(ax)
  const sx = Math.sin(ax)
  const y2 = y * cx - z1 * sx
  const z2 = y * sx + z1 * cx
  return [x1, y2, z2]
}

export function MoleculeBackdrop({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let visible = true
    let angle = 0.6
    let w = 0
    let h = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const R = Math.min(w, h) * 0.42
      const cx = w / 2
      const cy = h / 2
      const pts = ca.map((p) => {
        const [x, y, z] = rotate(p, angle, 0.45)
        const persp = 1 / (1.9 - z * 0.6)
        return { x: cx + x * R * persp * 1.9, y: cy + y * R * persp * 1.9, z, s: persp }
      })

      ctx.lineCap = 'round'
      const n = pts.length
      // Backbone segments, back to front
      const order = Array.from({ length: n - 1 }, (_, i) => i).sort(
        (a, b) => pts[a].z + pts[a + 1].z - (pts[b].z + pts[b + 1].z)
      )
      for (const i of order) {
        const a = pts[i]
        const b = pts[i + 1]
        const depth = (a.z + b.z) / 2 // -1 back, +1 front
        const t = i / (n - 2)
        // cyan -> orange along the chain, N to C terminus
        const r = Math.round(34 + (249 - 34) * t)
        const g = Math.round(211 + (115 - 211) * t)
        const bl = Math.round(238 + (22 - 238) * t)
        ctx.strokeStyle = `rgba(${r},${g},${bl},${0.25 + 0.6 * (depth + 1) / 2})`
        ctx.lineWidth = (1.2 + 3.2 * (depth + 1) / 2) * ((a.s + b.s) / 2) * 1.6
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
      // C-alpha atoms
      const atoms = pts.map((p, i) => ({ p, i })).sort((a, b) => a.p.z - b.p.z)
      for (const { p, i } of atoms) {
        const t = i / (n - 1)
        const r = Math.round(34 + (249 - 34) * t)
        const g = Math.round(211 + (115 - 211) * t)
        const bl = Math.round(238 + (22 - 238) * t)
        ctx.fillStyle = `rgba(${r},${g},${bl},${0.35 + 0.6 * (p.z + 1) / 2})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, (1.4 + 2.6 * (p.z + 1) / 2) * p.s * 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = () => {
      if (visible) {
        angle += 0.0025
        draw()
      }
      raf = requestAnimationFrame(loop)
    }

    resize()
    draw()
    if (!reduced) raf = requestAnimationFrame(loop)

    const ro = new ResizeObserver(() => {
      resize()
      draw()
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
    })
    io.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label="Rotating C-alpha backbone of human apolipoprotein E3 N-terminal domain, PDB entry 1LPE"
    />
  )
}
