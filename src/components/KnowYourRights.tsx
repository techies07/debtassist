import { BookOpen, ExternalLink } from "lucide-react";

const rights = [
  {
    title: "Right to Validation",
    desc: "Within 5 days of first contact, a collector must send you a written notice with the debt amount, creditor name, and your right to dispute.",
  },
  {
    title: "Right to Dispute",
    desc: "You have 30 days to dispute the debt in writing. The collector must stop collecting until they provide verification.",
  },
  {
    title: "Right to Stop Contact",
    desc: "You can demand in writing that a collector stop contacting you. They can only reach out to confirm they'll stop or to notify you of legal action.",
  },
  {
    title: "Right to Sue",
    desc: "You can sue a collector within one year of a violation. You may recover up to $1,000 in statutory damages plus actual damages and attorney's fees.",
  },
  {
    title: "Protection from Abuse",
    desc: "Collectors cannot use obscene language, call repeatedly to harass, or publish your name on a 'bad debt' list.",
  },
  {
    title: "Time-Barred Debt Protection",
    desc: "If the statute of limitations has expired, you may not legally owe the debt. Making a payment can restart the clock — know your state's limits.",
  },
];

const KnowYourRights = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container max-w-5xl">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 mb-4">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">Know Your Rights</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Your Rights Under Federal Law
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            The Fair Debt Collection Practices Act (FDCPA) gives you powerful protections.
            Here's what every consumer should know.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rights.map((right, i) => (
            <div
              key={i}
              className="p-6 bg-card rounded-lg border border-border hover:border-accent/40 hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-8 h-8 rounded-full bg-accent/10 text-accent font-display font-bold flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                {i + 1}
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{right.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{right.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://www.ftc.gov/legal-library/browse/statutes/fair-debt-collection-practices-act"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors"
          >
            Read the full FDCPA text on FTC.gov
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default KnowYourRights;
