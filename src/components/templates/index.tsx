"use client";
import { Resume } from "@/typings/resume";
import TemplateProfile from "./Profile";
import TemplateSkills from "./Skills";
import TemplateHeader from "./Header";
import { useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { AwardHeader, BulletLine, EducationHeader, ExperienceHeader, ProjectHeader, TemplateSectionHeader } from "./SectionHeaders";

interface PaginationItem {
  type: 'section-header' | 'content';
  content: React.ReactNode;
  key: string;
  tight?: boolean;
}

const PAGE_WIDTH = 816;
const PAGE_HEIGHT = 1056; // ~11 inches at 96 DPI
const HEADER_HEIGHT = 120; // Approximate header height
const PADDING = 48; 
const ITEM_GAP = 10;



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

  const allItems = useMemo<PaginationItem[]>(() => {
    const items: PaginationItem[] = [];

    const pushSectionHeader = (title: string, key: string) => {
      items.push({
        type: "section-header",
        content: <TemplateSectionHeader title={title} />,
        key,
      });
    };

    sectionOrder.forEach((sect) => {
      switch (sect) {
        case "profileSummary":
          if (profileSummary) {
            pushSectionHeader("Profile", "profile-header");
            items.push({
              type: "content",
              content: <TemplateProfile profileSummary={profileSummary} />,
              key: "profile-content",
            });
          }
          break;
        case "skills": {
          const visibleSkills = (skills ?? []).filter((skill) => !skill.hidden);
          if (visibleSkills.length > 0) {
            pushSectionHeader("Skills", "skills-header");
            visibleSkills.forEach((skill, idx) => {
              items.push({
                type: "content",
                content: <TemplateSkills skills={skill} />,
                key: `skills-content-${idx}`,
              });
            });
          }
          break;
        }
        case "experiences": {
          const visibleExperiences = (experiences ?? []).filter((exp) => !exp.hidden);
          if (visibleExperiences.length > 0) {
            pushSectionHeader("Professional Experience", "exp-header");
            visibleExperiences.forEach((exp, idx) => {
              items.push({
                type: "content",
                content: <ExperienceHeader experience={exp} />,
                key: `exp-entry-${idx}`,
              });
              (exp.desc ?? []).forEach((item, descIdx) => {
                items.push({
                  type: "content",
                  content: <BulletLine text={item} />,
                  key: `exp-desc-${idx}-${descIdx}`,
                  tight: true,
                });
              });
            });
          }
          break;
        }
        case "education": {
          const visibleEducation = (education ?? []).filter((edu) => !edu.hidden);
          if (visibleEducation.length > 0) {
            pushSectionHeader("Education", "edu-header");
            visibleEducation.forEach((edu, idx) => {
              items.push({
                type: "content",
                content: <EducationHeader education={edu} />,
                key: `edu-entry-${idx}`,
              });
              (edu.desc ?? []).forEach((item, descIdx) => {
                items.push({
                  type: "content",
                  content: <BulletLine text={item} />,
                  key: `edu-desc-${idx}-${descIdx}`,
                  tight: true,
                });
              });
            });
          }
          break;
        }
        case "projects": {
          const visibleProjects = (projects ?? []).filter((proj) => !proj.hidden);
          if (visibleProjects.length > 0) {
            pushSectionHeader("Projects", "proj-header");
            visibleProjects.forEach((proj, idx) => {
              items.push({
                type: "content",
                content: <ProjectHeader project={proj} />,
                key: `proj-entry-${idx}`,
              });
              (proj.desc ?? []).forEach((item, descIdx) => {
                items.push({
                  type: "content",
                  content: <BulletLine text={item} />,
                  key: `proj-desc-${idx}-${descIdx}`,
                  tight: true,
                });
              });
            });
          }
          break;
        }
        case "awards": {
          const visibleAwards = (awards ?? []).filter((award) => !award.hidden);
          if (visibleAwards.length > 0) {
            pushSectionHeader("Awards", "awards-header");
            visibleAwards.forEach((award, idx) => {
              items.push({
                type: "content",
                content: <AwardHeader award={award} />,
                key: `award-entry-${idx}`,
              });
              (award.desc ?? []).forEach((item, descIdx) => {
                items.push({
                  type: "content",
                  content: <BulletLine text={item} />,
                  key: `award-desc-${idx}-${descIdx}`,
                  tight: true,
                });
              });
            });
          }
          break;
        }
      }
    });

    return items;
  }, [sectionOrder, profileSummary, skills, experiences, education, projects, awards]);

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
    if (allItems.length === 0) {
      setPages([]);
      return;
    }

    // Measure sections after render
    setTimeout(() => {
      const sectionElements = measureRef.current?.querySelectorAll('[data-item]');
      if (!sectionElements || sectionElements.length === 0) return;

      const paginatedPages: React.ReactNode[][] = [];
      let currentPage: React.ReactNode[] = [];
      let currentHeight = HEADER_HEIGHT; // First page has header
      const maxHeight = PAGE_HEIGHT - (PADDING * 2);

      allItems.forEach((item, idx) => {
        const element = sectionElements[idx] as HTMLElement;
        if (!element) return;
        const itemHeight = element.offsetHeight;
        let gap = currentPage.length === 0 ? 0 : (item.tight ? 0 : ITEM_GAP);

        // Check if item fits on current page
        if (currentHeight + itemHeight + gap > maxHeight) {
          // Save current page
          if (currentPage.length > 0) {
            paginatedPages.push([...currentPage]);
          }

          // Start new page
          currentPage = [];
          currentHeight = 0;
          gap = 0;
        }

        currentPage.push(
          <div key={item.key} style={{ marginTop: gap }}>
            {item.content}
          </div>
        );
        currentHeight += itemHeight + gap;
      });

      // Add last page
      if (currentPage.length > 0) {
        paginatedPages.push(currentPage);
      }

      setPages(paginatedPages);
    }, 100); // Small delay to ensure render

  }, [allItems]);
  
  return (
    <div ref={containerRef} className="w-full">
      {/* Hidden measurement container - FIXED WIDTH */}
      <div 
        ref={measureRef} 
        className="fixed -left-[9999px] pointer-events-none"
        style={{ width: `${PAGE_WIDTH}px` }}
      >
        <div style={{ padding: '48px' }}>
          {allItems.map((item) => (
            <div key={`measure-${item.key}`} data-item>
              {item.content}
            </div>
          ))}
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
                <div className="flex-1">
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
