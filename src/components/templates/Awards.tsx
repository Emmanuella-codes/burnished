
type TemplateAwardsProp = {
  title: string;
  link?: string;
  issuer?: string;
  date?: string;
  desc?: string[];
};

export default function TemplateAwards({ awards }: { awards: TemplateAwardsProp }) {
  return (
    <section className="">
      <div className="flex flex-col">
          <div className="">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <a href={awards.link} className="">
                  <h3 className="text-[14px] font-semibold">{awards.title}</h3>
                </a>
                {awards.issuer && <h4 className="text-[14px]">{awards.issuer}</h4>}
              </div>
              <div className="">
                {awards.date && (
                  <span className="text-[14px]">{awards.date}</span>
                )}
              </div>
            </div>
            <div className="pl-4">
              <ul className="list-disc">
                {awards.desc?.map((item, idx) => (
                  <li key={`awddesc-${idx}`} className="text-[14px]">{item}</li>
                ))}
              </ul>
            </div>
          </div>
      </div>
    </section>
  );
}
