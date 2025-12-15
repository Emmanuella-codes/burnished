
type TemplateExperienceProps = {
  company: string;
  occupation: string;
  startDate: string;
  endDate: string
  location?: string;
  desc: string[];
};

export default function TemplateExperience({ experiences }: { experiences: TemplateExperienceProps }) {
  return (
    <section className="">
      <div className="flex flex-col gap-y-2">
        <div className="">
          <div className="flex flex-row justify-between">
            <div className="">
              <h3 className="text-[14px] font-semibold">{experiences.occupation}</h3>
              <h4 className="text-[14px]">{experiences.company}</h4>
            </div>
            <div className="flex flex-row gap-x-2">
              <span className="text-[14px]">{`${experiences.startDate} - ${experiences.endDate}`}</span>
              {experiences.location && <span className="text-[14px]">{experiences.location}</span>}
            </div>
          </div>
          <div className="pl-4">
            <ul className="list-disc">
              {experiences.desc.map((item, idx) => (
                <li key={`expdesc-${idx}`} className="text-[14px]">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
