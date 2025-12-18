"use client";
import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";

type SectionProps = {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  locked?: boolean;
  dragHandleProps?: any;
  children: React.ReactNode;
};

export function Section({
  title,
  expanded,
  onToggle,
  locked,
  dragHandleProps,
  children,
}: SectionProps) {
  // const [isExpanded, setIsExpanded] = useState(false);
  // const toggleExpand = () => setIsExpanded((prev) => !prev);
  
  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-x-2">
          {!locked && (
            <button
              {...dragHandleProps}
              className="cursor-grab active:cursor-grabbing touch-none"
              aria-label="Reorder section"
            >
              ☰
            </button>
          )}

          <h3 className="font-semibold">{title}</h3>
        </div>

        <button onClick={onToggle} className="text-lg">
          {expanded ? "−" : "+"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t"
          >
            <div className="p-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SectionButtons({ add }: { add: () => void }) {
  return (
    <div className="flex flex-row mt-3 gap-x-3 justify-end">
      <CtaButton text="Add" onClick={add} className="" />
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
