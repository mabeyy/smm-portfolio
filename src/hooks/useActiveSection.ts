import { useEffect, useState } from "react";
import { navLinks } from "@/data/navigation";

/** The nav section currently in the middle of the screen, or null above the first one. */
export function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      // a band across the middle of the screen decides the active section
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));

    const first = sections[0];
    const clearAbove = () => {
      if (first && first.getBoundingClientRect().top > window.innerHeight * 0.5) setActive(null);
    };
    clearAbove();
    window.addEventListener("scroll", clearAbove, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", clearAbove);
    };
  }, []);

  return active;
}
