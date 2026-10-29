// Edit this file to update portfolio content. Leave optional fields undefined
// until real values exist — the UI shows clear placeholders for them.

export const profile = {
  name: "Zamzam Abdikadir Farah",
  firstName: "Zamzam",
  initials: "ZA",
  title: "Software Developer",
  /** Path to a real profile photo (e.g. "/images/zamzam.jpg"). Undefined shows a placeholder. */
  photo: undefined as string | undefined,
  /** Path to a real CV file in /public (e.g. "/cv.pdf"). Undefined disables the download button. */
  cv: undefined as string | undefined,
  email: "samsamcabdi25@gmail.com",
  phone: "+252634901753",
  whatsapp: "252634901753",
  github: "https://github.com/zaam-cabdi",
  linkedin: "https://www.linkedin.com/in/zamzam-abdiqadir-96a51b411/",
};

export type Project = {
  title: string;
  description: string;
  plannedFeatures: string[];
  technologies?: string[];
  image?: string;
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    title: "Login System",
    description: "A personal software project focused on user login and authentication functionality.",
    plannedFeatures: ["User login interface", "Input validation", "Authentication and access control", "Clear user feedback"],
  },
  {
    title: "Management System",
    description: "A personal project designed to organize and manage information through a structured software interface.",
    plannedFeatures: ["Data entry and management", "Organized information display", "Search, editing, or record management"],
  },
  {
    title: "Web Application",
    description: "A personal web development project demonstrating the creation of an interactive web-based application.",
    plannedFeatures: [],
  },
];
