import { Head, Link } from '@inertiajs/react';
import { AdminLayout } from '../AdminLayout';

type Submission = {
  id: number;
  status: string;
  submitted_at: string | null;
  user?: { name: string; email: string } | null;
};

type Props = {
  submissions: Submission[];
};

export default function BriefSubmissionsIndex({ submissions }: Props) {
  return (
    <AdminLayout eyebrow="Client briefs" title="Submissions">
      <Head title="Brief submissions" />
      <div className="border-t border-border">
        {submissions.map((submission) => (
          <Link
            key={submission.id}
            href={`/admin/brief-submissions/${submission.id}`}
            className="grid grid-cols-1 lg:grid-cols-[90px_1fr_180px_220px] gap-6 border-b border-border py-7 hover:bg-muted/20 transition-colors"
          >
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">
              #{submission.id}
            </div>
            <div>
              <h2 className="font-display text-4xl leading-tight">{submission.user?.name ?? 'Unknown user'}</h2>
              <p className="text-sm text-muted-foreground">{submission.user?.email}</p>
            </div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">{submission.status}</div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">{submission.submitted_at}</div>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
}
