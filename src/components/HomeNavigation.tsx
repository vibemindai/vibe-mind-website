import { useState } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomeNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#", active: true },
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services", hasDropdown: true },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-background" />
            </div>
            <span className="text-lg font-semibold text-foreground">
              VibeMind <span className="text-muted-foreground font-normal">Solutions</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                <a
                  href={item.href}
                  className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                    item.active 
                      ? "text-primary border-b-2 border-primary pb-1" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onMouseEnter={() => item.hasDropdown && setIsServicesOpen(true)}
                  onMouseLeave={() => item.hasDropdown && setIsServicesOpen(false)}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </a>
                {item.hasDropdown && isServicesOpen && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-2"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <a href="#" className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted">
                      AI Solutions
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted">
                      Chatbot Development
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted">
                      Custom Integration
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
              Get in Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
              Get in Touch
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default HomeNavigation;
