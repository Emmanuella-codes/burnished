"use client";
import { useSnapshot } from "valtio";
import { resumeStore } from "@/store/resumeStore";
import EditorForm from "./EditorForm";
import Template from "../templates";
import { initMockResume } from "@/lib/initResume";
import { Download } from "lucide-react";

initMockResume();

export default function ResumeEditor() {
  const snap = useSnapshot(resumeStore);

  return (
    <div className="fixed pt-24 inset-0 w-full flex justify-center">
      <div className="flex flex-row gap-x-8 w-[96%] h-full">
        <div className="w-1/2 shrink-0 pr-4 h-full overflow-y-auto no-scrollbar border">
          <EditorForm />
        </div>
        {/* preview */}
        <div className="hidden lg:flex flex-col lg:w-1/2 h-full border">
          <div className="flex flex-row justify-between my-3 flex-shrink-0">
            <h2 className="lg:text-xl font-bold">Resume Preview</h2>
            <button
              className="flex flex-row items-center gap-x-1 text-sm border border-slate-400 px-2 rounded-sm"
            >
              <Download size={15} /> Export as PDF
            </button>
          </div>
          <section className="mb-3 overflow-y-auto no-scrollbar flex-1">
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
