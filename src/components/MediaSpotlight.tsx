"use client";

import { useState } from "react";
import Link from "next/link";
import type { MediaEntry } from "./Media";
import "./MediaSpotlight.css";

type View = "coverage" | "speaking";
const BASE = "/jackieng-profile/images/gallery/";
const selections = ["suss-2026", "hk01-2026", "hkust-2026", "sing-tao-2025"];
const photographs: Record<string, {file: string; caption: string}> = {
  "suss-2026": {file: "suss-1.jpg", caption: "Event photograph · Pitch for Good"},
  "hk01-2026": {file: "champion-1.jpg", caption: "Event photograph · PHBS–CJBS competition"},
  "hkust-2026": {file: "techathon-1.jpg", caption: "Event photograph · Techathon+"},
  "sing-tao-2025": {file: "hkstp-1.jpg", caption: "Event photograph · HKSTP Ecopreneur"},
  "ecopreneur-2025": {file: "hkstp-1.jpg", caption: "Event photograph · HKSTP Ecopreneur"},
};
const shortOutlets: Record<string,string> = {
  "suss-2026": "SUSS", "hkust-2026": "HKUST", "sing-tao-2025": "Sing Tao Headline",
};

export function MediaSpotlight({entries}: {entries: MediaEntry[]}) {
  const [view, setView] = useState<View>("coverage");
  const [chosen, setChosen] = useState("suss-2026");
  const stories = view === "coverage"
    ? selections.map(id => entries.find(entry => entry.id === id)).filter((entry): entry is MediaEntry => !!entry)
    : entries.filter(entry => entry.category === "speaking").sort((a,b) => Number(b.id === "ecopreneur-2025") - Number(a.id === "ecopreneur-2025"));
  const active = stories.find(entry => entry.id === chosen) || stories[0];
  if (!active) return null;
  const photo = photographs[active.id];
  const related = active.id === "sing-tao-2025" ? entries.filter(entry => ["hkstp-ecopreneur-2025", "bastillepost-2025"].includes(entry.id)) : [];
  const revealSelection = () => {
    if (window.matchMedia("(max-width: 640px)").matches) {
      window.requestAnimationFrame(() => document.getElementById("media-feature")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      }));
    }
  };
  const switchView = (next: View) => {
    setView(next);
    setChosen(next === "coverage" ? "suss-2026" : "ecopreneur-2025");
    revealSelection();
  };

  return <section id="media" className="ms" aria-labelledby="media-heading">
    <header className="ms-header">
      <h2 id="media-heading">Media &amp; speaking</h2>
      <Link className="ms-archive" href="/speaking">Full archive <span aria-hidden="true">↗</span></Link>
    </header>
    <div className="ms-layout">
      <div className="ms-feature" id="media-feature" role="region" aria-label="Selected appearance">
        <div className="ms-visual" key={active.id}>
          {photo ? <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={BASE + photo.file} alt={photo.caption} width={1600} height={1100} loading="lazy" />
            <figcaption>{photo.caption}</figcaption>
          </figure> : <div className="ms-talk-poster"><p>{active.outlet}</p><h3>{active.title}</h3><p>{active.role} · {active.year}</p></div>}
        </div>
        <div className="ms-caption" aria-live="polite" aria-atomic="true">
          <p className="ms-attribution">{active.outlet} · {active.year}</p>
          {photo && <h3>{active.title}</h3>}
          <p className="ms-role">{active.role}</p>
          {active.href && <a className="ms-source" href={active.href} target="_blank" rel="noopener noreferrer">{active.linkLabel || "Read original"} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in new tab)</span></a>}
          {related.length > 0 && <div className="ms-related"><span>Same programme, also covered by</span>{related.map(entry => <a key={entry.id} href={entry.href} target="_blank" rel="noopener noreferrer">{entry.id === "hkstp-ecopreneur-2025" ? "HKSTP · organiser release" : "Bastille Post · programme coverage"}<span className="sr-only"> (opens in new tab)</span> ↗</a>)}</div>}
        </div>
      </div>
      <div className="ms-index">
        <div className="ms-switch" role="group" aria-label="Browse appearances">
          <button type="button" aria-pressed={view === "coverage"} onClick={() => switchView("coverage")}>Coverage</button>
          <button type="button" aria-pressed={view === "speaking"} onClick={() => switchView("speaking")}>Talks</button>
        </div>
        <ul className="ms-stories" aria-label={view === "coverage" ? "Selected coverage" : "Talks and appearances"}>
          {stories.map(entry => <li key={entry.id}>
            <button type="button" className="ms-story" aria-pressed={active.id === entry.id} aria-controls="media-feature" onClick={() => {setChosen(entry.id);revealSelection();}}>
              <span className="ms-story-meta"><span>{shortOutlets[entry.id] || entry.outlet}</span><time dateTime={String(entry.year)}>{entry.year}</time></span>
              <span className="ms-story-title">{entry.title}</span>
              <span className="ms-story-kind">{entry.role}</span>
              <span className="ms-story-arrow" aria-hidden="true">↗</span>
            </button>
          </li>)}
        </ul>
      </div>
    </div>
  </section>;
}
