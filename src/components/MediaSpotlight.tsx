"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { MediaEntry } from "./Media";
import "./MediaSpotlight.css";

const BASE = "/jackieng-profile/images/gallery/";
const media = [
  {id: "hk01-photo", image: "press-hk01-photo.jpg", outlet: "HK01", chinese: "香港01", title: "Atom Bios in HK01", detail: "Published photograph · October 2026", alt: "Photograph published in HK01’s Atom Bios feature", href: "https://www.hk01.com/企業創新/60394581/", width: 1600, height: 1067, credit: "Photograph: 梁鵬威 / 香港01"},
  {id: "hk01-clipping", image: "press-hk01-atombios.jpg", outlet: "HK01", chinese: "香港01", title: "The press clipping", detail: "Article capture · October 2026", alt: "HK01 article capture showing the Atom Bios photograph and text naming founder 吳卓禧", href: "https://www.hk01.com/企業創新/60394581/", width: 658, height: 907, credit: "Article capture / 香港01"},
  {id: "beijing", image: "press-beijing-programme.jpg", outlet: "Beijing", chinese: "北京卫视", title: "转在北京", detail: "Programme appearance · June 2026", alt: "Programme image from 转在北京 with the BRTV 北京卫视 branding", href: "", width: 1600, height: 1067, credit: "Programme image / 北京卫视"},
  {id: "jinjiang", image: "press-jinjiang-news.jpg", outlet: "Jinjiang", chinese: "晋江新闻", title: "International Future Challenge", detail: "Event news coverage · October 2026", alt: "Jinjiang news still retaining the station branding and International Future Challenge headline", href: "https://www.jinjiang.gov.cn/xxgk/jjyw/202610/t20261020_3337167.htm", width: 1600, height: 739, credit: "News still / 晋江市电视台"},
];
const features = [{index: 0, kind: "lead", type: "Press"}, {index: 2, kind: "beijing", type: "Programme"}, {index: 3, kind: "jinjiang", type: "News"}];

export function MediaSpotlight({entries}: {entries: MediaEntry[]}) {
  const [open, setOpen] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const selected = open === null ? null : media[open];
  useEffect(() => {
    if (open === null) return;
    if (!dialog.current?.open) dialog.current?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {document.body.style.overflow = overflow;};
  }, [open]);
  const show = (index: number, button?: HTMLButtonElement) => {
    if (button) trigger.current = button;
    setZoomed(false);
    if (stage.current) stage.current.scrollTo(0,0);
    setOpen(index);
  };
  const close = () => {dialog.current?.close();setOpen(null);setZoomed(false);trigger.current?.focus({preventScroll:true});};
  const move = (direction: number) => {if (open !== null) show((open + direction + media.length) % media.length);};
  const coverage = entries.filter(entry => entry.category === "coverage" && entry.id !== "hk01-2026");
  return <section id="media" className="ms" aria-labelledby="media-heading">
    <header className="ms-header">
      <h2 id="media-heading">In the media<span aria-hidden="true">.</span></h2>
      <Link className="ms-archive" href="/speaking">All coverage &amp; appearances <span aria-hidden="true">↗</span></Link>
    </header>
    <div className="ms-wall">
      {features.map(({index,kind,type}) => {
        const item=media[index];
        return <figure className={`ms-feature ms-feature-${kind}`} key={item.id}>
          <button className="ms-image-button" type="button" onClick={event=>show(index,event.currentTarget)} aria-label={`Open ${item.outlet} ${item.chinese}: ${item.title}`} aria-haspopup="dialog">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={BASE+item.image} alt={item.alt} width={item.width} height={item.height} loading="eager" />
            <span className="ms-type" aria-hidden="true">{type}</span>
            <span className="ms-expand" aria-hidden="true">↗</span>
          </button>
          <figcaption><span className="ms-caption-main"><span className="ms-outlet">{item.outlet} <span lang="zh">{item.chinese}</span></span><span className="ms-title">{item.title}</span></span><span className="ms-date">{item.detail.split(" · ")[1]}</span></figcaption>
          {kind === "lead" && <div className="ms-lead-note"><span className="ms-credit">{item.credit}</span><button type="button" className="ms-clipping-link" onClick={event=>show(1,event.currentTarget)}>View press clipping <span aria-hidden="true">↗</span></button></div>}
        </figure>;
      })}
    </div>
    <footer className="ms-footer"><span className="ms-more-label">More coverage</span><div className="ms-coverage-links" aria-label="Other original coverage sources">{coverage.map(entry => <a key={entry.id} href={entry.href} target="_blank" rel="noopener noreferrer">{entry.id === "suss-2026" ? "SUSS" : entry.id === "hkust-2026" ? "HKUST" : entry.id === "hkstp-ecopreneur-2025" ? "HKSTP" : entry.outlet}<span aria-hidden="true">↗</span><span className="sr-only"> · {entry.role} (opens in new tab)</span></a>)}</div></footer>
    <dialog className="ms-viewer" ref={dialog} aria-label={selected ? `${selected.outlet}: ${selected.title}` : "Media viewer"} onCancel={event=>{event.preventDefault();close();}} onClick={event=>{if(event.target===event.currentTarget)close();}} onKeyDown={event=>{
      if((event.target as HTMLElement).closest(".ms-thumbnails"))return;
      if(event.key==="ArrowRight"){event.preventDefault();move(1);}
      if(event.key==="ArrowLeft"){event.preventDefault();move(-1);}
    }}>
      {selected && <div className="ms-viewer-content">
        <div className="ms-toolbar"><span>{selected.outlet} <span lang="zh">{selected.chinese}</span></span><button className="ms-close" type="button" onClick={close} autoFocus>Close ×</button></div>
        <div className={`ms-viewer-stage${zoomed ? " is-zoomed" : ""}`} ref={stage}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BASE+selected.image} alt={selected.alt} width={selected.width} height={selected.height} />
        </div>
        <div className="ms-viewer-caption"><div><p className="ms-viewer-title" aria-live="polite">{selected.title}</p><p>{selected.detail} · {selected.credit}</p></div><div className="ms-viewer-links"><button className="ms-zoom" type="button" onClick={()=>setZoomed(!zoomed)} aria-pressed={zoomed}>{zoomed ? "Fit image" : "Zoom image"}</button>{selected.href && <a href={selected.href} target="_blank" rel="noopener noreferrer">Original source ↗<span className="sr-only"> (opens in new tab)</span></a>}</div></div>
        <div className="ms-viewer-bottom"><button className="ms-prev" type="button" onClick={()=>move(-1)} aria-label="Previous media image">←</button><div className="ms-thumbnails" role="group" aria-label="Choose a media image">{media.map((item,index)=><button key={item.id} type="button" onClick={()=>show(index)} aria-pressed={open===index} aria-label={`${item.outlet}: ${item.title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BASE+item.image} alt="" width={80} height={52} />
        </button>)}</div><button className="ms-next" type="button" onClick={()=>move(1)} aria-label="Next media image">→</button><span className="ms-counter" aria-live="polite">{String((open ?? 0)+1).padStart(2,"0")} / {String(media.length).padStart(2,"0")}</span></div>
      </div>}
    </dialog>
  </section>;
}
