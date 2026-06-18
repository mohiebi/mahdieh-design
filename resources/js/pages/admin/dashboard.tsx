import { Head, Link, router } from '@inertiajs/react';
import { Languages } from 'lucide-react';
import { useState } from 'react';
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
  translations: {
    provider: string;
    configured: boolean;
  };
  recentSubmissions: Submission[];
};

export default function Dashboard({ stats, translations, recentSubmissions }: Props) {
  const [isTranslating, setIsTranslating] = useState(false);

  const runAutoTranslation = () => {
    if (!translations.configured || isTranslating) {
      return;
    }

    setIsTranslating(true);
    router.post('/admin/translations/autofill', {}, {
      preserveScroll: true,
      onFinish: () => setIsTranslating(false),
    });
  };

  return (
    <AdminLayout eyebrow="Portfolio CMS" title="Control room" action={<AdminButton href="/admin/projects/create">New project</AdminButton>}>
      <Head title="Admin" />

      <section className="mb-12 border-y border-border py-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-display text-3xl">CMS translations</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Fill missing German public content and missing Persian/German brief question fields from the English source fields.
          </p>
          {!translations.configured && (
            <p className="mt-3 text-sm text-accent">Add the {translations.provider} API key on the server to enable auto-translation.</p>
          )}
        </div>
        <button
          type="button"
          onClick={runAutoTranslation}
          disabled={!translations.configured || isTranslating}
          className="site-button site-button-outline inline-flex items-center justify-center gap-3 disabled:cursor-not-allowed disabled:opacity-45"
        >
          <Languages className="size-4" aria-hidden="true" />
          {isTranslating ? 'Translating...' : 'Auto-translate missing content'}
        </button>
      </section>

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
