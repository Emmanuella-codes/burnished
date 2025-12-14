import { Header } from "@/typings/resume";
import Image from "next/image";

export default function TemplateHeader({
  fullname,
  jobTitle,
  location,
  email,
  phone,
  linkedin,
  linkedinUrl,
  github,
  githubUrl,
  website,
  websiteUrl,
}: Header) {

  const contactInfo = [
    { icon: "/assets/location.svg", alt: "location", value: location },
    { icon: "/assets/mail.svg", alt: "email", value: email },
    { icon: "/assets/call.svg", alt: "phone", value: phone },
    { icon: "/assets/linkedin2.svg", alt: "linkedin", value: linkedin, url: linkedinUrl },
    { icon: "/assets/github.svg", alt: "github", value: github, url: githubUrl },
    { icon: "/assets/website.svg", alt: "website", value: website, url: websiteUrl },
  ];

  return (
    <header className="w-full">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-[20px] font-semibold">{fullname}</h1>
        <h2 className="text-[18px]">{jobTitle}</h2>
      </div>
      <div className="flex flex-row gap-x-3 flex-wrap justify-center">
        {contactInfo
          .filter((item) => item.value)
          .map((item, idx) => (
            <div key={`ci-${idx}`} className="flex flex-row justify-center items-center gap-x-1">
              <Image src={item.icon} alt={item.alt} width={13} height={13} />
              <a href={item.url} className="text-[12px]">
                <span>{item.alt === "phone" ? `+${item.value}` : item.value}</span>
              </a>
            </div>
          ))}
      </div>
    </header>
  );
}
