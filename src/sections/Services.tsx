import { motion } from "framer-motion";
import {
  Target,
  CalendarDays,
  PenTool,
  Users,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { fadeInUp } from "@/helpers/motion";
import { services } from "@/data/services";

const iconMap: Record<string, React.ReactNode> = {
  Target: <Target className="w-5 h-5" />,
  CalendarDays: <CalendarDays className="w-5 h-5" />,
  PenTool: <PenTool className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
};

export default function Services() {
  return (
    <AnimatedSection
      id="services"
      className="py-12 md:py-16 bg-paper/60 border-y border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title="How I help brands"
          italicWord="grow."
          subtitle="A focused offering for lifestyle, product, and service brands who want a consistent, organic-first social presence."
          className="mb-8 md:mb-10"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden border border-border">
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              variants={fadeInUp}
              className="group bg-card hover:bg-card-hover transition-colors duration-500 p-6 md:p-7 flex flex-col"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-9 h-9 rounded-full bg-paper border border-border flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-brand-foreground group-hover:border-brand transition-all duration-500">
                  {iconMap[service.icon]}
                </div>
              </div>

              <h3 className="font-display text-2xl leading-tight tracking-tight mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.article>
          ))}

          {/* CTA cell — fills the grid and nudges contact */}
          <motion.a
            variants={fadeInUp}
            href="#contact"
            className="group bg-card hover:bg-card-hover transition-colors duration-500 p-6 md:p-7 flex flex-col justify-between"
          >
            <div className="flex items-center justify-end mb-5">
              <div className="w-9 h-9 rounded-full bg-brand text-brand-foreground border border-brand flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="font-display text-2xl leading-tight tracking-tight mb-2">
                Something else in mind?
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Tell me about your brand — let&apos;s talk.
              </p>
            </div>
          </motion.a>
        </div>
      </div>
    </AnimatedSection>
  );
}
