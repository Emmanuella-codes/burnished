"use client"

import { cvStore } from "@/store/resultStore"
import { useSnapshot } from "valtio"
import { Button } from "./ui/button";

export default function ResultView() {
  const snap = useSnapshot(cvStore);

  if (!snap.results) return null;

  const { mode, content, fileType } = snap.results;

  return (
    <div className="">
      <h2>
        {mode === "roast"
          ? "CV Roast Result"
          : mode === "format"
          ? "Optimized CV"
          : "Cover Letter"
        }
      </h2>

      {fileType !== "text" ? (
        <a 
          href={content || "#"}
          download={`${mode === "format" ? "optimized-cv" : "cover-letter"}.${fileType}`}
          className=""
        >
          Download {fileType.toUpperCase()}
          </a>
      ) : (
        <pre className="">
          {content}
        </pre>
      )}

      <div className="">
        <Button onClick={() => (cvStore.results = null)}>Clear</Button>
      </div>
    </div>
  )
}
