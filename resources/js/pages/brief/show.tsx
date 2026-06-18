import { Head } from '@inertiajs/react';
import { Brief } from '@/components/components/Brief';
import { Footer } from '@/components/components/Contact';
import { Nav } from '@/components/components/Nav';
import { pageClass, pageDir, siteCopy, type Locale } from '@/lib/i18n';

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
  locale?: Locale;
};

export default function BriefShow({ questions, locale = 'en' }: Props) {
  const t = siteCopy[locale].brief;

  return (
    <div dir={pageDir(locale)} lang={locale} className={pageClass(locale)}>
      <Head title={t.headTitle}>
        <meta name="description" content={t.meta} />
      </Head>
      <Nav locale={locale} />
      <main>
        <Brief questions={questions} locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
