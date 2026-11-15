import { useEffect, useRef, useState } from "react";
import { Dialog } from "radix-ui";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { galleryItems, type GalleryItem } from "@/data/gallery";
import { getWorkDetail } from "@/data/projects";

const ease = [0.22, 1, 0.36, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease },
});

const pad = (n: number) => String(n).padStart(2, "0");

interface WorkSheetProps {
  /** the photos you can step through, in gallery order */
  items: GalleryItem[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

export default function WorkSheet({ items, index, onIndexChange, onClose }: WorkSheetProps) {
  const item = index === null ? null : items[index];
  const detail = item ? getWorkDetail(item) : null;
  // which way the image slides when changing pieces
  const [direction, setDirection] = useState<1 | -1>(1);
  const stripRef = useRef<HTMLDivElement>(null);

  const step = (dir: 1 | -1) => {
    if (index === null) return;
    setDirection(dir);
    onIndexChange((index + dir + items.length) % items.length);
  };

  const siblings = item
    ? galleryItems.filter((g) => g.category === item.category && g.type === "Photo")
    : [];

  const openItem = (target: GalleryItem) => {
    if (index === null) return;
    const i = items.findIndex((g) => g.id === target.id);
    if (i === -1) return;
    setDirection(i > index ? 1 : -1);
    onIndexChange(i);
  };

  // keep the active thumbnail centred in the filmstrip
  useEffect(() => {
    const strip = stripRef.current;
    const active = strip?.querySelector<HTMLElement>("[data-active=true]");
    if (!strip || !active) return;
    strip.scrollTo({
      left: active.offsetLeft - strip.clientWidth / 2 + active.clientWidth / 2,
      behavior: "smooth",
    });
  }, [item?.id]);

  return (
    <Dialog.Root open={item !== null} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content
          aria-describedby={undefined}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
          }}
          className="fixed left-1/2 top-1/2 z-50 w-[min(94vw,70rem)] max-h-[92svh] md:h-[min(86svh,46rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto md:overflow-hidden overscroll-contain rounded-[1.75rem] bg-background shadow-[0_40px_120px_-30px_rgba(28,22,17,0.6)] outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        >
          {item && detail && (
            <div className="relative grid grid-cols-[minmax(0,1fr)] md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:h-full">
              <Dialog.Close
                aria-label="Close"
                className="absolute right-4 top-4 z-20 grid place-items-center h-9 w-9 rounded-full bg-background/90 text-foreground backdrop-blur border border-border transition-colors hover:bg-foreground hover:text-background outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
              >
                <X className="w-4 h-4" />
              </Dialog.Close>

              {/* the piece, over a blurred wash of itself */}
              <div className="group/img relative overflow-hidden bg-foreground h-[52svh] md:h-full">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={`bg-${item.id}`}
                    src={item.image}
                    alt=""
                    aria-hidden
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.55 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 h-full w-full object-cover scale-125 blur-2xl"
                  />
                </AnimatePresence>

                <AnimatePresence initial={false} custom={direction}>
                  <motion.img
                    key={item.id}
                    src={item.image}
                    alt={detail.title}
                    custom={direction}
                    variants={{
                      enter: (d: number) => ({ opacity: 0, x: `${d * 8}%` }),
                      center: { opacity: 1, x: "0%" },
                      exit: (d: number) => ({ opacity: 0, x: `${d * -8}%` }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.55, ease }}
                    className="absolute inset-0 m-auto h-full w-full object-contain p-4 md:p-8 drop-shadow-[0_24px_40px_rgba(0,0,0,0.35)]"
                  />
                </AnimatePresence>

                {items.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="Previous piece"
                      className="absolute left-4 top-1/2 -translate-y-1/2 grid place-items-center h-11 w-11 rounded-full bg-background/85 text-foreground backdrop-blur transition-all duration-300 hover:bg-background hover:scale-105 md:opacity-0 md:-translate-x-2 md:group-hover/img:opacity-100 md:group-hover/img:translate-x-0 focus-visible:opacity-100 outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="Next piece"
                      className="absolute right-4 top-1/2 -translate-y-1/2 grid place-items-center h-11 w-11 rounded-full bg-background/85 text-foreground backdrop-blur transition-all duration-300 hover:bg-background hover:scale-105 md:opacity-0 md:translate-x-2 md:group-hover/img:opacity-100 md:group-hover/img:translate-x-0 focus-visible:opacity-100 outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {/* details */}
              <div className="flex flex-col min-h-0">
                <div className="flex-1 min-h-0 md:overflow-y-auto overscroll-contain px-6 pt-7 pb-6 md:px-10 md:pt-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <motion.p
                        {...rise(0.04)}
                        className="pr-12 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
                      >
                        {detail.discipline}
                      </motion.p>
                      <Dialog.Title asChild>
                        <motion.h2
                          {...rise(0.08)}
                          className="mt-3 font-display text-[2.6rem] md:text-[3.25rem] leading-[0.95] tracking-[-0.02em]"
                        >
                          {detail.client}
                          <span className="italic text-brand"> no. {pad(detail.number)}</span>
                        </motion.h2>
                      </Dialog.Title>

                      <motion.p
                        {...rise(0.14)}
                        className="mt-5 text-base md:text-[1.05rem] leading-relaxed text-foreground/75 max-w-md"
                      >
                        {detail.description}
                      </motion.p>

                      {/* meta as a quiet ledger */}
                      <motion.dl {...rise(0.2)} className="mt-7 divide-y divide-border border-y border-border">
                        {[
                          ["Client", detail.client],
                          ["Role", detail.role],
                          ["Year", detail.year],
                        ].map(([label, value]) => (
                          <div key={label} className="flex items-baseline justify-between gap-6 py-3">
                            <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                              {label}
                            </dt>
                            <dd className="text-sm text-foreground text-right">{value}</dd>
                          </div>
                        ))}
                      </motion.dl>

                      <motion.ul {...rise(0.26)} className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                        {detail.tags.map((t) => (
                          <li key={t} className="text-sm text-muted-foreground">
                            <span className="text-brand mr-1.5">✦</span>
                            {t}
                          </li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  </AnimatePresence>

                  {/* filmstrip of the brand's pieces */}
                  {siblings.length > 1 && (
                    <div className="mt-9">
                      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                        <span>More from {detail.client}</span>
                        <span className="tabular-nums">
                          <span className="text-foreground">{pad(detail.number)}</span> / {pad(detail.total)}
                        </span>
                      </div>
                      <div
                        ref={stripRef}
                        className="relative mt-3 flex gap-2 overflow-x-auto py-1.5 -mx-1 px-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
                      >
                        {siblings.map((g) => {
                          const active = g.id === item.id;
                          return (
                            <button
                              key={g.id}
                              type="button"
                              data-active={active}
                              onClick={() => openItem(g)}
                              aria-label={`Open ${getWorkDetail(g).title}`}
                              aria-current={active}
                              className={`relative h-[3.75rem] w-12 shrink-0 overflow-hidden rounded-md bg-paper outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-brand/50 ${
                                active
                                  ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                                  : "opacity-55 hover:opacity-100"
                              }`}
                            >
                              <img src={g.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* action bar */}
                <div className="flex items-center justify-between gap-4 border-t border-border px-6 py-4 md:px-10">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm text-background transition-colors hover:bg-brand"
                  >
                    View original post
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <span className="hidden sm:flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-soft">
                    <kbd className="grid place-items-center h-6 w-6 rounded border border-border text-muted-foreground font-sans">←</kbd>
                    <kbd className="grid place-items-center h-6 w-6 rounded border border-border text-muted-foreground font-sans">→</kbd>
                    to browse
                  </span>
                </div>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
