import { Head } from '@inertiajs/react';
import { Footer } from '@/components/components/Contact';
import { Nav } from '@/components/components/Nav';
import { ProjectTemplate } from '@/components/components/ProjectTemplate';
import type { Project } from '@/data/projects';
import { pageClass, pageDir, type Locale } from '@/lib/i18n';

type Props = {
  project: Project;
  previousProject: Project;
  nextProject: Project;
  locale?: Locale;
};

export default function ProjectShow({ project, previousProject, nextProject, locale = 'en' }: Props) {
  return (
    <div dir={pageDir(locale)} lang={locale} className={pageClass(locale)}>
      <Head title={project.title}>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={`${project.title} - Mahdieh`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={project.image} />
      </Head>
      <Nav locale={locale} />
      <ProjectTemplate project={project} previousProject={previousProject} nextProject={nextProject} locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
