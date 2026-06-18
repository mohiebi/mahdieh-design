import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { localizedPath, siteCopy, type Locale } from "@/lib/i18n";
import { Reveal } from "./Reveal";

type ServicesProps = {
  locale?: Locale;
};

export function Services({ locale = "en" }: ServicesProps) {
  const t = siteCopy[locale].services;

  return (
    <section id="services" className="px-6 lg:px-12 py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">
            {t.eyebrow}
          </div>
          <h2 className="font-display text-5xl md:text-7xl mb-16 max-w-3xl">
            {t.title}
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {t.items.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-background"
            >
              <Link
                href={localizedPath(`/services/${s.slug}`, locale)}
                className="group block h-full p-10 transition-colors hover:bg-accent hover:text-accent-foreground lg:p-14"
              >
                <div className="flex items-center justify-between gap-5">
                  <div className="font-mono text-xs tracking-[0.25em] opacity-60">{s.n}</div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-0 transition-opacity group-hover:opacity-70">
                    {t.view}
                  </span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl mt-6">{s.t}</h3>
                <p className="mt-4 max-w-md leading-relaxed opacity-80">{s.d}</p>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
