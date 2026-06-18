import { Head } from '@inertiajs/react';
import { Footer } from '@/components/components/Contact';
import { Nav } from '@/components/components/Nav';
import { Process } from '@/components/components/Process';
import { pageClass, pageDir, siteCopy, type Locale } from '@/lib/i18n';

type Props = {
  locale?: Locale;
};

export default function ProcessPage({ locale = 'en' }: Props) {
  const t = siteCopy[locale].process;

  return (
    <div dir={pageDir(locale)} lang={locale} className={pageClass(locale)}>
      <Head title={t.headTitle}>
        <meta name="description" content={t.description} />
      </Head>
      <Nav locale={locale} />
      <main className="pt-16">
        <Process locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
