import { Head, Link } from '@inertiajs/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Contact, Footer } from '@/components/components/Contact';
import { Nav } from '@/components/components/Nav';
import { Reveal } from '@/components/components/Reveal';
import type { Project } from '@/data/projects';
import {
  localizedPath,
  packagePathBySlug,
  pageClass,
  pageDir,
  siteCopy,
  type Locale,
} from '@/lib/i18n';

type PackageService = { slug: string; title: string; number: string };

type Package = {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  deliverables: string[];
  price_toman: string | null;
  price_eur: string | null;
  price_usd: string | null;
  duration_days: number | null;
  payment_terms: string | null;
  is_featured: boolean;
  services: PackageService[];
};

type Props = {
  package: Package;
  projects: Project[];
  locale?: Locale;
};

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

function getPriceData(pkg: Package, locale: Locale): { amount: number | null; label: string } {
  if (locale === 'fa') {
    return { amount: pkg.price_toman ? Number(pkg.price_toman) : null, label: 'تومان' };
  }
  if (locale === 'de') {
    return { amount: pkg.price_eur ? Number(pkg.price_eur) : null, label: '€' };
  }
  if (pkg.price_usd) return { amount: Number(pkg.price_usd), label: 'USD' };
  if (pkg.price_toman) return { amount: Number(pkg.price_toman), label: 'Toman' };
  return { amount: null, label: '' };
}

