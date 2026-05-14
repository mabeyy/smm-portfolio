import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";
import { staggerContainer } from "@/helpers/motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function AnimatedSection({
  children,
  className = "",
  id,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.section>
  );
}
