import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Footer } from '@/components/components/Contact';
import { Nav } from '@/components/components/Nav';
import { Reveal } from '@/components/components/Reveal';

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
    </svg>
  );
}

type Props = {
  calendlyUrl?: string | null;
  locale?: 'en' | 'fa';
};

export default function BriefThanks({ calendlyUrl, locale = 'en' }: Props) {
  const isFa = locale === 'fa';

  if (isFa) {
    return (
      <div dir="rtl" lang="fa" className="lang-fa min-h-screen bg-background text-foreground">
        <Head title="بریف دریافت شد">
          <meta name="description" content="از بریف شما متشکریم. ظرف ۲۴ ساعت آینده با شما تماس خواهیم گرفت." />
        </Head>
        <Nav locale="fa" />
        <main>
          <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-40 px-6 lg:px-12 grain overflow-hidden">
            <div className="relative max-w-[900px] mx-auto">
              <Reveal>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-accent mb-6">
                  <SparkleIcon className="h-3 w-3" />
                  بریف دریافت شد
                </div>
              </Reveal>

              <h1 className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-tight">
                <motion.span
                  className="block"
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  متشکریم.
                </motion.span>
                <motion.span
                  className="block"
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  ظرف <em className="text-accent not-italic font-normal">۲۴ ساعت</em> با شما تماس می‌گیریم.
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 text-lg lg:text-xl leading-relaxed text-muted-foreground max-w-2xl"
              >
                پاسخ‌های شما به ما کمک می‌کند پیش از گفتگو، شکل کلی پروژه را درک کنیم. هر بریف را
                شخصاً می‌خوانیم و به‌زودی برای مراحل بعدی با شما در تماس خواهیم بود.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mt-16 border-t border-border pt-10"
              >
                <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">
                  می‌خواهید زودتر صحبت کنیم؟
                </div>
                {calendlyUrl ? (
                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="site-button site-button-primary"
                  >
                    رزرو جلسه
                    <bdi dir="ltr" aria-hidden>←</bdi>
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground max-w-md">
                    لینک رزرو وقت به‌زودی در دسترس قرار می‌گیرد. در این فاصله می‌توانید از طریق
                    اطلاعات تماس زیر با ما در ارتباط باشید.
                  </p>
                )}
              </motion.div>

              <div className="mt-16">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  <bdi dir="ltr" aria-hidden>→</bdi> بازگشت به صفحه اصلی
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer locale="fa" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head title="Brief received">
        <meta name="description" content="Thanks for sharing your project brief. I'll be in touch within 24 hours." />
      </Head>
      <Nav />
      <main>
        <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-40 px-6 lg:px-12 grain overflow-hidden">
          <div className="relative max-w-[900px] mx-auto">
            <Reveal>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-accent mb-6">
                <SparkleIcon className="h-3 w-3" />
                Brief received
              </div>
            </Reveal>

            <h1 className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-tight">
              <motion.span
                className="block"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                Thank you.
              </motion.span>
              <motion.span
                className="block"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                I'll be in touch <em className="text-accent not-italic font-normal">within 24 hours</em>.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-lg lg:text-xl leading-relaxed text-muted-foreground max-w-2xl"
            >
              Your answers help me understand the shape of the project before we talk. I read
              every brief personally and will follow up with next steps soon.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16 border-t border-border pt-10"
            >
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">
                Want to talk sooner?
              </div>
              {calendlyUrl ? (
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="site-button site-button-primary"
                >
                  Book a meeting
                  <span aria-hidden>→</span>
                </a>
              ) : (
                <p className="text-sm text-muted-foreground max-w-md">
                  A scheduling link will be available here shortly. In the meantime, feel free
                  to reach out via the contact details below.
                </p>
              )}
            </motion.div>

            <div className="mt-16">
              <Link
                href="/"
                className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
