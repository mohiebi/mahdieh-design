import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Contact";
import { getProject, projects } from "@/data/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.title} — Mahdieh` },
          { name: "description", content: loaderData.project.description },
          { property: "og:title", content: `${loaderData.project.title} — Mahdieh` },
          { property: "og:description", content: loaderData.project.description },
          { property: "og:image", content: loaderData.project.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Nav />
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display text-6xl mb-6">Project not found.</h1>
          <Link to="/projects" className="text-sm font-mono uppercase tracking-[0.2em] underline">
            ← Back to projects
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <p className="text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pt-24 lg:pt-32">
        <article className="px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors mb-12">
              ← All projects
            </Link>

            <motion.header
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 lg:mb-24"
            >
              <div className="lg:col-span-8">
                <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6">
                  {project.category} — {project.year}
                </div>
                <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9]">
                  {project.title}
                  <span className="text-accent">.</span>
                </h1>
              </div>
              <div className="lg:col-span-4 lg:pt-8 space-y-6 text-sm">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-2">Client</div>
                  <div>{project.client}</div>
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-2">Year</div>
                  <div>{project.year}</div>
                </div>
              </div>
            </motion.header>

            <motion.div
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden bg-muted aspect-[16/9] mb-16 lg:mb-24"
            >
              <img
                src={project.image}
                alt={`${project.title} — ${project.category}`}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 lg:mb-24">
              <div className="lg:col-span-3">
                <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                  About the project
                </div>
              </div>
              <div className="lg:col-span-8 lg:col-start-5 space-y-6 text-lg lg:text-xl leading-relaxed text-foreground/90">
                {project.content.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            {project.videoUrl && (
              <div className="mb-16 lg:mb-24">
                <div className="aspect-video overflow-hidden bg-muted">
                  <video
                    src={project.videoUrl}
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </article>

        <section className="border-t border-border/50 mt-16 lg:mt-24">
          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            className="block px-6 lg:px-12 py-16 lg:py-24 hover:bg-muted/30 transition-colors"
          >
            <div className="max-w-[1400px] mx-auto flex items-end justify-between flex-wrap gap-6">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">
                  Next project
                </div>
                <h2 className="font-display text-5xl md:text-7xl">
                  {next.title}
                  <span className="text-accent">.</span>
                </h2>
              </div>
              <span className="text-xs font-mono uppercase tracking-[0.25em]">→</span>
            </div>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
