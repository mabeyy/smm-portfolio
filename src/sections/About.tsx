import { motion } from "framer-motion";
import { GraduationCap, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { slideInLeft, slideInRight } from "@/helpers/motion";
import { aboutData } from "@/data/about";

export default function About() {
  return (
    <AnimatedSection id="about" className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title="Quiet strategy."
          italicWord="Loud results."
        />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Portrait / Mark */}
          <motion.div variants={slideInLeft} className="lg:col-span-5">
            <div className="relative">
              <div className="aspect-[4/5] rounded-[2rem] bg-card border border-border overflow-hidden flex items-center justify-center">
                <div className="text-center px-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-paper border border-border flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-accent" />
                  </div>
                  <p className="font-display italic text-3xl text-foreground leading-tight">
                    Add your portrait
                  </p>
                  <p className="text-xs text-muted mt-3 tracking-wide">
                    Drop a photo into the placeholder
                  </p>
                </div>
              </div>
              {/* corner mark */}
              <div className="absolute -top-3 -left-3 px-3 py-1 rounded-full bg-foreground text-background text-[10px] tracking-[0.2em] uppercase">
                JV · 26
              </div>
              <div className="absolute -bottom-3 -right-3 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] tracking-[0.2em] uppercase">
                Open
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div variants={slideInRight} className="lg:col-span-7 space-y-10">
            <div>
              <p className="eyebrow mb-3">Hi, I&apos;m</p>
              <h3 className="font-display text-4xl md:text-5xl tracking-tight">
                {aboutData.name}
              </h3>
              <p className="mt-2 text-lg text-muted">
                {aboutData.title} · {aboutData.location}
              </p>
            </div>

            <p className="text-base md:text-lg leading-relaxed text-foreground/80">
              {aboutData.bio}
            </p>

            <blockquote className="font-display italic text-2xl md:text-3xl leading-snug border-l-2 border-accent pl-5 text-foreground">
              &ldquo;{aboutData.valueStatement}&rdquo;
            </blockquote>

            {/* Short skills */}
            <div>
              <p className="eyebrow mb-3">Short skills</p>
              <div className="flex flex-wrap gap-2">
                {aboutData.shortSkills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Core competencies */}
            <div>
              <p className="eyebrow mb-3">Core competencies</p>
              <div className="flex flex-wrap gap-2">
                {aboutData.competencies.map((c) => (
                  <Badge key={c}>{c}</Badge>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="flex items-start gap-4 pt-4 border-t border-border">
              <div className="w-10 h-10 rounded-full bg-paper border border-border flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="eyebrow mb-1">Education</p>
                <p className="font-medium text-foreground">
                  {aboutData.education.degree}
                </p>
                <p className="text-sm text-muted">
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
