import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { AdminLayout, adminInputClass } from '../AdminLayout';

type ServiceOption = { id: number; title: string; number: string };

type FormData = {
  slug: string;
  title: string;
  title_fa: string;
  title_de: string;
  summary: string;
  summary_fa: string;
  summary_de: string;
  deliverables: string;
  deliverables_fa: string;
  deliverables_de: string;
  price_toman: string;
  price_eur: string;
  price_usd: string;
  duration_days: string;
  payment_terms: string;
  payment_terms_fa: string;
  payment_terms_de: string;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  service_ids: number[];
};

type PackageData = {
  id: number;
  slug: string;
  title: string;
  title_fa: string | null;
  title_de: string | null;
  summary: string | null;
  summary_fa: string | null;
  summary_de: string | null;
  deliverables: string[];
  deliverables_fa: string[] | null;
  deliverables_de: string[] | null;
  price_toman: string | null;
  price_eur: string | null;
  price_usd: string | null;
  duration_days: number | null;
  payment_terms: string | null;
  payment_terms_fa: string | null;
  payment_terms_de: string | null;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  services: { id: number }[];
};

const toLines = (arr: string[] | null | undefined) => (arr ?? []).join('\n');
const fromLines = (s: string) =>
  s
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

const blank: FormData = {
  slug: '',
  title: '',
  title_fa: '',
  title_de: '',
  summary: '',
  summary_fa: '',
  summary_de: '',
  deliverables: '',
  deliverables_fa: '',
  deliverables_de: '',
  price_toman: '',
  price_eur: '',
  price_usd: '',
  duration_days: '',
  payment_terms: '50% project start · 50% delivery',
  payment_terms_fa: '۵۰٪ شروع پروژه · ۵۰٪ تحویل',
  payment_terms_de: '50 % bei Projektstart · 50 % bei Ablieferung',
  is_featured: false,
  is_active: true,
  sort_order: 0,
  service_ids: [],
};

