import { Hero } from "@/components/Hero";
import { Recognition } from "@/components/Recognition";
import { Story } from "@/components/Story";
import { AtomBios } from "@/components/AtomBios";
import { Competitions } from "@/components/Competitions";
import { Press } from "@/components/Press";
import { Speaking } from "@/components/Speaking";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";

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
    year: "2024",
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
  },
  {
    title: "赢在苏州",
    badge: "Rising Star",
    description:
      "Rising Star Award at 赢在苏州, a major entrepreneurship competition in the Greater Bay Area.",
  },
  {
    title: "GBA STEAM Competition",
    badge: "Silver Award",
    description:
      "Silver Award in the Greater Bay Area STEAM Innovation Competition.",
  },
  {
    title: "SUSS Challenge",
    badge: "Finalist",
    description:
      "Finalist in the Singapore University of Social Sciences entrepreneurship challenge.",
  },
  {
    title: "HKSTP Ideation",
    badge: "Accepted",
    description:
      "Accepted into Hong Kong Science and Technology Parks Corporation Ideation Programme.",
  },
  {
    title: "PolyU IEP Year 12",
    badge: "Cohort",
    description:
      "Innovation and Entrepreneurship Programme at The Hong Kong Polytechnic University.",
  },
];

const pressCards = [
  {
    id: "rthk",
    title: "Young Scientist Profile",
    outlet: "RTHK",
    description: "Featured interview on research and entrepreneurship.",
    photo: "/jackieng-profile/assets/rthk-coverage.jpg",
  },
  {
    id: "brtv",
    title: "Beijing Young Innovator",
    outlet: "BRTV Beijing",
    description: "Coverage of computational biology work at CAS Forum.",
    photo: "/jackieng-profile/assets/brtv-coverage.jpg",
  },
  {
    id: "mingpao",
    title: "Hong Kong Researcher Honored",
    outlet: "Ming Pao",
    description: "Profile following Hong Kong Laureate Forum award.",
    photo: "/jackieng-profile/assets/mingpao-coverage.jpg",
  },
  {
    id: "singtao",
    title: "Biotech Startup Founder",
    outlet: "Sing Tao Daily",
    description: "AtomBios feature and founder interview.",
    photo: "/jackieng-profile/assets/singtao-coverage.jpg",
  },
];

const speakingEngagements = [
  {
    org: "Nobel Foundation",
    title: "Lindau Nobel Laureate Meeting 2025 — Young Scientist",
  },
  {
    org: "Shaw Prize Foundation",
    title: "Shaw Prize Science Forum 2025 — Invited Speaker",
  },
  {
    org: "PolyU ABCT",
    title: "Guest Lecturer — Computational Structural Biology",
  },
  {
    org: "CAS Forum",
    title: "Young Scientist Panel — Future of Drug Discovery",
  },
];

const educationItems = [
  {
    degree: "MPhil in Applied Biology and Chemical Technology",
    institution: "The Hong Kong Polytechnic University",
    years: "2024 – Present",
    highlights: [],
  },
  {
    degree: "BSc in Biochemistry and Cell Biology",
    institution: "Hong Kong University of Science and Technology",
    years: "2020 – 2024",
    highlights: [
      "First Class Honours",
      "GPA 4.0/4.3",
      "Dean's List ×7",
    ],
  },
];

export default function Home() {
  return (
    <main>
      <Hero atomBiosId="atombios" />
      <Recognition items={recognitionItems} />
      <Story />
      <AtomBios headshot="/jackieng-profile/assets/headshot.jpg" />
      <Competitions items={competitionItems} />
      <Press cards={pressCards} />
      <Speaking engagements={speakingEngagements} />
      <Education items={educationItems} />
      <Contact />
    </main>
  );
}
