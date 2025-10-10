"use client";
import { burnedStore } from "@/store/burnedStore";
import { useSnapshot } from "valtio";

export default function ResultView() {
  const snap = useSnapshot(burnedStore);

  if (!snap.result) {
    return (
      <div className="border-2 border-dashed border-indigo-300 flex flex-col items-center justify-center p-6">
        <span className="text-5xl">📋</span>
        <h3 className="text-sm font-semibold">No results yet</h3>
        <p className="text-sm text-gray-500">Upload your CV to get started</p>
      </div>
    );
  }

  return (
    <div className="border-2 border-dashed border-indigo-300 p-4 w-full">
      {snap.result.fileType === "text" && (
        <pre className="whitespace-pre-wrap text-sm">
          {snap.result.content}
        </pre>
      )}
    </div>
  );
}
