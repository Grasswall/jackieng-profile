'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsapConfig'

const basePath = '/jackieng-profile'

const tiles = [1, 2, 3, 4].map(
  (n) => `${basePath}/images/corona/class-${String(n).padStart(2, '0')}.png`
)

const STEPS = [
  { title: 'Cryo-EM', caption: 'Real 2D class averages of the LNP corona protein complex (cryoSPARC J160).', sim: false },
  { title: '3D structure', caption: 'Reconstructed density map with fitted atomic model.', sim: false },
  { title: 'ML model', caption: 'A small network trained on synthetic formulations. It does not read the cryo-EM data — size, SORT lipid, ApoE density and PEG are formulation knobs, not structural measurements.', sim: true },
  { title: 'LNP design', caption: 'The particle the model proposes: 20 nm, SORT-lipid ratio, ApoE density, PEG shielding set from the predicted brain-targeting score.', sim: true },
  { title: 'Validation', caption: '8× BBB transcytosis. 3.2-fold brain accumulation vs. conventional LNPs, measured in vivo.', sim: false },
]

const WIDTH = 'min(56rem, calc((100vh - 21rem) * 16 / 9))'
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
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const [active, setActive] = useState(0)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const layers = q('[data-layer]')
      const caps = q('[data-cap]')
      const dots = q('[data-dot]')
      gsap.set([...layers.slice(1), ...caps.slice(1)], { opacity: 0 })
      gsap.set(dots.slice(1), { opacity: 0.6 })
      gsap.set(q('[data-fill]'), { clipPath: 'inset(0 100% 0 0)' })

      const steps = STEPS.length
      const span = steps - 1
      const tl = gsap.timeline({
        defaults: { ease: 'power1.inOut' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: () => setActive(Math.min(steps - 1, Math.round(tl.time()))),
        },
      })
      tl.to(q('[data-fill]'), { clipPath: 'inset(0 0% 0 0)', ease: 'none', duration: span }, 0)
      for (let i = 1; i < steps; i++) {
        const t = i - 0.35
        tl.to([layers[i - 1], caps[i - 1]], { opacity: 0, duration: 0.35 }, t)
        tl.to([layers[i], caps[i]], { opacity: 1, duration: 0.35 }, t)
        tl.to(dots[i - 1], { opacity: 0.6, duration: 0.35 }, t)
        tl.to(dots[i], { opacity: 1, duration: 0.35 }, t)
      }
      tl.to({}, { duration: 0.6 }, span) // hold the last step before the page moves on
      tlRef.current = tl
    },
    { scope: root }
  )

  // Click, tap or keyboard on a step label scrolls the pinned stage to that step.
  const jump = (i: number) => {
    const tl = tlRef.current
    const st = tl?.scrollTrigger
    if (!tl || !st) return
    const y = st.start + (st.end - st.start) * (i / tl.duration())
    window.scrollTo({ top: y, behavior: 'auto' })
  }

  return (
    <section
      ref={root}
      id="flow"
      aria-labelledby="flow-heading"
      className="on-dark relative bg-stage text-cream"
      style={{ height: `${STEPS.length * 105}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-3 px-6 pt-20 pb-3">
        <h2 id="flow-heading" className="text-center font-heading text-3xl font-semibold tracking-tight text-cream md:text-5xl">
          From structure to a delivery platform
        </h2>

        <div
          className="relative aspect-video w-full overflow-hidden bg-deep2"
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
                  className="aspect-square w-full bg-stage object-cover transition-transform duration-300 hover:scale-105"
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
          <div data-layer className={`${layer} p-4 sm:p-6`}>
            <div className="w-full max-w-md space-y-2 sm:space-y-4">
              <p className="text-center text-sm text-mist">The particle the model proposes</p>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs sm:gap-3 sm:text-sm">
                <div className="bg-stage px-3 py-2 text-cream sm:px-4 sm:py-3">Size <span className="block text-base text-sim sm:text-lg">20 nm</span></div>
                <div className="bg-stage px-3 py-2 text-cream sm:px-4 sm:py-3">PEG <span className="block text-base text-sim sm:text-lg">shielded</span></div>
                <div className="bg-stage px-3 py-2 text-cream sm:px-4 sm:py-3">SORT lipid <span className="block text-base text-sim sm:text-lg">set</span></div>
                <div className="bg-stage px-3 py-2 text-cream sm:px-4 sm:py-3">ApoE density <span className="block text-base text-sim sm:text-lg">set</span></div>
              </div>
            </div>
          </div>
          <div data-layer className={`${layer} p-6`}>
            <div className="flex items-baseline gap-8 font-mono">
              <div className="text-center">
                <div className="text-5xl font-bold text-signal">8×</div>
                <div className="mt-1 text-sm text-mist">BBB transcytosis</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-signal">3.2×</div>
                <div className="mt-1 text-sm text-mist">brain accumulation</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative min-h-[9.5rem] w-full sm:min-h-[6.5rem]" style={{ maxWidth: WIDTH }} aria-live="off">
          {STEPS.map((s) => (
            <div key={s.title} data-cap className="absolute inset-0">
              <div className="flex items-baseline gap-3">
                <h3 className="font-heading text-2xl font-semibold text-cream">{s.title}</h3>
                <span className="text-sm font-medium" style={{ color: s.sim ? '#F97316' : '#22D3EE' }}>
                  {s.sim ? 'Simulation' : 'Experimental'}
                </span>
              </div>
              <p className="mt-1 text-[15px] leading-snug text-mist">{s.caption}</p>
            </div>
          ))}
        </div>

        <div className="w-full" style={{ maxWidth: WIDTH }}>
          <div className="relative h-1 w-full bg-deep2" aria-hidden="true">
            <div data-fill className="absolute inset-0 h-1 bg-signal" />
          </div>
          <ol className="mt-1 flex justify-between gap-1">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  data-dot
                  onClick={() => jump(i)}
                  aria-current={active === i ? 'step' : undefined}
                  aria-label={`Jump to step ${i + 1}: ${s.title}${s.sim ? ', simulation' : ''}`}
                  className="flex min-h-11 items-center px-1 font-mono text-xs text-cream hover:text-signal sm:text-sm"
                >
                  <span style={{ color: s.sim ? '#F97316' : undefined }}>{s.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
