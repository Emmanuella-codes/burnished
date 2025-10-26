"use client";
import { useCursorPreservingChange } from "@/hooks/usePreserveCursor";
import { resumeStore } from "@/store/resumeStore";
import { Header } from "@/typings/resume";
import { useState } from "react";

type Props = {
  header: Header;
}

export default function PersonalInfo({ header }: Props) {
  const optionalFields = ["github", "linkedin", "website"];
  const [fields, setFields] = useState<string[]>(() => 
    optionalFields.filter(
      (f) => header[f as keyof Header] && header[f as keyof Header] !== ""
    )
  );
  const { handleChange, setRef } = useCursorPreservingChange<HTMLInputElement>();

  const updateField = (field: keyof Header, value: string) => {
    handleChange(field, () => {
      resumeStore.header[field] = value;
    });
  };

  const toggleField = (field: string) => {
    if (fields.includes(field)) {
      // remove from UI and store
      setFields((prev) => prev.filter((f) => f !== field));
      (resumeStore.header as any)[field] = undefined;
    } else {
      // add to UI and initialize
      setFields((prev) => [...prev, field]);
      (resumeStore.header as any)[field] = "";
    }
  };

  return (
    <section className="border border-slate-400 px-6 py-8 rounded-sm">
      <div className="">
        <form action="">
          <div className="flex flex-col gap-y-3">
            <div className="flex flex-col">
              <label className="">Full Name</label>
              <input
                type="text"
                className="w-full rounded-md px-2 py-1"
                value={header.fullname}
                ref={setRef('fullname')}
                onChange={(e) => updateField("fullname", e.target.value)} 
              />
            </div>
            <div className="flex flex-col">
              <label className="">Professional Title</label>
              <input
                type="text"
                className="w-full rounded-md px-2 py-1"
                value={header.jobTitle}
                ref={setRef('jobTitle')}
                onChange={(e) => updateField("jobTitle", e.target.value)} 
              />
            </div>
            <div className="flex flex-col">
              <label className="">Location</label>
              <input
                type="text"
                className="w-full rounded-md px-2 py-1"
                value={header.location ?? ""}
                ref={setRef('location')}
                onChange={(e) => updateField("location", e.target.value)} 
              />
            </div>
            <div className="w-full flex flex-row gap-x-3">
              <div className="flex flex-col flex-1">
                <label className="">Email</label>
                <input
                  type="text"
                  className="w-full rounded-md px-2 py-1"
                  value={header.email}
                  ref={setRef('email')}
                  onChange={(e) => updateField("email", e.target.value)} 
                />
              </div>
              <div className="flex flex-col flex-1">
                <label className="">Phone</label>
                <input
                  type="text"
                  className="w-full rounded-md px-2 py-1"
                  value={header.phone ?? ""}
                  ref={setRef('phone')}
                  onChange={(e) => updateField("phone", e.target.value)} 
                />
              </div>
            </div>
            {fields.includes("github") && (
              <div className="flex flex-row gap-x-2">
                <div className="flex-1 flex flex-col">
                  <label>GitHub</label>
                  <input
                    type="text"
                    className="w-full rounded-md px-2 py-1"
                    value={header.github ?? ""}
                    ref={setRef('github')}
                    onChange={(e) => updateField("github", e.target.value)} 
                  />
                </div>
                <div className="flex flex-col">
                  <label>GitHub URL</label>
                  <input
                    type="text"
                    className="w-full rounded-md px-2 py-1"
                    placeholder="https://..."
                    value={header.githubUrl ?? ""}
                    ref={setRef('githubUrl')}
                    onChange={(e) => updateField("githubUrl", e.target.value)} 
                  />
                </div>
              </div>
            )}
            {fields.includes("linkedin") && (
              <div className="flex flex-row gap-x-2">
                <div className="flex-1 flex flex-col">
                  <label>LinkedIn</label>
                  <input
                    type="text"
                    className="w-full rounded-md px-2 py-1"
                    value={header.linkedin ?? ""}
                    ref={setRef('linkedin')}
                    onChange={(e) => updateField("linkedin", e.target.value)} 
                  />
                </div>
                <div className="flex flex-col">
                  <label>LinkedIn URL</label>
                  <input
                    type="text"
                    className="w-full rounded-md px-2 py-1"
                    placeholder="https://..."
                    value={header.linkedinUrl ?? ""}
                    ref={setRef('linkedinUrl')}
                    onChange={(e) => updateField("linkedinUrl", e.target.value)} 
                  />
                </div>
              </div>
            )}
            {fields.includes("website") && (
              <div className="flex flex-row gap-x-2">
                <div className="flex-1 flex flex-col">
                  <label>Website</label>
                  <input
                    type="text"
                    className="w-full rounded-md px-2 py-1"
                    value={header.website ?? ""}
                    ref={setRef('website')}
                    onChange={(e) => updateField("website", e.target.value)} 
                  />
                </div>
                <div className="flex flex-col">
                  <label>Website URL</label>
                  <input
                    type="text"
                    className="w-full rounded-md px-2 py-1"
                    placeholder="https://..."
                    value={header.websiteUrl ?? ""}
                    ref={setRef('websiteUrl')}
                    onChange={(e) => updateField("websiteUrl", e.target.value)} 
                  />
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
      <div className="flex flex-row mt-3 justify-end gap-x-2">
        {optionalFields.map((field, idx) => (
          <button 
            key={`ctfield-${idx}`}
            type="button"
            className="border border-slate-500 px-2 py-1 rounded-md"
            onClick={() => toggleField(field)}
          >
            {fields.includes(field) ? `- ${field}` : `+ ${field}`}
          </button>
        ))}
      </div>
    </section>
  );
}
