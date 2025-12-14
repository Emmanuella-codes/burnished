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

export default function EditorForm() {
  const snap = useSnapshot(resumeStore);
  const [dragging, setDragging] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const handleDrop = (targetSection: string) => {
    if (!dragging || dragging === targetSection) return;

    if (["header", "profileSummary"].includes(dragging)) return;
    if (["header", "profileSummary"].includes(targetSection)) return;

    const newOrder = [...snap.sectionOrder];
    const fromIndex = newOrder.indexOf(dragging);
    const toIndex = newOrder.indexOf(targetSection);

    newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, dragging);

    resumeStore.sectionOrder = newOrder;
    setDragging(null);
    setHovered(null);
  };

  const isLocked = (key: string) =>
    key === "header" || key === "profileSummary";

  const sectionComponents: Record<string, JSX.Element> = {
    header: <PersonalInfo header={snap.header} />,
    profileSummary:  <ProfileSummary profileSummary={snap.profileSummary ?? ""} />,
    skills: (
      <>
        {snap.skills.map((s, idx) => (
          <Skills
            key={`es-${idx}`}
            index={idx}
          />
        ))}
        <SectionButtons
          add={() =>
            (resumeStore.skills = [
              ...resumeStore.skills,
              { title: "", values: [""] },
            ])
          }
          remove={() => resumeStore.skills.pop()}
          showRemove={snap.skills.length > 1}
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
              },
            ])
          }
          remove={() => resumeStore.experiences.pop()}
        />
      </>
    ),
    education: (
      <>
        <div className="flex flex-col gap-y-2">
          {snap.education.map((edn, idx) => (
            <Education
              key={`eed-${idx}`}
              educn={{ ...edn, desc: [...(edn.desc ?? [])] }}
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
              },
            ])
          }
          remove={() => resumeStore.education.pop()}
        />
      </>
    ),
    projects: (
      <>
        <div className="flex flex-col gap-y-2">
          {snap.projects.map((proj, idx) => (
            <Projects
              key={`ep-${idx}`}
              proj={{ ...proj, desc: [...proj.desc] }}
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
              },
            ])
          }
          remove={() => resumeStore.projects.pop()}
        />
      </>
    ),
    awards: (
      <>
        <div className="flex flex-col gap-y-2">
          {snap.awards?.map((award, idx) => (
            <Awards
              key={`ea-${idx}`}
              award={{ ...award, desc: [...(award.desc ?? [])] }}
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
              },
            ])
          }
          remove={() => resumeStore.awards?.pop()}
        />
      </>
    ),
  };

  return (
    <div className="w-full flex flex-col gap-y-4 lg:gap-y-9 px-2 py-4 bg-slate-300/50 lg:px-5 lg:py-6 rounded-sm">
      {snap.sectionOrder.map((key) => {
        const locked = isLocked(key);
        const section = sectionComponents[key];

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
          <Section
            key={key}
            title={titles[key]}
            draggable={!locked}
            onDragStart={() => !locked && setDragging(key)}
            onDragEnd={() => setDragging(null)}
            onDragOver={(e) => {
              e.preventDefault();
              if (!locked) setHovered(key);
            }}
            onDrop={() => handleDrop(key)}
            isDragging={dragging === key}
            isHovered={hovered === key && dragging !== key}
          >
            {section}
          </Section>
        );
      })}
    </div>
  );
}
