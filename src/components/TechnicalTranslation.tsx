import Link from 'next/link'
export function TechnicalTranslation() {
  return <section id="translation" className="translation-story" aria-labelledby="translation-title">
    <p className="dossier-label">My role · technical translation</p>
    <h2 id="translation-title">The work starts before training.</h2>
    <p className="translation-intro">My structural-biology background informs what data I collect and how I design model architectures for protein ML in drug delivery.</p>
    <ol className="translation-steps">
      <li><span className="translation-index">01</span><div><h3>Frame the biology.</h3><p>Bring molecular structure and experimental context to the design question—not just a dataset to an algorithm.</p></div><span className="translation-output">Structural understanding</span></li>
      <li><span className="translation-index">02</span><div><h3>Build the data foundation.</h3><p>Collect data around the biological question and the intended delivery application.</p></div><span className="translation-output">Data collection</span></li>
      <li><span className="translation-index">03</span><div><h3>Design the model.</h3><p>Translate that understanding into architecture decisions for protein ML design, with drug delivery as the application.</p></div><span className="translation-output">Model architecture</span></li>
    </ol>
    <p className="translation-direction">AtomBios is where I pursue this direction. This describes my research approach, not a claim of validated delivery performance.</p>
    <div className="dossier-actions"><Link href="/work">Read my contribution ↗</Link><Link href="/research">Inspect structural work &amp; the separate ML demo ↗</Link></div>
  </section>
}
