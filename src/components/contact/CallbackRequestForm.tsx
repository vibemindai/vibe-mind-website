import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { submitContact } from "@/lib/api";

const CallbackRequestForm = () => {
  const [contact, setContact] = useState("");
  const [contactType, setContactType] = useState<"email" | "phone" | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  // Email regex pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Phone pattern (10+ digits, allowing spaces, dashes, parentheses, and + prefix)
  const phonePattern = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,3}[)]?[-\s.]?[0-9]{4,}$/;
  const digitsOnly = (str: string) => str.replace(/\D/g, "");

  useEffect(() => {
    if (!contact.trim()) {
      setContactType(null);
      setIsValid(false);
      return;
    }

    // Check if it's an email
    if (emailPattern.test(contact.trim())) {
      setContactType("email");
      setIsValid(true);
      return;
    }

    // Check if it's a phone (10+ digits)
    const digits = digitsOnly(contact);
    if (digits.length >= 10 && phonePattern.test(contact.trim())) {
      setContactType("phone");
      setIsValid(true);
      return;
    }

    // If contains @ but not valid email yet
    if (contact.includes("@")) {
      setContactType("email");
      setIsValid(false);
      return;
    }

    // If mostly digits, likely a phone in progress
    if (digits.length > 0 && digits.length >= contact.replace(/[\s\-()+ .]/g, "").length * 0.7) {
      setContactType("phone");
      setIsValid(digits.length >= 10);
      return;
    }

    setContactType(null);
    setIsValid(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !contactType) return;

    setIsSubmitting(true);

    try {
      const response = await submitContact(contact.trim());

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      setIsSuccess(true);
      setContact("");

      toast({
        title: "Request submitted!",
        description: "We'll get back to you soon.",
      });

      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-strong rounded-2xl p-6 md:p-8">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Request a Callback</h3>
        <p className="text-sm text-muted-foreground">
          Enter your phone number or email, and we'll reach out to you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Phone number or email address"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="h-12 pr-12 text-base"
            disabled={isSubmitting || isSuccess}
          />

          {/* Type indicator */}
          <AnimatePresence>
            {contactType && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute right-12 top-1/2 -translate-y-1/2 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded"
              >
                {contactType === "email" ? "Email" : "Phone"}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Submit button - only shows when valid */}
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center gap-2 h-12 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400"
            >
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Request sent!</span>
            </motion.div>
          ) : (
            <motion.div
              key="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isValid ? 1 : 0.5,
                y: 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg tactile-button"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Request
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default CallbackRequestForm;
