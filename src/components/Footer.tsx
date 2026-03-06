import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle, Brain } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Twitter",
      href: "https://x.com/vibemind_ai",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/vibemindai",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://facebook.com/vibemindai",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/vibemindai",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/918921442486?text=Hi%20VibeMind%2C%20I%27d%20like%20to%20discuss%20a%20project",
      icon: <MessageCircle className="w-5 h-5" />,
    },
  ];

  return (
    <footer
      role="contentinfo"
      className="bg-primary-dark py-4  sm:py-11 border-t border-border"
      aria-label="Site Footer - Vibe Mind AI Solutions"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand + Social */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
          <img src="/vibemind-logo.svg" alt="" className="h-12 w-28" />   
            <p className="text-sm text-gray-300" itemProp="description">
              Building intelligent software through Vibe Coding philosophy
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-primary-dark"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div itemScope itemType="https://schema.org/ContactPoint">
            <h3 className="font-semibold mb-4 text-white">Contact</h3>
            <address className="not-italic space-y-3 text-sm text-gray-300">
              <a
                href="tel:+918921442486"
                className="flex items-center gap-2 hover:text-primary transition-smooth focus:outline-none focus:text-primary"
                itemProp="telephone"
              >
                <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span>+91 89 21 442 486</span>
              </a>
              <a
                href="mailto:info@vibemindsolutions.ai"
                className="flex items-center gap-2 hover:text-primary transition-smooth focus:outline-none focus:text-primary"
                itemProp="email"
              >
                <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span>info@vibemindsolutions.ai</span>
              </a>
              <a
                href="https://wa.me/918921442486?text=Hi%20VibeMind%2C%20I%27d%20like%20to%20discuss%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-smooth focus:outline-none focus:text-primary"
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            </address>
          </div>

          {/* Locations */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Clients Across</h3>
            <ul role="list" className="space-y-3 text-sm text-gray-300">
              <li
                className="flex items-start gap-2"
                itemScope
                itemType="https://schema.org/Place"
              >
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span itemProp="name">India</span>
              </li>
              <li
                className="flex items-start gap-2"
                itemScope
                itemType="https://schema.org/Place"
              >
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span itemProp="name">Middle East</span>
              </li>
              <li
                className="flex items-start gap-2"
                itemScope
                itemType="https://schema.org/Place"
              >
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span itemProp="name">North America</span>
              </li>
              <li
                className="flex items-start gap-2"
                itemScope
                itemType="https://schema.org/Place"
              >
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span itemProp="name">Germany</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Quick Links - inline */}
          <nav
            aria-label="Quick links"
            className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-gray-300 order-1 md:order-2"
          >
            <Link to="/" className="hover:text-primary transition-smooth">
              Home
            </Link>
            <Link to="/services" className="hover:text-primary transition-smooth">
              Services
            </Link>
            <Link to="/about" className="hover:text-primary transition-smooth">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-primary transition-smooth">
              Contact
            </Link>
            <Link to="/privacy-policy" className="hover:text-primary transition-smooth">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-primary transition-smooth">
              Terms & Conditions
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-gray-300 order-2 md:order-1">
            &copy; {currentYear} Vibe Mind AI Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
