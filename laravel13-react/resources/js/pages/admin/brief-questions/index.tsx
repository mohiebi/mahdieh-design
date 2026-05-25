import { Head, Link, router } from '@inertiajs/react';
import { AdminButton, AdminLayout } from '../AdminLayout';

type Question = {
  id: number;
  label: string;
  hint: string | null;
  type: 'short' | 'long' | 'email';
  placeholder: string | null;
  is_required: boolean;
  is_active: boolean;
  sort_order: number;
};

type Props = {
  questions: Question[];
};

export default function BriefQuestionsIndex({ questions }: Props) {
  return (
    <AdminLayout eyebrow="Brief CMS" title="Questions" action={<AdminButton href="/admin/brief-questions/create">Create question</AdminButton>}>
      <Head title="Brief questions" />
      <div className="border-t border-border">
        {questions.map((question) => (
          <article key={question.id} className="grid grid-cols-1 lg:grid-cols-[90px_1fr_180px_220px] gap-6 border-b border-border py-7">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">
              {String(question.sort_order + 1).padStart(2, '0')}
            </div>
            <div>
              <h2 className="font-display text-3xl lg:text-4xl leading-tight">{question.label}</h2>
              {question.hint && <p className="mt-2 text-sm text-muted-foreground max-w-2xl">{question.hint}</p>}
            </div>
            <div className="space-y-2 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
              <div>{question.type}</div>
              <div>{question.is_required ? 'Required' : 'Optional'}</div>
              <div>{question.is_active ? 'Active' : 'Inactive'}</div>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/brief-questions/${question.id}/edit`} className="text-xs font-mono uppercase tracking-[0.2em] underline">
                Edit
              </Link>
              <button
                onClick={() => {
                  if (confirm('Delete this question?')) router.delete(`/admin/brief-questions/${question.id}`);
                }}
                className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-accent"
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
