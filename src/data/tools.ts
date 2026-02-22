export interface ToolCategory {
  category: string;
  icon: string;
  items: { name: string; level: number }[];
}

export const toolCategories: ToolCategory[] = [
  {
    category: "Scheduling",
    icon: "Clock",
    items: [
      { name: "Buffer", level: 90 },
      { name: "Hootsuite", level: 95 },
      { name: "Later", level: 85 },
    ],
  },
  {
    category: "Analytics",
    icon: "BarChart",
    items: [
      { name: "Google Analytics", level: 90 },
      { name: "Meta Business Suite", level: 95 },
      { name: "Sprout Social", level: 80 },
    ],
  },
  {
    category: "Design",
    icon: "Palette",
    items: [
      { name: "Canva", level: 95 },
      { name: "Adobe Creative Suite", level: 85 },
      { name: "Figma", level: 80 },
    ],
  },
  {
    category: "Ads Manager",
    icon: "TrendingUp",
    items: [
      { name: "Meta Ads", level: 95 },
      { name: "Google Ads", level: 85 },
      { name: "TikTok Ads", level: 80 },
    ],
  },
];
