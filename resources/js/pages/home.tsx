import { Head } from '@inertiajs/react';
import { About } from '@/components/components/About';
import { Contact, Footer } from '@/components/components/Contact';
import { Hero } from '@/components/components/Hero';
import { Nav } from '@/components/components/Nav';
import { Services } from '@/components/components/Services';
import type { Recommendation } from '@/components/components/Testimonials';
import { Testimonials } from '@/components/components/Testimonials';
import { Work } from '@/components/components/Work';
import type { Project } from '@/data/projects';
import { pageClass, pageDir, type Locale } from '@/lib/i18n';

type Props = {
  projects: Project[];
  recommendations: Recommendation[];
  locale?: Locale;
};

export default function Home({ projects, recommendations, locale = 'en' }: Props) {
  return (
    <div dir={pageDir(locale)} lang={locale} className={pageClass(locale)}>
      <Head title="Mahdieh Baghoolizadeh" />
      <Nav locale={locale} />
      <main>
        <Hero locale={locale} />
        <Work projects={projects} limit={3} showMoreLink locale={locale} />
        <Services locale={locale} />
        <Testimonials recommendations={recommendations} locale={locale} />
        <About locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
