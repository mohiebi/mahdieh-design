import { Head, Link } from '@inertiajs/react';
import { AdminButton, AdminLayout } from './AdminLayout';

type Submission = {
  id: number;
  status: string;
  submitted_at: string | null;
  user?: { name: string; email: string } | null;
};

type Props = {
  stats: {
    projects: number;
    publishedProjects: number;
    briefQuestions: number;
    newSubmissions: number;
  };
  recentSubmissions: Submission[];
};

export default function Dashboard({ stats, recentSubmissions }: Props) {
  return (
    <AdminLayout eyebrow="Portfolio CMS" title="Control room" action={<AdminButton href="/admin/projects/create">New project</AdminButton>}>
      <Head title="Admin" />

      <div className="grid grid-cols-1 md:grid-cols-4 border-y border-border">
        {[
          ['Projects', stats.projects],
          ['Published', stats.publishedProjects],
          ['Questions', stats.briefQuestions],
          ['New briefs', stats.newSubmissions],
        ].map(([label, value]) => (
          <div key={label} className="border-b md:border-b-0 md:border-r border-border p-6 last:border-r-0">
            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6">{label}</div>
            <div className="font-display text-5xl">{value}</div>
          </div>
        ))}
      </div>

      <section className="mt-16">
        <div className="flex items-end justify-between gap-6 mb-8">
          <h2 className="font-display text-4xl">Recent briefs</h2>
          <Link href="/admin/brief-submissions" className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground">
            View all
          </Link>
        </div>
        <div className="border-t border-border">
          {recentSubmissions.map((submission) => (
            <Link
              key={submission.id}
              href={`/admin/brief-submissions/${submission.id}`}
              className="grid grid-cols-1 md:grid-cols-[1fr_160px_220px] gap-4 border-b border-border py-5 hover:bg-muted/20 transition-colors"
            >
              <div>
                <div className="font-display text-2xl">{submission.user?.name ?? 'Unknown user'}</div>
                <div className="text-sm text-muted-foreground">{submission.user?.email}</div>
              </div>
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">{submission.status}</div>
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">{submission.submitted_at}</div>
            </Link>
          ))}
        </div>
      </section>
    </AdminLayout>
  );
}
