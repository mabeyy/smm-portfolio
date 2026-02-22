"use client";

import { motion } from "framer-motion";
import { Clock, BarChart, Palette, TrendingUp } from "lucide-react";
import AnimatedSection from "@/components/UI/AnimatedSection";
import SectionHeading from "@/components/UI/SectionHeading";
import Card from "@/components/UI/Card";
import Marquee from "@/components/UI/Marquee";
import { fadeInUp } from "@/helpers/motion";
import { toolCategories } from "@/data/tools";

const iconMap: Record<string, React.ReactNode> = {
  Clock: <Clock className="w-5 h-5 text-white" />,
  BarChart: <BarChart className="w-5 h-5 text-white" />,
  Palette: <Palette className="w-5 h-5 text-white" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-white" />,
};

const allTools = toolCategories.flatMap((cat) =>
  cat.items.map((item) => item.name)
);

export default function ToolsSkills() {
  return (
    <AnimatedSection id="tools" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Tools & Skills"
          subtitle="The platforms and tools I use to deliver results for every project."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {toolCategories.map((cat) => (
            <motion.div key={cat.category} variants={fadeInUp}>
              <Card className="h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    {iconMap[cat.icon]}
                  </div>
                  <h3 className="font-semibold">{cat.category}</h3>
                </div>
                <div className="space-y-4">
                  {cat.items.map((item) => (
                    <div key={item.name}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-muted">{item.name}</span>
                        <span className="text-xs text-muted">{item.level}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-white"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.level}%` }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <Marquee items={allTools} className="mt-16 py-6 border-y border-border" />
    </AnimatedSection>
  );
}
