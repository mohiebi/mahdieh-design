import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePage } from "@inertiajs/react";
import { useRef } from "react";
import { localizedPath, siteCopy, type Locale } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import type { SharedPageProps } from "@/types/global";

type Step = {
  n: string;
  title: string;
  items: string[];
  phase?: string;
};

type ProcessProps = {
  locale?: Locale;
};

const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function Process({ locale = "en" }: ProcessProps) {
  const { auth } = usePage<SharedPageProps>().props;
  const session = auth.user;
  const t = siteCopy[locale].process;
  const steps: Step[] = t.steps.map(([n, phase, title, items]) => ({ n, phase, title, items }));
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.6"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="px-6 lg:px-12 py-24 lg:py-32 grain overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">
            {t.eyebrow}
          </div>
          <h1 className="font-display text-[clamp(3rem,9vw,9rem)] leading-[0.95] max-w-5xl">
            {t.title}<span className="text-accent">.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.intro}
          </p>
        </Reveal>

        <div ref={containerRef} className="relative mt-24 lg:mt-32">
          <div
            aria-hidden
            className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-border lg:-translate-x-1/2"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: lineScale }}
            className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-accent lg:-translate-x-1/2 origin-top"
          />

          <ol className="space-y-16 lg:space-y-24">
            {steps.map((step, i) => (
              <li key={step.n} className="relative">
                {step.phase && (
                  <Reveal
                    y={16}
                    className="relative mb-10 pl-20 lg:pl-0 lg:mb-16 lg:flex lg:justify-center"
                  >
                    <span className="inline-block font-mono text-[11px] uppercase tracking-[0.3em] text-accent border border-accent/30 rounded-full px-4 py-2 bg-background">
                      {step.phase}
                    </span>
                  </Reveal>
                )}

                <div className="relative grid grid-cols-1 lg:grid-cols-2 lg:gap-x-16 items-start">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5, ease: easeOut }}
                    className="absolute left-6 lg:left-1/2 top-0 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-background font-mono text-xs tracking-[0.1em]"
                  >
                    {step.n}
                  </motion.div>

                  <span
                    aria-hidden
                    className={`hidden lg:block absolute top-6 h-px w-8 bg-border ${i % 2 === 0 ? "right-1/2" : "left-1/2"}`}
                  />

                  <motion.div
                    initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: easeOut }}
                    className={`ml-20 lg:ml-0 lg:w-full lg:max-w-md rounded-lg border border-border p-6 lg:p-8 transition-colors hover:border-accent/60 ${
                      i % 2 === 0 ? "lg:col-start-1 lg:justify-self-end" : "lg:col-start-2 lg:justify-self-start"
                    }`}
                  >
                    <h2 className="font-display text-2xl md:text-3xl mb-4">{step.title}</h2>
                    <ul className="space-y-2 text-sm md:text-base leading-relaxed text-muted-foreground">
                      {step.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="mt-24 lg:mt-32 border-t border-border pt-16 text-center">
          <h2 className="font-display text-4xl md:text-6xl mb-6">
            {t.readyTitle}<span className="text-accent">?</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            {t.readyText}
          </p>
          {session ? (
            <Link to={localizedPath("/brief", locale)} className="site-button site-button-primary">
              {t.startBrief}
            </Link>
          ) : (
            <Link to="/register" search={{ redirect: localizedPath("/brief", locale) }} className="site-button site-button-primary">
              {t.startBrief}
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}
