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
import React from "react";

interface PaginationItem {
  type: 'section-header' | 'content';
  sectionName?: string;
  content: React.ReactNode;
  key: string;
}

const PAGE_WIDTH = 816;
const PAGE_HEIGHT = 1056; // ~11 inches at 96 DPI
const HEADER_HEIGHT = 120; // Approximate header height
const PADDING = 48; 

function TemplateSectionHeader({ title }: { title: string }) {
  return <h2 className="temp-section-title font-bold text-lg uppercase tracking-wide border-b border-gray-400 pb-1 mb-2">{title}</h2>;
}

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
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const availableWidth = containerWidth - 32; // account for padding/margins
      const newScale = Math.min(availableWidth / PAGE_WIDTH, 1);
      setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  useEffect(() => {
    if (!measureRef.current) return;

    const allItems: PaginationItem[] = [];
    
    sectionOrder.forEach((sect) => {
      switch (sect) {
        case "profileSummary":
          if (profileSummary) {
            allItems.push({
              type: "section-header",
              sectionName: "Profile Summary",
              content: <TemplateSectionHeader title="Profile" />,
              key: "profile-header"
            });
            allItems.push({
              type: "content",
              content: <TemplateProfile profileSummary={profileSummary} />,
              key: "profile-content"
            });
          }
          break;
        case "skills":
          if (skills && skills.length > 0) {
            allItems.push({
              type: "section-header",
              sectionName: "Skills",
              content: <TemplateSectionHeader title="Skills" />,
              key: "skills-header"
            });
            skills.forEach((skill, idx) => {
              allItems.push({
                type: "content",
                content: <TemplateSkills skills={skill} />,
                key: `skills-content-${idx}`,
              });
            }) 
            
          }
          break;
        case "experiences":
          if (experiences && experiences.length > 0) {
            allItems.push({
              type: "section-header",
              sectionName: "Professional Experience",
              content: <TemplateSectionHeader title="Professional Experience" />,
              key: 'exp-header',
            });
            experiences.forEach((exp, idx) => {
              allItems.push({
                type: "content",
                content: <TemplateExperience experiences={exp} />,
                key: `exp-content-${idx}`,
              });
            });
          }
          break;
        case "education":
          if (education && education.length > 0) {
            allItems.push({
              type: "section-header",
              sectionName: "Education",
              content: <TemplateSectionHeader title="Education" />,
              key: 'edu-header',
            });
            education.forEach((edu, idx) => {
              allItems.push({
                type: 'content',
                content: <TemplateEducation education={edu} />,
                key: `edu-content-${idx}`,
              });
            });
          }
          break;
        case "projects":
          if (projects && projects.length > 0) {
            allItems.push({
              type: "section-header",
              sectionName: "Projects",
              content: <TemplateSectionHeader title="Projects" />,
              key: 'proj-header',
            });
            projects.forEach((proj, idx) => {
              allItems.push({
                type: "content",
                content: <TemplateProject projects={proj} />,
                key: `proj-content-${idx}`,
              });
            });
          }
          break;
        case "awards":
          if (awards && awards.length > 0) {
            allItems.push({
              type: "section-header",
              sectionName: "Awards",
              content: <TemplateSectionHeader title="Awards" />,
              key: "awards-header",
            });
            awards.forEach((award, idx) => {
              allItems.push({
                type: "content",
                content: <TemplateAwards awards={award} />,
                key: `awards-content-${idx}`,
              });
            })
          }
          break;
      }
    });

    // Measure sections after render
    setTimeout(() => {
      const sectionElements = measureRef.current?.querySelectorAll('[data-item]');
      if (!sectionElements) return;

      const paginatedPages: React.ReactNode[][] = [];
      let currentPage: React.ReactNode[] = [];
      let currentHeight = HEADER_HEIGHT; // First page has header
      let currentSection: string | null = null;
      const maxHeight = PAGE_HEIGHT - (PADDING * 2);

      allItems.forEach((item, idx) => {
        const element = sectionElements[idx] as HTMLElement;
        const itemHeight = element.offsetHeight + 10; // Include gap

        // Check if this is a new section header
        if (item.type === 'section-header') {
          currentSection = item.sectionName || null;
        }

        // Check if item fits on current page
        if (currentHeight + itemHeight > maxHeight) {
          // Save current page
          if (currentPage.length > 0) {
            paginatedPages.push([...currentPage]);
          }

          // Start new page
          currentPage = [];
          currentHeight = 0;90
        }

        currentPage.push(<div key={item.key}>{item.content}</div>);
        currentHeight += itemHeight;
      });

      // Add last page
      if (currentPage.length > 0) {
        paginatedPages.push(currentPage);
      }

      setPages(paginatedPages);
    }, 100); // Small delay to ensure render

  }, [sectionOrder, profileSummary, skills, experiences, education, projects, awards]);
  
  return (
    <div ref={containerRef} className="w-full">
      {/* Hidden measurement container - FIXED WIDTH */}
      <div 
        ref={measureRef} 
        className="fixed -left-[9999px] pointer-events-none"
        style={{ width: `${PAGE_WIDTH}px` }}
      >
        <div className="space-y-2.5" style={{ padding: '48px' }}>
          {sectionOrder.map((sect) => {
            switch (sect) {
              case "profileSummary":
                return profileSummary ? (
                  <React.Fragment key="profile">
                    <div data-item><TemplateSectionHeader title="Profile" /></div>
                    <div data-item><TemplateProfile profileSummary={profileSummary} /></div>
                  </React.Fragment>
                ) : null;
              case "skills":
                return skills && skills.length > 0 ? (
                  <React.Fragment key="skills">
                    <div data-item><TemplateSectionHeader title="Skills" /></div>
                    {skills.map((skill, idx) => (
                      <div key={`exp-${idx}`} data-item>
                        <TemplateSkills skills={skill} />
                      </div>
                    ))}
                  </React.Fragment>
                ) : null;
              case "experiences":
                return experiences && experiences.length > 0 ? (
                  <React.Fragment key="exp">
                    <div data-item><TemplateSectionHeader title="Professional Experience" /></div>
                    {experiences.map((exp, idx) => (
                      <div key={`exp-${idx}`} data-item>
                        <TemplateExperience experiences={exp} />
                      </div>
                    ))}
                  </React.Fragment>
                ) : null;
              case "education":
                return education && education.length > 0 ? (
                  <React.Fragment key="edu">
                    <div data-item><TemplateSectionHeader title="Education" /></div>
                    {education.map((edu, idx) => (
                      <div key={`edu-${idx}`} data-item>
                        <TemplateEducation education={edu} />
                      </div>
                    ))}
                  </React.Fragment>
                ) : null;
              case "projects":
                return projects && projects.length > 0 ? (
                  <React.Fragment key="proj">
                    <div data-item><TemplateSectionHeader title="Projects" /></div>
                    {projects.map((proj, idx) => (
                      <div key={`proj-${idx}`} data-item>
                        <TemplateProject projects={proj} />
                      </div>
                    ))}
                  </React.Fragment>
                ) : null;
              case "awards":
                return awards && awards.length > 0 ? (
                  <React.Fragment key="awards">
                    <div data-item><TemplateSectionHeader title="Awards" /></div>
                    {awards.map((award, idx) => (
                      <div key={`award-${idx}`} data-item>
                        <TemplateAwards awards={award} />
                      </div>
                    ))}
                  </React.Fragment>
                ) : null;
              default:
                return null;
            }
          })}
        </div>
      </div>

      {/* Actual rendered pages with scale transform */}
      <div className="space-y-4 flex flex-col items-center">
        {pages.length > 0 ? (
          pages.map((pageSections, pageIndex) => (
            <div 
              key={`page-${pageIndex}`}
              data-page={pageIndex}
              style={{
                width: `${PAGE_WIDTH}px`,
                height: `${PAGE_HEIGHT}px`,
                transform: `scale(${scale})`,
                transformOrigin: 'top center',
                marginBottom: pageIndex < pages.length - 1 ? `${(PAGE_HEIGHT * scale) - PAGE_HEIGHT + 16}px` : '0',
              }}
              className="bg-white text-black shadow-lg overflow-hidden rounded-lg"
            >
              <div className="h-full" style={{ padding: '48px' }}>
                {/* Header only on first page */}
                {pageIndex === 0 && (
                  <div className="mb-4">
                    <TemplateHeader {...header} />
                  </div>
                )}
                <div className="flex-1 space-y-2.5">
                  {pageSections}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div 
            style={{
              width: `${PAGE_WIDTH}px`,
              minHeight: `${PAGE_HEIGHT}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
            }}
            className="bg-white text-black shadow-lg"
          >
            <div style={{ padding: `${PADDING}px` }}>
              <div className="mb-4">
                <TemplateHeader {...header} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
