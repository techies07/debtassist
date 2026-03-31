import { useState } from "react";
import { AlertTriangle, CheckCircle, Phone, Clock, Users, MessageSquare, Gavel, Ban, Bot, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Violation {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  law: string;
  example: string;
}

const violations: Violation[] = [
  {
    id: "threats",
    icon: <AlertTriangle className="w-5 h-5" />,
    title: "Threats of Violence or Harm",
    description: "A collector cannot threaten you with violence, harm, or criminal prosecution to collect a debt.",
    law: "FDCPA § 806(1)",
    example: '"If you don\'t pay, we\'ll have you arrested" — This is illegal.',
  },
  {
    id: "hours",
    icon: <Clock className="w-5 h-5" />,
    title: "Calling Outside Legal Hours",
    description: "Collectors cannot call before 8 AM or after 9 PM in your local time zone.",
    law: "FDCPA § 805(a)(1)",
    example: "Receiving calls at 6 AM or 10 PM is a violation.",
  },
  {
    id: "third-party",
    icon: <Users className="w-5 h-5" />,
    title: "Contacting Third Parties",
    description: "Collectors generally cannot discuss your debt with your family, friends, employer, or neighbors.",
    law: "FDCPA § 805(b)",
    example: "Calling your workplace or telling your neighbor about your debt is illegal.",
  },
  {
    id: "harassment",
    icon: <Phone className="w-5 h-5" />,
    title: "Repeated Harassing Calls",
    description: "Collectors cannot call repeatedly with the intent to annoy, abuse, or harass you.",
    law: "FDCPA § 806(5)",
    example: "Calling 10+ times a day or calling back immediately after you hang up.",
  },
  {
    id: "false-rep",
    icon: <MessageSquare className="w-5 h-5" />,
    title: "False Representations",
    description: "Collectors cannot lie about the amount owed, pretend to be attorneys, or claim to be government officials.",
    law: "FDCPA § 807",
    example: '"I\'m calling from the IRS" or inflating the debt amount.',
  },
  {
    id: "unfair",
    icon: <Ban className="w-5 h-5" />,
    title: "Unfair Practices",
    description: "Collectors cannot add unauthorized fees, threaten to seize property they have no right to, or deposit post-dated checks early.",
    law: "FDCPA § 808",
    example: "Adding a 'processing fee' not authorized by the original agreement.",
  },
];

interface ViolationsCheckerProps {
  onShareToChat?: (violationTitles: string[]) => void;
  onExportPdf?: (violations: { title: string; description: string; law: string }[]) => void;
}

const ViolationsChecker = ({ onShareToChat, onExportPdf }: ViolationsCheckerProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleViolation = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  return (
    <section className="bg-gradient-warm py-20 md:py-28">
      <div className="container max-w-5xl">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 mb-4">
            <Gavel className="w-4 h-4 text-destructive" />
            <span className="text-sm font-semibold text-destructive uppercase tracking-wide">Violations Checker</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Has a Collector Broken the Law?
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Select any behaviors you've experienced. Each one may be a federal FDCPA violation
            that entitles you to damages up to $1,000 per collector.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {violations.map((v) => {
            const isSelected = selected.includes(v.id);
            return (
              <button
                key={v.id}
                onClick={() => toggleViolation(v.id)}
                className={`group text-left p-5 rounded-lg border-2 transition-all duration-200 ${
                  isSelected
                    ? "border-destructive bg-destructive/5 shadow-md"
                    : "border-border bg-card hover:border-accent/50 hover:shadow-sm"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isSelected ? "bg-destructive text-destructive-foreground" : "bg-muted text-muted-foreground group-hover:bg-accent/20 group-hover:text-accent"
                    }`}
                  >
                    {isSelected ? <CheckCircle className="w-5 h-5" /> : v.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">{v.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{v.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-medium">{v.law}</span>
                    </div>
                    {isSelected && (
                      <div className="mt-3 p-3 bg-destructive/5 rounded border border-destructive/20 animate-fade-up">
                        <p className="text-sm text-destructive font-medium">⚠️ {v.example}</p>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {selected.length > 0 && (
          <div className="mt-8 p-6 bg-card rounded-lg border-2 border-accent shadow-lg animate-fade-up text-center">
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              {selected.length} Potential Violation{selected.length > 1 ? "s" : ""} Found
            </h3>
            <p className="text-muted-foreground mb-4 font-body">
              You may be entitled to statutory damages of <strong className="text-accent">up to $1,000 per collector</strong>,
              plus actual damages and attorney's fees under the FDCPA.
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Scroll down to get free cease & desist letter templates you can send today.
            </p>
            {onShareToChat && (
              <Button
                variant="hero"
                size="lg"
                onClick={() => {
                  const titles = violations.filter((v) => selected.includes(v.id)).map((v) => v.title);
                  onShareToChat(titles);
                }}
                className="mt-2"
              >
                <Bot className="w-5 h-5 mr-2" />
                Get AI Guidance on My Violations
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ViolationsChecker;
