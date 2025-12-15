import { useDateFields } from "@/hooks/useDateFields";
import { useCursorPreservingChange } from "@/hooks/usePreserveCursor";
import { maxDate } from "@/hooks/useSingleDateField";
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
  const { handleChange, setRef } = useCursorPreservingChange<HTMLInputElement>();

  const updateField = (field: keyof EducationProps, value: string) => {
    handleChange(field, () => {
      (resumeStore.education[index] as any)[field] = value;
    })
  };

  const updateDesc = (descIdx: number, value: string) => {
    handleChange(`desc-${descIdx}`, () => {
      resumeStore.experiences[index].desc[descIdx] = value;
    });
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

  const dateFields = useDateFields({
      startDate: educn.startDate,
      endDate: educn.endDate,
      onUpdate: (field, value) => {
        resumeStore.education[index][field] = value;
      },
    });

  return (
    <section className="border border-slate-400 px-6 py-8 rounded-sm">
      <div className="">
        <form action="">
          <div className="flex flex-col gap-y-3">
            <div className="flex flex-col">
              <label htmlFor="" className="">Degree</label>
              <input 
                ref={setRef('degree')}
                type="text" 
                className="rounded-md px-2 py-1 border border-gray-700"
                value={educn.degree}
                onChange={(e) => updateField("degree", e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="">School / Institution</label>
              <input
                ref={setRef('institution')} 
                type="text" 
                className="rounded-md px-2 py-1 border border-gray-700"
                value={educn.institution}
                onChange={(e) => updateField("institution", e.target.value)}
              />
            </div>
            <div className="flex w-full flex-col lg:flex-row lg:gap-x-3">
              <div className="flex flex-col flex-1">
                <label htmlFor="">Start Date</label>
                <input 
                  type="month" 
                  className="w-full rounded-md px-2 py-1 border border-gray-700"
                  max={maxDate}
                  value={dateFields.getInputValue(educn.startDate)}
                  onChange={(e) => updateField("startDate", e.target.value)}
                />
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="">End Date</label>
                <div className="flex flex-col gap-y-1">
                  <input 
                    type="month" 
                    className="w-full rounded-md px-2 py-1 border border-gray-700"
                    max={maxDate}
                    min={dateFields.getInputValue(educn.startDate)}
                    value={dateFields.getInputValue(educn.endDate)}
                    onChange={(e) => updateField("endDate", e.target.value)}
                  />
                  <label className="flex items-center gap-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={dateFields.isPresent}
                      onChange={dateFields.handlePresentToggle}
                      className="cursor-pointer"
                    />
                    <span>Currently schooling here</span>
                  </label>
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="">Location</label>
                <input
                  ref={setRef('location')}
                  type="text" 
                  className="w-full rounded-md px-2 py-1 border border-gray-700"
                  value={educn.location || ""}
                  onChange={(e) => updateField("location", e.target.value)}
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
                      ref={setRef(`desc-${idx}`)}
                      type="text"
                      value={ed}
                      onChange={(e) => updateDesc(idx, e.target.value)}
                      className="rounded-md px-2 py-1 w-full border border-gray-700"
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
  );
}
