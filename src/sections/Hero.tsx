import { motion } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 md:pt-32 pb-16 overflow-hidden">
      {/* Subtle decorative paper texture using radial gradients */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(107,122,94,0.06), transparent 40%), radial-gradient(circle at 80% 70%, rgba(28,22,17,0.04), transparent 40%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          {/* Left: Editorial title block */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-px w-10 bg-foreground/40" />
              <span className="eyebrow">Portfolio · 2026</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] tracking-tight"
            >
              JV Paula <br />
              <span className="italic text-accent">Villaflor</span>
              <span className="text-foreground">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-8 max-w-xl text-base md:text-lg text-muted leading-relaxed"
            >
              Social Media Manager building cohesive, organic-first brand
              presences for lifestyle and product brands — content planning,
              visual branding, and the calm consistency that turns scrollers
              into regulars.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <Button asChild size="lg">
                <a href="#contact">Start a project</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#experience">See recent work</a>
              </Button>
            </motion.div>
          </div>

          {/* Right: meta info column */}
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-4 space-y-8 lg:pl-6 lg:border-l lg:border-border"
          >
            <div>
              <p className="eyebrow mb-3">Currently</p>
              <p className="text-foreground text-lg leading-snug">
                Open for new freelance and contract engagements through Q3 2026.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="font-display text-4xl text-foreground">250K+</p>
                <p className="text-xs text-muted mt-1 tracking-wide">
                  Peak organic views on a single post
                </p>
              </div>
              <div>
                <p className="font-display text-4xl text-foreground">33K+</p>
                <p className="text-xs text-muted mt-1 tracking-wide">
                  Engagements without ad spend
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted">
              <MapPin className="w-4 h-4" />
              Cagayan de Oro · Open to remote
            </div>
          </motion.aside>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-20 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted"
        >
          <ArrowDown className="w-4 h-4 animate-bounce" />
          Scroll for the work
        </motion.div>
      </div>
    </section>
  );
}
