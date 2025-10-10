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
          <h2 className="font-semibold text-xl">🔥 CV/Resume Optimizer</h2>
          <p className="">Roast, optimize or generate cover letters for your CV/Resume</p>
        </div>
        <div className="w-full flex flex-row justify-between gap-2">
          {["roast", "format", "letter"].map((tab) => (
            <Button
              key={tab}
              className={`${snap.activeTab === tab ? "font-bold" : ""} w-1/3`}
              onClick={() => burnedActions.setActiveTab(tab as any)}
            >
              {tab === "roast"
                ? "🔥 Roast"
                : tab === "format"
                ? "✨ Optimize"
                : "📝 Cover Letter"}
            </Button>
          ))}
        </div>
      </div>
      <div className="w-[96%] flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-1/2">
          <FormView />
        </div>
        <div className="w-full lg:w-1/2 h-[800px] overflow-y-auto ">
          <ResultView />
        </div>        
      </div>
    </div>
  );
}
