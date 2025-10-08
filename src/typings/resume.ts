
export type Header = {
  fullname: string;
  jobTitle: string;
  location?: string;
  email: string;
  phone?: string;
  linkedin?: string;
  linkedinUrl?: string;
  github?: string;
  githubUrl?: string;
  website?: string;
  websiteUrl?: string;
};

export type Resume = {
  header: Header;
  profileSummary?: string;
  skills: Array<{
    title: string;
    values: string[];
  }>;
  experiences: Array<{
    company: string;
    occupation: string;
    startDate: string;
    endDate: string;
    location?: string;
    desc: string[];
  }>;
  education: Array<{
    degree: string;
    insitution: string;
    startDate: string;
    endDate: string;
    location?: string;
    desc?: string[];
  }>;
  projects: Array<{
    title: string;
    link?: string;
    subTitle?: string;
    desc: string[];
  }>;
  awards?: Array<{
    title: string;
    link?: string;
    issuer?: string;
    date?: string;
    desc?: string[];
  }>;
  sectionOrder: string[];
};
