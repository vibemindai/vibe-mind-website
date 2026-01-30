import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Phone, Mail, Send, CheckCircle, Loader2, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import ThemeToggle from "./ThemeToggle";
import { useToast } from "@/hooks/use-toast";
import { MagneticElement } from "./MagneticElement";
import { CONTACT_API_ENDPOINT, getClientId, getIpAddress, getSessionId } from "@/lib/api";

interface HomeNavigationProps {
  onLogoClick?: () => void;
  isMobileChatExpanded?: boolean;
}

const contactActions = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/918921442486?text=Hi!%20I'd%20like%20to%20know%20more%20about%20VibeMind%20AI%20Solutions.",
    color: "bg-primary hover:bg-primary/90",
  },
  {
    icon: Phone,
    label: "Call",
    href: "tel:+918921442486",
    color: "bg-primary hover:bg-primary/90",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:info@vibemindsolutions.ai",
    color: "bg-primary hover:bg-primary/90",
  },
];

const HomeNavigation = ({ onLogoClick, isMobileChatExpanded }: HomeNavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  // Callback form state
  const [contact, setContact] = useState("");
  const [contactType, setContactType] = useState<"email" | "phone" | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Email and phone patterns
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,3}[)]?[-\s.]?[0-9]{4,}$/;
  const digitsOnly = (str: string) => str.replace(/\D/g, "");

  useEffect(() => {
    if (!contact.trim()) {
      setContactType(null);
      setIsValid(false);
      return;
    }

    if (emailPattern.test(contact.trim())) {
      setContactType("email");
      setIsValid(true);
      return;
    }

    const digits = digitsOnly(contact);
    if (digits.length >= 10 && phonePattern.test(contact.trim())) {
      setContactType("phone");
      setIsValid(true);
      return;
    }

    if (contact.includes("@")) {
      setContactType("email");
      setIsValid(false);
      return;
    }

    if (digits.length > 0 && digits.length >= contact.replace(/[\s\-()+ .]/g, "").length * 0.7) {
      setContactType("phone");
      setIsValid(digits.length >= 10);
      return;
    }

    setContactType(null);
    setIsValid(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact]);

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !contactType) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(CONTACT_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": getSessionId(),
          "x-client-id": getClientId(),
          "x-ipaddress": getIpAddress(),
        },
        body: JSON.stringify({ contact: contact.trim(), type: contactType }),
      });

      if (!response.ok) throw new Error("Failed to submit request");

      setIsSuccess(true);
      setContact("");
      toast({ title: "Request submitted!", description: "We'll get back to you soon." });

      setTimeout(() => setIsSuccess(false), 3000);
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const navItems = [
    { label: "Home", href: "/", active: true },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo - on mobile when chat expanded, clicking goes back to services */}
          {isMobileChatExpanded && (
            <button
              onClick={onLogoClick}
              className="flex items-center gap-2 group lg:hidden"
            >
              <img
                src="/logo.png"
                alt="VibeMind AI Solutions"
                className="h-8 sm:h-10 w-auto"
              />
            </button>
          )}
          <Link
            to="/"
            className={`flex items-center gap-2 group ${isMobileChatExpanded ? 'hidden lg:flex' : ''}`}
          >
            <img
              src="/logo.png"
              alt="VibeMind AI Solutions"
              className="h-8 sm:h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <MagneticElement key={item.label} strength={0.25} radius={40}>
                <div className="relative">
                  <Link
                    to={item.href}
                    className={`text-sm font-medium transition-colors ${
                      item.active
                        ? "text-primary border-b-2 border-primary pb-1"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              </MagneticElement>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4">
            <ThemeToggle />
            <MagneticElement strength={0.35} radius={60}>
              <Link to="/contact">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4 xl:px-6 text-sm">
                  Get in Touch
                </Button>
              </Link>
            </MagneticElement>
          </div>

          {/* Mobile Right Side */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 text-foreground"
                  aria-label="Toggle menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] flex flex-col">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                {/* Mobile Nav Items */}
                <nav className="flex-1 pt-8">
                  <div className="space-y-1">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                            delay: index * 0.05,
                          }
                        }}
                      >
                        <Link
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                            item.active
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          }`}
                        >
                          {item.label}
                          {item.active && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick Contact Actions */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                        delay: navItems.length * 0.05,
                      }
                    }}
                    className="mt-6 pt-6 border-t border-border"
                  >
                    <p className="text-xs text-muted-foreground mb-3">
                      Quick contact
                    </p>
                    <div className="flex gap-3">
                      {contactActions.map((action) => (
                        <a
                          key={action.label}
                          href={action.href}
                          target={action.label === "WhatsApp" ? "_blank" : undefined}
                          rel={action.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                          className={`flex-1 flex flex-col items-center gap-1.5 p-3 rounded-xl ${action.color} text-primary-foreground transition-transform active:scale-95`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <action.icon className="w-5 h-5" />
                          <span className="text-xs font-medium">{action.label}</span>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                </nav>

                {/* Callback Request Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                      delay: 0.25,
                    }
                  }}
                  className="border-t border-border pt-6 mt-auto"
                >
                  <p className="text-xs text-muted-foreground mb-3">
                    Request a callback
                  </p>
                  <form onSubmit={handleCallbackSubmit} className="space-y-3">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Phone or email"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="h-10 pr-10 text-sm"
                        disabled={isSubmitting || isSuccess}
                      />
                      <AnimatePresence>
                        {contactType && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute right-10 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded"
                          >
                            {contactType === "email" ? "Email" : "Phone"}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <AnimatePresence mode="wait">
                      {isSuccess ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="flex items-center justify-center gap-2 h-10 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 text-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Request sent!</span>
                        </motion.div>
                      ) : (
                        <Button
                          type="submit"
                          disabled={!isValid || isSubmitting}
                          className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg tactile-button text-sm"
                        >
                          {isSubmitting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5 mr-2" />
                              Send
                            </>
                          )}
                        </Button>
                      )}
                    </AnimatePresence>
                  </form>
                </motion.div>

                {/* Contact Info at Bottom */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                      delay: 0.35,
                    }
                  }}
                  className="border-t border-border pt-4 mt-4 space-y-3"
                >
                  <a
                    href="tel:+918921442486"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    +91 89 21 442 486
                  </a>
                  <a
                    href="mailto:info@vibemindsolutions.ai"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    info@vibemindsolutions.ai
                  </a>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavigation;
