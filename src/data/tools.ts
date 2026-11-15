export interface ToolGroup {
  category: string;
  items: string[];
}

export const toolGroups: ToolGroup[] = [
  {
    category: "Design & Production",
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
    items: ["Instagram", "Facebook", "TikTok", "Meta Business Suite"],
  },
  {
    category: "Workflow & Productivity",
    items: ["Trello", "Microsoft Office", "Google Drive"],
  },
];
