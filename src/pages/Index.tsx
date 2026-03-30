import { useRef } from "react";
import HeroSection from "@/components/HeroSection";
import ViolationsChecker from "@/components/ViolationsChecker";
import LetterTemplates from "@/components/LetterTemplates";
import KnowYourRights from "@/components/KnowYourRights";
import Footer from "@/components/Footer";

const Index = () => {
  const violationsRef = useRef<HTMLDivElement>(null);
  const templatesRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <HeroSection
        onScrollToViolations={() => scrollTo(violationsRef)}
        onScrollToTemplates={() => scrollTo(templatesRef)}
      />
      <div ref={violationsRef}>
        <ViolationsChecker />
      </div>
      <div ref={templatesRef}>
        <LetterTemplates />
      </div>
      <KnowYourRights />
      <Footer />
    </div>
  );
};

export default Index;
