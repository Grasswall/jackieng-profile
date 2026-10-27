import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { Recognition } from "@/components/Recognition";
import { Competitions } from "@/components/Competitions";
import { AtomBios } from "@/components/AtomBios";
import { Media } from "@/components/Media";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { meta } from "@/lib/data";

const stats = [
  { label: "Nobel-tier affiliations", value: 3 },
  { label: "Startup competition wins", value: 6, suffix: "+" },
  { label: "Speaking engagements", value: 15, suffix: "+" },
  { label: "Published in JBC", value: 1 },
  { label: "Funding secured", value: 200, suffix: "k+" },
];

const recognitionItems = [
  {
    index: "01",
    title: "Nobel Laureate Meeting",
    org: "Nobel Foundation · Lindau 2025",
    description:
      "Attended the Lindau Nobel Laureate Meeting as one of Hong Kong's young scientists — the world's premier gathering of scientific excellence. Fewer than 600 young scientists worldwide are invited each year.",
    photo: "/jackieng-profile/assets/nobel-new.jpg",
    institution: "Nobel Foundation",
    year: "2025",
  },
  {
    index: "02",
    title: "Shaw Prize Roundtable",
    org: "Shaw Prize Foundation · 2025",
    description:
      "Academic Representative at the Shaw Laureates Roundtable — the Asian equivalent of the Nobel Prize — engaging directly with laureates in life science, astronomy, and mathematics.",
    photo: "/jackieng-profile/assets/shaw-prize-new.jpg",
    institution: "Shaw Prize Foundation",
    year: "2025",
  },
  {
    index: "03",
    title: "Hong Kong Laureate Forum",
    org: "HKLF · Young Scientist 2024",
    description:
      "Attended as a Young Scientist — connecting emerging researchers with Nobel, Turing, and Fields Medal laureates. One of fewer than 200 scientists invited globally per cohort.",
    photo: "/jackieng-profile/assets/hklf-new.jpg",
    institution: "HK Laureate Forum",
    year: "2024",
  },
  {
    index: "04",
    title: "CAS Future Leader",
    org: "Chinese Academy of Sciences · 2025",
    description:
      "Participated in the Chinese Academy of Sciences Future Leaders programme — one of the most prestigious early-career programmes by China's national academy of science.",
    photo: undefined,
    institution: "CAS",
    year: "2025",
  },
];

const competitionItems = [
  {
    title: "Techathon+ 10th Anniversary",
    badge: "Gold Medal" as const,
    badgeVariant: "gold" as const,
    context:
      "Hong Kong's top deep-tech pitch competition. 300+ teams. 10-year track record of producing funded startups.",
    description:
      "Gold Medal, 10th Anniversary edition. AtomBios beat competitors across AI, biotech, and hardware to take the top prize.",
    photo: "/jackieng-profile/assets/techathon-new.jpg",
  },
  {
    title: "贏在蘇州 Win in Suzhou",
    badge: "Rising Star Award" as const,
    badgeVariant: "gold" as const,
    context:
      "Suzhou Municipal Government's global pitch competition — the gateway to mainland China's biotech corridor.",
    description:
      "新銳獎 Rising Star Award — top international entrant in a field of mainland and global founders.",
    photo: "/jackieng-profile/assets/suzhou-award-new.jpg",
  },
  {
    title: "GBA STEAM Excellence",
    badge: "Silver Award" as const,
    badgeVariant: "outline" as const,
    context:
      "Cross-border innovation award spanning the 86-million-person Greater Bay Area.",
    description:
      "Silver in Postgraduate Life & Health. Competing against teams from Hong Kong, Shenzhen, Guangzhou, and Macau.",
    photo: "/jackieng-profile/assets/gba-steam.png",
  },
  {
    title: "ABCT RPG Symposium",
    badge: "Best Oral" as const,
    badgeVariant: "outline" as const,
    context:
      "PolyU's competitive research showcase — evaluated by faculty on science and delivery.",
    description:
      "Best Oral Presentation — 6th PolyU ABCT Research Postgraduate Symposium.",
    photo: "/jackieng-profile/assets/abct-new.jpg",
  },
];

const atomBiosPillars = [
  {
    icon: "⬡",
    title: "Atomic Precision",
    description:
      "Structural simulation grounded in cryo-EM verified models — every binding pocket, every residue.",
  },
  {
    icon: "⚡",
    title: "Pharma Speed",
    description:
      "Compressing the drug discovery timeline from years to weeks with GPU-accelerated molecular dynamics.",
  },
  {
    icon: "◎",
    title: "Human Insight",
    description:
      "Translating atomic-scale data into decisions that clinicians, investors, and researchers can act on.",
  },
];

const atomBiosBadges = [
  "HKSTP Ideation Approved",
  "PolyU IEP Incubatee",
  "MicroFund 25/26",
  "JoinCap Investment Secured",
];

