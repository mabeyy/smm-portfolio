export type GalleryCategory = "all" | "posts" | "reels" | "captions" | "carousels";

export interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, "all">;
  platform: string;
  description: string;
  tone: string;
}

export const galleryCategories: { label: string; value: GalleryCategory }[] = [
  { label: "All", value: "all" },
  { label: "Posts", value: "posts" },
  { label: "Reels", value: "reels" },
  { label: "Captions", value: "captions" },
  { label: "Carousels", value: "carousels" },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Lifestyle Product Launch",
    category: "posts",
    platform: "Instagram",
    description: "Editorial product post with soft natural light.",
    tone: "warm",
  },
  {
    id: "g2",
    title: "Behind-the-Scenes Reel",
    category: "reels",
    platform: "TikTok",
    description: "Day-in-the-life cut to a trending audio.",
    tone: "sage",
  },
  {
    id: "g3",
    title: "Caption: Quiet Confidence",
    category: "captions",
    platform: "Instagram",
    description: "Story-led copy that opens with a hook.",
    tone: "cream",
  },
  {
    id: "g4",
    title: "5 Trends Worth Following",
    category: "carousels",
    platform: "Instagram",
    description: "Editorial carousel with airy spacing.",
    tone: "warm",
  },
  {
    id: "g5",
    title: "Brand Story Highlight",
    category: "posts",
    platform: "Facebook",
    description: "Anchor post pinned to the top of the grid.",
    tone: "sage",
  },
  {
    id: "g6",
    title: "Aesthetic Product Demo",
    category: "reels",
    platform: "Instagram",
    description: "30-second product showcase, slow cuts.",
    tone: "cream",
  },
  {
    id: "g7",
    title: "Client Transformation",
    category: "captions",
    platform: "Facebook",
    description: "Long-form, customer-first storytelling.",
    tone: "warm",
  },
  {
    id: "g8",
    title: "Monthly Recap",
    category: "carousels",
    platform: "Instagram",
    description: "Performance highlights with quiet typography.",
    tone: "sage",
  },
  {
    id: "g9",
    title: "Quick Recipe Reel",
    category: "reels",
    platform: "TikTok",
    description: "Fast-paced, recipe-style cuts.",
    tone: "cream",
  },
  {
    id: "g10",
    title: "Seasonal Campaign",
    category: "posts",
    platform: "Instagram",
    description: "Holiday-themed promotional design.",
    tone: "warm",
  },
  {
    id: "g11",
    title: "How-To Guide",
    category: "carousels",
    platform: "Facebook",
    description: "Step-by-step educational content.",
    tone: "sage",
  },
  {
    id: "g12",
    title: "Engagement Hook",
    category: "captions",
    platform: "Instagram",
    description: "Question-driven caption built for comments.",
    tone: "cream",
  },
];
