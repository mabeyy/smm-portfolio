import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import SectionLabel from "@/components/SectionLabel";
import {
  resultsBrands,
  viewsResults,
  type ResultsBrand,
  type ViewsCurve,
} from "@/data/results";

const ease = [0.22, 1, 0.36, 1] as const;

const fmt = (n: number) => n.toLocaleString("en-US");

const multiplier = (c?: ViewsCurve) =>
  c?.marker.typical ? Math.round(c.marker.post / c.marker.typical) : null;

/* ---------- number that counts up when it comes into view ---------- */
function CountUp({ value, format }: { value: number; format: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // only shrink the viewport vertically, so numbers at the screen edge still count
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => format(Math.round(v)));

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      mv.set(value);
      return;
    }
    const controls = animate(mv, value, { duration: 1.4, ease });
    return () => controls.stop();
  }, [inView, value, mv, reduce]);

  return <motion.span ref={ref}>{text}</motion.span>;
}

export default function Results() {
  const [brand, setBrand] = useState<ResultsBrand>("nailkada");
  const results = viewsResults
    .filter((r) => r.brand === brand)
    .sort((a, b) => b.views - a.views);

  const total = results.reduce((s, r) => s + r.views, 0);
  const top = results[0].views;
  const best = Math.max(...results.map((r) => multiplier(r.curve) ?? 0));
  const withAudience = results.filter((r) => r.followers);
  const reach = withAudience.reduce((s, r) => s + r.followers![1], 0);
  const audience = withAudience.reduce((s, r) => s + r.followers![0] + r.followers![1], 0);

  const facts = [
    {
      value: total,
      format: fmt,
      unit: "views",
      text: `from just ${results.length} posts.`,
    },
    best > 0 && {
      value: best,
      format: (n: number) => `${n}×`,
      unit: "more views",
      text: "on my best post than on the page's normal posts.",
    },
    audience > 0 && {
      value: Math.round((reach / audience) * 100),
      format: (n: number) => `${n}%`,
      unit: "new people",
      text: "— most viewers didn't follow the page before.",
    },
  ].filter((f) => !!f);

  return (
    <section id="results" className="scroll-mt-16 py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel id="results" />
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.05, ease }}
              className="mt-5 font-display text-[clamp(2.75rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.02em]"
            >
              Work that <span className="italic text-brand">travelled.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.12, ease }}
              className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground"
            >
              Real results from posts I made — no paid ads.
            </motion.p>
          </div>

          <div role="tablist" aria-label="Brand" className="grid grid-cols-2 sm:flex sm:items-center sm:gap-7 border-b border-border-strong sm:border-0">
            {resultsBrands.map((b) => {
              const isActive = brand === b.value;
              return (
                <button
                  key={b.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setBrand(b.value)}
                  className={cn(
                    "relative pb-2.5 sm:pb-2 font-display text-xl sm:text-2xl md:text-3xl outline-none transition-colors duration-300",
                    isActive ? "italic text-foreground" : "text-muted-soft hover:text-muted-foreground"
                  )}
                >
                  {b.label}
                  {isActive && (
                    <motion.span
                      layoutId="resultsTab"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-x-0 -bottom-px h-px bg-foreground"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={brand}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease }}
            className="mt-6 sm:mt-10 md:mt-14 grid lg:grid-cols-12 gap-10 lg:gap-16"
          >
            {/* the three facts, in plain words */}
            <ul className="lg:col-span-5 grid grid-cols-2 lg:flex lg:flex-col sm:border-t sm:border-border-strong">
              {facts.map((f, i) => (
                <li
                  key={f.unit}
                  className={cn(
                    "border-b border-border-strong py-5 md:py-7 lg:py-0 lg:flex-1 lg:flex lg:flex-col lg:justify-center max-sm:first:pt-2",
                    i === 0 ? "col-span-2 max-sm:text-center" : "max-lg:pr-3",
                    i === 2 && "max-lg:border-l max-lg:border-border max-lg:pl-4 max-lg:pr-0"
                  )}
                >
                  <p
                    className={cn(
                      "font-display leading-none tracking-tight tabular-nums text-foreground",
                      i === 0 ? "whitespace-nowrap text-[2.75rem] sm:text-[clamp(2.5rem,4.5vw,3.75rem)] lg:text-[2.75rem]" : "text-[2rem] sm:text-[clamp(2.5rem,4.5vw,3.75rem)] lg:text-[2.75rem]"
                    )}
                  >
                    <CountUp value={f.value} format={f.format} />{" "}
                    <span className={cn("italic text-brand text-[0.55em]", i !== 0 && "max-sm:hidden")}>
                      {f.unit}
                    </span>
                  </p>
                  <p className="mt-2 lg:mt-1.5 text-sm sm:text-base lg:text-sm leading-snug text-muted-foreground">
                    {i !== 0 && <span className="sm:hidden text-foreground">{f.unit} </span>}
                    {f.text}
                  </p>
                </li>
              ))}
            </ul>

            {/* top posts as simple bars */}
            <div className="lg:col-span-7">
              <p className="text-sm sm:text-base text-foreground">
                Top {results.length} posts
                <span className="text-muted-foreground"> — longer bar, more views</span>
              </p>
              <ul className="mt-4 sm:mt-6 space-y-3.5 sm:space-y-5">
                {results.map((r, i) => {
                  const pct = Math.max((r.views / top) * 100, 2);
                  return (
                    <li key={r.id}>
                      <div className="flex items-baseline justify-between gap-4 text-sm">
                        <span className="text-muted-foreground">
                          <span className="font-mono text-[11px] text-muted-soft mr-2">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {r.format}
                        </span>
                        <span className="font-medium tabular-nums text-foreground">
                          {fmt(r.views)}<span className="max-sm:hidden"> views</span>
                        </span>
                      </div>
                      <div className="mt-1.5 sm:mt-2 h-2 sm:h-3 rounded-full bg-paper overflow-hidden">
                        <motion.div
                          className={cn("h-full rounded-full", i === 0 ? "bg-brand" : "bg-brand/45")}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true, margin: "-40px 0px" }}
                          transition={{ duration: 1, delay: 0.1 + i * 0.08, ease }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-6 sm:mt-8 text-xs text-muted-foreground">
                Numbers from Meta Business Suite (Facebook &amp; Instagram insights).
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
