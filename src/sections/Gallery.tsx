import { useState } from "react";
import { Dialog } from "radix-ui";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image as ImageIcon,
  Play,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";
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

const platform = (url: string) =>
  url.includes("youtube.com") ? "YouTube" : "Instagram";

export default function Gallery() {
  const [activeCategory, setActiveCategory] =
    useState<GalleryCategory>("all");
  const [expanded, setExpanded] = useState(false);
  const [openPhoto, setOpenPhoto] = useState<number | null>(null);

  const filtered =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const visible = expanded ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hiddenCount = filtered.length - INITIAL_VISIBLE;
  const photos = visible.filter((item) => item.type === "Photo");
  const activePhoto = openPhoto === null ? null : photos[openPhoto];

  const stepPhoto = (dir: 1 | -1) =>
    setOpenPhoto((i) =>
      i === null ? i : (i + dir + photos.length) % photos.length
    );

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
          subtitle="Real posts and reels from the brands I've managed — all organic, no ad spend. Filter by brand, and tap any tile to open the original post."
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
            {visible.map((item) => {
              const isPhoto = item.type === "Photo";
              const motionProps = {
                layout: true,
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.95 },
                transition: { duration: 0.3 },
                className:
                  "group relative block aspect-square w-full rounded-2xl overflow-hidden border border-border outline-none focus-visible:ring-2 focus-visible:ring-brand/50",
              } as const;
              const tile = (
                <>
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
                      {item.type !== "Photo" ? (
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
                      {isPhoto ? (
                        <>
                          View photo
                          <Maximize2 className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          View on {platform(item.url)}
                          <ArrowUpRight className="w-4 h-4" />
                        </>
                      )}
                    </span>
                  </div>
                </>
              );
              return isPhoto ? (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => setOpenPhoto(photos.indexOf(item))}
                  aria-label={`${galleryBrandLabels[item.category]} — open photo`}
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
          Every post is organic — no ad spend. Tap a photo to view it, or a reel
          to watch the original.
        </p>

        <Dialog.Root
          open={activePhoto !== null}
          onOpenChange={(open) => !open && setOpenPhoto(null)}
        >
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
            <Dialog.Content
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") stepPhoto(1);
                if (e.key === "ArrowLeft") stepPhoto(-1);
              }}
              className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,34rem)] -translate-x-1/2 -translate-y-1/2 outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
            >
              {activePhoto && (
                <figure className="overflow-hidden rounded-2xl bg-card shadow-2xl">
                  <img
                    src={activePhoto.image}
                    alt={`${galleryBrandLabels[activePhoto.category]} — photo`}
                    className="block max-h-[78vh] w-full bg-paper object-contain"
                  />
                  <figcaption className="flex items-center justify-between gap-3 px-4 py-3">
                    <Dialog.Title className="text-sm font-medium">
                      {galleryBrandLabels[activePhoto.category]}
                    </Dialog.Title>
                    <Dialog.Description className="font-mono text-xs tabular-nums text-muted-foreground">
                      {String(openPhoto! + 1).padStart(2, "0")} /{" "}
                      {String(photos.length).padStart(2, "0")}
                    </Dialog.Description>
                  </figcaption>
                </figure>
              )}

              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => stepPhoto(-1)}
                    aria-label="Previous photo"
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-card/90 p-2 text-foreground shadow-md outline-none transition-colors hover:bg-card focus-visible:ring-2 focus-visible:ring-brand/50 sm:-left-14"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => stepPhoto(1)}
                    aria-label="Next photo"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-card/90 p-2 text-foreground shadow-md outline-none transition-colors hover:bg-card focus-visible:ring-2 focus-visible:ring-brand/50 sm:-right-14"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              <Dialog.Close
                aria-label="Close"
                className="absolute -top-12 right-0 rounded-full bg-card/90 p-2 text-foreground shadow-md outline-none transition-colors hover:bg-card focus-visible:ring-2 focus-visible:ring-brand/50"
              >
                <X className="h-5 w-5" />
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </AnimatedSection>
  );
}
