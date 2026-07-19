export interface Service {
  icon: string;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    icon: "Target",
    title: "Social Media Strategy",
    description: "A clear plan mapped to your brand, audience, and goals.",
  },
  {
    icon: "CalendarDays",
    title: "Content Planning & Calendar",
    description:
      "Organised calendars that keep posting consistent across platforms.",
  },
  {
    icon: "PenTool",
    title: "Post Design & Copywriting",
    description: "On-brand visuals and captions written to earn engagement.",
  },
  {
    icon: "Users",
    title: "Community Management",
    description: "Replying, moderating, and building a loyal audience.",
  },
  {
    icon: "BarChart3",
    title: "Analytics & Reporting",
    description: "Monthly reports with clear insights and next steps.",
  },
];
