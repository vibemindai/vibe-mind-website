import { Brain } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="bg-primary-dark py-12 border-t border-border"
      aria-label="Site Footer - Vibe Mind AI Solutions Kerala"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-white">Vibe Mind AI</span>
            </div>
            <p className="text-sm text-gray-300">
              Building intelligent software through Vibe Coding philosophy
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#services" className="hover:text-primary transition-smooth">AI Development</a></li>
              <li><a href="#services" className="hover:text-primary transition-smooth">Legacy Modernization</a></li>
              <li><a href="#services" className="hover:text-primary transition-smooth">Custom AI Solutions</a></li>
              <li><a href="#services" className="hover:text-primary transition-smooth">AI SDKs & Tools</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Products</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="https://jyotai.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-smooth">JyotAI.in</a></li>
              <li><a href="#products" className="hover:text-primary transition-smooth">Community App</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#about" className="hover:text-primary transition-smooth">About Us</a></li>
              <li><a href="#contact" className="hover:text-primary transition-smooth">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-300">
            © {currentYear} Vibe Mind AI Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
