import jsPDF from "jspdf";

interface PdfExportData {
  violations: { title: string; description: string; law: string }[];
  chatMessages: { role: "user" | "assistant"; content: string }[];
  letterTemplates: { title: string; content: string }[];
}

const MARGIN = 20;
const PAGE_WIDTH = 210;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const LINE_HEIGHT = 6;

function addPageIfNeeded(doc: jsPDF, y: number, needed: number = 20): number {
  if (y + needed > 280) {
    doc.addPage();
    return MARGIN;
  }
  return y;
}

function wrapText(doc: jsPDF, text: string, maxWidth: number): string[] {
  return doc.splitTextToSize(text, maxWidth) as string[];
}

function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s/g, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/^[-*]\s/gm, "• ")
    .replace(/^\d+\.\s/gm, (m) => m);
}

export function generatePdfReport(data: PdfExportData): void {
  const doc = new jsPDF();
  let y = MARGIN;

  // --- Title ---
  doc.setFillColor(30, 45, 70); // navy
  doc.rect(0, 0, PAGE_WIDTH, 45, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text("DebtDefender", MARGIN, 22);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(210, 190, 140);
  doc.text("FDCPA Violations & Guidance Report", MARGIN, 32);

  doc.setFontSize(9);
  doc.setTextColor(180, 180, 200);
  doc.text(`Generated ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, MARGIN, 40);

  y = 55;

  // --- Disclaimer ---
  doc.setFillColor(255, 245, 230);
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, 16, 2, 2, "F");
  doc.setFontSize(8);
  doc.setTextColor(120, 90, 40);
  doc.setFont("helvetica", "italic");
  const disclaimer = "Disclaimer: This report provides general legal information, not legal advice. Consult a qualified attorney for advice specific to your situation.";
  const disclaimerLines = wrapText(doc, disclaimer, CONTENT_WIDTH - 8);
  disclaimerLines.forEach((line, i) => {
    doc.text(line, MARGIN + 4, y + 5 + i * 4);
  });
  y += 22;

  // --- Section 1: Violations ---
  if (data.violations.length > 0) {
    y = addPageIfNeeded(doc, y, 30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(30, 45, 70);
    doc.text("Identified FDCPA Violations", MARGIN, y);
    y += 3;

    doc.setDrawColor(210, 175, 100);
    doc.setLineWidth(0.8);
    doc.line(MARGIN, y, MARGIN + 60, y);
    y += 8;

    data.violations.forEach((v, idx) => {
      y = addPageIfNeeded(doc, y, 28);

      doc.setFillColor(245, 245, 250);
      doc.roundedRect(MARGIN, y - 3, CONTENT_WIDTH, 6, 1, 1, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(40, 40, 60);
      doc.text(`${idx + 1}. ${v.title}`, MARGIN + 3, y + 1);
      y += 8;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 100);
      const descLines = wrapText(doc, v.description, CONTENT_WIDTH - 6);
      descLines.forEach((line) => {
        y = addPageIfNeeded(doc, y);
        doc.text(line, MARGIN + 3, y);
        y += LINE_HEIGHT - 1;
      });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(30, 45, 70);
      y = addPageIfNeeded(doc, y);
      doc.text(`Law: ${v.law}`, MARGIN + 3, y);
      y += 8;
    });
  }

  // --- Section 2: AI Guidance ---
  if (data.chatMessages.length > 0) {
    y = addPageIfNeeded(doc, y, 30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(30, 45, 70);
    doc.text("AI Guidance Conversation", MARGIN, y);
    y += 3;

    doc.setDrawColor(210, 175, 100);
    doc.setLineWidth(0.8);
    doc.line(MARGIN, y, MARGIN + 60, y);
    y += 8;

    data.chatMessages.forEach((msg) => {
      const label = msg.role === "user" ? "You:" : "DebtDefender AI:";
      const cleanContent = stripMarkdown(msg.content);

      y = addPageIfNeeded(doc, y, 16);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(msg.role === "user" ? 30 : 160, msg.role === "user" ? 45 : 130, msg.role === "user" ? 70 : 60);
      doc.text(label, MARGIN + 2, y);
      y += 5;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(60, 60, 70);
      const lines = wrapText(doc, cleanContent, CONTENT_WIDTH - 6);
      lines.forEach((line) => {
        y = addPageIfNeeded(doc, y);
        doc.text(line, MARGIN + 4, y);
        y += LINE_HEIGHT - 1;
      });
      y += 3;
    });
  }

  // --- Section 3: Letter Templates ---
  if (data.letterTemplates.length > 0) {
    doc.addPage();
    y = MARGIN;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(30, 45, 70);
    doc.text("Relevant Letter Templates", MARGIN, y);
    y += 3;

    doc.setDrawColor(210, 175, 100);
    doc.setLineWidth(0.8);
    doc.line(MARGIN, y, MARGIN + 60, y);
    y += 8;

    data.letterTemplates.forEach((tmpl) => {
      y = addPageIfNeeded(doc, y, 20);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(40, 40, 60);
      doc.text(tmpl.title, MARGIN, y);
      y += 7;

      doc.setFont("courier", "normal");
      doc.setFontSize(8);
      doc.setTextColor(70, 70, 80);
      const lines = wrapText(doc, tmpl.content, CONTENT_WIDTH - 4);
      lines.forEach((line) => {
        y = addPageIfNeeded(doc, y);
        doc.text(line, MARGIN + 2, y);
        y += 4;
      });
      y += 8;
    });
  }

  // --- Footer on every page ---
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(160, 160, 170);
    doc.text("DebtDefender AI — For informational purposes only", MARGIN, 290);
    doc.text(`Page ${i} of ${pageCount}`, PAGE_WIDTH - MARGIN - 20, 290);
  }

  doc.save("DebtDefender_Report.pdf");
}
