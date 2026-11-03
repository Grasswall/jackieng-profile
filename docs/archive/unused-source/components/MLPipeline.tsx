'use client'

import { useRef, useState } from 'react'
import { CLASSES, Formulation, predict, Trainer, generate, Net, accuracy, toFeatures } from '@/lib/formulationSim'

const stages = [
  { title: 'Measure formulation', caption: 'Particle size · SORT identity and mol% · ApoE density · PEG mol%', type: 'Inputs' },
  { title: 'Encode features', caption: '7 numeric features: SORT one-hot ×3, SORT mol%, size, ApoE density, PEG', type: 'Representation' },
  { title: 'Train network', caption: '7 inputs → 16 tanh hidden units → 4-way softmax', type: 'Model' },
  { title: 'Predict distribution', caption: 'Probability across Liver · Lung · Spleen · Brain', type: 'Output' },
]
const COLORS = ['#70c7bd','#cba76a','#a693d0','#e9e0d0']
export function MLPipeline() {
  const [form, setForm] = useState<Formulation>({ sort: 'ionizable', sortMol: 20, size: 60, apoe: 0.55, peg: 2 })
  const [prob, setProb] = useState<number[] | null>(null)
  const [note, setNote] = useState('')
  const netRef = useRef<Net | null>(null)
  const [busy, setBusy] = useState(false)
  function run() {
    setBusy(true)
    setNote('Training on the locally generated synthetic set…')
    requestAnimationFrame(() => {
      const data = generate(1600, 21)
      const trainer = new Trainer(data, 7)
      let loss = 0
      for (let i = 0; i < 110; i++) loss = trainer.step()
      netRef.current = trainer.net
      setProb(predict(trainer.net, form))
      setBusy(false)
      setNote(`Demo fit complete · 110 updates · loss ${loss.toFixed(3)} · held-out accuracy ${(accuracy(trainer.net, generate(400, 42))*100).toFixed(1)}% · synthetic labels`)
    })
  }
  const update = (key: keyof Formulation, value: string) => {
    const next = { ...form, [key]: key === 'sort' ? value as Formulation['sort'] : Number(value) }
    setForm(next)
    if (netRef.current) setProb(predict(netRef.current, next))
  }
  return (
    <section id="ml-pipeline" aria-labelledby="ml-pipeline-heading" className="on-dark scroll-mt-16 bg-deep px-6 py-16 text-cream md:px-12 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#e09a5d]">Simulation · synthetic data · not experimental results · not the AtomBios model</p>
        <h2 id="ml-pipeline-heading" className="mt-3 max-w-4xl font-heading text-4xl leading-tight md:text-6xl">The model starts with useful data.</h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-cream/75">To learn formulation–distribution relationships, measure the particle and its surface chemistry, then link each formulation to organ-distribution measurements. The key is pairing comparable measurements with the outcome you actually want to predict. The demo below uses formulation variables, not cryo-EM images.</p>
        <ol className="mt-10 grid gap-3 md:grid-cols-4">
          {stages.map((s,i) => <li key={s.type} className="relative border-t-2 border-[#70c7bd] bg-white/[.04] p-5">
            <p className="font-mono text-xs text-[#70c7bd]">0{i+1} / {s.type}</p><h3 className="mt-3 font-heading text-2xl">{s.title}</h3><p className="mt-3 text-sm leading-relaxed text-cream/70">{s.caption}</p>
            {i < 3 && <span aria-hidden="true" className="absolute -right-3 top-4 z-10 hidden text-xl text-[#70c7bd] md:block">→</span>}
          </li>)}
        </ol>
        <p className="mt-4 text-xs text-cream/60">Design context: <a className="underline" href="https://www.nature.com/articles/s41565-025-01975-4">COMET formulation modelling</a> · <a className="underline" href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8719871/">SORT / protein-corona mechanism</a>. These publications are field context, not my results.</p>
        <div className="mt-6 border border-white/15 p-4 md:p-6">
          <p className="text-xs uppercase tracking-widest text-[#70c7bd]">Inside the pipeline · actual demo weights after training</p>
          <svg viewBox="0 0 760 360" role="img" aria-label="Seven named input features feed sixteen hidden units and four organ outputs; edges show the trained demo weights" className="mt-4 w-full">
            {Array.from({length:7},(_,i)=>Array.from({length:16},(_,j)=><line key={`a${i}-${j}`} x1="245" y1={42+i*43} x2="420" y2={25+j*20} stroke={netRef.current && netRef.current.W1[j][i]<0 ? '#cba76a':'#70c7bd'} strokeOpacity={netRef.current ? Math.min(.75,.08+Math.abs(netRef.current.W1[j][i])*.25):.07} strokeWidth={netRef.current ? Math.min(3,.4+Math.abs(netRef.current.W1[j][i])):.5}/>))}
            {Array.from({length:16},(_,j)=>CLASSES.map((_,k)=><line key={`b${j}-${k}`} x1="420" y1={25+j*20} x2="580" y2={70+k*70} stroke={netRef.current && netRef.current.W2[k][j]<0?'#cba76a':'#70c7bd'} strokeOpacity={netRef.current ? Math.min(.8,.1+Math.abs(netRef.current.W2[k][j])*.3):.07}/>))}
            {['Ionizable SORT','Cationic SORT','Anionic SORT','SORT mol%','Particle size','ApoE density','PEG mol%'].map((name,i)=><g key={name}><text x="10" y={47+i*43} fill="#e9e0d0" fontSize="17">{name}</text><circle cx="245" cy={42+i*43} r="7" fill="#70c7bd"/><text x="200" y={47+i*43} fill="#70c7bd" fontSize="12">{toFeatures(form)[i].toFixed(2)}</text></g>)}
            {Array.from({length:16},(_,j)=><circle key={j} cx="420" cy={25+j*20} r="5" fill={netRef.current?'#e9e0d0':'#52636c'}/>)}
            {CLASSES.map((name,k)=><g key={name}><circle cx="580" cy={70+k*70} r={prob?7+prob[k]*15:7} fill={COLORS[k]}/><text x="615" y={75+k*70} fill="#e9e0d0" fontSize="18">{name} {prob ? `${(prob[k]*100).toFixed(1)}%`:''}</text></g>)}
          </svg>
          <p className="text-xs text-cream/65">Before training: untrained topology. After training: edge brightness reflects |weight|; teal is positive, gold negative. Node inputs show normalized encodings. This is not feature importance.</p>
        </div>
        <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="border border-white/15 p-5 md:p-7">
            <p className="text-xs uppercase tracking-widest text-[#70c7bd]">What makes a useful training row?</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-cream/80">
              <li><strong className="text-cream">Formulation:</strong> measured size distribution, lipid identities and molar ratios, PEG fraction, ApoE / corona composition.</li>
              <li><strong className="text-cream">Outcome:</strong> matched biodistribution readouts, with dose, species, tissue, assay, and timepoint recorded.</li>
              <li><strong className="text-cream">Dataset quality:</strong> replicates, uncertainty, protocol and batch metadata; held-out validation by experiment or batch to reduce leakage risk. Tissue accumulation and functional delivery must remain distinct targets.</li>
            </ul>
            <p className="mt-5 border-l-2 border-[#e09a5d] pl-3 text-xs text-cream/60">These are useful data requirements, not a claim that AtomBios has collected this dataset. The existing demo trains on generated rules, not biological measurements.</p>
          </div>
          <div className="border border-white/15 p-5 md:p-7">
            <div className="flex flex-wrap items-baseline justify-between gap-3"><div><p className="text-xs uppercase tracking-widest text-[#e09a5d]">Interactive demo</p><h3 className="mt-2 font-heading text-3xl">Change an input. See the output.</h3></div><button type="button" onClick={run} disabled={busy} className="min-h-11 bg-cream px-5 font-semibold text-deep hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">{busy ? 'Training…' : netRef.current ? 'Retrain demo' : 'Train demo'}</button></div>
            <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <label className="grid gap-2">SORT identity<select value={form.sort} onChange={e=>update('sort',e.target.value)} className="min-h-11 bg-[#182631] px-3 text-cream"><option value="none">None</option><option value="ionizable">Ionizable</option><option value="cationic">Cationic</option><option value="anionic">Anionic</option></select></label>
              {[{key:'sortMol' as const,label:'SORT mol%',min:0,max:50,step:1},{key:'size' as const,label:'Particle size (nm)',min:20,max:150,step:1},{key:'apoe' as const,label:'ApoE density (demo scale)',min:0,max:1,step:.01},{key:'peg' as const,label:'PEG mol%',min:.5,max:10,step:.1}].map(x=><label key={x.key} className="grid gap-1">{x.label}<span className="font-mono text-xs">{form[x.key]}</span><input type="range" min={x.min} max={x.max} step={x.step} value={form[x.key]} onChange={e=>update(x.key,e.target.value)} /></label>)}
            </div>
            <p role="status" aria-live="polite" className="mt-4 min-h-5 text-xs text-cream/65">{note || 'Train the synthetic demo to see its current probabilities.'}</p>
            <ul className="mt-3 space-y-3">{CLASSES.map((name,i)=><li key={name}><div className="flex justify-between text-xs"><span>{name}</span><span>{prob ? `${(prob[i]*100).toFixed(1)}%` : '—'}</span></div><div className="mt-1 h-2 bg-white/10"><div className="h-2 transition-[width]" style={{width:`${prob ? prob[i]*100 : 0}%`,backgroundColor:COLORS[i]}} /></div></li>)}</ul>
            <p className="mt-4 text-xs leading-relaxed text-cream/55">This model learns a hand-written rule set shaped by published directions. Its output is a demonstration of inference, not a biological prediction. Cryo-EM structure data is not an input.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
