import { Head, Link, router } from '@inertiajs/react';
import { AdminButton, AdminLayout } from '../AdminLayout';

type ServiceRef = { id: number; title: string; number: string };
type PackageRow = {
  id: number;
  title: string;
  price: string | null;
  duration_days: number | null;
  sort_order: number;
  is_active: boolean;
  is_featured: boolean;
  services: ServiceRef[];
};

export default function PackagesIndex({ packages }: { packages: PackageRow[] }) {
  return (
    <AdminLayout
      eyebrow="Pricing"
      title="Packages"
      action={<AdminButton href="/admin/packages/create">Add package</AdminButton>}
    >
      <Head title="Admin — Packages" />
      <div className="border-t border-border">
        {packages.length === 0 && (
          <p className="py-12 text-sm text-muted-foreground">No packages yet.</p>
        )}
        {packages.map((pkg, index) => (
          <article
            key={pkg.id}
            className="grid grid-cols-1 gap-6 border-b border-border py-7 lg:grid-cols-[1fr_auto] lg:items-center"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="font-display text-2xl leading-none">{pkg.title}</h2>
                {pkg.is_featured && (
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] border border-accent text-accent px-2 py-1">
                    Featured
                  </span>
                )}
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] border border-border px-2 py-1">
                  {pkg.is_active ? 'Active' : 'Hidden'}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {pkg.price && (
                  <span className="font-mono">{Number(pkg.price).toLocaleString()} Toman</span>
                )}
                {pkg.duration_days && <span>{pkg.duration_days} days</span>}
                {pkg.services.length > 0 && (
                  <span>{pkg.services.map((s) => s.title).join(' · ')}</span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <button
                type="button"
                disabled={index === 0}
                onClick={() => router.patch(`/admin/packages/${pkg.id}/move`, { direction: 'up' })}
                className="site-button site-button-outline site-button-compact cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ↑ Up
              </button>
              <button
                type="button"
                disabled={index === packages.length - 1}
                onClick={() => router.patch(`/admin/packages/${pkg.id}/move`, { direction: 'down' })}
                className="site-button site-button-outline site-button-compact cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ↓ Down
              </button>
              <Link
                href={`/admin/packages/${pkg.id}/edit`}
                className="site-button site-button-outline site-button-compact"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Delete package "${pkg.title}"?`)) router.delete(`/admin/packages/${pkg.id}`);
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
