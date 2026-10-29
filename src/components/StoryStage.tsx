'use client'

import { useEffect, useState } from 'react'

const beats = [
  { name: 'Resolve', title: 'I solve molecular structures.', detail: 'Five cryo-EM structures solved. Best resolution: 2.7 Å. Structural research in progress.', contribution: 'Molecular architecture → biological interpretation' },
  { name: 'Deliver', title: 'Then work on where medicines go.', detail: 'AtomBios: a 20 nm nanoparticle platform. 8× BBB transcytosis and 3.2-fold brain accumulation versus conventional LNPs.', contribution: 'Structural biology → nanoparticle delivery' },
  { name: 'Build', title: 'And carry the work beyond the lab.', detail: 'Founder of AtomBios. HK$7.05M in funding, including HK$6M through HKSTP Incu-Bio. Working with Sirnaomics.', contribution: 'Scientific work → company building' },
]

export function StoryStage() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const update = () => {
      const node = document.getElementById('story')
      if (!node) return
      const rect = node.getBoundingClientRect()
      const range = Math.max(1, node.offsetHeight - window.innerHeight)
      const progress = Math.max(0, Math.min(1, -rect.top / range))
      setActive(Math.min(beats.length - 1, Math.floor(progress * beats.length)))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])

  return (
    <section id="story" aria-label="The work and my contribution" className="talent-scroll on-dark bg-deep text-cream">
      <div className="talent-stage">
        <p className="talent-intro">The work. The contribution.</p>
        <div className="talent-layers">
          {beats.map((beat, i) => (
            <article key={beat.name} data-evidence-layer className={`talent-layer ${active === i ? 'is-active' : ''}`} aria-hidden={active !== i}>
              <div className="talent-visual">
                {i === 0 && <>
                  <video className="h-full w-full object-contain invert-render" src="/jackieng-profile/images/corona/map-model.mp4" poster="/jackieng-profile/images/corona/map-model-poster.jpg" autoPlay muted loop playsInline aria-label="Existing cryo-EM map and fitted atomic model render" />
                  <span className="talent-credit">Cryo-EM density map + fitted model · existing research render</span>
                </>}
                {i === 1 && <div className="flex h-full flex-col justify-center px-7 md:px-14">
                  <p className="mb-8 text-sm text-mist">Reported preclinical platform results</p>
                  <div className="space-y-7">
                    <div><p className="mb-2 text-sm">BBB transcytosis</p><div className="h-4 w-full bg-signal" /><p className="mt-2 font-heading text-5xl text-signal">8×</p></div>
                    <div><p className="mb-2 text-sm">Brain accumulation</p><div className="h-4 w-[40%] bg-signal" /><p className="mt-2 font-heading text-5xl text-signal">3.2×</p></div>
                  </div>
                  <p className="mt-7 text-xs leading-relaxed text-mist">Each fold change is relative to conventional LNPs. Bars summarize reported ratios; they are not raw assay data or a comparison between endpoints.</p>
                </div>}
                {i === 2 && <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/jackieng-profile/images/gallery/suzhou-pitch.jpg" alt="Jackie presenting AtomBios at WIN in Suzhou" className="h-full w-full object-cover" />
                  <span className="talent-credit">Presenting AtomBios · WIN in Suzhou</span>
                </>}
              </div>
              <div className="talent-caption">
                <p className="mb-4 text-sm uppercase tracking-[.16em] text-signal">{beat.name}</p>
                <h2 className="font-heading text-[clamp(2.3rem,4.4vw,4.5rem)] font-semibold leading-[1.02] tracking-tight">{beat.title}</h2>
                <p className="mt-5 max-w-[40ch] text-base leading-relaxed text-mist md:text-lg">{beat.detail}</p>
                <p className="mt-6 border-t border-cream/25 pt-4 text-sm text-cream">{beat.contribution}</p>
                <a href="/jackieng-profile/work/" className="mt-4 inline-flex min-h-11 items-center text-sm underline underline-offset-4">Inspect the work ↗</a>
              </div>
            </article>
          ))}
        </div>
        <p className="talent-scroll-hint text-xs text-mist">Keep scrolling · structure → delivery → execution</p>
      </div>
    </section>
  )
}
