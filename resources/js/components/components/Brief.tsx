import { useMemo, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import type { SharedPageProps } from "@/types/global";

type Question = {
  id: string;
  label: string;
  hint?: string | null;
  type: "short" | "long" | "email";
  placeholder?: string | null;
  required?: boolean;
};

const QUESTIONS: Question[] = Array.from({ length: 15 }).map((_, i) => ({
  id: `q${i + 1}`,
  label: `Question ${i + 1}`,
  hint: "Placeholder - will be replaced with your real question.",
  type: i === 0 ? "short" : i === 1 ? "email" : "long",
  placeholder: "Your answer...",
  required: true,
}));

type BriefProps = {
  questions?: Question[];
};

export function Brief({ questions = QUESTIONS }: BriefProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);
  const { errors } = usePage<SharedPageProps>().props;
  const reduceMotion = useReducedMotion();

  const total = questions.length;
  const isReviewStep = step === total;
  const current = questions[step];
  const progress = useMemo(
    () => (isReviewStep ? 100 : Math.round(((step + 1) / total) * 100)),
    [step, total, isReviewStep],
  );
  const value = answers[current?.id ?? ""] ?? "";

  const isAnswered = value.trim().length > 0;
  const canProceed = !current?.required || isAnswered;
  const currentError = current ? errors[`answers.${current.id}`] : undefined;

  const next = () => {
    if (processing) return;

    if (isReviewStep) {
      setProcessing(true);
      router.post(
        "/brief",
        { answers },
        {
          preserveScroll: true,
          preserveState: true,
          onError: (formErrors) => {
            const erroredKey = Object.keys(formErrors).find((key) => key.startsWith("answers."));
            if (erroredKey) {
              const questionId = erroredKey.slice("answers.".length);
              const index = questions.findIndex((q) => q.id === questionId);
              if (index !== -1) setStep(index);
            }
          },
          onFinish: () => setProcessing(false),
        },
      );
      return;
    }

    if (!canProceed) return;
    setStep((s) => s + 1);
  };
  const prev = () => step > 0 && setStep((s) => s - 1);

  if (total === 0) {
    return (
      <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-40 px-6 lg:px-12 grain overflow-hidden">
        <div className="relative max-w-[1100px] mx-auto">
          <h1 className="font-display text-5xl lg:text-7xl leading-[0.95] tracking-tight">
            Brief questions are coming soon.
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-40 px-6 lg:px-12 grain overflow-hidden">
      <div className="relative max-w-[1100px] mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 mb-10 text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">
            <span className="h-px w-10 bg-foreground inline-block" />
            The Brief · {total} questions
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

        <div className="mt-16 flex items-center gap-6">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {isReviewStep ? "Review" : `${String(step + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
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

        <div className="mt-10 border-t border-border pt-12 min-h-[420px]">
          <AnimatePresence mode="wait">
            {isReviewStep ? (
              <motion.div
                key="review"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">
                  Final check
                </div>
                <h2 className="font-display text-3xl lg:text-5xl leading-[1.1] tracking-tight">
                  Review your answers.
                </h2>
                <p className="mt-3 text-sm text-muted-foreground max-w-xl">
                  Make sure everything looks right before sending. You can edit any answer
                  below.
                </p>

                <div className="mt-10 space-y-6">
                  {questions.map((q, i) => {
                    const answerValue = (answers[q.id] ?? "").trim();
                    const fieldError = errors[`answers.${q.id}`];

                    return (
                      <div key={q.id} className="flex items-start justify-between gap-6 border-b border-border pb-5">
                        <div className="min-w-0">
                          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">
                            {String(i + 1).padStart(2, "0")} · {q.label}
                          </div>
                          <div className={`text-lg leading-relaxed break-words ${answerValue ? "text-foreground" : "text-muted-foreground italic"}`}>
                            {answerValue || "No answer provided"}
                          </div>
                          {fieldError && (
                            <p className="mt-2 text-sm text-accent" role="alert">
                              {fieldError}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => setStep(i)}
                          className="shrink-0 text-[11px] font-mono uppercase tracking-[0.25em] underline underline-offset-4 hover:text-accent transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>
                    );
                  })}
                </div>
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
                      placeholder={current.placeholder ?? undefined}
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
                      placeholder={current.placeholder ?? undefined}
                      className="w-full bg-transparent border-b border-border focus:border-foreground outline-none font-display text-2xl lg:text-3xl pb-4 transition-colors placeholder:text-muted-foreground/50"
                    />
                  )}
                </div>
                {currentError && (
                  <p className="mt-3 text-sm text-accent" role="alert">
                    {currentError}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
            disabled={(!isReviewStep && !canProceed) || processing}
            whileHover={canProceed || isReviewStep ? { scale: 1.04 } : {}}
            whileTap={canProceed || isReviewStep ? { scale: 0.97 } : {}}
            className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-5 py-2.5 font-display text-sm hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isReviewStep
              ? processing
                ? "Submitting"
                : "Submit brief"
              : step === total - 1
                ? "Review answers"
                : "Next question"}
            <motion.span
              aria-hidden
              animate={reduceMotion ? {} : { x: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </motion.button>
        </div>
        {!isReviewStep && !canProceed && (
          <p className="mt-3 text-xs text-muted-foreground font-mono">
            This question is required.
          </p>
        )}
      </div>
    </section>
  );
}
