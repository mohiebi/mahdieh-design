import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "./Reveal";

export type Recommendation = {
  id: number;
  name: string;
  role: string | null;
  company: string | null;
  quote: string;
  linkedin_url: string | null;
  avatar_path: string | null;
};

type Props = { recommendations: Recommendation[] };

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
const avatarStyle = { height: "3.5rem", width: "3.5rem", minWidth: "3.5rem" };

const slideVariants = {
  initial: (d: 1 | -1) => ({ opacity: 0, y: d > 0 ? 60 : -60 }),
  animate: { opacity: 1, y: 0 },
  exit: (d: 1 | -1) => ({ opacity: 0, y: d > 0 ? -60 : 60 }),
};

function Avatar({ name, avatarPath }: { name: string; avatarPath: string | null }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (avatarPath) {
    return (
      <img
        src={avatarPath}
        alt={name}
        style={avatarStyle}
        className="rounded-full object-cover border border-border flex-shrink-0"
      />
    );
  }

  return (
    <div
      style={avatarStyle}
      className="rounded-full border border-border flex items-center justify-center font-display text-base text-muted-foreground flex-shrink-0 select-none"
    >
      {initials}
    </div>
  );
}

function Card({ r }: { r: Recommendation }) {
  return (
    <blockquote className="border border-border p-10 lg:p-16">
      <div
        aria-hidden
        className="font-display text-7xl text-accent leading-none mb-8 select-none"
      >
        &ldquo;
      </div>
      <p className="font-display text-2xl lg:text-3xl leading-relaxed break-words">
        {r.quote}
      </p>
      <footer className="mt-10 pt-8 border-t border-border flex items-center gap-5">
        <Avatar name={r.name} avatarPath={r.avatar_path} />
        <div className="flex-1 min-w-0">
          <div className="font-display text-xl">{r.name}</div>
          {(r.role || r.company) && (
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mt-1.5">
              {[r.role, r.company].filter(Boolean).join(" · ")}
            </div>
          )}
        </div>
        {r.linkedin_url && (
          <a
            href={r.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${r.name} on LinkedIn`}
            className="site-icon-button text-muted-foreground hover:text-foreground flex-shrink-0"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        )}
      </footer>
    </blockquote>
  );
}

export function Testimonials({ recommendations }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const total = recommendations.length;

  if (!total) return null;

  const goNext = () => {
    setDirection(1);
    setCurrent((i) => (i + 1) % total);
  };
  const goPrev = () => {
    setDirection(-1);
    setCurrent((i) => (i - 1 + total) % total);
  };
  const goTo = (i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };

  return (
    <section id="recommendations" className="px-6 lg:px-12 py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">
            ✦ Recommendations
          </div>
          <h2 className="font-display text-5xl md:text-7xl mb-16 max-w-3xl">
            What clients say<span className="text-accent">.</span>
          </h2>
        </Reveal>

        {/* Vertical single-card carousel */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease }}
            >
              <Card r={recommendations[current]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          {/* Line indicators */}
          <div className="flex items-center gap-1.5">
            {recommendations.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to recommendation ${i + 1}`}
                className="py-3 cursor-pointer group"
              >
                <span
                  className={`block h-px transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-foreground"
                      : "w-4 bg-border group-hover:bg-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Prev / Next */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous recommendation"
              className="site-icon-button border border-border hover:border-foreground hover:bg-foreground hover:text-background cursor-pointer transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-4 w-4"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next recommendation"
              className="site-icon-button border border-border hover:border-foreground hover:bg-foreground hover:text-background cursor-pointer transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-4 w-4"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
