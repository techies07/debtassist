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

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleShareToChat = useCallback((violationTitles: string[]) => {
    const msg = `I've identified the following potential FDCPA violations from a debt collector:\n\n${violationTitles.map((t, i) => `${i + 1}. ${t}`).join("\n")}\n\nWhat are my rights and what steps should I take to address these violations?`;
    setChatInitialMessage(msg);
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection
        onScrollToViolations={() => scrollTo(violationsRef)}
        onScrollToTemplates={() => scrollTo(templatesRef)}
      />
      <div ref={violationsRef}>
        <ViolationsChecker onShareToChat={handleShareToChat} />
      </div>
      <div ref={templatesRef}>
        <LetterTemplates />
      </div>
      <KnowYourRights />
      <Footer />
      <ChatAssistant
        initialMessage={chatInitialMessage}
        onInitialMessageConsumed={() => setChatInitialMessage(null)}
      />
    </div>
  );
};

export default Index;
