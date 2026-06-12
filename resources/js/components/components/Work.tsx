import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";
import { Reveal } from "./Reveal";

type WorkProps = {
  projects?: Project[];
  limit?: number;
  showMoreLink?: boolean;
};

export function Work({ projects: projectItems = projects, limit, showMoreLink = false }: WorkProps) {
  const visibleProjects = typeof limit === "number" ? projectItems.slice(0, limit) : projectItems;

  return (
    <section id="projects" className="px-6 lg:px-12 py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto">
        <Reveal className="flex items-end justify-between flex-wrap gap-6 mb-20 lg:mb-28">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Selected Projects - 2022 / 2026
            </div>
            <h2 className="font-display text-5xl md:text-7xl">Recent projects.</h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            A curated archive of identities, campaigns and product work. From early concept and
            naming through to systems and rollout.
          </p>
        </Reveal>

        <div className="flex flex-col gap-24 lg:gap-32">
          {visibleProjects.map((p, i) => {
            const reversed = i % 2 === 1;

            return (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                <div
                  className={`lg:col-span-5 ${
                    reversed ? "lg:order-2 lg:col-start-8" : "lg:order-1"
                  }`}
                >
                  <div className="flex items-center justify-between gap-6 text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-8">
                    <span>{p.category}</span>
                    <span>{p.year}</span>
                  </div>

                  <Link
                    to="/projects/$slug"
                    params={{ slug: p.slug }}
                    className="block group/title"
                  >
                    <h3 className="font-display text-6xl md:text-7xl leading-[0.95] mb-8 group-hover/title:opacity-70 transition-opacity">
                      {p.title}
                      <span className="text-accent">.</span>
                    </h3>
                  </Link>

                  <p className="text-base lg:text-lg leading-relaxed text-muted-foreground max-w-md mb-10">
                    {p.description}
                  </p>

                  <Link
                    to="/projects/$slug"
                    params={{ slug: p.slug }}
                    className="inline-flex items-center gap-4 group/cta"
                  >
                    <span
                      className="h-px w-10 bg-foreground/60 group-hover/cta:w-16 transition-all"
                      aria-hidden
                    />
                    <span className="text-[11px] font-mono uppercase tracking-[0.3em]">
                      View Case Study
                    </span>
                  </Link>
                </div>

                <div
                  className={`lg:col-span-7 ${
                    reversed ? "lg:order-1 lg:col-start-1 lg:row-start-1" : "lg:order-2"
                  }`}
                >
                  <Link to="/projects/$slug" params={{ slug: p.slug }} className="block">
                    <div className="overflow-hidden aspect-[16/10]">
                      <motion.img
                        src={p.image}
                        alt={`${p.title} - ${p.category}`}
                        loading="lazy"
                        initial={{ scale: 1.08 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ scale: 1.04 }}
                        className="w-full h-full object-contain transition-transform duration-[1200ms]"
                      />
                    </div>
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        {showMoreLink && (
          <div className="mt-20 flex justify-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-4 border border-border px-7 py-4 text-[11px] font-mono uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
            >
              More projects
              <span aria-hidden>-&gt;</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
