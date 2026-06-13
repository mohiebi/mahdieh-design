import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { Footer } from '@/components/components/Contact';
import { Nav } from '@/components/components/Nav';

type Props = {
  redirect?: string;
  locale?: 'en' | 'fa';
};

export default function Register({ redirect = '', locale = 'en' }: Props) {
  const isFa = locale === 'fa';
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

  if (isFa) {
    const fields: [keyof typeof data, string, string, string][] = [
      ['name', 'نام', 'text', 'rtl'],
      ['email', 'ایمیل', 'email', 'ltr'],
      ['password', 'رمز عبور', 'password', 'ltr'],
      ['password_confirmation', 'تکرار رمز عبور', 'password', 'ltr'],
    ];

    return (
      <div dir="rtl" lang="fa" className="lang-fa min-h-screen bg-background text-foreground">
        <Head title="ساخت حساب کاربری">
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Nav locale="fa" />
        <main className="px-6 lg:px-12 pt-32 pb-24 lg:pt-44">
          <section className="max-w-[760px] mx-auto">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6">
              بریف پروژه
            </div>
            <h1 className="font-display text-6xl md:text-8xl leading-[0.9] mb-10">
              شروع با دسترسی<span className="text-accent">.</span>
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
                  قبلاً حساب دارید؟{' '}
                  <Link href={`/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`} className="text-foreground underline">
                    ورود
                  </Link>
                </p>
                <button
                  disabled={processing}
                  className="site-button site-button-primary cursor-pointer"
                >
                  ادامه
                </button>
              </div>
            </form>
          </section>
        </main>
        <Footer locale="fa" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head title="Start a brief" />
      <Nav />
      <main className="px-6 lg:px-12 pt-32 pb-24 lg:pt-44">
        <section className="max-w-[760px] mx-auto">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6">
            Project brief
          </div>
          <h1 className="font-display text-6xl md:text-8xl leading-[0.9] mb-10">
            Start with access<span className="text-accent">.</span>
          </h1>

          <form onSubmit={submit} className="border-t border-border pt-10 space-y-8">
            {[
              ['name', 'Name', 'text'],
              ['email', 'Email', 'email'],
              ['password', 'Password', 'password'],
              ['password_confirmation', 'Confirm password', 'password'],
            ].map(([key, label, type]) => (
              <label key={key} className="block">
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
                <input
                  type={type}
                  value={data[key as keyof typeof data] as string}
                  onChange={(event) => setData(key as keyof typeof data, event.target.value)}
                  className="mt-3 w-full bg-transparent border-b border-border focus:border-foreground outline-none font-display text-2xl pb-4"
                />
                {errors[key as keyof typeof errors] && (
                  <span className="mt-2 block text-sm text-accent">{errors[key as keyof typeof errors]}</span>
                )}
              </label>
            ))}

            <div className="flex flex-wrap items-center justify-between gap-5">
              <p className="text-sm text-muted-foreground">
                Already have access?{' '}
                <Link href={`/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`} className="text-foreground underline">
                  Log in
                </Link>
              </p>
              <button
                disabled={processing}
                className="site-button site-button-primary cursor-pointer"
              >
                Continue
              </button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
