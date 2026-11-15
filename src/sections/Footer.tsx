import { useEffect, useState } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { aboutData } from "@/data/about";

const EMAIL = "villaflorjvpaula@gmail.com";

const timeFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Manila",
  hour: "numeric",
  minute: "2-digit",
});

/* ---------- current time in Cagayan de Oro ---------- */
function LocalTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  return <span className="tabular-nums">{timeFormat.format(now)}</span>;
}

export default function Footer() {
  const elsewhere = [
    { label: "LinkedIn", href: aboutData.linkedin, external: true },
    { label: "Instagram", href: aboutData.instagram, external: true },
    { label: "Email", href: `mailto:${EMAIL}`, external: false },
  ];

  return (
    <footer className="border-t border-border-strong bg-paper/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8 md:gap-y-10 max-md:text-center">
          {/* identity */}
          <div className="md:col-span-5">
            <a
              href="#"
              aria-label="Back to top"
              className="font-display text-4xl italic leading-none text-foreground"
            >
              JV
            </a>
            <p className="mt-3 md:mt-4 max-w-sm max-md:mx-auto text-[0.95rem] md:text-base leading-relaxed text-muted-foreground">
              Multidisciplinary creative — graphic design, photography, video,
              and art direction for brands with something to say.
            </p>
          </div>

          {/* index */}
          <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Index
            </p>
            <ul className="mt-3 md:mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-foreground transition-colors hover:text-brand"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* elsewhere */}
          <div className="md:col-span-3 md:col-start-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Elsewhere
            </p>
            <ul className="mt-3 md:mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 md:block md:space-y-2.5">
              {elsewhere.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group inline-flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-brand"
                  >
                    {l.label}
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-soft transition-all duration-300 group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* bottom line */}
        <div className="mt-10 md:mt-16 pt-6 border-t border-border flex flex-col items-center gap-2 sm:flex-row sm:justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-muted-foreground text-center">
          <p>© {new Date().getFullYear()} {aboutData.name}</p>
          <p>
            Cagayan de Oro · <LocalTime /> local time
          </p>
          <a
            href="#"
            className="group order-first sm:order-none mb-3 sm:mb-0 inline-flex items-center gap-2 rounded-full border border-border-strong sm:border-0 px-4 py-2 sm:p-0 text-foreground transition-colors hover:text-brand"
          >
            Back to top
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
