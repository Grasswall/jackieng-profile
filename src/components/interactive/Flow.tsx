'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsapConfig'

const basePath = '/jackieng-profile'

const tiles = [1, 2, 3, 4].map(
  (n) => `${basePath}/images/corona/class-${String(n).padStart(2, '0')}.png`
)

const STEPS = [
  { title: 'Cryo-EM', caption: 'Real 2D class averages of the LNP corona protein complex (cryoSPARC J160).', sim: false },
  { title: '3D structure', caption: 'Reconstructed density map with fitted atomic model.', sim: false },
  { title: 'ML model', caption: 'A small network trained on synthetic formulations.', sim: true },
  { title: 'Output', caption: 'Predicted brain-targeting probability across particle size and ApoE density. The model does not read the cryo-EM data.', sim: true },
]

const WIDTH = 'min(56rem, calc((100vh - 20rem) * 16 / 9))'
const layer = 'absolute inset-0 flex items-center justify-center'

function Video({ name, invert, label }: { name: string; invert?: boolean; label: string }) {
  return (
    <video
      className={`w-full h-full object-contain ${invert ? 'invert-render' : ''}`}
      src={`${basePath}/${name}.mp4`}
      poster={`${basePath}/${name}-poster.jpg`}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={label}
    />
  )
}

export function Flow() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const layers = q('[data-layer]')
      const caps = q('[data-cap]')
      const dots = q('[data-dot]')
      gsap.set([...layers.slice(1), ...caps.slice(1)], { opacity: 0 })
      gsap.set(dots.slice(1), { opacity: 0.5 })
      gsap.set(q('[data-fill]'), { clipPath: 'inset(0 100% 0 0)' })

      const tl = gsap.timeline({
        defaults: { ease: 'power1.inOut' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      })
      tl.to(q('[data-fill]'), { clipPath: 'inset(0 0% 0 0)', ease: 'none', duration: 3 }, 0)
      for (let i = 1; i < 4; i++) {
        const t = i - 0.35
        tl.to([layers[i - 1], caps[i - 1]], { opacity: 0, duration: 0.35 }, t)
        tl.to([layers[i], caps[i]], { opacity: 1, duration: 0.35 }, t)
        tl.to(dots[i - 1], { opacity: 0.5, duration: 0.35 }, t)
        tl.to(dots[i], { opacity: 1, duration: 0.35 }, t)
      }
      tl.to({}, { duration: 0.6 }, 3) // hold the last step before the page moves on
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      id="flow"
      aria-labelledby="flow-heading"
      className="relative bg-[#0B0E14]"
      style={{ height: '420vh' }}
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-4 px-6 pt-24 pb-4">
        <h2 id="flow-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-[#F8FAFC]">
          From cryo-EM to prediction
        </h2>

        <div
          className="relative w-full aspect-video rounded-xl border border-[#1E293B] bg-[#0B0E14] overflow-hidden"
          style={{ maxWidth: WIDTH }}
        >
          <div data-layer className={`${layer} p-6`}>
            <div className="grid w-full grid-cols-4 gap-3">
              {tiles.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Cryo-EM 2D class average ${i + 1}`}
                  decoding="async"
                  className="w-full aspect-square object-cover rounded-md bg-[#111827]"
                />
              ))}
            </div>
          </div>
          <div data-layer className={layer}>
            <Video name="images/corona/map-model" invert label="Rotating cryo-EM density map with fitted atomic model" />
          </div>
          <div data-layer className={layer}>
            <Video name="videos/ml-viz/network-forward" label="Animated diagram of the trained network computing one prediction" />
          </div>
          <div data-layer className={layer}>
            <Video name="videos/ml-viz/decision-surface" label="Rotating surface of predicted brain-targeting probability" />
          </div>
        </div>

        <div className="relative w-full min-h-[6.5rem]" style={{ maxWidth: WIDTH }}>
          {STEPS.map((s, i) => (
            <div key={s.title} data-cap className="absolute inset-0">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs" style={{ color: s.sim ? '#F97316' : '#22D3EE' }}>0{i + 1}</span>
                <h3 className="text-lg font-semibold text-[#F8FAFC]">{s.title}</h3>
                <span className="text-[11px] uppercase tracking-wide" style={{ color: s.sim ? '#F97316' : '#22D3EE' }}>
                  {s.sim ? 'Simulation' : 'Experimental'}
                </span>
              </div>
              <p className="mt-1 text-sm text-[#94A3B8]">{s.caption}</p>
            </div>
          ))}
        </div>

        <div className="w-full" style={{ maxWidth: WIDTH }} aria-hidden="true">
          <div className="relative h-px w-full bg-[#1E293B]">
            <div
              data-fill
              className="absolute inset-0 h-px"
              style={{ background: 'linear-gradient(to right, #22D3EE 0%, #22D3EE 45%, #F97316 55%, #F97316 100%)' }}
            />
          </div>
          <div className="mt-2 flex justify-between gap-2 font-mono text-[10px] sm:text-[11px] text-[#F8FAFC] whitespace-nowrap">
            {STEPS.map((s, i) => (
              <span key={s.title} data-dot>{i + 1} {s.title}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
