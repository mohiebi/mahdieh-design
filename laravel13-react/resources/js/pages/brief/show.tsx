import { Head } from '@inertiajs/react';
import { Brief } from '@/components/components/Brief';
import { Footer } from '@/components/components/Contact';
import { Nav } from '@/components/components/Nav';

export type BriefQuestion = {
  id: string;
  label: string;
  hint?: string | null;
  type: 'short' | 'long' | 'email';
  placeholder?: string | null;
  required: boolean;
};

type Props = {
  questions: BriefQuestion[];
};

export default function BriefShow({ questions }: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head title="Project Brief">
        <meta
          name="description"
          content="Tell me about your project. Answer 15 short questions to start a brand or identity collaboration."
        />
      </Head>
      <Nav />
      <main>
        <Brief questions={questions} />
      </main>
      <Footer />
    </div>
  );
}
