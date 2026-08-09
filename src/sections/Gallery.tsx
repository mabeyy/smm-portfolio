import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, Play, ArrowUpRight, ChevronDown } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/helpers/motion";
import {
  galleryCategories,
  galleryItems,
  galleryBrandLabels,
  type GalleryCategory,
} from "@/data/gallery";

const toneStyles: Record<string, string> = {
  warm: "bg-[#efe4d3] text-[#5a432f]",
  sage: "bg-[#dde2d3] text-[#3f4a35]",
  cream: "bg-[#f1eadb] text-[#5e4f38]",
};

const INITIAL_VISIBLE = 12;

export default function Gallery() {
  const [activeCategory, setActiveCategory] =
    useState<GalleryCategory>("all");
  const [expanded, setExpanded] = useState(false);

  const filtered =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const visible = expanded ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hiddenCount = filtered.length - INITIAL_VISIBLE;

  const selectCategory = (value: GalleryCategory) => {
    setActiveCategory(value);
    setExpanded(false);
  };

  return (
    <AnimatedSection id="gallery" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Selected work"
          title="Content"
          italicWord="gallery."
          subtitle="Real posts and reels from the brands I've managed — all organic, no ad spend. Filter by brand, and tap any tile to open it on Instagram."
          className="mb-8 md:mb-10"
        />

        {/* Filter */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="inline-flex flex-wrap items-center gap-1 rounded-full border border-border bg-paper/70 p-1">
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
                  onClick={() => selectCategory(cat.value)}
                  aria-pressed={isActive}
                  className="relative rounded-full px-4 py-2 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                >
                  {isActive && (
                    <motion.span
                      layoutId="galleryFilterPill"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-full bg-brand shadow-[0_6px_18px_-8px] shadow-brand/60"
                    />
                  )}
                  <span
                    className={cn(
                      "relative z-10 inline-flex items-center gap-2 transition-colors duration-200",
                      isActive
                        ? "text-brand-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {cat.label}
                    <span
                      className={cn(
                        "font-mono text-[0.65rem] tabular-nums transition-colors duration-200",
                        isActive ? "text-brand-foreground/60" : "text-muted-soft"
                      )}
                    >
                      {String(count).padStart(2, "0")}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Gallery grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((item) => (
              <motion.a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${galleryBrandLabels[item.category]} — ${item.type} on Instagram`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative block aspect-square rounded-2xl overflow-hidden border border-border outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
              >
                {/* Real thumbnail */}
                <img
                  src={item.image}
                  alt={`${galleryBrandLabels[item.category]} — ${item.type}`}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04] ${
                    toneStyles[item.tone] ?? toneStyles.warm
                  }`}
                />

                {/* Top labels */}
                <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-1 p-3 text-[9px] font-medium uppercase tracking-[0.16em] text-white bg-gradient-to-b from-black/45 to-transparent">
                  <span className="truncate drop-shadow-sm">
                    {galleryBrandLabels[item.category]}
                  </span>
                  <span className="inline-flex items-center gap-1 shrink-0 drop-shadow-sm">
                    {item.type === "Reel" ? (
                      <Play className="w-2.5 h-2.5 fill-current" />
                    ) : (
                      <ImageIcon className="w-2.5 h-2.5" />
                    )}
                    {item.type}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-end bg-foreground/0 p-4 transition-colors duration-400 group-hover:bg-foreground/85">
                  <span className="inline-flex items-center gap-1.5 text-sm text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    View on Instagram
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        {hiddenCount > 0 && (
          <motion.div layout className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="group inline-flex items-center gap-2 rounded-full border border-border-strong bg-card px-5 py-2.5 text-sm font-medium text-foreground/80 outline-none transition-colors duration-300 hover:border-brand hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand/40"
            >
              {expanded ? "Show less" : `Show ${hiddenCount} more`}
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-brand transition-transform duration-300",
                  expanded && "rotate-180"
                )}
              />
            </button>
          </motion.div>
        )}

        <p className="mt-8 text-sm text-muted-foreground">
          Every post is organic — no ad spend. Tap any tile to view it on
          Instagram.
        </p>
      </div>
    </AnimatedSection>
  );
}
