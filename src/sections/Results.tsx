import { useRef, useState } from "react";
import type { PointerEvent } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { TrendingUp } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/helpers/motion";
import {
  resultsBrands,
  viewsResults,
  type ResultsBrand,
  type ViewsCurve,
  type ViewsResult,
} from "@/data/results";

const fmt = (n: number) => n.toLocaleString("en-US");

const compact = (n: number) =>
  n >= 1000
    ? `${(n / 1000).toFixed(n >= 100000 || n % 1000 === 0 ? 0 : 1).replace(/\.0$/, "")}K`
    : String(Math.round(n));

const interpolate = (pts: [number, number][], x: number) => {
  if (x <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    if (x <= x1) {
      const [x0, y0] = pts[i - 1];
      return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
    }
  }
  return pts[pts.length - 1][1];
};

const share = (part: number, [a, b]: [number, number]) =>
  `${Math.round((part / (a + b)) * 100)}%`;

const multiplier = (c?: ViewsCurve) =>
  c?.marker.typical ? Math.round(c.marker.post / c.marker.typical) : null;

function ViewsChart({ curve, format }: { curve: ViewsCurve; format: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hoverX, setHoverX] = useState<number | null>(null);

  const { x0, x1, yMax } = curve;
  const lastX = curve.post[curve.post.length - 1][0];
  const toX = (x: number) => ((x - x0) / (x1 - x0)) * 100;
  const toY = (v: number) => 100 - (v / yMax) * 100;
  const path = (pts: [number, number][]) =>
    pts.map(([x, v], i) => `${i ? "L" : "M"}${toX(x)},${toY(v)}`).join(" ");

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const frac = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    setHoverX(Math.min(x0 + frac * (x1 - x0), lastX));
  };

  const activeX = hoverX ?? curve.marker.x;
  const postValue = hoverX === null ? curve.marker.post : interpolate(curve.post, hoverX);
  const typicalValue = curve.typical
    ? hoverX === null
      ? curve.marker.typical ?? 0
      : interpolate(curve.typical, Math.min(hoverX, curve.typical[curve.typical.length - 1][0]))
    : null;
  const pctX = toX(activeX);
  const isHover = hoverX !== null;

  return (
    <div ref={ref}>
      {/* Readout */}
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-soft">
          {isHover ? "Approx." : curve.marker.date}
        </span>
        <span className="flex items-center gap-3 text-xs font-semibold tabular-nums text-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-brand" />
            {isHover ? `≈ ${compact(postValue)}` : fmt(postValue)}
          </span>
          {typicalValue !== null && (
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-[#cfc6b6]" />
              {isHover ? `≈ ${compact(typicalValue)}` : fmt(typicalValue)}
            </span>
          )}
        </span>
      </div>

      <div className="grid grid-cols-[2.25rem_1fr] gap-x-2">
        {/* Y labels */}
        <div className="relative h-24 font-mono text-[0.62rem] tabular-nums text-muted-soft">
          {[1, 0.5, 0].map((f) => (
            <span
              key={f}
              className="absolute right-0 -translate-y-1/2"
              style={{ top: `${(1 - f) * 100}%` }}
            >
              {compact(yMax * f)}
            </span>
          ))}
        </div>

        {/* Plot */}
        <div
          className="relative h-24 cursor-crosshair touch-none"
          onPointerMove={onMove}
          onPointerDown={onMove}
          onPointerLeave={() => setHoverX(null)}
          role="img"
          aria-label={`${format} views over time, reaching ${fmt(curve.marker.post)} by ${curve.marker.date}`}
        >
          {[0, 50, 100].map((t) => (
            <div
              key={t}
              className={cn(
                "absolute inset-x-0 h-px",
                t === 100 ? "bg-border-strong" : "bg-border"
              )}
              style={{ top: `${t}%` }}
            />
          ))}

          <motion.svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
            initial={{ clipPath: "inset(-10% 100% -10% -2%)" }}
            animate={{ clipPath: inView ? "inset(-10% -2% -10% -2%)" : "inset(-10% 100% -10% -2%)" }}
            transition={{ duration: 1.4, ease: "easeInOut", delay: 0.15 }}
          >
            {curve.typical && (
              <path
                d={path(curve.typical)}
                fill="none"
                stroke="#cfc6b6"
                strokeWidth={2}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            )}
            <path
              d={path(curve.post)}
              fill="none"
              stroke="var(--brand)"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </motion.svg>

          {/* Crosshair + markers */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 1.3 }}
            className="pointer-events-none absolute inset-0"
          >
            <div
              className="absolute top-0 bottom-0 border-l border-dotted border-foreground/40"
              style={{ left: `${pctX}%` }}
            />
            {typicalValue !== null && (
              <span
                className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#cfc6b6] bg-card"
                style={{ left: `${pctX}%`, top: `${toY(typicalValue)}%` }}
              />
            )}
            <span
              className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand bg-card shadow-[0_0_0_2px_var(--card)]"
              style={{ left: `${pctX}%`, top: `${toY(postValue)}%` }}
            />
          </motion.div>
        </div>

        {/* X labels */}
        <div />
        <div className="relative mt-1.5 h-4 font-mono text-[0.62rem] text-muted-soft">
          {curve.ticks.map((t) => (
            <span
              key={t.label}
              className="absolute -translate-x-1/2"
              style={{ left: `${toX(t.x)}%` }}
            >
              {t.label}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}

function SplitBar({
  left,
  right,
  values,
}: {
  left: string;
  right: string;
  values: [number, number];
}) {
  const leftPct = (values[0] / (values[0] + values[1])) * 100;
  return (
    <div>
      <div className="flex justify-between text-[0.7rem] text-muted-foreground">
        <span>
          {left} <span className="font-semibold tabular-nums text-foreground">{fmt(values[0])}</span>
        </span>
        <span>
          <span className="font-semibold tabular-nums text-foreground">{fmt(values[1])}</span> {right}
        </span>
      </div>
      <div className="mt-1 flex h-1.5 gap-[2px]">
        <div
          className="rounded-l-full bg-brand/35"
          style={{ width: `${leftPct}%`, minWidth: 6 }}
        />
        <div className="flex-1 rounded-r-full bg-brand" />
      </div>
    </div>
  );
}

const cardMotion = {
  layout: true,
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 16 },
  transition: { duration: 0.35 },
} as const;

function ResultCard({ result }: { result: ViewsResult }) {
  const x = multiplier(result.curve);
  return (
    <motion.article
      {...cardMotion}
      className="flex flex-col rounded-2xl border border-border bg-card p-4"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
            {result.format} views
            {result.viewers && (
              <span className="normal-case tracking-normal text-muted-soft">
                · {fmt(result.viewers)} viewers
              </span>
            )}
          </p>
          <p className="mt-1 font-display text-4xl leading-none tracking-tight tabular-nums">
            {fmt(result.views)}
          </p>
        </div>
        {x && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-paper px-2 py-0.5 text-[0.7rem] font-medium text-brand">
            <TrendingUp className="h-3 w-3" />
            {x}× typical
          </span>
        )}
      </div>

      {result.curve && (
        <div className="mt-3">
          <ViewsChart curve={result.curve} format={result.format} />
        </div>
      )}

      {!result.curve && (
        <dl className="my-4 grid flex-1 grid-cols-2 content-center gap-3">
          {[
            result.followers && {
              value: share(result.followers[1], result.followers),
              label: "reached non-followers",
            },
            result.platforms && {
              value: share(result.platforms[0], result.platforms),
              label: "of views from Facebook",
            },
          ]
            .filter((stat) => !!stat)
            .map((stat) => (
              <div key={stat.label} className="rounded-xl bg-paper px-4 py-5">
                <dd className="font-display text-5xl leading-none tracking-tight text-brand">
                  {stat.value}
                </dd>
                <dt className="mt-2 text-xs text-muted-foreground">{stat.label}</dt>
              </div>
            ))}
        </dl>
      )}

      {(result.platforms || result.followers) && (
        <div
          className={cn(
            "space-y-2.5",
            result.curve && "mt-3 border-t border-border pt-3"
          )}
        >
          {result.platforms && (
            <SplitBar left="Facebook" right="Instagram" values={result.platforms} />
          )}
          {result.followers && (
            <SplitBar left="Followers" right="Non-followers" values={result.followers} />
          )}
        </div>
      )}
    </motion.article>
  );
}

function SummaryCard({ brand, results }: { brand: string; results: ViewsResult[] }) {
  const total = results.reduce((s, r) => s + r.views, 0);
  const best = Math.max(...results.map((r) => multiplier(r.curve) ?? 0));
  const withAudience = results.filter((r) => r.followers);
  const reach = withAudience.reduce((s, r) => s + r.followers![1], 0);
  const audience = withAudience.reduce((s, r) => s + r.followers![0] + r.followers![1], 0);

  const stats = [
    { label: "Posts", value: String(results.length).padStart(2, "0") },
    { label: "Best vs. typical", value: `${best}×` },
    ...(audience
      ? [{ label: "Non-followers", value: `${Math.round((reach / audience) * 100)}%` }]
      : []),
  ];

  return (
    <motion.article
      {...cardMotion}
      className="flex flex-col justify-between rounded-2xl bg-foreground p-5 text-background"
    >
      <div>
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-background/60">
          {brand} · combined views
        </p>
        <p className="mt-3 font-display text-5xl leading-none tracking-tight tabular-nums">
          {fmt(total)}
        </p>
        <p className="mt-3 max-w-xs text-xs leading-relaxed text-background/70">
          Top-performing posts, pulled straight from Meta insights — all
          organic, zero ad spend.
        </p>
      </div>
      <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-background/15 pt-4">
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="text-[0.6rem] uppercase tracking-[0.12em] text-background/55">
              {s.label}
            </dt>
            <dd className="mt-1 font-display text-2xl leading-none">{s.value}</dd>
          </div>
        ))}
      </dl>
    </motion.article>
  );
}

