import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Grainient from "@/components/Grainient";

const ease = [0.22, 1, 0.36, 1] as const;

const EMAIL = "villaflorjvpaula@gmail.com";
const roles = ["Graphic Designer", "Art Director", "Photographer", "Video Editor"];

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·/";

/* ---------- decodes text letter by letter ---------- */
function Scramble({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduce = useReducedMotion();
  const [out, setOut] = useState(reduce ? text : "");

  useEffect(() => {
    if (reduce) {
      setOut(text);
      return;
    }
    let frame = 0;
    let raf = 0;
    const start = performance.now() + delay * 1000;
    const tick = (now: number) => {
      if (now < start) {
        raf = requestAnimationFrame(tick);
        return;
      }
      frame++;
      const revealed = Math.floor(frame / 2);
      setOut(
        text
          .split("")
          .map((c, i) =>
            c === " " || i < revealed
              ? c
              : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          )
          .join("")
      );
      if (revealed < text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, delay, reduce]);

  return (
    <span aria-label={text}>
      <span aria-hidden>{out || " "}</span>
    </span>
  );
}

/* ---------- cycles through roles, each one decoding in ---------- */
function RoleTicker() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    let id: ReturnType<typeof setInterval>;
    const t = setTimeout(() => {
      id = setInterval(() => setI((n) => (n + 1) % roles.length), 3200);
    }, 2400);
    return () => {
      clearTimeout(t);
      clearInterval(id);
    };
  }, [reduce]);

  return <Scramble key={roles[i]} text={roles[i]} delay={i === 0 ? 0.9 : 0} />;
}

/* ---------- year rolls up to the current one ---------- */
function YearCounter() {
  const reduce = useReducedMotion();
  const year = useMotionValue(reduce ? 2026 : 2019);
  const display = useTransform(year, (v) => Math.round(v).toString());

  useEffect(() => {
    if (reduce) return;
    const controls = animate(year, 2026, { duration: 1.8, delay: 0.8, ease: "easeOut" });
    return () => controls.stop();
  }, [year, reduce]);

  return <motion.span>{display}</motion.span>;
}

/* ---------- headline: per-letter masked rise ---------- */
function SplitWord({
  text,
  delay = 0,
  className = "",
  interactive = false,
}: {
  text: string;
  delay?: number;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <span className={`inline-flex overflow-hidden pb-[0.12em] -mb-[0.12em] ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className={
            interactive
              ? "inline-block cursor-default transition-colors duration-300 hover:text-brand-hover hover:[font-style:italic] hover:-translate-y-[0.04em]"
              : "inline-block"
          }
          initial={{ y: "110%", rotate: 8 }}
          animate={{ y: "0%", rotate: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.045, ease }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ---------- hero ---------- */
export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  // on scroll the words drift apart
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const leftX = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);


  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh flex flex-col px-3 pb-3 pt-20 md:px-6 md:pb-6 md:pt-24 overflow-hidden"
    >
      {/* animated grain gradient */}
      <div aria-hidden className="absolute inset-0 -z-10 opacity-80">
        <Grainient
          color1="#faf7f2"
          color2="#ebe2d3"
          color3="#d9c9b2"
          timeSpeed={reduce ? 0 : 0.18}
          warpStrength={0.8}
          warpAmplitude={40}
          contrast={1.05}
          saturation={0.9}
          grainAmount={0.06}
          grainAnimated={!reduce}
          zoom={1.1}
        />
      </div>

      <div className="relative flex-1 flex flex-col justify-center px-3 md:px-6 lg:px-10">
        {/* meta line */}
        <motion.div
          style={{ opacity: fade }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex items-center justify-center gap-3 md:justify-between font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] md:tracking-[0.3em] text-muted-foreground mb-5 md:mb-10"
        >
          <span>
            Portfolio — <YearCounter />
          </span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-border-strong md:hidden" />
          <span className="text-foreground">
            <RoleTicker />
          </span>
        </motion.div>

        {/* the title line */}
        <h1 className="font-display text-[32vw] md:text-[clamp(3.6rem,13vw,14rem)] leading-[0.86] md:leading-[0.9] tracking-[-0.02em]">
          <span className="sr-only">Creative works by JV Paula Villaflor</span>
          <span aria-hidden className="flex flex-col items-center text-center">
            <motion.span style={{ x: leftX }} className="inline-block">
              <SplitWord text="Creative" delay={0.15} interactive />
            </motion.span>
            <motion.span style={{ x: rightX }} className="inline-flex items-end">
              <SplitWord text="works" delay={0.4} className="italic text-brand" interactive />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 12, delay: 0.9 }}
                className="inline-block mb-[0.16em] ml-[0.04em] h-[0.12em] w-[0.12em] rounded-full bg-foreground"
              />
            </motion.span>
          </span>
        </h1>

        {/* call to action */}
        <motion.div
          style={{ opacity: fade }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease }}
          className="mt-10 md:mt-14 flex justify-center"
        >
          <Button asChild size="lg" className="group rounded-full px-7 h-12 md:h-10 w-full max-w-xs md:w-auto">
            <a href="#contact">
              Start a project
              <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Button>
        </motion.div>
      </div>

      {/* footer line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="relative mt-10 flex items-center justify-between gap-4 h-12 md:h-14 px-3 md:px-6 lg:px-10 shrink-0 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        <a
          href={`mailto:${EMAIL}`}
          className="normal-case tracking-normal font-sans text-xs sm:text-sm text-foreground hover:text-brand transition-colors truncate"
        >
          {EMAIL}
        </a>
        <a href="#gallery" className="flex items-center gap-3 hover:text-foreground transition-colors">
          Scroll
          <span className="relative h-px w-6 sm:w-10 overflow-hidden bg-border-strong">
            <motion.span
              className="absolute inset-y-0 left-0 w-1/2 bg-foreground"
              animate={reduce ? undefined : { x: ["-100%", "200%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </a>
      </motion.div>
    </section>
  );
}