export default function PackageShow({ package: pkg, projects, locale = 'en' }: Props) {
  const t = siteCopy[locale].packagePage;
  const isRtl = locale === 'fa';
  const priceData = getPriceData(pkg, locale);
  const priceFormatted = priceData.amount != null ? priceData.amount.toLocaleString() : null;
  const briefHref = localizedPath('/brief', locale);
  const contactHref = '#contact';
  const ctaHref = priceFormatted == null ? contactHref : briefHref;
  const ctaLabel = priceFormatted == null ? (isRtl ? 'تماس با ما' : 'Contact us') : t.startBrief;

  return (
    <div dir={pageDir(locale)} lang={locale} className={pageClass(locale)}>
      <Head title={`${pkg.title} — Mahdieh Baghoolizadeh`}>
        {pkg.summary && <meta name="description" content={pkg.summary} />}
      </Head>
      <Nav locale={locale} />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="px-6 pb-20 pt-32 lg:px-12 lg:pb-28 lg:pt-44">
          <div className="mx-auto max-w-[1400px]">
            <Link
              href={localizedPath('/services', locale)}
              className="mb-12 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {t.back}
            </Link>

            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Left — title */}
              <div className="lg:col-span-7">
                <div className="mb-6 flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">
                  {pkg.is_featured && (
                    <span className="bg-accent text-accent-foreground px-2 py-0.5">✦ {isRtl ? 'پیشنهادی' : 'Recommended'}</span>
                  )}
                  <span>{t.label}</span>
                </div>
                <h1 className="font-display text-6xl leading-[0.9] md:text-8xl lg:text-9xl">
                  {pkg.title}
                  <span className="text-accent">.</span>
                </h1>
              </div>

              {/* Right — price, duration, summary */}
              <div className="lg:col-span-5 lg:pt-12">
                {/* Price block */}
                <div className="mb-8 border-b border-border pb-8">
                  {priceFormatted != null ? (
                    <>
                      <div className="flex items-baseline gap-3 flex-wrap mb-3">
                        <span className="font-display text-5xl lg:text-6xl leading-none">{priceFormatted}</span>
                        <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">{priceData.label}</span>
                      </div>
                      <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                        {pkg.duration_days != null && (
                          <span className="font-mono text-xs tracking-[0.18em]">
                            {pkg.duration_days} {t.duration}
                          </span>
                        )}
                        {pkg.payment_terms && (
                          <span className="font-mono text-xs tracking-[0.18em] uppercase">{pkg.payment_terms}</span>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="font-display text-3xl lg:text-4xl mb-3">
                        {isRtl ? 'تماس بگیرید' : 'Contact us'}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {isRtl
                          ? 'این پکیج نیاز به جلسه مشاوره دارد تا قیمت بر اساس نیازهای پروژه تعیین شود.'
                          : 'This package requires a consultation to scope your project and define the right plan.'}
                      </p>
                      {pkg.duration_days != null && (
                        <p className="mt-3 font-mono text-xs tracking-[0.18em] text-muted-foreground">
                          {pkg.duration_days} {t.duration}
                        </p>
                      )}
                    </>
                  )}
                </div>

                {pkg.summary && (
                  <p className="text-xl leading-relaxed text-foreground md:text-2xl mb-6">
                    {pkg.summary}
                  </p>
                )}

                <a href={ctaHref} className="site-button site-button-primary">
                  {ctaLabel}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Deliverables ─────────────────────────────────────────────── */}
        <section className="px-6 pb-20 lg:px-12 lg:pb-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="border-t border-border pt-12">
              <Reveal>
                <div className="mb-8 text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                  {t.deliverables}
                </div>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                {pkg.deliverables.map((item, i) => (
                  <DeliverableItem key={i} item={item} index={i} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Included services ────────────────────────────────────────── */}
        {pkg.services.length > 0 && (
          <section className="px-6 pb-20 lg:px-12 lg:pb-28">
            <div className="mx-auto max-w-[1400px]">
              <div className="border-t border-border pt-12">
                <Reveal>
                  <div className="mb-8 text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                    {t.services}
                  </div>
                </Reveal>
                <div className="flex flex-wrap gap-4">
                  {pkg.services.map((svc) => (
                    <a
                      key={svc.slug}
                      href={localizedPath(`/services/${svc.slug}`, locale)}
                      className="group flex items-center gap-4 border border-border px-6 py-4 transition-colors hover:border-foreground"
                    >
                      <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground group-hover:text-foreground transition-colors">
                        {svc.number}
                      </span>
                      <span className="font-display text-xl leading-none">{svc.title}</span>
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
                        className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity -rotate-45 ms-2" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2 14L14 2M2 2h12v12" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Sample projects ──────────────────────────────────────────── */}
        <section className="px-6 pb-24 lg:px-12 lg:pb-32">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="mb-4 text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">
                  {t.related}
                </div>
                <h2 className="font-display text-5xl md:text-7xl">{t.title}</h2>
              </div>
              <div className="text-sm text-muted-foreground">{t.projectCount(projects.length)}</div>
            </div>

            {projects.length > 0 ? (
              <div className="grid gap-10">
                {projects.map((project) => (
                  <Link
                    key={project.slug}
                    href={localizedPath(`/projects/${project.slug}`, locale)}
                    className="group block border-t border-border pt-6"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={project.image}
                        alt={`${project.title} — ${project.category}`}
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
              <p className="max-w-xl text-muted-foreground">{t.empty}</p>
            )}
          </div>
        </section>

        {/* ── Bottom CTA ───────────────────────────────────────────────── */}
        <section className="px-6 pb-24 pt-16 lg:px-12 lg:pb-32 border-t border-border">
          <div className="mx-auto max-w-[1400px]">
            <Reveal>
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
                <div>
                  <div className="mb-4 text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">
                    {siteCopy[locale].contact.eyebrow}
                  </div>
                  <h2 className="font-display text-5xl md:text-7xl max-w-2xl">
                    {siteCopy[locale].contact.line1}
                    <br />
                    {siteCopy[locale].contact.line2}
                  </h2>
                </div>
                <div className="flex flex-col items-start lg:items-end gap-4">
                  <a href={ctaHref} className="site-button site-button-primary text-lg px-8 py-5">
                    {ctaLabel}
                  </a>
                  {priceFormatted != null && (
                    <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground text-start lg:text-end">
                      {priceFormatted} {priceData.label}
                      {pkg.duration_days != null && <> · {pkg.duration_days} {t.duration}</>}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <Contact locale={locale} />
      </main>

      <Footer locale={locale} />
    </div>
  );
}

function DeliverableItem({ item, index }: { item: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="bg-background p-7 lg:p-9"
    >
      <div className="flex gap-4">
        <svg
          viewBox="0 0 20 20"
          fill="none"
          className="h-5 w-5 text-accent flex-shrink-0 mt-0.5"
          aria-hidden
        >
          <path
            d="M4 10l4.5 4.5L16 6"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-base leading-relaxed">{item}</p>
      </div>
    </motion.div>
  );
}
