export type GalleryCategory = "all" | "posts" | "reels" | "captions" | "carousels";

export interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, "all">;
  platform: string;
  description: string;
  color: string;
}

export const galleryCategories: { label: string; value: GalleryCategory }[] = [
  { label: "All", value: "all" },
  { label: "Post Designs", value: "posts" },
  { label: "Reels / Videos", value: "reels" },
  { label: "Captions", value: "captions" },
  { label: "Carousels", value: "carousels" },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Summer Collection Launch",
    category: "posts",
    platform: "Instagram",
    description: "Product launch post with lifestyle photography",
    color: "#c9956b",
  },
  {
    id: "g2",
    title: "Behind the Scenes Reel",
    category: "reels",
    platform: "TikTok",
    description: "BTS content creation process",
    color: "#d4736e",
  },
  {
    id: "g3",
    title: "Motivational Monday Caption",
    category: "captions",
    platform: "Instagram",
    description: "Engagement-driving storytelling caption",
    color: "#6bbfad",
  },
  {
    id: "g4",
    title: "5 Tips for Growth",
    category: "carousels",
    platform: "Instagram",
    description: "Educational carousel with actionable tips",
    color: "#c9956b",
  },
  {
    id: "g5",
    title: "Brand Story Highlight",
    category: "posts",
    platform: "Facebook",
    description: "Brand narrative visual post",
    color: "#d4736e",
  },
  {
    id: "g6",
    title: "Product Showcase Reel",
    category: "reels",
    platform: "Instagram",
    description: "Dynamic product demo with trending audio",
    color: "#6bbfad",
  },
  {
    id: "g7",
    title: "Client Transformation Story",
    category: "captions",
    platform: "LinkedIn",
    description: "Long-form storytelling with CTA",
    color: "#c9956b",
  },
  {
    id: "g8",
    title: "Monthly Recap Carousel",
    category: "carousels",
    platform: "Instagram",
    description: "Performance highlights in carousel format",
    color: "#d4736e",
  },
  {
    id: "g9",
    title: "Recipe Quick Reel",
    category: "reels",
    platform: "TikTok",
    description: "Fast-paced recipe video for cafe client",
    color: "#6bbfad",
  },
  {
    id: "g10",
    title: "Holiday Campaign Post",
    category: "posts",
    platform: "Instagram",
    description: "Seasonal themed promotional design",
    color: "#c9956b",
  },
  {
    id: "g11",
    title: "How-To Guide Carousel",
    category: "carousels",
    platform: "LinkedIn",
    description: "Step-by-step educational content",
    color: "#d4736e",
  },
  {
    id: "g12",
    title: "Engagement Hook Caption",
    category: "captions",
    platform: "Instagram",
    description: "Question-based caption driving comments",
    color: "#6bbfad",
  },
];
