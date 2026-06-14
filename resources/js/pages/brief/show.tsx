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
  locale?: 'en' | 'fa';
};

export default function BriefShow({ questions, locale = 'en' }: Props) {
  const isFa = locale === 'fa';

  if (isFa) {
    return (
      <div dir="rtl" lang="fa" className="lang-fa min-h-screen bg-background text-foreground">
        <Head title="بریف پروژه">
          <meta
            name="description"
            content="درباره پروژه‌تان به ما بگویید. برای شروع همکاری برندینگ به ۱۵ سوال کوتاه پاسخ دهید."
          />
        </Head>
        <Nav locale="fa" />
        <main>
          <Brief questions={questions} locale="fa" />
        </main>
        <Footer locale="fa" />
      </div>
    );
  }

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
