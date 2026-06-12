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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <text x="12" y="15.5" textAnchor="middle" fontSize="9" fontFamily="Georgia, serif" fill="currentColor" stroke="none">
        Be
      </text>
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
  { label: "Telegram", handle: "artdirector_mah", href: "https://t.me/artdirector_mah", icon: Send },
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
          className="font-display text-[clamp(3rem,11vw,11rem)] leading-[0.9] tracking-tight"
        >
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              variants={headingLine}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              Have a brand
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              variants={headingLine}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              worth <em className="text-accent not-italic">building?</em>
            </motion.span>
          </span>
        </motion.h2>

        <Reveal delay={0.2} className="mt-12 lg:mt-16 flex flex-wrap items-center gap-4 sm:gap-6">
          <motion.a
            href={`mailto:${contactEmail}`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-white text-black rounded-full px-5 py-2.5 font-display text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
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
              className="inline-flex items-center gap-2 border border-white/30 rounded-full px-5 py-2.5 font-display text-sm text-white hover:bg-white hover:text-black transition-colors backdrop-blur-sm"
            >
              <Calendar className="h-4 w-4" aria-hidden />
              Book a call
            </a>
          )}

          <span className="font-mono text-xs uppercase tracking-[0.25em] opacity-70">
            Avg. reply within 24h
          </span>
        </Reveal>

        <div className="mt-20 lg:mt-28 grid sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/15 bg-white/15">
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
              className="group flex items-center justify-between gap-4 bg-black/40 hover:bg-black/20 px-6 py-6 transition-colors"
            >
              <div className="min-w-0">
                <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/60">{label}</div>
                <div className="font-display text-xl mt-2 text-white truncate group-hover:text-accent transition-colors">
                  @{handle}
                </div>
              </div>
              <Icon
                className="h-5 w-5 shrink-0 text-white/40 group-hover:text-accent group-hover:translate-x-0.5 transition-all"
                aria-hidden
              />
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
      <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
        {locale === "fa" ? (
          <>
            <div>© {new Date().getFullYear()} مهدیه باغولی‌زاده — تمامی حقوق محفوظ است</div>
            <div>نکسا استودیو · خلق · باش · الهام بگیر</div>
          </>
        ) : (
          <>
            <div>© {new Date().getFullYear()} Mahdieh Baghoolizadeh — All rights reserved</div>
            <div>Nexa Studio · Create · Be · Inspire</div>
          </>
        )}
      </div>
    </footer>
  );
}
