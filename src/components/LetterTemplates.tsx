import { useState } from "react";
import { FileText, Copy, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Template {
  id: string;
  title: string;
  description: string;
  content: string;
}

const templates: Template[] = [
  {
    id: "cease-desist",
    title: "Cease & Desist Letter",
    description: "Demand the collector stop all contact. Under FDCPA § 805(c), they must comply.",
    content: `[Your Name]
[Your Address]
[City, State, ZIP]
[Date]

[Collector Name]
[Collector Address]
[City, State, ZIP]

Re: Account # [Account Number]

Dear [Collector Name],

Pursuant to my rights under the Fair Debt Collection Practices Act (FDCPA), 15 U.S.C. § 1692c(c), I am writing to demand that you cease all further communication with me regarding the above-referenced account.

This letter serves as my formal written notification that I refuse to pay this alleged debt, and I demand that you cease all further communication with me, except to:

1. Advise me that further collection efforts are being terminated;
2. Notify me that a specific legal action may be taken; or
3. Notify me that a specific legal action has been taken.

Any further contact beyond these exceptions will constitute a violation of the FDCPA, and I will pursue all legal remedies available to me, including filing a complaint with the Consumer Financial Protection Bureau (CFPB), the Federal Trade Commission (FTC), and my state attorney general.

Sincerely,
[Your Name]`,
  },
  {
    id: "debt-validation",
    title: "Debt Validation Request",
    description: "Force the collector to prove the debt is valid and they have the right to collect it.",
    content: `[Your Name]
[Your Address]
[City, State, ZIP]
[Date]

[Collector Name]
[Collector Address]
[City, State, ZIP]

Re: Account # [Account Number]

Dear [Collector Name],

I am writing in response to your [letter/phone call] dated [date], regarding the above-referenced account. Pursuant to the Fair Debt Collection Practices Act (FDCPA), 15 U.S.C. § 1692g, I am requesting validation of this alleged debt.

Please provide the following:

1. The amount of the debt and how it was calculated, including all fees and interest;
2. The name and address of the original creditor;
3. A copy of the original signed agreement or contract;
4. Proof that you are licensed to collect debts in my state;
5. Proof that the statute of limitations has not expired on this debt;
6. Complete payment history from the original creditor.

Until you provide adequate validation of this debt, you must cease all collection activities, including reporting this account to credit bureaus, pursuant to the FDCPA.

Sincerely,
[Your Name]`,
  },
  {
    id: "cfpb-complaint",
    title: "CFPB Complaint Template",
    description: "File a formal complaint with the Consumer Financial Protection Bureau.",
    content: `CFPB Complaint — Prepare this information before filing at consumerfinance.gov/complaint

SECTION 1 — YOUR INFORMATION
Full Name: [Your Name]
Address: [Your Address]
Phone: [Your Phone]
Email: [Your Email]

SECTION 2 — COMPANY INFORMATION
Company Name: [Collector Name]
Account Number: [Account Number]

SECTION 3 — DESCRIBE WHAT HAPPENED
[Describe the violation in detail. Include dates, times, what was said, and which FDCPA sections were violated. For example:]

On [date] at approximately [time], I received a call from [Collector Name] at [phone number]. The caller [describe what happened — e.g., "threatened to garnish my wages without a court order," "called my employer and disclosed my debt," "used profane language," etc.].

This violates FDCPA § [section number].

I have [sent a cease and desist letter / requested debt validation] on [date] via [certified mail / email], but the collector has [continued calling / failed to validate / etc.].

SECTION 4 — DESIRED RESOLUTION
I request that the CFPB investigate this matter and take appropriate enforcement action. I also request that the collector cease all illegal collection activities immediately.

SECTION 5 — SUPPORTING DOCUMENTS
Attach copies of:
- Call logs showing dates/times of calls
- Any letters received from the collector
- Your cease & desist or validation letters (with certified mail receipts)
- Any recordings (if legal in your state)`,
  },
  {
    id: "attorney-general",
    title: "State Attorney General Complaint",
    description: "Escalate to your state's attorney general for investigation and enforcement.",
    content: `[Your Name]
[Your Address]
[City, State, ZIP]
[Date]

Office of the Attorney General
[Your State]
[AG Office Address]

Re: Complaint Against [Collector Name] — FDCPA Violations

Dear Attorney General's Office,

I am writing to file a formal complaint against [Collector Name] located at [Collector Address] for violations of the Fair Debt Collection Practices Act (FDCPA) and [your state's] consumer protection laws.

SUMMARY OF VIOLATIONS:
[List each violation with dates and details]

1. On [date], the collector [describe violation].
2. On [date], the collector [describe violation].

ACTIONS TAKEN:
- I sent a debt validation request on [date] via certified mail.
- I sent a cease and desist letter on [date] via certified mail.
- I filed a complaint with the CFPB on [date] (reference #[number]).

REQUESTED ACTION:
I respectfully request that your office investigate these violations and take appropriate enforcement action to protect me and other consumers from these illegal practices.

I have enclosed copies of all relevant correspondence and documentation.

Sincerely,
[Your Name]

Enclosures:
- Copy of debt validation letter
- Copy of cease and desist letter
- Call logs
- Any correspondence from collector`,
  },
];

const LetterTemplates = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyTemplate = (template: Template) => {
    navigator.clipboard.writeText(template.content);
    setCopiedId(template.id);
    toast.success("Template copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container max-w-4xl">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 mb-4">
            <FileText className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent uppercase tracking-wide">Free Templates</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Ready-to-Send Legal Templates
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Copy, customize with your details, and send via certified mail.
            Each template cites the specific federal laws protecting you.
          </p>
        </div>

        <div className="space-y-4">
          {templates.map((template) => {
            const isExpanded = expandedId === template.id;
            return (
              <div
                key={template.id}
                className="border-2 border-border rounded-lg bg-card overflow-hidden transition-shadow hover:shadow-md"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : template.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground">{template.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 animate-fade-up">
                    <div className="relative">
                      <pre className="bg-muted p-5 rounded-lg text-sm font-body text-foreground whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-96 overflow-y-auto">
                        {template.content}
                      </pre>
                      <Button
                        variant="hero"
                        size="sm"
                        className="absolute top-3 right-3"
                        onClick={() => copyTemplate(template)}
                      >
                        {copiedId === template.id ? (
                          <><Check className="w-4 h-4 mr-1" /> Copied</>
                        ) : (
                          <><Copy className="w-4 h-4 mr-1" /> Copy</>
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      ⚡ Replace all [bracketed] placeholders with your information. Send via USPS certified mail with return receipt.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LetterTemplates;
