'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsapConfig'

// Direction only. Brain is the measured result; other organs are the vision.
const TARGETS = [
  { name: 'Brain', y: 60, proven: true },
  { name: 'Lung', y: 160, proven: false },
  { name: 'Liver', y: 260, proven: false },
  { name: 'Spleen', y: 360, proven: false },
]
const CX = 130
const CY = 210
const TX = 460

const path = (y: number) => `M ${CX + 46} ${CY} C ${CX + 180} ${CY}, ${TX - 180} ${y}, ${TX - 24} ${y}`

export function Vision() {
  const root = useRef<HTMLElement>(null)
  const [hot, setHot] = useState<string | null>(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const brain = root.current?.querySelector<SVGPathElement>('[data-brain]')
      if (!brain) return
      const len = brain.getTotalLength()
      const nodes = q('[data-node]')
      gsap.set(q('[data-text]'), { opacity: 0, y: 24 })
      gsap.set(q('[data-particle]'), { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' })
      gsap.set(brain, { strokeDasharray: len, strokeDashoffset: len })
      gsap.set(q('[data-vline]'), { opacity: 0 })
      gsap.set(nodes, { opacity: 0, x: -12 })

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: { trigger: root.current, start: 'top 65%', once: true },
      })
      tl.to(q('[data-text]'), { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 })
        .to(q('[data-particle]'), { opacity: 1, scale: 1, duration: 0.7 }, 0.3)
        .to(brain, { strokeDashoffset: 0, duration: 1.1, ease: 'power1.inOut' }, 0.9)
        .to(nodes[0], { opacity: 1, x: 0, duration: 0.5 }, 1.8)
        .to(q('[data-vline]'), { opacity: 1, duration: 0.9, stagger: 0.25 }, 2.2)
        .to(nodes.slice(1), { opacity: 1, x: 0, duration: 0.5, stagger: 0.25 }, 2.4)
      gsap.to(q('[data-halo]'), {
        scale: 1.25, opacity: 0.15, duration: 2.2, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%',
      })
    },
    { scope: root }
  )

  const active = TARGETS.find((t) => t.name === hot)

  return (
    <section
      ref={root}
      id="vision"
      aria-labelledby="vision-heading"
      className="on-dark bg-deep py-24 text-cream md:py-36"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:px-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-16">
        <div>
          <p data-text className="mb-4 text-base text-mist">Vision</p>
          <h2
            id="vision-heading"
            data-text
            className="font-heading text-5xl font-semibold leading-[1] tracking-tight text-balance md:text-7xl"
          >
            Delivery you can program.
          </h2>
          <p data-text className="mt-6 max-w-[44ch] text-lg leading-[1.6] text-mist md:text-xl">
            Read the protein corona from structure, then design the particle to reach any organ. The brain is the first proof.
          </p>
          <p data-text className="mt-6 text-base text-cream">
            <span className="text-signal">Solid</span>: measured. <span className="text-sim">Dashed</span>: next.
          </p>
          <p aria-live="polite" className="mt-3 min-h-[1.75rem] text-base text-mist">
            {active ? (active.proven ? `${active.name}: measured.` : `${active.name}: next, not yet measured.`) : 'Hover or focus an organ.'}
          </p>
        </div>

        <svg
          viewBox="0 0 600 420"
          className="h-auto w-full max-w-2xl"
          role="group"
          aria-label="One 20 nanometre particle with a solid line to the brain, which is measured, and dashed lines to lung, liver and spleen, which are next"
        >
          {TARGETS.map((t) =>
            t.proven ? (
              <path key={t.name} data-brain d={path(t.y)} fill="none" stroke="#22D3EE" strokeWidth={hot === t.name ? 5 : 3} strokeLinecap="round" />
            ) : (
              <path key={t.name} data-vline d={path(t.y)} fill="none" stroke="#F97316" strokeWidth={hot === t.name ? 4.5 : 2.5} strokeDasharray="7 9" strokeLinecap="round" />
            )
          )}

          <g data-particle>
            <circle data-halo cx={CX} cy={CY} r={46} fill="#22D3EE" opacity={0.3} />
            <circle cx={CX} cy={CY} r={30} fill="#0A1828" stroke="#22D3EE" strokeWidth={3} />
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <circle key={a} cx={CX + 40 * Math.cos((a * Math.PI) / 180)} cy={CY + 40 * Math.sin((a * Math.PI) / 180)} r={4.5} fill="#F4F1EA" />
            ))}
            <text x={CX} y={CY + 6} textAnchor="middle" fontSize={17} fontFamily="ui-monospace, monospace" fill="#F4F1EA">20 nm</text>
          </g>

          {TARGETS.map((t) => (
            <g
              key={t.name}
              data-node
              tabIndex={0}
              role="img"
              aria-label={`${t.name}: ${t.proven ? 'measured' : 'next'}`}
              onMouseEnter={() => setHot(t.name)}
              onMouseLeave={() => setHot(null)}
              onFocus={() => setHot(t.name)}
              onBlur={() => setHot(null)}
              onClick={() => setHot(t.name)}
              className="cursor-pointer outline-none [&:focus-visible>rect]:stroke-signal"
            >
              <rect x={TX - 30} y={t.y - 28} width={170} height={56} fill="transparent" stroke="transparent" strokeWidth={3} rx={4} />
              <circle cx={TX} cy={t.y} r={14} fill={t.proven ? '#22D3EE' : '#0A1828'} stroke={t.proven ? '#22D3EE' : '#F97316'} strokeWidth={2.5} strokeDasharray={t.proven ? undefined : '4 4'} />
              <text x={TX + 30} y={t.y + 8} fontSize={24} fontFamily="ui-monospace, monospace" fill={hot === t.name || t.proven ? '#F4F1EA' : '#A9B6C8'}>{t.name}</text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  )
}
