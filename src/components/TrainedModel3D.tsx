'use client'

import { useEffect, useRef } from 'react'

const BASE = '/jackieng-profile'

export function TrainedModel3D() {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !reduced) video.play().catch(() => {})
      else video.pause()
    }, { threshold: 0.2 })
    observer.observe(video)
    return () => { observer.disconnect(); video.pause() }
  }, [])

  return (
    <section id="ml-model" aria-labelledby="ml-heading" className="on-dark bg-deep px-6 py-16 text-cream md:px-12 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm text-orange-300">Demo model · Synthetic data · Not experimental results · Not the AtomBios model</p>
        <h2 id="ml-heading" className="font-heading text-4xl leading-tight md:text-6xl">What the model learned, in 3D.</h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/80">Particle size and ApoE density vary. Height shows the trained network’s predicted brain-targeting probability.</p>
        <video ref={ref} className="mt-8 aspect-video w-full rounded-xl bg-[#0B0E14]" src={`${BASE}/videos/ml-viz/decision-surface.mp4`} poster={`${BASE}/videos/ml-viz/decision-surface-poster.jpg`} controls loop muted playsInline preload="metadata" aria-label="3D decision surface from the trained synthetic-data network: particle size and ApoE density versus predicted brain-targeting probability" />
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-cream/75">Actual output of the 7-input, 16-hidden-unit, 4-output network trained on 1,600 synthetic formulations. This is a two-input slice; SORT lipid and PEG are held fixed. It visualizes the demo model, not experimental validation or the private AtomBios model.</p>
      </div>
    </section>
  )
}
