import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/helpers/motion";
import {
  galleryCategories,
  galleryItems,
  type GalleryCategory,
} from "@/data/gallery";

const toneStyles: Record<string, string> = {
  warm: "bg-[#efe4d3] text-[#5a432f]",
  sage: "bg-[#dde2d3] text-[#3f4a35]",
  cream: "bg-[#f1eadb] text-[#5e4f38]",
};

export default function Gallery() {
  const [activeCategory, setActiveCategory] =
    useState<GalleryCategory>("all");

  const filtered =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <AnimatedSection id="gallery" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Selected work"
          title="Content"
          italicWord="gallery."
          subtitle="A sample of formats — posts, reels, captions, and carousels — across the brands I've supported. Filter by format below."
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
                  onClick={() => setActiveCategory(cat.value)}
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
            {filtered.map((item) => (
              <motion.figure
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-square rounded-2xl overflow-hidden border border-border"
              >
                <div
                  className={`absolute inset-0 ${
                    toneStyles[item.tone] ?? toneStyles.warm
                  } flex flex-col justify-between p-4`}
                >
                  <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.16em] gap-1">
                    <span>{item.platform}</span>
                    <span>{item.category}</span>
                  </div>
                  <div className="font-display italic text-lg md:text-xl leading-tight">
                    {item.title}
                  </div>
                </div>

                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/90 transition-all duration-500 flex items-end p-4">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <p className="font-display italic text-lg text-background leading-tight">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-background/70 mt-1.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="mt-8 text-sm text-muted-foreground">
          Tiles are placeholders — replace with real exports from the campaigns
          you want to feature.
        </p>
      </div>
    </AnimatedSection>
  );
}
