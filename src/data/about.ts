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
  linkedin: string;
  instagram: string;
}

export const aboutData: AboutData = {
  name: "JV Paula Villaflor",
  title: "Social Media Manager",
  location: "Cagayan de Oro City, Misamis Oriental",
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
    degree: "Bachelor of Science in Computer Science",
    school: "University of Science and Technology of Southern Philippines",
    period: "Jun 2026",
  },
  linkedin: "https://www.linkedin.com/in/jv-paula-villaflor-01779a2a5",
  instagram: "https://www.instagram.com/biycreates/",
};
