"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { MediaEntry } from "./Media";
import "./MediaSpotlight.css";

const BASE = "/jackieng-profile/images/gallery/";
const press = [
  { id: "singtao-print", image: "press-singtao-clipping.jpg", outlet: "Sing Tao Headline", title: "Future Ecopreneur", detail: "Programme coverage · 6 November 2025", alt: "Published programme feature with its Chinese headline, photographs and text naming Jackie Ng", href: "https://www.stheadline.com/ad-activity/3514993/", kind: "print" },
  { id: "singtao-portrait", image: "press-singtao-portrait.jpg", outlet: "Sing Tao Headline", title: "In the feature", detail: "Published photograph · November 2025", alt: "Sing Tao Headline article image and Chinese caption identifying 吳卓禧 (Jackie)", href: "https://www.stheadline.com/ad-activity/3514993/", kind: "portrait" },
  { id: "mingpao", image: "press-mingpao-page.jpg", outlet: "Ming Pao", title: "Green entrepreneurship", detail: "Programme coverage · 6 November 2025", alt: "Ming Pao article capture showing the publication name, 6 November 2025 date and a photograph caption naming Jackie", href: "", kind: "page" },
];

export function MediaSpotlight({entries}: {entries: MediaEntry[]}) {
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (open !== null) dialog.current?.showModal();
  }, [open]);
  const close = () => {dialog.current?.close();setOpen(null);trigger.current?.focus();};
  const selected = open === null ? null : press[open];
  const coverage = entries.filter(entry => entry.category === "coverage");
  return <section id="media" className="ms" aria-labelledby="media-heading">
    <header className="ms-header">
      <h2 id="media-heading">In the media</h2>
      <Link className="ms-archive" href="/speaking">Coverage &amp; appearances <span aria-hidden="true">↗</span></Link>
    </header>
    <div className="ms-press-spread">
      {press.map((item,index) => <figure className={`ms-press ms-press-${item.kind}`} key={item.id}>
        <button className="ms-image-button" type="button" onClick={event => {trigger.current=event.currentTarget;setOpen(index);}} aria-label={`Enlarge ${item.outlet}: ${item.title}`} aria-haspopup="dialog">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BASE + item.image} alt={item.alt} width={item.kind === "print" ? 1600 : 1000} height={item.kind === "print" ? 1364 : 1800} loading="eager" />
          <span className="ms-enlarge" aria-hidden="true">View image ↗</span>
        </button>
        <figcaption><span className="ms-outlet">{item.outlet}</span><span className="ms-detail">{item.detail}</span></figcaption>
      </figure>)}
    </div>
    <div className="ms-coverage-links" aria-label="Original coverage sources">
      {coverage.map(entry => <a key={entry.id} href={entry.href} target="_blank" rel="noopener noreferrer">{entry.id === "suss-2026" ? "SUSS" : entry.id === "hkust-2026" ? "HKUST" : entry.id === "hkstp-ecopreneur-2025" ? "HKSTP" : entry.outlet}<span aria-hidden="true">↗</span><span className="sr-only"> · {entry.role} (opens in new tab)</span></a>)}
    </div>
    <dialog className="ms-lightbox" ref={dialog} aria-label={selected ? `${selected.outlet} media image` : "Media image"} onCancel={event => {event.preventDefault();close();}} onClick={event => {if(event.target === event.currentTarget) close();}}>
      {selected && <div className="ms-lightbox-content">
        <div className="ms-lightbox-toolbar"><span>{selected.outlet}</span><button type="button" onClick={close} autoFocus>Close ×</button></div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BASE+selected.image} alt={selected.alt} width={1600} height={1800} />
        {selected.href && <a href={selected.href} target="_blank" rel="noopener noreferrer">Read the original feature ↗<span className="sr-only"> (opens in new tab)</span></a>}
      </div>}
    </dialog>
  </section>;
}
