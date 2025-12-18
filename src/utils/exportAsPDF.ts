import { Header } from "@/typings/resume";
import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";

const PAGE_WIDTH = 816;
const PAGE_HEIGHT = 1056; // ~11 inches at 96 DPI

export const HandleDownloadPDF = async (
  containerRef: React.RefObject<HTMLDivElement | null>, 
  header: Header,
  setIsgenerating: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!containerRef.current) return;
  setIsgenerating(true)

  try {
    const pageElements = containerRef.current?.querySelectorAll("[data-page]");
    if (pageElements.length === 0) return;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [PAGE_WIDTH, PAGE_HEIGHT],
    });

    for (let i = 0; i < pageElements.length; i++) {
      const pageElement = pageElements[i] as HTMLElement;

      // Temporarily remove transform for capture
      const originalTransform = pageElement.style.transform;
      pageElement.style.transform = 'none';

      const image = await toJpeg(pageElement, {
        quality: 0.85,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        width: PAGE_WIDTH,
        height: PAGE_HEIGHT,
        cacheBust: true,
        skipFonts: true,
      });

      // Restore transform
      pageElement.style.transform = originalTransform;

      if (i > 0) {
        pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT], 'portrait');
      }

      pdf.addImage(image, 'JPEG', 0, 0, PAGE_WIDTH, PAGE_HEIGHT, undefined, 'FAST');
    }

    pdf.save(`${header.fullname.replace(/\s+/g, '_')}_${header.jobTitle.replace(/\s+/g, '_')}_Resume.pdf`);
  } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
  } finally {
      setIsgenerating(false);
  }
};
