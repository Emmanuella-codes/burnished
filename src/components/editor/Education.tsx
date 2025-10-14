import { resumeStore } from "@/store/resumeStore";

type EducationProps = {
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  location?: string;
  desc?: string[];
};

type Props = {
  educn: EducationProps;
  index: number;
};

export default function Education({ educn, index }: Props) {
  const handleChange = (field: keyof EducationProps, value: string) => {
    resumeStore.education[index] = {
      ...resumeStore.education[index],
      [field]: value,
    };
  };

  const handleDescChange = (descIdx: number, value: string) => {
    if (resumeStore.education[index].desc) {
      resumeStore.education[index].desc[descIdx] = value;
    }
  };

  const addDesc = () => {
    if (resumeStore.education[index].desc) {
      resumeStore.education[index].desc.push("");
    }
  };

  const removeDesc = (descIdx: number) => {
    if (resumeStore.education[index].desc) {
      if (descIdx === 0) return;
      resumeStore.education[index].desc.splice(descIdx, 1);
    }
  };

  return (
    <section className="border border-slate-400 px-6 py-8 rounded-sm">
      <div className="">
        <form action="">
          <div className="flex flex-col gap-y-3">
            <div className="flex flex-col">
              <label htmlFor="" className="">Degree</label>
              <input 
                type="text" 
                className="rounded-md px-2 py-1"
                value={educn.degree}
                onChange={(e) => handleChange("degree", e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="">School / Institution</label>
              <input 
                type="text" 
                className="rounded-md px-2 py-1"
                value={educn.institution}
                onChange={(e) => handleChange("institution", e.target.value)}
              />
            </div>
            <div className="flex w-full flex-col lg:flex-row lg:gap-x-3">
              <div className="flex flex-col flex-1">
                <label htmlFor="">Start Date</label>
                <input 
                  type="text" 
                  className="w-full rounded-md px-2 py-1"
                  value={educn.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                />
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="">End Date</label>
                <input 
                  type="text" 
                  className="w-full rounded-md px-2 py-1" 
                  value={educn.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                />
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="">Location</label>
                <input 
                  type="text" 
                  className="w-full rounded-md px-2 py-1"
                  value={educn.location || ""}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="">Description</label>
              {/* for every description added for this experience, a bullet point is created */}
              <div className="flex flex-col gap-y-3">
                {educn.desc?.map((ed, idx) => (
                  <div key={`edcn-${idx}`} className="flex flex-row gap-x-2">
                    <input 
                      type="text"
                      value={ed}
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
      {/* AI Suggestion */}
      <div className=""></div>
    </section>
  )
};
