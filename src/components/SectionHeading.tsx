import { motion } from "framer-motion";
import { fadeInUp } from "@/helpers/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  italicWord?: string;
  subtitle?: string;
  /** e.g. "07 / 07" */
  number?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  italicWord,
  subtitle,
  number,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className={cn(
        "mb-14 md:mb-20 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div
          className={`flex items-center gap-3 mb-5 font-mono ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          {number && (
            <span className="font-mono text-[11px] tabular-nums tracking-[0.15em] text-muted-soft">
              <span className="text-foreground">{number.split(" / ")[0]}</span>
              {number.includes(" / ") && <> / {number.split(" / ")[1]}</>}
            </span>
          )}
          <span className="h-px w-8 bg-foreground/30" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      )}
      <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-tight">
        {title}{" "}
        {italicWord && (
          <span className="italic text-brand">{italicWord}</span>
        )}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
