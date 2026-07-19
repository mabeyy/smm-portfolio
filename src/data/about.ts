export interface AboutData {
  name: string;
  title: string;
  location: string;
  bio: string;
  shortSkills: string[];
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
  bio: "Creative, detail-oriented social media manager. I handle content planning, visual branding, and scheduling — keeping a brand's presence consistent, cohesive, and easy to follow.",
  shortSkills: [
    "Content Planning",
    "Visual Branding",
    "Social Media Scheduling",
    "Caption Writing",
    "Trend-Based Content Strategy",
  ],
  education: {
    degree: "Bachelor of Science in Computer Science",
    school: "University of Science and Technology of Southern Philippines",
    period: "Jun 2026",
  },
  linkedin: "https://www.linkedin.com/in/jv-paula-villaflor-01779a2a5",
  instagram: "https://www.instagram.com/biycreates/",
};
