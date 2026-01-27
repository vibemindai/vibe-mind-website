import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle, Brain } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Twitter",
      href: "https://twitter.com/vibemindai",
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
      name: "WhatsApp",
      href: "https://wa.me/918281442486?text=Hi%20VibeMind%2C%20I%27d%20like%20to%20discuss%20a%20project",
      icon: <MessageCircle className="w-5 h-5" />,
    },
  ];

  return (
    <footer
      role="contentinfo"
      className="bg-primary-dark py-12 border-t border-border"
      aria-label="Site Footer - Vibe Mind AI Solutions"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand + Social */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 group">
              <Brain className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span className="text-xl font-bold text-white" itemProp="name">Vibe Mind AI</span>
            </Link>
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

          {/* Services */}
          <nav aria-label="Our services">
            <h3 className="font-semibold mb-4 text-white">Services</h3>
            <ul role="list" className="space-y-2 text-sm text-gray-300">
              <li>
                <Link
                  to="/services"
                  className="hover:text-primary transition-smooth focus:outline-none focus:text-primary"
                >
                  AI Development
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-primary transition-smooth focus:outline-none focus:text-primary"
                >
                  Legacy Modernization
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-primary transition-smooth focus:outline-none focus:text-primary"
                >
                  Custom AI Solutions
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-primary transition-smooth focus:outline-none focus:text-primary"
                >
                  AI SDKs & Tools
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact Info */}
          <div itemScope itemType="https://schema.org/ContactPoint">
            <h3 className="font-semibold mb-4 text-white">Contact</h3>
            <address className="not-italic space-y-3 text-sm text-gray-300">
              <a
                href="tel:+918281442486"
                className="flex items-center gap-2 hover:text-primary transition-smooth focus:outline-none focus:text-primary"
                itemProp="telephone"
              >
                <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span>+91 82 81 442 486</span>
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
                href="https://wa.me/918281442486?text=Hi%20VibeMind%2C%20I%27d%20like%20to%20discuss%20a%20project"
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
                itemType="https://schema.org/PostalAddress"
              >
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span itemProp="addressLocality">Kerala, India</span>
              </li>
              <li
                className="flex items-start gap-2"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span itemProp="addressLocality">Qatar</span>
              </li>
              <li
                className="flex items-start gap-2"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span itemProp="addressLocality">United States</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Quick Links - inline */}
          <nav aria-label="Quick links" className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-gray-300 order-1 md:order-2">
            <Link to="/" className="hover:text-primary transition-smooth">Home</Link>
            <Link to="/about" className="hover:text-primary transition-smooth">About Us</Link>
            <Link to="/services" className="hover:text-primary transition-smooth">Services</Link>
            <Link to="/contact" className="hover:text-primary transition-smooth">Contact</Link>
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