export default function Results() {
  const [brand, setBrand] = useState<ResultsBrand>("nailkada");
  const results = viewsResults.filter((r) => r.brand === brand);
  const label = resultsBrands.find((b) => b.value === brand)!.label;

  return (
    <AnimatedSection id="results" className="scroll-mt-16 py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Results"
            title="Numbers that"
            italicWord="travelled."
            className="mb-0 md:mb-0 [&_h2]:text-[clamp(2rem,4vw,3rem)] [&>div]:mb-3"
          />

          <motion.div
            variants={fadeInUp}
            className="flex flex-col gap-3 md:items-end"
          >
            <div className="inline-flex w-fit items-center gap-1 rounded-full border border-border bg-paper/70 p-1">
              {resultsBrands.map((b) => {
                const isActive = brand === b.value;
                return (
                  <button
                    key={b.value}
                    type="button"
                    onClick={() => setBrand(b.value)}
                    aria-pressed={isActive}
                    className="relative rounded-full px-4 py-1.5 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="resultsFilterPill"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        className="absolute inset-0 rounded-full bg-brand shadow-[0_6px_18px_-8px] shadow-brand/60"
                      />
                    )}
                    <span
                      className={cn(
                        "relative z-10 transition-colors duration-200",
                        isActive
                          ? "text-brand-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {b.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="h-[3px] w-4 rounded-full bg-brand" />
                This post's views
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-[3px] w-4 rounded-full bg-[#cfc6b6]" />
                Page's typical post
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeInUp}>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              <SummaryCard key={`summary-${brand}`} brand={label} results={results} />
              {results.map((r) => (
                <ResultCard key={r.id} result={r} />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
