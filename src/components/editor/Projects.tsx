import { resumeStore } from "@/store/resumeStore";

type ProjectsProps = {
  title: string;
  link?: string;
  subTitle?: string;
  desc: string[];
};

type Props = {
  proj: ProjectsProps;
  index: number;
};

export default function Projects({ proj, index }: Props) {
  const handleChange = (field: keyof ProjectsProps, value: string) => {
    resumeStore.projects[index] = {
      ...resumeStore.projects[index],
      [field]: value,
    };
  };

  const handleDescChange = (descIdx: number, value: string) => {
    resumeStore.projects[index].desc[descIdx] = value;
  };

  const addDesc = () => {
    resumeStore.projects[index].desc.push("");
  };

  const removeDesc = (descIdx: number) => {
    resumeStore.projects[index].desc.splice(descIdx, 1);
  };

  return (
    <section className="border border-slate-400 px-6 py-8 rounded-sm">
      <div className="">
        <form action="">
          <div className="flex flex-col gap-y-3">
            <div className="flex flex-col">
              <label htmlFor="" className="">Project title</label>
              <input 
                type="text"
                className="rounded-md px-2 py-1"
                value={proj.title}
                onChange={(e) => handleChange("title", e.target.value)} 
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="">Link</label>
              <input 
                type="text"
                className="rounded-md px-2 py-1"
                value={proj.link}
                onChange={(e) => handleChange("link", e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="">Sub title</label>
              <input 
                type="text"
                className="rounded-md px-2 py-1"
                value={proj.subTitle}
                onChange={(e) => handleChange("subTitle", e.target.value)} 
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="">Description</label>
              {/* for every description added for this project, a bullet point is created */}
              <div className="flex flex-col gap-y-3">
                {proj.desc.map((p, idx) => (
                  <div key={`pproj-${idx}`} className="flex flex-row gap-x-2">
                    <input 
                      type="text"
                      value={p}
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
