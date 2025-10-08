"use client";
import { resumeStore } from "@/store/resumeStore";
import { useState } from "react";
import { useSnapshot } from "valtio";


export default function SectionOrderEditor() {
  const snap = useSnapshot(resumeStore);
  const [dragging, setDragging] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const handleDragStart = (section: string) => setDragging(section);
  const handleDragEnd = () => setDragging(null);

  const handleDrop = (targetSection: string) => {
    if (!dragging || dragging === targetSection) return;

    const newOrder = [...snap.sectionOrder];
    const fromIndex = newOrder.indexOf(dragging);
    const toIndex = newOrder.indexOf(targetSection);

    // Move the dragged section
    newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, dragging);

    resumeStore.sectionOrder = newOrder;
    setDragging(null);
    setHovered(null);
  };


  return (
    <div className="mt-6 border border-slate-400 rounded-md p-4">
      <h3 className="font-semibold text-lg mb-3">🧩 Reorder Sections</h3>

      <div className="flex flex-col gap-2">
        {snap.sectionOrder.map((section) => (
          <div
            key={section}
            draggable
            onDragStart={() => handleDragStart(section)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => {
              e.preventDefault();
              setHovered(section);
            }}
            onDragLeave={() => setHovered(null)}
            onDrop={() => handleDrop(section)}
            className={`cursor-move px-4 py-2 rounded-md border 
              ${dragging === section ? "opacity-50 border-dashed border-blue-400" : ""}
              ${hovered === section && dragging !== section ? "bg-blue-50 border border-blue-300" : "border-slate-300"}
              transition-all duration-150 ease-in-out`}
          >
            <span className="capitalize">{section}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
