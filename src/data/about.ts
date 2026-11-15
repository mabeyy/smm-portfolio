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
  title: "Multidisciplinary Creative",
  location: "Cagayan de Oro City, Misamis Oriental",
  bio: "Multidisciplinary creative working across graphic design, photography, and short-form video. I shape how brands look, sound, and move — from the first moodboard to the final frame.",
  shortSkills: [
    "Art Direction",
    "Graphic Design",
    "Product Photography",
    "Video Editing",
    "Visual Branding",
    "Content Strategy",
  ],
  education: {
    degree: "Bachelor of Science in Computer Science",
    school: "University of Science and Technology of Southern Philippines",
    period: "Jun 2026",
  },
  linkedin: "https://www.linkedin.com/in/jv-paula-villaflor-01779a2a5",
  instagram: "https://www.instagram.com/biycreates/",
};
