"use client";
import { burnedStore } from "@/store/burnedStore";
import { useSnapshot } from "valtio";
import ReactMarkdown from "react-markdown";
import { Download } from "lucide-react";
import { downloadPdfFile, downloadTextFile } from "@/utils/downloadFile";
// import { useEffect } from "react";

export default function ResultView() {
  const snap = useSnapshot(burnedStore);

  // useEffect(() => {
  //   hydrateBurnedStore();
  // }, [])

  if (!snap.result?.content) {
    return (
      <div className="border-2 border-dashed border-[#92b0b0] rounded-md flex flex-col items-center justify-center p-6">
        <span className="text-5xl">📋</span>
        <h3 className="text-sm font-semibold">No results yet</h3>
        <p className="text-sm text-gray-500">Upload your CV to get started</p>
      </div>
    );
  }

  const { content, mode } = snap.result;
  if (typeof content !== "string") return null;

  const fileExtension = mode === "letter" ? ".pdf" : mode === "roast" ? ".txt" : null;

  const handleDownload = () => {
    if (mode === "roast") {
      downloadTextFile(content);
      return;
    }

    if (mode === "letter") {
      downloadPdfFile(content);
    }
  };

  return (
    <div className="">
      {fileExtension && (
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-1.5 text-sm"
          >
            <Download size={16} />
            <span>{fileExtension}</span>
          </button>
        </div>
      )}
      <div className="border-2 border-dashed border-indigo-300 p-4 w-full">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
    
  );
}
