
type TemplateSkillsProps = {
  skills: Array<{
    title: string;
    values: string[];
  }>;
};

export default function TemplateSkills({ skills }: TemplateSkillsProps) {
  return (
    <section className="">
      <h2 className="temp-section-title">Skills</h2>
      <div className="flex flex-col gap-y-2">
        {skills.map((skill, idx) => (
          <div key={`skill-${idx}`} className="">
            <h3 className="text-sm font-semibold">{skill.title ? `${skill.title}:` : ""}</h3>
            <p className="text-sm">{skill.values.join(", ")}</p>
          </div>
        ))}
      </div>
    </section>
  )
};
