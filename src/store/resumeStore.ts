import { Resume } from "@/typings/resume";
import { proxy } from "valtio";

export const resumeStore: Resume = proxy({
  header: {
    fullname: "",
    jobTitle: "",
    email: "",
    location: "",
    phone: "",
    linkedin: "",
    linkedinUrl: "",
    github: "",
    githubUrl: "",
    website: "",
    websiteUrl: "",
  },
  profileSummary: "",
  skills: [
    { title: "", values: [""] }
  ],
  experiences: [
    {
      company: "",
      occupation: "",
      startDate: "",
      endDate: "",
      location: "",
      desc: [""],
    }
  ],
  education: [
    {
      degree: "",
      insitution: "",
      startDate: "",
      endDate: "",
      location: "",
      desc: [""],
    }
  ],
  projects: [
    {
      title: "",
      link: "",
      subTitle: "",
      desc: [""],
    }
  ],
  awards: [
    {
      title: "",
      link: "",
      issuer: "",
      date: "",
      desc: [""],
    }
  ],
  sectionOrder: [
    "personal",
    "profileSummary",
    "skills",
    "experiences",
    "education",
    "projects",
    "awards",
  ]
});
