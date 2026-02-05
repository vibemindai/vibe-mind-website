import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, History, Trash2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import ServicesList from "./ServicesList";
import AIChatWindow, { AIChatWindowHandle } from "./AIChatWindow";
import { useTypingPlaceholder } from "@/hooks/useTypingPlaceholder";

interface MobileLandingProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const MobileLanding = ({ isExpanded, setIsExpanded }: MobileLandingProps) => {
  const [pendingPrompt, setPendingPrompt] = useState<string | undefined>();
  const [maxItems, setMaxItems] = useState(6);
  const { placeholder, isTyping } = useTypingPlaceholder();
  const chatRef = useRef<AIChatWindowHandle>(null);

  // Dynamically calculate max items based on viewport height
  useEffect(() => {
    const calculate = () => {
      const available = window.innerHeight - 340;
      const items = Math.floor(available / 38);
      setMaxItems(Math.max(4, Math.min(items, 10)));
    };

    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, []);

  const handleChatTrigger = (prompt: string) => {
    setPendingPrompt(prompt);
    setIsExpanded(true);
  };

  const handlePromptConsumed = () => {
    setPendingPrompt(undefined);
  };

  return (
    <div
      className={
        isExpanded
          ? "h-[calc(100dvh-3.5rem)] overflow-hidden flex flex-col"
          : "flex flex-col min-h-[calc(100dvh-3.5rem)]"
      }
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          // Landing State: Header + Hero + Chat Input (scrollable for footer reveal)
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col flex-1"
          >
            {/* Hero Section */}
            <div className="flex-1 flex flex-col px-4 sm:px-6 pt-4 pb-2">
              {/* Hero Content */}
              <div className="space-y-4 mb-6">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl sm:text-4xl font-bold leading-tight"
                >
                  <span className="text-foreground">AI Solutions to</span>
                  <br />
                  <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-600 dark:from-primary dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                    Empower Your Business
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm sm:text-base text-muted-foreground max-w-lg"
                >
                  Transforming ideas into intelligent solutions with cutting-edge AI technology.
                </motion.p>
              </div>

              {/* Services List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <ServicesList onChatTrigger={handleChatTrigger} maxItems={maxItems} />
              </motion.div>
            </div>

            {/* Chat Input Trigger - 20% */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="px-4 sm:px-6 pb-4 pt-2"
            >
              <button
                onClick={() => setIsExpanded(true)}
                className="w-full flex items-center gap-2 bg-card rounded-full p-3 sm:p-4 shadow-lg border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="flex-1 text-left flex items-center">
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {placeholder}
                  </span>
                  <span
                    className={`w-0.5 h-4 bg-muted-foreground ml-0.5 ${
                      isTyping ? "animate-typewriter-cursor" : "opacity-0"
                    }`}
                  />
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
              </button>
            </motion.div>
          </motion.div>
        ) : (
          // Expanded State: Full Chat
          <motion.div
            key="expanded"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col h-full"
          >
            {/* Minimal Header with icons */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-border/50">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="h-8 px-2"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>

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
            </div>

            {/* Full Chat Window */}
            <div className="flex-1 px-4 sm:px-6 py-4 overflow-hidden min-h-0">
              <AIChatWindow
                ref={chatRef}
                initialPrompt={pendingPrompt}
                onPromptConsumed={handlePromptConsumed}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileLanding;
