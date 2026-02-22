"use client";

interface MarqueeProps {
  items: string[];
  separator?: string;
  className?: string;
}

export default function Marquee({
  items,
  separator = "—",
  className = "",
}: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 30s linear infinite" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="mx-6 text-lg md:text-xl font-medium text-white/10 select-none"
          >
            {item} <span className="mx-6 text-white/5">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
