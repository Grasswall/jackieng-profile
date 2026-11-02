'use client'
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsapConfig'
import Link from 'next/link'
import './ResearchScroll.css'
const BASE = '/jackieng-profile'
const SCENES = [
  { name: 'Cryo-EM', title: 'See the molecular evidence.', tag: 'Experimental', caption: 'LNP corona protein complex · cryo-EM class averages.', kind: 'classes' },
  { name: 'Structure', title: 'Resolve the structure.', tag: 'My structural work', caption: 'Five structures solved · best 2.7 Å, publication in progress. Shown: corona density map + fitted model.', kind: 'structure' },
  { name: 'Questions', title: 'Structure shapes the question.', tag: 'Research connection', caption: 'Which formulation choices might change delivery? The demo uses formulation variables—not features extracted from this cryo-EM map.', kind: 'bridge' },
  { name: 'Model', title: 'Train the model.', tag: 'Simulation · synthetic data', caption: 'I train models for LNP design. This public 7–16–4 network illustrates the computation; it is not the private AtomBios model.', kind: 'network' },
  { name: 'Landscape', title: 'Explore what to test.', tag: 'Simulation · synthetic data', caption: 'Size × ApoE density → predicted brain probability. A two-input projection, with SORT and PEG fixed.', kind: 'surface' },
  { name: 'Delivery', title: 'Measure delivery.', tag: 'Experimental · team results', caption: 'AtomBios preclinical measurements versus conventional LNPs. Separate from the public synthetic demo; not patient outcomes.', kind: 'results' },
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
      <div className="research-opening"><h2 id="research-heading">Structure to delivery.</h2><p>Cryo-EM is my foundation. ML extends what I can test.</p></div>
      <div className="research-frame">
        {SCENES.map((s,i)=><div id={`research-scene-${i}`} key={s.kind} data-layer data-scene={s.kind} className="research-layer" aria-hidden={!reduced && active!==i}>
          <h3 className="research-fallback-title">{s.title}</h3>
          {s.kind==='classes' && <div className="research-classes">{[1,2,3,4].map(n=><img key={n} src={`${BASE}/images/corona/class-0${n}.png`} width="512" height="512" alt={`Cryo-EM class average ${n}`} />)}</div>}
          {s.kind==='structure' && <Movie name="images/corona/map-model" dark label="Experimental cryo-EM density map and fitted atomic model" />}
          {s.kind==='bridge' && <div className="research-bridge"><span>Structure</span><svg viewBox="0 0 400 40" aria-hidden="true"><path d="M2 20H390M374 6l16 14-16 14" fill="none" stroke="currentColor" strokeWidth="3" /></svg><span>Design questions</span><p>Particle size · lipid composition<br />ApoE density · PEG shielding</p></div>}
          {s.kind==='network' && <Movie name="videos/ml-viz/network-forward" label="Synthetic-trained model forward pass: formulation inputs to organ probabilities" />}
          {s.kind==='surface' && <Movie name="videos/ml-viz/decision-surface" label="3D prediction landscape of the trained synthetic demo over size and ApoE density" />}
          {s.kind==='results' && <div className="research-results"><div><strong>8×</strong><span>BBB transcytosis</span></div><div><strong>3.2×</strong><span>Brain accumulation</span></div></div>}
          <p className="research-fallback-caption">{s.tag} · {s.caption}</p>
        </div>)}
      </div>
      <div className="research-captions" aria-live="off">{SCENES.map(s=><div data-cap key={s.kind}><div className="research-cap-title"><h3>{s.title}</h3><span className={s.tag.startsWith('Simulation') ? 'research-simulation' : undefined}>{s.tag}</span></div><p>{s.caption}</p></div>)}</div>
      <div className="research-progress"><div className="research-track" aria-hidden="true"><span data-fill /></div><ol>{SCENES.map((s,i)=><li key={s.kind}><button data-dot type="button" onClick={()=>jump(i)} aria-current={active===i?'step':undefined}>{s.name}</button></li>)}</ol></div>
      <div className="research-close"><span>Experimental evidence → design questions → computational illustration → team measurements.</span><Link href="/research#ml-pipeline">Inspect the public model ↗</Link></div>
    </div>
  </section>
}
