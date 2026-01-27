import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Copy, Check, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactInfoCards = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, type: "email" | "phone") => {
    try {
      await navigator.clipboard.writeText(text);

      if (type === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }

      toast({
        title: "Copied!",
        description: `${type === "email" ? "Email" : "Phone number"} copied to clipboard.`,
      });
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please try selecting and copying manually.",
        variant: "destructive",
      });
    }
  };

  const cards = [
    {
      icon: Mail,
      title: "Email Us",
      value: "info@vibemindsolutions.ai",
      href: "mailto:info@vibemindsolutions.ai",
      copyValue: "info@vibemindsolutions.ai",
      type: "email" as const,
      copied: copiedEmail,
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+91 89 21 442 486",
      href: "tel:+918921442486",
      copyValue: "+918921442486",
      type: "phone" as const,
      copied: copiedPhone,
      subtitle: "India",
    },
    {
      icon: Globe,
      title: "Global Presence",
      value: "India, Qatar, USA",
      isInfo: true,
    },
  ];

  return (
    <div className="space-y-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            delay: index * 0.1,
          }}
          className="glass-strong rounded-xl p-4 group"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
              <card.icon className="w-5 h-5 text-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-muted-foreground mb-1">
                {card.title}
              </h4>

              {card.isInfo ? (
                <p className="text-foreground font-semibold">{card.value}</p>
              ) : (
                <div className="flex items-center gap-2">
                  <a
                    href={card.href}
                    className="text-foreground font-semibold hover:text-primary transition-colors truncate"
                  >
                    {card.value}
                  </a>

                  <button
                    onClick={() => copyToClipboard(card.copyValue!, card.type!)}
                    className="p-1.5 rounded-md hover:bg-muted transition-colors flex-shrink-0"
                    aria-label={`Copy ${card.type}`}
                  >
                    {card.copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              )}

              {card.subtitle && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {card.subtitle}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Quick Response Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          delay: cards.length * 0.1,
        }}
        className="glass-strong rounded-xl p-4 bg-primary/5"
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <div>
            <h4 className="font-medium text-sm">Quick Response</h4>
            <p className="text-xs text-muted-foreground">
              We typically respond within 24 hours
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactInfoCards;
