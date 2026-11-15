import { motion } from "framer-motion";
import { navLinks } from "@/data/navigation";

const pad = (n: number) => String(n).padStart(2, "0");

/** "01 / 07 —— About": the small numbered label at the top of each section. */
export default function SectionLabel({ id, label }: { id: string; label?: string }) {
  const index = navLinks.findIndex((l) => l.href === `#${id}`);
  const name = label ?? navLinks[index]?.label ?? id;

  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground"
    >
      {index >= 0 && (
        <span className="tabular-nums tracking-[0.15em]">
          <span className="text-foreground">{pad(index + 1)}</span>
          <span className="text-muted-soft"> / {pad(navLinks.length)}</span>
        </span>
      )}
      <span className="h-px w-8 bg-foreground/30" />
      {name}
    </motion.p>
  );
}
