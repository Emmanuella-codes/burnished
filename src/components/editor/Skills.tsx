"use client";
import { resumeStore } from "@/store/resumeStore";
import { useSnapshot } from "valtio";

type SkillProps = {
  index: number;
};

export default function Skills({ index }: SkillProps) {
  const snap = useSnapshot(resumeStore);
  const skill = snap.skills[index];
  
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
                onChange={(e) => {
                  resumeStore.skills[index].title = e.target.value;
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="">Sub-skills</label>
              <textarea
               className="rounded-md"
               value={skill.values.join(", ")}
               onChange={(e) => {
                const text = e.target.value;
                resumeStore.skills[index].values = text.split(",").map(v => v.trim());
               }}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  )
};
