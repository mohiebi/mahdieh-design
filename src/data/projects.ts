import arianet from "@/assets/work-arianet.jpg";
import pooyesh from "@/assets/work-pooyesh.jpg";
import arex from "@/assets/work-arex.jpg";
import seper from "@/assets/work-seper.jpg";
import xima from "@/assets/work-xima.jpg";
import ako from "@/assets/work-ako.jpg";
import gilaneh from "@/assets/work-gilaneh.jpg";
import zeevash from "@/assets/work-zeevash.jpg";
import ayenehKhaneh from "@/assets/work-ayeneh-khaneh.jpg";
import phownix from "@/assets/work-phownix.jpg";
import palosanto from "@/assets/work-palosanto.jpg";
import tabesh from "@/assets/work-tabesh.jpg";

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  category: string;
  description: string;
  image: string;
  services: string[];
  location?: string;
  credit?: string;
  content: string[];
  videoUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "arianet",
    title: "Arianet",
    client: "MCI",
    year: "2025",
    category: "Business Collaboration",
    description:
      "A telecom collaboration identity built around speed, trust, and a clear launch message.",
    image: arianet,
    services: ["Brand strategy", "Campaign concept", "Visual identity"],
    credit: "Portfolio source: Nexa Inc.",
    content: [
      "Arianet frames a business collaboration around the line Speed Is Life. The identity uses confident contrast, fast composition, and simple messaging to make telecom infrastructure feel direct and energetic.",
      "The system is designed for a launch context: memorable enough for campaign use, but structured enough to support service communication across digital and presentation surfaces.",
    ],
  },
  {
    slug: "pooyesh",
    title: "Pooyesh",
    client: "Royan Fertility Center",
    year: "2022",
    category: "Branding Project",
    description:
      "A soft and reassuring healthcare identity for a fertility center, spanning logo, visual identity, and environmental graphics.",
    image: pooyesh,
    services: ["Logo design", "Visual identity", "Environmental graphics"],
    location: "Isfahan, Iran",
    content: [
      "Pooyesh is the patient-facing brand for Royan Fertility Center. Its visual language is built to feel warm, careful, and emotionally steady for a sensitive healthcare journey.",
      "The portfolio shows the identity moving from the mark into physical space, with environmental graphics and printed materials carrying the same calm visual rhythm.",
    ],
  },
  {
    slug: "arex",
    title: "Arex",
    client: "Arex",
    year: "2024",
    category: "Brand Design",
    description: "A secure and efficient visual system for a digital transaction facilitator.",
    image: arex,
    services: ["Brand design", "Logo system", "Visual identity"],
    credit: "In collaboration with Wilma Studio.",
    content: [
      "Arex is positioned as a digital transaction facilitator, so the brand needed to communicate security, movement, and operational clarity in a compact system.",
      "The resulting identity uses strong geometry and a restrained visual language that can work across product, communication, and trust-building brand moments.",
    ],
  },
  {
    slug: "seper",
    title: "Seper",
    client: "Ai Explorer",
    year: "2026",
    category: "Personal Brand",
    description:
      "A personal brand for an AI explorer, built around independent thinking and an editorial visual voice.",
    image: seper,
    services: ["Brand strategy", "Personal brand", "Editorial direction"],
    location: "England",
    content: [
      "Seper is a personal brand for an AI explorer, shaped around the idea of forging a path before the map exists. The identity gives that thought a quiet but distinctive visual presence.",
      "The system favors clear hierarchy, editorial pacing, and a sense of exploration that can support articles, talks, digital profiles, and long-form thinking.",
    ],
  },
  {
    slug: "xima",
    title: "Xima",
    client: "Xima",
    year: "2021",
    category: "Branding Project",
    description:
      "A construction company identity balancing respect for the past with a forward-building perspective.",
    image: xima,
    services: ["Logo design", "Visual identity"],
    content: [
      "Xima is a construction company identity with a clear positioning idea: believing in the past while building the future. The brand uses that tension as its visual anchor.",
      "The identity is direct and architectural, giving the company a system that can work across business stationery, signage, site material, and presentation use.",
    ],
  },
  {
    slug: "ako",
    title: "Ako",
    client: "Mohammad Aghajari",
    year: "2023",
    category: "Real Estate Brand",
    description:
      "Naming and visual identity for Ako Real Estate Group, a Tehran-based real estate brand.",
    image: ako,
    services: ["Brand naming", "Visual identity", "Brand design"],
    location: "Tehran, Iran",
    content: [
      "Ako is a real estate group identity developed from naming through visual language. The work gives the brand a polished, high-trust presence for a competitive property market.",
      "The project focuses on a clean mark, refined layout behavior, and a visual system that can adapt from corporate communication to real estate listing and client-facing material.",
    ],
  },
  {
    slug: "gilaneh",
    title: "Gilaneh",
    client: "Gilaneh",
    year: "2023",
    category: "Branding Project",
    description: "Brand and packaging design for an Iranian grill house in Vancouver.",
    image: gilaneh,
    services: ["Logo design", "Visual identity", "Packaging design"],
    location: "Vancouver, Canada",
    content: [
      "Gilaneh brings an Iranian grill house identity into a Vancouver restaurant context. The brand blends a hospitality voice with cultural memory and a strong packaging system.",
      "The work extends from the core logo into menus, takeaway packaging, and brand surfaces that need to feel recognizable both in-store and in customers' hands.",
    ],
  },
  {
    slug: "zeevash",
    title: "Zeevash",
    client: "Zeevash Pharmacy",
    year: "2023",
    category: "Brand Strategy",
    description:
      "A pharmacy identity and packaging system with clinical clarity and approachable retail behavior.",
    image: zeevash,
    services: ["Brand strategy", "Visual identity", "Packaging design"],
    location: "Tehran, Iran",
    content: [
      "Zeevash is a pharmacy brand system that needs to feel trustworthy, organized, and approachable. The visual direction keeps the experience clear without becoming cold.",
      "The portfolio presents the identity across packaging and pharmacy touchpoints, giving the brand a flexible system for health, retail, and service communication.",
    ],
  },
  {
    slug: "ayeneh-khaneh",
    title: "Ayeneh Khaneh",
    client: "Ayeneh Khaneh",
    year: "2020",
    category: "Branding Project",
    description: "Logo, visual identity, and UI design for a design and construction company.",
    image: ayenehKhaneh,
    services: ["Logo design", "Visual identity", "UI design"],
    content: [
      "Ayeneh Khaneh is a design and construction company identity. The project connects architectural structure with a refined brand language that can live across print and digital touchpoints.",
      "The system includes UI design alongside the core visual identity, so the brand can present its work with a consistent tone from portfolio material to web interfaces.",
    ],
  },
  {
    slug: "phownix",
    title: "Phownix",
    client: "Phownix Mobile Equipment",
    year: "2023",
    category: "Packaging Design",
    description:
      "A bold packaging system for mobile equipment products, designed for shelf impact and fast recognition.",
    image: phownix,
    services: ["Packaging design", "Product line system"],
    content: [
      "Phownix needed packaging that could compete quickly in a mobile equipment category where recognition and hierarchy matter at a glance.",
      "The design creates a strong product-family feel, using assertive typography and repeatable structure so each item can stand alone while still belonging to the same system.",
    ],
  },
  {
    slug: "palo-santo",
    title: "Palo Santo",
    client: "Palo Santo",
    year: "2022",
    category: "Branding Project",
    description:
      "A classic and neoclassical furniture identity rooted in craft, detail, and restraint.",
    image: palosanto,
    services: ["Logo design", "Visual identity"],
    content: [
      "Palo Santo is a furniture brand with a classic and neoclassical character. The identity needed to feel crafted, established, and attentive to detail.",
      "The visual system keeps the mark and layouts restrained, letting materials, furniture forms, and brand tone carry the sense of quality.",
    ],
  },
  {
    slug: "tabesh",
    title: "Tabesh",
    client: "Tabesh Brand Center",
    year: "2022",
    category: "Branding Project",
    description:
      "A brand development center identity spanning logo, visual identity, and environmental graphics.",
    image: tabesh,
    services: ["Logo design", "Visual identity", "Environmental graphics"],
    content: [
      "Tabesh is a brand development center, so its own identity needed to feel flexible, strategic, and capable of holding many kinds of brand work.",
      "The portfolio shows a system that can move through printed matter, environmental graphics, and presentation contexts without losing its editorial discipline.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
