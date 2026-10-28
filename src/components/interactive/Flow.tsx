'use client'

import { useEffect, useRef } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const basePath = '/jackieng-profile'

function Clip({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.pause()
      v.controls = true
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => { v.controls = true })
        else v.pause()
      },
      { threshold: 0.25 }
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])
  return (
    <video
      ref={ref}
      className="w-full aspect-video object-contain rounded-xl bg-[#0B0E14] border border-[#1E293B]"
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={label}
    />
  )
}

const tiles = [1, 2, 3, 4].map((n) => {
  const id = String(n).padStart(2, '0')
  return `${basePath}/images/corona/class-${id}.png`
})

function Step({
  n,
  title,
  caption,
  simulated,
  children,
}: {
  n: number
  title: string
  caption: string
  simulated?: boolean
  children: React.ReactNode
}) {
  return (
    <li data-reveal className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-[#22D3EE]">0{n}</span>
        <h3 className="text-lg font-semibold text-[#F8FAFC]">{title}</h3>
        {simulated && (
          <span className="ml-auto text-[10px] uppercase tracking-wide text-[#F97316] border border-[#F97316]/30 rounded-full px-2 py-0.5">
            Simulation
          </span>
        )}
      </div>
      {children}
      <p className="text-sm text-[#94A3B8]">{caption}</p>
    </li>
  )
}

export function Flow() {
  const containerRef = useScrollReveal()
  return (
    <section
      id="flow"
      className="bg-[#0B0E14] py-20 md:py-28"
      aria-labelledby="flow-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={containerRef} className="space-y-10">
          <h2
            id="flow-heading"
            data-reveal
            className="text-4xl md:text-5xl font-bold tracking-tight text-[#F8FAFC] leading-[1.15]"
          >
            From cryo-EM to prediction
          </h2>

          <ol className="grid gap-10 md:grid-cols-2 max-w-5xl">
            <Step n={1} title="Cryo-EM" caption="Real 2D class averages of the LNP corona protein complex (cryoSPARC J160).">
              <div className="h-full aspect-video grid grid-cols-2 grid-rows-2 gap-1.5 p-2 rounded-xl border border-[#1E293B] bg-[#0B0E14]">
                {tiles.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Cryo-EM 2D class average ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover rounded-md bg-[#111827]"
                  />
                ))}
              </div>
            </Step>

            <Step n={2} title="3D structure" caption="Reconstructed density map with fitted atomic model.">
              <Clip
                src={`${basePath}/images/corona/map-model.mp4`}
                poster={`${basePath}/images/corona/map-model-poster.jpg`}
                label="Rotating cryo-EM density map with fitted atomic model"
              />
            </Step>

            <Step n={3} title="ML model" caption="Small network on synthetic formulations. It learns my rules, not biology." simulated>
              <Clip
                src={`${basePath}/videos/ml-viz/network-forward.mp4`}
                poster={`${basePath}/videos/ml-viz/network-forward-poster.jpg`}
                label="Animated diagram of the trained network propagating one formulation"
              />
            </Step>

            <Step n={4} title="Output" caption="Predicted brain-targeting probability across size and ApoE density." simulated>
              <Clip
                src={`${basePath}/videos/ml-viz/decision-surface.mp4`}
                poster={`${basePath}/videos/ml-viz/decision-surface-poster.jpg`}
                label="Rotating surface of predicted brain-targeting probability"
              />
            </Step>
          </ol>

          <p data-reveal className="text-xs text-[#64748B] border-l-2 border-[#F97316] pl-4 max-w-3xl">
            Steps 1 and 2 are my experimental data. Steps 3 and 4 are a simulation: the model does not read the cryo-EM data yet. Connecting the two with real proteomics and biodistribution data is the work ahead.
          </p>
        </div>
      </div>
    </section>
  )
}
