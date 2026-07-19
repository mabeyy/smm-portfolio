export interface Experience {
  id: string;
  client: string;
  role: string;
  period: string;
  location: string;
  type: string;
  url?: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    id: "nailkada",
    client: "Nailkada",
    role: "Social Media Manager",
    period: "Jan 2026 — Jul 2026",
    location: "Cagayan de Oro City, Misamis Oriental",
    type: "Full-Time",
    url: "https://www.facebook.com/profile.php?id=61575930476350",
    highlights: [
      "Built and ran an organic content strategy end-to-end, with no ad spend.",
      "Managed content calendars to keep posting consistent and on schedule.",
      "Kept brand voice consistent across posts, visuals, and captions.",
    ],
  },
  {
    id: "kres",
    client: "Kres Co.",
    role: "Freelance Social Media Manager",
    period: "May 2024 — May 2026",
    location: "Cagayan de Oro City, Misamis Oriental",
    type: "Freelance",
    url: "https://www.facebook.com/krespresentsph",
    highlights: [
      "Led organic growth and daily operations across the brand's channels.",
      "Ran an organic campaign built to drive reach without paid promotion.",
      "Streamlined the customer journey from social inquiry to fulfilment.",
    ],
  },
  {
    id: "brewbox",
    client: "The Brew Box",
    role: "Social Media Manager",
    period: "Nov 2025 — Jan 2026",
    location: "Jasaan, Misamis Oriental",
    type: "Contract-Based",
    url: "https://www.facebook.com/profile.php?id=100087053355763",
    highlights: [
      "Transitioned the brand's feed to a more cohesive and aesthetic layout that lifted the overall look of the page.",
      "Designed and published simple, engaging graphics and short-form video focused on lifestyle and product highlights.",
    ],
  },
];
