import { Head, Link } from '@inertiajs/react';
import { Contact, Footer } from '@/components/components/Contact';
import { Nav } from '@/components/components/Nav';
import type { Project } from '@/data/projects';
import { localizedPath, pageClass, pageDir, siteCopy, type Locale } from '@/lib/i18n';

type Service = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  description: string[];
  focus: string[];
};

type Props = {
  service: Service;
  projects: Project[];
  locale?: Locale;
};

export default function ServiceShow({ service, projects, locale = 'en' }: Props) {
  const t = siteCopy[locale].servicePage;

  return (
    <div dir={pageDir(locale)} lang={locale} className={pageClass(locale)}>
      <Head title={service.title}>
        <meta name="description" content={service.summary} />
      </Head>
      <Nav locale={locale} />

      <main>
        <section className="px-6 pb-20 pt-32 lg:px-12 lg:pb-28 lg:pt-44">
          <div className="mx-auto max-w-[1400px]">
            <Link
              href={localizedPath('/#services', locale)}
              className="mb-12 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {t.back}
            </Link>

            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <div className="mb-6 text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">
                  {service.number} / {t.label}
                </div>
                <h1 className="font-display text-6xl leading-[0.9] md:text-8xl lg:text-9xl">
                  {service.title}
                  <span className="text-accent">.</span>
                </h1>
              </div>

              <div className="lg:col-span-5 lg:pt-12">
                <p className="text-xl leading-relaxed text-foreground md:text-2xl">
                  {service.summary}
                </p>
                <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground lg:text-lg">
                  {service.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-16 border-y border-border py-8">
              <div className="mb-5 text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                {t.focus}
              </div>
              <div className="flex flex-wrap gap-3">
                {service.focus.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-border px-4 py-2 text-xs font-mono uppercase tracking-[0.18em]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 lg:px-12 lg:pb-32">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="mb-4 text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">
                  {t.related}
                </div>
                <h2 className="font-display text-5xl md:text-7xl">
                  {t.title}
                </h2>
              </div>
              <div className="text-sm text-muted-foreground">
                {t.projectCount(projects.length)}
              </div>
            </div>

            {projects.length > 0 ? (
              <div className="grid gap-10 md:grid-cols-1">
                {projects.map((project) => (
                  <Link
                    key={project.slug}
                    href={localizedPath(`/projects/${project.slug}`, locale)}
                    className="group block border-t border-border pt-6"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={project.image}
                        alt={`${project.title} - ${project.category}`}
                        loading="lazy"
                        className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="mt-6 flex items-start justify-between gap-5">
                      <div>
                        <div className="mb-3 text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                          {project.category} / {project.year}
                        </div>
                        <h3 className="font-display text-4xl leading-none">
                          {project.title}
                          <span className="text-accent">.</span>
                        </h3>
                      </div>
                      <span className="shrink-0 pt-2 text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground transition-colors group-hover:text-foreground">
                        {t.view}
                      </span>
                    </div>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="max-w-xl text-muted-foreground">
                {t.empty}
              </p>
            )}
          </div>
        </section>

        <Contact locale={locale} />
      </main>

      <Footer locale={locale} />
    </div>
  );
}
