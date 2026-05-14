import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-px bg-foreground/60 origin-left z-60"
        style={{ scaleX }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/85 backdrop-blur-lg border-b border-border"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-baseline gap-1 group">
            <span className="font-display text-2xl md:text-3xl italic leading-none text-foreground">
              JV
            </span>
            <span className="font-display text-2xl md:text-3xl italic leading-none text-brand">
              .
            </span>
            <span className="hidden sm:inline text-xs tracking-[0.28em] uppercase text-muted-foreground ml-2 group-hover:text-foreground transition-colors">
              Villaflor
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden md:inline-flex rounded-full"
          >
            <a href="#contact">
              Let&apos;s talk
              <span className="text-brand">→</span>
            </a>
          </Button>

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
              className="w-full sm:max-w-sm bg-background border-l border-border p-6 pt-12"
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <p className="eyebrow mb-8">Menu</p>
              <ul className="space-y-5">
                {navLinks.map((link, i) => (
                  <li
                    key={link.href}
                    className="flex items-baseline gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-xs text-muted-foreground font-mono">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="font-display italic text-2xl text-foreground hover:text-brand transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="w-full mt-10 rounded-full"
                onClick={() => setOpen(false)}
              >
                <a href="#contact">Let&apos;s talk</a>
              </Button>
            </SheetContent>
          </Sheet>
        </nav>
      </header>
    </>
  );
}
