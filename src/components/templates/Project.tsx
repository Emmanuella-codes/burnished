
type TemplateProjectProps = {
  title: string;
  link?: string;
  subTitle?: string;
  desc: string[];
  hidden?: boolean;
};

export default function TemplateProject({ projects }: {projects: TemplateProjectProps}) {
  if (projects.hidden) return null;
  return (
    <section>
      <div className="flex flex-col">
        <div className="">
          <div className="">
            <a href={projects.link} className="">
              <h3 className="text-[14px] font-semibold">{projects.title}</h3>
            </a>
            {projects.subTitle && <h4 className="text-[14px]">{projects.subTitle}</h4>}
          </div>
          <div className="pl-4">
            <ul className="list-disc">
              {projects.desc.map((item, idx) => (
                <li key={`projdesc-${idx}`} className="text-[14px]">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
