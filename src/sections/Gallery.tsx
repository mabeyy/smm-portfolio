import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
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
    <AnimatedSection id="gallery" className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Selected work"
          title="Content"
          italicWord="gallery."
          subtitle="A sample of formats — posts, reels, captions, and carousels — across the brands I've supported. Filter by format below."
        />

        {/* Filter tabs */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap gap-2 mb-12"
        >
          {galleryCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.value
                  ? "bg-foreground text-background"
                  : "bg-card text-muted hover:text-foreground border border-border"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
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
                className="group relative aspect-4/5 rounded-2xl overflow-hidden border border-border"
              >
                <div
                  className={`absolute inset-0 ${
                    toneStyles[item.tone] ?? toneStyles.warm
                  } flex flex-col justify-between p-5`}
                >
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em]">
                    <span>{item.platform}</span>
                    <span>{item.category}</span>
                  </div>
                  <div className="font-display italic text-2xl md:text-3xl leading-tight">
                    {item.title}
                  </div>
                </div>

                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/90 transition-all duration-500 flex items-end p-5">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <p className="font-display italic text-2xl text-background leading-tight">
                      {item.title}
                    </p>
                    <p className="text-xs text-background/70 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="mt-10 text-sm text-muted">
          Tiles are placeholders — replace with real exports from the campaigns
          you want to feature.
        </p>
      </div>
    </AnimatedSection>
  );
}
