export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  goal: string;
  strategy: string;
  platforms: string[];
  results: { label: string; value: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "bloom-cafe",
    client: "Bloom Cafe",
    industry: "Food & Beverage",
    goal: "Increase Instagram engagement and drive foot traffic to their new downtown location.",
    strategy:
      "Launched a Reels-first content strategy combined with user-generated content campaigns, branded hashtag challenges, and local influencer collaborations. Ran weekly giveaways tied to in-store visits.",
    platforms: ["Instagram", "Facebook"],
    results: [
      { label: "Engagement Increase", value: "+120%" },
      { label: "Followers Gained", value: "+3K in 60 days" },
      { label: "Monthly Reach", value: "85K" },
      { label: "Store Visits", value: "+45%" },
    ],
  },
  {
    id: "velvet-fashion",
    client: "Velvet Fashion",
    industry: "Fashion & Apparel",
    goal: "Build TikTok presence from scratch and drive e-commerce sales.",
    strategy:
      "Created trending audio-based content, styled outfit transitions, and a shoppable video series. Leveraged TikTok's algorithm with consistent posting cadence and trend-jacking.",
    platforms: ["TikTok", "Instagram"],
    results: [
      { label: "TikTok Followers", value: "50K" },
      { label: "Video Views", value: "2.1M" },
      { label: "Sales Increase", value: "+180%" },
      { label: "ROAS", value: "4.2x" },
    ],
  },
  {
    id: "zenfit-app",
    client: "ZenFit App",
    industry: "Health & Wellness",
    goal: "Grow app downloads through a social media acquisition funnel.",
    strategy:
      "Developed educational carousel series, transformation stories, and targeted LinkedIn thought leadership content. Built a multi-platform funnel from awareness to download.",
    platforms: ["Instagram", "LinkedIn", "Facebook"],
    results: [
      { label: "App Downloads", value: "28K" },
      { label: "Cost per Lead", value: "-62%" },
      { label: "Email Signups", value: "8.5K" },
      { label: "Engagement Rate", value: "5.8%" },
    ],
  },
];
