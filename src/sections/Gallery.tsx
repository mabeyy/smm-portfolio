import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowUpRight, Plus, Minus, ChevronRight } from "lucide-react";
import WorkSheet from "@/components/WorkSheet";
import { cn } from "@/lib/utils";
import {
  galleryCategories,
  galleryItems,
  galleryBrandLabels,
  type GalleryCategory,
} from "@/data/gallery";
import { isProjectId } from "@/data/projects";
import SectionLabel from "@/components/SectionLabel";

const ease = [0.22, 1, 0.36, 1] as const;

const INITIAL_VISIBLE = 8;

const platform = (url: string) =>
  url.includes("youtube.com") ? "YouTube" : "Instagram";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const visible = expanded ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  // photos that open in the detail view, in grid order
  const pieces = filtered.filter((item) => item.type === "Photo" && isProjectId(item.category));
  const hiddenCount = filtered.length - INITIAL_VISIBLE;

  // horizontal scroll hints for the filter row on small screens
  const tabsRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });
  const nudged = useRef(false);

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    const update = () =>
      setEdges({
        start: el.scrollLeft <= 4,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
      });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    // a small nudge the first time the row is seen, if it overflows
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || nudged.current || el.scrollWidth <= el.clientWidth) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        nudged.current = true;
        el.scrollTo({ left: 48, behavior: "smooth" });
        setTimeout(() => el.scrollTo({ left: 0, behavior: "smooth" }), 600);
      },
      { threshold: 1 }
    );
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  const scrollTabs = () =>
    tabsRef.current?.scrollBy({ left: tabsRef.current.clientWidth * 0.6, behavior: "smooth" });

  const fadeMask =
    edges.start && edges.end
      ? undefined
      : `linear-gradient(to right, ${edges.start ? "black" : "transparent"}, black 12%, black 82%, ${edges.end ? "black" : "transparent"})`;

  const selectCategory = (value: GalleryCategory) => {
    setActiveCategory(value);
    setExpanded(false);
  };

  return (
    <section id="gallery" className="relative py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-end">
          <div className="lg:col-span-6">
            <SectionLabel id="gallery" />
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.05, ease }}
              className="mt-5 font-display text-[clamp(2.75rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.02em]"
            >
              Selected <span className="italic text-brand">work.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="lg:col-span-5 lg:col-start-8 text-base leading-relaxed text-muted-foreground"
          >
            Photography, design, and short-form video — made for brands and for
            myself. Tap a photo to see it up close, or a reel to watch it.
          </motion.p>
        </div>

        {/* filter */}
        <div className="relative mt-10 md:mt-12 -mx-4 sm:mx-0 border-b border-border-strong">
        <div
          ref={tabsRef}
          role="tablist"
          aria-label="Filter work"
          style={fadeMask ? { maskImage: fadeMask, WebkitMaskImage: fadeMask } : undefined}
          className="px-4 sm:px-0 flex items-end gap-x-7 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {galleryCategories.map((cat) => {
            const isActive = activeCategory === cat.value;
            const count =
              cat.value === "all"
                ? galleryItems.length
                : galleryItems.filter((i) => i.category === cat.value).length;
            return (
              <button
                key={cat.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => selectCategory(cat.value)}
                className={cn(
                  "relative shrink-0 pb-3 font-display text-xl md:text-2xl outline-none transition-colors duration-300",
                  isActive ? "italic text-foreground" : "text-muted-soft hover:text-muted-foreground"
                )}
              >
                {cat.label}
                <sup className="ml-1 font-mono text-[10px] not-italic tabular-nums text-muted-soft">
                  {String(count).padStart(2, "0")}
                </sup>
                {isActive && (
                  <motion.span
                    layoutId="galleryTab"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute inset-x-0 -bottom-px h-px bg-foreground"
                  />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {!edges.end && (
            <motion.button
              type="button"
              onClick={scrollTabs}
              aria-label="More filters"
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="absolute right-2 sm:right-0 top-1/2 -translate-y-[60%] grid place-items-center h-8 w-8 text-foreground"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
        </div>

        {/* grid */}
        <motion.div layout className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((item) => {
              const opensPiece = item.type === "Photo" && isProjectId(item.category);
              const isVideo = item.type !== "Photo";
              const motionProps = {
                layout: true,
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, scale: 0.96 },
                transition: { duration: 0.4, ease },
                className:
                  "group relative block aspect-[4/5] w-full overflow-hidden rounded-xl bg-paper outline-none focus-visible:ring-2 focus-visible:ring-brand/50",
              } as const;
              const tile = (
                <>
                  <img
                    src={item.image}
                    alt={`${galleryBrandLabels[item.category]} — ${item.type}`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />

                  {isVideo && (
                    <span className="absolute right-3 top-3 grid place-items-center h-8 w-8 rounded-full bg-background/90 text-foreground backdrop-blur">
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </span>
                  )}

                  {/* caption on hover */}
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 pt-12 bg-gradient-to-t from-black/60 via-black/20 to-transparent text-white opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0">
                    <span>
                      <span className="block font-display text-lg leading-none">
                        {galleryBrandLabels[item.category]}
                      </span>
                      <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/75">
                        {opensPiece ? item.type : `${item.type} · ${platform(item.url)}`}
                      </span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </span>
                </>
              );
              return opensPiece ? (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => setOpenIndex(pieces.indexOf(item))}
                  aria-label={`${galleryBrandLabels[item.category]} — open piece`}
                  {...motionProps}
                >
                  {tile}
                </motion.button>
              ) : (
                <motion.a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${galleryBrandLabels[item.category]} — ${item.type} on ${platform(item.url)}`}
                  {...motionProps}
                >
                  {tile}
                </motion.a>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {hiddenCount > 0 && (
          <motion.div layout className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="group inline-flex items-center gap-3 text-sm text-foreground outline-none"
            >
              <span className="grid place-items-center h-10 w-10 rounded-full border border-border-strong transition-all duration-500 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground">
                {expanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
              {expanded ? "Show less" : `View all ${filtered.length} pieces`}
            </button>
          </motion.div>
        )}

        <WorkSheet
          items={pieces}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      </div>
    </section>
  );
}
