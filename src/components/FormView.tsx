"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { uploadCV } from "@/server/session.server";
import { useToast } from "@/hooks/use-toast";
import { handleApiResponse, POST } from "@/server/base.api";
import { useSnapshot } from "valtio";
import { burnedActions, burnedStore } from "@/store/burnedStore";

export default function FormView() {
  const snap = useSnapshot(burnedStore);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      burnedActions.setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!snap.file) {
      toast({
        title: "Error",
        description: "Please upload a CV file",
        variant: "destructive",
      })
      return;
    }
    burnedActions.setLoading(true);

    try {
      const data = await uploadCV(snap.file, snap.activeTab, snap.jobDesc);
      handleApiResponse(data, (payload) => {
        burnedActions.setResult({
          mode: snap.activeTab,
          content:
            snap.activeTab === "format"
              ? payload.formattedFile || ""
              : snap.activeTab === "letter"
              ? payload.coverLetterFile || ""
              : payload.feedback || "",
          fileType: snap.activeTab === "roast" ? "text" : "file",
        });
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
                  <label className="font-semibold">Upload your CV/Resume</label>
                  <div className="border-2 border-dashed border-indigo-300 flex flex-col lg:py-6 rounded-md">
                    <input
                      className="absolute opacity-0 w-0 h-0"
                      id="cv-upload"
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                      required
                    />
                    <label>
                      <div className="flex flex-col w-full items-center">
                        <span className="text-5xl">📄</span>
                        <strong className="text-sm">Click to upload</strong>
                        <span className="text-sm">Accepted formats: PDF, DOCX</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* job desc required for format & cover letter */}
                {(snap.activeTab === "format" || snap.activeTab === "letter") && (
                  <div>
                    <label>Job Description</label>
                    <textarea
                      className="resize-none w-full h-[100px] rounded-md"
                      value={snap.jobDesc}
                      onChange={(e) => burnedActions.setJobDesc(e.target.value)}
                      required
                    />
                  </div>
                )}

                <Button type="submit" className="w-[140px]" disabled={snap.isLoading}>
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
