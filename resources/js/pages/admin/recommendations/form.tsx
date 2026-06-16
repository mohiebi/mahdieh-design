import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { AdminLayout, adminInputClass, adminSmallInputClass } from '../AdminLayout';

type AvatarUpload = {
  name: string;
  type: string;
  data: string;
};

type FormData = {
  name: string;
  role: string;
  company: string;
  quote: string;
  linkedin_url: string;
  sort_order: number;
  is_active: boolean;
  avatar_upload: AvatarUpload | null;
  remove_avatar: boolean;
};

type RecommendationData = {
  id: number;
  name: string;
  role: string | null;
  company: string | null;
  quote: string;
  linkedin_url: string | null;
  avatar_path: string | null;
  sort_order: number;
  is_active: boolean;
};

type Props = {
  recommendation: RecommendationData | null;
};

const blank: FormData = {
  name: '',
  role: '',
  company: '',
  quote: '',
  linkedin_url: '',
  sort_order: 0,
  is_active: true,
  avatar_upload: null,
  remove_avatar: false,
};

export default function RecommendationForm({ recommendation }: Props) {
  const form = useForm<FormData>(
    recommendation
      ? {
          name: recommendation.name,
          role: recommendation.role ?? '',
          company: recommendation.company ?? '',
          quote: recommendation.quote,
          linkedin_url: recommendation.linkedin_url ?? '',
          sort_order: recommendation.sort_order,
          is_active: recommendation.is_active,
          avatar_upload: null,
          remove_avatar: false,
        }
      : blank,
  );

  const title = recommendation ? `Edit — ${recommendation.name}` : 'New recommendation';

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (recommendation) {
      form.transform((data) => ({ ...data, _method: 'put' }));
      form.post(`/admin/recommendations/${recommendation.id}`);
    } else {
      form.post('/admin/recommendations');
    }
  };

  const handleAvatarFile = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      form.setData((data) => ({
        ...data,
        avatar_upload: { name: file.name, type: file.type, data: String(reader.result) },
        remove_avatar: false,
      }));
    };
    reader.readAsDataURL(file);
  };

  const previewSrc = form.data.remove_avatar
    ? null
    : (form.data.avatar_upload?.data ?? recommendation?.avatar_path ?? null);

  const hasAvatar = Boolean(previewSrc) || Boolean(form.data.avatar_upload);

  return (
    <AdminLayout eyebrow="Recommendation editor" title={title}>
      <Head title={title} />
      <form onSubmit={submit} className="space-y-14">

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t border-border pt-10">
          {(['name', 'role', 'company', 'linkedin_url'] as const).map((key) => (
            <label key={key} className="block">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                {key.replace('_', ' ')}
              </span>
              <input
                type={key === 'linkedin_url' ? 'url' : 'text'}
                value={String(form.data[key] ?? '')}
                onChange={(e) => form.setData(key, e.target.value)}
                placeholder={key === 'linkedin_url' ? 'https://linkedin.com/in/username' : undefined}
                className={adminInputClass}
              />
              {form.errors[key] && (
                <span className="mt-2 block text-sm text-accent">{form.errors[key]}</span>
              )}
            </label>
          ))}

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

          <label className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground pt-8 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={form.data.is_active}
              onChange={(e) => form.setData('is_active', e.target.checked)}
              className="h-5 w-5 cursor-pointer"
            />
            Active (show on site)
          </label>
        </section>

        <label className="block border-t border-border pt-10">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
            Quote
          </span>
          <textarea
            value={form.data.quote}
            onChange={(e) => form.setData('quote', e.target.value)}
            rows={4}
            className={`${adminInputClass} resize-none`}
          />
          {form.errors.quote && (
            <span className="mt-2 block text-sm text-accent">{form.errors.quote}</span>
          )}
        </label>

        <section className="border-t border-border pt-10">
          <h2 className="font-display text-4xl mb-8">Profile picture</h2>
          <div className="flex flex-wrap items-start gap-8">
            {previewSrc ? (
              <img
                src={previewSrc}
                alt="Avatar preview"
                style={{ height: '6rem', width: '6rem', minWidth: '6rem' }}
                className="rounded-full object-cover border border-border flex-shrink-0"
              />
            ) : (
              <div
                style={{ height: '6rem', width: '6rem', minWidth: '6rem' }}
                className="rounded-full border border-border flex items-center justify-center font-display text-sm text-muted-foreground select-none flex-shrink-0"
              >
                None
              </div>
            )}

            <div className="flex flex-col gap-3">
              <label className="site-button site-button-outline site-button-compact cursor-pointer">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="sr-only"
                  onChange={(e) => {
                    handleAvatarFile(e.target.files?.[0] ?? null);
                    e.target.value = '';
                  }}
                />
                {form.data.avatar_upload ? 'Change avatar' : 'Upload avatar'}
              </label>

              {(recommendation?.avatar_path || form.data.avatar_upload) && !form.data.remove_avatar && (
                <button
                  type="button"
                  onClick={() =>
                    form.setData((data) => ({ ...data, remove_avatar: true, avatar_upload: null }))
                  }
                  className="site-button site-button-outline site-button-danger site-button-compact cursor-pointer"
                >
                  Remove avatar
                </button>
              )}

              {form.data.remove_avatar && (
                <button
                  type="button"
                  onClick={() => form.setData('remove_avatar', false)}
                  className="site-button site-button-outline site-button-compact cursor-pointer"
                >
                  Undo remove
                </button>
              )}

              {form.data.avatar_upload && (
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                  Ready: {form.data.avatar_upload.name}
                </p>
              )}
              {form.data.remove_avatar && (
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-accent">
                  Avatar will be removed on save
                </p>
              )}
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between border-t border-border pt-8 gap-4">
          <a href="/admin/recommendations" className="site-button site-button-outline">
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
            {form.processing ? 'Saving…' : 'Save recommendation'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
