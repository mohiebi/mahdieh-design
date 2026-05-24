import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthShell({ eyebrow, title, subtitle, children, footer }: Props) {
  return (
    <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-40 px-6 lg:px-12 grain overflow-hidden">
      <div className="relative max-w-[640px] mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-10 text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">
            <span className="h-px w-10 bg-foreground inline-block" />
            {eyebrow}
          </div>
        </Reveal>

        <h1 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.05] tracking-tight">
          <motion.span
            className="block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.span>
        </h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-lg text-muted-foreground max-w-xl"
          >
            {subtitle}
          </motion.p>
        )}

        <div className="mt-12 border-t border-border pt-10">{children}</div>

        {footer && (
          <div className="mt-10 text-sm text-muted-foreground font-mono uppercase tracking-[0.2em]">
            {footer}
          </div>
        )}

        <div className="mt-16">
          <Link
            to="/"
            className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back home
          </Link>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
};

export function AuthField({
  id, label, type = "text", value, onChange, placeholder, autoComplete, required,
}: FieldProps) {
  return (
    <div className="mb-8">
      <label
        htmlFor={id}
        className="block text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-border focus:border-foreground outline-none font-display text-2xl pb-3 transition-colors placeholder:text-muted-foreground/40"
      />
    </div>
  );
}

export function AuthSubmit({ label, loading }: { label: string; loading?: boolean }) {
  return (
    <motion.button
      type="submit"
      disabled={loading}
      whileHover={{ scale: loading ? 1 : 1.04 }}
      whileTap={{ scale: loading ? 1 : 0.97 }}
      className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-5 py-2.5 font-display text-sm hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50"
    >
      {loading ? "Please wait…" : label}
      <span aria-hidden>→</span>
    </motion.button>
  );
}
