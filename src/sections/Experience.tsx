import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { fadeInUp } from "@/helpers/motion";
import { experiences } from "@/data/caseStudies";

export default function Experience() {
  return (
    <AnimatedSection id="experience" className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Selected"
          italicWord="engagements."
          subtitle="Contract-based social media work for product, lifestyle, and service brands — organic-first, with content calendars and visual systems built from scratch."
        />

        <div className="relative">
          {/* Vertical rule */}
          <span
            aria-hidden
            className="hidden md:block absolute left-30 top-2 bottom-2 w-px bg-border"
          />

          <div className="space-y-16 md:space-y-20">
            {experiences.map((exp, idx) => (
              <motion.article
                key={exp.id}
                variants={fadeInUp}
                className="md:grid md:grid-cols-[120px_1fr] md:gap-12 relative"
              >
                {/* Date column */}
                <div className="md:pt-1 mb-4 md:mb-0">
                  <div className="hidden md:flex items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="font-display italic text-2xl md:text-lg md:not-italic md:font-medium md:font-sans text-foreground mt-1 md:mt-3">
                    {exp.period}
                  </p>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-1">
                    {exp.type}
                  </p>
                </div>

                {/* Content column */}
                <div className="md:pl-8 md:border-l md:border-transparent">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight">
                        {exp.client}
                      </h3>
                      <p className="text-muted-foreground mt-2 text-base">
                        {exp.role} · {exp.location}
                      </p>
                    </div>
                    <ArrowUpRight className="w-6 h-6 text-muted-foreground shrink-0" />
                  </div>

                  <p className="mt-6 text-foreground/80 leading-relaxed max-w-3xl">
                    {exp.summary}
                  </p>

                  <ul className="mt-6 space-y-3 max-w-3xl">
                    {exp.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm md:text-base text-foreground/85 leading-relaxed"
                      >
                        <span className="font-mono text-xs text-brand mt-1.5 shrink-0">
                          /{String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {exp.metrics && exp.metrics.length > 0 && (
                    <div className="mt-8 flex flex-wrap gap-3">
                      {exp.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="inline-flex items-baseline gap-2 rounded-full bg-paper border border-border px-4 py-2"
                        >
                          <span className="font-display text-xl text-foreground">
                            {m.value}
                          </span>
                          <span className="text-xs text-muted-foreground">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-6">
                    <Badge variant="outline">{exp.type}</Badge>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
