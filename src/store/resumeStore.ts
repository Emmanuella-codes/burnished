import { Resume } from "@/typings/resume";
import { proxy, subscribe } from "valtio";

export const defaultResumeState: Resume = {
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
      institution: "",
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
    "header",
    "profileSummary",
    "skills",
    "experiences",
    "education",
    "projects",
    "awards",
  ]
};

export const resumeStore = proxy<Resume>(defaultResumeState);

// track if we've hydrated (outside the store)
let hasHydrated = false;

// hydrate from localStorage
export const hydrateResumeStore = () => {
  if (typeof window === "undefined" || hasHydrated) return;

  try {
    const saved = localStorage.getItem("resumeStore");
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(resumeStore, parsed);
    }
  } catch (error) {
    console.error("Failed to load resume state:", error);
  } finally {
    hasHydrated = true;
  }
};

// Subscribe to changes and save to localStorage
if (typeof window !== "undefined") {
  subscribe(resumeStore, () => {
    if (!hasHydrated) return; // don't save until hydrated

    try {
      localStorage.setItem("resumeStore", JSON.stringify(resumeStore));
    } catch (error) {
      console.error("Failed to save resume state:", error);
    }
  });
}

// Action to reset resume
export const resumeActions = {
  reset: () => {
    Object.assign(resumeStore, defaultResumeState);
  },
};
