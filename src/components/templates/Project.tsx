
type TemplateProjectProps = {
  projects: Array<{
    title: string;
    link?: string;
    subTitle?: string;
    desc: string[];
  }>;
};

export default function TemplateProject({ projects }: TemplateProjectProps) {
  return (
    <section>
      <h2 className="temp-section-title">Projects</h2>
      <div className="flex flex-col">
        {projects.map((proj, idx) => (
          <div key={`proj-${idx}`} className="">
            <div className="">
              <a href={proj.link} className="">
                <h3 className="text-[14px] font-semibold">{proj.title}</h3>
              </a>
              {proj.subTitle && <h4 className="text-[14px]">{proj.subTitle}</h4>}
            </div>
            <div className="pl-4">
              <ul className="list-disc">
                {proj.desc.map((item, idx) => (
                  <li key={`projdesc-${idx}`} className="text-[14px]">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
