"use client";
import { useCursorPreservingChange } from "@/hooks/usePreserveCursor";
import { resumeStore } from "@/store/resumeStore";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";

type SkillProps = {
  index: number;
};

export default function Skills({ index }: SkillProps) {
  const snap = useSnapshot(resumeStore);
  const skill = snap.skills[index];
  const { handleChange, setRef } = useCursorPreservingChange<HTMLInputElement | HTMLTextAreaElement>();
  const [rawValue, setRawValue] = useState(() => skill.values.join(", "));

  useEffect(() => {
    setRawValue(skill.values.join(", "));
  }, [skill.values.join(", ")]);
  
  const updateTitle = (value: string) => {
    handleChange('title', () => {
      resumeStore.skills[index].title = value;
    });
  };

  const updateValues = (value: string) => {
    setRawValue(value); // Update local immediately
    
    // Parse and update store in real-time for preview
    handleChange('values', () => {
      resumeStore.skills[index].values = value
        .split(",")
        .map(v => v.trim())
        .filter(v => v !== '');
    });
  };
  
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
                ref={setRef('title')}
                onChange={(e) => updateTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="">Sub-skills</label>
              <textarea
                className="rounded-md px-2 py-1 lg:h-20 resize-none"
                value={rawValue}
                ref={setRef('values')}
                onChange={(e) => updateValues(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