export default function PackageForm({
  package: pkg,
  services,
}: {
  package: PackageData | null;
  services: ServiceOption[];
}) {
  const form = useForm<FormData>(
    pkg
      ? {
          slug: pkg.slug,
          title: pkg.title,
          title_fa: pkg.title_fa ?? '',
          title_de: pkg.title_de ?? '',
          summary: pkg.summary ?? '',
          summary_fa: pkg.summary_fa ?? '',
          summary_de: pkg.summary_de ?? '',
          deliverables: toLines(pkg.deliverables),
          deliverables_fa: toLines(pkg.deliverables_fa),
          deliverables_de: toLines(pkg.deliverables_de),
          price_toman: pkg.price_toman ?? '',
          price_eur: pkg.price_eur ?? '',
          price_usd: pkg.price_usd ?? '',
          duration_days: pkg.duration_days ? String(pkg.duration_days) : '',
          payment_terms: pkg.payment_terms ?? '50% project start · 50% delivery',
          payment_terms_fa: pkg.payment_terms_fa ?? '۵۰٪ شروع پروژه · ۵۰٪ تحویل',
          payment_terms_de: pkg.payment_terms_de ?? '50 % bei Projektstart · 50 % bei Ablieferung',
          is_featured: pkg.is_featured,
          is_active: pkg.is_active,
          sort_order: pkg.sort_order,
          service_ids: pkg.services.map((s) => s.id),
        }
      : blank,
  );

  const pageTitle = pkg ? `Edit — ${pkg.title}` : 'New package';

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const transform = (data: FormData) => ({
      ...data,
      deliverables: fromLines(data.deliverables),
      deliverables_fa: fromLines(data.deliverables_fa),
      deliverables_de: fromLines(data.deliverables_de),
      price_toman: data.price_toman ? Number(data.price_toman) : null,
      price_eur: data.price_eur ? Number(data.price_eur) : null,
      price_usd: data.price_usd ? Number(data.price_usd) : null,
      duration_days: data.duration_days ? Number(data.duration_days) : null,
      ...(pkg ? { _method: 'put' } : {}),
    });
    if (pkg) {
      form.transform(transform);
      form.post(`/admin/packages/${pkg.id}`);
    } else {
      form.transform(transform);
      form.post('/admin/packages');
    }
  };

  const toggleService = (id: number) => {
    form.setData(
      'service_ids',
      form.data.service_ids.includes(id)
        ? form.data.service_ids.filter((s) => s !== id)
        : [...form.data.service_ids, id],
    );
  };

  return (
    <AdminLayout eyebrow="Packages editor" title={pageTitle}>
      <Head title={pageTitle} />
      <form onSubmit={submit} className="space-y-14">

        {/* Titles */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-t border-border pt-10">
          <h2 className="col-span-full font-display text-4xl mb-2">Title</h2>
          <label className="block lg:col-span-full">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
              Slug <span className="opacity-50">(URL key — lowercase letters, numbers, hyphens)</span>
            </span>
            <input
              type="text"
              value={form.data.slug}
              onChange={(e) => form.setData('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
              placeholder="e.g. logo-package"
              className={adminInputClass}
            />
            {form.errors.slug && (
              <span className="mt-2 block text-sm text-accent">{form.errors.slug}</span>
            )}
          </label>
          {(['title', 'title_fa', 'title_de'] as const).map((key) => (
            <label key={key} className="block">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                {key.replace('_', ' ')}
              </span>
              <input
                type="text"
                value={form.data[key]}
                onChange={(e) => form.setData(key, e.target.value)}
                className={adminInputClass}
              />
              {form.errors[key] && (
                <span className="mt-2 block text-sm text-accent">{form.errors[key]}</span>
              )}
            </label>
          ))}
        </section>

        {/* Meta */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-t border-border pt-10">
          <h2 className="col-span-full font-display text-4xl mb-2">Pricing &amp; timing</h2>
          <label className="block">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
              Price — Toman (IRR)
            </span>
            <input
              type="number"
              value={form.data.price_toman}
              onChange={(e) => form.setData('price_toman', e.target.value)}
              placeholder="e.g. 47000000"
              className={adminInputClass}
            />
          </label>
          <label className="block">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
              Price — Euro (€)
            </span>
            <input
              type="number"
              step="0.01"
              value={form.data.price_eur}
              onChange={(e) => form.setData('price_eur', e.target.value)}
              placeholder="e.g. 1200"
              className={adminInputClass}
            />
          </label>
          <label className="block">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
              Price — USD ($)
            </span>
            <input
              type="number"
              step="0.01"
              value={form.data.price_usd}
              onChange={(e) => form.setData('price_usd', e.target.value)}
              placeholder="e.g. 1300"
              className={adminInputClass}
            />
          </label>
          <label className="block">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
              Duration (days)
            </span>
            <input
              type="number"
              value={form.data.duration_days}
              onChange={(e) => form.setData('duration_days', e.target.value)}
              className={adminInputClass}
            />
          </label>
          <label className="block">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
              Sort order
            </span>
            <input
              type="number"
              value={form.data.sort_order}
              onChange={(e) => form.setData('sort_order', Number(e.target.value))}
              className={adminInputClass}
            />
          </label>
          <div className="flex flex-col gap-4 pt-6">
            <label className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={form.data.is_active}
                onChange={(e) => form.setData('is_active', e.target.checked)}
                className="h-5 w-5 cursor-pointer"
              />
              Active (show on site)
            </label>
            <label className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={form.data.is_featured}
                onChange={(e) => form.setData('is_featured', e.target.checked)}
                className="h-5 w-5 cursor-pointer"
              />
              Featured (highlighted)
            </label>
          </div>
        </section>

        {/* Payment terms */}
        <section className="border-t border-border pt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <h2 className="col-span-full font-display text-4xl mb-2">Payment terms</h2>
          <label className="block">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">EN</span>
            <input
              type="text"
              value={form.data.payment_terms}
              onChange={(e) => form.setData('payment_terms', e.target.value)}
              className={adminInputClass}
            />
          </label>
          <label className="block">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">FA</span>
            <input
              type="text"
              value={form.data.payment_terms_fa}
              onChange={(e) => form.setData('payment_terms_fa', e.target.value)}
              className={adminInputClass}
            />
          </label>
          <label className="block">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">DE</span>
            <input
              type="text"
              value={form.data.payment_terms_de}
              onChange={(e) => form.setData('payment_terms_de', e.target.value)}
              className={adminInputClass}
            />
          </label>
        </section>

        {/* Summary */}
        <section className="border-t border-border pt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <h2 className="col-span-full font-display text-4xl mb-2">Summary</h2>
          {(['summary', 'summary_fa', 'summary_de'] as const).map((key) => (
            <label key={key} className="block">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                {key.replace('_', ' ')}
              </span>
              <textarea
                rows={3}
                value={form.data[key]}
                onChange={(e) => form.setData(key, e.target.value)}
                className={`${adminInputClass} resize-none`}
              />
            </label>
          ))}
        </section>

        {/* Deliverables */}
        <section className="border-t border-border pt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <h2 className="col-span-full font-display text-4xl mb-2">
            Deliverables{' '}
            <span className="text-sm font-mono font-normal opacity-50">(one per line)</span>
          </h2>
          {(['deliverables', 'deliverables_fa', 'deliverables_de'] as const).map((key) => (
            <label key={key} className="block">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                {key.replace(/_/g, ' ')}
              </span>
              <textarea
                rows={8}
                value={form.data[key]}
                onChange={(e) => form.setData(key, e.target.value)}
                className={`${adminInputClass} resize-none`}
              />
              {form.errors[key as keyof FormData] && (
                <span className="mt-2 block text-sm text-accent">
                  {form.errors[key as keyof FormData]}
                </span>
              )}
            </label>
          ))}
        </section>

        {/* Services */}
        <section className="border-t border-border pt-10">
          <h2 className="font-display text-4xl mb-6">Included services</h2>
          <div className="flex flex-wrap gap-4">
            {services.map((svc) => (
              <label
                key={svc.id}
                className={`flex items-center gap-3 border px-5 py-4 cursor-pointer transition-colors ${
                  form.data.service_ids.includes(svc.id)
                    ? 'border-foreground bg-foreground/5'
                    : 'border-border hover:border-muted-foreground'
                }`}
              >
                <input
                  type="checkbox"
                  checked={form.data.service_ids.includes(svc.id)}
                  onChange={() => toggleService(svc.id)}
                  className="h-4 w-4 cursor-pointer"
                />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mr-2">
                  {svc.number}
                </span>
                <span className="font-display text-lg">{svc.title}</span>
              </label>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-between border-t border-border pt-8 gap-4">
          <a href="/admin/packages" className="site-button site-button-outline">
            Cancel
          </a>
          <button
            disabled={form.processing}
            className="site-button site-button-primary cursor-pointer"
          >
            {form.processing && (
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 animate-spin" aria-hidden>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
                <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            )}
            {form.processing ? 'Saving…' : 'Save package'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
