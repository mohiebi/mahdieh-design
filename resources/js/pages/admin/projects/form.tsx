import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { AdminLayout, adminInputClass, adminSmallInputClass } from '../AdminLayout';

type MediaInput = {
  type: 'image' | 'video';
  url: string;
  upload?: {
    name: string;
    type: string;
    data: string;
  } | null;
  alt_text: string;
  is_cover: boolean;
};

type ProjectFormData = {
  slug: string;
  title: string;
  client: string;
  year: string;
  category: string;
  description: string;
  location: string;
  credit: string;
  sort_order: number;
  is_published: boolean;
  sections: string[];
  services: string[];
  media: MediaInput[];
};

type Props = {
  project: (ProjectFormData & { id: number }) | null;
};

const blank: ProjectFormData = {
  slug: '',
  title: '',
  client: '',
  year: '2026',
  category: '',
  description: '',
  location: '',
  credit: '',
  sort_order: 0,
  is_published: true,
  sections: [''],
  services: [''],
  media: [{ type: 'image', url: '', upload: null, alt_text: '', is_cover: true }],
};

export default function ProjectForm({ project }: Props) {
  const form = useForm<ProjectFormData>(project ?? blank);
  const title = project ? `Edit ${project.title}` : 'New project';

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (project) {
      form.transform((data) => ({ ...data, _method: 'put' }));
      form.post(`/admin/projects/${project.slug}`);
    } else {
      form.transform((data) => data);
      form.post('/admin/projects');
    }
  };

  const uploadMediaFiles = async (files: FileList | null) => {
    if (!files?.length) return;

    const uploadedMedia = await Promise.all(
      Array.from(files).map(
        (file) =>
          new Promise<MediaInput>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              const isVideo = file.type.startsWith('video/');

              resolve({
                type: isVideo ? 'video' : 'image',
                url: '',
                upload: {
                  name: file.name,
                  type: file.type,
                  data: String(reader.result),
                },
                alt_text: '',
                is_cover: !isVideo && !form.data.media.some((item) => item.is_cover),
              });
            };
            reader.readAsDataURL(file);
          }),
      ),
    );

    form.setData((data) => ({
      ...data,
      media: [...data.media.filter((item) => item.url || item.upload), ...uploadedMedia],
    }));
  };

  const setListItem = <K extends 'sections' | 'services'>(key: K, index: number, value: string) => {
    const next = [...form.data[key]];
    next[index] = value;
    form.setData((data) => ({ ...data, [key]: next }));
  };

  const addListItem = (key: 'sections' | 'services') => {
    form.setData((data) => ({ ...data, [key]: [...data[key], ''] }));
  };

  return (
    <AdminLayout eyebrow="Project editor" title={title}>
      <Head title={title} />
      <form onSubmit={submit} className="space-y-14">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t border-border pt-10">
          {(['title', 'slug', 'client', 'year', 'category', 'location', 'credit'] as const).map((key) => (
            <label key={key} className="block">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">{key.replace('_', ' ')}</span>
              <input
                value={String(form.data[key] ?? '')}
                onChange={(event) => form.setData(key, event.target.value)}
                className={adminInputClass}
              />
              {form.errors[key] && <span className="mt-2 block text-sm text-accent">{form.errors[key]}</span>}
            </label>
          ))}
          <label className="block">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Sort order</span>
            <input
              type="number"
              value={form.data.sort_order}
              onChange={(event) => form.setData('sort_order', Number(event.target.value))}
              className={adminInputClass}
            />
          </label>
          <label className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground pt-8 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={form.data.is_published}
              onChange={(event) => form.setData('is_published', event.target.checked)}
              className="h-5 w-5 cursor-pointer"
            />
            Published
          </label>
        </section>

        <label className="block border-t border-border pt-10">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Description</span>
          <textarea
            value={form.data.description}
            onChange={(event) => form.setData('description', event.target.value)}
            rows={4}
            className={`${adminInputClass} resize-none`}
          />
          {form.errors.description && <span className="mt-2 block text-sm text-accent">{form.errors.description}</span>}
        </label>

        <EditorList title="Body paragraphs" items={form.data.sections} onChange={(index, value) => setListItem('sections', index, value)} onAdd={() => addListItem('sections')} />
        <EditorList title="Services" items={form.data.services} onChange={(index, value) => setListItem('services', index, value)} onAdd={() => addListItem('services')} />

        <section className="border-t border-border pt-10">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-6">
            <h2 className="font-display text-4xl">Media</h2>
            <div className="flex flex-wrap items-center gap-5">
              <label className="cursor-pointer text-[11px] font-mono uppercase tracking-[0.22em] underline">
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
                  className="sr-only"
                  onChange={(event) => {
                    void uploadMediaFiles(event.target.files);
                    event.target.value = '';
                  }}
                />
                Upload files
              </label>
              <button
                type="button"
                onClick={() => form.setData('media', [...form.data.media, { type: 'image', url: '', upload: null, alt_text: '', is_cover: false }])}
                className="text-[11px] font-mono uppercase tracking-[0.22em] underline"
              >
                Add URL row
              </button>
            </div>
          </div>
          <div className="space-y-5">
            {form.data.media.map((media, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-[120px_1fr_1fr_110px_44px] gap-4 border border-border p-4">
                <select
                  value={media.type}
                  onChange={(event) => {
                    const next = [...form.data.media];
                    next[index] = { ...media, type: event.target.value as 'image' | 'video' };
                    form.setData('media', next);
                  }}
                  className={adminSmallInputClass}
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
                <input
                  value={media.url}
                  onChange={(event) => {
                    const next = [...form.data.media];
                    next[index] = { ...media, url: event.target.value };
                    form.setData('media', next);
                  }}
                  placeholder="/img/project-media/project-slug/image.webp or external media"
                  className={adminSmallInputClass}
                />
                <input
                  value={media.alt_text}
                  onChange={(event) => {
                    const next = [...form.data.media];
                    next[index] = { ...media, alt_text: event.target.value };
                    form.setData('media', next);
                  }}
                  placeholder="Alt text"
                  className={adminSmallInputClass}
                />
                <label className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground cursor-pointer min-h-[44px]">
                  <input
                    type="checkbox"
                    checked={media.is_cover}
                    onChange={(event) => {
                      const next = form.data.media.map((item, itemIndex) => ({
                        ...item,
                        is_cover: itemIndex === index ? event.target.checked : false,
                      }));
                      form.setData('media', next);
                    }}
                    className="h-5 w-5 cursor-pointer"
                  />
                  Cover
                </label>
                <button
                  type="button"
                  onClick={() => form.setData('media', form.data.media.filter((_, itemIndex) => itemIndex !== index))}
                  aria-label={`Remove media row ${index + 1}`}
                  className="h-11 w-11 flex items-center justify-center border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
                {form.errors[`media.${index}.upload.data` as keyof typeof form.errors] && (
                  <p className="lg:col-span-5 text-sm text-accent">
                    {form.errors[`media.${index}.upload.data` as keyof typeof form.errors]}
                  </p>
                )}
                {form.errors[`media.${index}.url` as keyof typeof form.errors] && (
                  <p className="lg:col-span-5 text-sm text-accent">
                    {form.errors[`media.${index}.url` as keyof typeof form.errors]}
                  </p>
                )}
                {media.upload?.name && (
                  <p className="lg:col-span-5 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                    Queued upload: {media.upload.name}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end border-t border-border pt-8">
          <button
            disabled={form.processing}
            className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-7 py-3 font-display text-sm hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {form.processing && (
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 animate-spin" aria-hidden>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
                <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            )}
            {form.processing ? 'Saving…' : 'Save project'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}

function EditorList({
  title,
  items,
  onChange,
  onAdd,
}: {
  title: string;
  items: string[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
}) {
  return (
    <section className="border-t border-border pt-10">
      <div className="flex items-center justify-between gap-5 mb-6">
        <h2 className="font-display text-4xl">{title}</h2>
        <button type="button" onClick={onAdd} className="text-[11px] font-mono uppercase tracking-[0.22em] underline">
          Add row
        </button>
      </div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <textarea
            key={index}
            value={item}
            onChange={(event) => onChange(index, event.target.value)}
            rows={title === 'Services' ? 1 : 3}
            className={`${adminSmallInputClass} resize-none`}
          />
        ))}
      </div>
    </section>
  );
}
