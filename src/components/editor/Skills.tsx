
type SkillProps = {
  skill: { title: string; values: string[] };
  onChange: (skill: { title: string; values: string[] }) => void;
};

export default function Skills({ skill, onChange }: SkillProps) {
  return (
    <section className="border border-slate-400 px-6 py-8 rounded-sm">
      <div className="">
        <form action="">
          <div className="flex flex-col gap-y-3">
            <div className="flex flex-col">
              <label htmlFor="" className="">Skill</label>
              <input 
                type="text" 
                className="w-full rounded-md px-2 py-1"
                value={skill.title}
                onChange={(e) => onChange({...skill, title: e.target.value})}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="">Sub-skills</label>
              <textarea
               className="rounded-md"
               value={skill.values.join(", ")}
               onChange={(e) => 
                onChange({
                  ...skill,
                  values: e.target.value.split(",").map((v) => v.trim())
                })
               }
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  )
};
