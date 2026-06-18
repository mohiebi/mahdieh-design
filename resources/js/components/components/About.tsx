import { motion } from "framer-motion";
import { siteCopy, type Locale } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import portrait from "@/assets/portrait.png";

type AboutProps = {
  locale?: Locale;
};

export function About({ locale = "en" }: AboutProps) {
  const t = siteCopy[locale].about;

  return (
    <section id="about" className="px-6 lg:px-12 py-24 lg:py-32 bg-background text-foreground">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 mb-20">
          <Reveal className="lg:col-span-7">
            <div className="text-xs font-mono uppercase tracking-[0.25em] opacity-60 mb-4">
              {t.eyebrow}
            </div>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02]">
              {t.titleBefore} <em className="text-accent not-italic">{t.titleAccent}</em>,
              <br className="hidden md:block" /> {t.titleAfter}
            </h2>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9 self-end">
            <p className="text-base lg:text-lg leading-relaxed opacity-80">
              {t.intro}
            </p>
            <p className="mt-5 text-sm leading-relaxed opacity-55">
              {t.availability}
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
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
              <figcaption className="mt-4 flex items-start text-[10px] font-mono uppercase tracking-[0.25em] opacity-60">
                <span>{t.portraitCaption}</span>
              </figcaption>
            </motion.figure>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-14">
            {[
              { title: t.experienceTitle, items: t.experience },
              { title: t.educationTitle, items: t.education },
            ].map((col, ci) => (
              <div key={col.title}>
                <h3 className="font-mono text-xs uppercase tracking-[0.25em] opacity-60 mb-6">
                  {col.title}
                </h3>
                <ul className="space-y-6">
                  {col.items.map(([year, role, place], i) => (
                    <motion.li
                      key={`${year}-${role}`}
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

            <Reveal delay={0.1}>
              <div className="border-t border-background/15 pt-6">
                <div className="font-mono text-xs uppercase tracking-[0.25em] opacity-60 mb-4">
                  {t.philosophy}
                </div>
                <blockquote className="font-display text-2xl md:text-3xl leading-[1.15]">
                  “{t.quoteBefore}
                  <span className="text-accent not-italic"> {t.quoteAccent} </span>
                  {t.quoteAfter}”
                </blockquote>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="border-t border-background/15 pt-6">
                <div className="font-mono text-xs uppercase tracking-[0.25em] opacity-60 mb-5">
                  {t.capabilitiesTitle}
                </div>
                <ul className="flex flex-wrap gap-2">
                  {t.capabilities.map((c, i) => (
                    <motion.li
                      key={c}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.4, delay: i * 0.04 }}
                      className="text-xs font-mono uppercase tracking-[0.2em] border border-background/30 rounded-lg px-3 py-1.5 hover:bg-background hover:text-foreground transition-colors"
                    >
                      {c}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
