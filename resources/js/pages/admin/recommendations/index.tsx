import { Head, Link, router } from '@inertiajs/react';
import { AdminButton, AdminLayout } from '../AdminLayout';

type RecommendationRow = {
  id: number;
  name: string;
  role: string | null;
  company: string | null;
  sort_order: number;
  is_active: boolean;
  avatar_path: string | null;
};

type Props = {
  recommendations: RecommendationRow[];
};

export default function RecommendationsIndex({ recommendations }: Props) {
  return (
    <AdminLayout
      eyebrow="Social proof"
      title="Recommendations"
      action={<AdminButton href="/admin/recommendations/create">Add recommendation</AdminButton>}
    >
      <Head title="Admin — Recommendations" />

      <div className="border-t border-border">
        {recommendations.length === 0 && (
          <p className="py-12 text-sm text-muted-foreground">
            No recommendations yet. Add one to get started.
          </p>
        )}
        {recommendations.map((rec, index) => (
          <article
            key={rec.id}
            className="grid grid-cols-1 gap-6 border-b border-border py-7 lg:grid-cols-[90px_1fr_auto] lg:items-center"
          >
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">
              {String(rec.sort_order).padStart(2, '0')}
            </div>

            <div className="flex items-center gap-4">
              {rec.avatar_path ? (
                <img
                  src={rec.avatar_path}
                  alt={rec.name}
                  className="h-10 w-10 rounded-full object-cover border border-border flex-shrink-0"
                />
              ) : (
                <div className="h-10 w-10 rounded-full border border-border flex items-center justify-center font-display text-xs text-muted-foreground flex-shrink-0 select-none">
                  {rec.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h2 className="font-display text-2xl leading-none">{rec.name}</h2>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] border border-border px-2 py-1">
                    {rec.is_active ? 'Active' : 'Hidden'}
                  </span>
                </div>
                {(rec.role || rec.company) && (
                  <p className="text-sm text-muted-foreground">
                    {[rec.role, rec.company].filter(Boolean).join(' · ')}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <button
                type="button"
                disabled={index === 0}
                onClick={() => router.patch(`/admin/recommendations/${rec.id}/move`, { direction: 'up' })}
                className="site-button site-button-outline site-button-compact cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ↑ Up
              </button>
              <button
                type="button"
                disabled={index === recommendations.length - 1}
                onClick={() => router.patch(`/admin/recommendations/${rec.id}/move`, { direction: 'down' })}
                className="site-button site-button-outline site-button-compact cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ↓ Down
              </button>
              <Link
                href={`/admin/recommendations/${rec.id}/edit`}
                className="site-button site-button-outline site-button-compact"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Delete recommendation from ${rec.name}?`)) {
                    router.delete(`/admin/recommendations/${rec.id}`);
                  }
                }}
                className="site-button site-button-outline site-button-danger site-button-compact cursor-pointer"
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
