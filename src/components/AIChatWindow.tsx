import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSSEChat } from "@/hooks/useSSEChat";
import ChatInput from "./chat/ChatInput";
import ChatMessageList from "./chat/ChatMessageList";
import SuggestedQuestions from "./chat/SuggestedQuestions";
import OrbitRobotIllustration from "./chat/OrbitRobotIllustration";

interface AIChatWindowProps {
  initialPrompt?: string;
  onPromptConsumed?: () => void;
}

export interface AIChatWindowHandle {
  clearMessages: () => void;
  clearSession: () => void;
}

const AIChatWindow = forwardRef<AIChatWindowHandle, AIChatWindowProps>(
  ({ initialPrompt, onPromptConsumed }, ref) => {
    const {
      messages,
      chatStatus,
      currentStreamingText,
      error,
      sendMessage,
      retry,
      clearMessages,
      clearSession,
    } = useSSEChat();

    const [showGreeting, setShowGreeting] = useState(false);
    const [showQuestions, setShowQuestions] = useState(false);
    const [isInitialTyping, setIsInitialTyping] = useState(true);

    // Expose clear functions to parent via ref
    useImperativeHandle(ref, () => ({
      clearMessages,
      clearSession,
    }));

    // Track if user has started chatting
    const hasStartedChat = messages.length > 0;

    useEffect(() => {
      // Simulate typing then show greeting
      const typingTimer = setTimeout(() => {
        setIsInitialTyping(false);
        setShowGreeting(true);
      }, 1500);

      // Stagger the questions appearance
      const questionsTimer = setTimeout(() => {
        setShowQuestions(true);
      }, 2000);

      return () => {
        clearTimeout(typingTimer);
        clearTimeout(questionsTimer);
      };
    }, []);

    // Handle initial prompt from external trigger (e.g., ServicesList)
    useEffect(() => {
      if (initialPrompt && initialPrompt.trim()) {
        sendMessage(initialPrompt);
        onPromptConsumed?.();
      }
    }, [initialPrompt, onPromptConsumed, sendMessage]);

    const handleSendMessage = (message: string) => {
      sendMessage(message);
    };

    const handleQuestionClick = (question: string) => {
      sendMessage(question);
    };

    const isProcessing = chatStatus === "processing" || chatStatus === "sending";
    const isStreaming = chatStatus === "streaming";
    const isDisabled = isProcessing || isStreaming;

    return (
      <div className="flex flex-col h-[calc(100dvh-9rem)] lg:min-h-0 lg:h-[calc(100vh-2rem)] lg:max-h-[calc(100vh-10rem)]">
        {/* Initial state - greeting and robot illustration */}
        {!hasStartedChat && (
          <>
            {/* Initial Typing Indicator */}
            {isInitialTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-card rounded-xl sm:rounded-2xl shadow-lg border border-border mb-3 sm:mb-4 max-w-xs sm:max-w-sm ml-auto"
              >
                <div className="flex items-center gap-1 p-3">
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </motion.div>
            )}

            {/* AI Greeting Bubble */}
            <AnimatePresence>
              {showGreeting && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg border border-border mb-3 sm:mb-4 max-w-xs sm:max-w-sm ml-auto"
                >
                  <p className="text-xs sm:text-sm text-foreground">
                    Hi there! I'm Vibii, your AI assistant. I can answer any questions you have
                    about VibeMind and our services.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Robot Illustration Area - Visible on all screen sizes */}
            <div className="flex flex-1 items-center justify-center relative min-h-[140px] sm:min-h-[180px] lg:min-h-[250px]">
              <OrbitRobotIllustration />
            </div>

            {/* Suggested Questions with cycling animation */}
            <AnimatePresence>
              {showQuestions && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-3 sm:mb-4"
                >
                  <SuggestedQuestions onQuestionClick={handleQuestionClick} disabled={isDisabled} />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Chat state - messages and streaming */}
        {hasStartedChat && (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Error state */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-3 p-4 bg-destructive/10 border border-destructive/30 rounded-xl"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-destructive/20 rounded-full flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-destructive mb-1">
                      Unable to send message
                    </h4>
                    <p className="text-xs text-destructive/80 mb-3">{error}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={retry}
                      className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                      Try again
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Messages */}
            <ChatMessageList
              messages={messages}
              currentStreamingText={currentStreamingText}
              isProcessing={isProcessing}
              isStreaming={isStreaming}
            />
          </div>
        )}

        {/* Chat Input - always visible at bottom */}
        <div className="mt-auto pt-3 sm:pt-4">
          {/* Mobile-only label before chat starts */}
          {!hasStartedChat && (
            <p className="lg:hidden text-xs text-muted-foreground text-center mb-2">
              Go ahead, ask Vibii anything — I'm here to help!
            </p>
          )}
          <ChatInput
            onSend={handleSendMessage}
            disabled={isDisabled}
            isStreaming={isStreaming}
            hasStartedChat={hasStartedChat}
          />
        </div>
      </div>
    );
  },
);

AIChatWindow.displayName = "AIChatWindow";

export default AIChatWindow;
