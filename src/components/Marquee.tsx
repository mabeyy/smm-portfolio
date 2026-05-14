interface MarqueeProps {
  items: string[];
  separator?: string;
  className?: string;
}

export default function Marquee({
  items,
  separator = "✦",
  className = "",
}: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 40s linear infinite" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="mx-8 font-display italic text-3xl md:text-5xl text-foreground/15 select-none"
          >
            {item}
            <span className="mx-8 text-accent/30 not-italic">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
