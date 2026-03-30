import { Shield, Scale, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onScrollToViolations: () => void;
  onScrollToTemplates: () => void;
}

const HeroSection = ({ onScrollToViolations, onScrollToTemplates }: HeroSectionProps) => {
  return (
    <section className="bg-gradient-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-accent blur-[100px]" />
        <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-accent blur-[120px]" />
      </div>

      <div className="container relative z-10 py-24 md:py-36 flex flex-col items-center text-center gap-8">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5">
          <Shield className="w-4 h-4 text-gold" />
          <span className="text-sm font-body text-gold-light tracking-wide uppercase">Consumer Protection Tool</span>
        </div>

        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight max-w-4xl">
          Fight Back Against{" "}
          <span className="text-gradient-gold">Illegal Debt Collection</span>
        </h1>

        <p className="font-body text-lg md:text-xl text-primary-foreground/70 max-w-2xl leading-relaxed">
          Know your rights under the FDCPA. Identify illegal harassment tactics
          and use our free templates to stop abusive collectors in their tracks.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button variant="hero" size="lg" onClick={onScrollToViolations} className="text-base px-8 py-6">
            <Scale className="w-5 h-5 mr-2" />
            Check for Violations
          </Button>
          <Button
            variant="hero-outline"
            size="lg"
            onClick={onScrollToTemplates}
            className="text-base px-8 py-6 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10"
          >
            <FileText className="w-5 h-5 mr-2" />
            Get Free Templates
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-primary-foreground/10 max-w-lg w-full">
          {[
            { value: "100%", label: "Free" },
            { value: "FDCPA", label: "Based" },
            { value: "50+", label: "Templates" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl font-bold text-gold">{stat.value}</div>
              <div className="text-sm text-primary-foreground/50 font-body">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
