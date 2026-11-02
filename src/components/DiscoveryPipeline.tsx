'use client'
import { useState } from 'react'
import Link from 'next/link'
const BASE = '/jackieng-profile'
const steps = ['Observe', 'Resolve', 'Frame the question', 'Model', 'Explore in 3D', 'Test delivery']
const notes = [
  ['Experimental images', 'What is on the particle?', 'Cryo-EM class averages of the LNP corona protein complex. Start with molecular evidence, not an assumed particle.'],
  ['My structural work', 'Resolve the molecular structure.', 'I solve cryo-EM structures. Five solved, best at 2.7 Å; publication in progress. This visual shows the corona map and fitted model.'],
  ['The bridge · design questions', 'Turn structure into questions to test.', 'How might particle size and surface-protein interactions affect delivery? Formulation models explore size, lipid composition, ApoE density and PEG. The public demo does not extract these features from this cryo-EM map.'],
  ['My ML work · public synthetic illustration', 'I train models for LNP design.', 'The public example shows a trained 7–16–4 network: formulation variables in, organ probabilities out. It illustrates computation, not the private AtomBios model.'],
  ['Synthetic model · not experimental data', 'See the formulation landscape.', 'Size × ApoE density → predicted brain probability. SORT and PEG stay fixed. A two-input projection of the demo network, not a measured biological surface.'],
  ['AtomBios · team preclinical results', 'Delivery is tested experimentally.', 'Versus conventional LNPs. These team measurements are distinct from the synthetic demo; they are not evidence that the public demo discovered the platform.'],
]
export function DiscoveryPipeline() {
  const [active, setActive] = useState(0)
  const note = notes[active]
  return <section id="discovery" className="discovery" aria-labelledby="discovery-heading">
    <div className="discovery-wrap">
      <p className="compact-kicker">My research practice · structure + computation</p>
      <h2 id="discovery-heading">Understand the molecule. Design what to test.</h2>
      <p className="discovery-intro">My core is solving structures. I also train ML models for LNP design. The connection is the research question—not a claim that this demo reads cryo-EM images.</p>
      <div role="tablist" aria-label="Structure to delivery research sequence" className="discovery-tabs">
        {steps.map((name,i)=><button id={`discovery-tab-${i}`} key={name} type="button" role="tab" aria-selected={i===active} aria-controls="discovery-panel" tabIndex={i===active?0:-1} onClick={()=>setActive(i)} onKeyDown={e=>{const n=e.key==='ArrowRight'?(active+1)%steps.length:e.key==='ArrowLeft'?(active+steps.length-1)%steps.length:e.key==='Home'?0:e.key==='End'?steps.length-1:null;if(n!==null){e.preventDefault();setActive(n);document.getElementById(`discovery-tab-${n}`)?.focus()}}}><span>0{i+1}</span>{name}</button>)}
      </div>
      <div id="discovery-panel" role="tabpanel" aria-labelledby={`discovery-tab-${active}`} tabIndex={0} className="discovery-panel unified-panel">
        <div className="unified-visuals">
          <figure className="structural-anchor"><p>Structural evidence · experimental</p>
            {active===0 ? <div className="class-grid">{[1,2,3,4].map(n=><img key={n} src={`${BASE}/images/corona/class-0${n}.png`} alt={`Experimental cryo-EM class average ${n}`} width="240" height="240" />)}</div> : <video src={`${BASE}/images/corona/map-model.mp4`} poster={`${BASE}/images/corona/map-model-poster.jpg`} controls autoPlay loop muted playsInline preload="metadata" aria-label="Experimental cryo-EM map and fitted atomic model" />}
            <figcaption>{active===0 ? 'Cryo-EM class averages' : 'Density map + fitted atomic model'}</figcaption>
          </figure>
          <div className="structural-extension">
            {active<2 && <div className="contribution"><p className="compact-kicker">What I bring</p><strong>5</strong><h3>structures solved</h3><p>Best 2.7 Å · publication in progress</p><div><a href="https://www.rcsb.org/structure/9X3T">9X3T ↗</a><a href="https://www.rcsb.org/structure/9X3V">9X3V ↗</a></div><small>Public records; distinct from the 2.7 Å result.</small></div>}
            {active===2 && <div className="feature-bridge"><p className="compact-kicker">Structure-informed questions</p><h3>Surface interactions<br />meet formulation choices.</h3><ul><li>Particle size</li><li>Lipid composition</li><li>ApoE density</li><li>PEG shielding</li></ul><p>Demo inputs are formulation variables, not values extracted from the map.</p></div>}
            {(active===3||active===4) && <figure><p className="visual-label">Synthetic demo · not the private AtomBios model</p><video key={active} src={`${BASE}/videos/ml-viz/${active===3?'network-forward':'decision-surface'}.mp4`} poster={`${BASE}/videos/ml-viz/${active===3?'network-forward':'decision-surface'}-poster.jpg`} controls autoPlay loop muted playsInline preload="metadata" aria-label={active===3?'Trained synthetic network forward pass':'Rotating 3D prediction surface of the synthetic network'} /><figcaption>{active===3?'Formulation → trained network → organ probabilities':'Size × ApoE → predicted brain probability'}</figcaption></figure>}
            {active===5 && <div className="contribution result-contribution"><p className="compact-kicker">Team preclinical measurements</p><strong>8×</strong><p>BBB transcytosis</p><strong>3.2×</strong><p>Brain accumulation</p><small>Versus conventional LNPs; not patient outcomes.</small></div>}
          </div>
        </div>
        <div className="unified-note"><p className="compact-kicker">{note[0]}</p><h3>{note[1]}</h3><p>{note[2]}</p></div>
      </div>
      <div className="discovery-footer"><p>My contribution: cryo-EM structure solving + hands-on model training. AtomBios delivery measurements are team results.</p><Link href="/research#ml-pipeline">Inspect the public model &amp; data ↗</Link></div>
    </div>
  </section>
}
