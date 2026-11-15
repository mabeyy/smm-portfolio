import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { fadeInUp, slideInLeft, slideInRight } from "@/helpers/motion";
import { aboutData } from "@/data/about";

const EMAIL = "villaflorjvpaula@gmail.com";

const details: { label: string; value: string; href?: string; nowrap?: boolean }[] = [
  { label: "Phone", value: "+63 997 356 9859", href: "tel:+639973569859", nowrap: true },
  { label: "Based in", value: "Cagayan de Oro" },
  { label: "Replies", value: "Within a working day" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <AnimatedSection id="contact" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          number="07 / 07"
          title="Let's make"
          italicWord="something."
          subtitle="Got an idea, a shoot, or a brand that needs a new look? Send a quick note and I'll get back within a working day."
          className="mb-6 md:mb-10 [&_p]:max-sm:text-[0.95rem] [&_p]:max-sm:mt-3"
        />

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left: Contact info */}
          <motion.div variants={slideInLeft} className="lg:col-span-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-hover/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-hover" />
              </span>
              Open for projects
            </span>

            <p className="mt-6 sm:mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Write to me
            </p>
            <div className="mt-2 sm:mt-3 flex items-center justify-between sm:justify-start gap-x-4 gap-y-2">
              <a
                href={`mailto:${EMAIL}`}
                className="group relative min-w-0 font-display text-[1.45rem] sm:text-[clamp(1.6rem,2.4vw,2.1rem)] leading-tight text-foreground break-all"
              >
                {EMAIL}
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-foreground origin-right scale-x-0 transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-border-strong px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-brand-hover" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <dl className="mt-6 sm:mt-8 sm:grid sm:grid-cols-3 border-t sm:border-y border-border-strong">
              {details.map((d, i) => (
                <motion.div
                  key={d.label}
                  variants={fadeInUp}
                  className={`flex items-baseline justify-between gap-4 border-b border-border py-3 sm:block sm:border-b-0 sm:py-5 ${i > 0 ? "sm:border-l sm:border-border sm:pl-5" : "sm:pr-3"}`}
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {d.label}
                  </dt>
                  <dd className={`sm:mt-2 text-sm leading-snug text-right sm:text-left text-foreground ${d.nowrap ? "whitespace-nowrap" : ""}`}>
                    {d.href ? (
                      <a href={d.href} className="hover:text-brand transition-colors">
                        {d.value}
                      </a>
                    ) : (
                      d.value
                    )}
                  </dd>
                </motion.div>
              ))}
            </dl>

            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-x-8 gap-y-3">
              {[
                { label: "LinkedIn", href: aboutData.linkedin },
                { label: "Instagram", href: aboutData.instagram },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 font-display text-xl text-foreground"
                >
                  <span className="transition-all duration-300 group-hover:italic group-hover:text-brand">
                    {l.label}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-all duration-300 group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div variants={slideInRight} className="lg:col-span-3">
            <form
              className="sm:bg-card sm:border sm:border-border sm:rounded-3xl sm:p-6 md:p-8 space-y-4 sm:space-y-5 max-sm:border-t max-sm:border-border-strong max-sm:pt-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="eyebrow">
                    Name
                  </Label>
                  <Input id="name" type="text" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="eyebrow">
                    Email
                  </Label>
                  <Input id="email" type="email" placeholder="you@brand.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand" className="eyebrow">
                  Brand / Project
                </Label>
                <Input
                  id="brand"
                  type="text"
                  placeholder="Name & link (optional)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="eyebrow">
                  Project
                </Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="Tell me about the idea, the timeline, and what you're picturing…"
                  className="resize-none"
                />
              </div>
              <Button type="submit" className="w-full rounded-full h-12 sm:h-10 sm:rounded-md" size="lg">
                Send the note
              </Button>
              <p className="hidden sm:block text-xs text-muted-foreground text-center pt-1">
                Or just email{" "}
                <a
                  href={`mailto:${EMAIL}`}
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  {EMAIL}
                </a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
