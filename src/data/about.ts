export interface AboutData {
  name: string;
  title: string;
  location: string;
  bio: string;
  valueStatement: string;
  shortSkills: string[];
  competencies: string[];
  education: {
    degree: string;
    school: string;
    period: string;
  };
}

export const aboutData: AboutData = {
  name: "JV Paula Villaflor",
  title: "Social Media Manager",
  location: "Cagayan de Oro, Philippines",
  bio: "Creative and detail-oriented social media manager. I plan, create, and schedule content that strengthens brand identity and keeps an online presence consistent — aligning visuals and captions with brand voice to lift engagement and visibility.",
  valueStatement:
    "Turning quiet feeds into recognisable brands — one cohesive post at a time.",
  shortSkills: [
    "Content Planning",
    "Visual Branding",
    "Social Media Scheduling",
    "Caption Writing",
    "Trend-Based Content Strategy",
  ],
  competencies: [
    "Creative Thinking",
    "Adaptability",
    "Problem Solving",
    "Communication",
    "Leadership & Collaboration",
    "Works Independently",
    "Eagerness to Learn",
  ],
  education: {
    degree: "Bachelor of Computer Science",
    school: "University of Science and Technology of the Southern Philippines",
    period: "2022 — Present",
  },
};
