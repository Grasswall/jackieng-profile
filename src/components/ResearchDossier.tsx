import { meta } from '@/lib/data'

const BASE = '/jackieng-profile'
export function DossierHero() {
  return <section id="founder" className="dossier-hero" aria-labelledby="dossier-title">
    <div className="dossier-intro">
      <p className="dossier-identity">Jackie Ng · Structural biologist</p>
      <h1 id="dossier-title">I solve structures.<br /><em>I build models.</em></h1>
      <p className="dossier-lede">Cryo-EM is my foundation. At AtomBios, I train machine-learning models for lipid nanoparticle design.</p>
      <p className="dossier-affiliation">PhD student, PolyU · Founder, AtomBios</p>
      <div className="dossier-actions">
        <a className="dossier-primary" href={`mailto:${meta.email}?subject=Research%20opportunity`}>Discuss a role or collaboration ↗</a>
        <a href="#discovery">See the work ↓</a>
      </div>
    </div>
    <figure className="dossier-visual">
      <video src={`${BASE}/images/corona/map-model.mp4`} poster={`${BASE}/images/corona/map-model-poster.jpg`} autoPlay loop muted playsInline preload="metadata" aria-label="Cryo-EM density map with a fitted atomic model" />
      <figcaption>My structural work · density map + fitted model</figcaption>
    </figure>
    <div className="dossier-evidence" aria-label="Research evidence">
      <p><strong>2.7 Å</strong><span>Best structural resolution<br />Publication in progress</span></p>
      <p><strong>Public records</strong><span><a href="https://www.rcsb.org/structure/9X3T">9X3T ↗</a> · <a href="https://www.rcsb.org/structure/9X3V">9X3V ↗</a><br />Separate flagellar structures</span></p>
      <p><strong>JBC · 2024</strong><span><a href="https://doi.org/10.1016/j.jbc.2024.107390">Co-authored research ↗</a><br />SARS-CoV-2 spike RBD</span></p>
    </div>
  </section>
}
export function LiteratureNote() {
  return <aside className="dossier-literature" aria-labelledby="literature-title">
    <div><p className="dossier-label">Delivery research · published reference</p><h2 id="literature-title">The evidence behind the direction.</h2></div>
    <div><p>AtomBios builds on the BBB-crossing LNP approach reported by Wang et al. in <em>Nature Materials</em> (2025).</p><p className="dossier-note">Figure 4b: published mouse brain reporter images. Third-party experiments; not yet a matched validation of an AtomBios prediction.</p><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12514551/figure/F4/" target="_blank" rel="noopener noreferrer">Read the paper &amp; inspect Figure 4b ↗</a></div>
  </aside>
}
export function Opportunity() {
  return <section id="opportunity" className="dossier-opportunity" aria-labelledby="opportunity-title">
    <p className="dossier-label">Hire · collaborate</p>
    <h2 id="opportunity-title">Put structural insight<br />to work.</h2>
    <div className="dossier-opportunity-bottom"><p>Building a team in structural biology or computational drug delivery? Let’s discuss the research problem—and where I can contribute.</p><a className="dossier-primary" href={`mailto:${meta.email}?subject=Structural%20biology%20%2F%20delivery%20collaboration`}>Start a conversation ↗</a></div>
    <a className="dossier-email" href={`mailto:${meta.email}`}>{meta.email}</a>
  </section>
}
