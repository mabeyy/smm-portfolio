export interface Experience {
  id: string;
  client: string;
  role: string;
  period: string;
  type: string;
  summary: string;
  highlights: string[];
  metrics?: { label: string; value: string }[];
}

export const experiences: Experience[] = [
  {
    id: "kres",
    client: "KRES",
    role: "Social Media Marketing",
    period: "2024 — 2026",
    type: "Contract-Based",
    summary:
      "Led organic growth and daily operations — conceptualised a viral content campaign and streamlined the end-to-end customer journey from inquiry to delivery.",
    highlights: [
      "Conceptualised and executed an organic campaign that reached 250K+ views and 33K+ engagements on a single post — no ad spend.",
      "Managed daily operations and content calendars, keeping the brand voice cohesive across channels.",
      "Streamlined order management and delivery coordination for a seamless inquiry-to-fulfilment experience.",
    ],
    metrics: [
      { label: "Peak Views", value: "250K+" },
      { label: "Engagements", value: "33K+" },
      { label: "Ad Spend", value: "$0" },
    ],
  },
  {
    id: "nailakada",
    client: "Nailakada",
    role: "Social Media Manager",
    period: "Feb 2026",
    type: "Contract-Based",
    summary:
      "Engineered an organic content strategy and ran end-to-end content calendars, aligning high-quality visuals with the brand voice.",
    highlights: [
      "Engineered an organic content strategy that peaked at 250K+ views and 33K+ engagements on a single post.",
      "Managed end-to-end content calendars to keep the brand voice consistent and professional.",
      "Aligned visuals and captions with brand identity across every release.",
    ],
    metrics: [
      { label: "Peak Views", value: "250K+" },
      { label: "Engagements", value: "33K+" },
    ],
  },
  {
    id: "brewbox",
    client: "The Brew Box",
    role: "Social Media Manager",
    period: "Dec 2025",
    type: "Contract-Based",
    summary:
      "Refreshed the feed into a cohesive, aesthetic grid and produced light-touch lifestyle content that highlighted the product without feeling salesy.",
    highlights: [
      "Transitioned the feed to a more cohesive and aesthetic layout that lifted the overall look of the page.",
      "Designed and published simple, engaging graphics and short-form video focused on lifestyle and product highlights.",
    ],
  },
];
