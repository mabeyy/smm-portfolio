import { motion } from "framer-motion";
import {
  Target,
  CalendarDays,
  PenTool,
  Users,
  BarChart3,
  Megaphone,
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
  Megaphone: <Megaphone className="w-5 h-5" />,
};

export default function Services() {
  return (
    <AnimatedSection
      id="services"
      className="py-24 md:py-36 bg-paper/60 border-y border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title="How I help brands"
          italicWord="grow."
          subtitle="A focused offering for lifestyle, product, and service brands who want a consistent, organic-first social presence."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden border border-border">
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              variants={fadeInUp}
              className="group bg-card hover:bg-card-hover transition-colors duration-500 p-8 md:p-10 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-10 h-10 rounded-full bg-paper border border-border flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-brand-foreground group-hover:border-brand transition-all duration-500">
                  {iconMap[service.icon]}
                </div>
              </div>

              <h3 className="font-display text-2xl md:text-3xl leading-tight tracking-tight mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
