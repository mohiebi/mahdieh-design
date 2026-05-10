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
  const capabilities = [
    "Brand Strategy",
    "Visual Identity",
    "Art Direction",
    "Editorial Design",
    "UI / UX",
    "Design Systems",
    "Packaging",
    "Creative Leadership",
  ];

  return (
    <section id="about" className="px-6 lg:px-12 py-24 lg:py-32 bg-background text-foreground">
      <div className="max-w-[1400px] mx-auto">
        {/* Top intro band */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 mb-20">
          <Reveal className="lg:col-span-7">
            <div className="text-xs font-mono uppercase tracking-[0.25em] opacity-60 mb-4">
              ✦ About
            </div>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02]">
              Strategy meets <em className="text-accent not-italic">aesthetics</em>,
              <br className="hidden md:block" /> in service of growth.
            </h2>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9 self-end">
            <p className="text-base lg:text-lg leading-relaxed opacity-80">
              With academic foundations in graphic design and advanced art studies —
              and over seven years across agencies, studios and independent practice —
              I bring both creativity and structure to every collaboration.
            </p>
            <p className="mt-5 text-sm leading-relaxed opacity-55">
              Open to remote opportunities, freelance projects and international collaborations.
            </p>
          </Reveal>
        </div>

        {/* Main composition */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Portrait — sticky on desktop */}
          <div className="lg:col-span-4">
            <motion.figure
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:sticky lg:top-24 max-w-[280px]"
            >
              <div className="relative overflow-hidden aspect-[4/5]">
                <motion.img
                  src={portrait}
                  alt="Mahdieh Baghoolizadeh"
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] opacity-60">
                <span>✦ Mahdieh B.</span>
                <span>Nexa Studio</span>
              </figcaption>
            </motion.figure>
          </div>

          {/* Right column: Experience + Education + manifesto/capabilities */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-14">
            {[
              { title: "Experience", items: experience },
              { title: "Education", items: education },
            ].map((col, ci) => (
              <div key={col.title}>
                <h3 className="font-mono text-xs uppercase tracking-[0.25em] opacity-60 mb-6">
                  {col.title}
                </h3>
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
                      <div className="text-sm opacity-70">{place}</div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Manifesto pull-quote — fills bottom-left of right column */}
            <Reveal delay={0.1}>
              <div className="border-t border-background/15 pt-6">
                <div className="font-mono text-xs uppercase tracking-[0.25em] opacity-60 mb-4">
                  ✦ Philosophy
                </div>
                <blockquote className="font-display text-2xl md:text-3xl leading-[1.15]">
                  “Design is the quiet structure
                  <span className="text-accent not-italic"> behind every brand</span>
                  that lasts.”
                </blockquote>
              </div>
            </Reveal>

            {/* Capabilities — fills the previously empty bottom-right */}
            <Reveal delay={0.2}>
              <div className="border-t border-background/15 pt-6">
                <div className="font-mono text-xs uppercase tracking-[0.25em] opacity-60 mb-5">
                  ✦ Capabilities
                </div>
                <ul className="flex flex-wrap gap-2">
                  {capabilities.map((c, i) => (
                    <motion.li
                      key={c}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.4, delay: i * 0.04 }}
                      className="text-xs font-mono uppercase tracking-[0.2em] border border-background/30 rounded-full px-3 py-1.5 hover:bg-background hover:text-foreground transition-colors"
                    >
                      {c}
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-8 grid grid-cols-2 gap-6">
                  {[
                    ["EN", "Fluent"],
                    ["FA", "Native"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <div className="font-display text-3xl">{k}</div>
                      <div className="text-xs font-mono uppercase tracking-[0.2em] opacity-60 mt-1">
                        {v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
