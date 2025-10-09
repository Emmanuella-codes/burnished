import { Resume } from "@/typings/resume";

export const mockResume: Resume = {
  header: {
    fullname: "Ella Johnson",
    jobTitle: "Frontend Engineer",
    location: "Lagos, Nigeria",
    email: "ella.johnson@example.com",
    phone: "+234 812 345 6789",
    linkedin: "linkedin.com/in/ellajohnson",
    linkedinUrl: "https://linkedin.com/in/ellajohnson",
    github: "github.com/ellacodes",
    githubUrl: "https://github.com/ellacodes",
    website: "ellajohnson.dev",
    websiteUrl: "https://ellajohnson.dev",
  },
  profileSummary:
    "Frontend Engineer with 4+ years of experience building responsive web apps using React, TypeScript, and Tailwind. Passionate about crafting user-centered designs and improving developer experience.",

  skills: [
    {
      title: "Languages",
      values: ["JavaScript", "TypeScript", "HTML", "CSS"],
    },
    {
      title: "Frameworks",
      values: ["React", "Next.js", "Tailwind CSS"],
    },
    {
      title: "Tools",
      values: ["Git", "Vite", "Figma"],
    },
  ],
  experiences: [
    {
      company: "Techify Labs",
      occupation: "Frontend Engineer",
      startDate: "Jan 2022",
      endDate: "Present",
      location: "Remote",
      desc: [
        "Built and maintained component libraries used across 3 client products.",
        "Collaborated with backend team to optimize API-driven UI rendering.",
        "Led migration from CRA to Next.js, improving page load by 35%.",
      ],
    },
    {
      company: "DesignStack",
      occupation: "Frontend Developer",
      startDate: "Jul 2020",
      endDate: "Dec 2021",
      location: "Lagos, Nigeria",
      desc: [
        "Implemented pixel-perfect UI based on Figma designs.",
        "Worked closely with designers and PMs to deliver sprint goals on time.",
      ],
    },
  ],
  education: [
    {
      degree: "B.Sc. Computer Science",
      insitution: "University of Lagos",
      startDate: "2016",
      endDate: "2020",
      location: "Lagos, Nigeria",
      desc: ["Graduated with Second Class Upper (Hons)."],
    },
  ],
  projects: [
    {
      title: "Portfolio Website",
      subTitle: "Next.js + Tailwind",
      link: "https://ellajohnson.dev",
      desc: ["Designed and built a responsive personal portfolio site."],
    },
    {
      title: "Resume Builder",
      subTitle: "React + Zustand",
      link: "https://resumify.app",
      desc: ["Created an interactive resume builder with live preview."],
    },
  ],
  awards: [
    {
      title: "Women in Tech Rising Star",
      issuer: "TechNation",
      date: "2023",
      desc: ["Recognized for contributions to open-source community projects."],
    },
  ],

  sectionOrder: [
    "personal",
    "profileSummary",
    "skills",
    "experiences",
    "education",
    "projects",
    "awards",
  ],
}