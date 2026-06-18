import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Footer } from '@/components/components/Contact';
import { Nav } from '@/components/components/Nav';
import { Reveal } from '@/components/components/Reveal';
import { localizedPath, pageClass, pageDir, siteCopy, type Locale } from '@/lib/i18n';

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
    </svg>
  );
}

type Props = {
  calendlyUrl?: string | null;
  locale?: Locale;
};

export default function BriefThanks({ calendlyUrl, locale = 'en' }: Props) {
  const t = siteCopy[locale].thanks;

  return (
    <div dir={pageDir(locale)} lang={locale} className={pageClass(locale)}>
      <Head title={t.headTitle}>
        <meta name="description" content={t.meta} />
      </Head>
      <Nav locale={locale} />
      <main>
        <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-40 px-6 lg:px-12 grain overflow-hidden">
          <div className="relative max-w-[900px] mx-auto">
            <Reveal>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-accent mb-6">
                <SparkleIcon className="h-3 w-3" />
                {t.eyebrow}
              </div>
            </Reveal>

            <h1 className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-tight">
              <motion.span
                className="block"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                {t.line1}
              </motion.span>
              <motion.span
                className="block"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                {t.line2Before} <em className="text-accent not-italic font-normal">{t.line2Accent}</em> {t.line2After}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-lg lg:text-xl leading-relaxed text-muted-foreground max-w-2xl"
            >
              {t.body}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16 border-t border-border pt-10"
            >
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">
                {t.sooner}
              </div>
              {calendlyUrl ? (
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="site-button site-button-primary"
                >
                  {t.book}
                  <span aria-hidden>→</span>
                </a>
              ) : (
                <p className="text-sm text-muted-foreground max-w-md">
                  {t.fallback}
                </p>
              )}
            </motion.div>

            <div className="mt-16">
              <Link
                href={localizedPath('/', locale)}
                className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.back}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
