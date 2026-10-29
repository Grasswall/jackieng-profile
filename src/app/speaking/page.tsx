import type { Metadata } from "next";
import { Media } from "@/components/Media";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/TextReveal";

export const metadata: Metadata = {
  title: "Speaking & Media — Jackie Ng",
  description: "Speaking engagements, media appearances, and public science communication. Nobel Foundation, Shaw Prize, Max Planck Institute, RTHK, BRTV, and more.",
};

const mediaCards = [
  { id: "rthk", type: "large" as const, outlet: "RTHK · Hong Kong Public Broadcaster", title: "尋找創科的故事", description: "On-camera interview on RTHK's Innovation Stories, sharing the story behind AtomBios.", photo: "/jackieng-profile/assets/rthk-broadcast.jpg", badge: "TV interview" },
  { id: "brtv", type: "large" as const, outlet: "BRTV · Beijing Television", title: "轉在北京", description: "Featured on Beijing Television.", photo: "/jackieng-profile/assets/beijing-tv-speaking.jpg", badge: "TV feature" },
  { id: "mingpao", type: "regular" as const, outlet: "Ming Pao · Sing Tao", title: "Print Interviews", description: "Published interviews in Ming Pao and Sing Tao on science and entrepreneurship.", photo: "/jackieng-profile/assets/mingpao-spread.jpg" },
  { id: "jbc", type: "text-only" as const, outlet: "J. Biological Chemistry", title: "Published Research", description: "Tang et al. — Novel host cell factors interacting with SARS-CoV-2 spike protein RBD.", badge: "Peer-reviewed · JBC" },
];

const speakingList = [
  { org: "Nobel Foundation", title: "Lindau Nobel Laureate Meeting 2025" },
  { org: "Shaw Prize Foundation", title: "Shaw Laureates Roundtable 2025" },
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
    <main className="min-h-screen bg-cream pb-24 pt-28 text-ink md:pt-36">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <SectionLabel label="Speaking & Media" />
        <TextReveal as="h1" className="mb-14 mt-8 max-w-[14ch] font-heading text-[2.6rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl md:mb-20 md:text-7xl">
          {`The science,\ntold publicly.`}
        </TextReveal>
      </div>

      <Media cards={mediaCards} speaking={speakingList} />
    </main>
  );
}
