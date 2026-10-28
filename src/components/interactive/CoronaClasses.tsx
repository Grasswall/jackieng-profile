'use client'

import { useEffect, useRef } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const basePath = '/jackieng-profile'

// Tiles are crops of Jackie's own cryoSPARC 2D classification montage
// (job J160, iteration 20). Each tile carries its own particle count and
// resolution label from the software, so no numbers are retyped here.
const TILE_COUNT = 10

const tiles = Array.from({ length: TILE_COUNT }, (_, i) => {
  const n = String(i + 1).padStart(2, '0')
  return {
    src: `${basePath}/images/corona/class-${n}.png`,
    alt: `Cryo-EM 2D class average ${i + 1} of ${TILE_COUNT}, with particle count and resolution label`,
  }
})

export function CoronaClasses() {
  const containerRef = useScrollReveal()
  const videoRef = useRef<HTMLVideoElement>(null)

  // Play only while visible. Reduced-motion users get a paused video with controls.
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
    <section
      id="corona-classes"
      className="bg-[#0B0E14] py-20 md:py-32"
      aria-labelledby="corona-heading"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div ref={containerRef} className="space-y-8">
          <div data-reveal>
            <h2
              id="corona-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.15]"
            >
              Protein corona, by cryo-EM
            </h2>
          </div>

          <div
            data-reveal
            className="grid grid-cols-2 md:grid-cols-5 gap-2"
          >
            {tiles.map((t) => (
              <img
                key={t.src}
                src={t.src}
                alt={t.alt}
                loading="lazy"
                decoding="async"
                className="w-full aspect-square object-cover rounded-sm bg-[#111827]"
              />
            ))}
          </div>

          <div data-reveal className="max-w-xl mx-auto">
            <video
              ref={videoRef}
              className="w-full rounded-md bg-white"
              src={`${basePath}/images/corona/map-model.mp4`}
              poster={`${basePath}/images/corona/map-model-poster.jpg`}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="Rotating cryo-EM density map with fitted atomic model"
            />
          </div>

          <p data-reveal className="text-sm md:text-base text-[#CBD5E1]">
            The protein complex forming our LNP&apos;s protein corona, by cryo-EM.
            2D classification (cryoSPARC job J160, iteration 20), top{' '}
            {TILE_COUNT} of 200 classes shown by particle count, 200 Å scale
            bar on first tile. Video: the reconstructed density map with
            fitted atomic model, rotating.{' '}
            <a
              href={`${basePath}/images/corona/j160-all-classes.jpg`}
              className="text-[#22D3EE] underline underline-offset-4 hover:text-[#F8FAFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
            >
              All 200 classes
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
