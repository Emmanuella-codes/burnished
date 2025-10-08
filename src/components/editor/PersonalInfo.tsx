"use client";
import { resumeStore } from "@/store/resumeStore";
import { Header } from "@/typings/resume";
import { useState } from "react";

type Props = {
  header: Header;
}

export default function PersonalInfo({ header }: Props) {
  const [fields, setFields] = useState<string[]>([]);
  const optionalFields = ["github", "linkedin", "website"];

  const handleChange = (field: keyof Header, value: string) => {
    resumeStore.header = {
      ...resumeStore.header,
      [field]: value,
    };
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
                onChange={(e) => handleChange("fullname", e.target.value)} 
              />
            </div>
            <div className="flex flex-col">
              <label className="">Professional Title</label>
              <input
                type="text"
                className="w-full rounded-md px-2 py-1"
                value={header.jobTitle}
                onChange={(e) => handleChange("jobTitle", e.target.value)} 
              />
            </div>
            <div className="flex flex-col">
              <label className="">Location</label>
              <input
                type="text"
                className="w-full rounded-md px-2 py-1"
                value={header.location ?? ""}
                onChange={(e) => handleChange("location", e.target.value)} 
              />
            </div>
            <div className="w-full flex flex-row gap-x-3">
              <div className="flex flex-col flex-1">
                <label className="">Email</label>
                <input
                  type="text"
                  className="w-full rounded-md px-2 py-1"
                  value={header.email}
                  onChange={(e) => handleChange("email", e.target.value)} 
                />
              </div>
              <div className="flex flex-col flex-1">
                <label className="">Phone</label>
                <input
                  type="text"
                  className="w-full rounded-md px-2 py-1"
                  value={header.phone ?? ""}
                  onChange={(e) => handleChange("phone", e.target.value)} 
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
                    onChange={(e) => handleChange("github", e.target.value)} 
                  />
                </div>
                <div className="flex flex-col">
                  <label>GitHub URL</label>
                  <input
                    type="text"
                    className="w-full rounded-md px-2 py-1"
                    value={header.githubUrl ?? ""}
                    onChange={(e) => handleChange("githubUrl", e.target.value)} 
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
                    onChange={(e) => handleChange("linkedin", e.target.value)} 
                  />
                </div>
                <div className="flex flex-col">
                  <label>LinkedIn URL</label>
                  <input
                    type="text"
                    className="w-full rounded-md px-2 py-1"
                    value={header.linkedinUrl ?? ""}
                    onChange={(e) => handleChange("linkedinUrl", e.target.value)} 
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
                    onChange={(e) => handleChange("website", e.target.value)} 
                  />
                </div>
                <div className="flex flex-col">
                  <label>Website URL</label>
                  <input
                    type="text"
                    className="w-full rounded-md px-2 py-1"
                    value={header.websiteUrl ?? ""}
                    onChange={(e) => handleChange("websiteUrl", e.target.value)} 
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
  )
};
