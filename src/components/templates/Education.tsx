
type EducationTemplateProps = {
  education: Array<{
    degree: string;
    institution: string;
    startDate: string;
    endDate: string
    location?: string;
    desc?: string[];
  }>;
}

export default function TemplateEducation({ education }: EducationTemplateProps) {
  return (
    <section className="">
      <div className="">
        {education.map((item, idx) => (
          <div key={`edcn-${idx}`} className="">
            <div className="flex flex-row justify-between">
            <div className="">
              <h3 className="text-[14px] font-semibold">{item.degree}</h3>
              <h4 className="text-[14px]">{item.institution}</h4>
            </div>
            <div className=" flex flex-row gap-x-2">
              <span className="text-[14px]">{`${item.startDate} - ${item.endDate}`}</span>
              {item.location && <span className="text-[14px]">{item.location}</span>}
            </div>
          </div>
            <div className="pl-4">
              <ul className="list-disc">
                {item.desc?.map((item, idx) => (
                  <li key={`edcndesc-${idx}`} className="text-[14px]">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