const mediaCards = [
  {
    id: "rthk",
    type: "large" as const,
    outlet: "RTHK · Hong Kong Public Broadcaster",
    title: "尋找創科的故事",
    description:
      "On-camera interview on RTHK's Innovation Stories — Hong Kong's equivalent of the BBC — sharing the story behind AtomBios and molecular simulation.",
    photo: "/jackieng-profile/assets/rthk-broadcast.jpg",
    badge: "Live TV",
  },
  {
    id: "brtv",
    type: "large" as const,
    outlet: "BRTV · Beijing Television",
    title: "轉在北京",
    description:
      "Featured on Beijing Television — mainland China's national coverage — as a Hong Kong scientist making impact in Greater China's innovation ecosystem.",
    photo: "/jackieng-profile/assets/beijing-tv-speaking.jpg",
    badge: "National TV",
  },
  {
    id: "mingpao",
    type: "regular" as const,
    outlet: "Ming Pao · Sing Tao",
    title: "Print Interviews",
    description:
      "Published interviews in Hong Kong's leading Chinese-language newspapers on computational drug discovery and the intersection of science and entrepreneurship.",
    photo: "/jackieng-profile/assets/mingpao-spread.jpg",
  },
  {
    id: "jbc",
    type: "text-only" as const,
    outlet: "J. Biological Chemistry",
    title: "Published Research",
    description:
      "Tang et al. — Novel host cell factors interacting with SARS-CoV-2 spike protein RBD. One of the world's top-10 biochemistry journals by impact factor.",
    badge: "Peer-reviewed · JBC",
  },
];

const speakingList = [
  { org: "Nobel Foundation", title: "Lindau Nobel Laureate Meeting 2025" },
  { org: "Shaw Prize Foundation", title: "Shaw Laureates Roundtable 2025" },
  { org: "Max Planck Institute", title: "RPG Forum — Speaker 2025" },
  { org: "HK-Jiangsu Symposium", title: "Drug Discovery Speaker 2025" },
  { org: "GBA EM Forum", title: "2nd GBA Cryo-EM Frontier Forum — Speaker 2025" },
  { org: "São Paulo Advanced Science School", title: "SPSAS Attendee 2025" },
];

const educationItems = [
  {
    degree: "MPhil",
    field: "Biochemistry",
    institution: "The Hong Kong Polytechnic University",
    years: "2023–present",
    highlights: [
      "Cryo-EM structural biology & computational drug discovery",
      "Research Postgraduate Scholarship + HK$25k Conference Grant",
      "YDC Youth Ambassadors Programme",
    ],
    tags: ["Cryo-EM", "Drug Discovery", "Best Oral Presentation"],
  },
  {
    degree: "BSc",
    field: "Biochemistry & Cell Biology",
    institution: "The Hong Kong University of Science and Technology",
    years: "2019–2023",
    highlights: [
      "First Class Honours · MCGA 4.006 · 7× Dean's List",
      "MTR Corporation Scholarship, D.H. Chen Foundation Scholarship, AEON Credit Scholarship",
      "Kitchell Undergraduate Research Award",
    ],
    tags: ["First Class Honours", "7× Dean's List", "UROP Research"],
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero: dark navy — handled by Hero component itself */}
      <Hero />

      {/* SocialProof: dark charcoal */}
      <div className="bg-charcoal">
        <SocialProof stats={stats} />
      </div>

      {/* Recognition: light offwhite */}
      <div id="recognition" className="bg-offwhite py-32">
        <Recognition items={recognitionItems} />
      </div>

      {/* Competitions: light offwhite */}
      <div id="competitions" className="bg-offwhite py-32">
        <Competitions items={competitionItems} />
      </div>

      {/* AtomBios: dark navy */}
      <div id="atombios" className="bg-navy py-32">
        <AtomBios
          heading="Molecular simulation at pharma speed."
          tagline="Every drug team I talked to had the same problem. They could see the structure. They knew the pocket. But they couldn't test what happens when a molecule actually docks."
          description=""
          pillars={atomBiosPillars}
          programBadges={atomBiosBadges}
          headshot="/jackieng-profile/assets/headshot.jpg"
        />
      </div>

      {/* Media: light offwhite */}
      <div id="media" className="bg-offwhite py-32">
        <Media cards={mediaCards} speaking={speakingList} />
      </div>

      {/* Education: dark charcoal */}
      <div id="education" className="bg-charcoal py-32">
        <Education items={educationItems} />
      </div>

      {/* Contact: dark navy */}
      <div id="contact" className="bg-navy">
        <Contact
          email={meta.email}
          socialLinks={[
            { label: "LinkedIn", href: meta.socials.linkedin, icon: "linkedin" },
            { label: "Instagram", href: meta.socials.instagram, icon: "instagram" },
          ]}
          copyright={`© ${new Date().getFullYear()} Jackie Ng — The Invisible Architect. All rights reserved.`}
        />
      </div>
    </main>
  );
}
