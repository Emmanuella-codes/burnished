"use client";
import Template from "@/components/templates";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { resumeStore } from "@/store/resumeStore";
import { Download } from "lucide-react";
import { useSnapshot } from "valtio";

export default function TemplateDrawer() {
  const snap = useSnapshot(resumeStore);
  
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="lg:hidden bg-slate-700 text-slate-200 text-sm px-2 py-1 rounded-md">
          Preview Template
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4 overflow-y-auto max-h-[70vh]">
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
        </div>
        <DrawerFooter>
          <button
            className="flex flex-row items-center justify-center gap-x-1 text-sm border border-slate-400 px-2 py-2 rounded-sm"
          >
            <Download size={15} /> Export as PDF
          </button>
          <DrawerClose asChild>
            <button className="border border-slate-300 px-2 py-2 rounded-sm text-sm">
              Close
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
