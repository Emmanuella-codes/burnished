import { resumeStore } from "@/store/resumeStore";

type ExperienceProps = {
  company: string;
  occupation: string;
  startDate: string;
  endDate: string;
  location?: string;
  desc: string[];
};

type Props = {
  exp: ExperienceProps;
  index: number;
};

export default function Experiences({ exp, index }: Props) {
  const handleChange = (field: keyof ExperienceProps, value: string) => {
    resumeStore.experiences[index] = {
      ...resumeStore.experiences[index],
      [field]: value,
    };
  };

  const handleDescChange = (descIdx: number, value: string) => {
    resumeStore.experiences[index].desc[descIdx] = value;
  };

  const addDesc = () => {
    resumeStore.experiences[index].desc.push("");
  };

  const removeDesc = (descIdx: number) => {
    if (descIdx === 0) return;
    resumeStore.experiences[index].desc.splice(descIdx, 1);
  };

  return (
    <section className="border border-slate-400 px-6 py-8 rounded-sm">
      <div className="">
        <form action="">
          <div className="flex flex-col gap-y-3">
            <div className="flex flex-col">
              <label htmlFor="" className="">Job Title</label>
              <input
                type="text" 
                className="rounded-md px-2 py-1"
                value={exp.occupation}
                onChange={(e) => handleChange("occupation", e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="">Employer</label>
              <input 
                type="text" 
                className="rounded-md px-2 py-1"
                value={exp.company}
                onChange={(e) => handleChange("company", e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col lg:flex-row lg:gap-x-3">
              <div className="flex flex-col flex-1">
                <label htmlFor="">Start Date</label>
                <input
                  type="text"
                  className="w-full rounded-md px-2 py-1"
                  value={exp.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                />
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="">End Date</label>
                <input
                  type="text"
                  className="w-full rounded-md px-2 py-1"
                  value={exp.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                />
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="">Location</label>
                <input
                  type="text"
                  className="w-full rounded-md px-2 py-1"
                  value={exp.location || ""}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="">Description</label>
              {/* for every description added for this experience, a bullet point is created */}
              <div className="flex flex-col gap-y-3">
                {exp.desc.map((d, idx) => (
                  <div key={`desc-${idx}`} className="flex flex-row gap-x-2">
                    <input 
                      type="text"
                      value={d}
                      onChange={(e) => handleDescChange(idx, e.target.value)}
                      className="rounded-md px-2 py-1 w-full"
                    />
                    <button
                      type="button"
                      className={`px-3 py-1 text-lg ${idx === 0 ? "bg-red-300" : "bg-red-500"} text-white rounded`}
                      onClick={() => removeDesc(idx)}
                      disabled={idx === 0}
                    >
                      ✕
                    </button>
                    <button
                      type="button"
                      className="self-start px-3 py-1 text-lg bg-blue-600 text-white rounded"
                      onClick={addDesc}
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
              
            </div>
          </div>
          
        </form>
      </div>
    </section>
  )
};
