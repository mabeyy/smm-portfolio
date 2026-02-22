"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/UI/AnimatedSection";
import SectionHeading from "@/components/UI/SectionHeading";
import Card from "@/components/UI/Card";
import Badge from "@/components/UI/Badge";
import { fadeInUp } from "@/helpers/motion";
import { caseStudies } from "@/data/caseStudies";

export default function CaseStudies() {
  return (
    <AnimatedSection id="case-studies" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Case Studies"
          subtitle="Real results from real brands. Here's how I helped clients achieve their social media goals."
        />

        <div className="space-y-8">
          {caseStudies.map((study) => (
            <motion.div key={study.id} variants={fadeInUp}>
              <Card hover={false} className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left: Image placeholder */}
                  <div className="aspect-video md:aspect-square rounded-xl bg-card-hover border border-border flex items-center justify-center overflow-hidden">
                    <div className="text-center text-muted p-6">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/5 flex items-center justify-center">
                        <span className="text-2xl">📊</span>
                      </div>
                      <p className="text-sm font-medium">{study.client}</p>
                      <p className="text-xs mt-1">{study.industry}</p>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="space-y-4">
                    <div>
                      <Badge variant="outline" className="mb-2">
                        {study.industry}
                      </Badge>
                      <h3 className="text-2xl font-bold">{study.client}</h3>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white mb-1">
                        Goal
                      </p>
                      <p className="text-muted text-sm">{study.goal}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white mb-1">
                        Strategy
                      </p>
                      <p className="text-muted text-sm">{study.strategy}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {study.platforms.map((platform) => (
                        <Badge key={platform}>
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Results grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border">
                  {study.results.map((result) => (
                    <motion.div
                      key={result.label}
                      className="text-center"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="text-xl md:text-2xl font-bold text-white">
                        {result.value}
                      </p>
                      <p className="text-xs md:text-sm text-muted mt-1">
                        {result.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
