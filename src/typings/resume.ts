
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
    hidden?: boolean;
  }>;
  experiences: Array<{
    company: string;
    occupation: string;
    startDate: string;
    endDate: string;
    location?: string;
    desc: string[];
    hidden?: boolean;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
    location?: string;
    desc?: string[];
    hidden?: boolean;
  }>;
  projects: Array<{
    title: string;
    link?: string;
    subTitle?: string;
    desc: string[];
    hidden?: boolean;
  }>;
  awards?: Array<{
    title: string;
    link?: string;
    issuer?: string;
    date?: string;
    desc?: string[];
    hidden?: boolean;
  }>;
  sectionOrder: string[];
};
