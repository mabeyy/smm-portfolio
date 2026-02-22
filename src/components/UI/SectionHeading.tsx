"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/helpers/motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">{subtitle}</p>
      )}
      <div className="mt-4 h-0.5 w-16 rounded-full bg-white/30 mx-auto" />
    </motion.div>
  );
}
