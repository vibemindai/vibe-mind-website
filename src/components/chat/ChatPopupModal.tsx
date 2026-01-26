import { useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AIChatWindow from "@/components/AIChatWindow";

interface ChatPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  onPromptConsumed?: () => void;
}

const ChatPopupModal = ({
  isOpen,
  onClose,
  initialPrompt,
  onPromptConsumed,
}: ChatPopupModalProps) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <DialogPrimitive.Portal forceMount>
            {/* Overlay */}
            <DialogPrimitive.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/80"
              />
            </DialogPrimitive.Overlay>

            {/* Content */}
            <DialogPrimitive.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="fixed inset-0 z-50 flex flex-col bg-background"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <DialogPrimitive.Title className="text-lg font-semibold">
                    VibeMind AI Assistant
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Description className="sr-only">
                    Chat with VibeMind AI Assistant to learn about our services
                  </DialogPrimitive.Description>
                  <DialogPrimitive.Close
                    onClick={onClose}
                    className="rounded-full p-2 hover:bg-muted transition-colors"
                  >
                    <X className="w-5 h-5" />
                    <span className="sr-only">Close</span>
                  </DialogPrimitive.Close>
                </div>

                {/* Chat Content */}
                <div className="flex-1 overflow-hidden p-4">
                  <AIChatWindow
                    initialPrompt={initialPrompt}
                    onPromptConsumed={onPromptConsumed}
                  />
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
};

export default ChatPopupModal;
