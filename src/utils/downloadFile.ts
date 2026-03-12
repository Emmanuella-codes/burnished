import jsPDF from "jspdf";

export const downloadTextFile = (content: string) => {
  if (typeof content !== "string") return null;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "burnished-roast.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

export const downloadPdfFile = (content: string) => {
    const pdf = new jsPDF({
      unit: "pt",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 40;
    const lineHeight = 18;
    const lines = pdf.splitTextToSize(content, pageWidth - margin * 2);

    let cursorY = margin;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);

    lines.forEach((line: string) => {
      if (cursorY > pageHeight - margin) {
        pdf.addPage();
        cursorY = margin;
      }

      pdf.text(line, margin, cursorY);
      cursorY += lineHeight;
    });

    pdf.save("burnished-cover-letter.pdf");
};
