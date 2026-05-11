import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export function Hero() {
  const stats: [string, string][] = [
    ["07+", "Years of practice"],
    ["80+", "Brands shaped"],
    ["3", "Continents"],
    ["7", "Studio collaborations"],
  ];

  return (
    <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 px-6 lg:px-12 grain overflow-hidden">
      <div className="relative max-w-[1400px] mx-auto">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="flex items-center gap-3 mb-10 text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
            className="h-px w-10 bg-foreground inline-block"
          />
          Available for select projects · 2026
        </motion.div>

        <h1 className="font-display text-[clamp(2.5rem,9vw,9rem)] leading-[0.95] tracking-tight">
          <motion.span className="text-xs font-mono uppercase tracking-[0.25em] opacity-70 mb-6 text-slate-50 block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <em className="text-accent not-italic font-normal">Mahdieh</em>
            </motion.span>
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-2xl lg:text-4xl leading-tight max-w-3xl"
        >
          Designing brands with clarity, character, and cultural depth
        </motion.p>

        <div className="mt-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg lg:text-xl leading-relaxed text-muted-foreground md:columns-2 md:gap-12 [&>span]:text-foreground"
          >
            I'm <span className="text-foreground">Mahdieh Baghoolizadeh</span> — a brand strategist
            and visual identity designer working with international studios and clients across
            Canada, the UK and the Middle East. I help ambitious teams turn ideas into clear,
            memorable, and quietly powerful visual systems.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-10"
        >
          {stats.map(([k, v], i) => (
            <motion.div key={v} custom={i} variants={fadeUp}>
              <div className="font-display text-4xl lg:text-5xl">{k}</div>
              <div className="mt-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">{v}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
