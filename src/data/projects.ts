import arianet from "@/assets/work-arianet.jpg";
import pooyesh from "@/assets/work-pooyesh.jpg";
import arex from "@/assets/work-arex.jpg";
import seper from "@/assets/work-seper.jpg";
import xima from "@/assets/work-xima.jpg";
import gilaneh from "@/assets/work-gilaneh.jpg";
import zeevash from "@/assets/work-zeevash.jpg";
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
  content: string[];
  videoUrl?: string;
};

export const projects: Project[] = [
  { slug: "arianet", title: "Arianet", client: "Internet Solutions", year: "2025", category: "Brand Strategy · Telecom",
    description: "End-to-end identity and campaign work for a next-generation internet provider. Confident type, calm color, infrastructure that feels human.",
    image: arianet,
    content: [
      "Arianet asked us to translate a complex telecom infrastructure into a brand that feels calm, confident and human. We led naming refinement, voice, identity system and the launch campaign.",
      "The wordmark pairs a wide geometric sans with a quiet stroke modulation — a subtle nod to signal flow. The system extends across product UI, retail signage and broadcast.",
    ],
  },
  { slug: "pooyesh", title: "Pooyesh", client: "Royan Fertility Center", year: "2022", category: "Visual Identity · Healthcare",
    description: "Environmental and visual identity for a leading fertility center. Soft geometry, optimistic palette, designed to reassure at every touchpoint.",
    image: pooyesh,
    content: [
      "Pooyesh is the patient-facing identity for Royan Fertility Center. We designed a system that quietly reassures — soft geometry, warm color, generous whitespace.",
      "From wayfinding to consultation rooms to take-home material, every surface was tuned for emotional clarity.",
    ],
  },
  { slug: "arex", title: "Arex", client: "Digital Transactions", year: "2024", category: "Visual Identity · Fintech",
    description: "Mark and system for a digital transaction facilitator. Quiet geometry, confident voice. With Wilma Studio.",
    image: arex,
    content: [
      "Arex is a digital transaction facilitator operating across borders. The mark is built from two interlocking forms — a quiet metaphor for trust and exchange.",
      "Built in collaboration with Wilma Studio.",
    ],
  },
  { slug: "seper", title: "Seper", client: "AI Agents Explorer", year: "2026", category: "Personal Brand · Editorial",
    description: "An editorial-led personal brand for an AI researcher. Long-form typography, generous whitespace, a system built to think out loud.",
    image: seper,
    content: [
      "Seper is the editorial-led personal brand for an AI researcher. The system is built around long-form thinking — generous measure, considered hierarchy, room to breathe.",
    ],
  },
  { slug: "xima", title: "Xima", client: "Hospitality", year: "2024", category: "Visual Identity · Hospitality",
    description: "Identity for a boutique hospitality concept. Warm minimalism, tactile materials, a logotype that feels like an invitation.",
    image: xima,
    content: [
      "Xima is a boutique hospitality concept. The identity leans into warm minimalism — tactile materials, a hand-drawn quality in the wordmark, an invitation in every detail.",
    ],
  },
  { slug: "gilaneh", title: "Gilaneh", client: "Persian Grill House — Vancouver", year: "2023", category: "Brand · Packaging",
    description: "Brand and packaging for a Persian grill house in Vancouver. Heritage motifs, modern grid, an identity that travels well.",
    image: gilaneh,
    content: [
      "Gilaneh brings a Persian grill house to Vancouver. We blended heritage motifs with a modern grid to create an identity that travels well across menu, packaging and storefront.",
    ],
  },
  { slug: "zeevash", title: "Zeevash", client: "Health Tech", year: "2023", category: "Brand · Product",
    description: "Brand and product surface for a health-tech platform. Clinical clarity meets approachable color and a friendly, modular system.",
    image: zeevash,
    content: [
      "Zeevash is a health-tech platform. The brand and product surfaces share a single modular system — clinical clarity, approachable color, friendly motion.",
    ],
  },
  { slug: "phownix", title: "Phownix", client: "Mobile Equipment", year: "2022", category: "Packaging Design",
    description: "Packaging system for a mobile equipment line. Bold marks, confident hierarchy, designed for shelf and street.",
    image: phownix,
    content: [
      "Phownix needed a packaging system that performed on shelf and street. Bold marks, confident hierarchy, an unmistakable family across SKUs.",
    ],
  },
  { slug: "palo-santo", title: "Palo Santo", client: "Classic Furniture, est. 2009", year: "2022", category: "Logo · Identity",
    description: "Identity refresh for a classic furniture maker. A quieter mark, considered details, and a system rooted in craft.",
    image: palosanto,
    content: [
      "An identity refresh for a classic furniture maker. We quieted the mark, sharpened the details and built a system rooted in craft.",
    ],
  },
  { slug: "tabesh", title: "Tabesh", client: "Brand Development Center", year: "2022", category: "Identity System",
    description: "A flexible identity system for a brand development center. Editorial layouts, modular components, designed to grow.",
    image: tabesh,
    content: [
      "Tabesh is a brand development center. The identity is a flexible editorial system — modular components, considered layouts, designed to grow with the work.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
