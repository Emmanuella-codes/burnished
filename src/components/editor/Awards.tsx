import { resumeStore } from "@/store/resumeStore";

type AwardProps = {
  title: string;
  link?: string;
  issuer?: string;
  date?: string;
  desc?: string[];
};

type Props = {
  award: AwardProps;
  index: number;
};

export default function Awards({ award, index }: Props) {
  const handleChange = (field: keyof AwardProps, value: string) => {
    if (resumeStore.awards) {
      resumeStore.awards[index] = {
        ...resumeStore.awards[index],
        [field]: value,
      }
    };
  };

  // const [day, month, year] (award.date || "").split("/");

  const handleDateChange = (part: "day" | "month" | "year", value: string) => {
    const [d, m, y] = (award.date || "").split("/");

    const newDay = part === "day" ? value : d || "";
    const newMonth = part === "month" ? value : m || "";
    const newYear = part === "year" ? value : y || "";

    const formatted = `${newDay}/${newMonth}/${newYear}`;
    handleChange("date", formatted);
  };

  const handleDescChange = (descIdx: number, value: string) => {
    resumeStore.awards?.[index]?.desc?.splice(descIdx, 1, value);
  };

  const addDesc = () => {
    resumeStore.awards?.[index]?.desc?.push("");
  };

  const removeDesc = (descIdx: number) => {
    resumeStore.awards?.[index]?.desc?.splice(descIdx, 1);
  };

  return (
    <section className="border border-slate-400 px-6 py-8 rounded-sm">
      <div className="">
        <form action="">
          <div className="flex flex-col gap-y-3">
            <div className="flex flex-col">
              <label htmlFor="" className="">Award</label>
              <input
                type="text"
                className="rounded-md px-2 py-1"
                value={award.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="">Link</label>
              <input
                type="text"
                className="rounded-md px-2 py-1"
                value={award.link || ""}
                onChange={(e) => handleChange("link", e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="">Issuer</label>
              <input
                type="text"
                className="rounded-md px-2 py-1"
                value={award.issuer || ""}
                onChange={(e) => handleChange("issuer", e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col lg:flex-row lg:gap-x-3">
              <div className="flex flex-col">
                <label htmlFor="">Day</label>
                <input
                  type="text" 
                  className="w-full rounded-md"
                  // value={}
                  // onChange={(e) => handleDateChange()} 
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Month</label>
                <input
                  type="text" 
                  className="w-full rounded-md"
                  // value={}
                  // onChange={(e) => handleDateChange()} 
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Year</label>
                <input
                  type="text" 
                  className="w-full rounded-md"
                  // value={}
                  // onChange={(e) => handleDateChange()} 
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="">Description</label>
              {/* for every description added for this award, a bullet point is created */}
              <div className="flex flex-col gap-y-3">
                {award.desc?.map((a, idx) => (
                  <div key={`awdd-${idx}`} className="flex flex-row gap-x-2">
                    <input 
                      type="text"
                      value={a}
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
