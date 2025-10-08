"use client";
import { useSnapshot } from "valtio";
import { resumeStore } from "@/store/resumeStore";
import EditorForm from "./EditorForm";
import Template from "../templates";

export default function ResumeEditor() {
  const snap = useSnapshot(resumeStore);

  return (
    <div className="mt-24 mb-10 w-full flex justify-center">
      <div className="flex flex-row gap-x-8 w-[98%] max-w-[1400px] h-[calc(100vh-10rem)]">
        <div className="w-1/2 h-[100vh] shrink-0 pr-4 overflow-y-auto no-scrollbar">
          <EditorForm />
        </div>
        {/* preview */}
        <div className="hidden lg:block lg:w-1/2">
          <h2 className="lg:text-xl font-bold">Resume Preview</h2>
          <section className="">
            <Template 
              header={snap.header}
              profileSummary={snap.profileSummary}
              skills={snap.skills as { title: string; values: string[] }[]}
              experiences={snap.experiences as {
                company: string;
                occupation: string;
                startDate: string;
                endDate: string;
                location?: string;
                desc: string[];
              }[]}
              education={snap.education as any}
              projects={snap.projects as any}
              awards={snap.awards as any}
              sectionOrder={snap.sectionOrder as any}
            />
          </section>
        </div>
      </div>
    </div>
  )
};
