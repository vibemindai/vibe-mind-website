import { useEffect, useRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, History, Trash2, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import AIChatWindow, { AIChatWindowHandle } from "@/components/AIChatWindow";

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
  const chatRef = useRef<AIChatWindowHandle>(null);

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
                {/* Header - minimal with icons only */}
                <div className="flex items-center justify-end gap-2 p-4 border-b border-border">
                  <DialogPrimitive.Title className="sr-only">Vibii Chat</DialogPrimitive.Title>
                  <DialogPrimitive.Description className="sr-only">
                    Chat with Vibii, VibeMind's AI assistant
                  </DialogPrimitive.Description>

                  {/* History dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full p-2 h-auto hover:bg-muted transition-colors"
                        title="Chat history options"
                      >
                        <History className="w-5 h-5" />
                        <span className="sr-only">Chat history options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem
                        onClick={() => chatRef.current?.clearMessages()}
                        className="cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear conversation
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => chatRef.current?.clearSession()}
                        className="cursor-pointer text-destructive focus:text-destructive"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Start new session
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Close button */}
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
                    ref={chatRef}
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
