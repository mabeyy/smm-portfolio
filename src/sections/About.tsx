import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { slideInLeft, slideInRight } from "@/helpers/motion";
import { aboutData } from "@/data/about";

export default function About() {
  return (
    <AnimatedSection id="about" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title="Behind the"
          italicWord="brand."
          className="mb-8 md:mb-10"
        />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 lg:items-center">
          {/* Left: Portrait */}
          <motion.div variants={slideInLeft} className="lg:col-span-5">
            <div className="relative">
              <div className="aspect-4/5 rounded-4xl bg-card border border-border overflow-hidden">
                <img
                  src="/jv-paula.jpg"
                  alt="JV Paula Villaflor"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 px-3 py-1 rounded-full bg-brand text-brand-foreground text-[10px] tracking-[0.2em] uppercase">
                Open to work
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div variants={slideInRight} className="lg:col-span-7 divide-y divide-border">
            {/* Identity + bio */}
            <div className="pb-7">
              <p className="eyebrow mb-3">Hi, I&apos;m</p>
              <h3 className="font-display text-4xl md:text-5xl tracking-tight">
                {aboutData.name}
              </h3>
              <p className="mt-2 text-lg text-muted-foreground">
                {aboutData.title} · {aboutData.location}
              </p>
              <p className="mt-5 text-base md:text-lg leading-relaxed text-foreground/80">
                {aboutData.bio}
              </p>
            </div>

            {/* Skills */}
            <div className="py-7">
              <p className="eyebrow mb-3">Skills</p>
              <div className="flex flex-wrap gap-2.5">
                {aboutData.shortSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="text-sm pl-3 pr-3.5 py-1.5 gap-2 bg-card border-border-strong text-foreground/80 transition-colors duration-300 hover:border-brand hover:text-foreground"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand/70" />
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="flex items-start gap-4 pt-7">
              <div className="w-10 h-10 rounded-full bg-paper border border-border flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-brand" />
              </div>
              <div>
                <p className="eyebrow mb-1">Education</p>
                <p className="font-medium text-foreground">
                  {aboutData.education.degree}
                </p>
                <p className="text-sm text-muted-foreground">
                  {aboutData.education.school} · {aboutData.education.period}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
