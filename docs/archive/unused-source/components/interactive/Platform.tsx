'use client'

import { useRef, useEffect } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface Particle {
  name: string
  size: number // nm
  color: string
}

const particles: Particle[] = [
  { name: 'Antibody (IgG)', size: 15, color: '#F97316' },
  { name: '20nm Platform', size: 20, color: '#22D3EE' },
  { name: 'AAV Capsid', size: 25, color: '#A78BFA' },
  { name: 'Conventional LNP', size: 80, color: '#94A3B8' },
]

function SizeChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }
    updateSize()
    window.addEventListener('resize', updateSize)

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)
      const centerY = rect.height / 2 - 10
      const minGap = 90 // keeps text labels from colliding
      const span = (s: number) => {
        let w = 0
        for (let i = 0; i < particles.length - 1; i++) {
          const a = (particles[i].size / 2) * s
          const b = (particles[i + 1].size / 2) * s
          w += Math.max(a + b + 14, minGap)
        }
        return w + (particles[0].size / 2) * s + (particles[particles.length - 1].size / 2) * s
      }
      let scale = 2.2
      while (scale > 0.8 && span(scale) > rect.width - 24) scale -= 0.1

      // Place circles left to right with radius-aware spacing, then center the row.
      const xs: number[] = []
      let cursor = (particles[0].size / 2) * scale
      xs.push(cursor)
      for (let i = 1; i < particles.length; i++) {
        const a = (particles[i - 1].size / 2) * scale
        const b = (particles[i].size / 2) * scale
        cursor += Math.max(a + b + 14, minGap)
        xs.push(cursor)
      }
      const offset = (rect.width - span(scale)) / 2

      particles.forEach((particle, i) => {
        const x = xs[i] + offset
        const radius = (particle.size / 2) * scale
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.name === '20nm Platform' ? 1 : 0.55
        ctx.beginPath()
        ctx.arc(x, centerY, radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1

        ctx.fillStyle = '#F8FAFC'
        ctx.font = 'bold 13px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(`${particle.size}nm`, x, centerY + radius + 22)
        ctx.fillStyle = '#94A3B8'
        ctx.font = '11px Inter, sans-serif'
        ctx.fillText(particle.name, x, centerY + radius + 40)
      })
    }
    draw()

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return <canvas ref={canvasRef} className="w-full h-[220px]" />
}

function ScaledBar({
  label,
  value,
  unit,
  color,
  max,
}: {
  label: string
  value: number
  unit: string
  color: string
  max: number
}) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-[#94A3B8]">{label}</span>
        <span className="font-mono text-[#F8FAFC]">
          {value}
          {unit}
        </span>
      </div>
      <div className="h-4 rounded-md bg-[#1E293B] overflow-hidden">
        <div
          className="h-full rounded-md"
          style={{ width: `${Math.max((value / max) * 100, 4)}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

export function Platform() {
  const containerRef = useScrollReveal()

  return (
    <section
      id="platform"
      className="bg-[#0F172A] py-20 md:py-32"
      aria-labelledby="platform-heading"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div ref={containerRef} className="space-y-10">
          <div data-reveal>
            <h2
              id="platform-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.15] mb-4"
            >
              Small enough to cross, proven that it works
            </h2>
            <p className="text-xl text-[#94A3B8] max-w-3xl">
              20nm, next to reference carriers &mdash; and the two validated results that follow from it.
            </p>
          </div>

          <div data-reveal className="grid md:grid-cols-[1.1fr_1fr] gap-6">
            <div className="border border-[#1E293B] bg-[#0B0E14] rounded-2xl p-6">
              <SizeChart />
            </div>
            <div className="border border-[#1E293B] bg-[#0B0E14] rounded-2xl p-6 flex flex-col justify-center gap-5">
              <ScaledBar label="BBB transcytosis, conventional LNP" value={1} unit="×" color="#334155" max={8} />
              <ScaledBar label="BBB transcytosis, 20nm platform" value={8} unit="×" color="#22D3EE" max={8} />
              <ScaledBar label="Brain accumulation, conventional LNP" value={1} unit="×" color="#334155" max={3.2} />
              <ScaledBar label="Brain accumulation, 20nm platform" value={3.2} unit="×" color="#F97316" max={3.2} />
            </div>
          </div>

          <p data-reveal className="text-[15px] leading-[1.7] text-[#94A3B8] border-l-2 border-[#F97316] pl-4 max-w-3xl">
            8× higher BBB crossing, 3.2-fold brain accumulation (p&lt;0.01), both vs. conventional LNPs. Working with Sirnaomics.
          </p>
        </div>
      </div>
    </section>
  )
}
