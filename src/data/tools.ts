export interface ToolGroup {
  category: string;
  icon: string;
  items: string[];
}

export const toolGroups: ToolGroup[] = [
  {
    category: "Content Creation & Design",
    icon: "Palette",
    items: [
      "Canva",
      "CapCut",
      "Photo Editing",
      "Product Photography",
      "Video Editing",
      "Graphic Design",
    ],
  },
  {
    category: "Platforms",
    icon: "Layers",
    items: ["Instagram", "Facebook", "TikTok", "Meta Business Suite"],
  },
  {
    category: "Workflow & Productivity",
    icon: "Workflow",
    items: ["Trello", "Microsoft Office", "Google Drive"],
  },
];
