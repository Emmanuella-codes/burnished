import React, { useState } from "react";
import { Button } from "./ui/button";
import { Mode } from "@/server/session.server";

export default function FormView() {
  const [activeTab, setActiveTab] = useState<Mode>("roast")
  const [file, setFile] = useState<File | null>(null)
  const [jobDesc, setJobDesc] = useState<string>("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  return(
    <div className="border-4 w-full md:w-[505px] h-[300px] py-4 px-2">
      <div className="w-full">
        <div className="w-full flex flex-row justify-between gap-2">
          <Button 
            className={`${activeTab === "roast" ? 'font-bold' : ''} w-1/2`}
            onClick={() => setActiveTab('roast')}
          >
            Roast
          </Button>
          <Button 
            className={`${activeTab === "optimize" ? 'font-bold' : ''} w-1/2`}
            onClick={() => setActiveTab('optimize')}
          >
            Optimize
          </Button>
        </div>
        <div className="mt-5">
          <form onSubmit={handleSubmit}>
            <div className="">
              <label htmlFor="cv-upload">Upload your CV/Resume</label>
              <br />
              <input
                className="pt-1"
                id="cv-upload"
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                required
              />
              <p className="text-sm text-muted-foreground pt-1">
                Accepted formats: PDF, DOCX
              </p>
            </div>

            {activeTab === "optimize" && (
              <div className="">
                <label htmlFor="job-desc">Job Description</label>
                <textarea 
                  name="" 
                  id="job-desc"
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  required
                />
              </div>
            )}
            <Button type="submit">{activeTab === "roast" ? "Roast" : "Optimize"}</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
