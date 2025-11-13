import { Brain } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-foreground py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">Vibe Mind AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Building intelligent software through Vibe Coding philosophy
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-primary transition-smooth">AI Development</a></li>
              <li><a href="#services" className="hover:text-primary transition-smooth">Legacy Modernization</a></li>
              <li><a href="#services" className="hover:text-primary transition-smooth">Custom AI Solutions</a></li>
              <li><a href="#services" className="hover:text-primary transition-smooth">AI SDKs & Tools</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="https://jyotai.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-smooth">JyotAI.in</a></li>
              <li><a href="#products" className="hover:text-primary transition-smooth">Community App</a></li>
              <li><a href="#tech-stack" className="hover:text-primary transition-smooth">Vibe SDK</a></li>
              <li><a href="#tech-stack" className="hover:text-primary transition-smooth">CodeMind Engine</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-primary transition-smooth">About Us</a></li>
              <li><a href="#contact" className="hover:text-primary transition-smooth">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-smooth">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-smooth">Blog</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Vibe Mind AI Solutions. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-smooth">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-smooth">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
