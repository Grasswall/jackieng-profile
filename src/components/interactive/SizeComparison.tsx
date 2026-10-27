'use client'

import { useRef, useEffect, useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface Particle {
  name: string
  size: number // nm
  color: string
  description: string
}

const particles: Particle[] = [
  {
    name: '20nm Platform',
    size: 20,
    color: '#22D3EE',
    description: 'AtomBios nanoliposome — optimized for BBB transcytosis',
  },
  {
    name: 'Conventional LNP',
    size: 80,
    color: '#94A3B8',
    description: 'Standard lipid nanoparticle (liver-targeted)',
  },
  {
    name: 'Antibody (IgG)',
    size: 15,
    color: '#F97316',
    description: '~150 kDa, 10-15nm diameter',
  },
  {
    name: 'AAV Capsid',
    size: 25,
    color: '#A78BFA',
    description: 'Adeno-associated virus vector',
  },
]

const BBB_PORE_SIZE = 8 // nm, tight junction effective size

export function SizeComparison() {
  const containerRef = useScrollReveal()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedParticle, setSelectedParticle] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
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

    let animationFrame: number
    let rotation = 0 // eslint-disable-line @typescript-eslint/no-unused-vars

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      const centerY = rect.height / 2
      const scale = 3 // pixels per nm

      // Draw BBB pore reference line
      ctx.strokeStyle = '#F97316'
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      const poreY = centerY - BBB_PORE_SIZE * scale
      ctx.beginPath()
      ctx.moveTo(0, poreY)
      ctx.lineTo(rect.width, poreY)
      ctx.stroke()
      ctx.setLineDash([])

      ctx.fillStyle = '#F97316'
      ctx.font = '12px Inter, sans-serif'
      ctx.fillText('BBB pore size (~8nm)', 10, poreY - 10)

      // Draw particles
      const spacing = rect.width / (particles.length + 1)

      particles.forEach((particle, i) => {
        const x = spacing * (i + 1)
        const radius = (particle.size / 2) * scale
        const isSelected = i === selectedParticle
        const isHovered = i === hoveredIndex

        // Glow effect for selected/hovered
        if (isSelected || isHovered) {
          ctx.shadowBlur = 20
          ctx.shadowColor = particle.color
        }

        // Draw particle
        ctx.fillStyle = particle.color
        ctx.globalAlpha = isSelected || isHovered ? 1 : 0.6
        ctx.beginPath()
        ctx.arc(x, centerY, radius, 0, Math.PI * 2)
        ctx.fill()

        // Reset shadow
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1

        // Draw size label
        ctx.fillStyle = '#F8FAFC'
        ctx.font = 'bold 14px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(`${particle.size}nm`, x, centerY + radius + 25)

        // Draw name
        ctx.fillStyle = '#94A3B8'
        ctx.font = '12px Inter, sans-serif'
        ctx.fillText(particle.name, x, centerY + radius + 45)
      })

      rotation += 0.01
      // Used for future 3D rotation animation
      animationFrame = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', updateSize)
    }
  }, [selectedParticle, hoveredIndex])

  return (
    <section
      id="size-comparison"
      className="bg-[#0F172A] py-20 md:py-32"
      aria-labelledby="size-heading"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div ref={containerRef} className="space-y-12">
          <div data-reveal>
            <h2
              id="size-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.15] mb-4"
            >
              Size Matters for BBB Crossing
            </h2>
            <p className="text-xl text-[#94A3B8] max-w-3xl">
              Tight junctions at the blood-brain barrier limit transcytosis to
              particles below ~10nm effective diameter. Conventional LNPs
              (80-100nm) are trapped. Our 20nm platform is small enough to cross
              while remaining stable.
            </p>
          </div>

          <div
            data-reveal
            className="border border-[#1E293B] bg-[#0B0E14] rounded-2xl p-8"
          >
            <canvas
              ref={canvasRef}
              className="w-full h-[400px] cursor-pointer"
              onClick={(e) => {
                const rect = canvasRef.current?.getBoundingClientRect()
                if (!rect) return
                const x = e.clientX - rect.left
                const spacing = rect.width / (particles.length + 1)
                const clickedIndex = Math.floor(x / spacing)
                if (clickedIndex >= 0 && clickedIndex < particles.length) {
                  setSelectedParticle(clickedIndex)
                }
              }}
              onMouseMove={(e) => {
                const rect = canvasRef.current?.getBoundingClientRect()
                if (!rect) return
                const x = e.clientX - rect.left
                const spacing = rect.width / (particles.length + 1)
                const hoveredIdx = Math.floor(x / spacing)
                if (hoveredIdx >= 0 && hoveredIdx < particles.length) {
                  setHoveredIndex(hoveredIdx)
                } else {
                  setHoveredIndex(null)
                }
              }}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          </div>

          <div
            data-reveal
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {particles.map((particle, i) => (
              <button
                key={particle.name}
                onClick={() => setSelectedParticle(i)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`text-left p-6 rounded-xl transition-all duration-200 ${
                  selectedParticle === i
                    ? 'bg-[#0B0E14] border-2 border-[#22D3EE]'
                    : 'bg-[#1E293B] border-2 border-transparent hover:border-[#334155]'
                }`}
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: particle.color }}
                  />
                  <span className="text-lg font-semibold text-[#F8FAFC]">
                    {particle.name}
                  </span>
                </div>
                <p className="text-2xl font-bold text-[#22D3EE] mb-2">
                  {particle.size}nm
                </p>
                <p className="text-sm text-[#94A3B8] leading-[1.6]">
                  {particle.description}
                </p>
              </button>
            ))}
          </div>

          <div
            data-reveal
            className="border border-[#22D3EE]/20 bg-[#22D3EE]/5 rounded-xl p-6"
          >
            <p className="text-[15px] leading-[1.7] text-[#94A3B8]">
              <span className="font-semibold text-[#22D3EE]">Key insight:</span>{' '}
              Size reduction from 80nm → 20nm enables 8× higher BBB transcytosis
              and 3.2-fold brain accumulation (p&lt;0.01). Below immune
              surveillance thresholds while maintaining stability and cargo
              capacity.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
