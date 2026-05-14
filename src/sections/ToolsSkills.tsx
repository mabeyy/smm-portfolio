import { motion } from "framer-motion";
import { Palette, Layers, Workflow } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import Marquee from "@/components/Marquee";
import { fadeInUp } from "@/helpers/motion";
import { toolGroups } from "@/data/tools";

const iconMap: Record<string, React.ReactNode> = {
  Palette: <Palette className="w-4 h-4" />,
  Layers: <Layers className="w-4 h-4" />,
  Workflow: <Workflow className="w-4 h-4" />,
};

const marqueeItems = toolGroups.flatMap((g) => g.items);

export default function ToolsSkills() {
  return (
    <AnimatedSection
      id="toolkit"
      className="py-24 md:py-36 bg-paper/60 border-y border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Toolkit"
          title="The kit I work"
          italicWord="with."
          subtitle="Tools chosen because they make the work cleaner — not because they look impressive on a slide."
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {toolGroups.map((group) => (
            <motion.div
              key={group.category}
              variants={fadeInUp}
              className="bg-card border border-border rounded-3xl p-7 md:p-8 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-full bg-paper border border-border flex items-center justify-center text-brand">
                  {iconMap[group.icon]}
                </div>
                <h3 className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                  {group.category}
                </h3>
              </div>

              <ul className="space-y-3 mt-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="font-display italic text-2xl text-foreground leading-tight">
                      {item}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      ✦
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <Marquee
        items={marqueeItems}
        className="mt-20 py-6 border-y border-border bg-background"
      />
    </AnimatedSection>
  );
}
