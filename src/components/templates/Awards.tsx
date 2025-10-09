
type TemplateAwardsProp = {
  awards: Array<{
    title: string;
    link?: string;
    issuer?: string;
    date?: string;
    desc?: string[];
  }>;
};

export default function TemplateAwards({ awards }: TemplateAwardsProp) {
  return (
    <section className="">
      <h2 className="temp-section-title">Awards</h2>
      <div className="flex flex-col">
        {awards.map((award, idx) => (
          <div key={`award-${idx}`} className="">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <a href={award.link} className="">
                  <h3 className="text-sm font-semibold">{award.title}</h3>
                </a>
                {award.issuer && <h4 className="text-sm">{award.issuer}</h4>}
              </div>
              <div className="">
                {award.date && (
                  <span className="text-sm">{award.date}</span>
                )}
              </div>
            </div>
            <div className="pl-4">
              <ul className="list-disc">
                {award.desc?.map((item, idx) => (
                  <li key={`awddesc-${idx}`} className="text-sm">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
};
