import { Header } from "@/typings/resume";
import Image from "next/image";

export default function TemplateHeader(props: Header) {

  const contactInfo = [
    { icon: "/assets/location.svg", alt: "location", value: props.location },
    { icon: "/assets/mail.svg", alt: "email", value: props.email },
    { icon: "/assets/call.svg", alt: "phone", value: props.phone },
    { icon: "/assets/linkedin2.svg", alt: "linkedin", value: props.linkedin, url: props.linkedinUrl },
    { icon: "/assets/github.svg", alt: "github", value: props.github, url: props.githubUrl },
    { icon: "/assets/website.svg", alt: "website", value: props.website, url: props.websiteUrl },
  ];

  return (
    <header className="w-full">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-[20px] font-semibold">{props.fullname}</h1>
        <h2 className="text-[18px]">{props.jobTitle}</h2>
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
