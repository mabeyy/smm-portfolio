import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { navLinks } from "@/data/navigation";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
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
            <span className="font-display text-2xl md:text-3xl italic leading-none text-accent">
              .
            </span>
            <span className="hidden sm:inline text-xs tracking-[0.28em] uppercase text-muted ml-2 group-hover:text-foreground transition-colors">
              Villaflor
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative text-sm text-muted hover:text-foreground transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium px-5 py-2 rounded-full border border-foreground/15 hover:border-foreground/40 transition-all duration-300"
          >
            Let&apos;s talk
            <span className="text-accent">→</span>
          </a>

          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-px bg-foreground transition-all duration-300 ${
                  isMobileOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-px bg-foreground transition-all duration-300 ${
                  isMobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px bg-foreground transition-all duration-300 ${
                  isMobileOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </nav>

        <MobileMenu
          isOpen={isMobileOpen}
          onClose={() => setIsMobileOpen(false)}
        />
      </header>
    </>
  );
}
