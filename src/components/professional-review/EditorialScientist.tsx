'use client'

/* eslint-disable @next/next/no-img-element */

import { useState } from 'react'
import styles from './EditorialScientist.module.css'
import {
  CORONA,
  HERO_PHOTO,
  IDENTITY,
  LINKS,
  MAIL,
  PRESS_LINE,
  PROOFS,
  RECOGNITION,
  SYNTH,
  img,
} from './evidence'
import { useTabKeys } from './useTabKeys'

// Design A. Photo-led identity on cream, with a short curated evidence selector.
export function EditorialScientist() {
  const [active, setActive] = useState(0)
  const { setRef, onKeyDown } = useTabKeys(PROOFS.length, setActive)
  const proof = PROOFS[active]

  return (
    <div className={styles.root}>
      <header className={styles.hero}>
        <img
          className={styles.heroImg}
          src={HERO_PHOTO.src}
          width={HERO_PHOTO.w}
          height={HERO_PHOTO.h}
          alt={HERO_PHOTO.alt}
          fetchPriority="high"
        />
        <div className={styles.heroScrim} aria-hidden="true" />
        <div className={`${styles.heroText} on-dark`}>
          <h1 className={styles.name}>Jackie Ng</h1>
          <p className={styles.identity}>{IDENTITY.line}</p>
          <ul className={styles.ctaRow}>
            <li>
              <a className={styles.ctaPrimary} href={MAIL.hire}>
                Discuss a role
              </a>
            </li>
            <li>
              <a className={styles.ctaGhost} href={MAIL.collab}>
                Propose a collaboration
              </a>
            </li>
            <li>
              <a className={styles.ctaGhost} href={MAIL.cv}>
                Request my CV
              </a>
            </li>
          </ul>
        </div>
        <p className={styles.heroCaption}>{HERO_PHOTO.caption}</p>
      </header>

      <section className={styles.statement} aria-labelledby="a-statement">
        <div className={styles.portrait}>
          <img
            src={img('images/gallery/headshot.jpg')}
            width={832}
            height={1035}
            alt="Portrait of Jackie Ng"
            loading="lazy"
          />
        </div>
        <div className={styles.statementText}>
          <p className={styles.eyebrow}>Work across scales</p>
          <h2 id="a-statement" className={styles.statementHead}>
            From a single atom position to a particle that crosses the blood-brain barrier.
          </h2>
          <p className={styles.lede}>
            I solve cryo-EM structures, train machine-learning models for LNP design, and run the
            company that tests them. Below is the evidence, with what each item does and does not
            show.
          </p>
          <ul className={styles.facts}>
            {IDENTITY.short.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.evidence} aria-labelledby="a-evidence">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Selected evidence</p>
          <h2 id="a-evidence" className={styles.h2}>
            Six records. Pick one.
          </h2>
        </div>
        <div className={styles.selector}>
          <div role="tablist" aria-label="Evidence records" aria-orientation="vertical" className={styles.tabs}>
            {PROOFS.map((p, i) => (
              <button
                key={p.id}
                ref={setRef(i)}
                role="tab"
                id={`a-tab-${p.id}`}
                aria-selected={i === active}
                aria-controls="a-panel"
                tabIndex={i === active ? 0 : -1}
                className={styles.tab}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                <span className={styles.tabCode}>{p.code}</span>
                <span className={styles.tabLabel}>{p.label}</span>
                <span className={styles.tabStat}>{p.stat}</span>
              </button>
            ))}
          </div>
          <div
            role="tabpanel"
            id="a-panel"
            aria-labelledby={`a-tab-${proof.id}`}
            tabIndex={0}
            className={styles.panel}
          >
            <p className={styles.panelStat} aria-hidden="true">
              {proof.stat}
            </p>
            <p className={styles.panelNote}>{proof.statNote}</p>
            <h3 className={styles.panelHead}>{proof.headline}</h3>
            <p className={styles.panelBody}>{proof.body}</p>
            <dl className={styles.meta}>
              <div>
                <dt>My role</dt>
                <dd>{proof.role}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{proof.status}</dd>
              </div>
            </dl>
            <p className={styles.boundary}>
              <span>Boundary</span> {proof.boundary}
            </p>
            {proof.links ? (
              <ul className={styles.links}>
                {proof.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noreferrer">
                      {l.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </section>

      <section className={styles.recognition} aria-labelledby="a-recognition">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>In the room</p>
          <h2 id="a-recognition" className={styles.h2}>
            Selected, invited and awarded.
          </h2>
        </div>
        <ul className={styles.gallery}>
          {RECOGNITION.map((r, i) => (
            <li key={r.id} className={`${styles.shot} ${styles[`shot${i}`]}`}>
              <figure>
                <div className={styles.shotImg}>
                  <img src={r.photo} width={r.w} height={r.h} alt={r.alt} loading="lazy" />
                </div>
                <figcaption>
                  <span className={styles.shotYear}>{r.year}</span>
                  <span className={styles.shotTitle}>{r.title}</span>
                  <span className={styles.shotNote}>{r.note}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className={styles.press}>{PRESS_LINE}</p>
      </section>

      <section className={`${styles.artifacts} on-dark`} aria-labelledby="a-artifacts">
        <div className={styles.artifactsInner}>
          <div className={styles.artifactsText}>
            <p className={styles.eyebrowLight}>{SYNTH.label}</p>
            <h2 id="a-artifacts" className={styles.h2Light}>
              What a small model learned, in 3D.
            </h2>
            <p className={styles.artifactsBody}>{SYNTH.caption}</p>
          </div>
          <video
            className={styles.video}
            src={SYNTH.video}
            poster={SYNTH.poster}
            controls
            loop
            muted
            playsInline
            preload="none"
            aria-label="3D decision surface from the synthetic-data demo network: particle size and ApoE density versus predicted brain-targeting probability"
          />
        </div>
        <div className={styles.corona}>
          <ul className={styles.coronaTiles}>
            {CORONA.tiles.map((src, i) => (
              <li key={src}>
                <img
                  src={src}
                  width={231}
                  height={231}
                  loading="lazy"
                  alt={`Cryo-EM 2D class average ${i + 1} of the LNP protein corona complex`}
                />
              </li>
            ))}
          </ul>
          <p className={styles.coronaCaption}>
            {CORONA.caption}{' '}
            <a href={CORONA.all} target="_blank" rel="noreferrer">
              All 200 classes
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </section>

      <section className={styles.contact} aria-labelledby="a-contact">
        <h2 id="a-contact" className={styles.contactHead}>
          Talk to me about a role or a project.
        </h2>
        <p className={styles.contactBody}>
          I read every message. Tell me the problem and the stage it is at.
        </p>
        <ul className={styles.contactLinks}>
          <li>
            <a className={styles.ctaDark} href={MAIL.hire}>
              Discuss a role
            </a>
          </li>
          <li>
            <a className={styles.ctaOutline} href={MAIL.collab}>
              Propose a collaboration
            </a>
          </li>
          <li>
            <a className={styles.ctaOutline} href={MAIL.cv}>
              Request my CV
            </a>
          </li>
          <li>
            <a className={styles.textLink} href={LINKS.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}
