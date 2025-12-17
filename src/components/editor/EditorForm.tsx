"use client";
import { resumeStore } from "@/store/resumeStore";
import Awards from "./Awards";
import Education from "./Education";
import Experiences from "./Experience";
import ProfileSummary from "./ProfileSummary";
import Projects from "./Projects";
import Skills from "./Skills";
import { useSnapshot } from "valtio";
import PersonalInfo from "./PersonalInfo";
import { JSX, useState } from "react";
import { Section, SectionButtons } from "./components/SectionCmp";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableSection from "./components/SortableSection";

export default function EditorForm() {
  const snap = useSnapshot(resumeStore);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250, // 👈 long press
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const isLocked = (key: string) =>
    key === "header" || key === "profileSummary";

  const sectionComponents: Record<string, JSX.Element> = {
    header: <PersonalInfo header={snap.header} />,
    profileSummary:  <ProfileSummary profileSummary={snap.profileSummary ?? ""} />,
    skills: (
      <>
        <div className="flex flex-col gap-y-2">
          {snap.skills.map((s, idx) => (
            <Skills
              key={`es-${idx}`}
              index={idx}
            />
          ))}
        </div>
        
        <SectionButtons
          add={() =>
            (resumeStore.skills = [
              ...resumeStore.skills,
              { title: "", values: [""], hidden: false },
            ])
          }
        />
      </>
    ),
    experiences: (
      <>
        <div className="flex flex-col gap-y-2">
          {snap.experiences.map((exp, idx) => (
            <Experiences
              key={`ee-${idx}`}
              exp={{ ...exp, desc: [...exp.desc] }}
              index={idx}
            />
          ))}
        </div>
        <SectionButtons
          add={() =>
            (resumeStore.experiences = [
              ...resumeStore.experiences,
              {
                company: "",
                occupation: "",
                startDate: "",
                endDate: "",
                location: "",
                desc: [""],
                hidden: false,
              },
            ])
          }
        />
      </>
    ),
    education: (
      <>
        <div className="flex flex-col gap-y-2">
          {snap.education.map((edn, idx) => (
            <Education
              key={`eed-${idx}`}
              educn={{ 
                ...edn, 
                desc: edn.desc && edn.desc.length > 0 ? [...edn.desc] : [""],
              }}
              index={idx}
            />
          ))}
        </div>
        <SectionButtons
          add={() =>
            (resumeStore.education = [
              ...resumeStore.education,
              {
                degree: "",
                institution: "",
                startDate: "",
                endDate: "",
                location: "",
                desc: [""],
                hidden: false,
              },
            ])
          }
        />
      </>
    ),
    projects: (
      <>
        <div className="flex flex-col gap-y-2">
          {snap.projects.map((proj, idx) => (
            <Projects
              key={`ep-${idx}`}
              proj={{ 
                ...proj, 
                desc: proj.desc && proj.desc.length > 0 ? [...proj.desc] : [""], 
              }}
              index={idx}
            />
          ))}
        </div>
        <SectionButtons
          add={() =>
            (resumeStore.projects = [
              ...resumeStore.projects,
              {
                title: "",
                link: "",
                subTitle: "",
                desc: [""],
                hidden: false,
              },
            ])
          }
        />
      </>
    ),
    awards: (
      <>
        <div className="flex flex-col gap-y-2">
          {snap.awards?.map((award, idx) => (
            <Awards
              key={`ea-${idx}`}
              award={{ 
                ...award, 
                desc: award.desc && award.desc.length > 0 ? [...award.desc] : [""], 
              }}
              index={idx}
            />
          ))}
        </div>
        <SectionButtons
          add={() =>
            (resumeStore.awards = [
              ...(resumeStore.awards ?? []),
              {
                title: "",
                link: "",
                issuer: "",
                date: "",
                desc: [],
                hidden: false,
              },
            ])
          }
        />
      </>
    ),
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    if (isLocked(active.id) || isLocked(over.id)) return;

    const oldIndex = snap.sectionOrder.indexOf(active.id);
    const newIndex = snap.sectionOrder.indexOf(over.id);

    resumeStore.sectionOrder = arrayMove(
      [...snap.sectionOrder],
      oldIndex,
      newIndex
    );
  };

  return (
    <div className="w-full flex flex-col gap-y-4 px-2 py-4 lg:px-4 lg:py-6 bg-[#dcdbdb] rounded-sm">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={[...snap.sectionOrder]}
          strategy={verticalListSortingStrategy}
        >
          {snap.sectionOrder.map((key) => {
            const locked = isLocked(key);
            const titles: Record<string, string> = {
              header: "👤 Personal Information",
              profileSummary: "📝 Profile (optional)",
              skills: "⚡ Skills",
              experiences: "💼 Professional Experiences",
              education: "🎓 Education",
              projects: "💻 Projects",
              awards: "🏆 Awards / Certifications (optional)",
            };

            return (
              <SortableSection
                key={key}
                id={key}
                disabled={locked}
              >
                {({ attributes, listeners }) => (
                  <Section
                    title={titles[key]}
                    locked={locked}
                    expanded={expandedSection === key}
                    onToggle={() =>
                      setExpandedSection(
                        expandedSection === key ? null : key
                      )
                    }
                    dragHandleProps={!locked ? { ...attributes, ...listeners } : undefined}
                  >
                    {sectionComponents[key]}
                  </Section>
                )}
              </SortableSection>
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  );
}
