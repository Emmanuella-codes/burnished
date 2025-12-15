import { useDateFields } from "@/hooks/useDateFields";
import { useCursorPreservingChange } from "@/hooks/usePreserveCursor";
import { maxDate } from "@/hooks/useSingleDateField";
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
  const { handleChange, setRef } = useCursorPreservingChange<HTMLInputElement>();

  const updateField = (field: keyof ExperienceProps, value: string) => {
    handleChange(field, () => {
      (resumeStore.experiences[index] as any)[field] = value;
    });
  };

  const updateDesc = (descIdx: number, value: string) => {
    handleChange(`desc-${descIdx}`, () => {
      resumeStore.experiences[index].desc[descIdx] = value;
    });
  };

  const addDesc = () => {
    resumeStore.experiences[index].desc.push("");
  };

  const removeDesc = (descIdx: number) => {
    if (descIdx === 0) return;
    resumeStore.experiences[index].desc.splice(descIdx, 1);
  };

  const dateFields = useDateFields({
    startDate: exp.startDate,
    endDate: exp.endDate,
    onUpdate: (field, value) => {
      resumeStore.experiences[index][field] = value;
    },
  });

  return (
    <section className="border border-slate-400 px-6 py-8 rounded-sm">
      <div className="">
        <form action="">
          <div className="flex flex-col gap-y-3">
            <div className="flex flex-col">
              <label htmlFor="" className="">Job Title</label>
              <input
                ref={setRef('occupation')}
                type="text" 
                className="rounded-md px-2 py-1 border border-gray-700"
                value={exp.occupation}
                onChange={(e) => updateField("occupation", e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="">Employer</label>
              <input
                ref={setRef('company')}
                type="text" 
                className="rounded-md px-2 py-1 border border-gray-700"
                value={exp.company}
                onChange={(e) => updateField("company", e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col lg:flex-row lg:gap-x-3">
              <div className="flex flex-col flex-1">
                <label htmlFor="">Start Date</label>
                <input
                  type="month"
                  className="w-full rounded-md px-2 py-1 border border-gray-700"
                  max={maxDate}
                  value={dateFields.getInputValue(exp.startDate)}
                  onChange={(e) => dateFields.handleDateChange("startDate", e.target.value)}
                />
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="">End Date</label>
                <div className="flex flex-col gap-y-1">
                  <input
                    type="month"
                    className="w-full rounded-md px-2 py-1 border border-gray-700"
                    max={maxDate}
                    min={dateFields.getInputValue(exp.startDate)}
                    value={dateFields.getInputValue(exp.endDate)}
                    onChange={(e) => dateFields.handleDateChange("endDate", e.target.value)}
                    disabled={dateFields.isPresent}
                  />
                  <label className="flex items-center gap-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={dateFields.isPresent}
                      onChange={dateFields.handlePresentToggle}
                      className="cursor-pointer"
                    />
                    <span>Currently working here</span>
                  </label>
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="">Location</label>
                <input
                  ref={setRef('location')}
                  type="text"
                  className="w-full rounded-md px-2 py-1 border border-gray-700"
                  value={exp.location || ""}
                  onChange={(e) => updateField("location", e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="">Description</label>
              {/* for every description added for this experience, a bullet point is created */}
              <div className="flex flex-col gap-y-3">
                {exp.desc.map((d, idx) => (
                  <div key={`exp-desc-${idx}`} className="flex flex-row gap-x-2">
                    <input
                      ref={setRef(`desc-${idx}`)}
                      type="text"
                      value={d}
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
