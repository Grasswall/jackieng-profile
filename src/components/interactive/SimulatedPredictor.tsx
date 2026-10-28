'use client'

import { useEffect, useRef } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const basePath = '/jackieng-profile'

// Both clips are pre-rendered Manim videos of the real trained SimulatedPredictor
// net (src/lib/formulationSim.ts): same seeded data, same 7-16-4 architecture,
// same Adam training loop, ported to Python and numerically verified against
// the live TS model (matching loss, weights and predictions) before rendering.
// Nothing here is a lookalike model or invented geometry.
function PrerenderedClip({
  src,
  poster,
  label,
}: {
  src: string
  poster: string
  label: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.pause()
      v.controls = true
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {
            v.controls = true
          })
        } else {
          v.pause()
        }
      },
      { threshold: 0.25 }
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
      className="w-full rounded-2xl bg-[#0B0E14] border border-[#1E293B]"
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

export function SimulatedPredictor() {
  const containerRef = useScrollReveal()

  return (
    <section
      id="simulation"
      className="bg-[#0F172A] py-20 md:py-32"
      aria-labelledby="sim-heading"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div ref={containerRef} className="space-y-8">
          <div data-reveal>
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium tracking-wide text-[#F97316] bg-[#F97316]/10 rounded-full border border-[#F97316]/20 mb-4">
              Simulation. Synthetic data. Not experimental results.
            </span>
            <h2
              id="sim-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.15] mb-4"
            >
              A formulation-to-organ model, shown computing
            </h2>
            <p className="text-xl text-[#94A3B8] max-w-3xl">
              A small neural network trained on 1,600 synthetic formulations
              (particle size, SORT lipid, ApoE density, PEG). The training
              labels come from a rule set I wrote. The model learns my rules,
              not biology.
            </p>
          </div>

          <div data-reveal className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-3">
              <PrerenderedClip
                src={`${basePath}/videos/ml-viz/network-forward.mp4`}
                poster={`${basePath}/videos/ml-viz/network-forward-poster.jpg`}
                label="Animated diagram of the trained network: structural inputs flowing through weighted connections to a predicted organ distribution"
              />
              <p className="text-sm text-[#64748B]">
                The real trained net (7 structural inputs, 16 hidden units, 4-way softmax), one preset propagating through it. Edge brightness is trained |weight|.
              </p>
            </div>
            <div className="space-y-3">
              <PrerenderedClip
                src={`${basePath}/videos/ml-viz/decision-surface.mp4`}
                poster={`${basePath}/videos/ml-viz/decision-surface-poster.jpg`}
                label="Rotating 3D surface of the trained network's predicted brain-targeting probability, swept over particle size and ApoE density"
              />
              <p className="text-sm text-[#64748B]">
                The same net&apos;s predicted brain-probability, swept over particle size and ApoE density (SORT lipid and PEG held fixed). A projection of a 7-input model, not a biological surface.
              </p>
            </div>
          </div>

          <p data-reveal className="text-xs text-[#64748B] border-l-2 border-[#F97316] pl-4 max-w-3xl">
            Brain is the rarest class in the training set (about 3% of
            examples) because my rules make it hard to reach. A real model
            needs real proteomics and biodistribution data. That is the
            dataset I want to build.
          </p>
        </div>
      </div>
    </section>
  )
}
