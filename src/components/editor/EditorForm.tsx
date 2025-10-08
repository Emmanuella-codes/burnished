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

    if (["personal", "profileSummary"].includes(dragging)) return;
    if (["personal", "profileSummary"].includes(targetSection)) return;

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
    key === "personal" || key === "profileSummary";

  const sectionComponents: Record<string, JSX.Element> = {
    personal: (
      <Section title="👤 Personal Information">
        <PersonalInfo header={snap.header} />
      </Section>
    ),
    profileSummary: (
      <Section title="📝 Profile">
        <ProfileSummary profileSummary={snap.profileSummary ?? ""} />
      </Section>
    ),
    skills: (
      <Section title="⚡ Skills">
        {snap.skills.map((s, idx) => (
          <Skills
            key={`es-${idx}`}
            skill={{ title: s.title, values: [...s.values] }}
            onChange={(updated) => (resumeStore.skills[idx] = updated)}
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
      </Section>
    ),
    experiences: (
      <Section title="💼 Professional Experiences">
        {snap.experiences.map((exp, idx) => (
          <Experiences
            key={`ee-${idx}`}
            exp={{ ...exp, desc: [...exp.desc] }}
            index={idx}
          />
        ))}
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
      </Section>
    ),
    education: (
      <Section title="🎓 Education">
        {snap.education.map((edn, idx) => (
          <Education
            key={`eed-${idx}`}
            educn={{ ...edn, desc: [...(edn.desc ?? [])] }}
            index={idx}
          />
        ))}
        <SectionButtons
          add={() =>
            (resumeStore.education = [
              ...resumeStore.education,
              {
                degree: "",
                insitution: "",
                startDate: "",
                endDate: "",
                location: "",
                desc: [""],
              },
            ])
          }
          remove={() => resumeStore.education.pop()}
        />
      </Section>
    ),
    projects: (
      <Section title="💻 Projects">
        {snap.projects.map((proj, idx) => (
          <Projects
            key={`ep-${idx}`}
            proj={{ ...proj, desc: [...proj.desc] }}
            index={idx}
          />
        ))}
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
      </Section>
    ),
    awards: (
      <Section title="🏆 Awards (optional)">
        {snap.awards?.map((award, idx) => (
          <Awards
            key={`ea-${idx}`}
            award={{ ...award, desc: [...(award.desc ?? [])] }}
            index={idx}
          />
        ))}
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
      </Section>
    ),
  };

  return (
    <div className="flex flex-col gap-y-9 bg-slate-300/50 lg:px-5 lg:py-6 rounded-sm">
      {snap.sectionOrder.map((key) => {
        const locked = isLocked(key);
        const section = sectionComponents[key];

        return (
          <Section
            key={key}
            title={section.props.title}
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
            {section.props.children}
          </Section>
        );
      })}
    </div>
  );
}
