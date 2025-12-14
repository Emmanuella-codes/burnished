
type TemplateExperienceProps = {
  experiences: Array<{
    company: string;
    occupation: string;
    startDate: string;
    endDate: string
    location?: string;
    desc: string[];
  }>;
};

export default function TemplateExperience({ experiences }: TemplateExperienceProps) {
  return (
    <section className="">
      <h2 className="temp-section-title">Professional Experience</h2>
      <div className="flex flex-col gap-y-2">
        {experiences.map((exp, idx) => (
          <div key={`exp-${idx}`} className="">
            <div className="flex flex-row justify-between">
              <div className="">
                <h3 className="text-[14px] font-semibold">{exp.occupation}</h3>
                <h4 className="text-[14px]">{exp.company}</h4>
              </div>
              <div className="flex flex-row gap-x-2">
                <span className="text-[14px]">{`${exp.startDate} - ${exp.endDate}`}</span>
                {exp.location && <span className="text-[14px]">{exp.location}</span>}
              </div>
            </div>
            <div className="pl-4">
              <ul className="list-disc">
                {exp.desc.map((item, idx) => (
                  <li key={`expdesc-${idx}`} className="text-[14px]">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
