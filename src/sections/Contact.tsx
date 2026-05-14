import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Instagram } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { fadeInUp, slideInLeft, slideInRight } from "@/helpers/motion";

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "villaflorjvpaula@gmail.com",
    href: "mailto:villaflorjvpaula@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+63 997 356 9859",
    href: "tel:+639973569859",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "Cagayan de Oro, Philippines",
    href: null,
  },
];

export default function Contact() {
  return (
    <AnimatedSection id="contact" className="py-24 md:py-36">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's make"
          italicWord="something."
          subtitle="Have a brand that needs a calmer, more cohesive feed? Send a quick note and I'll get back within a working day."
        />

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left: Contact info */}
          <motion.div variants={slideInLeft} className="lg:col-span-2 space-y-10">
            <div>
              <p className="eyebrow mb-3">Reach me directly</p>
              <ul className="space-y-5">
                {contactDetails.map((d) => {
                  const Icon = d.icon;
                  const inner = (
                    <>
                      <div className="w-10 h-10 rounded-full bg-paper border border-border flex items-center justify-center shrink-0 text-accent">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="eyebrow mb-1">{d.label}</p>
                        <p className="font-medium text-foreground">
                          {d.value}
                        </p>
                      </div>
                    </>
                  );
                  return (
                    <motion.li
                      key={d.label}
                      variants={fadeInUp}
                      className="flex items-start gap-4"
                    >
                      {d.href ? (
                        <a
                          href={d.href}
                          className="flex items-start gap-4 hover:text-accent transition-colors"
                        >
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-3">Follow along</p>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-strong hover:bg-foreground hover:text-background transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                  <span className="text-sm">Instagram</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div variants={slideInRight} className="lg:col-span-3">
            <form
              className="bg-card border border-border rounded-3xl p-6 md:p-8 space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs text-muted uppercase tracking-[0.2em] mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-background border border-border rounded-full px-5 py-3 text-foreground placeholder:text-muted/60 focus:outline-none focus:border-foreground/40 transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs text-muted uppercase tracking-[0.2em] mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@brand.com"
                    className="w-full bg-background border border-border rounded-full px-5 py-3 text-foreground placeholder:text-muted/60 focus:outline-none focus:border-foreground/40 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="brand"
                  className="block text-xs text-muted uppercase tracking-[0.2em] mb-2"
                >
                  Brand
                </label>
                <input
                  id="brand"
                  type="text"
                  placeholder="Brand name & link (optional)"
                  className="w-full bg-background border border-border rounded-full px-5 py-3 text-foreground placeholder:text-muted/60 focus:outline-none focus:border-foreground/40 transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs text-muted uppercase tracking-[0.2em] mb-2"
                >
                  Project
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell me a little about the brand and what you're looking for…"
                  className="w-full bg-background border border-border rounded-3xl px-5 py-4 text-foreground placeholder:text-muted/60 focus:outline-none focus:border-foreground/40 transition-colors resize-none"
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Send the note
              </Button>
              <p className="text-xs text-muted text-center pt-1">
                Or just email{" "}
                <a
                  href="mailto:villaflorjvpaula@gmail.com"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  villaflorjvpaula@gmail.com
                </a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
