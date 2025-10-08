
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
      <div className="flex flex-col">
        {experiences.map((exp, idx) => (
          <div key={`exp-${idx}`} className="">
            <div className="flex flex-row justify-between">
              <div className="">
                <h3 className="text-sm font-semibold">{exp.occupation}</h3>
                <h4 className="text-sm">{exp.company}</h4>
              </div>
              <div className="">
                <span className="text-sm">{`${exp.startDate} - ${exp.endDate}`}</span>
                {exp.location && <span className="text-sm">{exp.location}</span>}
              </div>
            </div>
            <div className="pl-3">
              <ul className="list-disc">
                {exp.desc.map((item, idx) => (
                  <li key={`expdesc-${idx}`} className="text-sm">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
};
