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
  image: string;
  size?: "lg" | "md";
};

const projects: Project[] = [
  { title: "Arianet", client: "Internet Solutions", year: "2025", category: "Brand Strategy · Campaign", image: arianet, size: "lg" },
  { title: "Pooyesh", client: "Royan Fertility Center", year: "2022", category: "Visual Identity · Environmental", image: pooyesh, size: "md" },
  { title: "Arex", client: "Digital Transactions", year: "2024", category: "Brand Design · Wilma Studio", image: arex, size: "md" },
  { title: "Seper", client: "AI Agents Explorer", year: "2026", category: "Personal Brand · Editorial", image: seper, size: "md" },
  { title: "Xima", client: "Hospitality", year: "2024", category: "Visual Identity", image: xima, size: "md" },
  { title: "Gilaneh", client: "Persian Grill House — Vancouver", year: "2023", category: "Brand · Packaging", image: gilaneh, size: "lg" },
  { title: "Zeevash", client: "Health Tech", year: "2023", category: "Brand · Product", image: zeevash, size: "md" },
  { title: "Phownix", client: "Mobile Equipment", year: "2022", category: "Packaging Design", image: phownix, size: "md" },
  { title: "Palo Santo", client: "Classic Furniture, est. 2009", year: "2022", category: "Logo · Identity", image: palosanto, size: "md" },
  { title: "Tabesh", client: "Brand Development Center", year: "2022", category: "Identity System", image: tabesh, size: "lg" },
];

export function Work() {
  return (
    <section id="work" className="px-6 lg:px-12 py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto">
        <Reveal className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">
              ✦ Selected Work — 2022 / 2026
            </div>
            <h2 className="font-display text-5xl md:text-7xl">Recent projects.</h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            A curated archive of identities, campaigns and product work.
            From early concept and naming through to systems and rollout.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`group ${p.size === "lg" && i % 4 === 0 ? "md:col-span-2" : ""}`}
            >
              <div className="overflow-hidden bg-muted aspect-[4/3] mb-5">
                <motion.img
                  src={p.image}
                  alt={`${p.title} — ${p.category}`}
                  loading="lazy"
                  initial={{ scale: 1.08 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.04 }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl md:text-3xl">
                  {p.title}
                  <span className="text-muted-foreground italic font-normal text-lg"> — {p.client}</span>
                </h3>
                <span className="font-mono text-xs text-muted-foreground shrink-0">{p.year}</span>
              </div>
              <div className="mt-1 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                {p.category}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
