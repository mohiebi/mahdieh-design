import { router } from "@inertiajs/react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";
import { localizedPath, siteCopy, type Locale } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export type ProjectScope = "popular" | "recent";

type WorkProps = {
  projects?: Project[];
  limit?: number;
  showMoreLink?: boolean;
  showScopeFilter?: boolean;
  scope?: ProjectScope;
  locale?: Locale;
};

export function Work({
  projects: projectItems = projects,
  limit,
  showMoreLink = false,
  showScopeFilter = false,
  scope = "popular",
  locale = "en",
}: WorkProps) {
  const t = siteCopy[locale].work;
  const visibleProjects = typeof limit === "number" ? projectItems.slice(0, limit) : projectItems;
  const projectScopes: { value: ProjectScope; label: string }[] = [
    { value: "popular", label: t.popular },
    { value: "recent", label: t.recent },
  ];

  const handleScopeChange = (nextScope: ProjectScope) => {
    if (nextScope === scope) {
      return;
    }

    router.get(
      localizedPath("/projects", locale),
      nextScope === "popular" ? {} : { scope: nextScope },
      {
        preserveScroll: true,
        preserveState: true,
        replace: true,
      },
    );
  };

  return (
    <section id="projects" className="px-6 lg:px-12 py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto">
        <Reveal className="flex items-end justify-between flex-wrap gap-6 mb-20 lg:mb-28">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">
              {t.eyebrow}
            </div>
            <h2 className="font-display text-5xl md:text-7xl">{t.title}</h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            {t.intro}
          </p>
          {showScopeFilter && (
            <div
              className="flex w-full flex-wrap items-center gap-2 border-t border-border/60 pt-6 sm:w-auto sm:border-t-0 sm:pt-0"
              aria-label={t.projectScope}
            >
              {projectScopes.map((item) => {
                const isActive = item.value === scope;

                return (
                  <button
                    key={item.value}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => handleScopeChange(item.value)}
                    className={`site-button site-button-compact ${
                      isActive ? "site-button-primary" : "site-button-outline"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          )}
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
                    to={localizedPath(`/projects/${p.slug}`, locale)}
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
                    to={localizedPath(`/projects/${p.slug}`, locale)}
                    params={{ slug: p.slug }}
                    className="inline-flex items-center gap-4 group/cta"
                  >
                    <span
                      className="h-px w-10 bg-foreground/60 group-hover/cta:w-16 transition-all"
                      aria-hidden
                    />
                    <span className="text-[11px] font-mono uppercase tracking-[0.3em]">
                      {t.viewCaseStudy}
                    </span>
                  </Link>
                </div>

                <div
                  className={`lg:col-span-7 ${
                    reversed ? "lg:order-1 lg:col-start-1 lg:row-start-1" : "lg:order-2"
                  }`}
                >
                  <Link to={localizedPath(`/projects/${p.slug}`, locale)} params={{ slug: p.slug }} className="block">
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
              to={localizedPath("/projects", locale)}
              className="site-button site-button-outline"
            >
              {t.moreProjects}
              <span aria-hidden>-&gt;</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
