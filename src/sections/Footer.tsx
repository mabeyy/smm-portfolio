import { navLinks } from "@/data/navigation";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-paper/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-3 gap-10 md:gap-12 mb-14">
          <div className="md:col-span-2 max-w-xl">
            <a
              href="#"
              className="font-display italic text-4xl md:text-5xl text-foreground leading-none"
            >
              JV<span className="text-accent">.</span>
            </a>
            <p className="mt-5 text-muted leading-relaxed">
              Social Media Manager — content planning, visual branding, and
              organic-first growth for lifestyle and product brands.
            </p>
            <p className="mt-4 text-sm text-muted">
              villaflorjvpaula@gmail.com · +63 997 356 9859
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4">Sitemap</p>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-foreground hover:text-accent transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-muted">
          <p>
            &copy; {new Date().getFullYear()} JV Paula Villaflor. All rights
            reserved.
          </p>
          <p className="font-mono">
            Cagayan de Oro · Open to remote engagements
          </p>
        </div>
      </div>
    </footer>
  );
}
