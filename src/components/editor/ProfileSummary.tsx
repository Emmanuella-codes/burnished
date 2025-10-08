import { resumeStore } from "@/store/resumeStore";

export default function ProfileSummary({profileSummary}: { profileSummary?: string }) {
  const handleChange = (value: string) => {
    resumeStore.profileSummary = value;
  };

  return (
    <section className="border border-slate-400 px-6 py-8 rounded-sm">
      <div className="">
        <form action="">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="" className="">Profile Summary</label>
            <textarea 
              className="w-full rounded-md" 
              value={profileSummary || ""}
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
        </form>
      </div>
    </section>
  )
};
