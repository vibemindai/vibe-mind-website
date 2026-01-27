import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { MagneticElement } from "./MagneticElement";

const FloatingActionButtons = () => {
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  const actions = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/918921442486?text=Hi!%20I'd%20like%20to%20know%20more%20about%20VibeMind%20AI%20Solutions.",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      icon: Phone,
      label: "Call",
      href: "tel:+918921442486",
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
    <div className="fixed bottom-24 right-4 md:bottom-24 md:right-6 z-40 hidden lg:flex flex-col-reverse items-end gap-3">
      {/* Action Buttons - Always visible on desktop */}
      {actions.map((action) => (
        <div
          key={action.label}
          className="flex items-center gap-3"
          onMouseEnter={() => setHoveredAction(action.label)}
          onMouseLeave={() => setHoveredAction(null)}
        >
          {/* Tooltip Label - shows on hover */}
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{
              opacity: hoveredAction === action.label ? 1 : 0,
              x: hoveredAction === action.label ? 0 : 10,
            }}
            transition={{ duration: 0.15 }}
            className="px-3 py-1.5 rounded-lg glass-strong text-sm font-medium text-foreground shadow-lg whitespace-nowrap pointer-events-none"
          >
            {action.label}
          </motion.span>

          {/* Action Button */}
          <MagneticElement strength={0.4} radius={50}>
            <a
              href={action.href}
              target={action.label === "WhatsApp" ? "_blank" : undefined}
              rel={action.label === "WhatsApp" ? "noopener noreferrer" : undefined}
              className={`w-12 h-12 rounded-full ${action.color} text-white shadow-lg flex items-center justify-center transition-all duration-200 tactile-button hover:shadow-xl`}
              aria-label={action.label}
            >
              <action.icon className="w-5 h-5" />
            </a>
          </MagneticElement>
        </div>
      ))}
    </div>
  );
};

export default FloatingActionButtons;
