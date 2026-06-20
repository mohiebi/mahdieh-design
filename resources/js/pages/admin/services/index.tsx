import { Head, Link, router } from '@inertiajs/react';
import { AdminButton, AdminLayout } from '../AdminLayout';

type ServiceRow = {
  id: number;
  slug: string;
  number: string;
  title: string;
  summary: string;
  sort_order: number;
  is_active: boolean;
  icon_path: string | null;
};

type Props = { services: ServiceRow[] };

export default function ServicesIndex({ services }: Props) {
  return (
    <AdminLayout
      eyebrow="Services CMS"
      title="Services"
      action={<AdminButton href="/admin/services/create">Add service</AdminButton>}
    >
      <Head title="Admin — Services" />
      <div className="border-t border-border">
        {services.length === 0 && (
          <p className="py-12 text-sm text-muted-foreground">No services yet.</p>
        )}
        {services.map((svc, index) => (
          <article
            key={svc.id}
            className="grid grid-cols-1 gap-6 border-b border-border py-7 lg:grid-cols-[90px_1fr_auto] lg:items-center"
          >
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {svc.number}
            </div>
            <div className="flex items-center gap-4">
              {svc.icon_path ? (
                <img
                  src={svc.icon_path}
                  alt={svc.title}
                  className="h-10 w-10 rounded border border-border object-contain flex-shrink-0 bg-border/20 p-1"
                />
              ) : (
                <div className="h-10 w-10 rounded border border-border flex items-center justify-center font-mono text-xs text-muted-foreground flex-shrink-0">
                  {svc.number}
                </div>
              )}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h2 className="font-display text-2xl leading-none">{svc.title}</h2>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] border border-border px-2 py-1">
                    {svc.is_active ? 'Active' : 'Hidden'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">{svc.summary}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <button
                type="button"
                disabled={index === 0}
                onClick={() => router.patch(`/admin/services/${svc.id}/move`, { direction: 'up' })}
                className="site-button site-button-outline site-button-compact cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ↑ Up
              </button>
              <button
                type="button"
                disabled={index === services.length - 1}
                onClick={() => router.patch(`/admin/services/${svc.id}/move`, { direction: 'down' })}
                className="site-button site-button-outline site-button-compact cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ↓ Down
              </button>
              <Link
                href={`/admin/services/${svc.id}/edit`}
                className="site-button site-button-outline site-button-compact"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Delete service "${svc.title}"?`)) {
                    router.delete(`/admin/services/${svc.id}`);
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
