import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { AdminLayout, adminInputClass } from '../AdminLayout';

type IconUpload = { name: string; type: string; data: string };

type FormData = {
  slug: string;
  number: string;
  title: string;
  title_fa: string;
  title_de: string;
  summary: string;
  summary_fa: string;
  summary_de: string;
  description: string; // newline-separated
  description_fa: string;
  description_de: string;
  focus: string; // newline-separated
  focus_fa: string;
  focus_de: string;
  match_labels: string; // newline-separated
  sort_order: number;
  is_active: boolean;
  icon_upload: IconUpload | null;
  remove_icon: boolean;
};

type ServiceData = {
  id: number;
  slug: string;
  number: string;
  title: string;
  title_fa: string | null;
  title_de: string | null;
  summary: string;
  summary_fa: string | null;
  summary_de: string | null;
  description: string[];
  description_fa: string[] | null;
  description_de: string[] | null;
  focus: string[];
  focus_fa: string[] | null;
  focus_de: string[] | null;
  match_labels: string[];
  sort_order: number;
  is_active: boolean;
  icon_path: string | null;
};

type Props = { service: ServiceData | null };

const toLines = (arr: string[] | null | undefined) => (arr ?? []).join('\n');
const fromLines = (s: string): string[] => s.split('\n').map((l) => l.trim()).filter(Boolean);

const blank: FormData = {
  slug: '', number: '01', title: '', title_fa: '', title_de: '',
  summary: '', summary_fa: '', summary_de: '',
  description: '', description_fa: '', description_de: '',
  focus: '', focus_fa: '', focus_de: '',
  match_labels: '', sort_order: 0, is_active: true,
  icon_upload: null, remove_icon: false,
};

const iconStyle = { height: '5rem', width: '5rem', minWidth: '5rem' };

