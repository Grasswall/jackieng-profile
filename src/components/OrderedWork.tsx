'use client'

import { useState } from 'react'

const WORK = [
  { label: 'Structures', title: 'Cryo-EM', detail: 'Five structures solved, best resolution 2.7 Å. Two public RCSB entries are linked separately.', proof: 'Structural biology · publication in progress', tone: 'bg-[#10212b]' },
  { label: 'Models', title: 'ML for LNP design', detail: 'I train machine-learning models for lipid nanoparticle design at AtomBios. Model details are not disclosed here.', proof: 'My contribution · model details not disclosed', tone: 'bg-[#243b53]' },
  { label: 'Delivery', title: 'Brain delivery', detail: 'AtomBios team experiments: 20 nm particles, 8× BBB transcytosis and 3.2× brain accumulation versus conventional LNPs.', proof: 'Preclinical team result · not clinical efficacy', tone: 'bg-[#17443e]' },
  { label: 'Company', title: 'AtomBios', detail: 'Founder of an HKSTP-incubated company with HK$7.05M in company funding.', proof: 'Founder · company funding, not personal grant', tone: 'bg-[#3d3021]' },
] as const

export function OrderedWork() {
  const [active, setActive] = useState(0)
  const item = WORK[active]
  return (
    <section id="work-index" aria-labelledby="ordered-work-heading" className="on-dark scroll-mt-16 bg-deep px-6 py-16 text-cream md:px-12 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">The work, in order</p>
            <h2 id="ordered-work-heading" className="mt-3 max-w-3xl font-heading text-4xl font-medium leading-[1] tracking-tight md:text-6xl">From structure to delivery.</h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-cream/65">Four connected capabilities. Select one to see the evidence and its boundary.</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-stretch">
          <ol className="grid gap-2">
            {WORK.map((x, i) => (
              <li key={x.label}>
                <button type="button" onClick={() => setActive(i)} aria-pressed={active === i} aria-controls="work-detail" className={`flex min-h-16 w-full items-center gap-4 border-b border-cream/15 px-4 text-left transition-colors ${active === i ? 'bg-cream text-deep' : 'text-cream hover:bg-cream/10'}`}>
                  <span className="font-mono text-xs opacity-60">0{i + 1}</span>
                  <span className="font-heading text-2xl">{x.label}</span>
                  <span className="ml-auto text-xl" aria-hidden="true">→</span>
                </button>
              </li>
            ))}
          </ol>
          <article id="work-detail" aria-live="polite" className={`min-h-[300px] p-7 md:p-10 ${item.tone}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cream/60">{item.label}</p>
            <h3 className="mt-6 font-heading text-4xl leading-none md:text-6xl">{item.title}</h3>
            <div className="mt-6 flex h-48 items-center justify-center overflow-hidden border border-cream/15 bg-black/20">
              {active === 0 ? <video key="structure" autoPlay muted loop playsInline controls aria-label="Cryo-EM density map with fitted atomic model" poster="/jackieng-profile/images/corona/map-model-poster.jpg" className="h-full w-full object-contain"><source src="/jackieng-profile/images/corona/map-model.mp4" type="video/mp4" /></video> :
                active === 1 ? <svg viewBox="0 0 400 180" className="h-full w-full" role="img" aria-label="Conceptual network diagram, not the actual AtomBios model architecture">
                  {[45,90,135].map(y => [30,70,110,150].map(z => <line key={`${y}-${z}`} x1="80" y1={y} x2="200" y2={z} stroke="#76bcb4" strokeOpacity=".5" />))}
                  {[30,70,110,150].map(y => [65,115].map(z => <line key={`${y}-${z}`} x1="200" y1={y} x2="320" y2={z} stroke="#76bcb4" strokeOpacity=".5" />))}
                  {[45,90,135].map(y => <circle key={y} cx="80" cy={y} r="8" fill="#eadfc9" />)}
                  {[30,70,110,150].map(y => <circle key={y} cx="200" cy={y} r="8" fill="#76bcb4" />)}
                  {[65,115].map(y => <circle key={y} cx="320" cy={y} r="10" fill="#eadfc9" />)}
                </svg> : active === 2 ? <div className="flex items-center gap-8"><div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-[#76bcb4] font-heading text-3xl">20 nm</div><div className="space-y-2"><p className="font-heading text-3xl">8×</p><p className="text-xs text-cream/70">BBB transcytosis</p><p className="font-heading text-3xl">3.2×</p><p className="text-xs text-cream/70">Brain accumulation</p></div></div> : <div className="text-center"><p className="text-xs uppercase tracking-widest text-cream/60">Company funding</p><p className="mt-3 font-heading text-5xl md:text-6xl">HK$7.05M</p><p className="mt-3 text-sm text-cream/70">AtomBios · HKSTP incubated</p></div>}
            </div>
            {active === 1 && <p className="mt-2 text-xs text-cream/60">Conceptual illustration, not the AtomBios model architecture.</p>}
            {active === 0 && <div className="mt-3 flex gap-5 text-sm"><a href="https://www.rcsb.org/structure/9X3T" className="inline-flex min-h-11 items-center underline">RCSB 9X3T ↗</a><a href="https://www.rcsb.org/structure/9X3V" className="inline-flex min-h-11 items-center underline">RCSB 9X3V ↗</a></div>}
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/80 md:text-lg">{item.detail}</p>
            <p className="mt-8 border-t border-cream/20 pt-4 text-xs font-semibold uppercase tracking-[0.12em] text-signal">{item.proof}</p>
          </article>
        </div>
      </div>
    </section>
  )
}
