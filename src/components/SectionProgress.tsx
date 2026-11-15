import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

/** Floating "where am I" guide: a dot rail on desktop, a small pill on phones. */
export default function SectionProgress() {
  const active = useActiveSection();
  const index = navLinks.findIndex((l) => l.href === active);
  const current = navLinks[index];

  // the phone pill only shows while scrolling, so it never sits on top of buttons
  const [scrolling, setScrolling] = useState(false);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      setScrolling(true);
      clearTimeout(t);
      t = setTimeout(() => setScrolling(false), 1500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      {/* desktop rail */}
      <nav
        aria-label="Section progress"
        className={cn(
          "fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:flex flex-col items-end gap-3 transition-opacity duration-500",
          index < 0 ? "pointer-events-none opacity-0" : "opacity-100"
        )}
      >
        {navLinks.map((l, i) => {
          const isActive = i === index;
          const passed = i < index;
          return (
            <a key={l.href} href={l.href} aria-label={l.label} className="group flex items-center gap-3">
              <span
                className="rounded-full bg-background/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground shadow-sm backdrop-blur opacity-0 translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100"
              >
                {l.label}
              </span>
              <span
                className={cn(
                  "h-px transition-all duration-500",
                  isActive ? "w-8 bg-foreground" : passed ? "w-4 bg-foreground/50" : "w-4 bg-border-strong group-hover:bg-foreground/50"
                )}
              />
            </a>
          );
        })}
      </nav>

      {/* phone pill */}
      <AnimatePresence>
        {current && scrolling && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed bottom-4 left-1/2 z-40 -translate-x-1/2 md:hidden"
          >
            <div className="flex items-center gap-3 rounded-full border border-border bg-background/85 px-4 py-2 shadow-[0_10px_30px_-12px_rgba(28,22,17,0.35)] backdrop-blur-xl">
              <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                <span className="text-foreground">{pad(index + 1)}</span>/{pad(navLinks.length)}
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={current.label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="font-display text-base leading-none text-foreground"
                >
                  {current.label}
                </motion.span>
              </AnimatePresence>
              <span className="flex gap-1">
                {navLinks.map((l, i) => (
                  <span
                    key={l.href}
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      i === index ? "w-4 bg-foreground" : i < index ? "w-1 bg-foreground/50" : "w-1 bg-border-strong"
                    )}
                  />
                ))}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
