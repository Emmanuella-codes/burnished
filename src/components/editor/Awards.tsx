import { useCursorPreservingChange } from "@/hooks/usePreserveCursor";
import { useSingleDateField } from "@/hooks/useSingleDateField";
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
  const { handleChange, setRef } = useCursorPreservingChange<HTMLInputElement>();

  const ensureAward = () => {
    resumeStore.awards = resumeStore.awards ?? [];
    resumeStore.awards[index] = resumeStore.awards[index] ?? ({} as AwardProps);
    return resumeStore.awards[index];
  };

  const dateField = useSingleDateField({
    date: award.date,
    onUpdate: (value) => {
      ensureAward().date = value;
    },
  });

  const updateField = (field: keyof AwardProps, value: string) => {
    handleChange(field, () => {
      (ensureAward() as any)[field] = value;
    });
  };

  const updateDesc = (descIdx: number, value: string) => {
    handleChange(`desc-${descIdx}`, () => {
      const awardItem = ensureAward();
      awardItem.desc = awardItem.desc ?? [];
      awardItem.desc[descIdx] = value;
    });
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
                ref={setRef('title')}
                type="text"
                className="rounded-md px-2 py-1"
                value={award.title}
                onChange={(e) => updateField("title", e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="">Issuer</label>
              <input
                ref={setRef('issuer')}
                type="text"
                className="rounded-md px-2 py-1"
                value={award.issuer || ""}
                onChange={(e) => updateField("issuer", e.target.value)}
              />
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <label htmlFor="">Date</label>
                <input
                  type="month" 
                  className="w-44 rounded-md px-2 py-1"
                  value={dateField.getInputValue()}
                  onChange={(e) => dateField.handleDateChange(e.target.value)} 
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="">Link</label>
                <input
                  ref={setRef('link')}
                  type="text"
                  className="rounded-md px-2 py-1"
                  value={award.link || ""}
                  onChange={(e) => updateField("link", e.target.value)}
                  placeholder="https://..."
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
                      ref={setRef(`desc-${idx}`)} 
                      type="text"
                      value={a}
                      onChange={(e) => updateDesc(idx, e.target.value)}
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
  );
}
