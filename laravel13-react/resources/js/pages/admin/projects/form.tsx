import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { AdminLayout, adminInputClass, adminSmallInputClass } from '../AdminLayout';

type MediaInput = {
  type: 'image' | 'video';
  url: string;
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
  media: [{ type: 'image', url: '', alt_text: '', is_cover: true }],
};

export default function ProjectForm({ project }: Props) {
  const form = useForm<ProjectFormData>(project ?? blank);
  const title = project ? `Edit ${project.title}` : 'New project';

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (project) form.put(`/admin/projects/${project.slug}`);
    else form.post('/admin/projects');
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
          <label className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground pt-8">
            <input
              type="checkbox"
              checked={form.data.is_published}
              onChange={(event) => form.setData('is_published', event.target.checked)}
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
          <div className="flex items-center justify-between gap-5 mb-6">
            <h2 className="font-display text-4xl">Media</h2>
            <button
              type="button"
              onClick={() => form.setData('media', [...form.data.media, { type: 'image', url: '', alt_text: '', is_cover: false }])}
              className="text-[11px] font-mono uppercase tracking-[0.22em] underline"
            >
              Add media
            </button>
          </div>
          <div className="space-y-5">
            {form.data.media.map((media, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-[120px_1fr_1fr_110px] gap-4 border border-border p-4">
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
                  placeholder="/project-media/example/cover.webp"
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
                <label className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
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
                  />
                  Cover
                </label>
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end border-t border-border pt-8">
          <button disabled={form.processing} className="bg-foreground text-background rounded-full px-7 py-3 font-display text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
            Save project
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