export default function ServiceForm({ service }: Props) {
  const form = useForm<FormData>(
    service
      ? {
          slug: service.slug,
          number: service.number,
          title: service.title,
          title_fa: service.title_fa ?? '',
          title_de: service.title_de ?? '',
          summary: service.summary,
          summary_fa: service.summary_fa ?? '',
          summary_de: service.summary_de ?? '',
          description: toLines(service.description),
          description_fa: toLines(service.description_fa),
          description_de: toLines(service.description_de),
          focus: toLines(service.focus),
          focus_fa: toLines(service.focus_fa),
          focus_de: toLines(service.focus_de),
          match_labels: toLines(service.match_labels),
          sort_order: service.sort_order,
          is_active: service.is_active,
          icon_upload: null,
          remove_icon: false,
        }
      : blank,
  );

  const title = service ? `Edit — ${service.title}` : 'New service';

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const transform = (data: FormData) => ({
      ...data,
      description: fromLines(data.description),
      description_fa: fromLines(data.description_fa),
      description_de: fromLines(data.description_de),
      focus: fromLines(data.focus),
      focus_fa: fromLines(data.focus_fa),
      focus_de: fromLines(data.focus_de),
      match_labels: fromLines(data.match_labels),
      ...(service ? { _method: 'put' } : {}),
    });

    if (service) {
      form.transform(transform);
      form.post(`/admin/services/${service.id}`);
    } else {
      form.transform(transform);
      form.post('/admin/services');
    }
  };

  const handleIconFile = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      form.setData((d) => ({
        ...d,
        icon_upload: { name: file.name, type: file.type, data: String(reader.result) },
        remove_icon: false,
      }));
    };
    reader.readAsDataURL(file);
  };

  const previewSrc = form.data.remove_icon
    ? null
    : (form.data.icon_upload?.data ?? service?.icon_path ?? null);

  return (
    <AdminLayout eyebrow="Services editor" title={title}>
      <Head title={title} />
      <form onSubmit={submit} className="space-y-14">

        {/* Basic fields */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t border-border pt-10">
          {(['title', 'title_fa', 'title_de'] as const).map((key) => (
            <label key={key} className="block">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                {key.replace('_', ' ')}
              </span>
              <input type="text" value={form.data[key]} onChange={(e) => form.setData(key, e.target.value)} className={adminInputClass} />
              {form.errors[key] && <span className="mt-2 block text-sm text-accent">{form.errors[key]}</span>}
            </label>
          ))}
          <label className="block">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Slug</span>
            <input type="text" value={form.data.slug} onChange={(e) => form.setData('slug', e.target.value)} className={adminInputClass} />
            {form.errors.slug && <span className="mt-2 block text-sm text-accent">{form.errors.slug}</span>}
          </label>
          <label className="block">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Number (e.g. 01)</span>
            <input type="text" value={form.data.number} onChange={(e) => form.setData('number', e.target.value)} className={adminInputClass} />
          </label>
          <label className="block">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Sort order</span>
            <input type="number" value={form.data.sort_order} onChange={(e) => form.setData('sort_order', Number(e.target.value))} className={adminInputClass} />
          </label>
          <label className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground pt-8 cursor-pointer min-h-[44px]">
            <input type="checkbox" checked={form.data.is_active} onChange={(e) => form.setData('is_active', e.target.checked)} className="h-5 w-5 cursor-pointer" />
            Active (show on site)
          </label>
        </section>

        {/* Summary */}
        <section className="border-t border-border pt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <h2 className="col-span-full font-display text-4xl mb-2">Summary</h2>
          {(['summary', 'summary_fa', 'summary_de'] as const).map((key) => (
            <label key={key} className="block">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">{key.replace('_', ' ')}</span>
              <textarea rows={3} value={form.data[key]} onChange={(e) => form.setData(key, e.target.value)} className={`${adminInputClass} resize-none`} />
              {form.errors[key] && <span className="mt-2 block text-sm text-accent">{form.errors[key]}</span>}
            </label>
          ))}
        </section>

        {/* Description */}
        <section className="border-t border-border pt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <h2 className="col-span-full font-display text-4xl mb-2">Description <span className="text-sm font-mono font-normal opacity-50">(one paragraph per line)</span></h2>
          {(['description', 'description_fa', 'description_de'] as const).map((key) => (
            <label key={key} className="block">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">{key.replace(/_/g, ' ')}</span>
              <textarea rows={5} value={form.data[key]} onChange={(e) => form.setData(key, e.target.value)} className={`${adminInputClass} resize-none`} />
            </label>
          ))}
        </section>

        {/* Focus */}
        <section className="border-t border-border pt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <h2 className="col-span-full font-display text-4xl mb-2">Focus tags <span className="text-sm font-mono font-normal opacity-50">(one tag per line)</span></h2>
          {(['focus', 'focus_fa', 'focus_de'] as const).map((key) => (
            <label key={key} className="block">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">{key.replace('_', ' ')}</span>
              <textarea rows={4} value={form.data[key]} onChange={(e) => form.setData(key, e.target.value)} className={`${adminInputClass} resize-none`} />
            </label>
          ))}
        </section>

        {/* Match labels */}
        <section className="border-t border-border pt-10">
          <h2 className="font-display text-4xl mb-2">Match labels <span className="text-sm font-mono font-normal opacity-50">(one per line — used to link related projects)</span></h2>
          <label className="block lg:w-1/3">
            <textarea rows={4} value={form.data.match_labels} onChange={(e) => form.setData('match_labels', e.target.value)} className={`${adminInputClass} resize-none`} />
            {form.errors.match_labels && <span className="mt-2 block text-sm text-accent">{form.errors.match_labels}</span>}
          </label>
        </section>

        {/* Icon */}
        <section className="border-t border-border pt-10">
          <h2 className="font-display text-4xl mb-8">Icon / Symbol</h2>
          <div className="flex flex-wrap items-start gap-8">
            {previewSrc ? (
              <img src={previewSrc} alt="Icon preview" style={iconStyle} className="rounded border border-border object-contain bg-border/20 p-2 flex-shrink-0" />
            ) : (
              <div style={iconStyle} className="rounded border border-border flex items-center justify-center font-mono text-sm text-muted-foreground select-none flex-shrink-0">None</div>
            )}
            <div className="flex flex-col gap-3">
              <label className="site-button site-button-outline site-button-compact cursor-pointer">
                <input type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" className="sr-only" onChange={(e) => { handleIconFile(e.target.files?.[0] ?? null); e.target.value = ''; }} />
                {form.data.icon_upload ? 'Change icon' : 'Upload icon'}
              </label>
              {(service?.icon_path || form.data.icon_upload) && !form.data.remove_icon && (
                <button type="button" onClick={() => form.setData((d) => ({ ...d, remove_icon: true, icon_upload: null }))} className="site-button site-button-outline site-button-danger site-button-compact cursor-pointer">Remove icon</button>
              )}
              {form.data.remove_icon && (
                <button type="button" onClick={() => form.setData('remove_icon', false)} className="site-button site-button-outline site-button-compact cursor-pointer">Undo remove</button>
              )}
              {form.data.icon_upload && <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">Ready: {form.data.icon_upload.name}</p>}
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between border-t border-border pt-8 gap-4">
          <a href="/admin/services" className="site-button site-button-outline">Cancel</a>
          <button disabled={form.processing} className="site-button site-button-primary cursor-pointer">
            {form.processing && (
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 animate-spin" aria-hidden>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
                <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            )}
            {form.processing ? 'Saving…' : 'Save service'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
