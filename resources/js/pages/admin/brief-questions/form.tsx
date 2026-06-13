import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { AdminLayout, adminInputClass } from '../AdminLayout';

type QuestionFormData = {
  label: string;
  label_fa: string;
  hint: string;
  hint_fa: string;
  type: 'short' | 'long' | 'email';
  placeholder: string;
  placeholder_fa: string;
  is_required: boolean;
  is_active: boolean;
  sort_order: number;
};

type QuestionRecord = {
  id: number;
  label: string;
  label_fa: string | null;
  hint: string | null;
  hint_fa: string | null;
  type: 'short' | 'long' | 'email';
  placeholder: string | null;
  placeholder_fa: string | null;
  is_required: boolean;
  is_active: boolean;
  sort_order: number;
};

type Props = {
  question: QuestionRecord | null;
};

const blank: QuestionFormData = {
  label: '',
  label_fa: '',
  hint: '',
  hint_fa: '',
  type: 'long',
  placeholder: 'Your answer...',
  placeholder_fa: '',
  is_required: true,
  is_active: true,
  sort_order: 0,
};

const toFormData = (question: QuestionRecord | null): QuestionFormData =>
  question
    ? {
        label: question.label,
        label_fa: question.label_fa ?? '',
        hint: question.hint ?? '',
        hint_fa: question.hint_fa ?? '',
        type: question.type,
        placeholder: question.placeholder ?? '',
        placeholder_fa: question.placeholder_fa ?? '',
        is_required: question.is_required,
        is_active: question.is_active,
        sort_order: question.sort_order,
      }
    : blank;

export default function BriefQuestionForm({ question }: Props) {
  const form = useForm<QuestionFormData>(toFormData(question));
  const title = question ? 'Edit question' : 'New question';

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (question) form.put(`/admin/brief-questions/${question.id}`);
    else form.post('/admin/brief-questions');
  };

  return (
    <AdminLayout eyebrow="Brief editor" title={title}>
      <Head title={title} />
      <form onSubmit={submit} className="space-y-10 border-t border-border pt-10">
        <label className="block">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Question label (English)</span>
          <textarea
            value={form.data.label}
            onChange={(event) => form.setData('label', event.target.value)}
            rows={3}
            className={`${adminInputClass} resize-none`}
          />
          {form.errors.label && <span className="mt-2 block text-sm text-accent">{form.errors.label}</span>}
        </label>

        <label className="block" dir="rtl">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">سوال (فارسی)</span>
          <textarea
            value={form.data.label_fa}
            onChange={(event) => form.setData('label_fa', event.target.value)}
            rows={3}
            className={`${adminInputClass} resize-none lang-fa text-right`}
          />
          {form.errors.label_fa && <span className="mt-2 block text-sm text-accent">{form.errors.label_fa}</span>}
        </label>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <label className="block">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Hint (English)</span>
            <input value={form.data.hint} onChange={(event) => form.setData('hint', event.target.value)} className={adminInputClass} />
          </label>
          <label className="block" dir="rtl">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">راهنما (فارسی)</span>
            <input value={form.data.hint_fa} onChange={(event) => form.setData('hint_fa', event.target.value)} className={`${adminInputClass} lang-fa text-right`} />
          </label>
          <label className="block">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Placeholder (English)</span>
            <input value={form.data.placeholder} onChange={(event) => form.setData('placeholder', event.target.value)} className={adminInputClass} />
          </label>
          <label className="block" dir="rtl">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">جای‌نگه‌دار (فارسی)</span>
            <input value={form.data.placeholder_fa} onChange={(event) => form.setData('placeholder_fa', event.target.value)} className={`${adminInputClass} lang-fa text-right`} />
          </label>
          <label className="block">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Type</span>
            <select value={form.data.type} onChange={(event) => form.setData('type', event.target.value as QuestionFormData['type'])} className={adminInputClass}>
              <option value="short">Short</option>
              <option value="long">Long</option>
              <option value="email">Email</option>
            </select>
          </label>
          <label className="block">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Sort order</span>
            <input type="number" value={form.data.sort_order} onChange={(event) => form.setData('sort_order', Number(event.target.value))} className={adminInputClass} />
          </label>
        </div>

        <div className="flex flex-wrap gap-8">
          <label className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground cursor-pointer min-h-[44px]">
            <input type="checkbox" checked={form.data.is_required} onChange={(event) => form.setData('is_required', event.target.checked)} className="h-5 w-5 cursor-pointer" />
            Required
          </label>
          <label className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground cursor-pointer min-h-[44px]">
            <input type="checkbox" checked={form.data.is_active} onChange={(event) => form.setData('is_active', event.target.checked)} className="h-5 w-5 cursor-pointer" />
            Active
          </label>
        </div>

        <div className="flex justify-end border-t border-border pt-8">
          <button disabled={form.processing} className="site-button site-button-primary">
            Save question
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
