import { Head, Link, router } from '@inertiajs/react';
import { Languages, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { AdminButton, AdminLayout } from './AdminLayout';

type Submission = {
  id: number;
  status: string;
  submitted_at: string | null;
  user?: { name: string; email: string } | null;
};

type ResourceStat = { title: string; slug: string; count: number };

type Traffic = {
  today: number;
  week: number;
  month: number;
  total: number;
  projects: ResourceStat[];
  packages: ResourceStat[];
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
  traffic: Traffic;
};

function ResourceTable({ rows, empty }: { rows: ResourceStat[]; empty: string }) {
  const max = rows[0]?.count ?? 1;
  return (
    <div className="border border-border">
      {rows.length === 0 ? (
        <p className="px-6 py-8 text-sm text-muted-foreground">{empty}</p>
      ) : (
        rows.map(({ title, count }) => (
          <div key={title} className="flex items-center gap-5 px-6 py-4 border-b border-border last:border-b-0">
            <div className="flex-1 min-w-0">
              <div className="font-display text-xl leading-tight mb-1 truncate">{title}</div>
              <div className="h-px bg-foreground/15 w-full overflow-hidden">
                <div
                  className="h-full bg-foreground/50 transition-all duration-500"
                  style={{ width: `${Math.round((count / max) * 100)}%` }}
                />
              </div>
            </div>
            <span className="font-display text-3xl shrink-0">{count.toLocaleString()}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default function Dashboard({ stats, translations, recentSubmissions, traffic }: Props) {
  const [isTranslating, setIsTranslating] = useState(false);

  const runAutoTranslation = () => {
    if (!translations.configured || isTranslating) return;
    setIsTranslating(true);
    router.post('/admin/translations/autofill', {}, {
      preserveScroll: true,
      onFinish: () => setIsTranslating(false),
    });
  };

  return (
    <AdminLayout eyebrow="Portfolio CMS" title="Control room" action={<AdminButton href="/admin/projects/create">New project</AdminButton>}>
      <Head title="Admin" />

      {/* ── CMS Translation ─────────────────────────────────────────── */}
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

      {/* ── Content stats ───────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-y border-border">
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

      {/* ── Traffic ─────────────────────────────────────────────────── */}
      <section className="mt-16">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="size-5 text-muted-foreground" aria-hidden />
          <h2 className="font-display text-4xl">Traffic</h2>
        </div>

        {/* Period counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-border mb-10">
          {(
            [
              ['Today', traffic.today],
              ['This week', traffic.week],
              ['This month', traffic.month],
              ['All time', traffic.total],
            ] as [string, number][]
          ).map(([label, value], i) => (
            <div key={label} className={`p-6 ${i < 3 ? 'border-b lg:border-b-0 lg:border-r border-border' : ''}`}>
              <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">{label}</div>
              <div className="font-display text-5xl">{value.toLocaleString()}</div>
            </div>
          ))}
        </div>

        {/* Projects & Packages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3">Projects</div>
            <ResourceTable rows={traffic.projects} empty="No project visits recorded yet." />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3">Packages</div>
            <ResourceTable rows={traffic.packages} empty="No package visits recorded yet." />
          </div>
        </div>
      </section>

      {/* ── Recent briefs ────────────────────────────────────────────── */}
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
