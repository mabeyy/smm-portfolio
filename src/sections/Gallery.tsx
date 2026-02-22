"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/UI/AnimatedSection";
import SectionHeading from "@/components/UI/SectionHeading";
import Badge from "@/components/UI/Badge";
import { fadeInUp } from "@/helpers/motion";
import {
  galleryCategories,
  galleryItems,
  type GalleryCategory,
} from "@/data/gallery";

export default function Gallery() {
  const [activeCategory, setActiveCategory] =
    useState<GalleryCategory>("all");

  const filtered =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <AnimatedSection id="gallery" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Content Gallery"
          subtitle="A showcase of content I've created — from eye-catching posts to viral Reels."
        />

        {/* Filter tabs */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {galleryCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === cat.value
                  ? "bg-accent-amber text-white"
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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="aspect-square rounded-xl border border-border overflow-hidden group relative cursor-pointer"
              >
                {/* Colored placeholder */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}20, ${item.color}05)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-12 h-12 rounded-full opacity-20"
                    style={{ backgroundColor: item.color }}
                  />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-muted mt-1">
                      {item.description}
                    </p>
                    <Badge variant="amber" className="mt-2 text-xs">
                      {item.platform}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
