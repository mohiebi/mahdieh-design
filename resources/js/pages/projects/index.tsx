import { Head } from '@inertiajs/react';
import { Footer } from '@/components/components/Contact';
import { Nav } from '@/components/components/Nav';
import { Work } from '@/components/components/Work';
import type { ProjectScope } from '@/components/components/Work';
import type { Project } from '@/data/projects';
import { pageClass, pageDir, type Locale } from '@/lib/i18n';

type Props = {
  projects: Project[];
  scope: ProjectScope;
  locale?: Locale;
};

export default function ProjectsIndex({ projects, scope, locale = 'en' }: Props) {
  return (
    <div dir={pageDir(locale)} lang={locale} className={pageClass(locale)}>
      <Head title="Projects">
        <meta
          name="description"
          content="A curated archive of identities, campaigns and product work from 2022 to 2026."
        />
      </Head>
      <Nav locale={locale} />
      <main className="pt-16">
        <Work projects={projects} scope={scope} showScopeFilter locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
