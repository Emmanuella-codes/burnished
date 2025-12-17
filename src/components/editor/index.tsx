"use client";
import { useSnapshot } from "valtio";
import { hydrateResumeStore, resumeStore } from "@/store/resumeStore";
import Template from "../templates";
import { ArrowLeft, Download } from "lucide-react";
import TemplateDrawer from "./components/TemplateDrawer";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { HandleDownloadPDF } from "@/utils/exportAsPDF";
import dynamic from "next/dynamic";

const EditorForm = dynamic(() => import("./EditorForm"), {
  ssr: false,
  loading: () => <div>Loading editor...</div>,
});

export default function ResumeEditor() {
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const snap = useSnapshot(resumeStore);
  const router = useRouter();

  useEffect(() => {
    hydrateResumeStore();
  }, [])

  return (
    <div className="w-full flex flex-col lg:items-center justify-center">
      <div className="flex flex-col px-3">
        <button 
          className="bg-[#574144] text-sm w-20 flex flex-row items-center justify-center text-white py-1 gap-x-1 rounded-md"
          onClick={() => router.back()}
        >
          <ArrowLeft size={20} /> Back
        </button>
        <div className="flex justify-end w-full my-3">
          <TemplateDrawer />
        </div>
      </div>
      <div 
        className="flex flex-row xl:gap-x-8 lg:w-[96%]"
        style={{ height: 'calc(100vh - 200px)' }}
      >
        <div className="w-full lg:w-1/2 shrink-0 lg:pr-4 h-full overflow-y-auto no-scrollbar border">
          <EditorForm />
        </div>
        {/* preview */}
        <div className="hidden lg:flex flex-col lg:w-1/2 h-full border overflow-hidden">
          <div className="flex flex-row justify-between py-3 px-4 flex-shrink-0 border-b">
            <h2 className="lg:text-xl font-bold">Resume Preview</h2>
            <button
              className="flex flex-row items-center gap-x-1 text-sm border border-slate-400 px-2 rounded-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => HandleDownloadPDF(previewRef, snap.header, setIsGenerating)}
              disabled={isGenerating}
            >
              <Download size={15} /> {isGenerating ? "Generating PDF..." : "Download as PDF"}
            </button>
          </div>
          <section ref={previewRef} className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
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
  );
}
