"use client";

import { motion } from "framer-motion";
import { Instagram, Music, Facebook, Linkedin } from "lucide-react";
import AnimatedSection from "@/components/UI/AnimatedSection";
import Badge from "@/components/UI/Badge";
import { fadeInUp, slideInLeft, slideInRight } from "@/helpers/motion";
import { aboutData } from "@/data/about";

const platformIcons: Record<string, React.ReactNode> = {
  Instagram: <Instagram className="w-4 h-4" />,
  TikTok: <Music className="w-4 h-4" />,
  Facebook: <Facebook className="w-4 h-4" />,
  LinkedIn: <Linkedin className="w-4 h-4" />,
};

export default function About() {
  return (
    <AnimatedSection id="about" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Profile Image */}
          <motion.div variants={slideInLeft} className="flex justify-center">
            <div className="relative group">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-card border border-border overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                <div className="text-center text-muted">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-white/5 flex items-center justify-center">
                    <span className="text-3xl">📸</span>
                  </div>
                  <p className="text-sm">Your Photo Here</p>
                </div>
              </div>
              {/* Decorative rings */}
              <div className="absolute -inset-3 rounded-full border border-white/10 -z-10 transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute -inset-6 rounded-full border border-white/5 -z-10 transition-transform duration-700 group-hover:scale-105" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div variants={slideInRight} className="space-y-6">
            <div>
              <p className="text-muted font-medium text-sm tracking-[0.3em] uppercase mb-2">
                Hi, I&apos;m
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                {aboutData.name}
              </h2>
              <p className="text-xl md:text-2xl text-muted font-semibold mt-1">
                {aboutData.title}
              </p>
            </div>

            <p className="text-muted leading-relaxed">{aboutData.bio}</p>

            <p className="text-lg font-medium italic text-white/80 border-l-2 border-white/20 pl-4">
              &ldquo;{aboutData.valueStatement}&rdquo;
            </p>

            {/* Platforms */}
            <div>
              <p className="text-sm text-muted mb-2 font-medium">
                Platforms I Specialize In
              </p>
              <div className="flex flex-wrap gap-2">
                {aboutData.platforms.map((platform) => (
                  <Badge key={platform.name} variant="outline">
                    {platformIcons[platform.name]}
                    {platform.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                variants={fadeInUp}
                className="bg-card border border-border rounded-xl p-4"
              >
                <p className="text-2xl font-bold text-white">
                  {aboutData.experience}
                </p>
                <p className="text-sm text-muted">Experience</p>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="bg-card border border-border rounded-xl p-4"
              >
                <p className="text-2xl font-bold text-white">
                  {aboutData.industries.length}+
                </p>
                <p className="text-sm text-muted">Industries</p>
              </motion.div>
            </div>

            {/* Strategy style */}
            <div>
              <p className="text-sm text-muted mb-2 font-medium">
                My Approach
              </p>
              <div className="flex flex-wrap gap-2">
                {aboutData.strategyStyle.map((style) => (
                  <Badge key={style} variant="outline">
                    {style}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <p className="text-sm text-muted mb-2 font-medium">
                Tools I Use
              </p>
              <div className="flex flex-wrap gap-2">
                {aboutData.tools.map((tool) => (
                  <Badge key={tool}>{tool}</Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
