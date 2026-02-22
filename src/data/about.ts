export interface AboutData {
  name: string;
  title: string;
  bio: string;
  valueStatement: string;
  platforms: { name: string }[];
  experience: string;
  industries: string[];
  strategyStyle: string[];
  tools: string[];
}

export const aboutData: AboutData = {
  name: "JV Paula Villaflor",
  title: "Social Media Manager",
  bio: "I help brands build meaningful connections with their audiences through strategic social media management. With a passion for storytelling and a data-driven approach, I transform social platforms into powerful growth engines.",
  valueStatement:
    "Turning scrollers into loyal followers, and followers into paying customers.",
  platforms: [
    { name: "Instagram" },
    { name: "TikTok" },
    { name: "Facebook" },
    { name: "LinkedIn" },
  ],
  experience: "5+ years",
  industries: [
    "Food & Beverage",
    "Fashion & Apparel",
    "SaaS & Tech",
    "Health & Wellness",
    "E-commerce",
  ],
  strategyStyle: [
    "Data-Driven Growth",
    "Brand Storytelling",
    "Community-First Approach",
    "Growth Hacking",
  ],
  tools: [
    "Meta Business Suite",
    "Hootsuite",
    "Canva",
    "Adobe Creative Suite",
    "Google Analytics",
    "Later",
    "Sprout Social",
  ],
};
