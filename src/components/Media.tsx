"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

export interface MediaEntry {
  id: string;
  category: "coverage" | "speaking" | "participation";
  title: string;
  outlet: string;
  role: string;
  year: number;
  date?: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  sourceTitle?: string;
  photo?: string;
  photoAlt?: string;
}

const categories = [
  { id: "all", label: "All" },
  { id: "coverage", label: "Coverage" },
  { id: "speaking", label: "Talks" },
  { id: "participation", label: "Participation" },
] as const;
type Category = typeof categories[number]["id"];

function EntryDate({ entry }: { entry: MediaEntry }) {
  return <time dateTime={entry.date || String(entry.year)}>{entry.date
    ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${entry.date}T12:00:00Z`))
    : entry.year}</time>;
}

export function Media({ entries }: { entries: MediaEntry[] }) {
  const [category, setCategory] = useState<Category>("all");
  const [year, setYear] = useState("all");
  const [query, setQuery] = useState("");
  const years = useMemo(() => Array.from(new Set(entries.map(entry => entry.year))).sort((a, b) => b - a), [entries]);
  const filtered = useMemo(() => {
    const text = query.trim().toLocaleLowerCase();
    return entries.filter(entry => (category === "all" || entry.category === category)
      && (year === "all" || String(entry.year) === year)
      && (!text || [entry.title, entry.outlet, entry.role, entry.description, entry.sourceTitle].filter(Boolean).join(" ").toLocaleLowerCase().includes(text)));
  }, [entries, category, year, query]);
  const groups = {
    coverage: filtered.filter(entry => entry.category === "coverage"),
    speaking: filtered.filter(entry => entry.category === "speaking"),
    participation: filtered.filter(entry => entry.category === "participation"),
  };
  const reset = () => { setCategory("all"); setYear("all"); setQuery(""); };
  const hasFilter = category !== "all" || year !== "all" || query.length > 0;

  const records = (items: MediaEntry[]) => <div className="media-list">{items.map(entry => (
    <article className="media-record media-enter" key={entry.id} id={entry.id}>
      <EntryDate entry={entry} />
      <div className="media-record-body"><h3>{entry.title}</h3><p>{entry.outlet}</p>{entry.description && <p>{entry.description}</p>}
        {entry.href && <a className="media-text-link" href={entry.href} target="_blank" rel="noopener noreferrer" aria-label={`${entry.linkLabel || "View source"}: ${entry.title} (opens in new tab)`}>{entry.linkLabel || "View source"}<span aria-hidden="true">↗</span></a>}
      </div>
      <div className="media-record-role">{entry.role}</div>
    </article>
  ))}</div>;

  return <>
    <div id="archive" className="media-tools media-frame" role="search" aria-label="Filter the media archive">
      <div className="media-filter-group" role="group" aria-label="Entry type">{categories.map(item => <button key={item.id} type="button" aria-pressed={category === item.id} aria-controls="media-results" onClick={() => setCategory(item.id)}>{item.label}</button>)}</div>
      <div className="media-query">
        <label htmlFor="media-search">Search the archive<input id="media-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Outlet, event or topic" aria-controls="media-results" /></label>
        <label htmlFor="media-year">Year<select id="media-year" value={year} onChange={event => setYear(event.target.value)} aria-controls="media-results"><option value="all">All years</option>{years.map(value => <option key={value} value={value}>{value}</option>)}</select></label>
      </div>
    </div>
    <div className="media-result-line media-frame"><span role="status" aria-live="polite" aria-atomic="true">{filtered.length} of {entries.length} entries{hasFilter ? " match your filters" : " in the archive"}</span>{hasFilter && <button className="media-reset" onClick={reset}>Clear filters</button>}</div>
    <div id="media-results">
      {groups.coverage.length > 0 && <section id="coverage" className="media-section media-frame" aria-labelledby="coverage-heading">
        <div className="media-section-head"><h2 id="coverage-heading">In the news</h2><p>Publisher-labelled reports and features. Coverage of the same event is kept distinct from separate appearances.</p></div>
        <div className="media-coverage-grid">{groups.coverage.map(entry => <article id={entry.id} className="media-story media-enter" key={entry.id}>
          {entry.photo && <figure><Image src={entry.photo} alt={entry.photoAlt || entry.title} width={960} height={600} loading="eager" sizes="(max-width: 640px) 100vw, 50vw" /></figure>}
          <div className="media-outlet">{entry.outlet}</div>
          <h3>{entry.title}</h3>
          <div className="media-story-meta"><span>{entry.role}</span><EntryDate entry={entry} /></div>
          {entry.description && <p>{entry.description}</p>}
          {entry.href && <a className="media-text-link" href={entry.href} target="_blank" rel="noopener noreferrer" aria-label={`${entry.linkLabel || "Read the story"}: ${entry.title} (opens in new tab)`}>{entry.linkLabel || "Read the story"}<span aria-hidden="true">↗</span></a>}
        </article>)}</div>
      </section>}
      {groups.speaking.length > 0 && <section id="talks" className="media-section media-frame" aria-labelledby="talks-heading">
        <div className="media-section-head"><h2 id="talks-heading">Talks & presentations</h2><p>Research presentations and public speaking.</p></div>
        {records(groups.speaking)}
      </section>}
      {groups.participation.length > 0 && <section id="participation" className="media-section media-frame media-participation" aria-labelledby="participation-heading">
        <div className="media-section-head"><h2 id="participation-heading">Scientific exchange</h2><p>Participation and representative roles, separate from speaking engagements.</p></div>
        {records(groups.participation)}
      </section>}
      {!filtered.length && <section className="media-empty media-frame" aria-labelledby="media-empty-heading"><h2 id="media-empty-heading">No matches</h2><p>Try another event, outlet or year.</p><button className="media-text-link" onClick={reset}>Show all entries <span aria-hidden="true">↗</span></button></section>}
    </div>
  </>;
}
