import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { experiences } from "@/data/caseStudies";
import { galleryItems } from "@/data/gallery";
import SectionLabel from "@/components/SectionLabel";

const ease = [0.22, 1, 0.36, 1] as const;

const years = experiences
  .flatMap((e) => e.period.match(/\d{4}/g) ?? [])
  .map(Number);
const span = `${Math.min(...years)} — ${String(Math.max(...years)).slice(2)}`;

export default function Experience() {
  const [open, setOpen] = useState<string | null>(experiences[0]?.id ?? null);

  return (
    <section id="experience" className="relative py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-8">
        {/* heading */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
          <SectionLabel id="experience" />
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05, ease }}
            className="mt-5 font-display text-[clamp(2.75rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.02em]"
          >
            Selected <span className="italic text-brand">collaborations.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="mt-4 sm:mt-5 max-w-sm text-[0.95rem] sm:text-base leading-relaxed text-muted-foreground"
          >
            Brands I&apos;ve shaped the look and voice of — visual systems,
            shoots, and content built from scratch.
          </motion.p>
          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="mt-6 sm:mt-8 flex gap-8 sm:gap-10"
          >
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Brands
              </dt>
              <dd className="mt-1.5 font-display text-3xl sm:text-4xl leading-none">
                {String(experiences.length).padStart(2, "0")}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Years
              </dt>
              <dd className="mt-1.5 font-display text-3xl sm:text-4xl leading-none">{span}</dd>
            </div>
          </motion.dl>
        </div>

        {/* accordion */}
        <ul className="lg:col-span-8 border-t border-border-strong">
          {experiences.map((exp, i) => {
            const isOpen = open === exp.id;
            const work = galleryItems
              .filter((g) => g.category === exp.id && g.type === "Photo")
              .slice(0, 4);
            return (
              <motion.li
                key={exp.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.07, ease }}
                className="border-b border-border-strong"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : exp.id)}
                  aria-expanded={isOpen}
                  aria-controls={`exp-${exp.id}`}
                  className="group grid w-full grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[11rem_minmax(0,1fr)_auto_2.25rem] gap-x-4 md:gap-x-6 gap-y-1 items-center py-4 md:py-7 text-left outline-none"
                >
                  <span className="order-2 md:order-none col-span-2 md:col-span-1 font-mono text-[11px] uppercase tracking-[0.15em] whitespace-nowrap text-muted-foreground">
                    {exp.period.replace(" — ", " – ")}
                  </span>
                  <span
                    className={`font-display text-[1.6rem] sm:text-[clamp(1.75rem,3vw,2.75rem)] leading-tight tracking-[-0.01em] transition-all duration-500 ${
                      isOpen ? "italic text-brand" : "text-foreground group-hover:translate-x-1.5"
                    }`}
                  >
                    {exp.client}
                  </span>
                  <span className="hidden md:block text-right text-sm text-muted-foreground">
                    {exp.role}
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-soft">
                      {exp.type}
                    </span>
                  </span>
                  <span
                    className={`row-span-2 md:row-span-1 grid place-items-center h-8 w-8 md:h-9 md:w-9 rounded-full border transition-all duration-500 ${
                      isOpen
                        ? "rotate-45 bg-foreground text-background border-foreground"
                        : "border-border-strong text-foreground group-hover:border-foreground"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`exp-${exp.id}`}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="overflow-hidden"
                    >
                      <div className="grid md:grid-cols-[11rem_minmax(0,1fr)] gap-x-6 pb-6 md:pb-8">
                        <div className="hidden md:block" />
                        <div>
                          <p className="md:hidden text-sm text-muted-foreground">
                            {exp.role} · {exp.type}
                          </p>
                          <ul className="mt-3 md:mt-0 space-y-2 sm:space-y-2.5 max-w-2xl">
                            {exp.highlights.map((h) => (
                              <li
                                key={h}
                                className="flex gap-3 text-sm sm:text-[0.95rem] leading-relaxed text-foreground/80"
                              >
                                <span className="mt-[0.6em] h-px w-3 shrink-0 bg-brand" />
                                {h}
                              </li>
                            ))}
                          </ul>

                          {work.length > 0 && (
                            <div className="mt-5 sm:mt-6 grid grid-cols-4 gap-2 sm:flex sm:gap-2.5">
                              {work.map((w, wi) => (
                                <motion.a
                                  key={w.id}
                                  href="#gallery"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.5, delay: 0.15 + wi * 0.06, ease }}
                                  className="group/img relative aspect-[4/5] sm:aspect-auto sm:h-24 sm:w-20 overflow-hidden rounded-lg bg-paper"
                                  aria-label={`See ${exp.client} work`}
                                >
                                  <img
                                    src={w.image}
                                    alt=""
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                                  />
                                </motion.a>
                              ))}
                            </div>
                          )}

                          <div className="mt-5 sm:mt-6 flex items-center justify-between sm:justify-start gap-x-6 gap-y-2 text-sm">
                            <span className="truncate text-muted-foreground">{exp.location.split(",")[0].replace(/ City$/, "")}</span>
                            {exp.url && (
                              <a
                                href={exp.url}
                                target="_blank"
                                rel="noreferrer"
                                className="group/link inline-flex shrink-0 items-center gap-1.5 text-foreground"
                              >
                                <span className="relative">
                                  Visit {exp.client}
                                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-foreground origin-right scale-x-0 transition-transform duration-500 group-hover/link:origin-left group-hover/link:scale-x-100" />
                                </span>
                                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
