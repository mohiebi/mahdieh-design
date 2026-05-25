import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { Footer } from '@/components/components/Contact';
import { Nav } from '@/components/components/Nav';

type Props = {
  redirect?: string;
};

export default function Login({ redirect = '' }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
    redirect,
  });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    post('/login');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head title="Login" />
      <Nav />
      <main className="px-6 lg:px-12 pt-32 pb-24 lg:pt-44">
        <section className="max-w-[760px] mx-auto">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6">
            Client access
          </div>
          <h1 className="font-display text-6xl md:text-8xl leading-[0.9] mb-10">
            Welcome back<span className="text-accent">.</span>
          </h1>

          <form onSubmit={submit} className="border-t border-border pt-10 space-y-8">
            <label className="block">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Email</span>
              <input
                type="email"
                value={data.email}
                onChange={(event) => setData('email', event.target.value)}
                className="mt-3 w-full bg-transparent border-b border-border focus:border-foreground outline-none font-display text-2xl pb-4"
              />
              {errors.email && <span className="mt-2 block text-sm text-accent">{errors.email}</span>}
            </label>

            <label className="block">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Password</span>
              <input
                type="password"
                value={data.password}
                onChange={(event) => setData('password', event.target.value)}
                className="mt-3 w-full bg-transparent border-b border-border focus:border-foreground outline-none font-display text-2xl pb-4"
              />
              {errors.password && <span className="mt-2 block text-sm text-accent">{errors.password}</span>}
            </label>

            <div className="flex flex-wrap items-center justify-between gap-5">
              <label className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                <input
                  type="checkbox"
                  checked={data.remember}
                  onChange={(event) => setData('remember', event.target.checked)}
                />
                Remember me
              </label>
              <button
                disabled={processing}
                className="bg-foreground text-background rounded-full px-6 py-3 font-display text-sm hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50"
              >
                Log in
              </button>
            </div>

            <p className="text-sm text-muted-foreground">
              New here?{' '}
              <Link href={`/register${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`} className="text-foreground underline">
                Create an account
              </Link>
            </p>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
