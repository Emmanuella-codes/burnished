import { Resume } from "@/typings/resume";

export function TemplateSectionHeader({ title }: { title: string }) {
    return <h2 className="temp-section-title font-bold text-lg uppercase tracking-wide border-b border-gray-400 pb-1 mb-2">{title}</h2>;
}
  
export function BulletLine({ text }: { text: string }) {
    return (
      <div className="pl-4">
        <ul className="list-disc m-0 p-0">
          <li className="text-[14px]">{text}</li>
        </ul>
      </div>
    );
  }
  
export function ExperienceHeader({ experience }: { experience: Resume["experiences"][number] }) {
    return (
      <div className="">
        <div className="flex flex-row justify-between">
          <div className="">
            <h3 className="text-[14px] font-semibold">{experience.occupation}</h3>
            <h4 className="text-[14px]">{experience.company}</h4>
          </div>
          <div className="flex flex-row gap-x-2">
            <span className="text-[14px]">{`${experience.startDate} - ${experience.endDate}`}</span>
            {experience.location && <span className="text-[14px]">{experience.location}</span>}
          </div>
        </div>
      </div>
    );
  }
  
export function EducationHeader({ education }: { education: Resume["education"][number] }) {
    return (
      <div className="">
        <div className="flex flex-row justify-between">
          <div className="">
            <h3 className="text-[14px] font-semibold">{education.degree}</h3>
            <h4 className="text-[14px]">{education.institution}</h4>
          </div>
          <div className=" flex flex-row gap-x-2">
            <span className="text-[14px]">{`${education.startDate} - ${education.endDate}`}</span>
            {education.location && <span className="text-[14px]">{education.location}</span>}
          </div>
        </div>
      </div>
    );
}
  
export function ProjectHeader({ project }: { project: Resume["projects"][number] }) {
    return (
      <div className="">
        {project.link ? (
          <a href={project.link} className="">
            <h3 className="text-[14px] font-semibold">{project.title}</h3>
          </a>
        ) : (
          <h3 className="text-[14px] font-semibold">{project.title}</h3>
        )}
        {project.subTitle && <h4 className="text-[14px]">{project.subTitle}</h4>}
      </div>
    );
}
  
export function AwardHeader({ award }: { award: NonNullable<Resume["awards"]>[number] }) {
    return (
        <div className="flex flex-row justify-between">
        <div className="flex flex-col">
            {award.link ? (
            <a href={award.link} className="">
                <h3 className="text-[14px] font-semibold">{award.title}</h3>
            </a>
            ) : (
            <h3 className="text-[14px] font-semibold">{award.title}</h3>
            )}
            {award.issuer && <h4 className="text-[14px]">{award.issuer}</h4>}
        </div>
        <div className="">
            {award.date && <span className="text-[14px]">{award.date}</span>}
        </div>
        </div>
    );
}
