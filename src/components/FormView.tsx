import React, { useState } from "react";
import { Button } from "./ui/button";
import { Mode } from "@/server/session.server";
import { useToast } from "@/hooks/use-toast";
import { handleApiResponse, POST } from "@/server/base.api";
import { UploadResponse } from "@/typings/document";

export default function FormView() {
  const [activeTab, setActiveTab] = useState<Mode>("roast")
  const [file, setFile] = useState<File | null>(null)
  const [jobDesc, setJobDesc] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "Error",
        description: "Please upload a CV file",
        variant: "destructive",
      })
      return;
    }

    const formData = new FormData();
    formData.append("cv", file);
    formData.append("mode", activeTab);

    if (activeTab === "optimize" && jobDesc) {
      formData.append("jobDescription", jobDesc)
    }
    setIsLoading(true);

    const response = await POST<UploadResponse>({
      ext: "upload",
      body: formData,
    });

    try {
      handleApiResponse<UploadResponse>(
        response,
        (data) => {
          toast({
            title: "Success",
            description: "Your action was successfull."
          });
          console.log("results: ", data)
        },
        (errorMessage) => {
          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
          });
        }
      );
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return(
    <div className="border-4 w-full md:w-[505px] h-[350px] py-4 px-2">
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
            <div className="flex flex-col gap-3 md:px-3">
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
                  <br />
                  <textarea 
                    name="" 
                    id="job-desc"
                    className="resize-none w-[240px] md:w-[400px] h-[80px]"
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                    required
                  />
                </div>
              )}
              <Button 
                type="submit" 
                className="w-[120px]"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : activeTab === "roast" ? "Roast" : "Optimize"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
