"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Instagram, Linkedin } from "lucide-react";
import AnimatedSection from "@/components/UI/AnimatedSection";
import SectionHeading from "@/components/UI/SectionHeading";
import Button from "@/components/UI/Button";
import { fadeInUp, slideInLeft, slideInRight } from "@/helpers/motion";

export default function Contact() {
  return (
    <AnimatedSection id="contact" className="py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Let's Work Together"
          subtitle="Ready to elevate your brand's social media presence? I'd love to hear about your project."
        />

        <div className="grid md:grid-cols-2 gap-12 mt-8">
          {/* Left: Contact info */}
          <motion.div variants={slideInLeft} className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <p className="text-muted leading-relaxed">
                Whether you need a full social media strategy or help with a
                specific campaign, I&apos;m here to help your brand grow.
              </p>
            </div>

            <div className="space-y-4">
              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted">Email</p>
                  <p className="font-medium">hello@jvvillaflor.com</p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted">Location</p>
                  <p className="font-medium">Available Worldwide (Remote)</p>
                </div>
              </motion.div>
            </div>

            <div>
              <p className="text-sm text-muted mb-3 font-medium">
                Follow Me
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted hover:text-white hover:border-white/20 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted hover:text-white hover:border-white/20 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div variants={slideInRight}>
            <form
              className="space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 text-white placeholder:text-muted/50 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 text-white placeholder:text-muted/50 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full bg-card border border-border rounded-lg px-4 py-3 text-white placeholder:text-muted/50 focus:outline-none focus:border-white/30 transition-colors resize-none"
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
