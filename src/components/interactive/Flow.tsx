'use client'

import { useEffect, useRef } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const basePath = '/jackieng-profile'

// One stage style for every step so the four artifacts read as one pipeline.
const STAGE =
  'w-full rounded-xl bg-[#0B0E14] border border-[#1E293B] overflow-hidden'

function Clip({
  src,
  poster,
  label,
  invert,
}: {
  src: string
  poster: string
  label: string
  invert?: boolean
}) {
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
    <div className={`${STAGE} aspect-video`}>
      <video
        ref={ref}
        className={`w-full h-full object-contain bg-transparent ${invert ? 'invert-render' : ''}`}
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={label}
      />
    </div>
  )
}

const tiles = [1, 2, 3, 4].map(
  (n) => `${basePath}/images/corona/class-${String(n).padStart(2, '0')}.png`
)

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
  const tone = simulated ? '#F97316' : '#22D3EE'
  return (
    <li data-reveal className="relative pl-12 pb-14 last:pb-0">
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border bg-[#0B0E14] text-xs font-mono"
        style={{ borderColor: tone, color: tone }}
      >
        {n}
      </span>
      <div className="flex items-baseline gap-3 mb-3">
        <h3 className="text-xl font-semibold text-[#F8FAFC]">{title}</h3>
        {simulated && (
          <span className="text-[11px] uppercase tracking-wide text-[#F97316]">
            Simulation
          </span>
        )}
      </div>
      {children}
      <p className="mt-3 text-sm text-[#94A3B8]">{caption}</p>
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
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div ref={containerRef}>
          <h2
            id="flow-heading"
            data-reveal
            className="text-4xl md:text-5xl font-bold tracking-tight text-[#F8FAFC] leading-[1.15] mb-12"
          >
            From cryo-EM to prediction
          </h2>

          <ol className="relative">
            {/* Spine: cyan (experimental) fading to orange (simulated) */}
            <span
              aria-hidden="true"
              className="absolute left-[13px] top-2 bottom-2 w-px"
              style={{
                background:
                  'linear-gradient(to bottom, #22D3EE 0%, #22D3EE 45%, #F97316 55%, #F97316 100%)',
                opacity: 0.45,
              }}
            />

            <Step n={1} title="Cryo-EM" caption="Real 2D class averages of the LNP corona protein complex (cryoSPARC J160).">
              <div className={`${STAGE} flex items-center justify-center p-4`}>
                <div className="grid grid-cols-4 gap-2 w-full">
                  {tiles.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt={`Cryo-EM 2D class average ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-square object-cover rounded-md bg-[#111827]"
                    />
                  ))}
                </div>
              </div>
            </Step>

            <Step n={2} title="3D structure" caption="Reconstructed density map with fitted atomic model.">
              <Clip
                src={`${basePath}/images/corona/map-model.mp4`}
                poster={`${basePath}/images/corona/map-model-poster.jpg`}
                label="Rotating cryo-EM density map with fitted atomic model"
                invert
              />
            </Step>

            <Step n={3} title="ML model" caption="A small network trained on synthetic formulations. It learns my rules, not biology." simulated>
              <Clip
                src={`${basePath}/videos/ml-viz/network-forward.mp4`}
                poster={`${basePath}/videos/ml-viz/network-forward-poster.jpg`}
                label="Animated diagram of the trained network propagating one formulation"
              />
            </Step>

            <Step n={4} title="Output" caption="Predicted brain-targeting probability across particle size and ApoE density." simulated>
              <Clip
                src={`${basePath}/videos/ml-viz/decision-surface.mp4`}
                poster={`${basePath}/videos/ml-viz/decision-surface-poster.jpg`}
                label="Rotating surface of predicted brain-targeting probability"
              />
            </Step>
          </ol>

          <p data-reveal className="mt-12 text-xs text-[#94A3B8] border-l-2 border-[#F97316] pl-4">
            Cyan is my experimental data. Orange is simulation: the model does not read the cryo-EM data yet. Connecting them with real proteomics and biodistribution data is the work ahead.
          </p>
        </div>
      </div>
    </section>
  )
}
