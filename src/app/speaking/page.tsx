import type { Metadata } from "next";
import Link from "next/link";
import { Media, type MediaEntry } from "@/components/Media";
import entries from "../../../data/media.json";
import meta from "../../../data/meta.json";
import "./media.css";

const title = "Media & Speaking — Jackie Ng";
const description = "Explore Jackie Ng’s media coverage, research presentations and scientific exchange. Browse by type, year or topic, with links to published sources.";
const url = `${meta.siteUrl}/speaking/`;
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website" },
  twitter: { card: "summary", title, description },
};

export default function SpeakingPage() {
  return (
    <main className="media-page" id="media-page">
      <header className="media-intro media-frame">
        <h1>Media<br />& speaking.</h1>
        <div className="media-intro-copy"><p>From the research bench to public conversations. Coverage, talks and scientific exchange with Jackie Ng.</p><a href="#archive" className="media-text-link">Explore the archive <span aria-hidden="true">↓</span></a></div>
      </header>
      <Media entries={entries as MediaEntry[]} />
      <section id="press-contact" className="media-press-contact media-frame" aria-labelledby="press-contact-heading">
        <div><h2 id="press-contact-heading">Press & invitations</h2><p>For an interview or a speaking invitation, get in touch with the topic, format and date.</p></div>
        <div><a className="media-contact-link" href={`mailto:${meta.email}?subject=Media%20or%20speaking%20enquiry`}>{meta.email}</a><div className="media-contact-links"><Link href="/about" className="media-text-link">About Jackie <span aria-hidden="true">↗</span></Link><Link href="/work" className="media-text-link">Research & work <span aria-hidden="true">↗</span></Link></div></div>
      </section>
    </main>
  );
}
