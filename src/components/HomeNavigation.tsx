import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

const HomeNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/", active: true },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services", hasDropdown: true },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-background" />
            </div>
            <span className="text-base sm:text-lg font-semibold text-foreground">
              VibeMind <span className="text-muted-foreground font-normal hidden sm:inline">Solutions</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                <Link
                  to={item.href}
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
                </Link>
                {item.hasDropdown && isServicesOpen && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-2"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <Link to="/services" className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted">
                      AI Solutions
                    </Link>
                    <Link to="/services" className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted">
                      Chatbot Development
                    </Link>
                    <Link to="/services" className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted">
                      Custom Integration
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4">
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <ThemeToggle />
            <Link to="/contact">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4 xl:px-6 text-sm">
                Get in Touch
              </Button>
            </Link>
          </div>

          {/* Mobile Right Side */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
                Get in Touch
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default HomeNavigation;
