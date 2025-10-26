"use client";
import { burnedStore, hydrateBurnedStore } from "@/store/burnedStore";
import { useSnapshot } from "valtio";
import ReactMarkdown from "react-markdown";
import { useEffect } from "react";

export default function ResultView() {
  const snap = useSnapshot(burnedStore);

  useEffect(() => {
    hydrateBurnedStore();
  }, [])

  if (!snap.result?.content) {
    return (
      <div className="border-2 border-dashed border-indigo-300 flex flex-col items-center justify-center p-6">
        <span className="text-5xl">📋</span>
        <h3 className="text-sm font-semibold">No results yet</h3>
        <p className="text-sm text-gray-500">Upload your CV to get started</p>
      </div>
    );
  }

  const { content } = snap.result;
  if (typeof content !== "string") return

  return (
    <div className="border-2 border-dashed border-indigo-300 p-4 w-full">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
