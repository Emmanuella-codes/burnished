"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { uploadCV } from "@/server/session.server";
import { useToast } from "@/hooks/use-toast";
import { handleApiResponse } from "@/server/base.api";
import { useSnapshot } from "valtio";
import { burnedActions, burnedStore } from "@/store/burnedStore";
import { resumeStore } from "@/store/resumeStore";
import { useRouter } from "next/navigation";

export default function FormView() {
  const router = useRouter()
  const snap = useSnapshot(burnedStore);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please upload a CV file",
        variant: "destructive",
      })
      return;
    }
    burnedActions.setLoading(true);

    try {
      const data = await uploadCV(selectedFile, snap.activeTab, snap.jobDesc);
      handleApiResponse(data, (payload) => {
        let content: any; 

        if (snap.activeTab === "format") {
          content = payload?.formattedResume;
          Object.assign(resumeStore, content);
          router.push("/editor");
        } else if (snap.activeTab === "letter") {
          content = payload?.coverLetter;
        } else {
          content = payload?.feedback;
        }

        burnedActions.setResult({
          mode: snap.activeTab,
          content,
        });
        // console.log("🔥 API payload:", payload);
        // console.log("📦 Setting burnedStore.result:", {
        //   mode: snap.activeTab,
        //   content,
        // });
        toast({
          title: "Success",
          description:
            snap.activeTab === "roast"
              ? "Your CV roast is ready!"
              : snap.activeTab === "format"
              ? "Your optimized CV is ready!"
              : "Your cover letter is ready!",
        });
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      burnedActions.setLoading(false);
    }
  };

  return(
    <div className="w-full flex items-center justify-center">
      <div className="bg-indigo-200 py-4 px-2 rounded-md w-full">
        <div className="w-full">
          {/* form */}
          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-y-3 md:px-3">
                <div className="flex flex-col gap-y-3">
                  {/* <label className="font-semibold">Upload your CV/Resume</label> */}
                  <div className="border-2 border-dashed border-indigo-300 flex flex-col lg:py-6 rounded-md">
                    <input
                      className="hidden"
                      id="cv-upload"
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                      required
                    />
                    <label htmlFor="cv-upload" className="cursor-pointer w-full">
                      <div className="flex flex-col w-full items-center py-5">
                        <span className="text-5xl">📄</span>
                        <strong className="text-sm">Click to upload</strong>
                        <span className="text-sm">Accepted formats: PDF, DOCX</span>
                      </div>
                    </label>
                  </div>
                  {selectedFile && (
                    <p className="text-sm">{selectedFile.name}</p>
                  )}
                </div>

                {/* job desc required for format & cover letter */}
                {(snap.activeTab === "format" || snap.activeTab === "letter") && (
                  <div>
                    <label>Job Description</label>
                    <textarea
                      className="resize-none w-full px-2 py-1 h-[100px] rounded-md"
                      value={snap.jobDesc}
                      onChange={(e) => burnedActions.setJobDesc(e.target.value)}
                      required
                    />
                  </div>
                )}

                <Button type="submit" className="w-[140px] bg-indigo-700" disabled={snap.isLoading}>
                  {snap.isLoading
                    ? "Processing..."
                    : snap.activeTab === "roast"
                    ? "Roast CV"
                    : snap.activeTab === "format"
                    ? "Optimize CV"
                    : "Generate Letter"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
