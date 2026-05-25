import { Head, Link, router } from '@inertiajs/react';
import { AdminButton, AdminLayout } from '../AdminLayout';

type ProjectRow = {
  id: number;
  slug: string;
  title: string;
  client: string;
  year: string;
  category: string;
  sort_order: number;
  is_published: boolean;
  sections_count: number;
  services_count: number;
  media_count: number;
};

type Props = {
  projects: ProjectRow[];
};

export default function ProjectIndex({ projects }: Props) {
  return (
    <AdminLayout eyebrow="Case studies" title="Projects" action={<AdminButton href="/admin/projects/create">Create project</AdminButton>}>
      <Head title="Admin projects" />

      <div className="border-t border-border">
        {projects.map((project) => (
          <article
            key={project.id}
            className="grid grid-cols-1 lg:grid-cols-[90px_1fr_180px_220px] gap-6 border-b border-border py-7"
          >
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">
              {String(project.sort_order).padStart(2, '0')}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="font-display text-4xl leading-none">{project.title}</h2>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] border border-border px-2 py-1">
                  {project.is_published ? 'Published' : 'Draft'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {project.client} / {project.year} / {project.category}
              </p>
              <p className="mt-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                {project.sections_count} paragraphs · {project.services_count} services · {project.media_count} media
              </p>
            </div>
            <Link href={`/projects/${project.slug}`} className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
              View
            </Link>
            <div className="flex items-center gap-4">
              <Link href={`/admin/projects/${project.slug}/edit`} className="text-xs font-mono uppercase tracking-[0.2em] underline">
                Edit
              </Link>
              <button
                onClick={() => {
                  if (confirm(`Delete ${project.title}?`)) router.delete(`/admin/projects/${project.slug}`);
                }}
                className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-accent"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </AdminLayout>
  );
}
