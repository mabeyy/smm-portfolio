import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { aboutData } from "@/data/about";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/useActiveSection";

const EMAIL = "villaflorjvpaula@gmail.com";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const active = useActiveSection();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // compact once scrolled; slide away on the way down, back on the way up
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 30);
      setHidden(y > lastY.current && y > 400);
      lastY.current = y;
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-px bg-foreground/60 origin-left z-60"
        style={{ scaleX }}
      />

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent",
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <nav
          className={cn(
            "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-[height] duration-500",
            isScrolled ? "h-14 md:h-16" : "h-16 md:h-20"
          )}
        >
          <a
            href="#"
            aria-label="JV Paula Villaflor — back to top"
            className="font-display text-2xl md:text-3xl italic leading-none text-foreground transition-opacity hover:opacity-70"
          >
            JV
          </a>

          <ul className="hidden md:flex items-center gap-1 rounded-full p-1">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="navActive"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-foreground/[0.07]"
                    />
                  )}
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative block px-3.5 py-1.5 text-sm transition-colors duration-300",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href="#contact"
            className="group hidden md:inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm text-background transition-colors hover:bg-brand"
          >
            Let&apos;s talk
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden -mr-2"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:max-w-sm bg-background border-l border-border p-6 pt-14 flex flex-col"
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Menu
              </p>
              <ul className="mt-6 border-t border-border">
                {navLinks.map((link, i) => {
                  const isActive = active === link.href;
                  return (
                    <li key={link.href} className="border-b border-border">
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline gap-4 py-3.5"
                      >
                        <span className="font-mono text-[11px] tabular-nums text-muted-soft">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "font-display text-3xl leading-none transition-colors",
                            isActive ? "italic text-brand" : "text-foreground hover:text-brand"
                          )}
                        >
                          {link.label}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto pt-8">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-full bg-foreground px-5 py-3 text-sm text-background"
                >
                  Let&apos;s talk
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="mt-5 block text-center text-sm text-muted-foreground"
                >
                  {EMAIL}
                </a>
                <div className="mt-3 flex justify-center gap-6 text-sm text-foreground">
                  <a href={aboutData.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                  <a href={aboutData.instagram} target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </header>
    </>
  );
}
