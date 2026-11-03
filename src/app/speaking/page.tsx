import type { Metadata } from "next";
import { Media } from "@/components/Media";
import { UnifiedContact } from "@/components/UnifiedContact";

export const metadata: Metadata = {
  title: "Speaking & Media — Jackie Ng",
  description: "Speaking engagements, media appearances, and public science communication. Scientific meeting participation, selected speaking engagements and RTHK, BRTV and print coverage.",
};

const mediaCards = [
  { id: "rthk", type: "large" as const, outlet: "RTHK · Hong Kong Public Broadcaster", title: "尋找創科的故事", description: "On-camera interview on RTHK's Innovation Stories, sharing the story behind AtomBios.", photo: "/jackieng-profile/images/gallery/rthk-broadcast.jpg", badge: "TV interview" },
  { id: "brtv", type: "large" as const, outlet: "BRTV · Beijing Television", title: "轉在北京", description: "Featured on Beijing Television.", photo: "/jackieng-profile/images/gallery/beijing-tv-speaking.jpg", badge: "TV feature" },
  { id: "mingpao", type: "regular" as const, outlet: "Ming Pao · Sing Tao", title: "Print Interviews", description: "Published interviews in Ming Pao and Sing Tao on science and entrepreneurship.", photo: "/jackieng-profile/images/gallery/mingpao-spread.jpg" },
  { id: "jbc", type: "text-only" as const, outlet: "J. Biological Chemistry", title: "Published Research", description: "Tang et al. — Novel host cell factors interacting with SARS-CoV-2 spike protein RBD.", badge: "Peer-reviewed · JBC" },
];

const speakingList = [
  { org: "Lindau Nobel Laureate Meeting", title: "Selected participant · 2025" },
  { org: "Shaw Prize Forum", title: "Academic representative · Laureates Roundtable 2025" },
  { org: "Max Planck Institute", title: "RPG Forum — Speaker 2025" },
  { org: "HK-Jiangsu Symposium", title: "Drug Discovery Speaker 2025" },
  { org: "GBA EM Forum", title: "2nd GBA Cryo-EM Frontier Forum — Speaker 2025" },
  { org: "São Paulo Advanced Science School", title: "SPSAS Attendee 2025" },
  { org: "PolyU ABCT", title: "6th RPG Symposium — Best Oral Presentation 2025" },
  { org: "HKSTP × Hang Seng", title: "Ecopreneur Programme — Speaker & Member 2025" },
  { org: "iRecycle", title: "綠色採購交流分享會 — Guest Speaker 2026" },
];

export default function SpeakingPage() {
  return (
    <main className="unified-site">
      <header className="u-page-header"><h1>Science, in public.</h1><p>Speaking, media coverage and scientific participation. The roles are identified individually below.</p></header>

      <Media cards={mediaCards} speaking={speakingList} />
      <UnifiedContact />
    </main>
  );
}
