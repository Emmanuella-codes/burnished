
type EducationTemplateProps = {
  education: Array<{
    degree: string;
    insitution: string;
    startDate: string;
    endDate: string
    location?: string;
    desc?: string[];
  }>;
}

export default function TemplateEducation({ education }: EducationTemplateProps) {
  return (
    <section className="">
      <h2 className="temp-section-title">Education</h2>
      <div className="">
        {education.map((item, idx) => (
          <div key={`edcn-${idx}`} className="">
            <div className="flex flex-col">
            <div className="">
              <h3 className="text-sm font-semibold">{item.degree}</h3>
              <h4 className="text-sm">{item.insitution}</h4>
            </div>
            <div className="">
              <span className="text-sm">{`${item.startDate} - ${item.endDate}`}</span>
              {item.location && <span className="text-sm">{item.location}</span>}
            </div>
          </div>
            <div className="">
              <ul className="list-disc">
                {item.desc?.map((item, idx) => (
                  <li key={`edcndesc-${idx}`} className="text-sm">{item}</li>
                ))}
              </ul>
            </div>
          </div>
          
        ))}
      </div>
    </section>
  )
};
