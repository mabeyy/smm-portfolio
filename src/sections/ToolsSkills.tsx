import { motion } from "framer-motion";
import {
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
import { toolGroups } from "@/data/tools";
import SectionLabel from "@/components/SectionLabel";

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

const ease = [0.22, 1, 0.36, 1] as const;

export default function ToolsSkills() {
  return (
    <section id="toolkit" className="relative py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-8">
        {/* heading */}
        <div className="lg:col-span-4">
          <SectionLabel id="toolkit" />
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05, ease }}
            className="mt-5 font-display text-[clamp(2.75rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.02em]"
          >
            The kit I work <span className="italic text-brand">with.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground"
          >
            Tools chosen because they make the work cleaner — not because they
            look impressive on a slide.
          </motion.p>
        </div>

        {/* groups as rows */}
        <div className="lg:col-span-8 border-t border-border-strong">
          {toolGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: gi * 0.08, ease }}
              className="grid md:grid-cols-[11rem_minmax(0,1fr)] gap-x-8 gap-y-3.5 md:gap-y-4 border-b border-border-strong py-5 md:py-8"
            >
              <h3 className="flex items-baseline gap-3 md:flex-col md:gap-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {group.category}
                <span className="tabular-nums text-muted-soft">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-3 sm:flex sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-3">
                {group.items.map((item) => {
                  const Icon = toolIcons[item];
                  return (
                    <li key={item}>
                      <span className="group flex min-w-0 items-center gap-2 cursor-default">
                        {Icon && (
                          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-muted-soft transition-colors duration-300 group-hover:text-brand" />
                        )}
                        <span className="truncate font-display text-lg sm:text-xl md:text-2xl leading-tight text-foreground transition-colors duration-300 group-hover:italic group-hover:text-brand">
                          {item}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
