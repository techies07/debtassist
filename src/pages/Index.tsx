import { useRef, useState, useCallback } from "react";
import HeroSection from "@/components/HeroSection";
import ViolationsChecker from "@/components/ViolationsChecker";
import LetterTemplates from "@/components/LetterTemplates";
import KnowYourRights from "@/components/KnowYourRights";
import Footer from "@/components/Footer";
import ChatAssistant from "@/components/ChatAssistant";
import { generatePdfReport } from "@/lib/generatePdf";
import { toast } from "sonner";

const Index = () => {
  const violationsRef = useRef<HTMLDivElement>(null);
  const templatesRef = useRef<HTMLDivElement>(null);
  const [chatInitialMessage, setChatInitialMessage] = useState<string | null>(null);
  const [lastChatMessages, setLastChatMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [lastViolations, setLastViolations] = useState<{ title: string; description: string; law: string }[]>([]);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleShareToChat = useCallback((violationTitles: string[]) => {
    const msg = `I've identified the following potential FDCPA violations from a debt collector:\n\n${violationTitles.map((t, i) => `${i + 1}. ${t}`).join("\n")}\n\nWhat are my rights and what steps should I take to address these violations?`;
    setChatInitialMessage(msg);
  }, []);

  // Letter templates for PDF (first two are most relevant)
  const defaultTemplates = [
    { title: "Cease & Desist Letter", content: "See the Cease & Desist template on DebtDefender for the full letter. Customize with your details and send via certified mail." },
    { title: "Debt Validation Request", content: "See the Debt Validation template on DebtDefender for the full letter. Under FDCPA § 1692g, request proof of the debt within 30 days." },
  ];

  const handleExportFromViolations = useCallback((violations: { title: string; description: string; law: string }[]) => {
    setLastViolations(violations);
    generatePdfReport({
      violations,
      chatMessages: lastChatMessages,
      letterTemplates: defaultTemplates,
    });
    toast.success("PDF report downloaded!");
  }, [lastChatMessages]);

  const handleExportFromChat = useCallback((messages: { role: "user" | "assistant"; content: string }[]) => {
    setLastChatMessages(messages);
    generatePdfReport({
      violations: lastViolations,
      chatMessages: messages,
      letterTemplates: defaultTemplates,
    });
    toast.success("PDF report downloaded!");
  }, [lastViolations]);

  return (
    <div className="min-h-screen">
      <HeroSection
        onScrollToViolations={() => scrollTo(violationsRef)}
        onScrollToTemplates={() => scrollTo(templatesRef)}
      />
      <div ref={violationsRef}>
        <ViolationsChecker onShareToChat={handleShareToChat} onExportPdf={handleExportFromViolations} />
      </div>
      <div ref={templatesRef}>
        <LetterTemplates />
      </div>
      <KnowYourRights />
      <Footer />
      <ChatAssistant
        initialMessage={chatInitialMessage}
        onInitialMessageConsumed={() => setChatInitialMessage(null)}
        onExportPdf={handleExportFromChat}
      />
    </div>
  );
};

export default Index;
