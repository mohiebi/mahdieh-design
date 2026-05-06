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
          {["Brands that ", "identities that "].map((line, idx) => (
            <motion.span
              key={idx}
              className="block overflow-hidden"
            >
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.15 + idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                {idx === 0 ? (
                  <>
                    {line}
                    <em className="text-accent not-italic font-normal">think</em>,
                  </>
                ) : (
                  <>
                    {line}
                    <em className="italic">resonate</em>.
                  </>
                )}
              </motion.span>
            </motion.span>
          ))}
        </h1>

        <div className="mt-16 grid lg:grid-cols-12 gap-10 items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 lg:col-start-7 text-lg lg:text-xl leading-relaxed text-muted-foreground"
          >
            I'm <span className="text-foreground">Mahdieh Baghoolizadeh</span> — a brand strategist,
            visual identity designer and art director. Founder of{" "}
            <a href="https://nexainc.co" className="underline decoration-accent decoration-2 underline-offset-4 text-foreground">Nexa Studio</a>,
            collaborating with clients across Canada, the UK and the Middle East.
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
