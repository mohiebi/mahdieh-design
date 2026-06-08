import { Link } from "@tanstack/react-router";
import { router, usePage } from "@inertiajs/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import logo from "@/assets/logo.svg";
import type { SharedPageProps } from "@/types/global";

const NAV_LINKS: { to?: string; href?: string; label: string }[] = [
  { to: "/projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { to: "/brief", label: "Brief" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const { auth } = usePage<SharedPageProps>().props;
  const session = auth.user;
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const renderLink = (link: (typeof NAV_LINKS)[number], className: string) =>
    link.to ? (
      <Link
        key={link.label}
        to={link.to}
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
        <Link to="/" aria-label="Mahdieh — Home" className="flex items-center">
          <img src={logo} alt="Mahdieh" className="h-6 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
          {NAV_LINKS.map((link) => renderLink(link, "hover:text-foreground transition-colors"))}
        </nav>
        <div className="flex items-center gap-3">
          {session ? (
            <button
              onClick={() => router.post("/logout")}
              className="hidden sm:inline-flex text-xs font-mono uppercase tracking-[0.2em] border border-foreground rounded-full px-4 py-2 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.85)] hover:shadow-[0_12px_30px_-6px_rgba(0,0,0,0.95)] hover:bg-foreground hover:text-background transition-all cursor-pointer"
            >
              Sign out
            </button>
          ) : (
            <Link
              to="/register"
              search={{ redirect: "/brief" }}
              className="hidden sm:inline-flex text-xs font-mono uppercase tracking-[0.2em] border border-foreground rounded-full px-4 py-2 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.85)] hover:shadow-[0_12px_30px_-6px_rgba(0,0,0,0.95)] hover:bg-foreground hover:text-background transition-all"
            >
              Start a brief
            </Link>
          )}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden flex items-center justify-center h-11 w-11 -mr-2 cursor-pointer"
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
            <div className="px-6 py-6 flex flex-col gap-6 text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground">
              {NAV_LINKS.map((link) => renderLink(link, "hover:text-foreground transition-colors py-1"))}
              {session ? (
                <button
                  onClick={() => {
                    setOpen(false);
                    router.post("/logout");
                  }}
                  className="text-left text-foreground cursor-pointer"
                >
                  Sign out
                </button>
              ) : (
                <Link
                  to="/register"
                  search={{ redirect: "/brief" }}
                  className="text-foreground"
                  onClick={() => setOpen(false)}
                >
                  Start a brief
                </Link>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
