"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { MediaEntry } from "./Media";
import "./MediaSpotlight.css";

const BASE = "/jackieng-profile/images/gallery/";
const press = [
  { id: "hk01", image: "press-hk01-atombios.jpg", outlet: "HK01", chinese: "香港01", title: "Atom Bios in HK01", detail: "Press feature · October 2026", alt: "HK01 article capture showing the Atom Bios section, published photograph and text naming founder 吳卓禧", href: "https://www.hk01.com/企業創新/60394581/", kind: "lead", width: 658, height: 907 },
  { id: "beijing", image: "press-beijing-programme.jpg", outlet: "Beijing", chinese: "北京卫视", title: "转在北京", detail: "Programme appearance · June 2026", alt: "Programme image from 转在北京 with the BRTV 北京卫视 branding", href: "", kind: "beijing", width: 1600, height: 1067 },
  { id: "jinjiang", image: "press-jinjiang-news.jpg", outlet: "Jinjiang", chinese: "晋江新闻", title: "International Future Challenge", detail: "Event news coverage · October 2026", alt: "Jinjiang television news still with the station branding and International Future Challenge event headline", href: "https://www.jinjiang.gov.cn/xxgk/jjyw/202610/t20261020_3337167.htm", kind: "jinjiang", width: 1600, height: 739 },
];

export function MediaSpotlight({entries}: {entries: MediaEntry[]}) {
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const previous = useRef<number | null>(null);
  useEffect(() => {
    if (open !== null && !dialog.current?.open) dialog.current?.showModal();
    if (open === null && previous.current !== null) trigger.current?.focus();
    previous.current = open;
  }, [open]);
  const close = () => {dialog.current?.close();setOpen(null);};
  const move = (direction: number) => setOpen(current => current === null ? null : (current + direction + press.length) % press.length);
  const selected = open === null ? null : press[open];
  const coverage = entries.filter(entry => entry.category === "coverage" && entry.id !== "hk01-2026");
  return <section id="media" className="ms" aria-labelledby="media-heading">
    <header className="ms-header">
      <div className="ms-heading-group"><p className="ms-kicker">Selected coverage</p><h2 id="media-heading">In the <em>media.</em></h2></div>
      <Link className="ms-archive" href="/speaking"><span>All coverage<br />&amp; appearances</span><span className="ms-link-arrow" aria-hidden="true">↗</span></Link>
    </header>
    <div className="ms-press-spread">
      {press.map((item,index) => <figure className={`ms-press ms-press-${item.kind}`} key={item.id}>
        <div className="ms-masthead"><span className="ms-outlet">{item.outlet}</span><span className="ms-chinese" lang="zh">{item.chinese}</span></div>
        <button className="ms-image-button" type="button" onClick={event => {trigger.current=event.currentTarget;setOpen(index);}} onPointerMove={event => {
          if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
          const rect = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty("--mx", `${((event.clientX-rect.left)/rect.width-.5)*10}px`);
          event.currentTarget.style.setProperty("--my", `${((event.clientY-rect.top)/rect.height-.5)*10}px`);
        }} onPointerLeave={event => {event.currentTarget.style.removeProperty("--mx");event.currentTarget.style.removeProperty("--my");}} aria-label={`Enlarge ${item.outlet} ${item.chinese}: ${item.title}`} aria-haspopup="dialog">
          <span className="ms-image-mat">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={BASE + item.image} alt={item.alt} width={item.width} height={item.height} loading="eager" />
          </span>
          <span className="ms-enlarge" aria-hidden="true">↗</span>
          <span className="ms-view-label" aria-hidden="true">View feature</span>
        </button>
        <figcaption><span className="ms-feature-title">{item.title}</span><span className="ms-detail">{item.detail}</span></figcaption>
      </figure>)}
    </div>
    <footer className="ms-coverage-footer"><p className="ms-more-label">Also covered by</p><div className="ms-coverage-links" aria-label="Other original coverage sources">
      {coverage.map(entry => <a key={entry.id} href={entry.href} target="_blank" rel="noopener noreferrer">{entry.id === "suss-2026" ? "SUSS" : entry.id === "hkust-2026" ? "HKUST" : entry.id === "hkstp-ecopreneur-2025" ? "HKSTP" : entry.outlet}<span aria-hidden="true">↗</span><span className="sr-only"> · {entry.role} (opens in new tab)</span></a>)}
    </div></footer>
    <dialog className="ms-lightbox" ref={dialog} aria-label={selected ? `${selected.outlet} media image` : "Media image"} onCancel={event => {event.preventDefault();close();}} onClick={event => {if(event.target === event.currentTarget) close();}} onKeyDown={event => {if(event.key === "ArrowRight"){event.preventDefault();move(1);}if(event.key === "ArrowLeft"){event.preventDefault();move(-1);}}}>
      {selected && <div className="ms-lightbox-content">
        <div className="ms-lightbox-toolbar"><span>{selected.outlet} <span lang="zh">{selected.chinese}</span></span><button className="ms-close" type="button" onClick={close} autoFocus>Close ×</button></div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BASE+selected.image} alt={selected.alt} width={selected.width} height={selected.height} />
        <div className="ms-lightbox-bottom"><div className="ms-lightbox-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous media image">←</button><span aria-live="polite">{String((open ?? 0)+1).padStart(2,"0")} / {String(press.length).padStart(2,"0")}</span><button type="button" onClick={() => move(1)} aria-label="Next media image">→</button></div>{selected.href && <a href={selected.href} target="_blank" rel="noopener noreferrer">Original source ↗<span className="sr-only"> (opens in new tab)</span></a>}</div>
      </div>}
    </dialog>
  </section>;
}
