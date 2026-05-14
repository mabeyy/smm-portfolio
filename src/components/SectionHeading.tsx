import { motion } from "framer-motion";
import { fadeInUp } from "@/helpers/motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  italicWord?: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  italicWord,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className={`mb-14 md:mb-20 max-w-3xl ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      {eyebrow && (
        <div
          className={`flex items-center gap-3 mb-5 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-8 bg-foreground/30" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      )}
      <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-tight">
        {title}{" "}
        {italicWord && (
          <span className="italic text-accent">{italicWord}</span>
        )}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base md:text-lg text-muted leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
