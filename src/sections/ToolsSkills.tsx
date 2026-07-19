import { motion } from "framer-motion";
import {
  Palette,
  Layers,
  Workflow,
  LayoutTemplate,
  Scissors,
  Wand2,
  Camera,
  Clapperboard,
  PenTool,
  Briefcase,
} from "lucide-react";
import {
  SiInstagram,
  SiFacebook,
  SiTiktok,
  SiTrello,
  SiGoogledrive,
  SiMeta,
} from "react-icons/si";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { fadeInUp, staggerContainer } from "@/helpers/motion";
import { toolGroups } from "@/data/tools";

const iconMap: Record<string, React.ReactNode> = {
  Palette: <Palette className="w-4 h-4" />,
  Layers: <Layers className="w-4 h-4" />,
  Workflow: <Workflow className="w-4 h-4" />,
};

const toolIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Canva: LayoutTemplate,
  CapCut: Scissors,
  "Photo Editing": Wand2,
  "Product Photography": Camera,
  "Video Editing": Clapperboard,
  "Graphic Design": PenTool,
  Instagram: SiInstagram,
  Facebook: SiFacebook,
  TikTok: SiTiktok,
  "Meta Business Suite": SiMeta,
  Trello: SiTrello,
  "Microsoft Office": Briefcase,
  "Google Drive": SiGoogledrive,
};

export default function ToolsSkills() {
  return (
    <AnimatedSection
      id="toolkit"
      className="py-12 md:py-16 bg-paper/60 border-y border-border"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Toolkit"
          title="The kit I work"
          italicWord="with."
          subtitle="Tools chosen because they make the work cleaner — not because they look impressive on a slide."
          className="mb-8 md:mb-10"
        />

        <motion.div
          variants={fadeInUp}
          className="rounded-3xl border border-border bg-card/50 overflow-hidden divide-y divide-border"
        >
          {toolGroups.map((group, i) => (
            <div
              key={group.category}
              className="group/row relative grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)] gap-3 md:gap-12 px-6 py-4 md:px-8 md:py-5 transition-colors duration-500 hover:bg-card"
            >
              {/* Left — index, label, count */}
              <div className="flex items-center gap-4 md:self-center">
                <span className="font-display italic text-3xl md:text-4xl leading-none text-brand/25 transition-colors duration-500 group-hover/row:text-brand/60 select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-8 h-8 shrink-0 rounded-full bg-paper border border-border flex items-center justify-center text-brand">
                  {iconMap[group.icon]}
                </div>
                <div className="min-w-0">
                  <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground leading-snug">
                    {group.category}
                  </h3>
                  <span className="font-mono text-[0.65rem] text-muted-soft">
                    {String(group.items.length).padStart(2, "0")} tools
                  </span>
                </div>
              </div>

              {/* Right — tools as tactile editorial chips */}
              <motion.ul
                variants={staggerContainer}
                className="flex flex-wrap items-center gap-2 md:self-center"
              >
                {group.items.map((item) => {
                  const Icon = toolIcons[item];
                  return (
                    <motion.li
                      key={item}
                      variants={fadeInUp}
                      className="group/tool"
                    >
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card pl-2 pr-3 py-1 cursor-default transition-all duration-300 group-hover/tool:border-brand group-hover/tool:bg-brand group-hover/tool:-translate-y-0.5 group-hover/tool:shadow-[0_6px_20px_-8px] group-hover/tool:shadow-brand/50">
                        {Icon && (
                          <Icon className="w-3 h-3 shrink-0 text-brand transition-colors duration-300 group-hover/tool:text-brand-foreground" />
                        )}
                        <span className="h-2.5 w-px bg-border transition-colors duration-300 group-hover/tool:bg-brand-foreground/25" />
                        <span className="font-display italic text-base md:text-lg leading-none text-foreground transition-colors duration-300 group-hover/tool:text-brand-foreground">
                          {item}
                        </span>
                      </span>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
