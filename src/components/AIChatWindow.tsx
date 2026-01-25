import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSSEChat } from "@/hooks/useSSEChat";
import ChatInput from "./chat/ChatInput";
import ChatMessageList from "./chat/ChatMessageList";
import SuggestedQuestions from "./chat/SuggestedQuestions";

const AIChatWindow = () => {
  const {
    messages,
    chatStatus,
    currentStreamingText,
    error,
    sendMessage,
    retry,
  } = useSSEChat();

  const [showGreeting, setShowGreeting] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [isInitialTyping, setIsInitialTyping] = useState(true);

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
    <div className="flex flex-col h-full lg:min-h-0 lg:h-[calc(100vh-2rem)] lg:max-h-[calc(100vh-10rem)]">
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
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
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
                  Hi there! I'm the VibeMind AI Assistant. I can answer any questions you have about our company.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Robot Illustration Area - Hidden on mobile, visible on tablet+ */}
          <div className="hidden sm:flex flex-1 items-center justify-center relative min-h-[200px] lg:min-h-[250px]">
            {/* Decorative Elements */}
            <div className="absolute top-2 lg:top-4 right-4 lg:right-8 w-8 lg:w-10 h-8 lg:h-10 bg-yellow-400/20 rounded-full flex items-center justify-center">
              <div className="w-4 lg:w-6 h-4 lg:h-6 text-yellow-500">💡</div>
            </div>
            <div className="absolute top-8 lg:top-12 left-4 lg:left-8 w-6 lg:w-8 h-6 lg:h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <div className="w-3 lg:w-5 h-3 lg:h-5 bg-primary rounded-full" />
            </div>
            <div className="absolute bottom-16 lg:bottom-24 left-8 lg:left-12 w-4 lg:w-6 h-4 lg:h-6 bg-primary/20 rounded-full" />

            {/* Robot Character */}
            <div className="relative">
              {/* Charts Background */}
              <div className="absolute -left-12 lg:-left-16 -top-6 lg:-top-8 w-18 lg:w-24 h-14 lg:h-20 bg-card rounded-lg lg:rounded-xl shadow-lg border border-border p-2 lg:p-3">
                <div className="flex items-end gap-0.5 lg:gap-1 h-full">
                  <div className="w-1.5 lg:w-2 bg-primary/60 rounded-t h-1/3" />
                  <div className="w-1.5 lg:w-2 bg-primary/60 rounded-t h-2/3" />
                  <div className="w-1.5 lg:w-2 bg-primary rounded-t h-full" />
                  <div className="w-1.5 lg:w-2 bg-primary/60 rounded-t h-1/2" />
                </div>
              </div>

              {/* Globe */}
              <div className="absolute -left-6 lg:-left-8 top-2 lg:top-4 w-7 lg:w-10 h-7 lg:h-10 rounded-full bg-gradient-to-br from-primary to-accent opacity-60" />

              {/* Robot Body */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                <div className="w-22 h-22 sm:w-26 sm:h-26 lg:w-32 lg:h-32 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full flex items-center justify-center">
                  {/* Robot Face */}
                  <div className="w-18 h-18 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-card rounded-full shadow-lg flex items-center justify-center relative border-2 lg:border-4 border-primary/20">
                    {/* Headphones */}
                    <div className="absolute -left-2 lg:-left-3 top-1/2 -translate-y-1/2 w-2.5 lg:w-4 h-5 lg:h-8 bg-primary rounded-full" />
                    <div className="absolute -right-2 lg:-right-3 top-1/2 -translate-y-1/2 w-2.5 lg:w-4 h-5 lg:h-8 bg-primary rounded-full" />
                    <div className="absolute -top-1 lg:-top-2 left-1/2 -translate-x-1/2 w-14 lg:w-20 h-2 lg:h-3 bg-primary rounded-full" />

                    {/* Face */}
                    <div className="flex flex-col items-center">
                      <div className="flex gap-2 lg:gap-3 mb-1 lg:mb-2">
                        <div className="w-2 h-2 lg:w-3 lg:h-3 bg-primary rounded-full animate-pulse" />
                        <div className="w-2 h-2 lg:w-3 lg:h-3 bg-primary rounded-full animate-pulse" />
                      </div>
                      <div className="w-4 lg:w-6 h-2 lg:h-3 bg-primary/50 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Bubble */}
              <div className="absolute -right-8 lg:-right-12 top-0 w-6 lg:w-8 h-6 lg:h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-3 h-3 lg:w-4 lg:h-4 text-primary" />
              </div>

              {/* Target Icon */}
              <div className="absolute -left-2 lg:-left-4 bottom-2 lg:bottom-4 w-8 lg:w-12 h-8 lg:h-12 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-4 lg:w-6 h-4 lg:h-6 bg-amber-500 rounded-full flex items-center justify-center">
                  <div className="w-1.5 lg:w-2 h-1.5 lg:h-2 bg-amber-600 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Suggested Questions with cycling animation */}
          <AnimatePresence>
            {showQuestions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-3 sm:mb-4"
              >
                <SuggestedQuestions
                  onQuestionClick={handleQuestionClick}
                  disabled={isDisabled}
                />
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
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-destructive" />
                <span className="text-xs sm:text-sm text-destructive">{error}</span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={retry}
                className="text-destructive hover:text-destructive"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Retry
              </Button>
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
        <ChatInput
          onSend={handleSendMessage}
          disabled={isDisabled}
          isStreaming={isStreaming}
        />
      </div>
    </div>
  );
};

export default AIChatWindow;
