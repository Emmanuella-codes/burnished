"use client";
import { GripVertical, Maximize2, Minimize2 } from "lucide-react";
import { useState } from "react";

type SectionProps = {
  title: string;
  children: React.ReactNode;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  isDragging?: boolean;
  isHovered?: boolean;
};

export function Section({
  title,
  children,
  draggable = false,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  isDragging,
  isHovered,
}: SectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded((prev) => !prev);
  
  return (
    <div
      className={`flex flex-col gap-y-2 lg:gap-y-4 rounded-md transition-all duration-150 ${
        isDragging ? "opacity-50 border-dashed border-blue-400" : ""
      } ${isHovered ? "bg-blue-50 border border-blue-300" : "border-transparent"}`} 
    >
      <div 
        className={`flex flex-row justify-between items-center border border-slate-400 rounded-sm p-2 ${
          draggable ? "cursor-grab active:cursor-move" : "cursor-default"
        }`}
        draggable={draggable}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <div className="flex flex-row items-center gap-2">
          {draggable && (
            <GripVertical
              size={16}
              className="text-gray-500 cursor-grab active:cursor-grabbing"
            />
          )}
          <h2 className="md:text-xl text-sm font-bold">{title}</h2>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // prevent interfering with drag
            toggleExpand();
          }}
          title={isExpanded ? "Collapse section" : "Expand section"}
        >
          {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
      </div>
      {isExpanded && (
        <div className="animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
}

export function SectionButtons({
  add,
  remove,
  showRemove = true,
}: {
  add: () => void;
  remove: () => void;
  showRemove?: boolean;
}) {
  return (
    <div className="flex flex-row mt-3 gap-x-3 justify-end">
      <CtaButton text="Add" onClick={add} className="" />
      {showRemove && <CtaButton text="Remove" onClick={remove} className="" />}
    </div>
  );
}

export function CtaButton({
  className,
  onClick,
  text,
}: {
  className: string;
  onClick: () => void;
  text: "Add" | "Remove";
}) {
  return (
    <button
      className={`border p-2 text-sm rounded-lg text-white ${
        text === "Add" ? "bg-teal-500" : "bg-stone-500"
      } ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
