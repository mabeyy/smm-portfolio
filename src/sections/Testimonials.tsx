"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import AnimatedSection from "@/components/UI/AnimatedSection";
import SectionHeading from "@/components/UI/SectionHeading";
import Card from "@/components/UI/Card";
import { fadeInUp } from "@/helpers/motion";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <AnimatedSection id="testimonials" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What Clients Say"
          subtitle="Don't just take my word for it — hear from the brands I've worked with."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={fadeInUp}>
              <Card className="h-full flex flex-col">
                <Quote className="w-8 h-8 text-white/20 mb-4" />
                <p className="text-muted leading-relaxed flex-1 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-6 pt-4 border-t border-border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-white">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
