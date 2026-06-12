import { Link, router, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import logo from '@/assets/logo.svg';
import type { SharedPageProps } from '@/types/global';

type Props = {
  eyebrow: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
};

const navItems = [
  ['Dashboard', '/admin'],
  ['Projects', '/admin/projects'],
  ['Brief Questions', '/admin/brief-questions'],
  ['Submissions', '/admin/brief-submissions'],
  ['View Site', '/'],
];

export function AdminLayout({ eyebrow, title, action, children }: Props) {
  const { flash } = usePage<SharedPageProps>().props;
  const pageUrl = usePage().url;

  return (
    <div className="min-h-screen bg-background text-foreground grain">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between gap-8">
          <Link href="/admin" className="flex items-center gap-4">
            <img src={logo} alt="Mahdieh" className="h-6 w-auto" />
            <span className="hidden sm:inline text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
              Admin
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-7 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            {navItems.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={pageUrl === href || pageUrl.startsWith(`${href}/`) ? 'text-foreground' : 'hover:text-foreground transition-colors'}
              >
                {label}
              </Link>
            ))}
          </nav>
          <button
            onClick={() => router.post('/logout')}
            className="text-[11px] font-mono uppercase tracking-[0.2em] border border-border rounded-full px-4 py-2 hover:bg-foreground hover:text-background transition-colors cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="px-6 lg:px-12 py-14 lg:py-20">
        <section className="max-w-[1400px] mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-8 mb-12 lg:mb-16">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-5">
                {eyebrow}
              </div>
              <h1 className="font-display text-5xl md:text-7xl leading-[0.95]">
                {title}<span className="text-accent">.</span>
              </h1>
            </div>
            {action}
          </div>

          {flash.success && (
            <div className="mb-8 border border-border px-5 py-4 text-sm text-foreground/90">
              {flash.success}
            </div>
          )}

          {children}
        </section>
      </main>
    </div>
  );
}

export function AdminButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center border border-foreground rounded-full px-5 py-2.5 text-[11px] font-mono uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition-colors"
    >
      {children}
    </Link>
  );
}

export const adminInputClass =
  'mt-3 w-full bg-transparent border-b border-border focus:border-foreground outline-none font-display text-2xl pb-3 placeholder:text-muted-foreground/50';

export const adminSmallInputClass =
  'mt-3 w-full bg-transparent border border-border focus:border-foreground outline-none text-sm px-4 py-3 placeholder:text-muted-foreground/50';
