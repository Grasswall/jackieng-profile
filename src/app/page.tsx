import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { Recognition } from "@/components/Recognition";
import { Competitions } from "@/components/Competitions";
import { AtomBios } from "@/components/AtomBios";
import { Media } from "@/components/Media";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";

const stats = [
  { value: "Nobel", label: "Lindau Laureate Meeting" },
  { value: "1st Author", label: "JBC 2024" },
  { value: "4.0 / 4.3", label: "HKUST GPA, Dean's List ×7" },
  { value: "AtomBios", label: "Founder" },
];

const recognitionItems = [
  {
    index: "01",
    title: "Lindau Nobel Laureate Meeting",
    org: "Nobel Foundation",
    year: "2025",
    description:
      "Selected as a Young Scientist to participate in the 74th Lindau Nobel Laureate Meeting, engaging with laureates in chemistry and life sciences.",
    photo: "/jackieng-profile/assets/nobel-new.jpg",
  },
  {
    index: "02",
    title: "Shaw Prize Science Forum",
    org: "Shaw Prize Foundation",
    year: "2025",
    description:
      "Invited speaker at the Shaw Prize Science Forum, presenting research on computational approaches to structural biology.",
    photo: "/jackieng-profile/assets/shaw-prize-new.jpg",
  },
  {
    index: "03",
    title: "CAS Future Leader",
    org: "Chinese Academy of Sciences",
    year: "2025",
    description:
      "Designated a CAS Future Leader — a selective programme identifying early-career researchers shaping the future of science across Greater China.",
    photo: "/jackieng-profile/assets/abct-new.jpg",
  },
  {
    index: "04",
    title: "Young Scientist Award",
    org: "Hong Kong Laureate Forum",
    year: "2024",
    description:
      "Awarded for outstanding contributions to science and innovation among young researchers in Hong Kong.",
    photo: "/jackieng-profile/assets/hklf-new.jpg",
  },
  {
    index: "05",
    title: "First-Author Publication",
    org: "Journal of Biological Chemistry",
    year: "Publication",
    description:
      "First-author research article in JBC 2024. DOI: 10.1016/j.jbc.2024.107390",
    photo: undefined,
  },
];

const competitionItems = [
  {
    title: "Techathon+",
    badge: "Gold Award",
    description:
      "Top prize at the international Techathon+ competition for technology innovation.",
    photo: "/jackieng-profile/assets/techathon-new.jpg",
  },
  {
    title: "赢在苏州",
    badge: "Rising Star",
    description:
      "Rising Star Award at 赢在苏州, a major entrepreneurship competition for innovation in the Greater Bay Area.",
    photo: "/jackieng-profile/assets/suzhou-award-new.jpg",
  },
  {
    title: "GBA STEAM Education Challenge",
    badge: "Silver Award",
    description:
      "Silver recognition for educational initiatives bridging STEAM disciplines in the Greater Bay Area.",
    photo: "/jackieng-profile/assets/gba-steam.png",
  },
  {
    title: "SUSS Pitch for Good",
    badge: "People's Choice",
    description:
      "People's Choice Award at SUSS Pitch for Good — an international competition for ventures with meaningful societal impact.",
    photo: undefined,
  },
  {
    title: "HKSTP Ideation Programme",
    badge: "Ideation",
    description:
      "Selected for the Hong Kong Science and Technology Parks Ideation Programme — an elite accelerator track for deep-tech founders.",
    photo: undefined,
  },
];

const mediaCards = [
  {
    id: "rthk",
    title: "尋找創科的故事",
    outlet: "RTHK",
    description:
      "On-camera interview on RTHK's Innovation Stories discussing AtomBios and molecular simulation.",
    photo: "/jackieng-profile/assets/rthk-broadcast.jpg",
  },
  {
    id: "brtv",
    title: "轉在北京",
    outlet: "BRTV Beijing",
    description:
      "Featured on Beijing Television as a Hong Kong scientist making impact in Greater China's innovation ecosystem.",
    photo: "/jackieng-profile/assets/beijing-tv-gesture.jpg",
  },
  {
    id: "mingpao",
    title: "Ming Pao Daily",
    outlet: "Ming Pao",
    description:
      "Feature profile in Ming Pao Daily highlighting Jackie's scientific achievements and vision for AtomBios.",
    photo: "/jackieng-profile/assets/mingpao-spread.jpg",
  },
  {
    id: "singtao",
    title: "Sing Tao Daily",
    outlet: "Sing Tao",
    description:
      "Coverage in Sing Tao Daily on Jackie's contributions to Hong Kong's science and innovation ecosystem.",
    photo: "/jackieng-profile/assets/rthk-broadcast.jpg",
  },
];

const speakingList = [
  { org: "Nobel Foundation", title: "74th Lindau Nobel Laureate Meeting — Panel discussion on structural biology" },
  { org: "Shaw Prize Foundation", title: "Shaw Prize Science Forum — Young scientist spotlight" },
  { org: "PolyU · ABCT", title: "Invited talk: From structures to therapeutics — a computational roadmap" },
];

const educationItems = [
  {
    degree: "MPhil",
    field: "Biochemistry",
    institution: "Hong Kong Polytechnic University",
    years: "2023–present",
    highlights: [
      "Computational structural biology, cryo-EM, and binding free energy calculation",
      "Research Postgraduate Scholarship",
    ],
  },
  {
    degree: "BSc",
    field: "Biochemistry & Cell Biology",
    institution: "Hong Kong University of Science and Technology",
    years: "2019–2023",
    highlights: [
      "First Class Honours · GPA 4.0 / 4.3 · Dean's List ×7",
    ],
  },
];

export default function Home() {
  return (
    <main>
      <Hero />
      <SocialProof stats={stats} />
      <Recognition items={recognitionItems} />
      <Competitions items={competitionItems} />
      <AtomBios headshot="/jackieng-profile/assets/headshot.jpg" />
      <Media cards={mediaCards} speaking={speakingList} />
      <Education items={educationItems} />
      <Contact />
    </main>
  );
}
