import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import contactBg from "@/assets/contact-bg.png";

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
    </svg>
  );
}

export function Contact() {
  const reduceMotion = useReducedMotion();
  const links = [
    ["LinkedIn", "mahdiehdesign", "https://linkedin.com/in/mahdiehdesign"],
    ["Behance", "mahdiehdesign", "https://behance.net/mahdiehdesign"],
    ["Instagram", "mahhdiehh", "https://instagram.com/mahhdiehh"],
    ["Telegram", "artdirector_mah", "https://t.me/artdirector_mah"],
  ];
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
        <h2 className="font-display text-[clamp(3rem,11vw,11rem)] leading-[0.9] tracking-tight overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Have a brand
          </motion.span>
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            worth <em className="text-accent not-italic">building</em>?
          </motion.span>
        </h2>

        <Reveal delay={0.2} className="mt-16 flex flex-wrap items-center gap-6">
          <motion.a
            href="mailto:hello@nexainc.co"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-white text-black rounded-full px-5 py-2.5 font-display text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            hello@nexainc.co
            <motion.span
              aria-hidden
              animate={reduceMotion ? {} : { x: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </motion.a>
          <span className="font-mono text-xs uppercase tracking-[0.25em] opacity-70">
            Avg. reply within 24h
          </span>
        </Reveal>

        <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-background/20 pt-10">
          {links.map(([label, handle, href], i) => (
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
              className="group"
            >
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-white opacity-60">{label}</div>
              <div className="font-display text-2xl mt-2 text-white group-hover:text-accent transition-colors">@{handle} ↗</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="px-6 lg:px-12 py-10 border-t border-border">
      <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
        <div>© {new Date().getFullYear()} Mahdieh Baghoolizadeh — All rights reserved</div>
        <div>Nexa Studio · Create · Be · Inspire</div>
      </div>
    </footer>
  );
}
