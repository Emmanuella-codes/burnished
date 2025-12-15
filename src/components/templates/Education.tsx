
type EducationTemplateProps = {
  degree: string;
  institution: string;
  startDate: string;
  endDate: string
  location?: string;
  desc?: string[];
}

export default function TemplateEducation({ education }: { education: EducationTemplateProps }) {
  return (
    <section className="">
      <div className="">
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
            <div className="pl-4">
              <ul className="list-disc">
                {education.desc?.map((item, idx) => (
                  <li key={`edcndesc-${idx}`} className="text-[14px]">{item}</li>
                ))}
              </ul>
            </div>
          </div>
      </div>
    </section>
  );
}
