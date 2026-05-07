import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
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

type Project = {
  title: string;
  client: string;
  year: string;
  category: string;
  description: string;
  image: string;
};

const projects: Project[] = [
  { title: "Arianet", client: "Internet Solutions", year: "2025", category: "Brand Strategy · Telecom",
    description: "End-to-end identity and campaign work for a next-generation internet provider. Confident type, calm color, infrastructure that feels human.",
    image: arianet },
  { title: "Pooyesh", client: "Royan Fertility Center", year: "2022", category: "Visual Identity · Healthcare",
    description: "Environmental and visual identity for a leading fertility center. Soft geometry, optimistic palette, designed to reassure at every touchpoint.",
    image: pooyesh },
  { title: "Arex", client: "Digital Transactions", year: "2024", category: "Visual Identity · Fintech",
    description: "Mark and system for a digital transaction facilitator. Quiet geometry, confident voice. With Wilma Studio.",
    image: arex },
  { title: "Seper", client: "AI Agents Explorer", year: "2026", category: "Personal Brand · Editorial",
    description: "An editorial-led personal brand for an AI researcher. Long-form typography, generous whitespace, a system built to think out loud.",
    image: seper },
  { title: "Xima", client: "Hospitality", year: "2024", category: "Visual Identity · Hospitality",
    description: "Identity for a boutique hospitality concept. Warm minimalism, tactile materials, a logotype that feels like an invitation.",
    image: xima },
  { title: "Gilaneh", client: "Persian Grill House — Vancouver", year: "2023", category: "Brand · Packaging",
    description: "Brand and packaging for a Persian grill house in Vancouver. Heritage motifs, modern grid, an identity that travels well.",
    image: gilaneh },
  { title: "Zeevash", client: "Health Tech", year: "2023", category: "Brand · Product",
    description: "Brand and product surface for a health-tech platform. Clinical clarity meets approachable color and a friendly, modular system.",
    image: zeevash },
  { title: "Phownix", client: "Mobile Equipment", year: "2022", category: "Packaging Design",
    description: "Packaging system for a mobile equipment line. Bold marks, confident hierarchy, designed for shelf and street.",
    image: phownix },
  { title: "Palo Santo", client: "Classic Furniture, est. 2009", year: "2022", category: "Logo · Identity",
    description: "Identity refresh for a classic furniture maker. A quieter mark, considered details, and a system rooted in craft.",
    image: palosanto },
  { title: "Tabesh", client: "Brand Development Center", year: "2022", category: "Identity System",
    description: "A flexible identity system for a brand development center. Editorial layouts, modular components, designed to grow.",
    image: tabesh },
];

export function Work() {
  return (
    <section id="projects" className="px-6 lg:px-12 py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto">
        <Reveal className="flex items-end justify-between flex-wrap gap-6 mb-20 lg:mb-28">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">
              ✦ Selected Projects — 2022 / 2026
            </div>
            <h2 className="font-display text-5xl md:text-7xl">Recent projects.</h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            A curated archive of identities, campaigns and product work.
            From early concept and naming through to systems and rollout.
          </p>
        </Reveal>

        <div className="flex flex-col gap-24 lg:gap-32">
          {projects.map((p, i) => {
            const reversed = i % 2 === 1;
            return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* Text column */}
                <div className={`lg:col-span-5 ${reversed ? "lg:order-2 lg:col-start-8" : "lg:order-1"}`}>
                  <div className="flex items-center justify-between gap-6 text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-8">
                    <span>{p.category}</span>
                    <span>{p.year}</span>
                  </div>

                  <h3 className="font-display text-6xl md:text-7xl leading-[0.95] mb-8">
                    {p.title}
                    <span className="text-accent">.</span>
                  </h3>

                  <p className="text-base lg:text-lg leading-relaxed text-muted-foreground max-w-md mb-10">
                    {p.description}
                  </p>

                  <div className="flex items-center gap-4">
                    <span className="h-px w-10 bg-foreground/60" aria-hidden />
                    <span className="text-[11px] font-mono uppercase tracking-[0.3em]">
                      Case Study — Soon
                    </span>
                  </div>
                </div>

                {/* Image column */}
                <div className={`lg:col-span-7 ${reversed ? "lg:order-1 lg:col-start-1 lg:row-start-1" : "lg:order-2"}`}>
                  <div className="overflow-hidden bg-muted aspect-[16/10]">
                    <motion.img
                      src={p.image}
                      alt={`${p.title} — ${p.category}`}
                      loading="lazy"
                      initial={{ scale: 1.08 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ scale: 1.04 }}
                      className="w-full h-full object-cover transition-transform duration-[1200ms]"
                    />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
