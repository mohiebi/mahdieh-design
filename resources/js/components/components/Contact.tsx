import { motion, useReducedMotion } from "framer-motion";
import { usePage } from "@inertiajs/react";
import { Calendar, Instagram, Linkedin, Send } from "lucide-react";
import { Reveal } from "./Reveal";
import contactBg from "@/assets/contact-bg.png";
import type { SharedPageProps } from "@/types/global";

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
    </svg>
  );
}

function BehanceIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M8.37 11.08c.95-.27 1.62-1.12 1.62-2.16 0-1.74-1.34-2.7-3.28-2.7H2.5v11.56h4.39c2.23 0 3.69-1.09 3.69-3.05 0-1.43-.86-2.46-2.21-2.79v-.86ZM4.76 8.11h1.62c.86 0 1.34.4 1.34 1.14 0 .78-.53 1.2-1.42 1.2H4.76V8.11Zm0 4.12h1.87c1.03 0 1.62.48 1.62 1.35 0 .88-.59 1.36-1.64 1.36H4.76v-2.71ZM13.25 7.07h5.2V5.78h-5.2v1.29Zm2.75 2.28c-2.61 0-4.32 1.84-4.32 4.36 0 2.61 1.68 4.29 4.39 4.29 2.07 0 3.47-.94 4.03-2.62h-2.12c-.31.59-.91.88-1.85.88-1.24 0-2.02-.7-2.15-1.94h6.28c.03-.2.05-.47.05-.73 0-2.56-1.66-4.24-4.31-4.24Zm-.03 1.72c1.1 0 1.84.65 1.98 1.79h-3.94c.18-1.12.91-1.79 1.96-1.79Z" />
    </svg>
  );
}

const headingLine = {
  hidden: { y: "110%" },
  visible: { y: 0 },
};

const links = [
  { label: "LinkedIn", handle: "mahdiehdesign", href: "https://linkedin.com/in/mahdiehdesign", icon: Linkedin },
  { label: "Behance", handle: "mahdiehdesign", href: "https://behance.net/mahdiehdesign", icon: BehanceIcon },
  { label: "Instagram", handle: "mahhdiehh", href: "https://instagram.com/mahhdiehh", icon: Instagram },
  { label: "Telegram", handle: "mahdiehdesign", href: "https://t.me/mahdiehdesign", icon: Send },
];

export function Contact() {
  const reduceMotion = useReducedMotion();
  const { calendlyUrl, contactEmail } = usePage<SharedPageProps>().props;

  return (
    <section
      id="contact"
      className="relative px-6 lg:px-12 py-24 lg:py-40 grain overflow-hidden text-white isolate"
    >
      <motion.img
        src={contactBg}
        alt=""
        aria-hidden
        initial={{ scale: 1.15, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      <div className="relative max-w-[1400px] mx-auto">
        <Reveal>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] opacity-70 mb-6">
            <SparkleIcon className="h-3 w-3" />
            Let's collaborate
          </div>
        </Reveal>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="font-display text-[clamp(2rem,7vw,7rem)] leading-[1.02] tracking-tight"
        >
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span
              className="block"
              variants={headingLine}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              Have a brand
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span
              className="block"
              variants={headingLine}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              worth building?
            </motion.span>
          </span>
        </motion.h2>

        <Reveal delay={0.2} className="mt-12 lg:mt-16 flex flex-wrap items-center gap-4 sm:gap-6">
          <motion.a
            href={`mailto:${contactEmail}`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="site-button site-button-primary"
          >
            {contactEmail}
            <motion.span
              aria-hidden
              animate={reduceMotion ? {} : { x: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </motion.a>

          {calendlyUrl && (
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noreferrer"
              className="site-button site-button-outline"
            >
              <Calendar className="h-4 w-4" aria-hidden />
              Book a call
            </a>
          )}

          <span className="font-mono text-xs uppercase tracking-[0.25em] opacity-70">
            Avg. reply within 24h
          </span>
        </Reveal>

        <div className="mt-20 lg:mt-28">
          <div className="flex items-center justify-between border-b border-white/15 pb-4 text-[10px] font-mono uppercase tracking-[0.28em] text-white/55">
            <span>Elsewhere</span>
            <span>04 - Channels</span>
          </div>

          {links.map(({ label, handle, href, icon: Icon }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${label}: @${handle} (opens in a new tab)`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group grid grid-cols-[minmax(0,1fr)_3rem] items-center gap-x-4 gap-y-3 border-b border-white/15 py-7 text-white transition-colors hover:bg-white/[0.055] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/45 md:grid-cols-[minmax(0,1fr)_auto_3.5rem] md:px-0 lg:py-8"
            >
              <span className="min-w-0 font-display text-2xl leading-none text-white transition-all duration-300 group-hover:text-accent sm:text-3xl md:text-[clamp(2.5rem,5vw,4rem)] md:group-hover:translate-x-2">
                {label}
              </span>
              <span className="col-start-1 text-sm font-semibold text-white/62 transition-colors group-hover:text-white md:col-start-auto md:justify-self-end md:pr-6">
                @{handle}
              </span>
              <span className="col-start-2 row-span-2 row-start-1 flex h-11 w-11 items-center justify-center justify-self-end rounded-full border border-white/20 text-white/70 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground group-hover:rotate-[-8deg] md:col-start-auto md:row-auto md:h-12 md:w-12">
                <Icon className="h-4 w-4" aria-hidden />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

type FooterProps = {
  locale?: "en" | "fa";
};

export function Footer({ locale = "en" }: FooterProps) {
  return (
    <footer className="px-6 lg:px-12 py-10 border-t border-border">
      <div className="max-w-[1400px] mx-auto flex flex-wrap items-center text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
        {locale === "fa" ? (
          <>
            <div>© {new Date().getFullYear()} مهدیه باغولی‌زاده — تمامی حقوق محفوظ است</div>
            <div>نکسا استودیو · خلق · باش · الهام بگیر</div>
          </>
        ) : (
          <>
            <div>© {new Date().getFullYear()} Mahdieh Baghoolizadeh — All rights reserved</div>
          </>
        )}
      </div>
    </footer>
  );
}
