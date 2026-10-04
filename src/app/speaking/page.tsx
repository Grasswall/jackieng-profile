import type { Metadata } from "next";
import { Media } from "@/components/Media";

export const metadata: Metadata = {
  title: "Speaking & Media — Jackie Ng",
  description: "Speaking engagements, media appearances, and public science communication.",
};

const mediaCards = [
  {
    id: "rthk",
    outlet: "RTHK",
    title: "尋找創科的故事",
    description: "On-camera interview on RTHK's Innovation Stories discussing AtomBios and molecular simulation.",
    photo: "/jackieng-profile/assets/rthk-broadcast.jpg",
  },
  {
    id: "brtv",
    outlet: "BRTV Beijing",
    title: "轉在北京",
    description: "Featured on Beijing Television as a Hong Kong scientist making impact in Greater China.",
    photo: "/jackieng-profile/assets/beijing-tv-speaking.jpg",
  },
  {
    id: "mingpao",
    outlet: "Ming Pao",
    title: "Print Interviews",
    description: "Published interviews in Hong Kong's leading newspapers on computational drug discovery.",
    photo: "/jackieng-profile/assets/mingpao-spread.jpg",
  },
  {
    id: "jbc",
    outlet: "J. Biological Chemistry",
    title: "Published Research",
    description: "Tang et al. — Novel host cell factors interacting with SARS-CoV-2 spike protein RBD.",
    photo: undefined,
  },
];

const speakingList = [
  { org: "Nobel Foundation", title: "Lindau Nobel Laureate Meeting 2025" },
  { org: "Shaw Prize Foundation", title: "Shaw Laureates Roundtable 2025" },
  { org: "Max Planck Institute", title: "RPG Forum — Speaker 2025" },
  { org: "HK-Jiangsu Symposium", title: "Drug Discovery Speaker 2025" },
  { org: "GBA EM Forum", title: "2nd GBA Cryo-EM Frontier Forum — Speaker 2025" },
  { org: "PolyU ABCT", title: "6th RPG Symposium — Best Oral Presentation 2025" },
];

export default function SpeakingPage() {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '3rem' }}>
      <div className="container">
        <h1 className="section-heading">Speaking & Media</h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '42ch' }}>
          The science, told publicly.
        </p>
      </div>

      <Media cards={mediaCards} speaking={speakingList} />
    </main>
  );
}
