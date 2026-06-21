import { Head } from '@inertiajs/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Footer } from '@/components/components/Contact';
import { Nav } from '@/components/components/Nav';
import { Reveal } from '@/components/components/Reveal';
import { localizedPath, packagePathBySlug, siteCopy, type Locale } from '@/lib/i18n';

type Service = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  description: string[];
  focus: string[];
};

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
  services: { slug: string; title: string; number: string }[];
};

type Props = {
  services: Service[];
  packages: Package[];
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
  // EN — prefer USD, fall back to Toman
  if (pkg.price_usd) return { amount: Number(pkg.price_usd), label: 'USD' };
  if (pkg.price_toman) return { amount: Number(pkg.price_toman), label: 'Toman' };
  return { amount: null, label: '' };
}

function ServiceRow({
  service,
  index,
  locale,
}: {
  service: Service;
  index: number;
  locale: Locale;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease }}
      className="group border-b border-border"
    >
      <a
        href={localizedPath(`/services/${service.slug}`, locale)}
        className="block px-6 lg:px-12 py-10 lg:py-14 transition-colors duration-500 hover:bg-accent hover:text-accent-foreground"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-[120px_1fr_auto] gap-6 lg:gap-12 items-start">
            <div className="font-mono text-xs tracking-[0.3em] opacity-50 pt-2">{service.number}</div>
            <div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 leading-[0.95]">
                {service.title}
              </h2>
              <p className="leading-relaxed opacity-70 max-w-2xl text-lg mb-6">{service.summary}</p>
              <div className="flex flex-wrap gap-2">
                {service.focus.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono uppercase tracking-[0.22em] border border-current px-2.5 py-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="hidden lg:flex items-center pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-8 w-8 -rotate-45"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M4.5 4.5h15v15" />
              </svg>
            </div>
          </div>
        </div>
      </a>
    </motion.article>
  );
}

function PackageCard({
  pkg,
  index,
  locale,
}: {
  pkg: Package;
  index: number;
  locale: Locale;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const packageHref = packagePathBySlug(pkg.slug, locale);
  const isRtl = locale === 'fa';
  const priceData = getPriceData(pkg, locale);
  const priceFormatted = priceData.amount != null ? priceData.amount.toLocaleString() : null;

  return (
    <motion.a
      ref={ref}
      href={packageHref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease }}
      dir={isRtl ? 'rtl' : undefined}
      className={`group relative flex flex-col h-full border p-7 lg:p-9 transition-colors duration-300 hover:bg-accent hover:text-accent-foreground ${
        pkg.is_featured ? 'border-accent' : 'border-border hover:border-accent'
      }`}
    >
      {pkg.is_featured && (
        <div className="absolute -top-px start-8 bg-accent px-3 py-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-foreground">
            ✦ {isRtl ? 'پیشنهادی' : 'Recommended'}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-5 min-h-[8.5rem] pt-3 md:min-h-[9.5rem] xl:min-h-[8.5rem]">
        <h3 className="font-display text-2xl lg:text-3xl mb-2 leading-tight">{pkg.title}</h3>
        {pkg.summary && (
          <p className="text-sm leading-relaxed opacity-70">{pkg.summary}</p>
        )}
      </div>

      {/* Price + timing — stacked, never overflows */}
      <div className="mb-7 pb-7 border-b border-border space-y-2">
        {priceFormatted != null ? (
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-display text-3xl lg:text-4xl leading-none">{priceFormatted}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {priceData.label}
            </span>
          </div>
        ) : (
          <div className="font-display text-2xl lg:text-3xl leading-tight">
            {isRtl ? 'تماس بگیرید' : 'Contact us'}
          </div>
        )}
        {pkg.duration_days != null && (
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl">{pkg.duration_days}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {isRtl ? 'روز' : 'days'}
            </span>
          </div>
        )}
      </div>

      {/* Deliverables */}
      <ul className="flex-1 flex flex-col gap-3 mb-7">
        {pkg.deliverables.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="h-4 w-4 text-accent flex-shrink-0 mt-0.5"
              aria-hidden
            >
              <path
                d="M3 8l3.5 3.5L13 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="opacity-80">{item}</span>
          </li>
        ))}
      </ul>

      {/* Included service tags */}
      {pkg.services.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {pkg.services.map((svc) => (
            <span
              key={svc.slug}
              className="text-[9px] font-mono uppercase tracking-[0.2em] border border-border px-2 py-1 text-muted-foreground"
            >
              {svc.number} · {svc.title}
            </span>
          ))}
        </div>
      )}

      {/* Payment terms */}
      {pkg.payment_terms && (
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-6">
          {pkg.payment_terms}
        </p>
      )}

      {/* CTA */}
      <div
        className={`site-button justify-center pointer-events-none ${
          pkg.is_featured ? 'site-button-primary' : 'site-button-outline'
        }`}
      >
        {isRtl ? 'مشاهده پکیج' : 'View package'}
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
          className="h-4 w-4 ms-2 -rotate-45" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 14L14 2M2 2h12v12" />
        </svg>
      </div>
    </motion.a>
  );
}

export default function ServicesIndex({ services, packages = [], locale = 'en' }: Props) {
  const t = siteCopy[locale];
  const isRtl = locale === 'fa';

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head title="Services — Mahdieh Baghoolizadeh" />
      <Nav locale={locale} />

      <main className="pt-16">
        {/* Hero */}
        <section
          dir={isRtl ? 'rtl' : undefined}
          className="px-6 lg:px-12 py-24 lg:py-40 border-b border-border"
        >
          <div className="max-w-[1400px] mx-auto">
            <Reveal>
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6">
                {t.services.eyebrow}
              </div>
              <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] max-w-5xl">
                {t.services.title.replace(/\.$/, '')}
                <span className="text-accent">.</span>
              </h1>
            </Reveal>
          </div>
        </section>

        {/* Services list */}
        <div className="border-t border-border" dir={isRtl ? 'rtl' : undefined}>
          {services.map((service, i) => (
            <ServiceRow key={service.slug} service={service} index={i} locale={locale} />
          ))}
        </div>

        {/* Packages */}
        {packages.length > 0 && (
          <section
            dir={isRtl ? 'rtl' : undefined}
            className="px-6 lg:px-12 py-24 lg:py-32 border-t border-border"
          >
            <div className="max-w-[1400px] mx-auto">
              <Reveal>
                <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">
                  ✦ {isRtl ? 'پکیج‌ها' : 'Packages'}
                </div>
                <h2 className="font-display text-5xl md:text-7xl mb-16 max-w-3xl">
                  {isRtl ? 'یک پکیج انتخاب کنید' : 'Choose a package'}
                  <span className="text-accent">.</span>
                </h2>
              </Reveal>

              {/* Cards: use a border-separated grid, no bg-border gap-px trick so cards have full padding */}
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                {packages.map((pkg, i) => (
                  <PackageCard key={pkg.id} pkg={pkg} index={i} locale={locale} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section
          dir={isRtl ? 'rtl' : undefined}
          className="px-6 lg:px-12 py-24 lg:py-40 border-t border-border"
        >
          <div className="max-w-[1400px] mx-auto">
            <Reveal>
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-8">
                {t.contact.eyebrow}
              </div>
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
                <h2 className="font-display text-5xl md:text-7xl max-w-2xl">
                  {t.contact.line1}
                  <br />
                  {t.contact.line2}
                </h2>
                <a
                  href={localizedPath('/brief', locale)}
                  className="site-button site-button-primary self-start lg:self-end text-lg px-8 py-5"
                >
                  {t.process.startBrief}
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
