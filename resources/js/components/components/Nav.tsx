import { Link } from "@tanstack/react-router";
import { router, usePage } from "@inertiajs/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import logo from "@/assets/logo.svg";
import {
  localeLabels,
  localeNames,
  localizedPath,
  publicLocales,
  siteCopy,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n";
import type { SharedPageProps } from "@/types/global";

type NavLink = { to?: string; href?: string; label: string; search?: Record<string, string> };

type NavProps = {
  locale?: Locale;
};

export function Nav({ locale = "en" }: NavProps) {
  const page = usePage<SharedPageProps>();
  const { auth } = page.props;
  const session = auth.user;
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const t = siteCopy[locale].nav;
  const briefRedirect = localizedPath("/brief", locale);

  const briefLink: NavLink = session
    ? { to: briefRedirect, label: t.brief }
    : { to: "/register", label: t.brief, search: { redirect: briefRedirect } };

  const links: NavLink[] = [
    { to: localizedPath("/projects", locale), label: t.projects },
    { to: localizedPath("/services", locale), label: t.services },
    { href: localizedPath("/#about", locale), label: t.about },
    { to: localizedPath("/process", locale), label: t.process },
    briefLink,
    { href: localizedPath("/#contact", locale), label: t.contact },
  ];

  const showLanguageSwitcher = locale !== "fa";
  const languageLinks = publicLocales.map((item) => ({
    locale: item,
    href: switchLocalePath(page.url, item),
  }));

  const renderLink = (link: NavLink, className: string) =>
    link.to ? (
      <Link
        key={link.label}
        to={link.to}
        search={link.search}
        className={className}
        activeProps={{ className: "text-foreground" }}
        onClick={() => setOpen(false)}
      >
        {link.label}
      </Link>
    ) : (
      <a key={link.label} href={link.href} className={className} onClick={() => setOpen(false)}>
        {link.label}
      </a>
    );

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link to={localizedPath("/", locale)} aria-label={t.homeLabel} className="flex items-center">
          <img src={logo} alt="Mahdieh" className="h-6 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-display text-muted-foreground">
          {links.map((link) => renderLink(link, "hover:text-foreground transition-colors"))}
        </nav>
        <div className="flex items-center gap-3">
          {showLanguageSwitcher && (
            <div className="hidden items-center gap-1 rounded-lg border border-border/70 px-1 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground sm:flex">
              <span className="sr-only">{t.language}</span>
              {languageLinks.map((item) => (
                <a
                  key={item.locale}
                  href={item.href}
                  hrefLang={item.locale}
                  aria-label={localeNames[item.locale]}
                  className={`rounded-md px-2 py-1 transition-colors ${
                    item.locale === locale ? "bg-foreground text-background" : "hover:bg-foreground/10 hover:text-foreground"
                  }`}
                >
                  {localeLabels[item.locale]}
                </a>
              ))}
            </div>
          )}

          {session ? (
            <>
              {session.is_admin ? (
                <Link
                  to="/admin"
                  className="hidden sm:inline-flex whitespace-nowrap text-sm font-display text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.hi(session.name)}
                </Link>
              ) : (
                <span className="hidden sm:inline-flex whitespace-nowrap text-sm font-display text-muted-foreground">
                  {t.hi(session.name)}
                </span>
              )}
              <button
                onClick={() => router.post("/logout")}
                className="site-button site-button-outline hidden sm:inline-flex cursor-pointer"
              >
                {t.signOut}
              </button>
            </>
          ) : (
            <Link
              to="/register"
              search={{ redirect: briefRedirect }}
              className="site-button site-button-outline hidden sm:inline-flex"
            >
              {t.startBrief}
            </Link>
          )}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.closeMenu : t.openMenu}
            className="site-icon-button -mr-2 flex h-11 w-11 cursor-pointer hover:bg-foreground/10 md:hidden"
          >
            <span className="relative block h-4 w-6" aria-hidden>
              <motion.span
                className="absolute left-0 top-0 h-px w-6 bg-foreground"
                animate={open ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.25 }}
              />
              <motion.span
                className="absolute left-0 bottom-0 h-px w-6 bg-foreground"
                animate={open ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.25 }}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-border/50 bg-background/95"
          >
            <div className="px-6 py-6 flex flex-col gap-6 text-sm font-display text-muted-foreground">
              {links.map((link) => renderLink(link, "hover:text-foreground transition-colors py-1"))}
              {showLanguageSwitcher && (
                <div className="flex items-center gap-2 border-y border-border/60 py-4 text-[11px] font-mono uppercase tracking-[0.16em]">
                  {languageLinks.map((item) => (
                    <a
                      key={item.locale}
                      href={item.href}
                      hrefLang={item.locale}
                      aria-label={localeNames[item.locale]}
                      onClick={() => setOpen(false)}
                      className={`rounded-md px-2 py-1 transition-colors ${
                        item.locale === locale ? "bg-foreground text-background" : "hover:bg-foreground/10 hover:text-foreground"
                      }`}
                    >
                      {localeLabels[item.locale]}
                    </a>
                  ))}
                </div>
              )}

              {session ? (
                <>
                  {session.is_admin ? (
                    <Link to="/admin" onClick={() => setOpen(false)} className="text-foreground hover:text-accent transition-colors">
                      {t.hi(session.name)}
                    </Link>
                  ) : (
                    <span className="text-foreground">{t.hi(session.name)}</span>
                  )}
                  <button
                    onClick={() => {
                      setOpen(false);
                      router.post("/logout");
                    }}
                    className="site-button site-button-outline justify-start text-left text-foreground cursor-pointer"
                  >
                    {t.signOut}
                  </button>
                </>
              ) : (
                <Link
                  to="/register"
                  search={{ redirect: briefRedirect }}
                  className="site-button site-button-outline justify-start text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {t.startBrief}
                </Link>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
