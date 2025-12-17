"use client";
import { useSnapshot } from "valtio";
import FormView from "../FormView";
import ResultView from "../ResultView";
import { burnedActions, burnedStore } from "@/store/burnedStore";
import { Button } from "../ui/button";

export default function BurnedCmp() {
  const snap = useSnapshot(burnedStore);

  return (
    <div className="w-full flex flex-col items-center lg:gap-y-8">
      <div className="lg:w-[60%]">
        <div className="flex flex-col items-center mb-3">
          <h2 className="text-xl">🔥 CV/Resume Optimizer</h2>
          <p className="text-center">Roast, optimize or generate cover letters for your CV/Resume</p>
        </div>
        <div className="w-full flex flex-row justify-between gap-2 flex-wrap lg:flex-nowrap">
          {["roast", "format", "letter"].map((tab) => (
            <button
              key={tab}
              className={`${snap.activeTab === tab ? "font-bold bg-[#574144]" : "bg-[#7c585c]"} w-full lg:w-1/3 py-1.5 rounded-lg text-white text-base`}
              onClick={() => burnedActions.setActiveTab(tab as any)}
            >
              {tab === "roast"
                ? "🔥 Roast"
                : tab === "format"
                ? "✨ Optimize"
                : "📝 Cover Letter"}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full lg:w-[96%] mt-5 mb-4 lg:mb-0 flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-1/2">
          <FormView />
        </div>
        <div className="w-full lg:w-1/2 lg:h-[800px] overflow-y-auto no-scrollbar">
          <ResultView />
        </div>        
      </div>
    </div>
  );
}
