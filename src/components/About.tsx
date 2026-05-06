import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import portrait from "@/assets/portrait.png";

export function About() {
  const experience = [
    ["2024 — 2026", "Founder · Brand Strategy", "Nexa Studio"],
    ["2023", "Brand Designer", "Milanco Studio · Toronto"],
    ["2023", "Art Director", "Wilma Studio"],
    ["2022 — 2023", "Senior Designer", "Freelance"],
    ["2019 — 2022", "Head Designer", "Narvan Agency"],
  ];
  const education = [
    ["2026", "UI/UX Product Design", "Zero to Mastery"],
    ["2020 — 2022", "Master of Handi Crafts", "Art University of Isfahan"],
    ["2021", "Brand Design Certification", "Vand International"],
    ["2014 — 2019", "Bachelor of Graphic Design", "Art University of Isfahan"],
  ];

  return (
    <section id="about" className="px-6 lg:px-12 py-24 lg:py-32 bg-foreground text-background">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12">
        <Reveal className="lg:col-span-5">
          <div className="text-xs font-mono uppercase tracking-[0.25em] opacity-60 mb-4">
            ✦ About
          </div>
          <h2 className="font-display text-5xl md:text-6xl leading-[1.05]">
            Strategy meets <em className="text-accent not-italic">aesthetics</em>, in service of growth.
          </h2>

          <motion.figure
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 relative"
          >
            <div className="overflow-hidden aspect-[4/5] max-w-sm">
              <motion.img
                src={portrait}
                alt="Mahdieh Baghoolizadeh"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <figcaption className="mt-3 text-xs font-mono uppercase tracking-[0.25em] opacity-60">
              ✦ Mahdieh B. — Founder, Nexa Studio
            </figcaption>
          </motion.figure>

          <p className="mt-10 text-lg leading-relaxed opacity-80">
            With academic foundations in graphic design and advanced art studies — and over seven
            years across agencies, studios and independent practice — I bring both creativity and
            structure to every collaboration. My work pairs strategic thinking with user-centered
            craft to build identities and digital products that connect with people and support
            business outcomes.
          </p>
          <p className="mt-6 leading-relaxed opacity-60">
            Open to remote opportunities, freelance projects and international collaborations.
          </p>
        </Reveal>

        <div className="lg:col-span-7 lg:pl-12 grid sm:grid-cols-2 gap-12">
          {[
            { title: "Experience", items: experience },
            { title: "Education", items: education },
          ].map((col, ci) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] opacity-60 mb-6">{col.title}</h3>
              <ul className="space-y-6">
                {col.items.map(([year, role, place], i) => (
                  <motion.li
                    key={role}
                    initial={{ opacity: 0, x: ci === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="border-t border-background/15 pt-4"
                  >
                    <div className="text-xs font-mono opacity-60">{year}</div>
                    <div className="font-display text-xl mt-1">{role}</div>
                    <div className="text-sm opacity-70 italic">{place}</div>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
