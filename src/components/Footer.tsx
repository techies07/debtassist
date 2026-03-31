import { Shield } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary py-12">
    <div className="container max-w-5xl text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-gold" />
        <span className="font-display text-lg font-bold text-primary-foreground">DebtDefender</span>
      </div>
      <p className="text-sm text-primary-foreground/50 max-w-lg mx-auto mb-6 font-body">
        This tool provides legal information, not legal advice. For specific situations,
        consult a consumer rights attorney. Many offer free consultations for FDCPA cases.
      </p>
      <div className="flex justify-center gap-6 text-xs text-primary-foreground/40 font-body">
        <a href="https://www.consumerfinance.gov/complaint/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">CFPB</a>
        <a href="https://www.ftc.gov/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">FTC</a>
        <a href="https://www.consumeradvocates.org/find-an-attorney/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Find an Attorney (NACA)</a>
      </div>
    </div>
  </footer>
);

export default Footer;
