import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

export function Services() {
  const services = [
    { n: "01", slug: "brand-strategy", t: "Brand Strategy", d: "Positioning, naming, narrative and verbal identity that gives a brand its compass." },
    { n: "02", slug: "visual-identity", t: "Visual Identity", d: "Logos, marks, typography and visual systems built to scale across every touchpoint." },
    { n: "03", slug: "packaging-design", t: "Packaging Design", d: "Packaging systems that make products clear, memorable and shelf-ready." },
    { n: "04", slug: "environmental-design", t: "Environmental Design", d: "Spatial graphics and branded environments that carry identity into the physical world." },
  ];
  return (
    <section id="services" className="px-6 lg:px-12 py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">
            ✦ Services
          </div>
          <h2 className="font-display text-5xl md:text-7xl mb-16 max-w-3xl">
            A practice for ambitious brands.
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {services.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-background"
            >
              <Link
                href={`/services/${s.slug}`}
                className="group block h-full p-10 transition-colors hover:bg-accent hover:text-accent-foreground lg:p-14"
              >
                <div className="flex items-center justify-between gap-5">
                  <div className="font-mono text-xs tracking-[0.25em] opacity-60">{s.n}</div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-0 transition-opacity group-hover:opacity-70">
                    View service
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
