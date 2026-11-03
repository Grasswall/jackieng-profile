"use client"
import { useRef } from 'react'
import { meta } from '@/lib/data'
export function TasteHero(){
 const photo=useRef<HTMLImageElement>(null)
 return <section id="founder" className="taste-hero on-dark" aria-labelledby="dossier-title" onPointerMove={e=>{if(e.pointerType!=='mouse'||matchMedia('(prefers-reduced-motion: reduce)').matches||!photo.current)return;const b=e.currentTarget.getBoundingClientRect();photo.current.style.transform=`scale(1.04) translate(${((e.clientX-b.left)/b.width-.5)*-12}px,${((e.clientY-b.top)/b.height-.5)*-8}px)`}} onPointerLeave={()=>{if(photo.current)photo.current.style.transform=''}}>
  <figure className="taste-hero-photo"><img ref={photo} src="/jackieng-profile/images/gallery/suzhou-pitch.jpg" alt="Jackie Ng presenting AtomBios at the WIN in Suzhou entrepreneurship competition" width="2000" height="1333" fetchPriority="high"/><figcaption>Pitching AtomBios · WIN in Suzhou</figcaption></figure>
  <div className="taste-hero-copy"><h1 id="dossier-title"><span>I turn structural insight</span><span>into model design.</span></h1><p className="taste-identity">Jackie Ng · Structural biologist &amp; technical translator</p><p>I connect biological questions, data collection and model architecture for protein ML in drug delivery. My foundation is hands-on cryo-EM and atomic model building; AtomBios is where I pursue the application.</p><p className="taste-affiliation">PhD student, PolyU · Founder, AtomBios</p><div className="taste-actions"><a className="taste-button" href={`mailto:${meta.email}?subject=Research%20opportunity`}>Discuss a role or collaboration ↗</a><a href="#discovery">See the work ↓</a></div></div>
 </section>
}
