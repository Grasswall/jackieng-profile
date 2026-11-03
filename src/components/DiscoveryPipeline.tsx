'use client'
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsapConfig'
import Link from 'next/link'
import './ResearchScroll.css'
const BASE = '/jackieng-profile'
const SCENES = [
  { name: 'Cryo-EM', title: 'See the molecular evidence.', tag: 'Experimental image', caption: 'Cryo-EM class averages: the visual record comes before the model. Structure is not decoration; it changes what can be measured.', kind: 'classes' },
  { name: 'Structure', title: 'Resolve the structure.', tag: 'My structural work', caption: 'My work spans cryo-EM reconstruction and atomic model building. Shown: a fitted density-map model; the full structural archive is separate.', kind: 'structure' },
  { name: 'Model', title: 'Visualise the computation.', tag: 'Simulation · synthetic data', caption: 'Historical 7–16–4 formulation network: a synthetic-data demonstration, not the GB1 protein model or the private AtomBios model.', kind: 'network' },
  { name: 'Landscape', title: 'Explore a prediction landscape.', tag: 'Historical simulation · synthetic', caption: 'A formulation simulation from the site archive. It is not protein ML, does not read the cryo-EM images and is not evidence of delivery efficacy.', kind: 'surface' },
] as const
function Movie({ name, label, dark = false }: { name: string; label: string; dark?: boolean }) {
  return <video className={dark ? 'research-map' : undefined} src={`${BASE}/${name}.mp4`} poster={`${BASE}/${name}-poster.jpg`} autoPlay loop muted playsInline preload="metadata" aria-label={label} />
}
export function DiscoveryPipeline() {
  const root = useRef<HTMLElement>(null)
  const timeline = useRef<gsap.core.Timeline | null>(null)
  const [active, setActive] = useState(0)
  const [reduced, setReduced] = useState(false)
  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      setReduced(false)
      root.current?.setAttribute('data-scroll-ready', 'true')
      const q = gsap.utils.selector(root)
      const layers = q('[data-layer]'), caps = q('[data-cap]')
      gsap.set([...layers.slice(1), ...caps.slice(1)], { opacity: 0, visibility: 'hidden' })
      gsap.set(q('[data-fill]'), { scaleX: 0, transformOrigin: 'left' })
      const span = SCENES.length - 1
      const tl = gsap.timeline({ scrollTrigger: {
        trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: .6,
        onUpdate: self => {
          const t = self.animation?.time() ?? 0
          setActive(Math.min(span, Math.floor(t + .18)))
        }
      } })
      tl.to(q('[data-fill]'), { scaleX: 1, duration: span, ease: 'none' }, 0)
      for (let i=1; i<SCENES.length; i++) {
        tl.to([layers[i-1], caps[i-1]], { autoAlpha: 0, duration: .36, ease: 'power1.inOut' }, i-.36)
        tl.to([layers[i], caps[i]], { autoAlpha: 1, duration: .36, ease: 'power1.inOut' }, i-.36)
      }
      tl.to({}, { duration: .55 }, span)
      timeline.current = tl
      return () => { timeline.current = null; root.current?.removeAttribute('data-scroll-ready') }
    })
    media.add('(prefers-reduced-motion: reduce)', () => {
      setReduced(true)
      root.current?.querySelectorAll('video').forEach(video => video.pause())
    })
    return () => media.revert()
  }, { scope: root })
  const jump = (i: number) => {
    const tl = timeline.current, st = tl?.scrollTrigger
    if (tl && st) window.scrollTo({ top: st.start + (st.end-st.start)*i/tl.duration(), behavior: 'instant' as ScrollBehavior })
    else document.getElementById(`research-scene-${i}`)?.scrollIntoView({ block: 'center' })
  }
  return <section ref={root} id="discovery" className="research-scroll" style={{ '--scene-count': SCENES.length } as React.CSSProperties} aria-labelledby="research-heading" data-research-scroll="structure-to-delivery">
    <div className="research-sticky">
      <div className="research-opening"><h2 id="research-heading">From molecular detail<br />to testable questions.</h2><p>Experimental structure and computational illustration. Distinct sources, shown together.</p></div>
      <div className="research-frame">
        {SCENES.map((s,i)=><div id={`research-scene-${i}`} key={s.kind} data-layer data-scene={s.kind} className="research-layer" aria-hidden={!reduced && active!==i}>
          <h3 className="research-fallback-title">{s.title}</h3>
          {s.kind==='classes' && <div className="research-classes">{[1,2,3,4].map(n=><img key={n} src={`${BASE}/images/corona/class-0${n}.png`} width="512" height="512" alt={`Cryo-EM class average ${n}`} />)}</div>}
          {s.kind==='structure' && <Movie name="images/corona/map-model" dark label="Experimental cryo-EM density map and fitted atomic model" />}
          {s.kind==='network' && <Movie name="videos/ml-viz/network-forward" label="Synthetic-trained model forward pass: formulation inputs to organ probabilities" />}
          {s.kind==='surface' && <Movie name="videos/ml-viz/decision-surface" label="3D prediction landscape of the trained synthetic demo over size and ApoE density" />}
          <p className="research-fallback-caption">{s.tag} · {s.caption}</p>
        </div>)}
      </div>
      <div className="research-captions" aria-live="off">{SCENES.map(s=><div data-cap key={s.kind}><div className="research-cap-title"><h3>{s.title}</h3><span className={s.tag.startsWith('Simulation') ? 'research-simulation' : undefined}>{s.tag}</span></div><p>{s.caption}</p></div>)}</div>
      <div className="research-progress"><div className="research-track" aria-hidden="true"><span data-fill /></div><ol>{SCENES.map((s,i)=><li key={s.kind}><button data-dot type="button" onClick={()=>jump(i)} aria-current={active===i?'step':undefined}>{s.name}</button></li>)}</ol></div>
      <div className="research-close"><span>Structure and computation are distinct bodies of work.</span><Link href="/research">Inspect the research &amp; demo ↗</Link></div>
    </div>
  </section>
}
