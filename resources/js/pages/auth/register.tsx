import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { Footer } from '@/components/components/Contact';
import { Nav } from '@/components/components/Nav';

type Props = {
  redirect?: string;
};

export default function Register({ redirect = '' }: Props) {
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
                className="bg-foreground text-background rounded-full px-6 py-3 font-display text-sm hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50"
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
