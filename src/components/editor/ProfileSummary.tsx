import { useCursorPreservingChange } from "@/hooks/usePreserveCursor";
import { resumeStore } from "@/store/resumeStore";
import { useRef } from "react";

export default function ProfileSummary({profileSummary}: { profileSummary?: string }) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { handleChange, setRef } = useCursorPreservingChange<HTMLTextAreaElement>();

  const updateSummary = (value: string) => {
    handleChange('summary', () => {
      resumeStore.profileSummary = value;
    });
  };

  // add visibility toggle

  return (
    <section className="border border-slate-400 px-6 py-8 rounded-sm">
      <div className="">
        <form action="">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="" className="">Profile Summary</label>
            <textarea
              ref={setRef('summary')}
              className="w-full rounded-md px-2 py-1 lg:h-20 resize-none border border-gray-700" 
              value={profileSummary || ""}
              onChange={(e) => updateSummary(e.target.value)}
            />
          </div>
        </form>
      </div>
    </section>
  );
}
