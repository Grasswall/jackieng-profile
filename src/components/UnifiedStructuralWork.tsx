"use client"
import { useEffect, useRef } from 'react'
import { BASE } from './motion/motionUtils'
const work = [
  { id: 'ecacc-single-blender', title: 'EcAcc · single ring', note: 'My structural work · Blender rendering' },
  { id: 'ecacc-double', title: 'EcAcc · double ring', note: 'My structural work · rotating model' },
  { id: 'sa-ftsz', title: 'Sa FtsZ · WT assembly', note: 'My structural work · rotating model' },
  { id: 'hspx', title: 'HspX · pH7 model', note: 'My structural work · rotating model' },
]
const mutants = [
  { id: 'ftsz-d91a', title: 'Sa FtsZ · D91A', note: 'My structural work · rotating mutant model' },
  { id: 'ftsz-e87a', title: 'Sa FtsZ · E87A', note: 'My structural work · rotating mutant model' },
  { id: 'ftsz-e90a-singlet', title: 'Sa FtsZ · E90A singlet', note: 'My structural work · rotating mutant model' },
  { id: 'ftsz-e90a-doublet', title: 'Sa FtsZ · E90A doublet', note: 'My structural work · rotating mutant model' },
]
function WorkVideo({id,title,note}:{id:string;title:string;note:string}) {
  const ref=useRef<HTMLVideoElement>(null)
  useEffect(()=>{
    const v=ref.current
    if(!v)return
    const motion=matchMedia('(prefers-reduced-motion: reduce)')
    let visible=false
    const update=()=>{if(visible&&!motion.matches)void v.play().catch(()=>{});else v.pause()}
    const io=new IntersectionObserver(e=>{visible=e[0].isIntersecting;update()},{threshold:.25})
    io.observe(v);motion.addEventListener('change',update)
    return()=>{io.disconnect();motion.removeEventListener('change',update);v.pause()}
  },[])
  return <figure className="work-item"><video ref={ref} src={`${BASE}/videos/structural-work/${id}.mp4`} poster={`${BASE}/videos/structural-work/${id}.jpg`} controls loop muted playsInline preload="none" aria-label={`${title}: rotating rendering of my structural model`} /><figcaption>{title}<span className="work-meta">{note}</span></figcaption></figure>
}
export function UnifiedStructuralWork({expanded=false}:{expanded?:boolean}) {
  return <section id="work" className="u-section u-section-deep on-dark">
    <p className="u-kicker">The foundation</p><h2>Look closer at the structure.</h2>
    <p>Selected models from my structural work. Cryo-EM and atomic model building are the foundation for the questions I pursue next.</p>
    <p className="u-provenance">Rendered research models; rotation shows geometry, not molecular dynamics or functional effects. These projects are distinct from the delivery research direction. Videos only; unpublished coordinates remain private.</p>
    <div className="work-grid">{work.map(w=><WorkVideo key={w.id} {...w}/>)}</div>
    {expanded&&<details className="u-archive"><summary>Explore the FtsZ mutant models</summary><div className="work-grid">{mutants.map(w=><WorkVideo key={w.id} {...w}/>)}</div></details>}
  </section>
}
