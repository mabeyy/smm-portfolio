import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { fadeInUp } from "@/helpers/motion";
import { experiences } from "@/data/caseStudies";

export default function Experience() {
  return (
    <AnimatedSection id="experience" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Selected"
          italicWord="engagements."
          subtitle="Social media work for product, lifestyle, and service brands — organic-first, with content calendars and visual systems built from scratch."
          className="mb-8 md:mb-10"
        />

        <div className="divide-y divide-border-strong">
          {experiences.map((exp, idx) => (
            <motion.article
              key={exp.id}
              variants={fadeInUp}
              className="group md:grid md:grid-cols-[170px_1fr] md:gap-12 relative py-8 md:py-10 first:pt-0 last:pb-0"
            >
                {/* Date column */}
                <div className="mb-4 md:mb-0">
                  <span className="hidden md:block font-display italic text-4xl leading-none text-brand/25 transition-colors duration-300 group-hover:text-brand/60 select-none">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="font-display italic text-2xl md:text-base md:not-italic md:font-medium md:font-sans text-foreground mt-1 md:mt-4 md:leading-snug">
                    {exp.period}
                  </p>
                  <span className="mt-2.5 inline-flex items-center rounded-full border border-border bg-paper px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
                    {exp.type}
                  </span>
                </div>

                {/* Content column */}
                <div className="md:transition-transform md:duration-300 md:group-hover:translate-x-1">
                  {exp.url ? (
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-start gap-2 group/link"
                      aria-label={`Visit ${exp.client} on Facebook`}
                    >
                      <h3 className="font-display text-3xl md:text-4xl leading-[1.05] tracking-tight transition-colors duration-300 group-hover:text-brand">
                        {exp.client}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 mt-1 shrink-0 text-muted-soft transition-all duration-300 group-hover:text-brand group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </a>
                  ) : (
                    <h3 className="font-display text-3xl md:text-4xl leading-[1.05] tracking-tight">
                      {exp.client}
                    </h3>
                  )}
                  <p className="text-muted-foreground mt-1.5 text-base">
                    {exp.role} · {exp.location}
                  </p>

                  <ul className="mt-5 space-y-2.5 max-w-3xl">
                    {exp.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm md:text-base text-foreground/85 leading-relaxed"
                      >
                        <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
    </AnimatedSection>
  );
}
