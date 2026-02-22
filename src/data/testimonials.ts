export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Chen",
    role: "Owner",
    company: "Bloom Cafe",
    quote:
      "JV completely transformed our social media presence. Our engagement tripled in just three months, and we're seeing real customers mention our Instagram posts when they visit.",
  },
  {
    id: "t2",
    name: "Marcus Johnson",
    role: "Marketing Director",
    company: "Velvet Fashion",
    quote:
      "Working with JV was a game-changer for our TikTok strategy. The content quality and consistency brought us from zero to 50K followers organically.",
  },
  {
    id: "t3",
    name: "Dr. Priya Patel",
    role: "CEO",
    company: "ZenFit App",
    quote:
      "The data-driven approach sets JV apart. Every decision was backed by analytics, and the results speak for themselves — 28K app downloads from social alone.",
  },
];
