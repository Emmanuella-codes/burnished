"use client";
import { Resume } from "@/typings/resume";
import TemplateProfile from "./Profile";
import TemplateSkills from "./Skills";
import TemplateExperience from "./Experience";
import TemplateEducation from "./Education";
import TemplateProject from "./Project";
import TemplateAwards from "./Awards";
import TemplateHeader from "./Header";
import { useEffect, useRef, useState } from "react";

const PAGE_HEIGHT = 1056; // ~11 inches at 96 DPI
const HEADER_HEIGHT = 120; // Approximate header height
const PADDING = 80; // py-10 + spacing

export default function Template({
  header,
  profileSummary,
  skills,
  experiences,
  education,
  projects,
  awards,
  sectionOrder,
}: Resume) {
  const [pages, setPages] = useState<React.ReactNode[][]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!measureRef.current) return;

    const allSections: React.ReactNode[] = [];
    
    sectionOrder.forEach((sect) => {
      switch (sect) {
        case "profileSummary":
          if (profileSummary) {
            allSections.push(
              <div key="profile" data-section="profile">
                <TemplateProfile profileSummary={profileSummary} />
              </div>
            );
          }
          break;
        case "skills":
          allSections.push(
            <div key="skills" data-section="skills">
              <TemplateSkills skills={skills} />
            </div>
          );
          break;
        case "experiences":
          allSections.push(
            <div key="exp" data-section="exp">
              <TemplateExperience experiences={experiences} />
            </div>
          );
          break;
        case "education":
          allSections.push(
            <div key="edu" data-section="edu">
              <TemplateEducation education={education} />
            </div>
          );
          break;
        case "projects":
          allSections.push(
            <div key="proj" data-section="proj">
              <TemplateProject projects={projects} />
            </div>
          );
          break;
        case "awards":
          if (awards && awards.length > 0) {
            allSections.push(
              <div key="awards" data-section="awards">
                <TemplateAwards awards={awards} />
              </div>
            );
          }
          break;
      }
    });

    // Measure sections after render
    setTimeout(() => {
      const sectionElements = measureRef.current?.querySelectorAll('[data-section]');
      if (!sectionElements) return;

      const paginatedPages: React.ReactNode[][] = [];
      let currentPage: React.ReactNode[] = [];
      let currentHeight = HEADER_HEIGHT; // First page has header
      const maxHeight = PAGE_HEIGHT - PADDING;

      allSections.forEach((section, idx) => {
        const element = sectionElements[idx] as HTMLElement;
        const sectionHeight = element.offsetHeight + 24; // Include gap

        // Check if section fits on current page
        if (currentHeight + sectionHeight > maxHeight) {
          // Save current page and start new one
          if (currentPage.length > 0) {
            paginatedPages.push([...currentPage]);
          }
          currentPage = [section];
          currentHeight = sectionHeight;
        } else {
          currentPage.push(section);
          currentHeight += sectionHeight;
        }
      });

      // Add last page
      if (currentPage.length > 0) {
        paginatedPages.push(currentPage);
      }

      setPages(paginatedPages);
    }, 100); // Small delay to ensure render

  }, [header, profileSummary, skills, experiences, education, projects, awards, sectionOrder]);
  
  return (
    <>
      {/* Hidden measurement container */}
      <div ref={measureRef} className="invisible absolute pointer-events-none">
        <div className="space-y-2.5">
          {sectionOrder.map((sect) => {
            switch (sect) {
              case "profileSummary":
                return profileSummary ? (
                  <div key="profile" data-section="profile">
                    <TemplateProfile profileSummary={profileSummary} />
                  </div>
                ) : null;
              case "skills":
                return (
                  <div key="skills" data-section="skills">
                    <TemplateSkills skills={skills} />
                  </div>
                );
              case "experiences":
                return (
                  <div key="exp" data-section="exp">
                    <TemplateExperience experiences={experiences} />
                  </div>
                );
              case "education":
                return (
                  <div key="edu" data-section="edu">
                    <TemplateEducation education={education} />
                  </div>
                );
              case "projects":
                return (
                  <div key="proj" data-section="proj">
                    <TemplateProject projects={projects} />
                  </div>
                );
              case "awards":
                return awards && awards.length > 0 ? (
                  <div key="awards" data-section="awards">
                    <TemplateAwards awards={awards} />
                  </div>
                ) : null;
              default:
                return null;
            }
          })}
        </div>
      </div>

      {/* Actual rendered pages */}
      <div className="space-y-4">
        {pages.length > 0 ? (
          pages.map((pageSections, pageIndex) => (
            <div 
              key={`page-${pageIndex}`}
              className="page w-full mx-auto bg-white text-black shadow-lg mb-8 overflow-hidden rounded-lg"
              style={{ width: `100%`, minHeight: `${PAGE_HEIGHT}px`, maxHeight: `${PAGE_HEIGHT}px` }}
            >
              <div className="flex flex-col justify-between px-5 py-4 lg:px-12 lgpy-10 min-h-full">
                {/* Header only on first page */}
                {pageIndex === 0 && (
                  <div className="mb-4">
                    <TemplateHeader 
                      fullname={header.fullname}
                      jobTitle={header.jobTitle}
                      location={header.location}
                      email={header.email}
                      phone={header.phone}
                      linkedin={header.linkedin}
                      linkedinUrl={header.linkedinUrl}
                      github={header.github}
                      githubUrl={header.githubUrl}
                      website={header.website}
                      websiteUrl={header.websiteUrl}
                    />
                  </div>
                )}
                <div className="flex-1 space-y-2.5 page-content">
                  {pageSections}
                </div>
              </div>
            </div>
          ))
        ) : (
          // Show single page while measuring
          <div className="page w-full mx-auto bg-white text-black shadow-lg">
            <div className="px-12 py-10">
              <div className="mb-4">
                <TemplateHeader {...header} />
              </div>
              <div className="space-y-2.5">
                {/* Initial render */}
              </div>
            </div>
          </div>
        )}
      </div>
      
    </>
  );
}
