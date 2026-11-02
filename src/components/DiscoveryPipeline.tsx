'use client'
import { useState } from 'react'
import Link from 'next/link'
const BASE = '/jackieng-profile'
const steps = ['Structure', 'Model', '3D landscape', 'LNP design', 'Team results']
export function DiscoveryPipeline() {
  const [active, setActive] = useState(0)
  return <section id="discovery" className="discovery" aria-labelledby="discovery-heading">
    <div className="discovery-wrap">
      <p className="compact-kicker">Structure → formulation → delivery</p>
      <h2 id="discovery-heading">Inside the LNP discovery pipeline.</h2>
      <p className="discovery-intro">Structural insight informs the questions. Models explore formulations. Experiments test delivery.</p>
      <div role="tablist" aria-label="LNP discovery stages" className="discovery-tabs">
        {steps.map((name,i)=><button id={`discovery-tab-${i}`} key={name} type="button" role="tab" aria-selected={i===active} aria-controls="discovery-panel" tabIndex={i===active?0:-1} onClick={()=>setActive(i)} onKeyDown={e=>{const n=e.key==='ArrowRight'?(active+1)%steps.length:e.key==='ArrowLeft'?(active+steps.length-1)%steps.length:e.key==='Home'?0:e.key==='End'?steps.length-1:null;if(n!==null){e.preventDefault();setActive(n);document.getElementById(`discovery-tab-${n}`)?.focus()}}}><span>0{i+1}</span>{name}</button>)}
      </div>
      <div id="discovery-panel" role="tabpanel" aria-labelledby={`discovery-tab-${active}`} tabIndex={0} className="discovery-panel">
        {active===0 && <><video key="structure" src={`${BASE}/images/corona/map-model.mp4`} poster={`${BASE}/images/corona/map-model-poster.jpg`} controls autoPlay loop muted playsInline preload="metadata" aria-label="Experimental cryo-EM density map and fitted atomic model" /><p className="discovery-caption"><strong>Experimental structural work.</strong> Cryo-EM map + atomic model. The demo below takes formulation variables, not these images.</p></>}
        {active===1 && <><video key="network" src={`${BASE}/videos/ml-viz/network-forward.mp4`} poster={`${BASE}/videos/ml-viz/network-forward-poster.jpg`} controls autoPlay loop muted playsInline preload="metadata" aria-label="Trained synthetic network forward pass, seven inputs to sixteen hidden units to four organ classes" /><p className="discovery-caption"><strong>Synthetic demo · not the private AtomBios model.</strong> Size, SORT lipid, ApoE density and PEG → 7–16–4 network → organ probabilities.</p></>}
        {active===2 && <><video key="surface" src={`${BASE}/videos/ml-viz/decision-surface.mp4`} poster={`${BASE}/videos/ml-viz/decision-surface-poster.jpg`} controls autoPlay loop muted playsInline preload="metadata" aria-label="Rotating 3D surface of the synthetic-trained network's brain probability over size and ApoE density" /><p className="discovery-caption"><strong>3D output of the trained synthetic demo.</strong> Size × ApoE density → brain probability. SORT and PEG fixed; a two-input projection, not experimental data.</p></>}
        {active===3 && <div className="discovery-design"><svg viewBox="0 0 360 260" role="img" aria-label="Illustration of a lipid nanoparticle, not experimental microscopy"><defs><radialGradient id="lnp-fill"><stop stopColor="#95d4c5"/><stop offset="1" stopColor="#1c5765"/></radialGradient></defs><circle cx="180" cy="130" r="88" fill="url(#lnp-fill)" stroke="#88c4b9" strokeWidth="4"/>{Array.from({length:24},(_,i)=>{const a=i*Math.PI/12;return <g key={i}><line x1={180+88*Math.cos(a)} y1={130+88*Math.sin(a)} x2={180+108*Math.cos(a)} y2={130+108*Math.sin(a)} stroke="#a9c5d0" strokeWidth="2"/><circle cx={180+88*Math.cos(a)} cy={130+88*Math.sin(a)} r="5" fill="#eee5cb"/></g>})}</svg><div><p className="compact-kicker">Illustration · formulation space</p><h3>Design what to test.</h3><p>Particle size · lipid composition · surface chemistry · shielding.</p><p className="discovery-caption">AtomBios platform: 20 nm. The public synthetic demo is not evidence of how this formulation was discovered.</p><Link href="/research#ml-pipeline">Train and inspect the public demo ↗</Link></div></div>}
        {active===4 && <div className="discovery-results"><p className="compact-kicker">AtomBios · team preclinical results</p><div><p><strong>8×</strong><span>BBB transcytosis</span></p><p><strong>3.2×</strong><span>Brain accumulation</span></p></div><p>Versus conventional LNPs. These measured results are separate from the synthetic model demonstration.</p><Link href="/work">Company work &amp; context ↗</Link></div>}
      </div>
      <div className="discovery-footer"><p>Public visualization: experimental structure + synthetic model + separately measured team results.</p><Link href="/research#ml-pipeline">Explore the model &amp; data ↗</Link></div>
    </div>
  </section>
}
