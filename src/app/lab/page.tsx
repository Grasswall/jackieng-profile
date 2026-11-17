import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'

const base = '/jackieng-profile'
const description = 'Ng Lab, led by principal investigator Jackie Ng. Structural biology, protein machine learning and research questions at the interface of proteins and drug delivery.'
export const metadata: Metadata = {
  title: 'Ng Lab — Jackie Ng, Principal Investigator', description,
  alternates: { canonical: 'https://grasswall.github.io/jackieng-profile/lab/' },
  openGraph: { title: 'Ng Lab', description, url: 'https://grasswall.github.io/jackieng-profile/lab/', siteName: 'Ng Lab', type: 'website' },
  twitter: { card: 'summary', title: 'Ng Lab', description },
}

export default function LabPage() {
  return <main className={styles.lab} id="lab-top">
    <nav className={styles.localNav} aria-label="Lab navigation">
      <a className={styles.wordmark} href="#lab-top">Ng Lab</a>
      <div><a href="#research">Research</a><a href="#people">People</a><a href="#outputs">Work</a><a href="#lab-contact">Contact</a></div>
    </nav>
    <header className={styles.hero}>
      <div className={styles.heroCopy}>
        <h1>Ng Lab</h1>
        <p className={styles.statement}>Structure. Learning.<br />Biological interfaces.</p>
        <p>We explore how protein structure and interactions can inform questions in drug delivery.</p>
        <a className={styles.button} href="#research">Explore our research <span aria-hidden="true">↓</span></a>
        <p className={styles.piLine}>Led by Jackie Ng · Principal Investigator</p>
      </div>
      <figure className={styles.heroFigure}>
        <video controls loop muted playsInline preload="none" poster={`${base}/videos/structural-work/ecacc-single-blender.jpg`} aria-label="Rotating rendering of an EcAcc single-ring structural model from Jackie Ng’s work">
          <source src={`${base}/videos/structural-work/ecacc-single-blender.mp4`} type="video/mp4" />
        </video>
        <figcaption>EcAcc single-ring model · PI structural work. Rotation illustrates geometry, not molecular dynamics.</figcaption>
      </figure>
    </header>
    <section id="research" className={styles.research}>
      <div className={styles.sectionIntro}><h2>Research</h2><p>From molecular structure to questions we can test.</p></div>
      <article><h3>See the structure.</h3><p>Cryo-EM reconstruction and atomic model building provide the structural foundation. We are interested in how molecular assemblies organize and how structure informs mechanism.</p><Link href="/work">Explore the PI’s structural work ↗</Link></article>
      <article><h3>Learn from sequence.</h3><p>Protein machine learning offers a way to investigate sequence–function relationships. The public GB1 study compares additive and pairwise models, with held-out tests that expose limits to generalization.</p><Link href="/protein-benchmark">Try the public modelling study ↗</Link></article>
      <article><h3>Study the interface.</h3><p>Our research direction asks how protein interactions shape the biological environment of drug delivery, and which measurements and models can help us understand it.</p><p className={styles.note}>A research direction, not a claim of validated delivery performance. The structural projects, public ML study and AtomBios work remain distinct.</p></article>
    </section>
    <section id="people" className={styles.people}>
      <div><h2>People</h2><Image src={`${base}/images/gallery/headshot.jpg`} alt="Jackie Ng" width={600} height={720} className={styles.portrait} /></div>
      <div className={styles.bio}><h3>Jackie Ng</h3><p className={styles.role}>Principal Investigator</p><p>A structural biologist with machine-learning capability and founder of AtomBios. Jackie’s work connects hands-on cryo-EM and atomic model building with questions about protein interactions in drug delivery.</p><p>His co-authored research includes a 2024 publication in the <i>Journal of Biological Chemistry</i>.</p><Link href="/about">About Jackie ↗</Link><a href="mailto:jackie.ng@atombios.com">Contact the PI ↗</a></div>
    </section>
    <section id="outputs" className={styles.outputs}>
      <div className={styles.sectionIntro}><h2>Selected work</h2><p>The PI’s research record and an open computational study.</p></div>
      <a href="https://doi.org/10.1016/j.jbc.2024.107390" className={styles.output}><span>Publication · 2024</span><h3>Journal of Biological Chemistry</h3><p>Co-authored research · DOI: 10.1016/j.jbc.2024.107390</p><span>Read the paper ↗</span></a>
      <Link href="/protein-benchmark" className={styles.output}><span>Interactive study</span><h3>Protein sequence → fitness</h3><p>Explore a GB1 sequence–fitness benchmark, its methods and held-out evaluation. Public demonstration built with AI assistance using Wu et al. (2016); not a lab publication or delivery validation.</p><span>Inspect the study ↗</span></Link>
    </section>
    <section id="lab-contact" className={styles.contact}>
      <h2>Talk science with us.</h2><div><p>For research conversations and collaboration inquiries, contact Jackie directly.</p><a href="mailto:jackie.ng@atombios.com">jackie.ng@atombios.com ↗</a><Link href="/">Jackie’s personal site ↗</Link></div>
    </section>
  </main>
}
