import { Resume } from "@/typings/resume";
import TemplateProfile from "./Profile";
import TemplateSkills from "./Skills";
import TemplateExperience from "./Experience";
import TemplateEducation from "./Education";
import TemplateProject from "./Project";
import TemplateAwards from "./Awards";
import TemplateHeader from "./Header";

export default function Template({
  header,
  profileSummary,
  skills,
  experiences,
  education,
  projects,
  awards,
  sectionOrder,
}: Resume) {
  return (
    <div className="page w-full mx-auto bg-white text-black shadow-lg">
      <div className="px-12 py-10">
        <div className="mb-4">
          <TemplateHeader 
            fullname={header.fullname}
            jobTitle={header.jobTitle}
            location={header.location}
            email={header.email}
            phone={header.phone}
            linkedin={header.linkedin}
            linkedinUrl={header.linkedinUrl}
            github={header.github}
            githubUrl={header.githubUrl}
            website={header.website}
            websiteUrl={header.websiteUrl}
          />
        </div>
        <div className="space-y-6">
          {sectionOrder.map((sect) => {
            switch (sect) {
              case "profileSummary": 
                return profileSummary ? (
                  <TemplateProfile key={"profile"} profileSummary={profileSummary} />
                ) : null;
              case "skills":
                return <TemplateSkills key={"skills"} skills={skills} />;
              case "experiences":
                return <TemplateExperience key={"exp"} experiences={experiences} />;
              case "education":
                return <TemplateEducation key={"edu"} education={education} />;
              case "projects":
                return <TemplateProject key={"proj"} projects={projects} />;
              case "awards":
                return awards && awards.length > 0 ? (
                  <TemplateAwards key={"awards"} awards={awards} />
                ) : null;
              default:
                return null;
            }
          })}
        </div>
      </div>     
    </div>
  )
};
