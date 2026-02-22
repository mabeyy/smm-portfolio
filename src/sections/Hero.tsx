"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { type MouseEvent } from "react";
import Button from "@/components/UI/Button";

export default function Hero() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const blob1X = useSpring(useTransform(mouseX, [0, 1], [-40, 40]), { stiffness: 50, damping: 20 });
  const blob1Y = useSpring(useTransform(mouseY, [0, 1], [-40, 40]), { stiffness: 50, damping: 20 });
  const blob2X = useSpring(useTransform(mouseX, [0, 1], [30, -30]), { stiffness: 50, damping: 20 });
  const blob2Y = useSpring(useTransform(mouseY, [0, 1], [30, -30]), { stiffness: 50, damping: 20 });
  const blob3X = useSpring(useTransform(mouseX, [0, 1], [-20, 20]), { stiffness: 50, damping: 20 });
  const blob3Y = useSpring(useTransform(mouseY, [0, 1], [20, -20]), { stiffness: 50, damping: 20 });

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Mouse-reactive background blobs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 rounded-full bg-white/3 blur-3xl"
          style={{ x: blob1X, y: blob1Y }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 rounded-full bg-white/4 blur-3xl"
          style={{ x: blob2X, y: blob2Y }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 rounded-full bg-white/2 blur-3xl"
          style={{ x: blob3X, y: blob3Y }}
        />
      </div>

      {/* Grid lines decoration */}
      <div className="absolute inset-0 -z-10 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-muted font-medium text-sm md:text-base tracking-[0.3em] uppercase mb-6"
        >
          Social Media Manager
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
        >
          Your Brand&apos;s Social Media,{" "}
          <span className="relative">
            <span className="gradient-text">Elevated</span>
            <motion.span
              className="absolute -bottom-2 left-0 h-px bg-white/40"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 1 }}
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed"
        >
          Data-driven strategies that turn scrollers into followers, and
          followers into loyal customers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="#contact" size="lg">
            Let&apos;s Work Together
          </Button>
          <Button href="#case-studies" variant="outline" size="lg">
            See My Work
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border border-white/20 rounded-full flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1 h-1 rounded-full bg-white" />
        </motion.div>
      </motion.div>
    </section>
  );
}
