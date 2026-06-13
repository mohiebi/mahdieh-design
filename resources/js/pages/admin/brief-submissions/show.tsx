import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { AdminLayout } from '../AdminLayout';

type Submission = {
  id: number;
  status: 'new' | 'reviewed' | 'archived';
  submitted_at: string | null;
  user?: { name: string; email: string } | null;
  answers: {
    id: number;
    question_label: string;
    question_hint: string | null;
    question_type: string;
    question_required: boolean;
    answer: string | null;
    sort_order: number;
  }[];
};

type Props = {
  submission: Submission;
};

export default function BriefSubmissionShow({ submission }: Props) {
  const form = useForm({ status: submission.status });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    form.patch(`/admin/brief-submissions/${submission.id}`);
  };

  return (
    <AdminLayout eyebrow={`Brief #${submission.id}`} title={submission.user?.name ?? 'Submission'}>
      <Head title={`Brief #${submission.id}`} />
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 border-t border-border pt-10">
        <aside>
          <div className="lg:sticky lg:top-28 space-y-8">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3">Client</div>
              <div className="font-display text-3xl">{submission.user?.name}</div>
              <div className="text-sm text-muted-foreground">{submission.user?.email}</div>
            </div>
            <form onSubmit={submit} className="border-t border-border pt-6">
              <label className="block">
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Status</span>
                <select
                  value={form.data.status}
                  onChange={(event) => form.setData('status', event.target.value as Submission['status'])}
                  className="mt-3 w-full bg-transparent border border-border px-4 py-3"
                >
                  <option value="new">New</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="archived">Archived</option>
                </select>
              </label>
              <button className="site-button site-button-outline site-button-compact mt-5">
                Update status
              </button>
            </form>
          </div>
        </aside>

        <section className="space-y-10">
          {submission.answers.map((answer, index) => (
            <article key={answer.id} className="border-b border-border pb-9">
              <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">
                Question {index + 1} / {answer.question_type}
              </div>
              <h2 className="font-display text-3xl lg:text-4xl leading-tight">{answer.question_label}</h2>
              {answer.question_hint && <p className="mt-2 text-sm text-muted-foreground">{answer.question_hint}</p>}
              <p className="mt-6 text-lg leading-relaxed whitespace-pre-line">{answer.answer || 'No answer provided.'}</p>
            </article>
          ))}
        </section>
      </div>
    </AdminLayout>
  );
}
