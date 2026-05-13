import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";

type Question = {
  id: string;
  label: string;
  hint?: string;
  type: "short" | "long" | "email";
  placeholder?: string;
};

// Placeholder questions — will be replaced with the user's 15 questions.
const QUESTIONS: Question[] = Array.from({ length: 15 }).map((_, i) => ({
  id: `q${i + 1}`,
  label: `Question ${i + 1}`,
  hint: "Placeholder — will be replaced with your real question.",
  type: i === 0 ? "short" : i === 1 ? "email" : "long",
  placeholder: "Your answer…",
}));

export function Brief() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const total = QUESTIONS.length;
  const current = QUESTIONS[step];
  const progress = useMemo(() => Math.round(((step + 1) / total) * 100), [step, total]);
  const value = answers[current?.id] ?? "";

  const isShort = current?.type === "short" || current?.type === "email";
  const isAnswered = value.trim().length > 0;
  const canProceed = !isShort || isAnswered;

  const next = () => {
    if (!canProceed) return;
    if (step < total - 1) setStep((s) => s + 1);
    else setSubmitted(true);
  };
  const prev = () => step > 0 && setStep((s) => s - 1);

  return (
    <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-40 px-6 lg:px-12 grain overflow-hidden">
      <div className="relative max-w-[1100px] mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-10 text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">
            <span className="h-px w-10 bg-foreground inline-block" />
            The Brief · 15 questions
          </div>
        </Reveal>

        <h1 className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-tight">
          <motion.span
            className="block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Tell me about
          </motion.span>
          <motion.span
            className="block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            your <em className="text-accent not-italic font-normal">project</em>.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-lg lg:text-xl leading-relaxed text-muted-foreground max-w-2xl"
        >
          A short, considered brief helps us shape ideas into clear, memorable, and quietly
          powerful visual systems. Take your time — there are no wrong answers.
        </motion.p>

        {/* Progress */}
        <div className="mt-16 flex items-center gap-6">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
          <div className="relative flex-1 h-px bg-border overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-foreground"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {progress}%
          </div>
        </div>

        {/* Card */}
        <div className="mt-10 border-t border-border pt-12 min-h-[360px]">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="text-xs font-mono uppercase tracking-[0.25em] text-accent mb-4">
                  ✦ Brief received
                </div>
                <h2 className="font-display text-4xl lg:text-6xl leading-[1.05] tracking-tight">
                  Thank you. I'll be in touch within 24 hours.
                </h2>
                <p className="mt-6 text-muted-foreground max-w-xl">
                  Your answers help me understand the shape of the project before we talk. I
                  read every brief personally.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">
                  Question {step + 1}
                </div>
                <label
                  htmlFor={current.id}
                  className="font-display text-3xl lg:text-5xl leading-[1.1] tracking-tight block"
                >
                  {current.label}
                </label>
                {current.hint && (
                  <p className="mt-3 text-sm text-muted-foreground">{current.hint}</p>
                )}

                <div className="mt-10">
                  {current.type === "long" ? (
                    <textarea
                      id={current.id}
                      value={value}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, [current.id]: e.target.value }))
                      }
                      placeholder={current.placeholder}
                      rows={5}
                      className="w-full bg-transparent border-b border-border focus:border-foreground outline-none font-display text-2xl lg:text-3xl pb-4 resize-none transition-colors placeholder:text-muted-foreground/50"
                    />
                  ) : (
                    <input
                      id={current.id}
                      type={current.type === "email" ? "email" : "text"}
                      value={value}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, [current.id]: e.target.value }))
                      }
                      placeholder={current.placeholder}
                      className="w-full bg-transparent border-b border-border focus:border-foreground outline-none font-display text-2xl lg:text-3xl pb-4 transition-colors placeholder:text-muted-foreground/50"
                    />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        {!submitted && (
          <div className="mt-14 flex flex-wrap items-center justify-between gap-6">
            <button
              onClick={prev}
              disabled={step === 0}
              className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ← Previous
            </button>

            <motion.button
              onClick={next}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-foreground text-background rounded-full px-8 py-5 font-display text-xl hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {step === total - 1 ? "Submit brief" : "Next question"}
              <motion.span
                aria-hidden
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
