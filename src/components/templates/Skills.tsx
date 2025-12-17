
type TemplateSkillsProps = {
  title: string;
  values: string[];
  hidden?: boolean;
};

export default function TemplateSkills({ skills }: { skills: TemplateSkillsProps }) {
  if (skills.hidden) return null;
  return (
    <section className="">
      <div className="flex flex-col gap-y-2">
        <div className="">
          <h3 className="text-[14px] font-semibold">{skills.title ? `${skills.title}:` : ""}</h3>
          <p className="text-[14px]">{skills.values.join(", ")}</p>
        </div>
      </div>
    </section>
  );
}
