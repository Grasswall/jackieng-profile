import Link from 'next/link'
export function TechnicalTranslation() {
  return <section id="translation" className="translation-story" aria-labelledby="translation-title">
    <p className="dossier-label">Technical translation · a hands-on contribution</p>
    <h2 id="translation-title">The biology changes how I build.</h2>
    <p className="translation-intro">I work on the decisions between a biological question and a useful model—not just the hand-off between teams.</p>
    <ol className="translation-steps">
      <li><span className="translation-index">01</span><div><h3>Start with molecular structure.</h3><p>My cryo-EM and atomic model-building work grounds the questions I bring to protein design. EcAcc and FtsZ are selected examples of that experimental foundation.</p></div><span className="translation-output">Inspect the structural work</span></li>
      <li><span className="translation-index">02</span><div><h3>Decide what the model needs to learn.</h3><p>Data collection is part of model design: define the outcome, collect comparable measurements and preserve the experimental context.</p></div><span className="translation-output">Data collection &amp; evaluation</span></li>
      <li><span className="translation-index">03</span><div><h3>Make architecture a biological decision.</h3><p>Choose what to represent, compare it with a simpler baseline and test where it fails. My application focus is protein ML for drug delivery at AtomBios.</p></div><span className="translation-output">Representation &amp; architecture</span></li>
    </ol>
    <p className="translation-direction">Structural research is my foundation; protein ML for delivery is the application direction. Public technical studies are separate from the private AtomBios model and are not evidence of delivery efficacy.</p>
    <div className="dossier-actions"><Link href="/work">Research &amp; contributions ↗</Link><Link href="/research">Structures &amp; technical studies ↗</Link></div>
  </section>
}
