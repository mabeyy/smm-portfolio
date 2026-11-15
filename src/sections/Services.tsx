import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { services } from "@/data/services";
import SectionLabel from "@/components/SectionLabel";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Services() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const onTrackScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const step = card.offsetWidth;
    setActive(Math.min(services.length - 1, Math.round(el.scrollLeft / step)));
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft - 16, behavior: "smooth" });
  };

  return (
    <section id="services" className="relative py-12 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-end">
          <div className="lg:col-span-6">
            <SectionLabel id="services" />
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.05, ease }}
              className="mt-5 font-display text-[clamp(2.75rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.02em]"
            >
              What I <span className="italic text-brand">make.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="lg:col-span-5 lg:col-start-8"
          >
            <p className="text-base leading-relaxed text-muted-foreground">
              Design, image, and motion under one roof — so the whole thing feels
              like it came from the same hand.
            </p>
          </motion.div>
        </div>

        {/* phones: swipeable cards */}
        <div className="sm:hidden mt-8">
          <ul
            ref={trackRef}
            onScroll={onTrackScroll}
            className="-mx-4 px-4 flex overflow-x-auto snap-x snap-mandatory scroll-px-4 border-y border-border-strong [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {services.map((service, i) => (
              <li
                key={service.title}
                className="snap-start shrink-0 w-[82%] grid grid-cols-[3rem_minmax(0,1fr)] items-baseline py-6 pr-5 border-l border-border first:border-l-0 [&:not(:first-child)]:pl-5"
              >
                <span className="row-span-2 font-display italic text-3xl leading-none text-border-strong">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl leading-tight text-foreground">
                  {service.title}
                </h3>
                <p className="col-start-2 mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {services.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  aria-label={`Go to ${s.title}`}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-foreground" : "w-1.5 bg-border-strong"
                  }`}
                />
              ))}
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-soft">
              Swipe →
            </span>
          </div>
        </div>

        {/* tablet and up: side by side */}
        <ul className="hidden sm:grid mt-12 md:mt-16 sm:grid-cols-2 lg:grid-cols-5 border-y border-border-strong">
          {services.map((service, i) => (
            <motion.li
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="group flex flex-col border-border px-6 py-7 lg:py-9 first:lg:pl-0 last:lg:pr-0 border-t [&:nth-child(-n+2)]:border-t-0 even:border-l lg:border-t-0 lg:border-l lg:first:border-l-0"
            >
              <span className="font-display italic text-5xl leading-none text-border-strong transition-colors duration-500 group-hover:text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 lg:mt-12 font-display text-2xl leading-tight text-foreground">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
