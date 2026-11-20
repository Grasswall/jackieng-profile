"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { MediaEntry } from "./Media";
import "./MediaSpotlight.css";

const BASE = "/jackieng-profile/images/gallery/";
const press = [
  { id: "hk01", image: "press-hk01-atombios.jpg", outlet: "HK01 香港01", title: "Atom Bios in HK01", detail: "Press feature · October 2026", alt: "HK01 article capture showing the Atom Bios section, published photograph and text naming founder 吳卓禧", href: "https://www.hk01.com/企業創新/60394581/", kind: "lead", width: 658, height: 907 },
  { id: "beijing", image: "press-beijing-programme.jpg", outlet: "Beijing · 北京卫视", title: "转在北京", detail: "Programme appearance · June 2026", alt: "Programme image from 转在北京 with the BRTV 北京卫视 branding", href: "", kind: "beijing", width: 1600, height: 1067 },
  { id: "jinjiang", image: "press-jinjiang-news.jpg", outlet: "Jinjiang · 晋江新闻", title: "International Future Challenge", detail: "Event news coverage · October 2026", alt: "Jinjiang television news still with the station branding and International Future Challenge event headline", href: "https://www.jinjiang.gov.cn/xxgk/jjyw/202610/t20261020_3337167.htm", kind: "jinjiang", width: 1600, height: 739 },
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
  const coverage = entries.filter(entry => entry.category === "coverage" && entry.id !== "hk01-2026");
  return <section id="media" className="ms" aria-labelledby="media-heading">
    <header className="ms-header">
      <h2 id="media-heading">In the media</h2>
      <Link className="ms-archive" href="/speaking">Coverage &amp; appearances <span aria-hidden="true">↗</span></Link>
    </header>
    <div className="ms-press-spread">
      {press.map((item,index) => <figure className={`ms-press ms-press-${item.kind}`} key={item.id}>
        <button className="ms-image-button" type="button" onClick={event => {trigger.current=event.currentTarget;setOpen(index);}} aria-label={`Enlarge ${item.outlet}: ${item.title}`} aria-haspopup="dialog">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BASE + item.image} alt={item.alt} width={item.width} height={item.height} loading="eager" />
          <span className="ms-enlarge" aria-hidden="true">View image ↗</span>
        </button>
        <figcaption><span className="ms-outlet">{item.outlet}</span><span className="ms-feature-title">{item.title}</span><span className="ms-detail">{item.detail}</span></figcaption>
      </figure>)}
    </div>
    <div className="ms-coverage-links" aria-label="Other original coverage sources">
      <span className="ms-more-label">More coverage</span>
      {coverage.map(entry => <a key={entry.id} href={entry.href} target="_blank" rel="noopener noreferrer">{entry.id === "suss-2026" ? "SUSS" : entry.id === "hkust-2026" ? "HKUST" : entry.id === "hkstp-ecopreneur-2025" ? "HKSTP" : entry.outlet}<span aria-hidden="true">↗</span><span className="sr-only"> · {entry.role} (opens in new tab)</span></a>)}
    </div>
    <dialog className="ms-lightbox" ref={dialog} aria-label={selected ? `${selected.outlet} media image` : "Media image"} onCancel={event => {event.preventDefault();close();}} onClick={event => {if(event.target === event.currentTarget) close();}}>
      {selected && <div className="ms-lightbox-content">
        <div className="ms-lightbox-toolbar"><span>{selected.outlet}</span><button type="button" onClick={close} autoFocus>Close ×</button></div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BASE+selected.image} alt={selected.alt} width={selected.width} height={selected.height} />
        {selected.href && <a href={selected.href} target="_blank" rel="noopener noreferrer">View original source ↗<span className="sr-only"> (opens in new tab)</span></a>}
      </div>}
    </dialog>
  </section>;
}
