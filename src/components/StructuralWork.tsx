"use client"
import { useEffect, useRef } from 'react'
const BASE = '/jackieng-profile/videos/structural-work'
const WORK = [
  { id: 'ecacc-single-blender', title: 'EcAcc · single ring · Blender' },
  { id: 'ecacc-double', title: 'EcAcc · double ring' },
  { id: 'sa-ftsz', title: 'Sa FtsZ · WT assembly' },
  { id: 'hspx', title: 'HspX · pH7 model' },
]
const MUTANTS = [
  { id: 'ftsz-d91a', title: 'Sa FtsZ · D91A' },
  { id: 'ftsz-e87a', title: 'Sa FtsZ · E87A' },
  { id: 'ftsz-e90a-singlet', title: 'Sa FtsZ · E90A singlet' },
  { id: 'ftsz-e90a-doublet', title: 'Sa FtsZ · E90A doublet' },
]
function ModelVideo({ id, title }: { id: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    const update = () => {
      if (visible && !motion.matches) void v.play().catch(() => {})
      else v.pause()
    }
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; update() }, { threshold: 0.25 })
    observer.observe(v)
    motion.addEventListener('change', update)
    return () => { observer.disconnect(); motion.removeEventListener('change', update); v.pause() }
  }, [])
  return <figure>
    <video ref={ref} src={`${BASE}/${id}.mp4`} poster={`${BASE}/${id}.jpg`} loop muted playsInline controls preload="none" aria-label={`${title}: rotating rendering of Jackie Ng’s structural model`} />
    <figcaption>{title} <span>· My structural work</span></figcaption>
  </figure>
}
export function StructuralWork({ expanded = false }: { expanded?: boolean }) {
  return <section id="structural-work" className="structural-work" aria-labelledby="structural-work-title">
    <p className="dossier-label">Selected structural work</p>
    <h2 id="structural-work-title">The models behind the work.</h2>
    <p className="structural-work-note">Rendered from my research models. Rotation shows structure, not molecular dynamics. Videos only; unpublished coordinates are not shared.</p>
    <div className="structural-work-grid">{WORK.map(x => <ModelVideo key={x.id} {...x} />)}</div>
    <details open={expanded} className="dossier-archive structural-mutants"><summary>Explore FtsZ mutants · D91A, E87A &amp; E90A</summary><div className="structural-work-grid">{MUTANTS.map(x => <ModelVideo key={x.id} {...x} />)}</div></details>
  </section>
}
