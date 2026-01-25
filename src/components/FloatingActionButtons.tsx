import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Phone, Mail, MessageCircle } from "lucide-react";

const FloatingActionButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const actions = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/918281442486?text=Hi!%20I'd%20like%20to%20know%20more%20about%20VibeMind%20AI%20Solutions.",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      icon: Phone,
      label: "Call",
      href: "tel:+918281442486",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:info@vibemindsolutions.ai",
      color: "bg-purple-500 hover:bg-purple-600",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="fixed bottom-24 right-4 md:bottom-24 md:right-6 z-40 hidden lg:flex flex-col-reverse items-end gap-3"
    >
      {/* Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <>
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0.3, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                    delay: index * 0.05,
                  }
                }}
                exit={{
                  opacity: 0,
                  scale: 0.3,
                  y: 20,
                  transition: {
                    duration: 0.15,
                    delay: (actions.length - 1 - index) * 0.03,
                  }
                }}
                className="flex items-center gap-3"
              >
                {/* Tooltip Label */}
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: index * 0.05 + 0.1 }
                  }}
                  className="px-3 py-1.5 rounded-lg glass-strong text-sm font-medium text-foreground shadow-lg whitespace-nowrap"
                >
                  {action.label}
                </motion.span>

                {/* Action Button */}
                <a
                  href={action.href}
                  target={action.label === "WhatsApp" ? "_blank" : undefined}
                  rel={action.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                  className={`w-12 h-12 rounded-full ${action.color} text-white shadow-lg flex items-center justify-center transition-all duration-200 tactile-button hover:shadow-xl`}
                  onClick={() => setIsOpen(false)}
                >
                  <action.icon className="w-5 h-5" />
                </a>
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-colors duration-200 hover:bg-primary/90 tactile-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close actions menu" : "Open actions menu"}
        aria-expanded={isOpen}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Plus className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default FloatingActionButtons;
