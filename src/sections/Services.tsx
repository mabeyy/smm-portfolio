"use client";

import { motion } from "framer-motion";
import {
  Target,
  CalendarDays,
  PenTool,
  Users,
  BarChart3,
  Megaphone,
} from "lucide-react";
import AnimatedSection from "@/components/UI/AnimatedSection";
import SectionHeading from "@/components/UI/SectionHeading";
import Card from "@/components/UI/Card";
import { fadeInUp } from "@/helpers/motion";
import { services } from "@/data/services";

const iconMap: Record<string, React.ReactNode> = {
  Target: <Target className="w-6 h-6 text-accent-amber" />,
  CalendarDays: <CalendarDays className="w-6 h-6 text-accent-amber" />,
  PenTool: <PenTool className="w-6 h-6 text-accent-amber" />,
  Users: <Users className="w-6 h-6 text-accent-amber" />,
  BarChart3: <BarChart3 className="w-6 h-6 text-accent-amber" />,
  Megaphone: <Megaphone className="w-6 h-6 text-accent-amber" />,
};

export default function Services() {
  return (
    <AnimatedSection id="services" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What I Do"
          subtitle="Comprehensive social media services tailored to your brand's unique needs and goals."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <motion.div key={service.title} variants={fadeInUp}>
              <Card className="h-full">
                <div className="w-12 h-12 rounded-lg bg-accent-amber/10 flex items-center justify-center mb-4">
                  {iconMap[service.icon]}
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {service.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
