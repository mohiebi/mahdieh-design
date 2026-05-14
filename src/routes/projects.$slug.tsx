import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ProjectTemplate } from "@/components/ProjectTemplate";
import { getProject, projects } from "@/data/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();

    const projectIndex = projects.findIndex((item) => item.slug === project.slug);
    const previousProject = projects[(projectIndex - 1 + projects.length) % projects.length];
    const nextProject = projects[(projectIndex + 1) % projects.length];

    return { project, previousProject, nextProject };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.title} - Mahdieh` },
          { name: "description", content: loaderData.project.description },
          { property: "og:title", content: `${loaderData.project.title} - Mahdieh` },
          { property: "og:description", content: loaderData.project.description },
          { property: "og:image", content: loaderData.project.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <main className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-display text-6xl mb-6">Project not found.</h1>
        <Link to="/projects" className="text-sm font-mono uppercase tracking-[0.2em] underline">
          &lt;- Back to projects
        </Link>
      </div>
    </main>
  ),
  errorComponent: ({ error }) => (
    <main className="min-h-[70vh] flex items-center justify-center px-6">
      <p className="text-muted-foreground">{error.message}</p>
    </main>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project, previousProject, nextProject } = Route.useLoaderData();

  return (
    <ProjectTemplate
      project={project}
      previousProject={previousProject}
      nextProject={nextProject}
    />
  );
}
