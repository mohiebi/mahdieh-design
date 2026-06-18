import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { localizedPath, siteCopy, type Locale } from "@/lib/i18n";

type ProjectTemplateProps = {
  project: Project;
  previousProject: Project;
  nextProject: Project;
  locale?: Locale;
};

export function ProjectTemplate({ project, previousProject, nextProject, locale = "en" }: ProjectTemplateProps) {
  const t = siteCopy[locale].project;
  const videos = [...(project.videoUrl ? [project.videoUrl] : []), ...(project.videos ?? [])];
  const galleryImages = project.galleryImages ?? [];
  const details = [
    [t.client, project.client],
    [t.year, project.year],
    [t.category, project.category],
    [t.location, project.location],
    [t.credit, project.credit],
  ].filter((detail): detail is [string, string] => Boolean(detail[1]));

  return (
    <main className="pt-24 lg:pt-32">
      <article className="px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <Link
            to={localizedPath("/projects", locale)}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            {t.allProjects}
          </Link>

          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16 lg:mb-24"
          >
            <div className="lg:col-span-8">
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6">
                {project.category} / {project.year}
              </div>
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9]">
                {project.title}
                <span className="text-accent">.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg lg:text-xl leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </div>

            <aside className="lg:col-span-4 lg:pt-8">
              <div className="border-t border-border">
                {details.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[110px_1fr] gap-6 border-b border-border py-5 text-sm"
                  >
                    <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                      {label}
                    </div>
                    <div className="text-foreground">{value}</div>
                  </div>
                ))}
              </div>
            </aside>
          </motion.header>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-muted mb-16 lg:mb-24"
          >
            <img
              src={project.image}
              alt={t.imageAlt(project.title, project.category)}
              className="w-full h-auto block"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 lg:mb-24">
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-28 text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                {t.about}
              </div>
            </div>
            <div className="lg:col-span-8 lg:col-start-5">
              <div className="space-y-6 text-lg lg:text-xl leading-relaxed text-foreground/90">
                {project.content.map((paragraph, index) => (
                  <p key={`${project.slug}-paragraph-${index}`}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-12 border-t border-border pt-8">
                <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-5">
                  {t.services}
                </div>
                <div className="flex flex-wrap gap-3">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="border border-border px-4 py-2 text-xs font-mono uppercase tracking-[0.18em] text-foreground"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {(videos.length > 0 || galleryImages.length > 0) && (
            <section className="mb-16 lg:mb-24">
              <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-8">
                {t.media}
              </div>

              {videos.length > 0 && (
                <div className="space-y-6 mb-6">
                  {videos.map((video) => (
                    <div key={video} className="aspect-video overflow-hidden bg-muted">
                      <video
                        src={video}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {galleryImages.length > 0 && (
                <div className="grid grid-cols-1 gap-6">
                  {galleryImages.map((image, index) => (
                    <div key={image} className="overflow-hidden bg-muted">
                      <img
                        src={image}
                        alt={t.galleryAlt(project.title, index + 1)}
                        className="w-full h-auto block"
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </article>

      <nav aria-label={`${t.previous} / ${t.next}`} className="border-t border-border/50 mt-16 lg:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <Link
            to={localizedPath(`/projects/${previousProject.slug}`, locale)}
            params={{ slug: previousProject.slug }}
            className="block px-6 lg:px-12 py-14 lg:py-20 border-b md:border-b-0 md:border-r border-border/50 hover:bg-muted/30 transition-colors"
          >
            <div className="max-w-[700px] md:ml-auto">
              <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">
                {t.previous}
              </div>
              <h2 className="font-display text-4xl md:text-5xl">
                {previousProject.title}
                <span className="text-accent">.</span>
              </h2>
            </div>
          </Link>

          <Link
            to={localizedPath(`/projects/${nextProject.slug}`, locale)}
            params={{ slug: nextProject.slug }}
            className="block px-6 lg:px-12 py-14 lg:py-20 hover:bg-muted/30 transition-colors"
          >
            <div className="max-w-[700px]">
              <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">
                {t.next}
              </div>
              <h2 className="font-display text-4xl md:text-5xl">
                {nextProject.title}
                <span className="text-accent">.</span>
              </h2>
            </div>
          </Link>
        </div>
      </nav>
    </main>
  );
}
