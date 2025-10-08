"use client";
import { useEffect, useRef, useState } from "react";

export default function PaginatedTemplate({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<React.ReactNode[][]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Wait for content to render
    const timer = setTimeout(() => {
      const childrenArray = Array.isArray(children) ? children : [children];
      const containerChildren = Array.from(container.children);
      
      if (containerChildren.length === 0) {
        // If no children measured yet, just show all content on one page
        setPages([childrenArray]);
        return;
      }

      const pageHeight = 1122;
      let currentHeight = 0;
      let currentPage: React.ReactNode[] = [];
      const splitPages: React.ReactNode[][] = [];

      for (let i = 0; i < containerChildren.length; i++) {
        const childHeight = (containerChildren[i] as HTMLElement).offsetHeight;
        if (currentHeight + childHeight > pageHeight && currentPage.length > 0) {
          splitPages.push(currentPage);
          currentPage = [childrenArray[i]];
          currentHeight = childHeight;
        } else {
          currentPage.push(childrenArray[i]);
          currentHeight += childHeight;
        }
      }

      if (currentPage.length > 0) splitPages.push(currentPage);
      setPages(splitPages.length > 0 ? splitPages : [childrenArray]);
    }, 100);

    return () => clearTimeout(timer);
  }, [children]);

  // Scale the template to fit container
  useEffect(() => {
    const handleResize = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      
      const parent = wrapper.parentElement;
      if (!parent) return;
      
      const parentWidth = parent.offsetWidth;
      const templateWidth = 794;
      
      if (parentWidth < templateWidth) {
        const scale = parentWidth / templateWidth;
        wrapper.style.transform = `scale(${scale})`;
        wrapper.style.width = `${templateWidth}px`;
      } else {
        wrapper.style.transform = 'scale(1)';
        wrapper.style.width = `${templateWidth}px`;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pages]);

  return (
    <div className="template-preview-container">
      <div ref={wrapperRef} className="template-preview-wrapper">
        {pages.length > 0 ? (
          pages.map((page, i) => (
            <div key={i} className="template-page">
              {page}
            </div>
          ))
        ) : (
          <div className="template-page">
            {children}
          </div>
        )}
      </div>

      {/* Hidden measurement container */}
      <div ref={containerRef} style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none' }}>
        {children}
      </div>
    </div>
  );
}
