import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { aboutData } from "@/data/about";
import { experiences } from "@/data/caseStudies";
import SectionLabel from "@/components/SectionLabel";

const ease = [0.22, 1, 0.36, 1] as const;

export default function About() {
  const reduce = useReducedMotion();
  const portraitRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: portraitProgress } = useScroll({
    target: portraitRef,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(portraitProgress, [0, 1], ["-8%", "8%"]);

  const location = aboutData.location.split(",")[0].replace(/ City$/, "");

  const details = [
    { label: "Based in", value: `${location}, PH`, sub: "Open to remote" },
    {
      label: "Education",
      value: "BS Computer Science",
      sub: `USTSP · ${aboutData.education.period.split(" ").pop()}`,
    },
    { label: "Status", value: "Open to work", sub: "Freelance & contract", live: true },
  ];

  return (
    <section id="about" className="relative pt-14 pb-6 md:pt-32 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          {/* portrait */}
          <motion.figure
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="lg:col-span-5"
          >
            <div
              ref={portraitRef}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper"
            >
              <motion.img
                src="/jv-paula.jpg"
                alt={aboutData.name}
                loading="lazy"
                style={{ y: reduce ? 0 : portraitY }}
                className="absolute inset-0 h-[116%] -top-[8%] w-full object-cover"
              />
            </div>
            <figcaption className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <span>Fig. — {aboutData.name}</span>
              <span className="hidden sm:inline">{location}</span>
            </figcaption>
          </motion.figure>

          {/* intro + details */}
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-between gap-8 sm:gap-12">
            <div>
              <SectionLabel id="about" />

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: 0.1, ease }}
                className="mt-5 sm:mt-6 font-display text-[1.45rem] sm:text-[clamp(1.6rem,2.6vw,2.5rem)] leading-[1.3] sm:leading-[1.25] tracking-[-0.01em] text-foreground"
              >
                Hi, I&apos;m JV. I make{" "}
                <em className="text-brand">designs</em>,{" "}
                <em className="text-brand">photos</em>, and{" "}
                <em className="text-brand">short videos</em> for brands. I help them
                look good and feel like themselves, from the first idea to the
                finished post.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: 0.25, ease }}
                className="mt-4 sm:mt-6 max-w-xl text-[0.95rem] sm:text-base md:text-lg leading-relaxed text-muted-foreground"
              >
                Lately I&apos;ve worked with{" "}
                {experiences.map((e, i) => (
                  <span key={e.id}>
                    <span className="text-foreground">{e.client}</span>
                    {i < experiences.length - 2 ? ", " : i === experiences.length - 2 ? ", and " : ""}
                  </span>
                ))}
                {" "}— planning their pages, taking photos, and making videos from the ground up.
              </motion.p>
            </div>

            <div>
              <dl className="grid sm:grid-cols-3 sm:gap-8 border-t border-border-strong sm:pt-6">
                {details.map((d, i) => (
                  <motion.div
                    key={d.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease }}
                    className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-baseline border-b border-border py-3.5 sm:block sm:border-0 sm:py-0"
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-muted-foreground">
                      {d.label}
                    </dt>
                    <dd className="sm:mt-2.5 flex items-center gap-2 text-[0.95rem] sm:text-base text-foreground">
                      {d.live && (
                        <span className="relative flex h-2 w-2">
                          {!reduce && (
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-hover/60" />
                          )}
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-hover" />
                        </span>
                      )}
                      {d.value}
                    </dd>
                    <dd className="col-start-2 mt-0.5 sm:mt-1 text-sm text-muted-foreground">{d.sub}</dd>
                  </motion.div>
                ))}
              </dl>

              <div className="mt-6 sm:mt-10 flex flex-wrap items-center justify-center sm:justify-start gap-x-8 gap-y-3 sm:border-t sm:border-border sm:pt-6">
                {[
                  { label: "LinkedIn", href: aboutData.linkedin },
                  { label: "Instagram", href: aboutData.instagram },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm text-foreground"
                  >
                    <span className="relative">
                      {l.label}
                      <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-foreground origin-right scale-x-0 transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* disciplines in one row */}
        <div className="mt-12 md:mt-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Disciplines
          </p>
          {/* phones: one row that drifts sideways */}
          <div
            className={`sm:hidden mt-4 -mx-4 border-y border-border-strong py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] ${
              reduce ? "overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" : "overflow-hidden"
            }`}
          >
            <div
              className="flex w-max items-baseline"
              style={reduce ? undefined : { animation: "marquee 22s linear infinite" }}
            >
              {(reduce ? aboutData.shortSkills : [...aboutData.shortSkills, ...aboutData.shortSkills]).map((skill, i) => (
                <span key={i} className="flex items-baseline whitespace-nowrap">
                  <span className="font-display text-xl leading-none text-foreground">{skill}</span>
                  <span aria-hidden className="mx-4 font-display text-sm text-brand">✦</span>
                </span>
              ))}
            </div>
          </div>

          <ul className="hidden sm:grid sm:grid-cols-3 lg:flex lg:items-baseline lg:justify-between mt-4 gap-x-6 gap-y-4 border-y border-border-strong py-5 md:py-6">
            {aboutData.shortSkills.map((skill, i) => (
              <motion.li
                key={skill}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease }}
                className="group flex items-baseline gap-2.5 cursor-default"
              >
                <span className="font-mono text-[10px] tabular-nums text-muted-soft transition-colors duration-300 group-hover:text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl md:text-2xl leading-none whitespace-nowrap text-foreground transition-all duration-500 group-hover:italic group-hover:text-brand">
                  {skill}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
