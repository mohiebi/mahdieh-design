import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { Footer } from '@/components/components/Contact';
import { Nav } from '@/components/components/Nav';
import { pageClass, pageDir, siteCopy, type Locale } from '@/lib/i18n';

type Props = {
  redirect?: string;
  locale?: Locale;
};

export default function Register({ redirect = '', locale = 'en' }: Props) {
  const t = siteCopy[locale].auth;
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    redirect,
  });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    post('/register');
  };

  const fields: [keyof typeof data, string, string, string][] = [
    ['name', t.name, 'text', pageDir(locale)],
    ['email', t.email, 'email', 'ltr'],
    ['password', t.password, 'password', 'ltr'],
    ['password_confirmation', t.confirmPassword, 'password', 'ltr'],
  ];

  return (
    <div dir={pageDir(locale)} lang={locale} className={pageClass(locale)}>
      <Head title={t.registerTitle} />
      <Nav locale={locale} />
      <main className="px-6 lg:px-12 pt-32 pb-24 lg:pt-44">
        <section className="max-w-[760px] mx-auto">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6">
            {t.registerEyebrow}
          </div>
          <h1 className="font-display text-6xl md:text-8xl leading-[0.9] mb-10">
            {t.registerHeading}<span className="text-accent">.</span>
          </h1>

          <form onSubmit={submit} className="border-t border-border pt-10 space-y-8">
            {fields.map(([key, label, type, dir]) => (
              <label key={key} className="block">
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
                <input
                  type={type}
                  dir={dir}
                  value={data[key] as string}
                  onChange={(event) => setData(key, event.target.value)}
                  className="mt-3 w-full bg-transparent border-b border-border focus:border-foreground outline-none font-display text-2xl pb-4"
                />
                {errors[key as keyof typeof errors] && (
                  <span className="mt-2 block text-sm text-accent">{errors[key as keyof typeof errors]}</span>
                )}
              </label>
            ))}

            <div className="flex flex-wrap items-center justify-between gap-5">
              <p className="text-sm text-muted-foreground">
                {t.already}{' '}
                <Link href={`/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`} className="text-foreground underline">
                  {t.logIn}
                </Link>
              </p>
              <button
                disabled={processing}
                className="site-button site-button-primary cursor-pointer"
              >
                {t.continue}
              </button>
            </div>
          </form>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
