export interface ToolGroup {
  category: string;
  icon: string;
  items: string[];
}

export const toolGroups: ToolGroup[] = [
  {
    category: "Design & Prototyping",
    icon: "Palette",
    items: ["Canva", "CapCut", "Figma"],
  },
  {
    category: "Platforms & Suites",
    icon: "Layers",
    items: ["Meta Business Suite", "Instagram", "TikTok", "Facebook"],
  },
  {
    category: "Workflow & Productivity",
    icon: "Workflow",
    items: ["Microsoft Office", "Google Drive", "Trello"],
  },
];
